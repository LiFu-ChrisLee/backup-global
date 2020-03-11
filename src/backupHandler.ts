import path from 'path';
import colors from 'colors';
import { BackOptionsDto } from '@dto/Options.dto';
import { getUserDir, soloConsole, wFile } from '@/utils';
import { BackupPackages } from '@/backupCls/BackupPackages';

function backupHandler(args: BackOptionsDto): void {
  const bkp = new BackupPackages(args.needVersion);
  const backupFile: string = path.join(getUserDir(), 'npm.global.txt');

  bkp
    .getFullPackages()
    .then(pkgs => {
      return wFile(backupFile, pkgs.join('\n'));
    })
    .then(() => {
      soloConsole.success(`Backup file: ${colors.blue(backupFile)}`);
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { backupHandler };
