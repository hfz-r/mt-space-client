import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import useDataContext from 'utils/Hooks/BaseData';

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ViewLayout = props => {
  const { computedMatch, ...rest } = props;
  const { label, type } = computedMatch.params;
  const {
    config: { child },
  } = useDataContext(type, capitalizeFirstLetter(label));

  return (
    <Switch>
      {child &&
        child.map(c => {
          const Component = c.content;
          return (
            <Route
              exact
              key={c.name}
              path={c.viewHref}
              render={() => c.content && <Component {...rest} />}
            />
          );
        })}
      <Redirect from="/:label/:type/view/:any" to="/:label/:type/view" />
    </Switch>
  );
};

export default ViewLayout;
