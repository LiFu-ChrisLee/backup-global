"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const colors_1 = __importDefault(require("colors"));
function getUserDir() {
    const dirEnv = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
    return process.env[dirEnv];
}
exports.getUserDir = getUserDir;
class ConsoleSpinner {
    constructor() {
        this.spinner = ora_1.default();
    }
    start(msg) {
        this.spinner.start(msg);
    }
    stop(msg = '') {
        this.spinner.succeed(msg);
    }
    fail(msg = '') {
        this.spinner.fail(msg);
    }
}
const spinner = new ConsoleSpinner();
exports.spinner = spinner;
class SoloConsole {
    wrap(cb) {
        console.info();
        if (cb) {
            cb();
        }
        console.info();
    }
    log(...msg) {
        this.wrap(() => {
            console.log(...msg);
        });
    }
    success(...msg) {
        this.wrap(() => {
            console.info(`${colors_1.default.bgGreen('success:')}`);
            console.info(...msg);
        });
    }
    error(...msg) {
        this.wrap(() => {
            console.info(`${colors_1.default.bgRed('error:')}`);
            console.error(...msg);
        });
    }
    warn(...msg) {
        this.wrap(() => {
            console.info(`${colors_1.default.bgYellow('warn:')}`);
            console.warn(...msg);
        });
    }
}
const soloConsole = new SoloConsole();
exports.soloConsole = soloConsole;
function wFile(filePath, text, msg = 'Writing file ...') {
    spinner.start(msg);
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(filePath, text, wFileErr => {
            if (wFileErr) {
                spinner.fail();
                reject(wFileErr);
            }
            else {
                spinner.stop();
                resolve();
            }
        });
    });
}
exports.wFile = wFile;
function rFile(filePath, msg = 'Reading file ...') {
    spinner.start(msg);
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, (rFileErr, text) => {
            if (rFileErr) {
                spinner.fail();
                reject(rFileErr);
            }
            else {
                spinner.stop();
                resolve(text.toString());
            }
        });
    });
}
exports.rFile = rFile;
