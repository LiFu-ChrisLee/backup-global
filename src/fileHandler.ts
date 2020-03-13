import fs from 'fs';
import path from 'path';
import colors from 'colors';
import { getUserDir, soloConsole, wFile, rFile } from '@/utils';
import { DEFAULT_PKG_FILE_NAME, DEFAULT_RECORD_FILE } from '@/config';

function fileHandler(): void {
  const pathFile: string = DEFAULT_RECORD_FILE;

  if (!fs.existsSync(pathFile)) {
    soloConsole.warn('Can not find records, use default config.');
    const pkgPath = path.join(getUserDir(), DEFAULT_PKG_FILE_NAME);

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
