const util = require('util')

const Now = require('./lib/now')
const Print = require('./lib/print')

const DEFAULT_OPTIONS = {
	now: {
		defaultFormat: 'YYYYMMDD HH:mm:ss.SSS ZZ',
		interval: 10,
	},
	print: {
		interval: 100,
	},
}

function reduce(fixs, ...args) {
	return `${fixs && fixs.length > 0 ? `${fixs} ` : ''}[${args.join('] [')}]`
}

class MyConsole {
	constructor(options, { prefixs, suffixs, now, print } = {}) {
		this.options = { ...DEFAULT_OPTIONS, ...options }

		this.prefixs = prefixs || ''
		this.suffixs = suffixs || ''

		this.now = now || new Now(this.options.now)
		this.print = print || new Print(this.options.print)
	}

	addPrefix(...args) {
		this.prefixs = reduce(this.prefixs, ...args)
	}

	addSuffix(...args) {
		this.suffixs = reduce(this.suffixs, ...args)
	}

	createContext() {
		return new MyConsole(this.options, this)
	}

	start() {
		if (!this.now.started) {
			this.now.start()
		}
		if (!this.print.started) {
			this.print.start()
		}
		this.started = true
	}

	close() {
		if (this.now.started) {
			this.now.close()
		}
		if (this.print.started) {
			this.print.close()
		}
		this.started = false
	}
}

[
	['debug', 'D'],
	['info', 'I'],
	['log', 'L'],
	['warn', 'W'],
	['error', 'E'],
].forEach(([level, levelShort]) => {
	MyConsole.prototype[level] = function (...args) {
		let content = reduce('', `${levelShort} ${this.now.getTime()}`)
		if (this.prefixs) {
			content += ` ${this.prefixs}`
		}
		content += ` ${util.format(...args)}`
		if (this.suffixs) {
			content += ` ${this.suffixs}`
		}
		this.print[level](content)
	}
})

module.exports = MyConsole
