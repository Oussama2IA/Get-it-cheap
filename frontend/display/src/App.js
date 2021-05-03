import './styles/App.scss';
import Search from './components/Search';
import Result from './components/Result';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/:category/:product" component={Result} />
      </Switch>
    </Router>
  );
}

export default App;
