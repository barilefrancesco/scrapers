"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/telegram";
exports.ids = ["pages/api/telegram"];
exports.modules = {

/***/ "(api)/./src/pages/api/telegram.ts":
/*!***********************************!*\
  !*** ./src/pages/api/telegram.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n//api get handler nextjs\nfunction handler(req, res) {\n    if (req.method === \"POST\") {\n    // Process a POST request\n    } else {\n        // Handle any other HTTP method\n        res.status(200).json({\n            conversations: [\n                {\n                    contact: \"Paperino\",\n                    messages: [\n                        {\n                            athor: \"3802863702\",\n                            message: \"Ciao, come stai?\",\n                            date: \"12321323213213TS\",\n                            day: \"10/12/2022\",\n                            hours: \"10:30\",\n                            mention: {\n                                author: \"\",\n                                message: \"\"\n                            }\n                        }\n                    ]\n                }\n            ]\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3RlbGVncmFtLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFFQSx3QkFBd0I7QUFDVCxTQUFTQSxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBQ3pFLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO0lBQ3pCLHlCQUF5QjtJQUMzQixPQUFPO1FBQ0wsK0JBQStCO1FBQy9CRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQ25CQyxlQUFlO2dCQUNiO29CQUNFQyxTQUFTO29CQUNUQyxVQUFVO3dCQUNSOzRCQUNFQyxPQUFPOzRCQUNQQyxTQUFTOzRCQUNUQyxNQUFNOzRCQUNOQyxLQUFLOzRCQUNMQyxPQUFPOzRCQUNQQyxTQUFTO2dDQUNQQyxRQUFRO2dDQUNSTCxTQUFTOzRCQUNYO3dCQUNGO3FCQUNEO2dCQUNIO2FBQ0Q7UUFDSDtJQUNGLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFzaGJvYXJkLy4vc3JjL3BhZ2VzL2FwaS90ZWxlZ3JhbS50cz8zYzY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5cbi8vYXBpIGdldCBoYW5kbGVyIG5leHRqc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gXCJQT1NUXCIpIHtcbiAgICAvLyBQcm9jZXNzIGEgUE9TVCByZXF1ZXN0XG4gIH0gZWxzZSB7XG4gICAgLy8gSGFuZGxlIGFueSBvdGhlciBIVFRQIG1ldGhvZFxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIGNvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGNvbnRhY3Q6IFwiUGFwZXJpbm9cIixcbiAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhdGhvcjogXCIzODAyODYzNzAyXCIsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQ2lhbywgY29tZSBzdGFpP1wiLFxuICAgICAgICAgICAgICBkYXRlOiBcIjEyMzIxMzIzMjEzMjEzVFNcIixcbiAgICAgICAgICAgICAgZGF5OiBcIjEwLzEyLzIwMjJcIixcbiAgICAgICAgICAgICAgaG91cnM6IFwiMTA6MzBcIixcbiAgICAgICAgICAgICAgbWVudGlvbjoge1xuICAgICAgICAgICAgICAgIGF1dGhvcjogXCJcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwiY29udmVyc2F0aW9ucyIsImNvbnRhY3QiLCJtZXNzYWdlcyIsImF0aG9yIiwibWVzc2FnZSIsImRhdGUiLCJkYXkiLCJob3VycyIsIm1lbnRpb24iLCJhdXRob3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/telegram.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/telegram.ts"));
module.exports = __webpack_exports__;

})();