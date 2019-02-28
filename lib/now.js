const moment = require('moment')

const DEFAULT_OPTIONS = {
	defaultFormat: 'YYYYMMDD HH:mm:ss.SSS ZZ',
	interval: 10,
}

class Now {
	constructor(options) {
		this.options = Object.assign({}, DEFAULT_OPTIONS, options)
	}

	getFormatTime() {
		return moment().format(this.options.defaultFormat)
	}

	getTime() {
		return this.started ? this.now : this.getFormatTime()
	}

	start() {
		if (!this.started) {
			this.now = this.getFormatTime()
			this.interval = setInterval(() => {
				this.now = this.getFormatTime()
			}, this.options.interval)
		}
		this.started = true
	}

	close() {
		if (this.started) {
			delete this.now
			clearInterval(this.interval)
		}
		this.started = false
	}
}

module.exports = Now
