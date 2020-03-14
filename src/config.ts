import path from 'path';
import { getUserDir } from '@/utils';

const DEFAULT_PKG_FILE = path.join(getUserDir(), 'npm.global.txt');

const DEFAULT_RECORD_FILE = path.join(__dirname, '.pathrc');

export { DEFAULT_PKG_FILE, DEFAULT_RECORD_FILE };
