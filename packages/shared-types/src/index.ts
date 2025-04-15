/**
 * Represents a Git author.
 */
export interface Author {
  name: string;
  email: string;
}

/**
 * Represents a Git commit.
 */
export interface Commit {
  sha: string;
  message: string;
  date: string; // Or Date if you prefer to handle Date objects
  authorName: string;
  authorEmail: string;
  // You might want to add the full Author object later
  // author: Author;
}

// You can also export the Author interface if needed elsewhere,
// but the issue specifically asks for Commit and Author definitions.
// If Author is only used within Commit, defining it inline might also work,
// but a separate interface is generally cleaner.
