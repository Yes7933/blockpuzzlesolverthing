document.addEventListener("DOMContentLoaded", () => {
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
	function comparearray(array1, array2) {
		return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
	}
	function collision(array, positionarray) {
		for (let y = 0; y < highlightedpiece.length; y++) {
			for (let x = 0; x < highlightedpiece[0].length; x++) {
				if (boardstate[y + positionarray[1] - 1][x + positionarray[0] - 1] + array[y][x] === 2) {
					return false;
				}
			}
		}
		return true;
	}
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
					for (let y = 0; y < highlightedpiece.length; y++) {
						for (let x = 0; x < highlightedpiece[0].length; x++) {
							if (highlightedpiece[y][x] === 1 || boardstate[y + hoverlocation[1] - 1][x + hoverlocation[0] - 1] === 1) {
								document.getElementById("tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()).style.backgroundColor =
									"#fcf003";
								boardstate[y - 1 + hoverlocation[1]][x - 1 + hoverlocation[0]] = 1;
								score += 5;
							} else {
								if ((Math.ceil((y + hoverlocation[1]) / 3) === 2) ^ (Math.ceil((x + hoverlocation[0]) / 3) === 2)) {
									document.getElementById(
										"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
									).style.backgroundColor = "rgb(129, 129, 129)";
								} else {
									document.getElementById(
										"tile" + (9 * (y + hoverlocation[1] - 1) + (x + hoverlocation[0])).toString()
									).style.backgroundColor = "rgb(69, 69, 69)";
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
					for (let i = 0; i < 9; i++) {
						if (comparearray(boardstate[i], [1, 1, 1, 1, 1, 1, 1, 1, 1])) {
							score += 100;
							for (let j = 1; j <= 9; j++) {
								if ((Math.ceil(i / 3) === 2) ^ (Math.ceil(j / 3) === 2)) {
									document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(129, 129, 129)";
								} else {
									document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(69, 69, 69)";
								}
							}
							setTimeout(
								(i) => {
									boardstate[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
								},
								100,
								i
							);
						}
						if (counter[i] === 10) {
							setTimeout(
								(i) => {
									boardstate.forEach((element) => {
										element[i] = 0;
									});
								},
								100,
								i
							);
							score += 100;
							for (let j = 0; j < 9; j++) {
								if ((Math.ceil(i / 3) === 2) ^ (Math.ceil((j + 1) / 3) === 2)) {
									document.getElementById("tile" + (9 * i + j - 1).toString()).style.backgroundColor = "rgb(129, 129, 129)";
								} else {
									document.getElementById("tile" + (9 * i + j - 1).toString()).style.backgroundColor = "rgb(69, 69, 69)";
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
									if ((Math.ceil(i / 3) === 2) ^ (Math.ceil(j / 3) === 2)) {
										document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(129, 129, 129)";
									} else {
										document.getElementById("tile" + (9 * i + j).toString()).style.backgroundColor = "rgb(69, 69, 69)";
									}
								}
							}
							score += 100;
						}
					}
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
	function tick() {
		if (pieceamount === 0) {
			currentpieces = [];
			for (let i = 1; i <= 3; i++) {
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
			pieceamount = 3;
		}
		document.getElementById("score").innerHTML = score.toString().padStart(5, "0");
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
});
