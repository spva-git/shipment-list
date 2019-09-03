import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Home from './components/Home';
import ViewShipment from './components/shipment/View';


class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/view/:id'} exact component={ViewShipment} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
