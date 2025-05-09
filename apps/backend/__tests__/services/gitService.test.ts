import simpleGit from 'simple-git';
import { mkdtemp, rm } from 'fs/promises';
import path from 'path';
import os from 'os';
import { gitService } from '../../src/services/gitService';

// Mock dependencies
jest.mock('simple-git');
jest.mock('fs/promises');

describe('GitService', () => {
  // Mock implementation of simpleGit
  const mockGit = {
    clone: jest.fn(),
    log: jest.fn(),
  };

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (simpleGit as jest.Mock).mockReturnValue(mockGit);
    (mkdtemp as jest.Mock).mockResolvedValue('/tmp/git-visualizer-test');
    (rm as jest.Mock).mockResolvedValue(undefined);
  });

  describe('cloneRepository', () => {
    test('should successfully clone a repository and return the temp directory path', async () => {
      // Arrange
      const repoUrl = 'https://github.com/user/repo.git';
      mockGit.clone.mockResolvedValue(undefined);
      
      // Act
      const result = await gitService.cloneRepository(repoUrl);
      
      // Assert
      expect(result).toBe('/tmp/git-visualizer-test');
      expect(mkdtemp).toHaveBeenCalledWith(expect.stringContaining(path.join(os.tmpdir(), 'git-visualizer-')));
      expect(simpleGit).toHaveBeenCalledWith('/tmp/git-visualizer-test');
      expect(mockGit.clone).toHaveBeenCalledWith(repoUrl, '.', { '--depth': 50 });
    });
  });

  describe('getCommits', () => {
    test('should retrieve and transform commits from a repository', async () => {
      // Arrange
      const localRepoPath = '/tmp/git-visualizer-test';
      const maxCount = 10;
      
      const mockLogResult = {
        all: [
          {
            hash: 'abc123',
            date: '2023-01-01T12:00:00Z',
            message: 'Initial commit',
            author_name: 'Test User',
            author_email: 'test@example.com',
          },
          {
            hash: 'def456',
            date: '2023-01-02T14:00:00Z',
            message: 'Add feature X',
            author_name: 'Another User',
            author_email: 'another@example.com',
          },
        ],
      };
      
      mockGit.log.mockResolvedValue(mockLogResult);
      
      // Act
      const commits = await gitService.getCommits(localRepoPath, maxCount);
      
      // Assert
      expect(commits).toHaveLength(2);
      expect(commits[0]).toEqual({
        sha: 'abc123',
        message: 'Initial commit',
        date: '2023-01-01T12:00:00Z',
        authorName: 'Test User',
        authorEmail: 'test@example.com',
      });
      expect(simpleGit).toHaveBeenCalledWith(localRepoPath);
      expect(mockGit.log).toHaveBeenCalledWith({ maxCount });
    });
  });

  describe('cleanupRepository', () => {
    test('should remove the temporary repository directory', async () => {
      // Arrange
      const repoPath = '/tmp/git-visualizer-test';
      
      // Act
      await gitService.cleanupRepository(repoPath);
      
      // Assert
      expect(rm).toHaveBeenCalledWith(repoPath, { recursive: true, force: true });
    });
  });
});