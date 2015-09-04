#!/usr/bin/env node

'use strict';

require('shelljs/global');

var releaseVersion;

function isDirectoryClean() {
  var fatalState = config.fatal;
  config.fatal = false;
  var isUnstagedChanges = exec('git diff --exit-code', {silent:true}).code;
  var isStagedChanged =
    exec('git diff --cached --exit-code', {silent:true}).code;
  config.fatal = fatalState;

  return !(isUnstagedChanges || isStagedChanged);
}

function prerelease() {
  if (!isDirectoryClean()) {
    echo('RELEASE ERROR: Working directory must be clean to push release!');
    exit(1);
  }
}

function bump(version) {
  releaseVersion =
    exec('npm --no-git-tag-version version ' + version, {silent: true})
      .output.replace(/\n$/g, '');
}

function execOrExit(cmd) {
  var code = exec(cmd).code;
  if (code !== 0) {
    exit(code);
  }
}

function changelog() {
  echo(releaseVersion);
  execOrExit('node changelog.js ' + releaseVersion + ' CHANGELOG.tmp');
  cat('CHANGELOG.tmp', 'CHANGELOG.md').to('CHANGELOG.md.tmp');
  rm('CHANGELOG.tmp');
  rm('CHANGELOG.md');
  mv('CHANGELOG.md.tmp', 'CHANGELOG.md');
}

function commit() {
  execOrExit('git add -A');
  execOrExit('git commit -m "docs(CHANGELOG): add changes for ' + releaseVersion + '"');
  execOrExit('git tag -f ' + releaseVersion);
  execOrExit('git push origin HEAD --tags');
}

function release(version) {
  prerelease();
  bump(version);
  changelog();
  commit();
}

release(process.argv[2]);
