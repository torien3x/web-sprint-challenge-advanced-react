import axios from 'axios'
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  xyLocation: {x: 2, y: 2},
}

const URL = `http://localhost:9000/api/result`;
const gridSize = 3

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      xyLocation: {x: 2, y: 2},
      winMessage: ''
    };
  }

  checkMoveConstraints() {
    let coordinates = `${this.state.xyLocation.x},${this.state.xyLocation.y}`

    if (coordinates === '1,1' || coordinates === '2,1' || coordinates === '3,1') {
      this.setState({message:"You can't go up"});
    } else if (coordinates === '1,3' || coordinates === '2,3' || coordinates === '3,3') {
      this.setState({message:"You can't go down"});
    } else if (coordinates === '1,1' || coordinates === '1,2' || coordinates === '1,3') {
      this.setState({message:"You can't go left"});
    } else if (coordinates === '3,1' || coordinates === '3,2' || coordinates === '3,3') {
      this.setState({message:"You can't go right"});
    }
    console.log('message', this.state.message, coordinates);
  }
  
  
 
  updateXYLocation(newX, newY) {
    if (newX > 0 && newX <= gridSize && newY > 0 && newY <= gridSize) {
      this.setState(
        (prevState) => ({
          xyLocation: { x: newX, y: newY },
          steps: prevState.steps + 1,
        }),
        () => {
          this.updateIndex();
          // this.checkMoveConstraints(); // Check move constraints after updating state
        }
      );
    }
  }

updateIndex = () => {
  const { x, y } = this.state.xyLocation;
  this.setState({
    index: (y - 1) * gridSize + (x - 1)
  });
}


  move = (dx, dy, direction) => {
    let coordinates = `${this.state.xyLocation.x},${this.state.xyLocation.y}`

    if (coordinates === '1,1' ) {
      if(direction === 'up') {
        this.setState({message:"You can't go up"})
      }else if (direction === 'left') {
        this.setState({message:"You can't go left"})
      }
    } else if (coordinates === '2,1') {
      if(direction === 'up') {
        this.setState({message:"You can't go up"})
      }
    } else if (coordinates === '3,1') {
      if(direction === 'up') {
        this.setState({message:"You can't go up"})
      }else if (direction === 'right') {
        this.setState({message:"You can't go right"})
      }
    } else if(coordinates === '1,3') {
      if(direction === 'down') {
        this.setState({message:"You can't go down"})
      } else if (direction === 'left') {
        this.setState({message:"You can't go left"})
      }
    } else if (coordinates === '2,3') {
      if(direction === 'down') {
        this.setState({message:"You can't go down"})
      }
    } else if (coordinates === '3,3') {
      if(direction === 'down') {
        this.setState({message:"You can't go down"})
      } else if (direction === 'right') {
        this.setState({message:"You can't go right"})
      }
    } else if (coordinates === '1,2') {
      if(direction === 'left') {
        this.setState({message:"You can't go left"})
      }
    } else if (coordinates === '3,2') {
      if(direction === 'right') {
        this.setState({message:"You can't go right"})
      }
    } else {
      this.setState({message:""})
    }

    this.updateXYLocation(this.state.xyLocation.x + dx, this.state.xyLocation.y + dy);
  };


  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      xyLocation: {x: 2, y: 2},
      steps: initialSteps,
    });
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  onSubmit = async (e) => {
    // Use a POST request to send a payload to the server.
      e.preventDefault();
      if (this.state.email === "") {
      this.setState({
        message: 'Ouch: email is required'
      })
     } else {
      const data =  {"x": this.state.xyLocation.x, "y": this.state.xyLocation.y, "steps": this.state.steps, "email": this.state.email}
      axios
      .post(URL, data)
      .then((res) => this.setState({message: res.data.message}))
      .catch((err) => this.setState({message: err.response.data.message}))
  
      this.setState({
        message: initialMessage,
        email: initialEmail,
      });
     }
    };

     renderGrid = () => {
      let rows = [];
      for (let y = 1; y <= gridSize; y++) {
        let row = [];
        for (let x = 1; x <= gridSize; x++) {
          let cellIndex = (y - 1) * gridSize + (x - 1);
          row.push(
            <div key={cellIndex} className={`square${cellIndex === this.state.index ? ' active' : ''}`}> 
              {cellIndex === this.state.index ? "B" : ""}
            </div>
          );
        }
        rows.push(
          <React.Fragment key={y}>
            {row}
          </React.Fragment>
        );
      }
      return rows;
    }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xyLocation.x},{this.state.xyLocation.y})</h3>
          <h3 id="steps">You moved {this.state.steps === 1 ? this.state.steps + ' time' : this.state.steps + ' times' }</h3>
        </div>
        <div id="grid">
        {this.renderGrid()}
        </div>
        <div className="info">
          <h3 id="message">
          {this.state.message}
          </h3>
          
        </div>
        <div id="keypad">
        <button onClick={() => this.move(-1, 0, 'left')} id="left">LEFT</button>
          <button onClick={() => this.move(0, -1, 'up')} id="up">UP</button>
          <button onClick={() => this.move(1, 0, 'right')} id="right">RIGHT</button>
          <button onClick={() => this.move(0, 1, 'down')} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
