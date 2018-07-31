# react-ecmascript
In the root of this repo are four ECMAScript versions of the UMD distribution versions of react and react-dom (both development and production).

A script is used to transforms react and react-dom into ECMAScript versions so they can be used in browsers supporting ECMAScript modules and module loading.
If you want to generate them again run ```$ npm i``` and ```$ npm run build```

If you want to have this script replace the import source in the react-dom modules for you you can pass in the --uri (or -u) parameter like this ```npm run build -- --uri https://some-uri.com/vendor/``` (mention the extra --).
When calling this script directly you can use ```node src/index.js --uri https://some-other-uri.com/``` or ```node src/index.js -u /some/dir/```

You can also use this as a module if you want to get the sources returned as a Promise which resolves to an object containing all four the modules as strings. Like so:
```const reactEcmascript = require('react-ecmascript');
reactEcmascript('someUrl') // optional uri as argument
  .then(sources => {
    // sources is an object with the properties being the filename (like react.production.min.mjs) and the properties being the content of that module as a string

    // do something with these sources, like saving them to disk or log them
    console.log(Object.keys(sources));
  });
```

To use the exported ECMAScript modules in a browser you copy these files over to a place where they can be downloaded by a browser (probably a build script or a development script), and the ```'react'``` in ```import react from 'react';``` need to be changed to the uri through which they can be downloaded. Like mentioned above this can be done by passing in the uri.

You can automate that in your project by for instance using Rollup. For instance by adding the sources in the root to a Rollup configs ```external``` and ```output.paths```.
