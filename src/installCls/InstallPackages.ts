import cmd from 'node-cmd';
import { spinner } from '@/utils';

class InstallPackages {
  protected data: string;

  constructor(data: string, protected needVersion: boolean) {
    this.data = this.ignoreComments(data);
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
    spinner.start('Installing packages ...');

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

export { InstallPackages };
