import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import { mkdtemp, rm } from 'fs/promises'; // Use promises API for async/await
import path from 'path';
import os from 'os'; // To get the system's temporary directory

// Optional: Define more specific options if needed
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // Set the base directory for operations
  binary: 'git',
  maxConcurrentProcesses: 6,
};

class GitService {
  private git: SimpleGit;

  constructor() {
    this.git = simpleGit(gitOptions);
    console.log('GitService initialized.');
  }

  /**
   * Clones a Git repository into a temporary directory.
   * @param repoUrl The URL of the repository to clone.
   * @returns A promise that resolves with the path to the temporary directory
   * where the repository was cloned.
   * @throws Will throw an error if cloning fails.
   */
  async cloneRepository(repoUrl: string): Promise<string> {
    let tempDir: string | undefined = undefined;
    console.log(`Attempting to clone repository: ${repoUrl}`);

    try {
      // 1. Create a unique temporary directory
      // Prefix 'git-visualizer-' helps identify these directories
      const tempDirPrefix = path.join(os.tmpdir(), 'git-visualizer-');
      tempDir = await mkdtemp(tempDirPrefix);
      console.log(`Created temporary directory: ${tempDir}`);

      // 2. Configure simple-git instance for the temporary directory
      const localGit = simpleGit(tempDir); // Operate within the new temp directory

      // 3. Clone the repository with limited depth
      const cloneOptions = {
        '--depth': 50,
      };
      await localGit.clone(repoUrl, '.', cloneOptions); // Clone into the root of tempDir ('.')
      console.log(`Successfully cloned ${repoUrl} into ${tempDir} with depth 50.`);

      // 4. Return the path to the cloned repository directory
      return tempDir;

    } catch (error) {
      console.error(`Error cloning repository ${repoUrl}:`, error);
      // Attempt to clean up the temporary directory if cloning failed
      if (tempDir) {
        try {
            console.log(`Attempting cleanup of failed clone directory: ${tempDir}`);
            // Be careful with rm! Ensure it targets the correct directory.
            await rm(tempDir, { recursive: true, force: true });
            console.log(`Cleaned up temporary directory: ${tempDir}`);
        } catch (cleanupError) {
            console.error(`Failed to cleanup temporary directory ${tempDir}:`, cleanupError);
        }
      }
      // Re-throw the original error to be handled by the caller
      throw new Error(`Failed to clone repository: ${repoUrl}. Reason: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // --- Future methods for Git operations will go here ---
  // Example: async getCommits(repoPath: string): Promise<Commit[]> { ... }
  // Example: async cleanupRepository(repoPath: string): Promise<void> { ... }

   /**
   * Cleans up (deletes) the temporary repository directory.
   * @param repoPath The path to the directory to delete.
   * @returns A promise that resolves when cleanup is complete.
   */
    async cleanupRepository(repoPath: string): Promise<void> {
        console.log(`Attempting cleanup of directory: ${repoPath}`);
        try {
            await rm(repoPath, { recursive: true, force: true });
            console.log(`Successfully cleaned up directory: ${repoPath}`);
        } catch (error) {
            console.error(`Error cleaning up directory ${repoPath}:`, error);
            // Decide if you want to re-throw or just log
            throw new Error(`Failed to clean up repository directory: ${repoPath}. Reason: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}

// Export an instance or the class itself depending on your preference
// Exporting an instance (singleton pattern) is common for services
export const gitService = new GitService();

// Or export the class if you need multiple instances
// export default GitService;
