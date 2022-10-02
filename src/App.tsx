import { invoke } from '@tauri-apps/api/tauri';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeReact from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

PrimeReact.ripple = true;

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div className="flex flex-column justify-content-center text-center">
      <h1>Welcome to Tauri!</h1>

      <div className="flex justify-content-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="flex justify-content-center">
        <InputText onChange={(e) => setName(e.currentTarget.value)} placeholder="Enter a name..." className="mr-3" />
        <Button onClick={() => greet()}>Greet</Button>
      </div>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
