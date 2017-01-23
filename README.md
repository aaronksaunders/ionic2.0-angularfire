# ionic2.0-angularfire
this a basic application for Ionic 2.0 RC0 with AngularFire2 Integration
- Login with email address & password
- Query List of Objects

See Issue: https://github.com/angular/angularfire2/issues/578


See change in `rollup.config.js` in `node_modules/@ionic/app-scripts/config/rollup.config.js`
```
useStrict: false, // MODIFIED line 26
```
In the plugins section starting at line 36
```
  plugins: [
    ngTemplate(),
    // -- CHANGES BELOW --
    commonjs({
      include: [
        'node_modules/rxjs/**',
        'node_modules/angularfire2/**',
        'node_modules/firebase/**'
      ],
      namedExports: {
        'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database']
      }
    }),
    // -- CHANGES END --
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    })
  ]
```


