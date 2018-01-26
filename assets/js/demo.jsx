import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
import { container } from 'reactstrap';


export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
	board: ["?","?","?","?","?","?","?","?","?","?","?","?","?","?","?","?"],
	actual: this.shuffle(["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]),
	isEnabled: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true, true],
	score:0,
	noClick: 0,
	index1: -1,
	index2: -1,
	char1: "",
	char2: "",
	clickable: true
 	};
  }
	
 
handleClick(index)
{if(this.state.clickable){
	var tempBoard = this.state.board
	var tempIsEnabled = this.state.isEnabled
	var sco = this.state.score
	var char = this.state.actual[index];
	var chars = []
	chars.push(this.state.char1)
	chars.push(char)
	var newInd = index
	var ind = []
	ind.push(this.state.index1)
	ind.push(newInd)
	var clickable = this.state.clickable 
	if(this.state.isEnabled[index])
	{
		var clicks = this.state.noClick; 
		clicks = clicks+1;
		if(clicks%2==1)
			{
				tempBoard[index] = this.state.actual[index]
				tempIsEnabled[index] = false;	
			}
		else
		{
			
			tempBoard[index] = this.state.actual[index]
			tempIsEnabled[index] = false;
			if( chars[0] === chars[1])
			{
				if(clicks>32)
					sco +=10
				else
					sco +=20
			}
			else
			{
				clickable=false;	
				tempIsEnabled[ind[0]] = true;
				tempIsEnabled[ind[1]] = true;	
				setTimeout(() => {	
						clickable = true;
						tempBoard[ind[0]] = "?"
						tempBoard[ind[1]] = "?"
           					 this.setState({
					            board: tempBoard,
						    clickable: clickable
          						})
					        }, 2000);
			}
			
		}
		
		this.setState({
			board: tempBoard,
			isEnabled: tempIsEnabled,
			score: sco,
			noClick: clicks,
			index1: ind[1],
			index2: ind[0],
			char1: chars[1],
			char2: chars[0],	
			clickable: clickable			
		});
	}
}}

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


getScore(gameState)
{
	return gameState.score;
}

newGame()
{
	this.setState({
		board: ["?","?","?","?","?","?","?","?","?","?","?","?","?","?","?","?"],
		actual: this.shuffle(["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]),
		isEnabled: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true, true],
		score:0,
		noClick: 0,
		index1: -1,
		index2: -1,
		char1: "",
		char2: "",
		clickable: true
	})
}

  render() {
		return (
		<div className="container">
			<div className="row">
				<div className="col">
					<div id="score">	
						Score={this.getScore(this.state)}
					</div>
				</div>
				<div className="col">
					<div className="board">
						{this.state.board.map((cell, index) => {return <div className="square" 	onClick={() => this.handleClick(index)} >{cell}</div>})}
					</div>
				</div>
				<div className="col">
					<div className="row">					
						<button className="btn btn-info" name="Restart" onClick={() => this.newGame()} >New Game</button>
					</div>
					<div className="row">					
						<a href="http:\\prateekpisat.com"><button className="btn btn-info" name="Back to HomePage">Back</button></a>
					</div>
				</div>
		      </div>	
		 </div>		
    		);
	}
}





