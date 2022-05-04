import { Home } from './Home'
import { PageList } from './PageList'
import { Game } from './game';
import { Search } from './search'
import { PlatformSearch } from './platform';

const routes = {
    '': Home,
    'pagelist': PageList,
    'game': Game,
    'search': Search,
    'platform': PlatformSearch
};

export { routes }