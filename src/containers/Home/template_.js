import { Hero } from './Hero';
import { GettingStarted } from './GettingStarted';
import { About } from './About';
import { ExploreForms } from './Explore';

const Home = props => (
  <>
    <Hero categoriesCount={2} formsCount={4} />
    <GettingStarted />
    <About categoriesCount={2} formsCount={4} />
    <ExploreForms formsCount={4} />
  </>
);

export default Home;
