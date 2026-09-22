import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [rating, setRating] = useState("");
  const [goalRating, setGoalRating] = useState("");
  const [trophies, setTrophies] = useState(null);

  const calculateRating = () => {
    var i = 0;
    var rate = Number(rating);

    var troph = new Map();

    for(var i = 15; i >= 10; i--){
      var j = 0;
      var rate = Number(rating);

      while(rate < goalRating){
        var newRating = rate + (1000 * i - rate) / 50;
        if(newRating <= rate)
        {
          j = -1;
          break;
        }
        rate = newRating;

        j++;
      }

      troph.set(i, j);

    }

    setTrophies(troph);
  };

  return (
    <>
      <div>
        <h1>Skillshot City Trophy Calculator</h1>
        <form action={calculateRating}>
          <div>
            <label htmlFor="rating">Current Rating: </label>
            <input type="number" id="rating" min={0} value={rating} onChange={(event) => setRating(event.target.value)}></input>
          </div>
          <div>
            <label htmlFor="goal">Desired Rating: </label>
            <input type="number" id="goal" min={0} value={goalRating} onChange={(event) => setGoalRating(event.target.value)}></input>
          </div>
          <div>
            <button type="submit">Calculate</button>
          </div>
        </form>
      </div>
      {trophies && 
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Trophies</th>
                <th>Matches</th>
              </tr>
            </thead>
            <tbody>
              {[...trophies.entries()].map((trophy) =>(
                <tr key={trophy[0]}>
                  <td>{trophy[0]}</td>
                  <td>{trophy[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default App
