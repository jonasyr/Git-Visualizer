# Jest ESM Mock Solution

## Problem

Modern ESM modules like `ansi-styles` use native ES modules syntax with `export` statements, which can cause Jest test failures with error:

```
SyntaxError: Unexpected token 'export'
```

## Solution

We created a simple but effective solution using Jest's built-in mocking capabilities:

1. **Manual Module Mock**: Created `jest.setup.cjs` that manually mocks the problematic ESM modules:

   ```js
   // Mock ansi-styles with a CommonJS compatible version
   jest.mock('ansi-styles', () => ({
     // Mock implementation with all needed exports
     modifier: { /* ... */ },
     color: { /* ... */ },
     bgColor: { /* ... */ },
     // etc.
   }));
   ```

2. **Global Setup**: Added this mock to Jest's global setupFiles:

   ```js
   // jest.config.cjs
   module.exports = {
     setupFiles: ['<rootDir>/jest.setup.cjs'],
     // ...
   }
   ```

3. **Simplified Config**: Removed complex transformIgnorePatterns and custom transformers

## Why This Works

- **Direct Approach**: Bypasses the need for transformers entirely
- **Consistent**: Works in both local and CI environments
- **Fast**: No extra transformation overhead
- **Simple**: Minimal configuration changes
- **Targeted**: Only mocks the specific problematic modules

This approach avoids all the complexity of transforming ESM modules by providing pre-made CommonJS versions of the modules that Jest can understand directly.