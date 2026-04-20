function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-comentarios-form-comentarios-form-module"], {
  /***/
  "./src/app/interfaces/interfaces.ts":
  /*!******************************************!*\
    !*** ./src/app/interfaces/interfaces.ts ***!
    \******************************************/

  /*! exports provided: ModoGrabadoOrden */

  /***/
  function srcAppInterfacesInterfacesTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ModoGrabadoOrden", function () {
      return ModoGrabadoOrden;
    });

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
    /***/

  },

  /***/
  "./src/app/pages/comentarios-form/comentarios-form-routing.module.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/pages/comentarios-form/comentarios-form-routing.module.ts ***!
    \***************************************************************************/

  /*! exports provided: ComentariosFormPageRoutingModule */

  /***/
  function srcAppPagesComentariosFormComentariosFormRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ComentariosFormPageRoutingModule", function () {
      return ComentariosFormPageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _comentarios_form_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./comentarios-form.page */
    "./src/app/pages/comentarios-form/comentarios-form.page.ts");

    var routes = [{
      path: '',
      component: _comentarios_form_page__WEBPACK_IMPORTED_MODULE_3__["ComentariosFormPage"]
    }];

    var ComentariosFormPageRoutingModule = function ComentariosFormPageRoutingModule() {
      _classCallCheck(this, ComentariosFormPageRoutingModule);
    };

    ComentariosFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], ComentariosFormPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/pages/comentarios-form/comentarios-form.module.ts":
  /*!*******************************************************************!*\
    !*** ./src/app/pages/comentarios-form/comentarios-form.module.ts ***!
    \*******************************************************************/

  /*! exports provided: ComentariosFormPageModule */

  /***/
  function srcAppPagesComentariosFormComentariosFormModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ComentariosFormPageModule", function () {
      return ComentariosFormPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _comentarios_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./comentarios-form-routing.module */
    "./src/app/pages/comentarios-form/comentarios-form-routing.module.ts"); //import { ComentariosFormPage } from './comentarios-form.page';


    var ComentariosFormPageModule = function ComentariosFormPageModule() {
      _classCallCheck(this, ComentariosFormPageModule);
    };

    ComentariosFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _comentarios_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["ComentariosFormPageRoutingModule"]],
      declarations: []
    })], ComentariosFormPageModule);
    /***/
  }
}]);
//# sourceMappingURL=pages-comentarios-form-comentarios-form-module-es5.js.map