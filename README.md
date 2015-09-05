# validate-commit-message
GIT COMMIT-MSG hook for validating commit message.

`$ validate-commit-msg` creates a symbolic link `.git/hooks/commit-msg` 
to `./lib/validate-commit-msg.js` which is executed on every commit.

The hook script validates commit messages on each commit according 
to [the AngularJS commit message guidelines]. 

## Installation

```shell
$ npm install validate-commit-message
```

## Usage

You can activate the hook from the command line of your project.

```shell
$ node ./node_modules/.bin/validate-commit-msg
```

A more consistent way is to add a script in your `package.json`.

```
"scripts": {
  "init": "validate-commit-msg"
}
```

Then execute `$ npm run init`.

[the AngularJS commit message guidelines]: https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo
