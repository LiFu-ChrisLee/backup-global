import fs from 'fs';
import path from 'path';
import colors from 'colors';
import { BackOptionsDto } from '../dtos/BackOptions.dto';
import { getUserDir, spinner, soloConsole } from './utils';
import { BackupPackages } from './backupCls/BackupPackages';

function wFile(pkgs: string[]): void {
  spinner.start('Writing backup file ...');

  const backupFile: string = path.join(getUserDir(), 'npm.global.txt');

  fs.writeFile(backupFile, pkgs.join('\n'), wFileErr => {
    if (wFileErr) {
      spinner.fail();

      soloConsole.error(wFileErr);
    } else {
      spinner.stop();

      soloConsole.log(`${colors.bgGreen('Backup file:')} ${backupFile}`);
    }
  });
}

function backupHandler(args: BackOptionsDto): void {
  const bkp = new BackupPackages(args.needVersion);

  bkp
    .getFullPackages()
    .then(pkgs => {
      wFile(pkgs);
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { backupHandler };
