const tools = require('./tools')
const MyConsole = require('../..');

(async () => {
	await (async () => {
		const myConsole = new MyConsole()

		myConsole.addPrefix('Start')
		myConsole.addSuffix('End')
		console.log(myConsole.prefixs, '<<', '>>', myConsole.suffixs)

		myConsole.addPrefix('Start02')
		myConsole.addSuffix('End02')
		console.log(myConsole.prefixs, '<<', '>>', myConsole.suffixs)

		myConsole.addPrefix('Start03')
		myConsole.addSuffix('End03')
		console.log(myConsole.prefixs, '<<', '>>', myConsole.suffixs)
	})()

	console.log('-------------------------------------------------------')

	await (async () => {
		const myConsole = new MyConsole()
		myConsole.addPrefix('Start')
		myConsole.addSuffix('End')

		await tools.repeat(10, async () => {
			myConsole.log(new Date())
			await tools.timeout(1000)
		})
	})()

	console.log('-------------------------------------------------------')

	await (async () => {
		const myConsole = new MyConsole({
			now: {
				defaultFormat: 'YYYYMMDD HH:mm:ss.SSS ZZ',
				interval: 2000,
			},
			print: {
				interval: 3000,
			},
		})
		myConsole.addPrefix('Start')
		myConsole.addSuffix('End')

		myConsole.start()
		await tools.repeat(10, async () => {
			myConsole.log(new Date())
			await tools.timeout(1000)
		})
		myConsole.close()
	})()
})()
