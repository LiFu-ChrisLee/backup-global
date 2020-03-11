"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cmd_1 = __importDefault(require("node-cmd"));
const utils_1 = require("../utils");
class InstallPackages {
    constructor(data, needVersion) {
        this.data = data;
        this.needVersion = needVersion;
    }
    getPackages() {
        const list = [];
        const packages = this.data.split('\n');
        packages.forEach(item => {
            if (this.needVersion) {
                list.push(item.replace('==', ''));
            }
            else {
                list.push(item.split('==')[0]);
            }
        });
        return list.join(' ');
    }
    installFullPackages() {
        utils_1.spinner.start('Installing packages ...');
        const list = this.getPackages();
        return new Promise((resolve, reject) => {
            node_cmd_1.default.get(`npm install --global ${list}`, (err, cmdData, stderr) => {
                if (cmdData) {
                    utils_1.spinner.stop();
                    resolve(cmdData);
                }
                else if (stderr) {
                    utils_1.spinner.fail();
                    reject(stderr);
                }
                else {
                    utils_1.spinner.fail();
                    reject(err);
                }
            });
        });
    }
}
exports.InstallPackages = InstallPackages;
