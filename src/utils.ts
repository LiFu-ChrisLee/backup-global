function getUserDir(): string {
  const dirEnv = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
  return process.env[dirEnv];
}

export { getUserDir };
