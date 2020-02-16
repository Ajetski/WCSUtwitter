routes: [{
  path: '/',
  component: './src/layout',
  routes: [
    {
      path: 'helloworld',
      component: './HelloWorld'
    },
  ]
}]