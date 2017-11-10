#! /usr/bin/env node
const fs = require('fs')
const git = require('git-rev-sync')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const chalk = require('chalk')
const options = require('minimist')(process.argv.slice(2))
const path = require('path')

// don't normalize package.json
readPkgUp({normalize:false})
	.then(result => {
	let {pkg} = result
	const pkgPath = result.path
	const gitPath = path.dirname(pkgPath)

	const gitInfo = {
		short: git.short(gitPath),
		long: git.long(gitPath),
		branch: git.branch(gitPath)
	}

	const updatedPkg = Object.assign({}, pkg, {
		git: gitInfo
	})

	writePkg(pkgPath, updatedPkg).then(() => {
		if (options.verbose || options.v) {
			const logMsg = `
CWD: ${process.cwd()}			
Git info in ${pkgPath} was updated:
Short: ${chalk.green(gitInfo.short)}
Long: ${chalk.yellow(gitInfo.long)}
Branch: ${chalk.red(gitInfo.branch)}`
			console.log(logMsg)
		}
	})
})
