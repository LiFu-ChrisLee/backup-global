import cmd from 'node-cmd';
import { spinner } from '@/utils';

class BackupPackages {
  constructor(protected needVersion: boolean) {}

  getPackageNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      cmd.get('npm list --global --parseable --depth=0', (err, cmdData: string, stderr) => {
        if (cmdData) {
          const pkgs: string[] = [];
          const dataArr: string[] = cmdData.split('\n');

          dataArr.forEach((item, i) => {
            if (i !== 0 && item !== '') {
              pkgs.push(item.replace(/(.:)|(\\[^@]*\\)|(\/[^@]*\/)/g, '').replace(/\\/g, '/'));
            }
          });

          resolve(pkgs);
        } else if (stderr) {
          reject(stderr);
        } else {
          reject(err);
        }
      });
    });
  }

  getPackagesWithVersion(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      cmd.get('npm list --global --depth=0', (err, cmdData: string, stderr) => {
        if (cmdData) {
          const pkgs: string[] = [];
          const dataArr: string[] = cmdData.split('\n');

          dataArr.forEach((item, i) => {
            if (i !== 0 && item !== '') {
              pkgs.push(item);
            }
          });

          resolve(pkgs);
        } else if (stderr) {
          reject(stderr);
        } else {
          reject(err);
        }
      });
    });
  }

  getFullPackages(): Promise<string[]> {
    spinner.start('Getting global packages ...');

    const pList: Promise<string[]>[] = [this.getPackageNames()];

    if (this.needVersion) {
      pList.push(this.getPackagesWithVersion());
    }

    return Promise.all(pList).then(rList => {
      let list: string[] = [];
      if (rList.length === 2) {
        const pkgNames = rList[0];
        const pkgsWithV = rList[1];

        pkgNames.forEach((item, i) => {
          const temp = pkgsWithV[i].split(item);

          list.push(`${item}==${temp[temp.length - 1]}`);
        });
      } else {
        list = rList[0];
      }

      spinner.stop();

      return list;
    });
  }
}

export { BackupPackages };
