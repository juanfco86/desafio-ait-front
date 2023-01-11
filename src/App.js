import logo from './logo.svg';
import './App.css';
import AuthenticationButton from './Components/auth0/AuthenticationButton';
import ExternalApi from './views/external-api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
          <AuthenticationButton />
          <div>
            <ExternalApi />
          </div>
      </header>
    </div>
  );
}

export default App;
