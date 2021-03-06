sfdx-ftw
===========

[![Version](https://img.shields.io/npm/v/sfdx-ftw.svg)](https://npmjs.org/package/sfdx-ftw)
[![CircleCI](https://circleci.com/gh/alpha-bytes/sfdx-ftw/tree/master.svg?style=shield)](https://circleci.com/gh/alpha-bytes/sfdx-ftw/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/alpha-bytes/sfdx-ftw?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-ftw/branch/master)
[![Codecov](https://codecov.io/gh/alpha-bytes/sfdx-ftw/branch/master/graph/badge.svg)](https://codecov.io/gh/alpha-bytes/sfdx-ftw)
[![Greenkeeper](https://badges.greenkeeper.io/alpha-bytes/sfdx-ftw.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/alpha-bytes/sfdx-ftw/badge.svg)](https://snyk.io/test/github/alpha-bytes/sfdx-ftw)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-ftw.svg)](https://npmjs.org/package/sfdx-ftw)
[![License](https://img.shields.io/npm/l/sfdx-ftw.svg)](https://github.com/alpha-bytes/sfdx-ftw/blob/master/package.json)

## SFDX For(ce) The Win


<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-ftw
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-ftw/0.1.2 darwin-x64 node-v10.15.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx ftw:apex -c <string> [-r <url>] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ftwapex--c-string--r-url--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ftw:config:get [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ftwconfigget---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx ftw:config:set name=value... [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-ftwconfigset-namevalue---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx ftw:apex -c <string> [-r <url>] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Validate the result of Apex code.

```
USAGE
  $ sfdx ftw:apex -c <string> [-r <url>] [-v <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --checker=checker                                                             (required) Name of the validation
                                                                                    suite to run

  -r, --remotecheck=remotecheck                                                     URL of remote directory from which
                                                                                    to retrieve checks. Overrides the
                                                                                    'defaultremotecheck' config setting.

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ftw/apex.js](https://github.com/alpha-bytes/sfdx-ftw/blob/v0.1.2/lib/commands/ftw/apex.js)_

## `sfdx ftw:config:get [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx ftw:config:get [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ftw/config/get.js](https://github.com/alpha-bytes/sfdx-ftw/blob/v0.1.2/lib/commands/ftw/config/get.js)_

## `sfdx ftw:config:set name=value... [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx ftw:config:set name=value... [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [lib/commands/ftw/config/set.js](https://github.com/alpha-bytes/sfdx-ftw/blob/v0.1.2/lib/commands/ftw/config/set.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
