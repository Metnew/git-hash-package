#! /usr/bin/env node
const git = require('git-rev-sync')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const chalk = require('chalk')
const options = require('minimist')(process.argv.slice(2))
const path = require('path')

// don't normalize package.json
readPkgUp({ normalize: false }).then(result => {
	let { pkg } = result
	const pkgPath = result.path
	const gitPath = path.dirname(pkgPath)

	const fullInfo = ["s","l","b","t"].every(function(val) {
		return Object.keys(options).indexOf(val) === -1;
	});

	const gitInfo = {};

	if(fullInfo || options.s) gitInfo.short = git.short(gitPath);
	if(fullInfo || options.l) gitInfo.long = git.long(gitPath);
	if(fullInfo || options.b) gitInfo.branch = git.branch(gitPath);
	if(fullInfo || options.t) gitInfo.tag = git.tag();

	const updatedPkg = Object.assign({}, pkg, {
		git: gitInfo
	})

	writePkg(pkgPath, updatedPkg).then(() => {
		if (options.verbose || options.v) {
			var logMsg = `Git path: ${gitPath}\n`;
			logMsg += `Git info in ${pkgPath} was updated:\n`;
			if(fullInfo || options.s) logMsg += "Short: " + chalk.green(gitInfo.short) + "\n";
			if(fullInfo || options.l) logMsg += "Long: " + chalk.yellow(gitInfo.long) + "\n";
			if(fullInfo || options.b) logMsg += "Branch: " + chalk.red(gitInfo.branch) + "\n";
			if(fullInfo || options.t) logMsg += "Tag: " + chalk.red(gitInfo.tag) + "\n";
			console.log(logMsg)
		}
	})
})
