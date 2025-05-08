# Jest Configuration for ESM Modules

## Problem

The frontend project uses modern ESM packages like `ansi-styles` that use JavaScript's native ES modules with `export` statements. Jest runs in a Node.js environment and needs special handling for ESM modules.

The error that appears in CI (and sometimes locally):
```
SyntaxError: Unexpected token 'export'
  at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
  at Object.<anonymous> (node_modules/pretty-format/build/index.js:9:42)
```

## Solution

Our solution uses SWC (Speedy Web Compiler) for JavaScript files and ts-jest for TypeScript files:

1. **SWC for JavaScript Transformation**: 
   - Added `@swc/core` and `@swc/jest` to handle JavaScript files including ESM modules
   - Faster than babel-jest and handles ESM syntax properly

2. **Expanded transformIgnorePatterns**: 
   - Added `pretty-format` and `@testing-library` to the list of ESM modules to transform
   ```js
   transformIgnorePatterns: [
     'node_modules/(?!(ansi-styles|ansi-regex|kleur|chalk|pretty-format|@testing-library)/)',
   ]
   ```

3. **Reset pnpm Store Configuration**:
   - Removed custom store path and reverted to default location
   - Simplified `.npmrc` file

4. **Node.js ESM Support in CI**:
   - Added `--experimental-vm-modules` flag to Node.js options in CI workflow

## Why This Works

- **SWC is Faster**: The SWC compiler is much faster than Babel and handles ESM syntax properly
- **No babel Needed**: Eliminates the complexity of Babel configuration
- **Compatible with React 19**: Works well with the latest React version
- **Default pnpm Store**: Prevents path length issues that can occur with custom store paths

The key is properly transforming node_modules ESM packages that Jest would otherwise try to load directly.