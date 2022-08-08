import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Load, Filter } from './Redux/Actions';
import React from 'react';

function Search(){
  const dispatch = useDispatch();

  let input= React.useRef();

  const handleSubmit = (e) =>{
    e.preventDefault(e.target.value);
    dispatch(Filter(input.current.value.split(/\s*,\s*/)))
  }
  return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter id" ref={input}></input>
          <input type='submit' hidden/>
          <button type='submit'>Filter</button>
        </form>
  )
  
}

function App() {
  const dispatch = useDispatch();

  const request = 'https://gist.githubusercontent.com/codeholic/23e37417db35be1fa89060b360abb164/raw/deb4e8dd41c3df43fffb7e7f7770a38cd8cf5d40/event_venues.json'
  const load = useEffect (()=>{
    dispatch(Load(request))

  }, [])

  const data = useSelector(state => state.response)

  const condition = useSelector(state => state.filter)

  let filter;
  if (condition.length === 0 || condition[0] == ''){
      filter = data;
    }
    else {
      filter = data.filter(item => condition?.includes(String(item.id)));
    }

  const error = useSelector(state => state.error)

  return (
    <div className ='container'>
      <div className ='header'>
      <Search />
      </div>
      {error && <div className = 'error'><p>Connection error</p></div>}
      {filter.length === 0 && <div>Nothing found</div>}
      <ol>
        {filter.map(res =>{
          return(
            <li key={res.id}>{res.title}<small>id: {res.id}</small></li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
