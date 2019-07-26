import fs from 'fs';
import path from 'path';
import variables from '../variables';

export default (base: string, scanSubDirectories = false, regularExpression = /\.js$/) => {
  const files: any = {};

  const readDirectory = (directory: any) => {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) {
          readDirectory(fullPath);
        }

        return;
      }

      if (!regularExpression.test(fullPath)) {
        return;
      }

      files[fullPath] = true;
    });
  };

  readDirectory(path.resolve(variables.root, base));

  return files;
};
