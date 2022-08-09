const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
      'index': {
        entry: './src/main.js',
        template: 'public/index.html',
        title: 'Home',
      },
      'tool': {
        entry: './src/tool.js',
        template: 'public/index.html',
        title: 'Tool',
      }
    
  }
})


