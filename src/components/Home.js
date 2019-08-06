import React, { Fragment, useState, useEffect } from 'react';

const Home = props => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [userHistory, setHistory] = useState({ history: [] });


  useEffect(() => {
    if (localStorage.getItem('history') !== null) {
 
      let data = JSON.parse(localStorage.getItem('history'));
      setHistory({ history: data.history });
      
    }

    // eslint-disable-line
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    let arr = input.split(', ').map(function(item) {
      return parseInt(item, 10);
    });
    let result = [];
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === arr[i + 1]) continue;
      result.push(arr[i]);
    }
    setResult(result);
    saveToStorage();
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
  const saveToStorage = () => {


    let history = userHistory ? userHistory : { history: [] };
    history.history.push(input);
    localStorage.setItem('history', JSON.stringify(history));
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
