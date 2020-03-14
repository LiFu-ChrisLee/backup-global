import fs from 'fs';
import colors from 'colors';
import { soloConsole, wFile, rFile } from '@/utils';
import { DEFAULT_RECORD_FILE, DEFAULT_PKG_FILE } from '@/config';

function fileHandler(): void {
  const pathFile: string = DEFAULT_RECORD_FILE;

  if (!fs.existsSync(pathFile)) {
    soloConsole.warn('Can not find records, use default config.');
    const pkgPath = DEFAULT_PKG_FILE;

    wFile(pathFile, pkgPath, 'Finding ...').then(() => {
      soloConsole.success(`Backup file: ${colors.blue(pkgPath)}`);
    });
  } else {
    rFile(pathFile, 'Finding ...').then(pkgPath => {
      soloConsole.success(`Backup file: ${colors.blue(pkgPath)}`);
    });
  }
}

export { fileHandler };
