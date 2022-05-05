import './style/index.scss'
import { routes } from './js/routes.js'

let pageNumber = 0

function callRoute() {
    const { hash } = window.location;
    console.log('============='+window.location+'=============')
    const pathParts = hash.substring(1).split('/');

    const pageName = pathParts[0];
    console.log(pageName + "PAGE NAME")
    const pageArgument = pathParts[1] || '';
    console.log(pageArgument + "PAGE ARGUMENT")
    const pageFunction = routes[pageName];

    if (pageFunction !== undefined) {
        pageFunction(pageArgument, pageNumber);
    }
}

document.getElementById('submit-request').addEventListener("click", function(){
    let link = document.createElement("a");
    link.href = `#search/${document.getElementById('search').value}`;
    link.click();
})

window.addEventListener('hashchange', () => {
    document.getElementsByClassName('transition-round-blue')[0].remove()
    document.getElementsByClassName('transition-round-black')[0].remove()
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div class="transition-round-black"></div>')
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div class="transition-round-blue"></div>')
    callRoute()});
window.addEventListener('DOMContentLoaded', () => callRoute());