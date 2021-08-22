import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Layout from 'containers/Layout/index.main';
import ViewLayout from 'containers/Layout/index.view';
import { LoadingProgress, ProgressProvider } from 'containers/Progress';
import FontFace from 'utils/font-face';
import theme from './theme_';

const Home = React.lazy(() => import('containers/Home'));
const QueryBuilder = React.lazy(() => import('containers/QueryBuilder'));

// const About = React.lazy(() => import('containers/About'));
// const Finance = React.lazy(() => import('containers/Finance'));
// const FinanceForms = React.lazy(() => import('containers/Finance/Forms'));

const Finance_ = React.lazy(() => import('containers/Finance/index_'));

const App = () => (
  <>
    <ChakraProvider theme={theme}>
      <FontFace />
      <Suspense fallback={<LoadingProgress />}>
        <ProgressProvider>
          <Switch>
            <Layout path="/home" component={Home} exact />
            <Layout path="/utils/qbuilder" component={QueryBuilder} exact />
            {/* <Layout path="/about" component={About} exact /> */}
            {/* <Layout path="/finance" component={Finance} exact /> */}
            {/* <Layout path="/finance/:type" component={FinanceForms} /> */}
            <ViewLayout path="/:label/:type/view" />
            <Layout path="/finance/:type" component={Finance_} />
            <Redirect from="/" to="/home" />
          </Switch>
        </ProgressProvider>
      </Suspense>
    </ChakraProvider>
    <ColorModeScript />
  </>
);

export default App;
