import express from 'express';
import { gitService } from '../services/gitService';

const router = express.Router();

// Simple URL validation function
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
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
  
  let tempDir: string | undefined;
  
  // Use Promise chain for async operations
  gitService.cloneRepository(repoUrl)
    .then(dir => {
      tempDir = dir;
      return gitService.getCommits(tempDir);
    })
    .then(commits => {
      // Send the response with the commits
      res.status(200).json({ commits });
      
      // Clean up after response is sent
      if (tempDir) {
        gitService.cleanupRepository(tempDir).catch(cleanupError => {
          console.error('Error during repository cleanup:', cleanupError);
        });
      }
    })
    .catch(error => {
      // Pass error to the error handler middleware
      next(error);
      
      // Still try to clean up if tempDir exists
      if (tempDir) {
        gitService.cleanupRepository(tempDir).catch(cleanupError => {
          console.error('Error during repository cleanup:', cleanupError);
        });
      }
      res.status(500).json({ error: (error as Error).message });
    });
});

export default router;