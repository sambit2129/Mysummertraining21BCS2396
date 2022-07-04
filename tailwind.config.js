module.exports = {
    darkMode: 'class',
    purge: [
      './pages/**/*.js',
      './components/**/*.js'
    ],
    theme: {
        extend: {
          screens: {
            'sm': '375px',
            'md': '1040px',
            'lg': '1440px', 
            'smm': {'max': '375px'},
            'mdm': {'max': '1040px'},
            'lgm': {'max': '1440px'},
          },
        },
    },
    plugins: [],
    
  }