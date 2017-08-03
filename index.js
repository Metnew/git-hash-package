const fs = require('fs')
const git = require('git-rev-sync')
const readPkgUp = require('read-pkg-up')
const writePkg = require('write-pkg')
const chalk = require('chalk')
const options = require('minimist')(process.argv.slice(2))

readPkgUp().then(result => {
	const {pkg} = result
	const pkgPath = result.path
  console.log(git.short())
	const gitInfo = {
		short: git.short(),
		long: git.long(),
		branch: git.branch()
	}

  console.log('YYYYYYYYYYYYY\n\n\n\n')
  console.log(gitInfo)
  console.log(pkgPath)

	writePkg(pkgPath, {git: gitInfo}).then(() => {
		if (options.verbose || options.v) {
			const logMsg = `Git info in ${pkgPath} was updated:
Short: ${chulk.green(gitInfo.short)}
Long: ${chulk.yellow(gitInfo.long)}
Branch: ${chulk.red(gitInfo.branch)}`
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
