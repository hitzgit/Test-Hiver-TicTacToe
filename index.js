/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

var grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

// variables for solution;
var rowCounter = [];
var colCounter = [];
var diagLeft = 0;
var diagRight = 0;
var playerTurn = 1;
var playerWon = false;
var row = [];
var col = [];
// end of variables used for solution;

function initializeGrid() {
    grid = [];
	for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
	playerTurn = 1;
	rowCounter = [];
	colCounter = [];
	diagLeft = 0;
	diagRight = 0;
	playerWon = false;
	row = [];
	col = [];
	
	document.getElementById("winningPlayer").innerHTML = "Game On !!";
	document.getElementById("winningPlayer").classList.remove('winBody');
	
	renderMainGrid();
	addClickHandlers();
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    
	/* var rowIdx;
	var colIdx;
	if(this.length === undefined)
	{
		rowIdx = this.getAttribute("rowIdx");
		colIdx = this.getAttribute("colIdx");
		row.push(rowIdx);
		col.push(colIdx);
	}
	else
	{
		
		
		var num1 = Math.floor((Math.random()*3));
		var num2 = Math.floor((Math.random()*3));
		while(grid[num1][num2] == 0)
		{
			num1 = Math.floor((Math.random()*3));
			num2 = Math.floor((Math.random()*3));
			if(grid[num1][num2] == 0)
				break;
		}
		
		rowIdx = num1;
		colIdx = num2;
	} */
	
	
	var rowIdx = this.getAttribute("rowIdx");
	var colIdx = this.getAttribute("colIdx");
    
	// logic starts here
	
	var score;
	if(playerTurn == 1)
		score = 1;
	else
		score = -1;
	
	if(isNaN(rowCounter[rowIdx]))
		rowCounter[rowIdx] = score;
	else
		rowCounter[rowIdx] = rowCounter[rowIdx] + score;
	
	if(isNaN(colCounter[colIdx]))
		colCounter[colIdx] = score;
	else
		colCounter[colIdx] = colCounter[colIdx] + score;
	
	
	
	if(rowIdx == colIdx)
		diagLeft = diagLeft + score;
	if(rowIdx == GRID_LENGTH - colIdx - 1)
		diagRight = diagRight + score;
	
	grid[colIdx][rowIdx] = playerTurn;
    renderMainGrid();
    addClickHandlers();
	
	if(rowCounter[rowIdx] == GRID_LENGTH || colCounter[colIdx] == GRID_LENGTH || diagLeft == GRID_LENGTH || diagRight == GRID_LENGTH)
	{
		playerWon = true;
		document.getElementById("winningPlayer").innerHTML = "Player X has won !!!";
		document.getElementById("winningPlayer").classList.add('winBody');
	}
	if(rowCounter[rowIdx] == -GRID_LENGTH || colCounter[colIdx] == -GRID_LENGTH || diagLeft == -GRID_LENGTH || diagRight == -GRID_LENGTH)
	{	
		playerWon = true;
		document.getElementById("winningPlayer").innerHTML = "Player O has won !!!";
		document.getElementById("winningPlayer").classList.add('winBody');
	}
	//player change
	if(playerTurn == 1)
	{
		playerTurn = 2;
		//onBoxClick();
		// Computer player to be completed.
	}
	else
		playerTurn = 1;
	
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


initializeGrid();


