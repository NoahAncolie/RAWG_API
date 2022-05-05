import { Home } from './Home'
import { PageList } from './PageList'
import { Game } from './game';
import { Search } from './search';
import { PlatformSearch } from './platform';
import { load18 } from './load18';
import { load27 } from './load27';

const routes = {
    '': Home,
    'pagelist': PageList,
    'game': Game,
    'platform': PlatformSearch,
    'search': Search,
    'load18': load18,
    'load27': load27
};

export { routes }