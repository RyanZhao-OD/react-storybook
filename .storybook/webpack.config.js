const path = require('path');

module.exports = ({ config }) => {
  // ...
  // Add absolute path.resolve so storybook can handle absolute import (eg. @src/resources/...)
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src'),
  };
  
  return config;
};