/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/index.scss */ \"./src/style/index.scss\");\n/* harmony import */ var _js_routes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/routes.js */ \"./src/js/routes.js\");\n\n\n\nfunction callRoute() {\n  var hash = window.location.hash;\n  var pathParts = hash.substring(1).split('/');\n  var pageName = pathParts[0];\n  var pageArgument = pathParts[1] || '';\n  var pageFunction = _js_routes_js__WEBPACK_IMPORTED_MODULE_1__.routes[pageName];\n\n  if (pageFunction !== undefined) {\n    pageFunction(pageArgument);\n  }\n}\n\ndocument.getElementById('submit-request').addEventListener(\"click\", function () {\n  var link = document.createElement(\"a\");\n  link.href = \"#pagelist/\".concat(document.getElementById('search').value);\n  link.click();\n});\nwindow.addEventListener('hashchange', function () {\n  return callRoute();\n});\nwindow.addEventListener('DOMContentLoaded', function () {\n  return callRoute();\n});\n\n//# sourceURL=webpack://bundle_webpack/./src/index.js?");

/***/ }),

/***/ "./src/js/Home.js":
/*!************************!*\
  !*** ./src/js/Home.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Home\": () => (/* binding */ Home)\n/* harmony export */ });\nvar Home = function Home() {\n  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  console.log('Home', argument);\n};\n\n\n\n//# sourceURL=webpack://bundle_webpack/./src/js/Home.js?");

/***/ }),

/***/ "./src/js/PageDetail.js":
/*!******************************!*\
  !*** ./src/js/PageDetail.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PageDetail\": () => (/* binding */ PageDetail)\n/* harmony export */ });\nvar API_KEY = \"3b58a74c23894d2ea9c235972d7fb20f\";\n\nvar PageDetail = function PageDetail() {\n  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n  var preparePage = function preparePage() {\n    var cleanedArgument = argument.trim().replace(/\\s+/g, \"-\");\n\n    var displayGame = function displayGame(gameData) {\n      var name = gameData.name,\n          released = gameData.released,\n          description = gameData.description;\n      var articleDOM = document.querySelector(\".page-detail .article\");\n      articleDOM.querySelector(\"h1.title\").innerHTML = name;\n      articleDOM.querySelector(\"p.release-date span\").innerHTML = released;\n      articleDOM.querySelector(\"p.description\").innerHTML = description;\n    };\n\n    var fetchGame = function fetchGame(url, argument) {\n      fetch(\"\".concat(url, \"/\").concat(argument, \"?key=\").concat(API_KEY)).then(function (response) {\n        return response.json();\n      }).then(function (responseData) {\n        console.log(\"passage dans fetch game\");\n        displayGame(responseData);\n      });\n    };\n\n    fetchGame('https://api.rawg.io/api/games', cleanedArgument);\n  };\n\n  var render = function render() {\n    pageContent.innerHTML = \"\\n          <section class=\\\"page-detail\\\">\\n            <div class=\\\"article\\\">\\n              <h1 class=\\\"title\\\"></h1>\\n              <p class=\\\"release-date\\\">Release date : <span></span></p>\\n              <p class=\\\"description\\\"></p>\\n            </div>\\n          </section>\\n        \";\n    preparePage();\n  };\n\n  render();\n};\n\n\n\n//# sourceURL=webpack://bundle_webpack/./src/js/PageDetail.js?");

/***/ }),

/***/ "./src/js/PageList.js":
/*!****************************!*\
  !*** ./src/js/PageList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PageList\": () => (/* binding */ PageList)\n/* harmony export */ });\nvar API_KEY = \"3b58a74c23894d2ea9c235972d7fb20f\";\n\nvar PageList = function PageList() {\n  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n  var preparePage = function preparePage() {\n    var cleanedArgument = argument.trim().replace(/\\s+/g, '-');\n\n    var displayResults = function displayResults(articles) {\n      var resultsContent = articles.map(function (article) {\n        return \"<article class=\\\"cardGame\\\">\\n                    <div id=\\\"\".concat(article.id, \"\\\" class=\\\"gameMain\\\" style=\\\"background-image: url('\").concat(article.background_image, \"')\\\">\\n                        <img class=\\\"gameMainImg\\\" src=\\\"\").concat(article.background_image, \"\\\">\\n                    </div>\\n                    <div class=\\\"gameInfos\\\">\\n                        <h1>\").concat(article.name, \"</h1>\\n                        <h3>\").concat(article.released, \"</h3>\\n                        <a href=\\\"#game/\").concat(article.slug, \"\\\" class=\\\"openArticleBtn\\\" >OPEN ARTICLE</a>\\n                    <div class=\\\"gameInfos\\\">\\n                </article>\");\n      });\n      var resultsContainer = document.querySelector('.page-list .articles');\n      resultsContainer.innerHTML = resultsContent.join(\"\\n\");\n      articles.map(function (article) {\n        console.log(article.id);\n        getVideo(article.id);\n      });\n    };\n\n    var fetchList = function fetchList(url, argument) {\n      var finalURL = argument ? \"\".concat(url, \"&search=\").concat(argument) : url;\n      fetch(finalURL).then(function (response) {\n        return response.json();\n      }).then(function (responseData) {\n        displayResults(responseData.results);\n      })[\"catch\"](function (error) {\n        console.error(error);\n      });\n    };\n\n    var getVideo = function getVideo(id) {\n      fetch(\"https://api.rawg.io/api/games/\".concat(id, \"/movies?key=\").concat(API_KEY)).then(function (response) {\n        return response.json();\n      }).then(function (responseData) {\n        addVideo(responseData, id);\n      })[\"catch\"](function (error) {\n        console.error(error);\n      });\n    };\n\n    var addVideo = function addVideo(data, id) {\n      if (data.count) {\n        document.getElementById(id).innerHTML = \"\\n                <video class=\\\"\".concat(id, \"\\\">\\n                    <source src=\\\"\").concat(data.results[0].data.max, \"\\\" type=\\\"video/mp4\\\">\\n                </video>\");\n        var myVid = document.getElementsByClassName(\"\".concat(id))[0];\n        myVid.addEventListener('mouseenter', function () {\n          this.play();\n          this.classList.toggle(\"show\");\n        });\n        myVid.addEventListener('mouseleave', function () {\n          this.pause();\n          this.classList.toggle(\"show\");\n        });\n      }\n    };\n\n    fetchList(\"https://api.rawg.io/api/games?key=\".concat(API_KEY), cleanedArgument);\n  };\n\n  var render = function render() {\n    pageContent.innerHTML = \"\\n          <section class=\\\"page-list\\\">\\n            <div class=\\\"articles\\\">Loading...</div>\\n          </section>\\n          <a href=\\\"\\\" class=\\\"myBtn\\\">LOAD MORE</a>\\n        \";\n    preparePage();\n  };\n\n  render();\n};\n\n\n\n//# sourceURL=webpack://bundle_webpack/./src/js/PageList.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\nvar API_KEY = \"3b58a74c23894d2ea9c235972d7fb20f\";\n\nvar Game = function Game() {\n  var argument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  console.log(\"game.js\");\n\n  var preparePage = function preparePage() {\n    var cleanedArgument = argument.trim().replace(/\\s+/g, \"-\");\n\n    var displayGame = function displayGame(gameData) {\n      var name = gameData.name,\n          released = gameData.released,\n          description = gameData.description;\n      var articleDOM = document.querySelector(\".page-detail .article\");\n      articleDOM.querySelector(\"h1.title\").innerHTML = name;\n      articleDOM.querySelector(\"p.release-date span\").innerHTML = released;\n      articleDOM.querySelector(\"p.description\").innerHTML = description;\n    };\n\n    var fetchGame = function fetchGame(url, argument) {\n      fetch(\"\".concat(url, \"/\").concat(argument, \"?key=\").concat(API_KEY)).then(function (response) {\n        return response.json();\n      }).then(function (responseData) {\n        console.log(responseData);\n        displayGame(responseData);\n      });\n    };\n\n    fetchGame('https://api.rawg.io/api/games', cleanedArgument);\n  };\n\n  var render = function render() {\n    pageContent.innerHTML = \"\\n          <section class=\\\"page-detail\\\">\\n            <div class=\\\"article\\\">\\n              <h1 class=\\\"title\\\"></h1>\\n              <p class=\\\"release-date\\\">Release date : <span></span></p>\\n              <p class=\\\"description\\\"></p>\\n            </div>\\n          </section>\\n        \";\n    preparePage();\n  };\n\n  render();\n};\n\n\n\n//# sourceURL=webpack://bundle_webpack/./src/js/game.js?");

/***/ }),

/***/ "./src/js/routes.js":
/*!**************************!*\
  !*** ./src/js/routes.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"routes\": () => (/* binding */ routes)\n/* harmony export */ });\n/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home */ \"./src/js/Home.js\");\n/* harmony import */ var _PageList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageList */ \"./src/js/PageList.js\");\n/* harmony import */ var _PageDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageDetail */ \"./src/js/PageDetail.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\n\n\n\n\nvar routes = {\n  '': _Home__WEBPACK_IMPORTED_MODULE_0__.Home,\n  'pagelist': _PageList__WEBPACK_IMPORTED_MODULE_1__.PageList,\n  'pagedetail': _PageDetail__WEBPACK_IMPORTED_MODULE_2__.PageDetail,\n  'game': _game__WEBPACK_IMPORTED_MODULE_3__.Game\n};\n\n\n//# sourceURL=webpack://bundle_webpack/./src/js/routes.js?");

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bundle_webpack/./src/style/index.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;