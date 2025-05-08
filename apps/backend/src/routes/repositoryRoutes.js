"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gitService_1 = require("../services/gitService");
const router = express_1.default.Router();
// Simple URL validation function
function isValidUrl(url) {
    try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
    }
    catch (_a) {
        return false;
    }
}
// POST endpoint to get repository commits
router.post('/', (req, res, next) => {
    const { repoUrl } = req.body;
    // Validate the repository URL
    if (!repoUrl || !isValidUrl(repoUrl)) {
        res.status(400).json({ error: 'Invalid repository URL. Please provide a valid Git repository URL.' });
        return;
    }
    let tempDir;
    // Use Promise chain for async operations
    gitService_1.gitService.cloneRepository(repoUrl)
        .then(dir => {
        tempDir = dir;
        return gitService_1.gitService.getCommits(tempDir);
    })
        .then(commits => {
        // Send the response with the commits
        res.status(200).json({ commits });
        // Clean up after response is sent
        if (tempDir) {
            gitService_1.gitService.cleanupRepository(tempDir).catch(cleanupError => {
                console.error('Error during repository cleanup:', cleanupError);
            });
        }
    })
        .catch(error => {
        // Pass error to the error handler middleware
        next(error);
        // Still try to clean up if tempDir exists
        if (tempDir) {
            gitService_1.gitService.cleanupRepository(tempDir).catch(cleanupError => {
                console.error('Error during repository cleanup:', cleanupError);
            });
        }
        res.status(500).json({ error: error.message });
    });
});
exports.default = router;
