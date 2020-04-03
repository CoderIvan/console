async function repeat(times, promiseFunction) {
	for (let i = 0; i < times; i += 1) {
		await promiseFunction()
	}
}

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports = {
	repeat,
	timeout,
}
