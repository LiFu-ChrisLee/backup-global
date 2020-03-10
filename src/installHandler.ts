import fs from 'fs';
import path from 'path';
import cmd from 'node-cmd';
import ora from 'ora';
import { getUserDir } from './utils';

function installPackages(data: string): void {
  const installSpinner = ora('Installing packages ...');
  installSpinner.start('');

  const packages: string[] = data.split('\n');

  cmd.get(`npm install --global ${packages.join(' ')}`, (err, res: string, stderr) => {
    if (res) {
      installSpinner.succeed('');

      console.log(res);
    } else if (stderr) {
      installSpinner.fail('');

      console.log('std error: ', stderr);
    } else {
      installSpinner.fail('');

      console.log('cmd error: ', err);
    }
  });
}

function installHandler(args: any): void {
  const readSpinner = ora('Reading backup file ...');
  readSpinner.start('');

  const backupFile: string = path.join(getUserDir(), 'npm.global.txt');
  fs.readFile(backupFile, (rFileErr, data) => {
    if (rFileErr) {
      readSpinner.fail('');

      console.error('Reading file error: ', rFileErr);
    } else {
      readSpinner.succeed('');

      installPackages(data.toString());
    }
  });
}

export { installHandler };
