import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import logo from './logo.svg';
import './App.css';

const parseLocation = () =>
  window.location.search
    .substr(1)
    .split("&")
    .reduce((result, item) => [...result, { param: item.split('=')[0], value: decodeURIComponent(item.split('=')[1]) }], []);


const App = () => {
  const [items, setItems] = React.useState({ data: [], objs: parseLocation() });
  React.useEffect(() => {
    if (!items.objs.length) {
      return;
    }
    const timer = setTimeout(() => {
      const newState = {
        data: [...items.data, ...items.objs.splice(0, 1)],
        objs: items.objs
      };
      setItems(newState);
    }, 50);
    return () => clearTimeout(timer);
  }, [items, setItems]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="paramsBlock">
        <div><b>Passed params:</b></div>
        <Flipper 
          flipKey={`${items.data.map(item => item.param).join('_')}`}
          staggerConfig={{
            default: {
              reverse: true,
              speed: 1
            }
          }}
        >
          {items.data.map((item, i) => (
            <Flipped key={`${item.param}-${i}`} flipId={item.param} stagger>
              <div className="list">
                <div className="param">{item.param}:</div>
                <div className=""><i>{item.value}</i></div>
              </div>
            </Flipped>
          ))}
        </Flipper>
      </div>
    </div>
  );
};

export default App;
