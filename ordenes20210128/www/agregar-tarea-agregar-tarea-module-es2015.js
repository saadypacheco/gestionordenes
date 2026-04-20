(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["agregar-tarea-agregar-tarea-module"],{

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

/***/ "./src/app/pages/agregar-tarea-form/agregar-tarea-form-routing.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/agregar-tarea-form/agregar-tarea-form-routing.module.ts ***!
  \*******************************************************************************/
/*! exports provided: AgregarTareaFormPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaFormPageRoutingModule", function() { return AgregarTareaFormPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



const routes = [
// {
//   path: '',
//   component: AgregarTareaFormPage
// }
];
let AgregarTareaFormPageRoutingModule = class AgregarTareaFormPageRoutingModule {
};
AgregarTareaFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarTareaFormPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/agregar-tarea-form/agregar-tarea-form.module.ts ***!
  \***********************************************************************/
/*! exports provided: AgregarTareaFormPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaFormPageModule", function() { return AgregarTareaFormPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _agregar_tarea_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-tarea-form-routing.module */ "./src/app/pages/agregar-tarea-form/agregar-tarea-form-routing.module.ts");
/* harmony import */ var _agregar_tarea_form_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agregar-tarea-form.page */ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.ts");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");
/* harmony import */ var ionic_selectable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ionic-selectable */ "./node_modules/ionic-selectable/__ivy_ngcc__/esm2015/ionic-selectable.min.js");









let AgregarTareaFormPageModule = class AgregarTareaFormPageModule {
};
AgregarTareaFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_tarea_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarTareaFormPageRoutingModule"],
            _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_7__["PipesModule"],
            ionic_selectable__WEBPACK_IMPORTED_MODULE_8__["IonicSelectableModule"]
        ],
        declarations: [_agregar_tarea_form_page__WEBPACK_IMPORTED_MODULE_6__["AgregarTareaFormPage"]]
    })
], AgregarTareaFormPageModule);



/***/ }),

/***/ "./src/app/pages/agregar-tarea/agregar-tarea-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/agregar-tarea/agregar-tarea-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: AgregarTareaPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaPageRoutingModule", function() { return AgregarTareaPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _agregar_tarea_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agregar-tarea.page */ "./src/app/pages/agregar-tarea/agregar-tarea.page.ts");




const routes = [
    {
        path: '',
        component: _agregar_tarea_page__WEBPACK_IMPORTED_MODULE_3__["AgregarTareaPage"]
    }
];
let AgregarTareaPageRoutingModule = class AgregarTareaPageRoutingModule {
};
AgregarTareaPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarTareaPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/agregar-tarea/agregar-tarea.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/agregar-tarea/agregar-tarea.module.ts ***!
  \*************************************************************/
/*! exports provided: AgregarTareaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaPageModule", function() { return AgregarTareaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _agregar_tarea_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-tarea-routing.module */ "./src/app/pages/agregar-tarea/agregar-tarea-routing.module.ts");
/* harmony import */ var _agregar_tarea_form_agregar_tarea_form_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../agregar-tarea-form/agregar-tarea-form.module */ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.module.ts");






//import {AgregarTareaFormPage} from '../agregar-tarea-form/agregar-tarea-form.page';

let AgregarTareaPageModule = class AgregarTareaPageModule {
};
AgregarTareaPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        entryComponents: [
        //   AgregarTareaFormPage
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_tarea_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarTareaPageRoutingModule"],
            _agregar_tarea_form_agregar_tarea_form_module__WEBPACK_IMPORTED_MODULE_6__["AgregarTareaFormPageModule"]
        ],
        declarations: []
    })
], AgregarTareaPageModule);



/***/ })

}]);
//# sourceMappingURL=agregar-tarea-agregar-tarea-module-es2015.js.map