"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var node_cmd_1 = __importDefault(require("node-cmd"));
var ora_1 = __importDefault(require("ora"));
var utils_1 = require("./utils");
function installPackages(data) {
    var installSpinner = ora_1.default('Installing packages ...');
    installSpinner.start('');
    var packages = data.split('\n');
    node_cmd_1.default.get("npm install --global " + packages.join(' '), function (err, res, stderr) {
        if (res) {
            installSpinner.succeed('');
            console.log(res);
        }
        else if (stderr) {
            installSpinner.fail('');
            console.log('std error: ', stderr);
        }
        else {
            installSpinner.fail('');
            console.log('cmd error: ', err);
        }
    });
}
function installHandler() {
    var readSpinner = ora_1.default('Reading backup file ...');
    readSpinner.start('');
    var backupFile = path_1.default.join(utils_1.getUserDir(), 'npm.global.txt');
    fs_1.default.readFile(backupFile, function (rFileErr, data) {
        if (rFileErr) {
            readSpinner.fail('');
            console.error('Reading file error: ', rFileErr);
        }
        else {
            readSpinner.succeed('');
            installPackages(data.toString());
        }
    });
}
exports.installHandler = installHandler;
