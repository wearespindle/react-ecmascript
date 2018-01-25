# react-ecmascript

A bundler script to create native ecmascript modules of react and react-dom to be used in browsers.

This is a proof of concept to see if the current source of React is a viable source (with little or no transpiling) for a native ecmascript module version.
Either with `<script type="module"></script>` or using `import React from url-to-react.js`.

The packages folder in this repo is simply copy pasted from the react source on https://github.com/facebook/react since the tools and settings used in here are not compatible with the ones in the original react repo.

# installation

* `$ git clone git@github.com:wearespindle/react-ecmascript.git`
* `$ cd react-ecmascript`
* `$ npm i`
* `$ npm start`
* copy the files from the dist folder to whereever you want to serve them from, and in the react-dom.development.js file change the `'react'` in the import statement on line 1 (`import React from 'react';`) to the url where these files are served from.

Than you can import them both using standard ecmascript inmport and use them in a browser with native ecmascript module and module loader support.

# next steps

Make an npm script to output minified sources of these files
