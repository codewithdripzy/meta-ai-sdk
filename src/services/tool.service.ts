import { githubService } from "./github.service";
import { logger } from "./logging.service";

class ToolService {
    async createRemoteRepo(args: { repoName: string; private: boolean }) {
        try {
            const url = await githubService.createRepo(args.repoName, args.private);
            if (url) {
                console.log(`  ✓ Created GitHub repo: ${url}`);
            } else {
                logger.error('Failed to create GitHub repo');
                return;
            }
        } catch (err) {
            logger.error('Failed to create GitHub repo:', err as Error);
            return;
        }
    }
}

const toolService = new ToolService();
export { toolService };