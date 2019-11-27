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
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(parseLocation());
  }, [setData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="paramsBlock">       
        <div>Passed params:</div> 
        <Flipper flipKey={`${data.map(item => item.param).join('_')}`}>          
          <ul className="list">
            {data.map(item => (
              <Flipped key={item.param} flipId={item.param} stagger>
                <li>
                  {item.param}: <i> {item.value}</i>
                </li>
              </Flipped>
            ))}            
          </ul>
        </Flipper>
      </div>
    </div>
  );
};

export default App;
