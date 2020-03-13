"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const DEFAULT_PKG_FILE_NAME = 'npm.global.txt';
exports.DEFAULT_PKG_FILE_NAME = DEFAULT_PKG_FILE_NAME;
const DEFAULT_RECORD_FILE = path_1.default.join(__dirname, '.pathrc');
exports.DEFAULT_RECORD_FILE = DEFAULT_RECORD_FILE;
