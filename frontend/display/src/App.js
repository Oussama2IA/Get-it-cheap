import './styles/App.scss';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Search from './components/Search';
import Result from './components/Result';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Footer />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/:category/:product" component={Result} />
      </Switch>
    </Router>
  );
}

export default App;
