import ora from 'ora';
import colors from 'colors';

function getUserDir(): string {
  const dirEnv = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
  return process.env[dirEnv];
}

class ConsoleSpinner {
  private spinner = ora();

  start(msg?: string): void {
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
  protected wrap(cb?: Function, ...msg): void {
    console.log();
    if (cb) {
      cb(...msg);
    }
    console.log();
  }

  log(...msg): void {
    this.wrap(console.log, ...msg);
  }

  error(...msg): void {
    const list = [`${colors.bgRed('error:')}`];
    if (msg) {
      msg.forEach(text => {
        list.push(colors.red(text));
      });
    }
    this.wrap(console.error, ...list);
  }
}

const soloConsole = new SoloConsole();

export { getUserDir, spinner, soloConsole };
