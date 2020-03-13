import path from 'path';
import colors from 'colors';
import { getUserDir, rFile, soloConsole, wFile } from '@/utils';
import { DEFAULT_PKG_FILE_NAME, DEFAULT_RECORD_FILE } from '@/config';
import { InstallOptionsDto } from '@dto/Options.dto';
import { InstallPackages } from '@/installCls/InstallPackages';

function installHandler(args: InstallOptionsDto): void {
  const backupFile: string = path.join(getUserDir(), DEFAULT_PKG_FILE_NAME);

  rFile(backupFile)
    .then(text => {
      const isp = new InstallPackages(text, args.needVersion);

      return isp.installFullPackages();
    })
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

export { installHandler };
