const API_KEY = process.env.RAGW_KEY
import Masonry from 'masonry-layout';

const PageList = (argument = '') => {
    console.log(argument)
    const imgNames = ['linux', 'mobile', 'playstation', 'search', 'switch', 'pc', 'xbox']

    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');

        const displayResults = (articles) => {
            console.log(articles)
            const resultsContent = articles.map((article) => (
                `<article class="cardGame">
                    <div id="${article.id}" class="gameMain" style="background-image: url('${article.background_image}')">
                        <img class="gameMainImg" src="${article.background_image}" alt="${article.name} main picture">
                    </div>
                    <div class="gameInfos">
                        <h1 class="game-name">${article.name}</h1>
                        <div class="platforms ${article.id}"></div>
                        <div class="more-about-game collapse">
                            <div class="more-element">
                                <div>Released</div> <div>${article.released}</div>
                            </div>
                            <div class="more-element">
                                <div>Genre</div> <div>${article.released}</div>
                            </div>
                            <div class="more-element">
                                <a href="#games/${article.id}/suggested">Show more like this</a>
                            </div>
                            <div class="more-element">
                                <a href="#game/${article.slug}" class="myBtn" >OPEN ARTICLE</a>
                            </div>
                        </div>
                    <div class="gameInfos">
                </article>`
            ));
            const resultsContainer = document.querySelector('.page-list .articles');
            resultsContainer.innerHTML = resultsContent.join("\n");
            articles.map(article => {
                getVideo(article.id)
            })
            articles.map(article => {
                let already = []
                let platformDiv = document.getElementsByClassName(`${article.id}`)[0]
                if (article.platforms) {
                    article.platforms.map(platform => {
                        if (imgNames.filter(name => platform.platform.slug.includes(name) && !already.includes(name)).length > 0) {
                            already += platform.platform.slug
                            platformDiv.innerHTML += 
                            `<a href="#platform/${platform.platform.id}"><img src="./src/assets/images/${imgNames.filter(name => platform.platform.slug.includes(name))[0]}.svg" class="svg"></a>`                    }
                })}
            })
            let elements = document.getElementsByClassName('cardGame')
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener("mouseenter", function(){
                    document.getElementsByClassName('more-about-game')[i].classList.toggle('collapse')
                })
                elements[i].addEventListener("mouseleave", function(){
                    document.getElementsByClassName('more-about-game')[i].classList.toggle('collapse')
                })
            }
            const grid = document.querySelector('.articles')
            const masonry = new Masonry(grid, {
                itemSelector: '.cardGame',
                gutter: 20,
            });
        };

        const fetchList = (url, argument) => {
            const finalURL = argument ? `${url}&search=${argument}` : url;
            fetch(finalURL)
                .then((response) => response.json())
                .then((responseData) => {
                    displayResults(responseData.results)
                })
        };

        const getVideo = (id) => {
            fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
                .then((response) => response.json())
                .then ((responseData) => {
                    addVideo(responseData, id)
                })
        };
        
        const addVideo = (data, id) => {
            if (data.count) {
                document.getElementById(id).innerHTML = `
                <video class="${id}">
                    <source src="${data.results[0].data.max}" type="video/mp4">
                </video>`
                
                let myVid = document.getElementsByClassName(`${id}`)[0]
                myVid.addEventListener('mouseenter', function () {
                            this.play();
                            this.classList.toggle("show")
                });
                myVid.addEventListener('mouseleave', function () {
                            this.pause();
                            this.classList.toggle("show")
                });
            }
        }

        fetchList(`https://api.rawg.io/api/games?page_size=9&dates=2021-01-01,2023-01-01&ordering=-released&key=${API_KEY}`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
          <section class="page-list from-bottom">
            <div class="articles">Loading...</div>
          </section>
          <a href="#load18" class="myBtn">LOAD MORE</a>
        `;
        preparePage();
    };

    render();
};

export { PageList }