class Storage {

	static set(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}

	static get(key) {
		window.localStorage.localStorage.getItem(key);
	}

}

export default Storage;