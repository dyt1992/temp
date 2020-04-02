/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/approvalProcess': {
      target: 'http://10.255.3.62/',
      // target: 'http://localhost:7001',
      changeOrigin: true,
      // pathRewrite: { '^/': '' }
    },
    '/template/': {
      target: 'http://10.255.3.62:7001/',
      changeOrigin: true,
    },
    '/templateInstance/': {
      target: 'http://10.255.3.62:7001/',
      changeOrigin: true,
    },
    '/push/': {
      target: 'http://10.255.3.62:7001/',
      changeOrigin: true,
    },
    '/user/': {
      target: 'http://10.255.3.62:7001/',
      changeOrigin: true,
    },
    // '/approvalProcess': {
    //   target: 'http://11.159.166.201:7001',
    //   // target: 'http://localhost:7001',
    //   changeOrigin: true,
    //   // pathRewrite: { '^/': '' }
    // },
    // '/template/': {
    //   target: 'http://100.81.126.102:7001//',
    //   changeOrigin: true,
    // },
    // '/templateInstance/': {
    //   target: 'http://100.81.126.102:7001//',
    //   changeOrigin: true,
    // },
    // '/push/': {
    //   target: 'http://100.81.126.102:7001//',
    //   changeOrigin: true,
    // },
    // '/user/': {
    //   target: 'http://100.81.126.102:7001//',
    //   changeOrigin: true,
    // },
  },
  test: {
    '/api/': {
      target: 'http://100.81.126.102:7001//',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  },
  pre: {
    '/api/': {
      target: 'http://100.81.126.102:7001//',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  },
};
