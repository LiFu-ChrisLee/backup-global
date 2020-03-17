class BackOptionsDto {
  readonly needVersion: boolean;

  readonly backupFile: string;

  readonly needYarn: boolean;
}

class InstallOptionsDto {
  readonly needVersion: boolean;

  readonly backupFile: string;

  readonly needYarn: boolean;
}

export { BackOptionsDto, InstallOptionsDto };
