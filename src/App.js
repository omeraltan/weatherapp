import React, { useState } from 'react';
import './App.css';
function App() {
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [isReady, setReady] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=c36b03a963176b9a639859e6cf279299&units=metric')
      .then(result => result.json())
      .then(jsonresult => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setReady(true);
      })
      .catch(err => console.error(err));
  }, []);
  const fetchData = () => {
    fetch(`https://api.github.com/search/repositories?q=${keyword}`)
      .then(response => response.json())
      .then(data => setData(data.items))
      .catch(err => console.error(err));
  };
  if (isReady) {
    return (
      <div className="App">
        <div>
          <p>Temperature: {temp} °C</p>
          <p>Description: {desc}</p>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
        </div>
        <div>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} />
          <button onClick={fetchData}>Fetch</button>
          <table>
            <tbody>
              {data.map(repo => (
                <tr>
                  <td>{repo.full_name}</td>
                  <td>
                    <a href={repo.html_url}>{repo.html_url}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default App;
