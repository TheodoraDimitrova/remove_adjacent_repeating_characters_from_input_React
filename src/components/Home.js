import React, { Fragment, useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';
const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [userHistory, setHistory] = useState({ history: [] });

  const history = createBrowserHistory();
  useEffect(() => {
    if (localStorage.getItem('history') !== null) {
      let data = JSON.parse(localStorage.getItem('history'));
      setHistory({ history: data.history });
    }
    window.onpopstate = e => {
      let data = JSON.parse(localStorage.getItem('history'));
      let last = data.history.pop();
      setHistory(data);

      setInput(last);
      localStorage.setItem(
        'history',
        JSON.stringify({ history: data.history })
      );
    };

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
    history.push('/', { userInput: input });
    saveToStorage();
  };
  const onChange = e => {
    setInput(e.target.value);
  };
  const clear = () => {
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
