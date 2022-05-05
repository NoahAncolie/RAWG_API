import './style/index.scss'
import { routes } from './js/routes.js'

let pageNumber = 0

function callRoute() {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');

    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];

    if (pageFunction !== undefined) {
        pageFunction(pageArgument, pageNumber);
    }
}

const transition = () => {
    document.getElementsByTagName('body')[0].classList.toggle('unfade')
    document.getElementsByTagName('body')[0].classList.toggle('unfade')
    document.getElementsByClassName('transition-round-blue')[0].remove()
    document.getElementsByClassName('transition-round-black')[0].remove()
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div class="transition-round-black"></div>')
    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div class="transition-round-blue"></div>')
}

document.getElementById('submit-request').addEventListener("click", function(){
    let link = document.createElement("a");
    link.href = `#searchby/search$${document.getElementById('search').value}$9`;
    link.click();
})

window.addEventListener('hashchange', () => {
    transition()
    callRoute()
});
window.addEventListener('DOMContentLoaded', () => {
    transition()
    callRoute()
});