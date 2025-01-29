import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/search?query=nature&page=1', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: import.meta.env.VITE_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const postsData = await response.json();
        console.log(postsData)
      } catch (err) {
        console.log(err)
        console.log('err')
      } finally {
        console.log('finally')
      }
    };

    fetchDataForPosts();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
