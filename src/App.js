import React , {Component} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Provider} from './context';
import Navbar from './Components/Navbar';
import Index from './Components/Index';
import Lyrics from './Components/Lyrics';
import Footer from './Components/Footer';

class App extends Component {
  render(){
    return (
      <Provider>
        <Router>
        <React.Fragment>
        <Navbar/>  
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
        <Footer/>    
        </React.Fragment>
      </Router>
      </Provider>
    );
  }
}

export default App;
