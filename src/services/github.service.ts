import * as fs from 'fs';
import * as os from 'os';
import fetch from 'node-fetch';

class GithubService {
    private static configPath = os.homedir() + '/.gitbruv_token';


    /**
     * Always retrieves the token from config, and if not found, triggers authentication ONCE and stores it.
     */
    static async getOrInitToken(authService?: any): Promise<string | null> {
        if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
        if (fs.existsSync(GithubService.configPath)) {
            return fs.readFileSync(GithubService.configPath, 'utf-8').trim();
        } else {
            // log that we can't find the token and need to authenticate
            console.log('GitHub access token not found. Please run `gitbruv auth` to authenticate with GitHub and enable features like remote repo creation.');
        }

        if (authService && typeof authService.getGithubToken === 'function') {
            const token = await authService.getGithubToken();
            if (token) {
                fs.writeFileSync(GithubService.configPath, token.trim());
                return token.trim();
            }
        }
        return null;
    }

    async createRepo(repoName: string, isPrivate = true, authService?: any): Promise<string | null> {
        const token = await GithubService.getOrInitToken(authService);
        if (!token) {
            throw new Error('GitHub access token not found or could not be retrieved. Please run `gitbruv auth` to authenticate.');
        }
        const res = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github+json',
            },
            body: JSON.stringify({
                name: repoName,
                private: isPrivate,
            }),
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to create repo: ${errorText}`);
        }
        const data = await res.json() as { html_url: string };
        return data.html_url;
    }

    /**
     * Create a pull request on GitHub
     * @param owner - repository owner (username or org)
     * @param repo - repository name
     * @param head - name of the branch where your changes are implemented (feature branch)
     * @param base - name of the branch you want the changes pulled into (usually 'main')
     * @param title - title of the pull request
     * @param body - body/description of the pull request (optional)
     * @param authService - optional auth service for token retrieval
     * @returns URL of the created pull request, or null
     */
    async createPullRequest(
        owner: string,
        repo: string,
        head: string,
        base: string,
        title: string,
        body = '',
        authService?: any
    ): Promise<string | null> {
        const token = await GithubService.getOrInitToken(authService);
        if (!token) {
            throw new Error('GitHub access token not found or could not be retrieved. Please run `gitbruv auth` to authenticate.');
        }

        // log the parameters for debugging
        // console.log('Creating pull request with the following parameters:');
        // console.log(`Owner: ${owner}`);
        // console.log(`Repo: ${repo}`);
        // console.log(`Head: ${head}`);
        // console.log(`Base: ${base}`);
        // console.log(`Title: ${title}`);
        // console.log(`Body: ${body}`);

        // make sure owner and repo are valid (basic check)
        if (!owner || !repo) {
            throw new Error('Owner and repository name must be provided to create a pull request.');
        }

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github+json',
            },
            body: JSON.stringify({
                title,
                head,
                base,
                body,
            }),
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to create pull request: ${errorText}`);
        }
        const data = await res.json() as { html_url: string };
        return data.html_url;
    }
}

const githubService = new GithubService();
export { githubService };