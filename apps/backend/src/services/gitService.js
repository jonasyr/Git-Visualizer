"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitService = void 0;
const simple_git_1 = __importDefault(require("simple-git")); // Import necessary types
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
// Optional: Define more specific options if needed
const gitOptions = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
};
class GitService {
    constructor() {
        this.git = (0, simple_git_1.default)(gitOptions);
        console.log('GitService initialized.');
    }
    /**
     * Clones a Git repository into a temporary directory.
     * @param repoUrl The URL of the repository to clone.
     * @returns A promise that resolves with the path to the temporary directory
     * where the repository was cloned.
     * @throws Will throw an error if cloning fails.
     */
    cloneRepository(repoUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempDir = undefined;
            console.log(`Attempting to clone repository: ${repoUrl}`);
            try {
                const tempDirPrefix = path_1.default.join(os_1.default.tmpdir(), 'git-visualizer-');
                tempDir = yield (0, promises_1.mkdtemp)(tempDirPrefix);
                console.log(`Created temporary directory: ${tempDir}`);
                const localGit = (0, simple_git_1.default)(tempDir);
                const cloneOptions = {
                    '--depth': 50,
                };
                yield localGit.clone(repoUrl, '.', cloneOptions);
                console.log(`Successfully cloned ${repoUrl} into ${tempDir} with depth 50.`);
                return tempDir;
            }
            catch (error) {
                console.error(`Error cloning repository ${repoUrl}:`, error);
                if (tempDir) {
                    try {
                        console.log(`Attempting cleanup of failed clone directory: ${tempDir}`);
                        yield (0, promises_1.rm)(tempDir, { recursive: true, force: true });
                        console.log(`Cleaned up temporary directory: ${tempDir}`);
                    }
                    catch (cleanupError) {
                        console.error(`Failed to cleanup temporary directory ${tempDir}:`, cleanupError);
                    }
                }
                throw new Error(`Failed to clone repository: ${repoUrl}. Reason: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Retrieves the commit history from a local repository path.
     * @param localRepoPath The file system path to the cloned repository.
     * @param maxCount The maximum number of commits to retrieve (default: 100).
     * @returns A promise that resolves with an array of Commit objects.
     * @throws Will throw an error if reading the commit log fails.
     */
    getCommits(localRepoPath_1) {
        return __awaiter(this, arguments, void 0, function* (localRepoPath, maxCount = 100) {
            console.log(`Attempting to read commits from: ${localRepoPath}, maxCount: ${maxCount}`);
            try {
                // Create a simple-git instance specifically for the repo path
                const localGit = (0, simple_git_1.default)(localRepoPath);
                // Use git.log to retrieve commits.
                // The default log format includes the necessary fields.
                // We limit the number of commits using maxCount.
                const logOptions = {
                    maxCount: maxCount,
                };
                const log = yield localGit.log(logOptions); // Specify expected type
                // Map the result from simple-git log to our shared Commit interface
                const commits = log.all
                    .map((entry) => {
                    // Basic validation (optional, but good practice)
                    if (!entry.hash ||
                        !entry.message ||
                        !entry.date ||
                        !entry.author_name ||
                        !entry.author_email) {
                        console.warn('Skipping commit with missing data:', entry);
                        return null; // Skip this entry if essential data is missing
                    }
                    return {
                        sha: entry.hash,
                        message: entry.message,
                        date: entry.date, // Already in ISO 8601 string format
                        authorName: entry.author_name,
                        authorEmail: entry.author_email,
                    };
                })
                    .filter((commit) => commit !== null); // Filter out any null entries
                console.log(`Successfully retrieved ${commits.length} commits from ${localRepoPath}.`);
                return commits;
            }
            catch (error) {
                console.error(`Error reading commits from repository ${localRepoPath}:`, error);
                throw new Error(`Failed to get commits from repository: ${localRepoPath}. Reason: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Cleans up (deletes) the temporary repository directory.
     * @param repoPath The path to the directory to delete.
     * @returns A promise that resolves when cleanup is complete.
     */
    cleanupRepository(repoPath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Attempting cleanup of directory: ${repoPath}`);
            try {
                yield (0, promises_1.rm)(repoPath, { recursive: true, force: true });
                console.log(`Successfully cleaned up directory: ${repoPath}`);
            }
            catch (error) {
                console.error(`Error cleaning up directory ${repoPath}:`, error);
                throw new Error(`Failed to clean up repository directory: ${repoPath}. Reason: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.gitService = new GitService();
// export default GitService; // Uncomment if you prefer exporting the class
