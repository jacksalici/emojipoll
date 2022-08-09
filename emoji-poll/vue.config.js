const { defineConfig } = require('@vue/cli-service')

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


