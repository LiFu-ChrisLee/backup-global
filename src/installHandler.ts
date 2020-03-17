import colors from 'colors';
import { rFile, soloConsole, wFile } from '@/utils';
import { DEFAULT_RECORD_FILE, HAS_YARN_ENV } from '@/config';
import { InstallPackages, InstallYarnPackages } from '@/installCls/InstallPackages';
import { InstallOptionsDto } from '@dto/Options.dto';

function installYarnHandler(args: InstallOptionsDto, text: string): void {
  const backupFile: string = args.backupFile;
  const isyp = new InstallYarnPackages(text, args.needVersion);

  isyp
    .installFullPackages()
    .then(data => {
      soloConsole.success(colors.white(data));
    })
    .then(() => {
      return wFile(DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

function installHandler(args: InstallOptionsDto): void {
  let needYarn = false;
  if (HAS_YARN_ENV && args.needYarn) {
    needYarn = true;
  }
  if (!HAS_YARN_ENV && args.needYarn) {
    soloConsole.warn(
      `You do ${colors.red('not')} have yarn, yarn packages will ${colors.red(
        'not',
      )} be installed!`,
    );
  }

  const backupFile: string = args.backupFile;
  let text = '';

  rFile(backupFile)
    .then(rText => {
      text = rText;
      const isp = new InstallPackages(text, args.needVersion);

      return isp.installFullPackages();
    })
    .then(data => {
      soloConsole.success(colors.white(data));
    })
    .then(() => {
      return wFile(DEFAULT_RECORD_FILE, backupFile, 'Recording ...');
    })
    .then(() => {
      if (needYarn) {
        installYarnHandler(args, text);
      }
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { installHandler };
