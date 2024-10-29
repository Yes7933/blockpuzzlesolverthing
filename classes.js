function lerp(a, b, t) {
	return a + (b - a) * t;
}
class Level {
	constructor(inputcount, outputcount) {
		this.inputs = new Array(inputcount);
		this.outputs = new Array(outputcount);
		this.biases = new Array(outputcount);
		this.weights = [];
		for (let i = 0; i < inputcount; i++) {
			this.weights[i] = new Array(outputcount);
		}
		Level.randomize(this);
	}
	static randomize(level) {
		for (let i = 0; i < level.inputs.length; i++) {
			for (let j = 0; j < level.outputs.length; j++) {
				level.weights[i][j] = Math.random() * 2 - 1;
			}
		}
		for (let i = 0; i < level.biases.length; i++) {
			level.biases[i] = Math.random() * 2 - 1;
		}
	}
	static feed(inputs, level, last) {
		for (let i = 0; i < level.inputs.length; i++) {
			level.inputs[i] = inputs[i];
		}
		for (let i = 0; i < level.outputs.length; i++) {
			let sum = 0;
			for (let j = 0; j < level.inputs.length; j++) {
				sum += level.inputs[j] * level.weights[j][i];
			}
			if (sum > level.biases[i] && !last) {
				level.outputs[i] = 1;
			} else if (!last) {
				level.outputs[i] = 0;
			} else {
				level.outputs[i] = sum;
			}
		}
		return level.outputs;
	}
}
class Network {
	constructor(neuroncount) {
		this.levels = [];
		for (let i = 0; i < neuroncount.length - 1; i++) {
			this.levels.push(new Level(neuroncount[i], neuroncount[i + 1]));
		}
	}
	static feed(inputs, network) {
		let outputs = Level.feed(inputs, network.levels[0], false);
		for (let i = 1; i < network.levels.length - 1; i++) {
			outputs = Level.feed(outputs, network.levels[i], false);
		}
		outputs = Level.feed(outputs, network.levels[network.levels.length - 1], true);
		return outputs;
	}
	static mutate(network, amount=1) {
		network.levels.forEach(l => {
			for (let i = 0; i < l.biases.length; i++) {
				l.biases[i] = lerp(l.biases[i], Math.random() * 2 - 1, amount)
			}
			for (let i = 0; i < l.inputs.length; i++) {
				for (let j = 0; j < l.outputs.length; j++) {
					l.weights[i][j] = lerp(l.weights[i][j], Math.random() * 2 - 1, amount)
				}
			}
		});
	}
}
