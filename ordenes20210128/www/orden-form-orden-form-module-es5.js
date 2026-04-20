function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["orden-form-orden-form-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/orden-form/orden-form.page.html":
  /*!*********************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/orden-form/orden-form.page.html ***!
    \*********************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesOrdenFormOrdenFormPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n    <ion-toolbar>\n        <ion-title>ORDEN {{orden.ordenId}}</ion-title>\n        <ion-buttons slot=\"primary\">\n            <!-- <ion-button expand=\"full\" shape=\"round\" (click)=\"gallery()\">\n                <ion-icon slot=\"icon-only\" name=\"images\" color=\"success\"></ion-icon>\n            </ion-button> -->\n            <ion-button expand=\"full\" shape=\"round\" (click)=\"saveAnularOrden()\" [(disabled)]=\"disabledOrden\">\n                <ion-icon slot=\"icon-only\" name=\"trash\" color=\"light\"></ion-icon>\n            </ion-button>\n            <ion-button expand=\"full\" shape=\"round\" (click)=\"saveCloseOrden()\" [(disabled)]=\"disabledOrden\">\n                <ion-icon size=\"large\" slot=\"icon-only\" name=\"checkmark\" color=\"tertiary\"></ion-icon>\n            </ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n\n</ion-header>\n<ion-content padding>\n    <ion-toolbar mode=\"md\" no-border-bottom no-border-top no-border>\n        <ion-segment value=\"Tareas\" (ionChange)=\"segmentChanged($event)\" scrollable=true>\n            <ion-segment-button value=\"Tareas\">\n                <ion-icon size=\"small\" name=\"construct-outline\">></ion-icon>\n                <ion-label>Tareas</ion-label>\n            </ion-segment-button>\n            <ion-segment-button value=\"Equipos\">\n                <ion-icon name=\"desktop-outline\" size=\"small\"></ion-icon>\n                <ion-label>Equipos</ion-label>\n            </ion-segment-button>\n\n            <ion-segment-button value=\"Recuperos\">\n                <ion-icon name=\"download-outline\" size=\"small\"></ion-icon>\n                <ion-label>Recuperos</ion-label>\n            </ion-segment-button>\n\n            <ion-segment-button value=\"Materiales\">\n                <ion-icon name=\"list-outline\" size=\"small\"></ion-icon>\n                <ion-label>Materiales</ion-label>\n            </ion-segment-button>\n\n            <ion-segment-button value=\"Comentarios\">\n                <ion-icon name=\"document-attach-outline\" size=\"small\"></ion-icon>\n                <ion-label>Comentarios</ion-label>\n            </ion-segment-button>\n            <ion-segment-button value=\"Datos\">\n                <ion-icon name=\"bookmark\" size=\"small\"></ion-icon>\n                <ion-label>Datos</ion-label>\n            </ion-segment-button>\n            <ion-segment-button value=\"Galeria\">\n                <ion-icon name=\"images\" size=\"small\"></ion-icon>\n                <ion-label>Galeria</ion-label>\n            </ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n\n    <app-agregar-tarea *ngIf=\"segmentValue=='Tareas'\" [orden]=orden> </app-agregar-tarea>\n    <app-datos-form *ngIf=\"segmentValue=='Datos'\" [orden]=orden> </app-datos-form>\n    <app-comentarios-form *ngIf=\"segmentValue=='Comentarios'\" [orden]=orden> </app-comentarios-form>\n    <app-agregar-equipo *ngIf=\"segmentValue=='Equipos'\" [orden]=orden></app-agregar-equipo>\n    <app-agregar-recupero *ngIf=\"segmentValue=='Recuperos'\" [orden]=orden></app-agregar-recupero>\n    <app-agregar-material *ngIf=\"segmentValue=='Materiales'\" [orden]=orden></app-agregar-material>\n    <app-fotos *ngIf=\"segmentValue=='Galeria'\" [orden]=orden></app-fotos>\n\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/pages/orden-form/orden-form-routing.module.ts":
  /*!***************************************************************!*\
    !*** ./src/app/pages/orden-form/orden-form-routing.module.ts ***!
    \***************************************************************/

  /*! exports provided: OrdenFormPageRoutingModule */

  /***/
  function srcAppPagesOrdenFormOrdenFormRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrdenFormPageRoutingModule", function () {
      return OrdenFormPageRoutingModule;
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


    var _orden_form_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./orden-form.page */
    "./src/app/pages/orden-form/orden-form.page.ts");

    var routes = [{
      path: '',
      component: _orden_form_page__WEBPACK_IMPORTED_MODULE_3__["OrdenFormPage"]
    }];

    var OrdenFormPageRoutingModule = function OrdenFormPageRoutingModule() {
      _classCallCheck(this, OrdenFormPageRoutingModule);
    };

    OrdenFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], OrdenFormPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/pages/orden-form/orden-form.module.ts":
  /*!*******************************************************!*\
    !*** ./src/app/pages/orden-form/orden-form.module.ts ***!
    \*******************************************************/

  /*! exports provided: OrdenFormPageModule */

  /***/
  function srcAppPagesOrdenFormOrdenFormModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrdenFormPageModule", function () {
      return OrdenFormPageModule;
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


    var _orden_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./orden-form-routing.module */
    "./src/app/pages/orden-form/orden-form-routing.module.ts");
    /* harmony import */


    var _orden_form_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./orden-form.page */
    "./src/app/pages/orden-form/orden-form.page.ts");
    /* harmony import */


    var _agregar_tarea_agregar_tarea_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../agregar-tarea/agregar-tarea.page */
    "./src/app/pages/agregar-tarea/agregar-tarea.page.ts");
    /* harmony import */


    var _comentarios_form_comentarios_form_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../comentarios-form/comentarios-form.page */
    "./src/app/pages/comentarios-form/comentarios-form.page.ts");
    /* harmony import */


    var _datos_form_datos_form_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ../datos-form/datos-form.page */
    "./src/app/pages/datos-form/datos-form.page.ts");
    /* harmony import */


    var _agregar_equipo_agregar_equipo_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! ../agregar-equipo/agregar-equipo.page */
    "./src/app/pages/agregar-equipo/agregar-equipo.page.ts");
    /* harmony import */


    var _agregar_recupero_agregar_recupero_page__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! ../agregar-recupero/agregar-recupero.page */
    "./src/app/pages/agregar-recupero/agregar-recupero.page.ts");
    /* harmony import */


    var _agregar_material_agregar_material_page__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! ../agregar-material/agregar-material.page */
    "./src/app/pages/agregar-material/agregar-material.page.ts");
    /* harmony import */


    var _fotos_fotos_page__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! ../fotos/fotos.page */
    "./src/app/pages/fotos/fotos.page.ts");

    var OrdenFormPageModule = function OrdenFormPageModule() {
      _classCallCheck(this, OrdenFormPageModule);
    };

    OrdenFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _orden_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["OrdenFormPageRoutingModule"]],
      declarations: [_orden_form_page__WEBPACK_IMPORTED_MODULE_6__["OrdenFormPage"], _agregar_tarea_agregar_tarea_page__WEBPACK_IMPORTED_MODULE_7__["AgregarTareaPage"], _comentarios_form_comentarios_form_page__WEBPACK_IMPORTED_MODULE_8__["ComentariosFormPage"], _datos_form_datos_form_page__WEBPACK_IMPORTED_MODULE_9__["DatosFormPage"], _agregar_equipo_agregar_equipo_page__WEBPACK_IMPORTED_MODULE_10__["AgregarEquipoPage"], _agregar_material_agregar_material_page__WEBPACK_IMPORTED_MODULE_12__["AgregarMaterialPage"], _fotos_fotos_page__WEBPACK_IMPORTED_MODULE_13__["FotosPage"], _agregar_recupero_agregar_recupero_page__WEBPACK_IMPORTED_MODULE_11__["AgregarRecuperoPage"]]
    })], OrdenFormPageModule);
    /***/
  },

  /***/
  "./src/app/pages/orden-form/orden-form.page.scss":
  /*!*******************************************************!*\
    !*** ./src/app/pages/orden-form/orden-form.page.scss ***!
    \*******************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesOrdenFormOrdenFormPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".my-label {\n  font-size: 0.7em;\n}\n\n.bottonRow {\n  margin-top: -15px;\n}\n\nion-toolbar {\n  --min-height: 10px!important;\n  --min-width: 10px !important;\n  vertical-align: middle;\n  font-size: 50%;\n}\n\n.ion-1x {\n  font-size: 12px !important;\n  color: #7d7d7d;\n}\n\nion-segment-button {\n  font-size: 10px;\n  color: white;\n  --border-radius: 1px;\n}\n\nion-segment-button ion-label {\n  margin: 0;\n}\n\n.segment-button-checked {\n  color: #ffc900 !important;\n}\n\n.segment-button-checked ion-label {\n  color: #ffc900 !important;\n}\n\n.segment-button-checked ion-icon {\n  color: #ffc900 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL29yZGVuLWZvcm0vb3JkZW4tZm9ybS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL29yZGVuLWZvcm0vb3JkZW4tZm9ybS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksaUJBQUE7QUNDSjs7QURFQTtFQUNJLDRCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7QUNDSjs7QURFQTtFQUNJLDBCQUFBO0VBQ0EsY0FBQTtBQ0NKOztBREVBO0VBRUksZUFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtBQ0FKOztBRENJO0VBQ0ksU0FBQTtBQ0NSOztBREdBO0VBRUkseUJBQUE7QUNESjs7QURFSTtFQUNJLHlCQUFBO0FDQVI7O0FERUk7RUFDSSx5QkFBQTtBQ0FSIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvb3JkZW4tZm9ybS9vcmRlbi1mb3JtLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5teS1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDAuN2VtO1xyXG59XHJcblxyXG4uYm90dG9uUm93IHtcclxuICAgIG1hcmdpbi10b3A6IC0xNXB4O1xyXG59XHJcblxyXG5pb24tdG9vbGJhciB7XHJcbiAgICAtLW1pbi1oZWlnaHQ6IDEwcHghaW1wb3J0YW50O1xyXG4gICAgLS1taW4td2lkdGg6IDEwcHggIWltcG9ydGFudDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBmb250LXNpemU6IDUwJTtcclxufVxyXG5cclxuLmlvbi0xeCB7XHJcbiAgICBmb250LXNpemU6IDEycHggIWltcG9ydGFudDtcclxuICAgIGNvbG9yOiAjN2Q3ZDdkO1xyXG59XHJcblxyXG5pb24tc2VnbWVudC1idXR0b24ge1xyXG4gICAgLy9iYWNrZ3JvdW5kOiAjMmYzMmEwO1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcclxuICAgIC0tYm9yZGVyLXJhZGl1czogMXB4O1xyXG4gICAgaW9uLWxhYmVsIHtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5zZWdtZW50LWJ1dHRvbi1jaGVja2VkIHtcclxuICAgIC8vYmFja2dyb3VuZDogI2ZmYzkwMCAhaW1wb3J0YW50O1xyXG4gICAgY29sb3I6ICNmZmM5MDAgIWltcG9ydGFudDtcclxuICAgIGlvbi1sYWJlbCB7XHJcbiAgICAgICAgY29sb3I6ICNmZmM5MDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIGlvbi1pY29uIHtcclxuICAgICAgICBjb2xvcjogI2ZmYzkwMCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcbiIsIi5teS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC43ZW07XG59XG5cbi5ib3R0b25Sb3cge1xuICBtYXJnaW4tdG9wOiAtMTVweDtcbn1cblxuaW9uLXRvb2xiYXIge1xuICAtLW1pbi1oZWlnaHQ6IDEwcHghaW1wb3J0YW50O1xuICAtLW1pbi13aWR0aDogMTBweCAhaW1wb3J0YW50O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBmb250LXNpemU6IDUwJTtcbn1cblxuLmlvbi0xeCB7XG4gIGZvbnQtc2l6ZTogMTJweCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzdkN2Q3ZDtcbn1cblxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIC0tYm9yZGVyLXJhZGl1czogMXB4O1xufVxuaW9uLXNlZ21lbnQtYnV0dG9uIGlvbi1sYWJlbCB7XG4gIG1hcmdpbjogMDtcbn1cblxuLnNlZ21lbnQtYnV0dG9uLWNoZWNrZWQge1xuICBjb2xvcjogI2ZmYzkwMCAhaW1wb3J0YW50O1xufVxuLnNlZ21lbnQtYnV0dG9uLWNoZWNrZWQgaW9uLWxhYmVsIHtcbiAgY29sb3I6ICNmZmM5MDAgIWltcG9ydGFudDtcbn1cbi5zZWdtZW50LWJ1dHRvbi1jaGVja2VkIGlvbi1pY29uIHtcbiAgY29sb3I6ICNmZmM5MDAgIWltcG9ydGFudDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/pages/orden-form/orden-form.page.ts":
  /*!*****************************************************!*\
    !*** ./src/app/pages/orden-form/orden-form.page.ts ***!
    \*****************************************************/

  /*! exports provided: OrdenFormPage */

  /***/
  function srcAppPagesOrdenFormOrdenFormPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrdenFormPage", function () {
      return OrdenFormPage;
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


    var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/services/ordenes.service */
    "./src/app/services/ordenes.service.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/interfaces/interfaces */
    "./src/app/interfaces/interfaces.ts");
    /* harmony import */


    var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/services/uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");

    var OrdenFormPage = /*#__PURE__*/function () {
      function OrdenFormPage(ordeneService, route, navPage, uiService) {
        _classCallCheck(this, OrdenFormPage);

        this.ordeneService = ordeneService;
        this.route = route;
        this.navPage = navPage;
        this.uiService = uiService; //const x = this.route.snapshot.paramMap.get('orden');

        this.orden = {};
        this.segmentValue = "Tareas";
      }

      _createClass(OrdenFormPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.orden = this.ordeneService.getOrden(this.route.snapshot.paramMap.get('orden')); // console.log(this.orden)

                    this.disabledOrden = this.orden.estadoId === 15 ? false : true;

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "segmentChanged",
        value: function segmentChanged(ev) {
          //   console.log('Segment changed', ev);
          this.segmentValue = ev.detail.value;
        }
      }, {
        key: "saveCloseOrden",
        value: function saveCloseOrden() {
          var _this = this;

          if (this.orden.tareas && this.orden.tareas.length >= 1) {
            this.disabledOrden = !this.disabledOrden;
            this.orden.estadoId = 20;
            this.ordeneService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(function (res) {
              _this.uiService.alertInformacion("La Orden Nro:" + _this.orden.ordenId + " se cerro correctamente");

              _this.navPage.navigateRoot('/main/tabs/tab1', {
                animated: true
              });
            });
          } else {
            var msg = 'La orden no tiene tareas';
            this.uiService.alertInformacion(msg);
          }
        }
      }, {
        key: "saveAnularOrden",
        value: function saveAnularOrden() {
          var _this2 = this;

          var self = this;
          self.uiService.alertConfirm("Desea anular la orden?", function (x) {
            _this2._anularOrden();
          });
        }
      }, {
        key: "_anularOrden",
        value: function _anularOrden() {
          var _this3 = this;

          this.orden.estadoId = 90;
          this.ordeneService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(function (res) {
            if (res) {
              _this3.disabledOrden = !_this3.disabledOrden;

              _this3.uiService.alertInformacion("La Orden Nro:" + _this3.orden.ordenId + " se anulo correctamente");

              _this3.navPage.navigateRoot('/main/tabs/tab1', {
                animated: true
              });
            } else {
              _this3.uiService.alertInformacion("error al sincronizar y anular orden");
            }
          });
        }
      }]);

      return OrdenFormPage;
    }();

    OrdenFormPage.ctorParameters = function () {
      return [{
        type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_2__["OrdenesService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["NavController"]
      }, {
        type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_5__["UIserviceService"]
      }];
    };

    OrdenFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-orden-form',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./orden-form.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/orden-form/orden-form.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./orden-form.page.scss */
      "./src/app/pages/orden-form/orden-form.page.scss"))["default"]]
    })], OrdenFormPage);
    /***/
  }
}]);
//# sourceMappingURL=orden-form-orden-form-module-es5.js.map