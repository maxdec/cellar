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
import {
  App,
  BottleEdit, BottleNew, Bottles,
  Cellar,
  Container,
  WineEdit, WineNew, Wines
} from './containers';
import './config';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Cellar} />
      <Route path="wines" component={Container}>
        <IndexRoute component={Wines} />
        <Route path="new" component={WineNew} />
        <Route path=":id" component={WineEdit} />
      </Route>
      <Route path="bottles" component={Container}>
        <IndexRoute component={Bottles}/>
        <Route path="new" component={BottleNew}/>
        <Route path=":id" component={BottleEdit}/>
      </Route>
    </Route>
  </Router>,
  document.getElementById('app')
);
