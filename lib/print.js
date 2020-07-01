const util = require('util')

const DEFAULT_OPTIONS = {
	interval: 100,
}

class Print {
	constructor(options) {
		this.options = { ...DEFAULT_OPTIONS, ...options }
	}

	flush() {
		if (this.started && this.channels) {
			Object.keys(this.channels).forEach((stream) => {
				const channel = this.channels[stream]
				if (channel.length) {
					console[stream].write(channel.join(''))
					channel.length = 0
				}
			})
		}
	}

	start() {
		if (!this.started) {
			this.channels = {
				_stdout: [],
				_stderr: [],
			}
			this.interval = setInterval(() => {
				this.flush()
			}, this.options.interval)
		}
		this.started = true
	}

	close() {
		if (this.started) {
			this.flush()
			delete this.channels
			clearInterval(this.interval)
		}
		this.started = false
	}
}

[
	['debug', '_stdout'],
	['info', '_stdout'],
	['log', '_stdout'],
	['warn', '_stderr'],
	['error', '_stderr'],
].forEach(([level, stream]) => {
	Print.prototype[level] = function (...args) {
		const content = `${util.format(...args)}\n`
		if (this.started) {
			this.channels[stream].push(content)
		} else {
			console[stream].write(content)
		}
	}
})

module.exports = Print
