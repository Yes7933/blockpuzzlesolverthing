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
	let pieceamount = 0;
	let hoverlocation = [];
	let currentpieces = [];
	let highlightedpiece = [];
	let currentbutton = 0;
	let boardstate = [
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
	let score = 0;
	let combo = 0;
	function comparearray(array1, array2) {
		return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
	}
	function collision(array, positionarray) {
		for (let y = 0; y < array.length; y++) {
			for (let x = 0; x < array[0].length; x++) {
				if (boardstate[y + positionarray[1] - 1][x + positionarray[0] - 1] + array[y][x] === 2) {
					return false;
				}
			}
		}
		return true;
	}
	function checkmoves(array) {
		let moves = 0;
		for (let i = 1; i + array.length <= 10; i++) {
			for (let j = 1; j + array[0].length <= 10; j++) {
				if (collision(array, [j, i])) {
					moves++;
				}
			}
		}
		return moves;
	}
	function restart() {
		pieceamount = 0;
		hoverlocation = [];
		currentpieces = [];
		highlightedpiece = [];
		currentbutton = 0;
		boardstate = [
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
		score = 0;
		combo = 0;
		for (let i = 1; i <= 81; i++) {
			if ((Math.ceil(Math.ceil(i / 9) / 3) === 2) ^ (Math.ceil((((i - 1) % 9) + 1) / 3) === 2)) {
				document.getElementById("tile" + i.toString()).style.backgroundColor = "rgb(129, 129, 129)";
			} else {
				document.getElementById("tile" + i.toString()).style.backgroundColor = "rgb(69, 69, 69)";
			}
		}
		if (train >= 39) {
			chooseset.sort((a, b) => a[1] - b[1]);
			placeset.sort((a, b) => a[1] - b[1]);
			for (i = 0; i < 39; i++) {
				chooseset[i][0] = chooseset[39][0];
				placeset[i][0] = placeset[39][0];
				Network.mutate(chooseset[i][0], 0.3);
				Network.mutate(placeset[i][0], 0.3);
				chooseset[i][1] = 0;
				placeset[i][1] = 0;
			}
			document.getElementById("highest").innerHTML = "H: " + chooseset[39][1].toString().padStart(5, "0");
			chooseset[39][1] = 0;
			placeset[39][1] = 0;
			train = 0;
			iterations++;
		}
	}
	//chooser = new Network([48, 20, 3]);
	//placer = new Network([81, 40, 18]);
	let chooseset = [];
	let placeset = [];
	for (let i = 0; i < 40; i++) {
		chooseset.push([new Network([48, 20, 3]), 0]);
		placeset.push([new Network([81, 40, 18]), 0]);
	}
	function place1(hoverlocation, highlightedpiece, currentbutton) {
		let bigwin = 0;
		for (let y = 0; y < highlightedpiece.length; y++) {
			for (let x = 0; x < highlightedpiece[0].length; x++) {
				if (highlightedpiece[y][x] === 1 || boardstate[y + hoverlocation[1] - 1][x + hoverlocation[0] - 1] === 1) {
					document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor = "#fcf003";
					boardstate[y - 1 + hoverlocation[1]][x - 1 + hoverlocation[0]] = 1;
					score += 5;
				} else {
					if ((Math.ceil((y + hoverlocation[1]) / 3) === 2) ^ (Math.ceil((x + hoverlocation[0]) / 3) === 2)) {
						document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
							"rgb(129, 129, 129)";
					} else {
						document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
							"rgb(69, 69, 69)";
					}
				}
			}
		}
		let counter = boardstate[0];
		boardstate.forEach((element) => {
			counter = counter.map((e, i) => {
				return e + element[i];
			});
		});
		let combocheck = combo;
		for (let i = 0; i < 9; i++) {
			if (comparearray(boardstate[i], [1, 1, 1, 1, 1, 1, 1, 1, 1])) {
				score += 100 * (combo + 1);
				bigwin += 100 * (combo + 1);
				combo += 1;
				for (let j = 1; j <= 9; j++) {
					if ((Math.ceil((i + 1) / 3) === 2) ^ (Math.ceil(j / 3) === 2)) {
						document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(129, 129, 129)";
					} else {
						document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(69, 69, 69)";
					}
				}
				setTimeout(
					(i) => {
						boardstate[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					},
					1,
					i
				);
			}
			if (counter[i] === 10) {
				score += 100 * (combo + 1);
				bigwin += 100 * (combo + 1);
				combo += 1;
				setTimeout(
					(i) => {
						boardstate.forEach((element) => {
							element[i] = 0;
						});
					},
					1,
					i
				);
				for (let j = 0; j < 9; j++) {
					if ((Math.ceil(i / 3) === 2) ^ (Math.ceil((j + 1) / 3) === 2)) {
						document.getElementById("tile" + (9 * j + i + 1).toString()).style.backgroundColor = "rgb(129, 129, 129)";
					} else {
						document.getElementById("tile" + (9 * j + i + 1).toString()).style.backgroundColor = "rgb(69, 69, 69)";
					}
				}
			}
			let boxstart = [3 * (i % 3), 3 * Math.floor(i / 3)];
			let successfulcheck = true;
			for (let j = boxstart[0]; j <= boxstart[0] + 2; j++) {
				for (let k = boxstart[1]; k <= boxstart[1] + 2; k++) {
					if (boardstate[k][j] === 0) {
						successfulcheck = false;
					}
				}
			}
			if (successfulcheck) {
				for (let j = boxstart[0]; j <= boxstart[0] + 2; j++) {
					for (let k = boxstart[1]; k <= boxstart[1] + 2; k++) {
						boardstate[k][j] = 0;
						if ((Math.ceil((k + 1) / 3) === 2) ^ (Math.ceil((j + 1) / 3) === 2)) {
							document.getElementById("tile" + (9 * k + (j + 1)).toString()).style.backgroundColor = "rgb(129, 129, 129)";
						} else {
							document.getElementById("tile" + (9 * k + (j + 1)).toString()).style.backgroundColor = "rgb(69, 69, 69)";
						}
					}
				}
				score += 100 * (combo + 1);
				bigwin += 100 * (combo + 1);
				combo += 1;
			}
		}
		window.console.log(combo, combocheck);
		if (combocheck === combo) {
			combo = 0;
		}
		document.getElementById("combo").innerHTML = combo.toString().padStart(2, "0");
		let piecebutton = document.getElementById("piece" + currentbutton.toString());
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
		currentpieces.forEach((e, i) => {
			if (document.getElementById("piece" + (i + 1).toString()).innerHTML !== "") {
				currentmoves += checkmoves(e);
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
			train++;
			setTimeout(restart, 1500);
		} else {
			document.getElementById("moves").style.color = "#07f707";
		}
		return bigwin;
	}
	function run(chooser, placer, reward = 0) {
		running = true;
		let piececompression = [];
		for (let h = 1; h <= 3; h++) {
			e = currentpieces[h - 1];
			if (document.getElementById("piece" + h.toString()).innerHTML !== "") {
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
		let chosen = Network.feed(piececompression, chooser);
		let chosenpiece = chosen[0] + chosen[1] + chosen[2];
		if (chosenpiece === 0) {
			chosenpiece = 1;
		}
		let boardcompressed = [];
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				boardcompressed.push(boardstate[i][j]);
			}
		}
		e = currentpieces[chosenpiece - 1];
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
		let possibleposition = [
			place[0] + place[1] + place[2] + place[3] + place[4] + place[5] + place[6] + place[7] + place[8],
			place[9] + place[10] + place[11] + place[12] + place[13] + place[14] + place[15] + place[16] + place[17],
		];
		possibleposition.forEach((e, i) => {
			if (e === 0) {
				possibleposition[i] = 1;
			}
		});
		let highlightedpiece = e;
		let hoverlocation = possibleposition;
		if (!comparearray(highlightedpiece, []) && document.getElementById("piece" + chosenpiece.toString()).innerHTML !== "") {
			if (
				hoverlocation[0] + highlightedpiece[0].length <= 10 &&
				hoverlocation[1] + highlightedpiece.length <= 10 &&
				collision(highlightedpiece, hoverlocation)
			) {
				window.console.log(highlightedpiece, hoverlocation);
				reward += place1(hoverlocation, highlightedpiece, chosenpiece);
				reward += 20;
			} else {
				train++;
				reward = -100;
			}
		} else {
			train++;
			reward = -100;
		}
		running = false;
		if (reward === -100) {
			restart();
		}
		return reward;
	}
	document.getElementById("restart").addEventListener("click", () => {
		restart();
	});
	document.getElementById("import").addEventListener("click", () => {
		let data = window.prompt("Paste JSON data (this WILL wipe current training data)", "data");
		chooseset = [];
		placeset = [];
		for (let i = 0; i < 40; i++) {
			chooseset.push([new Network([48, 20, 3]), 0]);
			placeset.push([new Network([81, 40, 18]), 0]);
		}
		chooseset[39] = JSON.parse(data.substring(0, data.indexOf("split")));
		placeset[39] = JSON.parse(data.substring(data.indexOf("split") + 5));
		train = 100;
		iterations = 0;
		running = false;
		window.console.log(chooseset);
		restart();
	});
	document.getElementById("export").addEventListener("click", () => {
		navigator.clipboard.writeText(JSON.stringify(chooseset[39]) + "split" + JSON.stringify(placeset[39]));
	});
	for (let i = 1; i <= 81; i++) {
		let e = document.createElement("div");
		document.getElementById("board").appendChild(e);
		e.setAttribute("class", "tile");
		e.setAttribute("id", "tile" + i.toString());
		if ((Math.ceil(Math.ceil(i / 9) / 3) === 2) ^ (Math.ceil((((i - 1) % 9) + 1) / 3) === 2)) {
			document.getElementById("tile" + i.toString()).style.backgroundColor = "rgb(129, 129, 129)";
		} else {
			document.getElementById("tile" + i.toString()).style.backgroundColor = "rgb(69, 69, 69)";
		}
		e.addEventListener("mouseover", () => {
			let id = e.id.substring(4);
			hoverlocation = [((id - 1) % 9) + 1, Math.ceil(id / 9)];
			if (!comparearray(highlightedpiece, [])) {
				if (
					hoverlocation[0] + highlightedpiece[0].length <= 10 &&
					hoverlocation[1] + highlightedpiece.length <= 10 &&
					collision(highlightedpiece, hoverlocation)
				) {
					for (let y = 0; y < highlightedpiece.length; y++) {
						for (let x = 0; x < highlightedpiece[0].length; x++) {
							if (highlightedpiece[y][x] === 1 || boardstate[y + hoverlocation[1] - 1][x + hoverlocation[0] - 1] === 1) {
								document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
									"#fcf003";
							} else {
								document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
									"rgb(109, 109, 109)";
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
					collision(highlightedpiece, hoverlocation)
				) {
					for (let y = 0; y < highlightedpiece.length; y++) {
						for (let x = 0; x < highlightedpiece[0].length; x++) {
							if (boardstate[y - 1 + hoverlocation[1]][x - 1 + hoverlocation[0]] === 0) {
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
								document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
									"#fcf003";
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
					collision(highlightedpiece, hoverlocation)
				) {
					place1(hoverlocation, highlightedpiece, currentbutton);
				}
			}
		});
	}
	document.querySelectorAll(".piece").forEach((element) => {
		element.addEventListener("click", () => {
			if (element.innerHTML !== "") {
				if (currentbutton !== element.id.substring(5)) {
					highlightedpiece = currentpieces[element.id.substring(5) - 1];
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
	function tick() {
		if (pieceamount === 0) {
			currentpieces = [];
			for (let i = 1; i <= 3; i++) {
				document.getElementById("piece" + i.toString()).innerHTML = "";
				let piececontainer = document.getElementById("piece" + i.toString());
				let pendingpiece = piecepool[Math.floor(Math.random() * piecepool.length)];
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
				currentpieces.push(pendingpiece);
			}
			let currentmoves = -1;
			currentpieces.forEach((e, i) => {
				if (document.getElementById("piece" + (i + 1).toString()).innerHTML !== "0") {
					currentmoves += checkmoves(e);
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
				train++;
				setTimeout(restart, 1500);
			} else {
				document.getElementById("moves").style.color = "#07f707";
			}
			pieceamount = 3;
		}
		document.getElementById("score").innerHTML = score.toString().padStart(5, "0");
		if (!running) {
			try {
				chooseset[train][1] = run(chooseset[train][0], placeset[train][0], chooseset[train][1]);
				document.getElementById("info").innerHTML =
					"NN: " + (train + 1).toString().padStart(2, "0") + " / I: " + iterations.toString().padStart(3, "0");
			} catch (e) {
				document.getElementById("info").innerHTML = e.message;
			}
			placeset[train][1] = chooseset[train][1];
		}
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
});
