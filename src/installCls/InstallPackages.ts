import cmd from 'node-cmd';
import { spinner } from '@/utils';

class InstallPackages {
  constructor(protected data: string, protected needVersion: boolean) {}

  getPackages(): string {
    const list: string[] = [];
    const packages: string[] = this.data.split('\n');

    packages.forEach(item => {
      if (this.needVersion) {
        list.push(item.replace('==', ''));
      } else {
        list.push(item.split('==')[0]);
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
