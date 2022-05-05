import Masonry from "masonry-layout";
const API_KEY = process.env.RAGW_KEY

const SearchBy = (arg = '') => {
    let argList = arg.split('$')
    console.log(argList[3])
    const imgNames = ['linux', 'mobile', 'playstation', 'search', 'switch', 'pc', 'xbox']

    const preparePage = () => {

        const displayResults = (articles) => {
            let resultsContent = []
            for (let i = Number(argList[2]) - 9; i < articles.length; i++) {
                    resultsContent.push(`<article class="cardGame">
                    <div id="${articles[i].id}" class="gameMain" style="background-image: url('${articles[i].background_image}')">
                        <img class="gameMainImg" src="${articles[i].background_image}" alt="${articles[i].name} main picture">
                    </div>
                    <div class="gameInfos">
                        <h1 class="game-name">${articles[i].name}</h1>
                        <div class="platforms ${articles[i].id}"></div>
                        <div class="more-about-game collapse">
                            <div class="more-element">
                                <div>Released</div> <div>${articles[i].released}</div>
                            </div>
                            <div class="more-element">
                                <div>Genre</div> <div>${articles[i].released}</div>
                            </div>
                            <div class="more-element">
                                <a href="#similar/parent-games$${articles[i].slug}$9">Show more like this</a>
                            </div>
                            <div class="more-element">
                                <a href="#game/${articles[i].slug}" class="myBtn" >OPEN ARTICLE</a>
                            </div>
                        </div>
                    <div class="gameInfos">
                </article>`)
            };
            const resultsContainer = document.querySelector('.page-list .articles');
            resultsContainer.insertAdjacentHTML('beforeend', resultsContent.join("\n"))
            articles.map(article => {
                getVideo(article.id)
            })
            for (let i = Number(argList[2]) - 9; i < articles.length; i++) {
                let already = []
                let platformDiv = document.getElementsByClassName(`${articles[i].id}`)[0]
                if (articles[i].platforms) {
                    articles[i].platforms.map(platform => {
                        if (imgNames.filter(name => platform.platform.slug.includes(name) && !already.includes(name)).length > 0) {
                            already += platform.platform.slug
                            platformDiv.innerHTML += 
                            `<a href="#searchby/platforms$${platform.platform.id}$9"><img src="./src/assets/images/${imgNames.filter(name => platform.platform.slug.includes(name))[0]}.svg" class="svg"></a>`                    }
                })}
            }
            let elements = document.getElementsByClassName('cardGame')
            for (let i = Number(argList[2]) - 9; i < articles.length; i++) {
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

        const fetchList = (url) => {
            fetch(url)
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

        if (argList[0] !== 'search') {
            fetchList(`https://api.rawg.io/api/games?${argList[0]}=${argList[1]}&page_size=${argList[2]}&ordering=-released&key=${API_KEY}`);
        } else {
            fetchList(`https://api.rawg.io/api/games?${argList[0]}=${argList[1]}&page_size=${argList[2]}&key=${API_KEY}`);
        }
    };

    const render = () => {
        if (argList[2] === '9') {
        pageContent.innerHTML = `
          <section class="page-list from-bottom">
            <div class="articles">Loading...</div>
          </section>
        `};
        let link = document.getElementsByClassName('MORE')[0]
        if (link) { link.remove() }
        if (argList[3] !== 'only' && Number(argList[2]) < 20) {
            pageContent.innerHTML += `<a href="#searchby/${argList[0]}$${argList[1]}$${Number(argList[2]) + 9}" class="myBtn MORE">LOAD MORE</a>`
        }
        preparePage();
    };

    render();    
}

export { SearchBy }