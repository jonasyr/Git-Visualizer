import request from 'supertest';
import express, { Application } from 'express';
import { gitService } from '../../src/services/gitService';
import repositoryRoutes from '../../src/routes/repositoryRoutes';

// Mock des gitService
jest.mock('../../src/services/gitService', () => ({
  gitService: {
    cloneRepository: jest.fn(),
    getCommits: jest.fn(),
    cleanupRepository: jest.fn()
  }
}));

// Typ-Casting für gemockte Funktionen
const mockCloneRepository = gitService.cloneRepository as jest.MockedFunction<typeof gitService.cloneRepository>;
const mockGetCommits = gitService.getCommits as jest.MockedFunction<typeof gitService.getCommits>;
const mockCleanupRepository = gitService.cleanupRepository as jest.MockedFunction<typeof gitService.cleanupRepository>;

describe('Repository API', () => {
  let app: Application;
  
  beforeEach(() => {
    // Zurücksetzen aller Mocks für jeden Test
    jest.clearAllMocks();
    
    // Express App für Tests einrichten
    app = express();
    app.use(express.json());
    app.use('/', repositoryRoutes);
  });

  test('sollte Commits für ein gültiges Repository zurückgeben', async () => {
    // Arrange
    const validRepoUrl = 'https://github.com/username/repo.git';
    const tempDir = '/tmp/repo-123';
    const mockCommits = [
      { 
        sha: 'abc123', 
        message: 'Erster Commit', 
        date: '2023-05-01T12:00:00Z',
        authorName: 'Test User',
        authorEmail: 'test@example.com'
      }
    ];
    
    mockCloneRepository.mockResolvedValue(tempDir);
    mockGetCommits.mockResolvedValue(mockCommits);
    mockCleanupRepository.mockResolvedValue();
    
    // Act
    const response = await request(app)
      .post('/')
      .send({ repoUrl: validRepoUrl });
    
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ commits: mockCommits });
    
    // Überprüfen der Aufrufe der Service-Methoden
    expect(mockCloneRepository).toHaveBeenCalledWith(validRepoUrl);
    expect(mockGetCommits).toHaveBeenCalledWith(tempDir);
    expect(mockCleanupRepository).toHaveBeenCalledWith(tempDir);
  });

  test('sollte 400 für eine ungültige URL zurückgeben', async () => {
    // Arrange
    const invalidRepoUrl = 'invalid-url';
    
    // Act
    const response = await request(app)
      .post('/')
      .send({ repoUrl: invalidRepoUrl });
    
    // Assert
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Invalid repository URL');
    expect(mockCloneRepository).not.toHaveBeenCalled();
  });

  test('sollte Fehler beim Klonen korrekt behandeln', async () => {
    // Arrange
    const validRepoUrl = 'https://github.com/username/repo.git';
    const mockError = new Error('Repository nicht gefunden');
    
    mockCloneRepository.mockRejectedValue(mockError);
    
    // Act
    const response = await request(app)
      .post('/')
      .send({ repoUrl: validRepoUrl });
    
    // Assert
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(mockError.message);
  });
});
