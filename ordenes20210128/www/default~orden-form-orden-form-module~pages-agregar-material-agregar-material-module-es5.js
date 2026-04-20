function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~orden-form-orden-form-module~pages-agregar-material-agregar-material-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html":
  /*!*******************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html ***!
    \*******************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesAgregarMaterialFormAgregarMaterialFormPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header no-border>\n  <ion-toolbar>\n      <ion-title text-capitalize> REGISTRAR MATERIAL</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-list>\n  <ion-item>\n      <ion-label class=\"ion-text-wrap\">\n          <ion-text>\n              <b>Orden: {{orden.ordenId}} </b>\n              <p><b>Direccion:{{orden.calle}} {{orden.numero}}</b></p>\n              <p>Cliente: {{orden.cliente}}</p>\n          </ion-text>\n      </ion-label>\n  </ion-item>\n\n</ion-list>\n\n<ion-content class=\"ion-padding-top\">\n  <form (ngSubmit)=\"saveNewMaterial(fMaterial)\" #fMaterial=\"ngForm\">\n      <ion-list>\n          <ion-item class=\"padding\">\n              <ion-label position=\"floating\"> Material </ion-label>\n              <ionic-selectable name=\"material\" item-content slot [(ngModel)]=\"materialSelected\" \n              [items]=\"materiales\" itemValueField=\"materialId\" \n              itemTextField=\"descripcion\" \n              [canSearch]=\"true\" \n              searchFailText=\"Lo sentimos no hay resultado \" \n              (onSearch)=\"buscarMaterial($event)\">\n                  <ng-template ionicSelectableItemTemplate let-materialSelected=\"item\">\n                      <ion-text class=\"ion-text-lowercase\">\n                          {{materialSelected.codigoSap}} - {{materialSelected.descripcion}}\n                      </ion-text>\n                  </ng-template>\n              </ionic-selectable>\n          </ion-item>\n\n          <ion-item class=\"padding\">\n              <ion-label position=\"floating\"> Cantidad </ion-label>\n              <ion-input name=\"cantidad\" type=\"tel\" [(ngModel)]=\"cantidad\" required> </ion-input>\n          </ion-item>\n\n      </ion-list>\n\n\n      <ion-row class=\"ion-padding-vertical\">\n          <ion-col size=\"6\" class=\"ion-text-right\">\n              <ion-button (click)=\"cancelAddMaterial()\" color=\"danger\" shape=\"round\">\n                  Cancelar\n              </ion-button>\n          </ion-col>\n          <ion-col size=\"6\" class=\"ion-text-left\">\n              <ion-button type=\"submit\" shape=\"round\">\n                  Guardar\n              </ion-button>\n          </ion-col>\n      </ion-row>\n  </form>\n</ion-content>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material/agregar-material.page.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material/agregar-material.page.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesAgregarMaterialAgregarMaterialPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-content>\n  <ion-list>\n      \n      <ion-item-sliding *ngFor=\"let material of orden.materiales; let i=index\" class=\"animated fadeInDown\">\n          <ion-item  >\n\n                      <p>{{material.descriopcion}} </p>\n                      <p  slot=\"end\">({{material.Cantidad}})</p>\n\n          </ion-item>\n          <ion-item-options side=\"end\"  *ngIf=\"orden.estadoId== 15\" >\n              <ion-item-option (click)=\"deleteMaterial(i)\" color=\"danger\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n              </ion-item-option>\n          </ion-item-options>\n      </ion-item-sliding>\n  </ion-list>\n</ion-content>\n<ion-fab  *ngIf=\"orden.estadoId== 15\" vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n  <ion-fab-button (click)=\"addMaterial()\">\n      <ion-icon name=\"add\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>";
    /***/
  },

  /***/
  "./src/app/pages/agregar-material-form/agregar-material-form.page.scss":
  /*!*****************************************************************************!*\
    !*** ./src/app/pages/agregar-material-form/agregar-material-form.page.scss ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesAgregarMaterialFormAgregarMaterialFormPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItbWF0ZXJpYWwtZm9ybS9hZ3JlZ2FyLW1hdGVyaWFsLWZvcm0ucGFnZS5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/pages/agregar-material-form/agregar-material-form.page.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/pages/agregar-material-form/agregar-material-form.page.ts ***!
    \***************************************************************************/

  /*! exports provided: AgregarMaterialFormPage */

  /***/
  function srcAppPagesAgregarMaterialFormAgregarMaterialFormPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AgregarMaterialFormPage", function () {
      return AgregarMaterialFormPage;
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


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/trabajos.service */
    "./src/app/services/trabajos.service.ts");
    /* harmony import */


    var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/services/uiservice.service */
    "./src/app/services/uiservice.service.ts");

    var AgregarMaterialFormPage = /*#__PURE__*/function () {
      function AgregarMaterialFormPage(materialCtrl, materialesService, uiService, tServie) {
        _classCallCheck(this, AgregarMaterialFormPage);

        this.materialCtrl = materialCtrl;
        this.materialesService = materialesService;
        this.uiService = uiService;
        this.tServie = tServie;
        this.searchString = '';
        this.materiales = [];
      }

      _createClass(AgregarMaterialFormPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.materiales = this.tServie.listaMateriales;
        }
      }, {
        key: "buscarMaterial",
        value: function buscarMaterial(event) {
          var text = event.text.trim().toLowerCase();
          event.component.startSearch(); // Close any running subscription.

          if (!text) {
            event.component.items = this.materiales;
            event.component.endSearch();
            return;
          }

          event.component.items = this.materialesService.listaMateriales.filter(function (x) {
            if (x.descripcion.toLowerCase().search(text) >= 0 || x.codigoSap && x.codigoSap.toString().search(text) >= 0) {
              return x;
            }
          });
          event.component.endSearch();
        }
      }, {
        key: "cancelAddMaterial",
        value: function cancelAddMaterial() {
          this.materialCtrl.dismiss();
        }
      }, {
        key: "saveNewMaterial",
        value: function saveNewMaterial(fmaterial) {
          var _this = this;

          if (this.materialSelected === undefined || this.materialSelected === null) {
            return;
          }

          if (this.orden.materiales && this.orden.materiales.filter(function (x) {
            return x.materialId == _this.materialSelected.materialId;
          }).length > 0) {
            this.uiService.alertInformacion("material : </br>" + this.materialSelected.descripcion + "</br>" + " ya fue ingresada");
            return;
          }

          if (this.cantidad === undefined || this.cantidad <= 0) {
            this.uiService.alertInformacion("Seleccione Cantidad");
            return;
          }

          this.materialCtrl.dismiss({
            materialId: this.materialSelected.materialId,
            cantidad: this.cantidad,
            descripcion: this.materialSelected.descripcion
          });
        }
      }]);

      return AgregarMaterialFormPage;
    }();

    AgregarMaterialFormPage.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
      }, {
        type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"]
      }, {
        type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"]
      }, {
        type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")], AgregarMaterialFormPage.prototype, "orden", void 0);
    AgregarMaterialFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-agregar-material-form',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./agregar-material-form.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./agregar-material-form.page.scss */
      "./src/app/pages/agregar-material-form/agregar-material-form.page.scss"))["default"]]
    })], AgregarMaterialFormPage);
    /***/
  },

  /***/
  "./src/app/pages/agregar-material/agregar-material.page.scss":
  /*!*******************************************************************!*\
    !*** ./src/app/pages/agregar-material/agregar-material.page.scss ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesAgregarMaterialAgregarMaterialPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".custom-font-size {\n  font-size: 0.77em;\n  font-weight: bold;\n}\n\nion-note {\n  color: #c04d4d;\n  font-size: 0.77em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2FncmVnYXItbWF0ZXJpYWwvYWdyZWdhci1tYXRlcmlhbC5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2FncmVnYXItbWF0ZXJpYWwvYWdyZWdhci1tYXRlcmlhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxpQkFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FERUE7RUFDSSxjQUFBO0VBQ0EsaUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItbWF0ZXJpYWwvYWdyZWdhci1tYXRlcmlhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY3VzdG9tLWZvbnQtc2l6ZSB7XG4gICAgZm9udC1zaXplOiAwLjc3ZW07XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbmlvbi1ub3RlIHtcbiAgICBjb2xvcjogI2MwNGQ0ZDtcbiAgICBmb250LXNpemU6IDAuNzdlbTtcbn0iLCIuY3VzdG9tLWZvbnQtc2l6ZSB7XG4gIGZvbnQtc2l6ZTogMC43N2VtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuaW9uLW5vdGUge1xuICBjb2xvcjogI2MwNGQ0ZDtcbiAgZm9udC1zaXplOiAwLjc3ZW07XG59Il19 */";
    /***/
  },

  /***/
  "./src/app/pages/agregar-material/agregar-material.page.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/pages/agregar-material/agregar-material.page.ts ***!
    \*****************************************************************/

  /*! exports provided: AgregarMaterialPage */

  /***/
  function srcAppPagesAgregarMaterialAgregarMaterialPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AgregarMaterialPage", function () {
      return AgregarMaterialPage;
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


    var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/ordenes.service */
    "./src/app/services/ordenes.service.ts");
    /* harmony import */


    var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/interfaces/interfaces */
    "./src/app/interfaces/interfaces.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/services/uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _agregar_material_form_agregar_material_form_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../agregar-material-form/agregar-material-form.page */
    "./src/app/pages/agregar-material-form/agregar-material-form.page.ts"); //import { AgregarTareaFormPage } from '../agregar-tarea-form/agregar-tarea-form.page';


    var AgregarMaterialPage = /*#__PURE__*/function () {
      function AgregarMaterialPage(ordenesService, route, modalMaterial, uiService) {
        _classCallCheck(this, AgregarMaterialPage);

        this.ordenesService = ordenesService;
        this.route = route;
        this.modalMaterial = modalMaterial;
        this.uiService = uiService;
        this.listaMateriales = [];
        this.nombreItemmaterial = '';
      }

      _createClass(AgregarMaterialPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "addMaterial",
        value: function addMaterial() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this2 = this;

            var modal, _yield$modal$onDidDis, data, _material;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.modalMaterial.create({
                      component: _agregar_material_form_agregar_material_form_page__WEBPACK_IMPORTED_MODULE_7__["AgregarMaterialFormPage"],
                      componentProps: {
                        'orden': this.orden
                      }
                    });

                  case 2:
                    modal = _context.sent;
                    _context.next = 5;
                    return modal.present();

                  case 5:
                    _context.next = 7;
                    return modal.onDidDismiss();

                  case 7:
                    _yield$modal$onDidDis = _context.sent;
                    data = _yield$modal$onDidDis.data;

                    if (!(data === undefined)) {
                      _context.next = 11;
                      break;
                    }

                    return _context.abrupt("return");

                  case 11:
                    ;
                    _material = {
                      materialId: data.materialId,
                      medidaInicial: 0,
                      medidaFinal: 0,
                      nroSerie: undefined,
                      nroSerieR: undefined,
                      tipoConsumoId: 1,
                      cantidad: data.cantidad,
                      descripcion: data.descripcion,
                      Cantidad: data.cantidad,
                      descriopcion: data.descripcion
                    };

                    if (this.orden.materiales === undefined) {
                      this.orden.materiales = [];
                    }

                    if (this.orden.materiales.filter(function (x) {
                      return x.materialId == data.materialId;
                    }).length === 0) {
                      console.log(_material);
                      this.orden.materiales.push(_material);
                      this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(function (x) {//     this.uiService.alertInformacion("tarea agregada")  
                      })["catch"](function (x) {
                        _this2.uiService.alertInformacion("NO SE PUDO AGREGAR TAREA");
                      });
                    }

                  case 15:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "deleteMaterial",
        value: function deleteMaterial(i) {
          var _this3 = this;

          if (this.orden.estadoId == 15) {
            this.orden.materiales.splice(i, 1);
            this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(function (x) {
              _this3.uiService.alertInformacion("tarea eliminada");
            });
          } else {
            this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
          }
        }
      }]);

      return AgregarMaterialPage;
    }();

    AgregarMaterialPage.ctorParameters = function () {
      return [{
        type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"]
      }, {
        type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")], AgregarMaterialPage.prototype, "orden", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")], AgregarMaterialPage.prototype, "parentColor", void 0);
    AgregarMaterialPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-agregar-material',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./agregar-material.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material/agregar-material.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./agregar-material.page.scss */
      "./src/app/pages/agregar-material/agregar-material.page.scss"))["default"]]
    })], AgregarMaterialPage);
    /***/
  }
}]);
//# sourceMappingURL=default~orden-form-orden-form-module~pages-agregar-material-agregar-material-module-es5.js.map