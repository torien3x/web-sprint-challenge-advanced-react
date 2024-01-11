import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = `http://localhost:9000/api/result`;


// Suggested initial states
// const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [xyLocation, setXYLocation] = useState({x:2, y: 2})
  const [message, setMessage] = useState('')

const gridSize = 3


useEffect(() => {
  setIndex((xyLocation.y - 1) * gridSize + (xyLocation.x - 1));
}, [xyLocation]);

const updateXYLocation = (newX, newY) => {
  if (newX > 0 && newX <= gridSize && newY > 0 && newY <= gridSize) {
    setXYLocation({ x: newX, y: newY });
    setStep((prev) => prev + 1);
  }
};

let coordinates = `${xyLocation.x},${xyLocation.y}`
// useEffect(()=>{
// if (coordinates === '1,1' ) {
//   if(direction === 'up') {
//     setMessage("You can't go up")
//   }else if (direction === 'left') {
//     setMessage("You can't go left")
//   }
// } else if (coordinates === '2,1') {
//   if(direction === 'up') {
//     setMessage("You can't go up")
//   }
// } else if (coordinates === '3,1') {
//   if(direction === 'up') {
//     setMessage("You can't go up")
//   }else if (direction === 'right') {
//     setMessage("You can't go right")
//   }
// } else if(coordinates === '1,3') {
//   if(direction === 'down') {
//     setMessage("You can't go down")
//   } else if (direction === 'left') {
//     setMessage("Yo can't go left")
//   }
// } else if (coordinates === '2,3') {
//   if(direction === 'down') {
//     setMessage("You can't go down")
//   }
// } else if (coordinates === '3,3') {
//   if(direction === 'down') {
//     setMessage("You cant go down")
//   } else if (direction === 'right') {
//     setMessage("You can't go right")
//   }
// } else if (coordinates === '1,2') {
//   if(direction === 'left') {
//     setMessage("You can't go left")
//   }
// } else if (coordinates === '3,2') {
//   if(direction === 'right') {
//     setMessage("You can't go right")
//   }
// } else {
//   setMessage("")
// }
// },[direction, coordinates])


const move = (dx, dy, direction) => {
if (coordinates === '1,1' ) {
  if(direction === 'up') {
    setMessage("You can't go up")
  }else if (direction === 'left') {
    setMessage("You can't go left")
  }
} else if (coordinates === '2,1') {
  if(direction === 'up') {
    setMessage("You can't go up")
  }
} else if (coordinates === '3,1') {
  if(direction === 'up') {
    setMessage("You can't go up")
  }else if (direction === 'right') {
    setMessage("You can't go right")
  }
} else if(coordinates === '1,3') {
  if(direction === 'down') {
    setMessage("You can't go down")
  } else if (direction === 'left') {
    setMessage("You can't go left")
  }
} else if (coordinates === '2,3') {
  if(direction === 'down') {
    setMessage("You can't go down")
  }
} else if (coordinates === '3,3') {
  if(direction === 'down') {
    setMessage("You can't go down")
  } else if (direction === 'right') {
    setMessage("You can't go right")
  }
} else if (coordinates === '1,2') {
  if(direction === 'left') {
    setMessage("You can't go left")
  }
} else if (coordinates === '3,2') {
  if(direction === 'right') {
    setMessage("You can't go right")
  }
} else {
  setMessage("")
}

  updateXYLocation(xyLocation.x + dx, xyLocation.y + dy);
};

function reset() {
  setXYLocation({ x: 2, y: 2 });
  setIndex(initialIndex);
  setStep(initialSteps);
  setMessage("")
  setEmail("")
}



  function onChange(evt) {
    setEmail(evt.target.value);
  }



  function onSubmit(e) {
    e.preventDefault()
    if(email === "") {
      setMessage('Ouch: email is required')
    } else { 
      const data =  {"x": xyLocation.x, "y": xyLocation.y, "steps": step, "email": email}
    // Use a POST request to send a payload to the server.
    axios
    .post(URL, data)
    .then((res) => setMessage(res.data.message))
    .catch((err) => setMessage(err.response.data.message))
    setMessage("")
    setEmail("")
  }
  }

const renderGrid = () => {
  let rows = [];
  for (let y = 1; y <= gridSize; y++) {
    let row = [];
    for (let x = 1; x <= gridSize; x++) {
      let cellIndex = (y - 1) * gridSize + (x - 1);
      row.push(
        <div key={cellIndex} className={`square${cellIndex === index ? ' active' : ''}`}> 
          {cellIndex === index ? "B" : ""}
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


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({xyLocation.x},{xyLocation.y})</h3>
        <h3 id="steps">You moved {step === 1 ? step + ' time' : step + ' times'}</h3>
      </div>
      <div id='grid'>
        {renderGrid()}
      </div>
      <div className="info">
        <h3 id="message">
          {message}
        </h3>
      </div>

      <div id="keypad">
        <button onClick={() => move(-1, 0, 'left')} id="left">LEFT</button>
        <button onClick={() => move(0, -1, 'up')}id="up">UP</button>
        <button onClick={() => move(1, 0, 'right')}id="right">RIGHT</button>
        <button onClick={() => move(0, 1, 'down')} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
