#! /usr/bin/env node
const fs = require('fs')
const git = require('git-rev-sync')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const chalk = require('chalk')
const options = require('minimist')(process.argv.slice(2))
const path = require('path')

// don't normalize package.json
readPkgUp({normalize: false}).then(result => {
	let {pkg} = result
	const pkgPath = result.path
	const gitPath = path.dirname(pkgPath)

	const gitInfo = {
		short: git.short(gitPath),
		long: git.long(gitPath),
		branch: git.branch(gitPath),
		tag: git.tag()
	}

	const updatedPkg = Object.assign({}, pkg, {
		git: gitInfo
	})

	writePkg(pkgPath, updatedPkg).then(() => {
		if (options.verbose || options.v) {
			const logMsg = `
Git path: ${gitPath}
Git info in ${pkgPath} was updated:
Short: ${chalk.green(gitInfo.short)}
Long: ${chalk.yellow(gitInfo.long)}
Branch: ${chalk.red(gitInfo.branch)}
Tag: ${chalk.red(gitInfo.tag)}`
			console.log(logMsg)
		}
	})
})
