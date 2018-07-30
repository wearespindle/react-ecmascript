# react-ecmascript
A script that transforms React and ReactDOM into Ecmascript versions so they can be used in browsers supporting Ecmascript modules and module laoding.

In the root of this repo there are four scripts which are transformed versions of the UMD ditribution versions of react and react-dom (both development and production).

If you want to generate them again run ```$ npm i``` and ```$ npm run build```

# usage
To use these scripts you need to copy these files over to a place where they can be downloaded by a browser, and the ```'react'``` in ```import react from 'react';``` needs to be changed to the uri through which it can be downloaded.

You can automate that in your project by for instance using Rollup.
