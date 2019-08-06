import React, { Fragment, useState,useEffect } from 'react';
import { createBrowserHistory } from 'history';
 


const Home = ({ match }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);


  useEffect(() => {
    const history = createBrowserHistory();
    window.onpopstate  = (e) => {
      if(history.action==="POP"){
        console.log(history.location)
         
      }

      }
    
  // eslint-disable-line
  }, [])
 
 
  const onSubmit = e => {
    e.preventDefault();
    const history = createBrowserHistory();
    let arr = input.split(', ').map(function(item) {
      return parseInt(item, 10);
    });
    let result = [];
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === arr[i + 1]) continue;
      result.push(arr[i]);
    }
    setResult(result);
    history.push(`/:${input}`, { input });
    console.log(history.action,history.location.state.input,history)
   
    
  };
  const onChange = e => {
    setInput(e.target.value);
  };
  const clear = () => {
   
    // const unlisten = history.listen((location, action) => {
    //   console.log(action, location.pathname, location.state);

    // });

    //unlisten();
    setInput('');
    setResult([]);
  };
 

  return (
    <div>
      <Fragment>
      <form onSubmit={onSubmit}>
        <input
          value={input}
          onChange={onChange}
          pattern="^\d(, ?\d)*$"
          title="Enter numbers separated by coma & space"
          required
        />
        <input type="submit" value="Remove" />
      </form>
      
      </Fragment>
    
      {result.length > 1 && (
        <Fragment>
          <h1>{result}</h1>
          <button className="btn btn-light btn-block" onClick={clear}>
            Clear Result
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
