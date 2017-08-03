# git-hash-package

### What does it do?
This package gets info about your git repo (*long hash* + *short hash* + *branch*) and stores this data in your `package.json`.

### Why?
I faced next issue:  
If we can't use `git log` inside Docker container in git subrepo in production, we need to store info about git in local files. Storing info about the current git state in `package.json` was a good decision.
This module solves my issue.

### Install
```bash
npm i git-hash-package
```

Or if you want to run it globally(I haven't tested it yet):

```
  npm i -g git-hash-package
```

### Usage
```bash
git-hash-package # run
git-hash-package --verbose # run with verbose output about current git state (short + long hashes + branch)
```

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### License
MIT
