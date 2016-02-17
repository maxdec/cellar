// import { Socket } from "phoenix";

// let socket = new Socket("/ws")
// socket.connect()
// let chan = socket.chan("topic:subtopic", {})
// chan.join().receive("ok", chan => {
//   console.log("Success!")
// })

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App, Bottles, Wines } from './containers';
import { WinesRoute, BottlesRoute } from './queries';

// function createRelayContainer(Component, props) {
//   if (Relay.isContainer(Component)) {
//     // Construct the RelayQueryConfig from the route and the router props.
//     var {name, queries} = props.route;
//     var {params} = props;
//     return (
//       <Relay.RootContainer
//         Component={Component}
//         renderFetched={(data) => <Component {...props} {...data} />}
//         route={{name, params, queries}}
//       />
//     );
//   } else {
//     return <Component {...props}/>;
//   }
// }

// ReactDOM.render(
//   <Router history={browserHistory} createElement={createRelayContainer}>
//     <Route name="home" path="/" component={App}>
//       <IndexRoute name="wines" path="wines" component={Wines} queries={WinesRoute} />
//       <Route name="bottles" path="bottles" component={Bottles} queries={BottlesRoute} />
//     </Route>
//     <App />
//   </Router>,
//   document.getElementById('app')
// );

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new WinesRoute()}
  />,
  document.getElementById('app')
);
