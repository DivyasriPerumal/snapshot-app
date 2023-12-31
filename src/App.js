import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const API_KEY="81c182b66d4a4f94ae034f1aad105700";
  const [search, setSearch] = useState(""); 
  const[img, setImg] =useState("");
  const[error, setError] = useState(false);
  const[loading, setloading] = useState(false);
  const URL=`https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;
  
  const getScreenshot = async () => {
    setSearch("");
    setError(false);
    setloading(true);
    const response = await fetch(URL);
    if(response.ok){
      setImg(response);
      setloading(false);
    }
    else{
      setError(true);
    }
  }
  
  const searchScreenshot = (e) => {
    e.preventDefault();
    getScreenshot();
  };

  useEffect(() => {
    setSearch("");
    getScreenshot();
  }, []);

  return (
    <div className="App">
    <nav>
      <div className='container'>
        <form onSubmit={searchScreenshot}>
          <input 
          autoFocus
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}/>
          <button type="submit">Take screenshot</button>
        </form>

      </div>
    </nav>

    <div className='hero'>
      { !loading && !error ? (
      <div className='container'>
        {img && (
          <a href={img.url} target='_blank'>
          <img src={img.url} alt="background" /></a>
        )}
        </div>
        ) : !error && loading ?(
          <div className='loading'></div>
        ): error ?(
          <div className='container'>
            <h2>Please enter a valid url</h2>
          </div>
        ): (
          ""
        )
      }

    </div>
    </div>
  );
}

export default App;
