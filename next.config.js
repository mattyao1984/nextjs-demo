const nextjsConfig = {
  exportPathMap: function() {
    return {
      '/': {
        page: '/'
      },
      '/about': {
        page: '/about'
      }
    }
  }
};

module.exports = nextjsConfig;