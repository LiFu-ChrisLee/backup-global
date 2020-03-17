import colors from 'colors';
import { soloConsole, wFile } from '@/utils';
import { DEFAULT_RECORD_FILE, YARN_STATEMENT_HEADER, HAS_YARN_ENV } from '@/config';
import { BackupPackages, BackupYarnPackages } from '@/backupCls/BackupPackages';
import { BackOptionsDto } from '@dto/Options.dto';

function backupYarnHandler(args: BackOptionsDto, aboveText: string): void {
  const bkyp = new BackupYarnPackages(args.needVersion);
  const backupFile: string = args.backupFile;

  bkyp
    .getFullPackages()
    .then(pkgs => {
      const header: string[] = [
        aboveText,
        '',
        '',
        `# These are yarn packages under "${YARN_STATEMENT_HEADER}".`,
        YARN_STATEMENT_HEADER,
        '',
      ];

      const textList: string[] = header.concat(pkgs);
      return wFile(backupFile, textList.join('\n'));
    })
    .then(() => {
      return wFile(DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
    .then(() => soloConsole.success(`Backup file: ${colors.blue(backupFile)}`))
    .catch(e => {
      soloConsole.error(e);
    });
}

function backupHandler(args: BackOptionsDto): void {
  let needYarn = false;
  if (HAS_YARN_ENV && args.needYarn) {
    needYarn = true;
  }
  if (!HAS_YARN_ENV && args.needYarn) {
    soloConsole.warn(
      `You do ${colors.red('not')} have yarn, yarn packages will be ${colors.red('ignored')}!`,
    );
  }

  const bkp = new BackupPackages(args.needVersion);
  const backupFile: string = args.backupFile;
  let text = '';

  bkp
    .getFullPackages()
    .then(pkgs => {
      const commentHeader: string[] = [
        '# This is a comment, this line will be ignored.',
        '# You can use # to comment a line manually.',
        '',
      ];

      const textList: string[] = commentHeader.concat(pkgs);
      text = textList.join('\n');
      return wFile(backupFile, text);
    })
    .then(() => {
      return wFile(DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
    .then(() => soloConsole.success(`Backup file: ${colors.blue(backupFile)}`))
    .then(() => {
      if (needYarn) {
        backupYarnHandler(args, text);
      }
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { backupHandler };
