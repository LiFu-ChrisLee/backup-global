"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cmd_1 = __importDefault(require("node-cmd"));
const utils_1 = require("../utils");
class BackupPackages {
    constructor(needVersion) {
        this.needVersion = needVersion;
    }
    getPackageNames() {
        return new Promise((resolve, reject) => {
            node_cmd_1.default.get('npm list --global --parseable --depth=0', (err, cmdData, stderr) => {
                if (cmdData) {
                    const pkgs = [];
                    const dataArr = cmdData.split('\n');
                    dataArr.forEach((item, i) => {
                        if (i !== 0 && item !== '') {
                            pkgs.push(item.replace(/(.:)|(\\[^@]*\\)|(\/[^@]*\/)/g, '').replace(/\\/g, '/'));
                        }
                    });
                    resolve(pkgs);
                }
                else if (stderr) {
                    reject(stderr);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getPackagesWithVersion() {
        return new Promise((resolve, reject) => {
            node_cmd_1.default.get('npm list --global --depth=0', (err, cmdData, stderr) => {
                if (cmdData) {
                    const pkgs = [];
                    const dataArr = cmdData.split('\n');
                    dataArr.forEach((item, i) => {
                        if (i !== 0 && item !== '') {
                            pkgs.push(item);
                        }
                    });
                    resolve(pkgs);
                }
                else if (stderr) {
                    reject(stderr);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getFullPackages() {
        utils_1.spinner.start('Getting npm global packages ...');
        const pList = [this.getPackageNames()];
        if (this.needVersion) {
            pList.push(this.getPackagesWithVersion());
        }
        return Promise.all(pList).then(rList => {
            let list = [];
            if (rList.length === 2) {
                const pkgNames = rList[0];
                const pkgsWithV = rList[1];
                pkgNames.forEach((item, i) => {
                    const temp = pkgsWithV[i].split(item);
                    list.push(`${item}==${temp[temp.length - 1]}`);
                });
            }
            else {
                list = rList[0];
            }
            utils_1.spinner.stop();
            return list;
        });
    }
}
exports.BackupPackages = BackupPackages;
class BackupYarnPackages {
    constructor(needVersion) {
        this.needVersion = needVersion;
    }
    getPackageNames() {
        return new Promise((resolve, reject) => {
            node_cmd_1.default.get('yarn global list', (err, cmdData, stderr) => {
                if (cmdData) {
                    const pkgs = [];
                    const dataArr = cmdData.split('\n');
                    dataArr.forEach((item, i) => {
                        if (item.includes('info')) {
                            const pkg = dataArr[i + 1].replace(/[\s-]/g, '');
                            pkgs.push(pkg);
                        }
                    });
                    resolve(pkgs);
                }
                else if (stderr) {
                    reject(stderr);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getPackagesWithVersion() {
        return new Promise((resolve, reject) => {
            node_cmd_1.default.get('yarn global list', (err, cmdData, stderr) => {
                if (cmdData) {
                    const pkgs = [];
                    const dataArr = cmdData.split('\n');
                    dataArr.forEach((item, i) => {
                        if (item.includes('info')) {
                            const pkg = dataArr[i + 1].replace(/[\s-]/g, '');
                            const version = item
                                .match(/"[^"]*"/)[0]
                                .replace(/"/g, '')
                                .replace(pkg, '');
                            pkgs.push(`${pkg}==${version}`);
                        }
                    });
                    resolve(pkgs);
                }
                else if (stderr) {
                    reject(stderr);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    getFullPackages() {
        utils_1.spinner.start('Getting yarn global packages ...');
        let p = this.getPackageNames;
        if (this.needVersion) {
            p = this.getPackagesWithVersion;
        }
        return p().then(list => {
            utils_1.spinner.stop();
            return list;
        });
    }
}
exports.BackupYarnPackages = BackupYarnPackages;
