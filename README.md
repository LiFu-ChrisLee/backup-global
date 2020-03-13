# backup-global
[![npm](https://img.shields.io/npm/dt/backup-global.svg)]() [![npm](https://img.shields.io/npm/v/backup-global.svg)]() [![npm](https://img.shields.io/npm/l/backup-global.svg)]()

Backup your global packages.

## Getting Started

```bash
npm install --global backup-global
```

## Usage

### backup

```bash
bkg b
```

or

```bash
backup-global backup
```

Backup all your global packages to ~/npm.global.txt

### install

```bash
bkg i
```

or

```bash
backup-global install
```

Use ~/npm.global.txt to install your backup

### file

```bash
bkg f
```

or

```bash
backup-global file
```

You can use this command to find your backup file

## Change Logs

### 1.3.0
Show backup file

### 1.2.0
Support comments

### 1.1.0
Add version control

#### backup

Default option is backup packages with version

Use these command to backup packages without version

```bash
bkg b -n
```

or

```bash
backup-global backup --no-version
```

#### install

Default option is install packages with version

Use these command to install packages without version

```bash
bkg i -n
```

or

```bash
backup-global install --no-version
```


## License

This project is licensed under the MIT License
