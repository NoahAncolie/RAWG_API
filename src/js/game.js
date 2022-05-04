const API_KEY = process.env.RAGW_KEY

const Game = (argument = '') => {
    console.log("game.js")
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, "-");

        const displayGame = (gameData) => {
          console.log(gameData)
            const articleDOM = document.querySelector(".page-detail .article");
            articleDOM.querySelector("div.game-background-img").innerHTML = `<img src='${gameData.background_image_additional}'>`
            articleDOM.querySelector("h1.title").innerHTML = gameData.name;
            articleDOM.querySelector("p.description").innerHTML = gameData.description;
            articleDOM.querySelector("h3.developers").innerHTML = `Developers : <small>${gameData.developers[0].name}</small>`;
            if (gameData.released) {articleDOM.querySelector("h3.release-date").innerHTML = `Released : <small>${gameData.released}</small>`}
            if (gameData.platforms.length > 0) {
              let all = ""
              for (let i = 0; i < gameData.platforms.length; i++) {
                all += gameData.platforms[i].platform.name
                if (i < gameData.platforms.length - 1) { all += ", " }
              }
              articleDOM.querySelector("h3.platforms").innerHTML = `Platforms : <small>${all}</small>`
            }
            listContent('Publishers', gameData.publishers)
            listContent('Genres', gameData.genres)
            listContent('Tags', gameData.tags)
            articleDOM.querySelector("div.stores").innerHTML = `<a href="${gameData.stores[0].store.domain}">${gameData.stores[0].store.name}</a>`;
        };

        const listContent = (listName, list) => {
          const articleDOM = document.querySelector(".page-detail .article");
          if (list.length > 0) {
            let all = ""
            for (let i = 0; i < list.length; i++) {
              all += list[i].name
              if (i < list.length - 1) { all += ", " }
            }
            articleDOM.querySelector(`h3.${listName.toLowerCase()}`).innerHTML = `${listName} : <small>${all}</small>`
          }
        }

        const fetchGame = (url, argument) => {
            fetch(`${url}/${argument}?key=${API_KEY}`)
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    displayGame(responseData);
                });
        };

        fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
          <section class="page-detail">
            <div class="article">
              <div class="game-background-img"></div>
              <h1 class="title"></h1>
              <p class="description"></p>
              <div class="all-informations">
                <h3 class="developers"></h3>
                <h3 class="release-date"></h3>
                <h3 class="platforms"></h3>
                <h3 class="publishers"></h3>
                <h3 class="genres"></h3>
                <h3 class="tags"></h3>
              </div>
              <h1 class="title">Buy</h1>
              <div class="stores">
              
              </div>
            </div>
          </section>
        `;

        preparePage();
    };

    render();
};


export { Game }