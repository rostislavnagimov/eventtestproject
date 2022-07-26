import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Load, Filter } from './Redux/Actions';

function App() {
  const dispatch = useDispatch();

  const request = 'https://gist.githubusercontent.com/codeholic/23e37417db35be1fa89060b360abb164/raw/deb4e8dd41c3df43fffb7e7f7770a38cd8cf5d40/event_venues.json'
  const load = useEffect (()=>{
    dispatch(Load(request))

  }, [])

  const data = useSelector(state => state.response)

  const condition = useSelector(state => state.filter)

  const filter = (data) => {
    if (condition.length === 0 || condition == ''){
      return data;
    }
    else {
      return data.filter(item => condition[0]?.includes(item.id));
    }

  }
  console.log(condition)

  const [input, setInput] = useState()

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(Filter(input))
  }

  const error = useSelector(state => state.error)

  const showError = () => {
    return(
      <div className = 'error'>
        <p>Connection error</p>
      </div>

    )
  }

  return (
    <div className ='container'>
      <div className ='header'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter id" onChange={handleChange}></input>
          <input type='submit' hidden/>
          <button type='submit'>Filter</button>
        </form>
      </div>
      {error && showError()}
      <ol>
        {filter(data).map(res =>{
          return(
            <li key={res.id}>{res.title}<small>id: {res.id}</small></li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
