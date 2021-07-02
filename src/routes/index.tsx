import { FC } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

export const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    </BrowserRouter>
  );
};
