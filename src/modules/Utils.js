module.exports = {
	getIP() {
		const { networkInterfaces } = require("os");

		const interfaces = networkInterfaces();
		const ips = {};

		for(const networkInterface of Object.keys(interfaces)) {
			for(const net of interfaces[networkInterface]) {
				if(net.family === "IPv4" && !net.internal && !networkInterface.toLowerCase().match("(vethernet|vmware|vm|area)")) {
					if(!ips[networkInterface]) {
						ips[networkInterface] = [];
					}
					ips[networkInterface].push(net.address);
				}
			}
		}

		const ip = ips[Object.keys(ips)[0]][0];

		return ip;
	},

	getColor(address, clients) {
		let colors = require("./Colors");
		let available = Object.keys(colors);

		delete clients[address];

		let ips = Object.keys(clients);
		ips.map(ip => {
			let index = available.indexOf([clients[ip]["color"]].toString());
			if(index > -1) {
				available.splice(index, 1);
			}
		});

		let max = available.length - 1;

		let random = this.randomBetween(0, max);

		return { colors:colors[available[random]], index:available[random] };
	},

	randomBetween(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	},

	removeKey(key, {[key]: _, ...rest}) {
		return rest;
	}
}