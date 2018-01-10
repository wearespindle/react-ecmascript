const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const flow = require('rollup-plugin-flow');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includepaths = require('rollup-plugin-includepaths');

const include = ['shared', 'events'].reduce(
  (ob, type) => {
    return fs
      .readdirSync(`./packages/${type}`)
      .filter(fileName => path.extname(fileName) === '.js')
      .reduce(
        (prev, cur) => ({
          ...prev,
          [`${type}/${cur.replace('.js', '')}`]: path.resolve(`./packages/${type}/${cur}`)
        }),
        ob
      );
  },
  {
    'react-reconciler': path.resolve('./packages/react-reconciler/index.js'),
    'react-reconciler/reflection': path.resolve('./packages/react-reconciler/reflection'),
    'react-reconciler/src/ReactDebugCurrentFiber': path.resolve(
      './packages/react-reconciler/src/ReactDebugCurrentFiber'
    )
  }
);

const inputOptions = {
  input: './src/react.js',
  plugins: [
    flow({ all: true, pretty: true }),
    includepaths({
      include
    }),
    resolve({
      module: true, // Default: true
      jsnext: true, // Default: false
      main: true, // Default: true
      browser: true, // Default: false
      preferBuiltins: true // Default: true
    }),
    babel(),
    commonjs()
  ]
};
const outputOptions = {
  file: './dist/react.development.js',
  format: 'es'
};

async function build({ inputOptions, outputOptions }) {
  // create a bundle
  let bundle;
  try {
    bundle = await rollup.rollup(inputOptions);
  } catch (e) {
    console.error(e);
  }
  // generate code
  const { code } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build({ inputOptions, outputOptions }).then(
  build({
    inputOptions: {
      ...inputOptions,
      external: ['react'],
      input: './src/react-dom.js'
    },
    outputOptions: { ...outputOptions, file: './dist/react-dom.development.js' }
  })
);
