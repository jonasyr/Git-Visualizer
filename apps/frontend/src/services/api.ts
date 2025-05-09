import axios from 'axios';
import { Commit } from '../../../../packages/shared-types/src';

// Define the base URL for the API
// In a production app, this would typically come from an environment variable
const API_BASE_URL = 'http://localhost:3001';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches commits for a given repository URL
 * @param repoUrl The URL of the git repository
 * @returns Promise containing an array of commits
 */
export const getWorkspaceCommits = async (repoUrl: string): Promise<Commit[]> => {
  try {
    const response = await apiClient.post('/api/repositories', { repoUrl });
    return response.data.commits;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Server error: ${error.response.data?.error || error.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        throw new Error(`Error: ${error.message}`);
      }
    }
    // For non-Axios errors
    throw new Error('An unexpected error occurred');
  }
};

export default {
  getWorkspaceCommits,
};
