import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';


export default function run_demo(root) {
  ReactDOM.render(<Demo/>, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
	board: ["?","?","?","?","?","?","?","?","?","?","?","?","?","?","?","?"],
	actual: this.shuffle(["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"]),
	isEnabled: [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true, true],
	score:100,
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
	var clickable = this.state.clickable 
	if(this.state.isEnabled[index])
	{
		var clicks = this.state.noClick; 
		clicks = clicks+1;
		if(clicks%2==1)
			{
				tempBoard[index] = this.state.actual[index]
				tempIsEnabled[index] = false;	
				this.state.char1 = char;
				this.state.index1 = index;
			}
		else
		{
			
			tempBoard[index] = this.state.actual[index]
			tempIsEnabled[index] = false;
			this.state.char2 = char;
			this.state.index2 = index;
			if( this.state.char1 === this.state.char2)
			{
				if(clicks>16)
					sco -=10
				else
					sco +=50
			}
			else
			{
				clickable=false;	
				tempIsEnabled[this.state.index1] = true;
				tempIsEnabled[this.state.index2] = true;	
				setTimeout(() => {	
						clickable = true;
						tempBoard[this.state.index1] = "?"
						tempBoard[this.state.index2] = "?"
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
			index1: this.state.index1,
			index2: this.state.index2,
			char1: this.state.char1,
			char2: this.state.char2,	
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
		score:100,
		noClick: 0,
		totClicks: 0,
		index1: -1,
		index2: -1,
		char1: this.state.char1,
		char2: this.state.char2,
		clickable: true
	})
}

  render() {
		return (
		<div className="container-fluid">
	      <div className="col">
		<div className="row">
			<div id="score">	
				Score={this.getScore(this.state)}
			</div>
		</div>
		<div className="board">
			{this.state.board.map((cell, index) => {return <div className="square" 	onClick={() => this.handleClick(index)} >{cell}</div>})}
		</div>
		<div className="row">
			<button className="btn btn-info" name="Restart" onClick={() => this.newGame()} >New Game</button>
		</div>
	      </div>	
		</div>	
    		);
	}
}





