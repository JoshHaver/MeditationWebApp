import React from 'react'
import Sessions from './Sessions'
import Navbar from './Navbar'
import CreateOrUpdateSession from './CreateOrUpdateSession'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SessionDetails from './SessionDetails'

let App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Sessions">
          <Switch>
            <Route exact path='/meditation/sessions'>
              <Sessions />
            </Route>
            <Route exact path='/meditation/create'>
              <CreateOrUpdateSession editMode={false}/>
            </Route>
            <Route exact path='/meditation/sessions/:id'>
              <SessionDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
