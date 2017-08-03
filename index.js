const fs = require('fs')
const git = require('git-rev-sync')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const chalk = require('chalk')
const options = require('minimist')(process.argv.slice(2))

readPkgUp().then(result => {
	let {pkg} = result
	const pkgPath = result.path
	const gitInfo = {
		short: git.short(),
		long: git.long(),
		branch: git.branch()
	}

	delete pkg.readme
	delete pkg._id

	const updatedPkg = Object.assign({}, pkg, {
		git: gitInfo
	})

	writePkg(pkgPath, updatedPkg).then(() => {
		if (options.verbose || options.v) {
			const logMsg = `Git info in ${pkgPath} was updated:
Short: ${chalk.green(gitInfo.short)}
Long: ${chalk.yellow(gitInfo.long)}
Branch: ${chalk.red(gitInfo.branch)}`
			console.log(logMsg)
		}
	})
	// fs.writeFile(filepath, result, 'utf8' (writeErr) => {
	//   if (writeErr) {
	//     throw new Error(writeErr)
	//   }
	//
	//   if (options.v || options.verbose) {
	//     console.log(chalk.green())
	//   }
	// })
})
