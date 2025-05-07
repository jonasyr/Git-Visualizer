// jest-transforms/fileTransformer.cjs
module.exports = {
    process() {
      return {
        code: 'module.exports = "test-file-stub";'
      };
    },
    getCacheKey() {
      // Der Cache-Schlüssel sollte einen eindeutigen Wert haben
      return 'fileTransformer';
    }
  };