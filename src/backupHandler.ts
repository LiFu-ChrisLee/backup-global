import colors from 'colors';
import { soloConsole, wFile } from '@/utils';
import { DEFAULT_RECORD_FILE } from '@/config';
import { BackOptionsDto } from '@dto/Options.dto';
import { BackupPackages } from '@/backupCls/BackupPackages';

function backupHandler(args: BackOptionsDto): void {
  const bkp = new BackupPackages(args.needVersion);
  const backupFile: string = args.backupFile;

  bkp
    .getFullPackages()
    .then(pkgs => {
      const commentHeader: string[] = [
        '# This is a comment, this line will be ignore.',
        '# You can use # to comment a line manually.',
        '',
      ];

      const textList: string[] = commentHeader.concat(pkgs);
      return wFile(backupFile, textList.join('\n'));
    })
    .then(() => {
      return wFile(DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
    .then(() => {
      soloConsole.success(`Backup file: ${colors.blue(backupFile)}`);
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { backupHandler };
