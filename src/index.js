const fs = require('fs');
const { join, extname } = require('path');
const { promisify } = require('util');
const recast = require('recast');
const parser = require('recast/parsers/acorn');

const makeDir = require('make-dir');
const walk = require('./walk');

const read = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const write = promisify(fs.writeFile);

const baseDirectory = [__dirname];
const transformersDirectory = baseDirectory.concat('transformers');
const targetsDirectory = baseDirectory.concat('targets');
const joiner = p => join.apply(null, p);

readDir(joiner(transformersDirectory)).then(filenames =>
  Promise.all(
    filenames.map(filename => {
      const { targetSelectSteps, sourceFile, sourceSelectSteps } = require(joiner(
        transformersDirectory.concat(filename)
      ));

      return read(joiner(targetsDirectory.concat(filename)), 'utf8').then(targetContent => {
        const targtetAst = recast.parse(targetContent, { parser });

        return read(sourceFile).then(sourceContent => {
          const sourceAst = recast.parse(sourceContent, { parser });

          // reference the part in the source AST we want to use
          const body = walk(sourceAst.program, sourceSelectSteps);

          // select the part we want to replace in the target with the part of the source AST
          walk(targtetAst.program, targetSelectSteps).body = body;

          const generated = recast.print(targtetAst, { parser }).code;

          const newFilename = filename.replace(extname(filename), '.mjs');

          return write(join(__dirname, '..', newFilename), generated, 'utf8').then(() =>
            console.log(`written /${newFilename}`)
          );
        });
      });
    })
  )
);
