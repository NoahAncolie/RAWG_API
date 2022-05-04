const API_KEY = process.env.RAGW_KEY

const PageList = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, '-');

        const displayResults = (articles) => {
            const resultsContent = articles.map((article) => (
                `<article class="cardGame">
                    <div id="${article.id}" class="gameMain" style="background-image: url('${article.background_image}')">
                        <img class="gameMainImg" src="${article.background_image}">
                    </div>
                    <div class="gameInfos">
                        <h1>${article.name}</h1>
                        <h3>${article.released}</h3>
                        <a href="#game/${article.slug}" class="openArticleBtn" >OPEN ARTICLE</a>
                    <div class="gameInfos">
                </article>`
            ));
            const resultsContainer = document.querySelector('.page-list .articles');
            resultsContainer.innerHTML = resultsContent.join("\n");
            articles.map(article => {
                console.log(article.id)
                getVideo(article.id)
            })
        };

        const fetchList = (url, argument) => {
            const finalURL = argument ? `${url}&search=${argument}` : url;
            fetch(finalURL)
                .then((response) => response.json())
                .then((responseData) => {
                    displayResults(responseData.results)
                }).catch((error) => {
                    console.error(error)
                });
        };

        const getVideo = (id) => {
            fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
                .then((response) => response.json())
                .then ((responseData) => {
                    addVideo(responseData, id)
                }).catch((error) => {
                    console.error(error)
                });
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

        fetchList(`https://api.rawg.io/api/games?key=${API_KEY}`, cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
          <section class="page-list">
            <div class="articles">Loading...</div>
          </section>
          <a href="" class="myBtn">LOAD MORE</a>
        `;

        preparePage();
    };

    render();
};

export { PageList }