import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navegacion from './components/Navegacion';
import Principal from './components/Principal'

function App() {
  return (
    <div className="container">
        <Navegacion />
        <Principal />
    </div>
  );
}

export default App;
