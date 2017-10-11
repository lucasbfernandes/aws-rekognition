class LocalStoragePersistence {

	static set(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	static get(key) {
		let string =  window.localStorage.getItem(key)
		return JSON.parse(string);
	}

	static remove(key) {
		window.localStorage.removeItem(key);
	}
}

export default LocalStoragePersistence;