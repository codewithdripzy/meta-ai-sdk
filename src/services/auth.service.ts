import open from 'open';
import axios from 'axios';
import * as fs from 'fs';
import * as os from 'os';
import * as http from 'http';
import * as path from 'path';
import { execSync } from 'child_process';

class AuthService {

    // No static credentials; CLI requests OAuth link from server
    static OAUTH_PORT = 8765;
    static OAUTH_REDIRECT_URI = `http://localhost:${AuthService.OAUTH_PORT}/callback`;

    isGhAuthenticated(): boolean {
        try {
            execSync('gh auth status', { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }

    async getGithubToken(): Promise<string | null> {
        // 1. Check env
        if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;

        // 2. Check config file
        const configPath = os.homedir() + '/.gitbruv_token';

        if (fs.existsSync(configPath)) {
            return fs.readFileSync(configPath, 'utf-8').trim();
        }

        // 3. OAuth login
        const token = await this.getGithubTokenInteractive();
        // console.log('Received GitHub token:', token ? 'Yes' : 'No');
        if (token) {
            try {
                fs.writeFileSync(configPath, token.trim());
            } catch (err) {
                // console.error('Error saving GitHub token to', configPath, err);
                return null;
            }
            return token.trim();
        }
        return null;
    }

    async getGithubTokenInteractive(): Promise<string | null> {
        let token: string | null = null;

        // 1. Create a promise that resolves when the auth flow is truly finished
        const authPromise = new Promise<string | null>((resolve) => {
            const server = http.createServer(async (req, res) => {
                try {
                    const requestUrl = new URL(req.url || '', `http://localhost:${AuthService.OAUTH_PORT}`);
                    if (requestUrl.pathname === '/callback') {
                        const code = requestUrl.searchParams.get('code');

                        if (code) {
                            try {
                                token = await this.exchangeCodeForToken(code);
                            } catch (err) {}
                            
                            let html = '<h2>GitHub login successful! You can close this window.</h2>';
                            try {
                                const htmlPath = path.join(__dirname, '../public/assets/pages/login-successful.html');
                                if (fs.existsSync(htmlPath)) {
                                    html = fs.readFileSync(htmlPath, 'utf-8');
                                }
                            } catch (err) {}
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(html);
                            server.close(() => {
                                resolve(token);
                            });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html' });
                            res.end('<h2>No code found in callback URL.</h2>');
                            server.close(() => resolve(null));
                        }
                    } else {
                        res.writeHead(404);
                        res.end();
                    }
                } catch (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    server.close(() => resolve(null));
                }
            });
            server.listen(AuthService.OAUTH_PORT);
        });

        // 2. Request OAuth URL from server
        let url = '';

        try {
            const response = await axios.get('https://api.gitbruv.byorello.space/api/v1/auth/with/github');
            url = response.data.url;
        } catch (err) {
            // console.error('Failed to get GitHub auth URL from server:', err);
            return null;
        }

        console.log('\nPlease login to GitHub:');
        console.log(url);
        await open(url);

        // 3. Return the result of the promise
        return authPromise;
    }

    async exchangeCodeForToken(code: string): Promise<string | null> {
        // Exchange the code for a token using the server endpoint
        try {
            const response = await axios.post('https://api.gitbruv.byorello.space/api/v1/github/oauth', { code, redirect_uri: AuthService.OAUTH_REDIRECT_URI });
            if (response.data && response.data.access_token) {
                return response.data.access_token;
            } else {
                console.error('No access_token in server response:', response.data);
                return null;
            }
        } catch (err) {
            // console.error('Error exchanging code for token:', err);
            return null;
        }
    }
}

const authService = new AuthService();

export { authService };