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
    spinner.start('Getting npm global packages ...');

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

class BackupYarnPackages {
  constructor(protected needVersion: boolean) {}

  getPackageNames(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      cmd.get('yarn global list', (err, cmdData: string, stderr) => {
        if (cmdData) {
          const pkgs: string[] = [];
          const dataArr: string[] = cmdData.split('\n');

          dataArr.forEach((item, i) => {
            if (item.includes('info')) {
              const pkg = dataArr[i + 1].replace(/[\s-]/g, '');

              pkgs.push(pkg);
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
      cmd.get('yarn global list', (err, cmdData: string, stderr) => {
        if (cmdData) {
          const pkgs: string[] = [];
          const dataArr: string[] = cmdData.split('\n');

          dataArr.forEach((item, i) => {
            if (item.includes('info')) {
              const pkg = dataArr[i + 1].replace(/[\s-]/g, '');

              const version = item
                .match(/"[^"]*"/)[0]
                .replace('"', '')
                .replace(pkg, '');

              pkgs.push(`${pkg}==${version}`);
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
    spinner.start('Getting yarn global packages ...');

    let p = this.getPackageNames;

    if (this.needVersion) {
      p = this.getPackagesWithVersion;
    }

    return p().then(list => {
      spinner.stop();

      return list;
    });
  }
}

export { BackupPackages, BackupYarnPackages };
