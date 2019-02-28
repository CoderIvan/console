const tools = require('./tools')
const Now = require('../../lib/now');

(async () => {
	await (async () => {
		const now = new Now({
			defaultFormat: 'YYYYMMDD HH:mm:ss.SSS ZZ',
		})
		await tools.repeat(10, async () => {
			console.log(now.getTime())
			await tools.timeout(1000)
		})
	})()

	console.log('-------------------------------------------------------')

	await (async () => {
		const now = new Now({
			defaultFormat: 'YYYYMMDD HH:mm:ss.SSS ZZ',
			interval: 2 * 1000,
		})
		now.start()
		await tools.repeat(10, async () => {
			console.log(now.getTime())
			await tools.timeout(1000)
		})
		now.close()
	})()
})()
