import './style/index.scss'
import { routes } from './js/routes.js'

function callRoute() {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');

    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];

    if (pageFunction !== undefined) {
        pageFunction(pageArgument);
    }
}

document.getElementById('submit-request').addEventListener("click", function(){
    let link = document.createElement("a");
    link.href = `#pagelist/${document.getElementById('search').value}`;
    link.click();
})

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());
