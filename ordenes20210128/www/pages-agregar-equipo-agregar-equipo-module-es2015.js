(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-agregar-equipo-agregar-equipo-module"],{

/***/ "./src/app/functions/funciones.ts":
/*!****************************************!*\
  !*** ./src/app/functions/funciones.ts ***!
  \****************************************/
/*! exports provided: formatDate, fechaHoyStr, str2ab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fechaHoyStr", function() { return fechaHoyStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str2ab", function() { return str2ab; });
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function fechaHoyStr() {
    return formatDate(new Date());
}
function str2ab(str) {
    const arr = str.split(',');
    const view = new Uint8Array(arr);
    return view.buffer;
}


/***/ }),

/***/ "./src/app/interfaces/interfaces.ts":
/*!******************************************!*\
  !*** ./src/app/interfaces/interfaces.ts ***!
  \******************************************/
/*! exports provided: ModoGrabadoOrden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModoGrabadoOrden", function() { return ModoGrabadoOrden; });
var ModoGrabadoOrden;
(function (ModoGrabadoOrden) {
    ModoGrabadoOrden["TODO"] = "1";
    ModoGrabadoOrden["CABECERA"] = "2";
    ModoGrabadoOrden["ESTADO"] = "3";
    ModoGrabadoOrden["TAREAS"] = "4";
    ModoGrabadoOrden["MATERIALES"] = "5";
    ModoGrabadoOrden["EQUIPOS"] = "6";
    ModoGrabadoOrden["FOTOS"] = "7";
})(ModoGrabadoOrden || (ModoGrabadoOrden = {}));


/***/ }),

/***/ "./src/app/pages/agregar-equipo/agregar-equipo-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/agregar-equipo/agregar-equipo-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: AgregarEquipoPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarEquipoPageRoutingModule", function() { return AgregarEquipoPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _agregar_equipo_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agregar-equipo.page */ "./src/app/pages/agregar-equipo/agregar-equipo.page.ts");




const routes = [
    {
        path: '',
        component: _agregar_equipo_page__WEBPACK_IMPORTED_MODULE_3__["AgregarEquipoPage"]
    }
];
let AgregarEquipoPageRoutingModule = class AgregarEquipoPageRoutingModule {
};
AgregarEquipoPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarEquipoPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/agregar-equipo/agregar-equipo.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/agregar-equipo/agregar-equipo.module.ts ***!
  \***************************************************************/
/*! exports provided: AgregarEquipoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarEquipoPageModule", function() { return AgregarEquipoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _agregar_equipo_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-equipo-routing.module */ "./src/app/pages/agregar-equipo/agregar-equipo-routing.module.ts");






let AgregarEquipoPageModule = class AgregarEquipoPageModule {
};
AgregarEquipoPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_equipo_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarEquipoPageRoutingModule"]
        ],
        declarations: []
    })
], AgregarEquipoPageModule);



/***/ })

}]);
//# sourceMappingURL=pages-agregar-equipo-agregar-equipo-module-es2015.js.map