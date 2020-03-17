import cmd from 'node-cmd';
import { spinner } from '@/utils';
import { YARN_STATEMENT_HEADER } from '@/config';

class InstallPackages {
  protected data: string;

  constructor(data: string, protected needVersion: boolean) {
    data = this.ignoreComments(data);
    this.data = this.ignoreYarnPkgs(data);
  }

  ignoreYarnPkgs(data: string): string {
    return data.split(YARN_STATEMENT_HEADER)[0];
  }

  ignoreComments(data: string): string {
    return data.replace(/#[^\n]*/g, '');
  }

  getPackages(): string {
    const list: string[] = [];
    const packages: string[] = this.data.split('\n');

    packages.forEach(item => {
      const temp: string = item.replace(/\s/g, '');

      if (temp === '') {
        return;
      }

      if (this.needVersion) {
        list.push(temp.replace('==', ''));
      } else {
        list.push(temp.split('==')[0]);
      }
    });

    return list.join(' ');
  }

  installFullPackages(): Promise<string> {
    spinner.start('Installing npm packages ...');

    const list = this.getPackages();

    return new Promise((resolve, reject) => {
      cmd.get(`npm install --global ${list}`, (err, cmdData: string, stderr) => {
        if (cmdData) {
          spinner.stop();
          resolve(cmdData);
        } else if (stderr) {
          spinner.fail();
          reject(stderr);
        } else {
          spinner.fail();
          reject(err);
        }
      });
    });
  }
}

class InstallYarnPackages {
  protected data: string;

  constructor(data: string, protected needVersion: boolean) {
    data = this.ignoreComments(data);
    this.data = this.ignoreNpmPkgs(data);
  }

  ignoreNpmPkgs(data: string): string {
    const tempArr = data.split(YARN_STATEMENT_HEADER);
    return tempArr.length > 1 ? tempArr[1] : '';
  }

  ignoreComments(data: string): string {
    return data.replace(/#[^\n]*/g, '');
  }

  getPackages(): string {
    const list: string[] = [];
    const packages: string[] = this.data.split('\n');

    packages.forEach(item => {
      const temp: string = item.replace(/\s/g, '');

      if (temp === '') {
        return;
      }

      if (this.needVersion) {
        list.push(temp.replace('==', ''));
      } else {
        list.push(temp.split('==')[0]);
      }
    });

    return list.join(' ');
  }

  installFullPackages(): Promise<string> {
    spinner.start('Installing yarn packages ...');

    const list = this.getPackages();

    return new Promise((resolve, reject) => {
      cmd.get(`yarn global add ${list}`, (err, cmdData: string, stderr) => {
        if (cmdData) {
          spinner.stop();
          resolve(cmdData);
        } else if (stderr) {
          spinner.fail();
          reject(stderr);
        } else {
          spinner.fail();
          reject(err);
        }
      });
    });
  }
}

export { InstallPackages, InstallYarnPackages };
