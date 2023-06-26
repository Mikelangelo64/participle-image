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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.scss */ \"./src/styles/styles.scss\");\n/* harmony import */ var _scripts_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/main */ \"./src/scripts/main.js\");\n\n\n// import vevet from './scripts/config/vevet';\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_scripts_main__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n});\n\n// vevet.pageLoad.onLoaded(() => {\n//   init();\n// });\n\n//# sourceURL=webpack://canvas_participle_img/./src/index.js?");

/***/ }),

/***/ "./src/scripts/Effect.js":
/*!*******************************!*\
  !*** ./src/scripts/Effect.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle */ \"./src/scripts/Particle.js\");\n\nclass Effect {\n  constructor(width, height, img) {\n    this.width = width;\n    this.height = height;\n    this.particlesArray = [];\n    this.image = img;\n    // this.centerX = this.width * 0.5;\n    // this.centerY = this.height * 0.5;\n    // this.x = this.centerX - this.image.width * 0.5;\n    // this.y = this.centerY - this.image.height * 0.5;\n\n    this.hRatio = this.width / this.image.width;\n    this.vRatio = this.height / this.image.height;\n    this.ratio = Math.min(this.hRatio, this.vRatio);\n    this.x = (this.width - this.image.width * this.ratio) * 0.5;\n    this.y = (this.height - this.image.height * this.ratio) * 0.5;\n    this.gap = 4;\n    this.mouse = {\n      radius: 3000,\n      x: undefined,\n      y: undefined\n    };\n    window.addEventListener('mousemove', evt => {\n      this.mouse.x = evt.x;\n      this.mouse.y = evt.y;\n    });\n  }\n  init(context) {\n    // this.image.onload = () => {\n    context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.x, this.y, this.image.width * this.ratio, this.image.height * this.ratio);\n    const pixels = context.getImageData(0, 0, this.width, this.height).data;\n    for (let y = 0; y < this.height; y += this.gap) {\n      for (let x = 0; x < this.width; x += this.gap) {\n        const index = (y * this.width + x) * 4;\n        const red = pixels[index];\n        const green = pixels[index + 1];\n        const blue = pixels[index + 2];\n        const alpha = pixels[index + 3];\n        const color = `rgb(${red}, ${green}, ${blue})`;\n        if (alpha > 0) {\n          this.particlesArray.push(new _Particle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, x, y, color));\n        }\n      }\n    }\n    // };\n  }\n\n  draw(context) {\n    this.particlesArray.forEach(particle => {\n      particle.draw(context);\n    });\n  }\n  update() {\n    this.particlesArray.forEach(particle => {\n      particle.update();\n    });\n  }\n  warp() {\n    this.particlesArray.forEach(particle => {\n      particle.warp();\n    });\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Effect);\n\n//# sourceURL=webpack://canvas_participle_img/./src/scripts/Effect.js?");

/***/ }),

/***/ "./src/scripts/Particle.js":
/*!*********************************!*\
  !*** ./src/scripts/Particle.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Particle {\n  constructor(effect, x, y, color) {\n    this.effect = effect;\n    this.x = Math.random() * this.effect.width;\n    this.y = Math.random() * this.effect.height;\n    this.originX = Math.floor(x);\n    this.originY = Math.floor(y);\n    this.color = color;\n    this.size = this.effect.gap;\n    // this.vx = Math.random() * 2 - 1;\n    // this.vy = Math.random() * 2 - 1;\n    this.vx = 0;\n    this.vy = 0;\n    this.ease = 0.2;\n    this.friction = 0.8;\n    this.dx = 0;\n    this.dy = 0;\n    this.distance = 0;\n    this.force = 0;\n    this.angle = 0;\n  }\n  draw(context) {\n    context.fillStyle = this.color;\n    context.fillRect(this.x, this.y, this.size, this.size);\n    // context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);\n    // context.fill();\n  }\n\n  update() {\n    this.dx = this.effect.mouse.x - this.x;\n    this.dy = this.effect.mouse.y - this.y;\n    this.distance = this.dx * this.dx + this.dy * this.dy;\n    this.force = -this.effect.mouse.radius / this.distance;\n    if (this.distance < this.effect.mouse.radius) {\n      this.angle = Math.atan2(this.dy, this.dx);\n      this.vx += this.force * Math.cos(this.angle);\n      this.vy += this.force * Math.sin(this.angle);\n    }\n    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;\n    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;\n  }\n  warp() {\n    this.x = Math.random() * this.effect.width;\n    this.y = Math.random() * this.effect.height;\n    this.ease = 0.05;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Particle);\n\n//# sourceURL=webpack://canvas_participle_img/./src/scripts/Particle.js?");

/***/ }),

/***/ "./src/scripts/animate.js":
/*!********************************!*\
  !*** ./src/scripts/animate.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst animate = (effect, ctx, canvas) => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  effect.draw(ctx);\n  effect.update();\n  requestAnimationFrame(() => {\n    animate(effect, ctx, canvas);\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animate);\n\n//# sourceURL=webpack://canvas_participle_img/./src/scripts/animate.js?");

/***/ }),

/***/ "./src/scripts/createCanvas.js":
/*!*************************************!*\
  !*** ./src/scripts/createCanvas.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst createCanvas = canvasDom => {\n  if (!canvasDom) {\n    return {\n      canvas: undefined,\n      ctx: undefined\n    };\n  }\n  const canvas = canvasDom;\n  const ctx = canvas.getContext('2d');\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  return {\n    canvas,\n    ctx\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCanvas);\n\n//# sourceURL=webpack://canvas_participle_img/./src/scripts/createCanvas.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Effect */ \"./src/scripts/Effect.js\");\n/* harmony import */ var _animate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animate */ \"./src/scripts/animate.js\");\n/* harmony import */ var _createCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createCanvas */ \"./src/scripts/createCanvas.js\");\n// import vevet from './config/vevet';\n\n\n\nconst init = () => {\n  const canvasArray = document.querySelectorAll('.canvas');\n  if (canvasArray.length !== 0) {\n    canvasArray.forEach(canvasDom => {\n      const {\n        canvas,\n        ctx\n      } = (0,_createCanvas__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(canvasDom);\n      const img = document.querySelector('img');\n      if (!canvas || !ctx || !img) {\n        return;\n      }\n      img.onload = () => {\n        const effect = new _Effect__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas.width, canvas.height, img);\n        effect.init(ctx);\n        // console.log(effect.particlesArray);\n\n        (0,_animate__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(effect, ctx, canvas);\n\n        // warp button\n        const warpButton = document.querySelector('.warp');\n        warpButton.addEventListener('click', () => {\n          effect.warp();\n        });\n      };\n    });\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n//# sourceURL=webpack://canvas_participle_img/./src/scripts/main.js?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://canvas_participle_img/./src/styles/styles.scss?");

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