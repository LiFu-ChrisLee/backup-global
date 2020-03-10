import fs from 'fs';
import path from 'path';
import cmd from 'node-cmd';
import ora from 'ora';
import { getUserDir } from './utils';

function wFile(data: string): void {
  const writeFileSpinner = ora('Writing backup file ...');
  writeFileSpinner.start('');

  const dataArr: string[] = data.split('\n');
  const backupFile: string = path.join(getUserDir(), 'npm.global.txt');
  const packages: string[] = [];
  dataArr.forEach((item, i) => {
    if (i !== 0 && item !== '') {
      packages.push(item.replace(/(.:)|(\\[^@]*\\)|(\/[^@]*\/)/g, '').replace(/\\/g, '/'));
    }
  });
  fs.writeFile(backupFile, packages.join('\n'), wFileErr => {
    if (wFileErr) {
      writeFileSpinner.fail('');

      console.error('Writing file error: ', wFileErr);
    } else {
      writeFileSpinner.succeed('');

      console.log(`Backup file: ${backupFile}`);
    }
  });
}

function backupHandler(args: any): void {
  const getPackageSpinner = ora('Getting global packages ...');
  getPackageSpinner.start('');

  cmd.get('npm list --global --parseable --depth=0', (err, data: string, stderr) => {
    getPackageSpinner.succeed('');

    if (data) {
      wFile(data);
    } else if (stderr) {
      console.error('std error: ', stderr);
    } else {
      console.error('cmd error: ', err);
    }
  });
}

export { backupHandler };
