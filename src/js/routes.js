import { Home } from './Home'
import { SearchBy } from './searchby';
import { Game } from './game';
import { Similar } from './similar';

const routes = {
    '': Home,
    'game': Game,
    'similar': Similar,
    'searchby': SearchBy
};

export { routes }