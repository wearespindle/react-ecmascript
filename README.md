# react-ecmascript
In the root of this repo are four scripts which are transformed versions of the UMD distribution versions of react and react-dom (both development and production).

A script is used to transforms React and ReactDOM into ECMAScript versions so they can be used in browsers supporting ECMAScript modules and module loading.
If you want to generate them again run ```$ npm i``` and ```$ npm run build```

# usage
To use these scripts you need to copy these files over to a place where they can be downloaded by a browser (probably a build script or a development script), and the ```'react'``` in ```import react from 'react';``` need to be changed to the uri through which they can be downloaded.

You can automate that in your project by for instance using Rollup.
