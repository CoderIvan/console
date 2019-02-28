const tools = require('./tools')
const Print = require('../../lib/print');

(async () => {
	await (async () => {
		const print = new Print()
		await tools.repeat(10, async () => {
			print.log(new Date())
			await tools.timeout(1000)
		})
	})()

	console.log('-------------------------------------------------------')

	await (async () => {
		const print = new Print({
			interval: 2000,
		})
		print.start()
		await tools.repeat(10, async () => {
			print.log(new Date())
			await tools.timeout(1000)
		})
		print.close()
	})()
})()
