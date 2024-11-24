document.addEventListener("DOMContentLoaded", () => {
	let piecepool = [
		[[1]],
		[[1, 1]],
		[[1], [1]],
		[
			[0, 1],
			[1, 0],
		],
		[
			[1, 0],
			[0, 1],
		],
		[
			[1, 1],
			[1, 0],
		],
		[
			[1, 0],
			[1, 1],
		],
		[
			[0, 1],
			[1, 1],
		],
		[
			[1, 1],
			[0, 1],
		],
		[
			[0, 0, 1],
			[0, 1, 0],
			[1, 0, 0],
		],
		[
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		],
		[[1, 1, 1]],
		[[1], [1], [1]],
		[[1, 1, 1, 1]],
		[[1], [1], [1], [1]],
		[
			[1, 1],
			[1, 1],
		],
		[
			[1, 0],
			[1, 1],
			[0, 1],
		],
		[
			[0, 1],
			[1, 1],
			[1, 0],
		],
		[
			[1, 0],
			[1, 0],
			[1, 1],
		],
		[
			[1, 1],
			[0, 1],
			[0, 1],
		],
		[
			[1, 1, 0],
			[0, 1, 1],
		],
		[
			[0, 1, 1],
			[1, 1, 0],
		],
		[
			[1, 0, 0],
			[1, 1, 1],
		],
		[
			[1, 1, 1],
			[0, 0, 1],
		],
		[
			[1, 1, 1],
			[0, 1, 0],
		],
		[
			[0, 1, 0],
			[1, 1, 1],
		],
		[
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		],
		[
			[0, 0, 0, 1],
			[0, 0, 1, 0],
			[0, 1, 0, 0],
			[1, 0, 0, 0],
		],
		[
			[1, 0, 1],
			[1, 1, 1],
		],
		[
			[1, 1, 1],
			[1, 0, 1],
		],
		[
			[1, 1],
			[1, 0],
			[1, 1],
		],
		[
			[1, 1],
			[0, 1],
			[1, 1],
		],
		[
			[0, 1],
			[1, 1],
			[0, 1],
		],
		[
			[1, 0],
			[1, 1],
			[1, 0],
		],
		[[1, 1, 1, 1, 1]],
		[[1], [1], [1], [1], [1]],
		[
			[0, 1, 0],
			[1, 1, 1],
			[0, 1, 0],
		],
	];
	let pieceamount = new Array(40).fill(0);
	let hoverlocation = [];
	let currentpieces = new Array(40).fill([]);
	let highlightedpiece = [];
	let currentbutton = 0;
	let aisrunning = new Array(40).fill(false);
	let iterationdata = [];
	let hightestdata = [];
	let rounddata = [];
	let roundhighest = 0;
	let boardstate = [
		[
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
	];
	for (let i = 1; i <= 39; i++) {
		boardstate.push([
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		]);
	}
	let score = 0;
	let combo = 0;
	let choicebutton = 1;
	let seed = [];
	let number = 0;
	function comparearray(array1, array2) {
		return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
	}
	function generateseed() {
		let seed = [];
		for (let i = 1; i <= 10000; i++) {
			seed.push(Math.random());
		}
		return seed;
	}
	function grabfromseed() {
		return seed[number >= 1000 ? (number %= 1000) : number];
	}
	function collision(array, positionarray, train) {
		train >= 39 ? (train = 39) : (train = train);
		typeof train === "undefined" ? (train = 0) : (train = train);
		for (let y = 0; y < array.length; y++) {
			for (let x = 0; x < array[0].length; x++) {
				if (boardstate[train][y + positionarray[1] - 1][x + positionarray[0] - 1] + array[y][x] === 2) {
					return false;
				}
			}
		}
		return true;
	}
	function checkmoves(array, train) {
		let moves = 0;
		for (let i = 1; i + array.length <= 10; i++) {
			for (let j = 1; j + array[0].length <= 10; j++) {
				if (collision(array, [j, i], train)) {
					moves++;
				}
			}
		}
		return moves;
	}
	function indexOfMax(arr) {
		if (arr.length === 0) {
			return 0;
		}

		var max = arr[0];
		var maxIndex = 0;

		for (var i = 1; i < arr.length; i++) {
			if (arr[i] > max) {
				maxIndex = i;
				max = arr[i];
			}
		}

		return maxIndex;
	}
	function consolelogbutworse(str) {
		document.getElementById("info").innerHTML = str;
	}
	function restart(train) {
		score = 0;
		combo = 0;
		boardstate[train - 1] = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		let train2 = train;
		train2 >= 39 ? (train2 = 39) : (train2 = train);
		typeof train2 === "undefined" ? (train2 = 0) : (train2 = train2);
		for (let i = 1; i <= 81; i++) {
			if ((Math.ceil(Math.ceil(i / 9) / 3) === 2) ^ (Math.ceil((((i - 1) % 9) + 1) / 3) === 2)) {
				document.getElementById((train2 + 1).toString() + "tile" + i.toString()).style.backgroundColor = "rgb(129, 129, 129)";
			} else {
				document.getElementById((train2 + 1).toString() + "tile" + i.toString()).style.backgroundColor = "rgb(69, 69, 69)";
			}
		}
		aisrunning[train2] = false;
		if (comparearray(aisrunning, new Array(40).fill(false))) {
			chooseset.sort((a, b) => a[1] - b[1]);
			placeset.sort((a, b) => a[1] - b[1]);
			let average = 0;
			for (i = 0; i < 39; i++) {
				average += chooseset[i][1];
				chooseset[i][0] = chooseset[39][0];
				placeset[i][0] = placeset[39][0];
				Network.mutate(chooseset[i][0], 0.05);
				Network.mutate(placeset[i][0], 0.05);
				chooseset[i][1] = 0;
				placeset[i][1] = 0;
			}
			average += chooseset[39][1];
			average = average / 40;
			iterationdata.push(average);
			if (iterationdata.length > 35000) {
				iterationdata = iterationdata.slice(1);
			}
			hightestdata.push(chooseset[39][1]);
			if (hightestdata.length > 35000) {
				hightestdata = hightestdata.slice(1);
			}
			rounddata.push(roundhighest);
			if (rounddata.length > 35000) {
				rounddata = rounddata.slice(1);
			}
			roundhighest = 0;
			document.getElementById("highest").innerHTML = "H: " + chooseset[39][1].toString().padStart(5, "0");

			document.getElementById("average").innerHTML = "A: " + average.toString();
			chooseset[39][1] = 0;
			placeset[39][1] = 0;
			iterations++;
			for (let j = 1; j <= 40; j++) {
				pieceamount = new Array(40);
				pieceamount.fill(0);
				hoverlocation = [];
				currentpieces = new Array(40).fill([]);
				highlightedpiece = [];
				currentbutton = 0;
			}
			for (let j = 1; j <= 40; j++) {
				currentpieces[j - 1] = [];
				number = 0;
				for (let i = 1; i <= 3; i++) {
					document.getElementById(j.toString() + "piece" + i.toString()).innerHTML = "";
					let piececontainer = document.getElementById(j.toString() + "piece" + i.toString());
					let pendingpiece = piecepool[Math.floor(grabfromseed() * piecepool.length)];
					number++;
					for (let y = 0; y < pendingpiece.length; y++) {
						for (let x = 0; x < pendingpiece[0].length; x++) {
							let e = document.createElement("div");
							piececontainer.appendChild(e);
							e.setAttribute("class", "piecegrid");
							if (pendingpiece[y][x] === 1) {
								e.style.backgroundColor = "#fcf003";
							} else {
								e.style.backgroundColor = "rgb(129, 129, 129)";
							}
						}
					}
					piececontainer.style.gridTemplateRows = "repeat(" + pendingpiece.length.toString() + ", 15%)";
					piececontainer.style.gridTemplateColumns = "repeat(" + pendingpiece[0].length.toString() + ", 15%)";
					currentpieces[j - 1].push(pendingpiece);
				}
				let currentmoves = -1;
				currentpieces[j - 1].forEach((e, i) => {
					if (document.getElementById(j.toString() + "piece" + (i + 1).toString()).innerHTML !== "0") {
						currentmoves += checkmoves(e, train);
					}
				});
				currentmoves++;
				document.getElementById("moves").innerHTML = currentmoves.toString().padStart(4, "0");
				if (currentmoves >= 50) {
					document.getElementById("moves").style.color = "#87f707";
				} else if (currentmoves >= 10) {
					document.getElementById("moves").style.color = "#eff707";
				} else if (currentmoves > 0) {
					document.getElementById("moves").style.color = "#f78f07";
				} else if (currentmoves == 0) {
					document.getElementById("moves").style.color = "white";
				} else {
					document.getElementById("moves").style.color = "#07f707";
				}
				pieceamount[j] = 3;
			}
			running = false;
		}
	}
	let chooseset = [];
	let placeset = [];
	for (let i = 0; i < 40; i++) {
		chooseset.push([new Network([48, 20, 3]), 0]);
		placeset.push([new Network([97, 50, 18]), 0]);
	}
	function place1(hoverlocation, highlightedpiece, currentbutton, train) {
		let bigwin = 0;
		for (let y = 0; y < highlightedpiece.length; y++) {
			for (let x = 0; x < highlightedpiece[0].length; x++) {
				if (highlightedpiece[y][x] === 1 || boardstate[train][y + hoverlocation[1] - 1][x + hoverlocation[0] - 1] === 1) {
					document.getElementById(
						(train + 1).toString() + "tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
					).style.backgroundColor = "#fcf003";
					boardstate[train][y - 1 + hoverlocation[1]][x - 1 + hoverlocation[0]] = 1;
					score += 5;
				} else {
					if ((Math.ceil((y + hoverlocation[1]) / 3) === 2) ^ (Math.ceil((x + hoverlocation[0]) / 3) === 2)) {
						document.getElementById(
							(train + 1).toString() + "tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
						).style.backgroundColor = "rgb(129, 129, 129)";
					} else {
						document.getElementById(
							(train + 1).toString() + "tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
						).style.backgroundColor = "rgb(69, 69, 69)";
					}
				}
			}
		}
		let counter = boardstate[train][0];
		boardstate[train].forEach((element) => {
			counter = counter.map((e, i) => {
				return e + element[i];
			});
		});
		let combocheck = combo;
		for (let i = 0; i < 9; i++) {
			if (comparearray(boardstate[train][i], [1, 1, 1, 1, 1, 1, 1, 1, 1])) {
				score += 100 * (combo + 1);
				bigwin += 100 * (combo + 1);
				combo += 1;
				for (let j = 1; j <= 9; j++) {
					if ((Math.ceil((i + 1) / 3) === 2) ^ (Math.ceil(j / 3) === 2)) {
						document.getElementById((train + 1).toString() + "tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(129, 129, 129)";
					} else {
						document.getElementById((train + 1).toString() + "tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(69, 69, 69)";
					}
				}
				setTimeout(
					(i, train2) => {
						boardstate[train2][i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					},
					1,
					i,
					train
				);
			}
			if (counter[i] === 10) {
				score += 100 * (combo + 1);
				bigwin += 100 * (combo + 1);
				combo += 1;
				setTimeout(
					(i, train2) => {
						boardstate[train2].forEach((element) => {
							element[i] = 0;
						});
					},
					1,
					i,
					train
				);
				for (let j = 0; j < 9; j++) {
					if ((Math.ceil(i / 3) === 2) ^ (Math.ceil((j + 1) / 3) === 2)) {
						document.getElementById((train + 1).toString() + "tile" + (9 * j + i + 1).toString()).style.backgroundColor = "rgb(129, 129, 129)";
					} else {
						document.getElementById((train + 1).toString() + "tile" + (9 * j + i + 1).toString()).style.backgroundColor = "rgb(69, 69, 69)";
					}
				}
			}
			let boxstart = [3 * (i % 3), 3 * Math.floor(i / 3)];
			let successfulcheck = true;
			for (let j = boxstart[0]; j <= boxstart[0] + 2; j++) {
				for (let k = boxstart[1]; k <= boxstart[1] + 2; k++) {
					if (boardstate[train][k][j] === 0) {
						successfulcheck = false;
					}
				}
			}
			if (successfulcheck) {
				for (let j = boxstart[0]; j <= boxstart[0] + 2; j++) {
					for (let k = boxstart[1]; k <= boxstart[1] + 2; k++) {
						boardstate[train][k][j] = 0;
						if ((Math.ceil((k + 1) / 3) === 2) ^ (Math.ceil((j + 1) / 3) === 2)) {
							document.getElementById((train + 1).toString() + "tile" + (9 * k + (j + 1)).toString()).style.backgroundColor =
								"rgb(129, 129, 129)";
						} else {
							document.getElementById((train + 1).toString() + "tile" + (9 * k + (j + 1)).toString()).style.backgroundColor = "rgb(69, 69, 69)";
						}
					}
				}
				score += 100 * (combo + 1);
				bigwin += 1000 * (combo + 1);
				combo += 1;
			}
		}
		if (combocheck === combo) {
			combo = 0;
		}
		document.getElementById("combo").innerHTML = combo.toString().padStart(2, "0");
		currentbutton++;
		let piecebutton = document.getElementById((train + 1).toString() + "piece" + currentbutton.toString());
		piecebutton.innerHTML = "";
		piecebutton.style.outline = "none";
		piecebutton.style.zIndex = "0";
		piecebutton.style.animation = "unhighlight 0.5s linear 0s 1 normal forwards;";
		piecebutton.classList.add("highlight");
		piecebutton.classList.add("hover");
		highlightedpiece = [];
		currentbutton = 0;
		pieceamount--;
		let currentmoves = -1;
		currentpieces[train].forEach((e, i) => {
			if (document.getElementById((train + 1).toString() + "piece" + (i + 1).toString()).innerHTML !== "") {
				currentmoves += checkmoves(e, train);
			}
		});
		currentmoves++;
		document.getElementById("moves").innerHTML = currentmoves.toString().padStart(4, "0");
		if (currentmoves >= 50) {
			document.getElementById("moves").style.color = "#87f707";
		} else if (currentmoves >= 10) {
			document.getElementById("moves").style.color = "#eff707";
		} else if (currentmoves > 0) {
			document.getElementById("moves").style.color = "#f78f07";
		} else if (currentmoves === 0 && pieceamount !== 0) {
			document.getElementById("moves").style.color = "white";
			setTimeout(restart, 1500, train);
		} else {
			document.getElementById("moves").style.color = "#07f707";
		}
		return bigwin;
	}
	let prevlocation = [];
	function run(chooser, placer, reward = 0, train) {
		let piececompression = [];
		for (let h = 1; h <= 3; h++) {
			e = currentpieces[train][h - 1];
			if (document.getElementById((train + 1).toString() + "piece" + h.toString()).innerHTML !== "") {
				for (let i = 0; i < e.length; i++) {
					for (let j = 0; j < e[0].length; j++) {
						piececompression.push(e[i][j]);
					}
					if (e[0].length < 4) {
						for (let j = e[0].length; j < 4; j++) {
							piececompression.push(0);
						}
					}
				}
				if (e.length < 4) {
					for (let j = e.length; j < 4; j++) {
						piececompression.push(0);
						piececompression.push(0);
						piececompression.push(0);
						piececompression.push(0);
					}
				}
			} else {
				for (let i = 0; i < 16; i++) {
					piececompression.push(0);
				}
			}
		}
		chosen = Network.feed(piececompression, chooser);
		chosenpiece = indexOfMax(chosen);
		let boardcompressed = [];
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				boardcompressed.push(boardstate[train][i][j]);
			}
		}
		e = currentpieces[train][chosenpiece];
		for (let i = 0; i < e.length; i++) {
			for (let j = 0; j < e[0].length; j++) {
				boardcompressed.push(e[i][j]);
			}
			if (e[0].length < 4) {
				for (let j = e[0].length; j < 4; j++) {
					boardcompressed.push(0);
				}
			}
		}
		if (e.length < 4) {
			for (let j = e.length; j < 4; j++) {
				boardcompressed.push(0);
				boardcompressed.push(0);
				boardcompressed.push(0);
				boardcompressed.push(0);
			}
		}
		let place = Network.feed(boardcompressed, placer);
		let possibleposition = [indexOfMax(place.slice(0, 8)) + 1, indexOfMax(place.slice(9)) + 1];
		let highlightedpiece = e;
		let hoverlocation = possibleposition;
		if (!comparearray(highlightedpiece, []) && document.getElementById((train + 1).toString() + "piece" + (chosenpiece + 1).toString()).innerHTML !== "") {
			if (
				hoverlocation[0] + highlightedpiece[0].length <= 10 &&
				hoverlocation[1] + highlightedpiece.length <= 10 &&
				collision(highlightedpiece, hoverlocation, train)
			) {
				reward += place1(hoverlocation, highlightedpiece, chosenpiece, train);
				reward += 200;
			} else {
				reward += -100;
				restart(train);
			}
		} else {
			reward += -100;
			restart(train);
		}
		let difference = prevlocation.map(function (item, index) {
			return Math.abs(item - hoverlocation[index]);
		});
		if (difference[0] >= 2 && difference[1] >= 2) {
			reward += 20;
		} else {
			reward -= 10;
		}
		prevlocation = hoverlocation;
		return reward;
	}
	document.getElementById("restart").addEventListener("click", () => {
		iterationdata = [];
		restart(train);
	});
	document.getElementById("import").addEventListener("click", () => {
		let data = window.prompt("Paste JSON data (this WILL wipe current training data)", "data");
		let seed1 = window.prompt("Paste Seed Data (leave blank for random seed", "seed");
		if (seed1 !== "") {
			seed = JSON.parse(seed1);
		}
		chooseset = [];
		placeset = [];
		for (let i = 0; i < 40; i++) {
			chooseset.push([new Network([48, 20, 3]), 0]);
			placeset.push([new Network([97, 50, 18]), 0]);
		}
		chooseset[39] = JSON.parse(data.substring(0, data.indexOf("split")));
		placeset[39] = JSON.parse(data.substring(data.indexOf("split") + 5));
		train = 0;
		iterations = 0;
		restart(train);
	});
	document.getElementById("export").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(chooseset[39]) + "split" + JSON.stringify(placeset[39]));
	});
	document.getElementById("export2").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(iterationdata));
	});
	document.getElementById("export3").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(hightestdata));
	});
	document.getElementById("export4").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(rounddata));
	});
	document.getElementById("export5").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(seed));
	});
	for (let j = 1; j <= 40; j++) {
		let parent = document.createElement("div");
		parent.classList.add("board");
		document.getElementById("left").appendChild(parent);
		for (let i = 1; i <= 81; i++) {
			let e = document.createElement("div");
			parent.appendChild(e);
			e.setAttribute("class", "tile");
			e.setAttribute("id", j.toString() + "tile" + i.toString());
			if ((Math.ceil(Math.ceil(i / 9) / 3) === 2) ^ (Math.ceil((((i - 1) % 9) + 1) / 3) === 2)) {
				document.getElementById(j.toString() + "tile" + i.toString()).style.backgroundColor = "rgb(129, 129, 129)";
			} else {
				document.getElementById(j.toString() + "tile" + i.toString()).style.backgroundColor = "rgb(69, 69, 69)";
			}
			e.addEventListener("mouseover", () => {
				let id = e.id.substring(1, 4);
				hoverlocation = [((id - 1) % 9) + 1, Math.ceil(id / 9)];
				if (!comparearray(highlightedpiece, [])) {
					if (
						hoverlocation[0] + highlightedpiece[0].length <= 10 &&
						hoverlocation[1] + highlightedpiece.length <= 10 &&
						collision(highlightedpiece, hoverlocation, train)
					) {
						for (let y = 0; y < highlightedpiece.length; y++) {
							for (let x = 0; x < highlightedpiece[0].length; x++) {
								if (highlightedpiece[y][x] === 1 || boardstate[train][y + hoverlocation[1] - 1][x + hoverlocation[0] - 1] === 1) {
									document.getElementById(
										"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
									).style.backgroundColor = "#fcf003";
								} else {
									document.getElementById(
										"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
									).style.backgroundColor = "rgb(109, 109, 109)";
								}
							}
						}
					}
				}
			});
			e.addEventListener("mouseout", () => {
				let id = e.id.substring(4);
				hoverlocation = [((id - 1) % 9) + 1, Math.ceil(id / 9)];
				if (!comparearray(highlightedpiece, [])) {
					if (
						hoverlocation[0] + highlightedpiece[0].length <= 10 &&
						hoverlocation[1] + highlightedpiece.length <= 10 &&
						collision(highlightedpiece, hoverlocation, train)
					) {
						for (let y = 0; y < highlightedpiece.length; y++) {
							for (let x = 0; x < highlightedpiece[0].length; x++) {
								if (boardstate[train][y - 1 + hoverlocation[1]][x - 1 + hoverlocation[0]] === 0) {
									if ((Math.ceil((y + hoverlocation[1]) / 3) === 2) ^ (Math.ceil((x + hoverlocation[0]) / 3) === 2)) {
										document.getElementById(
											"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
										).style.backgroundColor = "rgb(129, 129, 129)";
									} else {
										document.getElementById(
											"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
										).style.backgroundColor = "rgb(69, 69, 69)";
									}
								} else {
									document.getElementById(
										"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
									).style.backgroundColor = "#fcf003";
								}
							}
						}
					}
				}
			});
			e.addEventListener("click", () => {
				let id = e.id.substring(4);
				hoverlocation = [((id - 1) % 9) + 1, Math.ceil(id / 9)];
				if (!comparearray(highlightedpiece, [])) {
					if (
						hoverlocation[0] + highlightedpiece[0].length <= 10 &&
						hoverlocation[1] + highlightedpiece.length <= 10 &&
						collision(highlightedpiece, hoverlocation, train)
					) {
						place1(hoverlocation, highlightedpiece, currentbutton, train);
					}
				}
			});
		}
		let pieceparent = document.createElement("div");
		pieceparent.classList.add("pieces");
		pieceparent.id = j.toString() + "pieces";
		document.getElementById("left").appendChild(pieceparent);
		for (let i = 1; i <= 3; i++) {
			let piecechild = document.createElement("div");
			piecechild.classList.add("piece", "hover", "highlight");
			piecechild.id = j.toString() + "piece" + i.toString();
			pieceparent.appendChild(piecechild);
		}
	}
	document.querySelectorAll(".piece").forEach((element) => {
		element.addEventListener("click", () => {
			if (element.innerHTML !== "") {
				if (currentbutton !== element.id.substring(5)) {
					highlightedpiece = currentpieces[train][element.id.substring(5) - 1];
					element.style.outline = "#fcf003 0.5vmin solid";
					element.style.zIndex = "1";
					element.classList.remove("highlight");
					element.classList.remove("hover");
					if (currentbutton > 0) {
						document.getElementById("piece" + currentbutton).style.outline = "none";
						document.getElementById("piece" + currentbutton).style.zIndex = "0";
						document.getElementById("piece" + currentbutton).classList.add("highlight");
						document.getElementById("piece" + currentbutton).classList.add("hover");
					}
					currentbutton = element.id.substring(5);
				} else {
					element.style.outline = "none";
					element.style.zIndex = "0";
					element.style.animation = "unhighlight 0.5s linear 0s 1 normal forwards;";
					element.classList.add("highlight");
					element.classList.add("hover");
					highlightedpiece = [];
					currentbutton = 0;
				}
			}
		});
	});
	let train = 0;
	let iterations = 1;
	let running = false;
	seed = generateseed();
	if (comparearray(pieceamount, new Array(40).fill(0))) {
		for (let j = 1; j <= 40; j++) {
			currentpieces[j - 1] = [];
			number = 0;
			for (let i = 1; i <= 3; i++) {
				document.getElementById(j.toString() + "piece" + i.toString()).innerHTML = "";
				let piececontainer = document.getElementById(j.toString() + "piece" + i.toString());
				let pendingpiece = piecepool[Math.floor(grabfromseed() * piecepool.length)];
				number++;
				for (let y = 0; y < pendingpiece.length; y++) {
					for (let x = 0; x < pendingpiece[0].length; x++) {
						let e = document.createElement("div");
						piececontainer.appendChild(e);
						e.setAttribute("class", "piecegrid");
						if (pendingpiece[y][x] === 1) {
							e.style.backgroundColor = "#fcf003";
						} else {
							e.style.backgroundColor = "rgb(129, 129, 129)";
						}
					}
				}
				piececontainer.style.gridTemplateRows = "repeat(" + pendingpiece.length.toString() + ", 15%)";
				piececontainer.style.gridTemplateColumns = "repeat(" + pendingpiece[0].length.toString() + ", 15%)";
				currentpieces[j - 1].push(pendingpiece);
			}
			let currentmoves = -1;
			currentpieces[j - 1].forEach((e, i) => {
				if (document.getElementById(j.toString() + "piece" + (i + 1).toString()).innerHTML !== "0") {
					currentmoves += checkmoves(e, train);
				}
			});
			currentmoves++;
			document.getElementById("moves").innerHTML = currentmoves.toString().padStart(4, "0");
			if (currentmoves >= 50) {
				document.getElementById("moves").style.color = "#87f707";
			} else if (currentmoves >= 10) {
				document.getElementById("moves").style.color = "#eff707";
			} else if (currentmoves > 0) {
				document.getElementById("moves").style.color = "#f78f07";
			} else if (currentmoves == 0) {
				document.getElementById("moves").style.color = "white";
				setTimeout(restart, 1500, train);
			} else {
				document.getElementById("moves").style.color = "#07f707";
			}
			pieceamount[j] = 3;
		}
	}
	function tick() {
		let num2 = number;
		for (let j = 1; j <= 40; j++) {
			if (pieceamount[j] === 0) {
				window.console.log("REFRESH!!!");
				number = num2;
				currentpieces[j - 1] = [];
				for (let i = 1; i <= 3; i++) {
					document.getElementById(j.toString() + "piece" + i.toString()).innerHTML = "";
					let piececontainer = document.getElementById(j.toString() + "piece" + i.toString());
					let pendingpiece = piecepool[Math.floor(grabfromseed() * piecepool.length)];
					number++;
					for (let y = 0; y < pendingpiece.length; y++) {
						for (let x = 0; x < pendingpiece[0].length; x++) {
							let e = document.createElement("div");
							piececontainer.appendChild(e);
							e.setAttribute("class", "piecegrid");
							if (pendingpiece[y][x] === 1) {
								e.style.backgroundColor = "#fcf003";
							} else {
								e.style.backgroundColor = "rgb(129, 129, 129)";
							}
						}
					}
					piececontainer.style.gridTemplateRows = "repeat(" + pendingpiece.length.toString() + ", 15%)";
					piececontainer.style.gridTemplateColumns = "repeat(" + pendingpiece[0].length.toString() + ", 15%)";
					currentpieces[j - 1].push(pendingpiece);
				}
				let currentmoves = -1;
				currentpieces[j - 1].forEach((e, i) => {
					if (document.getElementById(j.toString() + "piece" + (i + 1).toString()).innerHTML !== "0") {
						currentmoves += checkmoves(e, train);
					}
				});
				currentmoves++;
				document.getElementById("moves").innerHTML = currentmoves.toString().padStart(4, "0");
				if (currentmoves >= 50) {
					document.getElementById("moves").style.color = "#87f707";
				} else if (currentmoves >= 10) {
					document.getElementById("moves").style.color = "#eff707";
				} else if (currentmoves > 0) {
					document.getElementById("moves").style.color = "#f78f07";
				} else if (currentmoves == 0) {
					document.getElementById("moves").style.color = "white";
					setTimeout(restart, 1500, train);
				} else {
					document.getElementById("moves").style.color = "#07f707";
				}
				pieceamount[j - 1] = 3;
			}
		}
		document.getElementById("score").innerHTML = score.toString().padStart(5, "0");
		if (!running) {
			running = true;
			roundhighest = 1;
			chooseset[39][1] = 10;
			placeset[39][1] = 10;
			//try {
			aisrunning = new Array(40).fill(true);
			for (train = 0; train <= 39; train++) {
				prevlocation = [];
				chooseset[train][1] = run(chooseset[train][0], placeset[train][0], chooseset[train][1], train);
			}
			document.getElementById("info").innerHTML = "I: " + iterations.toString().padStart(3, "0");
			//} catch (e) {
			//	document.getElementById("info").innerHTML = e.message;
			//}
			for (let a = 0; a <= 39; a++) {
				placeset[a][1] = chooseset[a][1];
			}
		} else if (!comparearray(aisrunning, new Array(40).fill(false))) {
			roundhighest++;
			aisrunning.forEach((e, i) => {
				if (e === true) {
					train = i;
					prevlocation = [];
					chooseset[train][1] = run(chooseset[train][0], placeset[train][0], chooseset[train][1], train);
				}
			});
		}
		//setTimeout(tick, 150);
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
});
