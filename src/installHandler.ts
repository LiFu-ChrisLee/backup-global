import path from 'path';
import colors from 'colors';
import { getUserDir, rFile, soloConsole } from '@/utils';
import { InstallOptionsDto } from '@dto/Options.dto';
import { InstallPackages } from './installCls/InstallPackages';

function installHandler(args: InstallOptionsDto): void {
  const backupFile: string = path.join(getUserDir(), 'npm.global.txt');

  rFile(backupFile)
    .then(text => {
      const isp = new InstallPackages(text, args.needVersion);

      return isp.installFullPackages();
    })
    .then(data => {
      soloConsole.success(colors.white(data));
    })
    .catch(e => {
      soloConsole.error(e);
    });
}

export { installHandler };
