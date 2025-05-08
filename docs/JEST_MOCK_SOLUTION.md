# Jest Mock Solution for ESM Modules

## Problem

The project encountered a persistent issue where Jest could not process ESM modules like `ansi-styles`, resulting in:

```
SyntaxError: Unexpected token 'export'
```

This error occurred because:
1. These packages use native ES modules syntax (e.g., `export const`)
2. Jest runs in a Node.js CommonJS environment by default
3. The issue affected CI environments particularly

## Solution

We implemented a targeted solution by creating a manual mock for the problematic module:

1. **Direct Module Mocking**: Created a CommonJS-compatible mock implementation of `ansi-styles`:
   ```js
   // apps/frontend/__mocks__/ansi-styles.cjs
   'use strict';
   
   const styles = {
     modifier: { /* mocked properties */ },
     color: { /* mocked properties */ },
     bgColor: { /* mocked properties */ }
   };
   
   // Export all necessary functions and properties
   module.exports = { /* implementation */ };
   ```

2. **Module Mapping**: Added the mock to Jest's moduleNameMapper in configuration:
   ```js
   moduleNameMapper: {
     // Other mappers...
     '^ansi-styles$': '<rootDir>/apps/frontend/__mocks__/ansi-styles.cjs',
   },
   ```

## Why This Works

- **Direct Interception**: Jest uses the provided mock instead of loading the actual module
- **No Transformation Needed**: Avoids complex transformation patterns that can be brittle
- **CommonJS Compatibility**: The mock is written in CommonJS format which Jest natively understands
- **Targeted Approach**: Only mocks the specific module causing issues, minimizing side effects

This approach is:
- Simple and direct
- Requires no special Node.js flags
- Works consistently in both local and CI environments
- Avoids complex transformIgnorePatterns regexes

The mock provides just enough implementation to satisfy the module's interface while avoiding the ESM syntax that causes problems.