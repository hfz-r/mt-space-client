import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useProgress } from 'containers/Progress';
import Wrapper from './template_';

const Layout = props => {
  const { computedMatch, path, exact, component: Component, ...rest } = props;
  const { listen } = useHistory();
  const { start, done } = useProgress();

  useEffect(() => {
    const unlisten = listen(location => {
      start();
    });
    setTimeout(() => {
      done();
    }, 1);
    return unlisten;
  }, [done, start, listen]);

  return (
    <Route
      path={path}
      render={() => (
        <Wrapper isExact={exact}>
          <Component computedMatch={computedMatch} {...rest} />
        </Wrapper>
      )}
    />
  );
};

export default Layout;
