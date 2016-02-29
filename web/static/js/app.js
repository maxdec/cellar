// import { Socket } from "phoenix";

// let socket = new Socket("/ws")
// socket.connect()
// let chan = socket.chan("topic:subtopic", {})
// chan.join().receive("ok", chan => {
//   console.log("Success!")
// })

import 'babel-polyfill';
import 'bootstrap-loader';
import '../css/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import { App, Bottle, Bottles, Cellar, Wines, Wine } from './containers';
import './config';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Cellar} />
      <Route path="wines" component={Wines} />
      <Route path="wines/:id" component={Wine} />
      <Route path="bottles" component={Bottles}/>
      <Route path="bottles/:id" component={Bottle}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
