const API_KEY = process.env.RAGW_KEY
import { SearchBy } from "./searchby";

const Game = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, "-");

        const displayGame = (gameData) => {
          console.log(gameData)
            const articleDOM = document.querySelector(".page-detail .article");
            articleDOM.querySelector("div.game-background-img").style.backgroundImage = `url('${gameData.background_image}')`
            articleDOM.querySelector("h1.title").innerHTML = gameData.name;
            articleDOM.querySelector("p.description").innerHTML = gameData.description;
            articleDOM.querySelector("h3.developers").innerHTML = `Developers : <small><a href="#searchby/developers$${gameData.developers[0].id}$9">${gameData.developers[0].name}</a></small>`;
            if (gameData.released) {articleDOM.querySelector("h3.release-date").innerHTML = `Released : <small>${gameData.released}</small>`}
            if (gameData.platforms.length > 0) {
              let all = ""
              for (let i = 0; i < gameData.platforms.length; i++) {
                all += `<a href="#searchby/platforms$${gameData.platforms[i].platform.id}$9">${gameData.platforms[i].platform.name}</a>`
                if (i < gameData.platforms.length - 1) { all += ", " }
              }
              articleDOM.querySelector("h3.platforms").innerHTML = `Platforms : <small>${all}</small>`
            }
            listContent('Publishers', gameData.publishers)
            listContent('Genres', gameData.genres)
            listContent('Tags', gameData.tags)
            let storeLinksHTML = ""
            gameData.stores.map(item => {
              storeLinksHTML += `<a href="https://${item.store.domain}">${item.store.name}</a><br>`
            })
            articleDOM.querySelector("div.stores").innerHTML = storeLinksHTML
            getVideo(gameData.id)
            articleDOM.querySelector("div.useful-links").innerHTML = `<a href="${gameData.website}"><h1>Website</h1></a><br><a href="${gameData.reddit_url}"><h1>Reddit : <small>${gameData.reddit_name}</small></h1>`
            getScreenShots(gameData.id)
            SearchBy(`genres$${gameData.genres[0].slug}$6$only`)
        };

        const listContent = (listName, list) => {
          const articleDOM = document.querySelector(".page-detail .article");
          if (list.length > 0) {
            let all = ""
            for (let i = 0; i < list.length; i++) {
              all += `<a href="#searchby/${listName.toLowerCase()}$${list[i].id}$9">${list[i].name}</a>`
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

        const getVideo = (id) => {
          fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
              .then((response) => response.json())
              .then ((responseData) => {
                  console.log(responseData);
                  if (responseData.count >= 1) { showTrailer(responseData.results[0].data.max) }
              })
        };

        const showTrailer = (url) => {
          const articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector("h1.trailer").innerHTML = 'Trailer'
          articleDOM.querySelector("div.trailerVideo").style.height = "70vh"
          articleDOM.querySelector("div.trailerVideo").innerHTML = `<video controls class="game-trailer">
              <source src="${url}" type="video/mp4">
            </video>`
        }

        const getScreenShots = (id) => {
          fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
            .then((response) => response.json())
            .then((data) => displayScreenShots(data.results))
        }

        const displayScreenShots = (list) => {
          const articleDOM = document.querySelector(".page-detail .article");
          let images = ""
          for (let i = 0; i < 4; i++) {
            images += `<img class="screenshot" src="${list[i].image}">`
          }
          articleDOM.querySelector("div.screenshots").innerHTML = images
        }

        fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
          <section class="page-detail from-bottom">
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
              <div class="stores"></div>
              <h1 class="title trailer"></h1>
              <div class="trailerVideo"></div>
              <h1 class="title">SCREENSHOTS</h1>
              <div class="screenshots"></div>
              <div class="useful-links"></div>
              <h1 class="title">Similar games</h1>
              <div class="page-list">
                <div class="articles"></div>
              </div>
            </div>
          </section>
        `;

        preparePage();
    };

    render();
};


export { Game }