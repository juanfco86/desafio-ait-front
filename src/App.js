import logo from './logo.svg';
import './App.css';
import AuthenticationButton from './Components/auth0/AuthenticationButton';
import ExternalApi from './views/external-api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <AuthenticationButton />
          <div>
          <hr />
            <ExternalApi />
          </div>
      </header>
    </div>
  );
}

export default App;
