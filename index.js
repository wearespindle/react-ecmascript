const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const recast = require('recast');
const parser = require('recast/parsers/acorn');

const makeDir = require('make-dir');
const walk = require('./src/walk');

const read = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const write = promisify(fs.writeFile);

const baseDirectory = [__dirname, 'src'];
const transformersDirectory = baseDirectory.concat('transformers');
const targetsDirectory = baseDirectory.concat('targets');
const joiner = p => join.apply(null, p);

makeDir(join(__dirname, 'dist')).then(() =>
  readDir(joiner(transformersDirectory)).then(filenames =>
    Promise.all(
      filenames.map(filename => {
        const { targetSelectSteps, sourceFile, sourceSelectSteps } = require(joiner(
          transformersDirectory.concat(filename)
        ));

        return read(joiner(targetsDirectory.concat(filename)), 'utf8').then(targetContent => {
          const targtetAst = recast.parse(targetContent, { parser });
          // console.log(walk(targtetAst.program, targetSelectSteps));
          // console.log(targtetAst.program.body[0]);
          // return '';

          return read(sourceFile).then(sourceContent => {
            const sourceAst = recast.parse(sourceContent, { parser });
            const body = walk(sourceAst.program, sourceSelectSteps);

            // console.log(body);
            // console.log(walk(targtetAst.program, targetSelectSteps));

            walk(targtetAst.program, targetSelectSteps).body = body;

            const generated = recast.print(targtetAst, { parser }).code;

            return write(join(__dirname, 'dist', filename), generated, 'utf8');
          });
        });
      })
    )
  )
);
