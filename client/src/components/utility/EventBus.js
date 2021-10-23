class EventBusClass {
	constructor() {
		this.bus = {}
	}

	off(event, id) {
		if (typeof event !== "string") {
			throw `EventBus.$off(event, id) event must be a string, ${typeof event} given`
		}
		if (typeof id !== "number") {
			throw `EventBus.$off(event, id) id must be a number, ${typeof id} given`
		}
		if (typeof this.bus[event] === "undefined") {
			throw `EventBus.$off(event, id) event ${event} has no handler`
		}
		delete this.bus[event][id]
	}

	on(event, callback, conditions = {}) {
		if (typeof event !== "string") {
			throw `EventBus.$on(event, callback, conditions) event must be a string, ${typeof event} given`
		}
		if (typeof callback !== "function") {
			throw `EventBus.$on(event, callback, conditions) callback must be a function, ${typeof callback} given`
		}
		if (typeof conditions !== "object") {
			throw `EventBus.$on(event, callback, conditions) conditions must be an object, ${typeof conditions} given`
		}
		if (typeof this.bus[event] === "undefined") {
			this.bus[event] = {
				count: 0,
			}
		}
		this.bus[event].count++
		const id = this.bus[event].count
		this.bus[event][id] = {callback, conditions}
		return id
	}

	emit(event, params = {}) {
		if (typeof event !== "string") {
			throw `EventBus.$emit(event, params) event must be a string, ${typeof event} given`
		}
		if (typeof params !== "object") {
			throw `EventBus.$emit(event, params) params must be an object, ${typeof params} given`
		}
		if (typeof this.bus[event] !== "undefined") {
			const {count, ...callbacks} = this.bus[event]
			for (let i in callbacks) {
				const {callback, conditions} = callbacks[i]
				let conditionsMet = true
				if (typeof conditions === "object") {
					for (let k in conditions) {
						if (params[k] !== conditions[k]) {
							conditionsMet = false
							break
						}
					}
				}
				if (conditionsMet) {
					callback(params)
				}
			}
		}
	}
}

export const EventBus = new EventBusClass()
