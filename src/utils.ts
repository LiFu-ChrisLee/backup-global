import fs from 'fs';
import ora from 'ora';
import colors from 'colors';

function getUserDir(): string {
  const dirEnv = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
  return process.env[dirEnv];
}

class ConsoleSpinner {
  private spinner = ora();

  start(msg: string): void {
    this.spinner.start(msg);
  }

  stop(msg = ''): void {
    this.spinner.succeed(msg);
  }

  fail(msg = ''): void {
    this.spinner.fail(msg);
  }
}

const spinner = new ConsoleSpinner();

class SoloConsole {
  protected wrap(cb: Function): void {
    console.info();
    if (cb) {
      cb();
    }
    console.info();
  }

  log(...msg): void {
    this.wrap(() => {
      console.log(...msg);
    });
  }

  success(...msg): void {
    this.wrap(() => {
      console.info(`${colors.bgGreen('success:')}`);
      console.info(...msg);
    });
  }

  error(...msg): void {
    this.wrap(() => {
      console.info(`${colors.bgRed('error:')}`);
      console.error(...msg);
    });
  }

  warn(...msg): void {
    this.wrap(() => {
      console.info(`${colors.bgYellow('warn:')}`);
      console.warn(...msg);
    });
  }
}

const soloConsole = new SoloConsole();

function wFile(filePath: string, text: string, msg = 'Writing file ...'): Promise<void> {
  spinner.start(msg);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, text, wFileErr => {
      if (wFileErr) {
        spinner.fail();

        reject(wFileErr);
      } else {
        spinner.stop();

        resolve();
      }
    });
  });
}

function rFile(filePath: string, msg = 'Reading file ...'): Promise<string> {
  spinner.start(msg);

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (rFileErr, text) => {
      if (rFileErr) {
        spinner.fail();

        reject(rFileErr);
      } else {
        spinner.stop();

        resolve(text.toString());
      }
    });
  });
}

export { getUserDir, spinner, soloConsole, wFile, rFile };
