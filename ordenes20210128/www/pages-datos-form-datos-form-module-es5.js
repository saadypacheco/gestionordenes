function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-datos-form-datos-form-module"], {
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
  "./src/app/pages/datos-form/datos-form-routing.module.ts":
  /*!***************************************************************!*\
    !*** ./src/app/pages/datos-form/datos-form-routing.module.ts ***!
    \***************************************************************/

  /*! exports provided: DatosFormPageRoutingModule */

  /***/
  function srcAppPagesDatosFormDatosFormRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DatosFormPageRoutingModule", function () {
      return DatosFormPageRoutingModule;
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


    var _datos_form_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./datos-form.page */
    "./src/app/pages/datos-form/datos-form.page.ts");

    var routes = [{
      path: '',
      component: _datos_form_page__WEBPACK_IMPORTED_MODULE_3__["DatosFormPage"]
    }];

    var DatosFormPageRoutingModule = function DatosFormPageRoutingModule() {
      _classCallCheck(this, DatosFormPageRoutingModule);
    };

    DatosFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], DatosFormPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/pages/datos-form/datos-form.module.ts":
  /*!*******************************************************!*\
    !*** ./src/app/pages/datos-form/datos-form.module.ts ***!
    \*******************************************************/

  /*! exports provided: DatosFormPageModule */

  /***/
  function srcAppPagesDatosFormDatosFormModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DatosFormPageModule", function () {
      return DatosFormPageModule;
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


    var _datos_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./datos-form-routing.module */
    "./src/app/pages/datos-form/datos-form-routing.module.ts"); //import { DatosFormPage } from './datos-form.page';


    var DatosFormPageModule = function DatosFormPageModule() {
      _classCallCheck(this, DatosFormPageModule);
    };

    DatosFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _datos_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["DatosFormPageRoutingModule"]],
      declarations: []
    })], DatosFormPageModule);
    /***/
  },

  /***/
  "./src/app/services/trabajos.service.ts":
  /*!**********************************************!*\
    !*** ./src/app/services/trabajos.service.ts ***!
    \**********************************************/

  /*! exports provided: TrabajosService */

  /***/
  function srcAppServicesTrabajosServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TrabajosService", function () {
      return TrabajosService;
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


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
    /* harmony import */


    var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../environments/environment.prod */
    "./src/environments/environment.prod.ts");
    /* harmony import */


    var _uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _data_local_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./data-local.service */
    "./src/app/services/data-local.service.ts");

    var URLTEST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].urltest;
    var URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url;

    var TrabajosService = /*#__PURE__*/function () {
      function TrabajosService(http, uiService, dlService) {
        _classCallCheck(this, TrabajosService);

        this.http = http;
        this.uiService = uiService;
        this.dlService = dlService;
        this.listaTareas = [];
        this.listaTipoTrabajo = [];
        this.listaEquipos = [];
        this.listaMateriales = [];
      }

      _createClass(TrabajosService, [{
        key: "getEquipos",
        value: function getEquipos() {
          var _this = this;

          if (this.listaEquipos && this.listaEquipos.length > 0) {
            return this.listaEquipos;
          }

          var path = "".concat(URL, "/listas/equiposEnDeposito/");
          new Promise(function (resolve) {
            _this.http.get(path).subscribe(function (resp) {
              _this.listaEquipos = resp[0];

              _this.dlService.setEquipos(_this.listaEquipos);

              return _this.listaEquipos;
            }, function (err) {
              //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
              _this.dlService.getEquipos().then(function (x) {
                _this.listaEquipos = x;
                return _this.listaEquipos;
              });
            });
          });
        }
      }, {
        key: "getMateriales",
        value: function getMateriales() {
          var _this2 = this;

          if (this.listaEquipos && this.listaEquipos.length > 0) {
            return this.listaEquipos;
          }

          var path = "".concat(URL, "/listas/materiales/");
          new Promise(function (resolve) {
            _this2.http.get(path).subscribe(function (resp) {
              _this2.listaMateriales = resp[0];

              _this2.dlService.setMateriales(_this2.listaMateriales);

              return _this2.listaMateriales;
            }, function (err) {
              //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
              _this2.dlService.getMateriales().then(function (x) {
                _this2.listaMateriales = x;
                return _this2.listaMateriales;
              });
            });
          });
        } //WorKerApp

      }, {
        key: "getTareas",
        value: function getTareas() {
          var _this3 = this;

          if (this.listaTareas && this.listaTareas.length > 0) {
            return this.listaTareas;
          }

          var path = "".concat(URL, "/listas/tareas/");
          new Promise(function (resolve) {
            _this3.http.get(path).subscribe(function (resp) {
              _this3.listaTareas = resp[0];

              _this3.dlService.setTareas(_this3.listaTareas);

              return _this3.listaTareas;
            }, function (err) {
              //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
              _this3.dlService.getTareas().then(function (x) {
                _this3.listaTareas = x;
                return _this3.listaTareas;
              });
            });
          });
        }
      }, {
        key: "getTipoTrabajo",
        value: function getTipoTrabajo() {
          var _this4 = this;

          //  return this.http.get(`${ URL }/listas/tTrabajo`);
          var path = "".concat(URL, "/listas/tTrabajo");
          return new Promise(function (resolve) {
            _this4.http.get(path).subscribe(function (resp) {
              _this4.listaTipoTrabajo = resp[0];

              _this4.dlService.setTiposTrabajos(_this4.listaTipoTrabajo);

              resolve(_this4.listaTipoTrabajo);
            }, function (err) {
              //console.log(err);
              //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tipos de trabajo')
              _this4.dlService.getTiposTrabajos().then(function (x) {
                _this4.listaTipoTrabajo = x; //    console.log(this.listaTipoTrabajo)

                return _this4.listaTipoTrabajo;
              });
            });
          });
        } // para quitar luego.

      }, {
        key: "getPostsTest",
        value: function getPostsTest() {
          return this.http.get("".concat(URL, "/todos/"));
        }
      }, {
        key: "getTarea",
        value: function getTarea(id) {
          id = Number(id); //  console.log(id);

          return this.listaTareas.find(function (listaData) {
            return listaData.tareaId === id;
          });
        }
      }, {
        key: "saveStorage",
        value: function saveStorage(tareas) {// localStorage.setItem('tareas',tareas);
        }
      }, {
        key: "loadStorege",
        value: function loadStorege() {
          this.listaTareas = [];

          if (localStorage.getItem('data')) {
            this.listaTareas = JSON.parse(localStorage.getItem('data'));
          }
        }
      }]);

      return TrabajosService;
    }();

    TrabajosService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"]
      }, {
        type: _data_local_service__WEBPACK_IMPORTED_MODULE_5__["DataLocalService"]
      }];
    };

    TrabajosService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], TrabajosService);
    /***/
  }
}]);
//# sourceMappingURL=pages-datos-form-datos-form-module-es5.js.map