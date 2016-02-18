// import { Socket } from "phoenix";

// let socket = new Socket("/ws")
// socket.connect()
// let chan = socket.chan("topic:subtopic", {})
// chan.join().receive("ok", chan => {
//   console.log("Success!")
// })

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRedirect,
  browserHistory
} from 'react-router';
import { App, Bottles, Wines, Wine } from './containers';
import './config';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/wines" />
      <Route path="wines" component={Wines} />
      <Route path="wines/:id" component={Wine} />
      <Route path="bottles" component={Bottles}/>
      {/*<Route path="bottles/:id" component={Bottle}/>*/}
    </Route>
  </Router>,
  document.getElementById('app')
);
