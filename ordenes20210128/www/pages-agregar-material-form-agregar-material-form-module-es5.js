function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-agregar-material-form-agregar-material-form-module"], {
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
  "./src/app/services/data-local.service.ts":
  /*!************************************************!*\
    !*** ./src/app/services/data-local.service.ts ***!
    \************************************************/

  /*! exports provided: DataLocalService */

  /***/
  function srcAppServicesDataLocalServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DataLocalService", function () {
      return DataLocalService;
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


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");

    var DataLocalService = /*#__PURE__*/function () {
      function DataLocalService(storage) {
        _classCallCheck(this, DataLocalService);

        this.storage = storage;
        this.usuarioLogeado = null;
        this.ordenes = [];
        this.tareas = [];
        this.equipos = [];
        this.materiales = [];
      }

      _createClass(DataLocalService, [{
        key: "saveOrdenes",
        value: function saveOrdenes(orden) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var removeIndex;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // let self = this
                    if (this.ordenes == null) {
                      this.ordenes = [];
                    } //si esta la orden primero la borro para luego agregarla modificada


                    removeIndex = this.ordenes.map(function (item) {
                      return item.ordenId;
                    }).indexOf(orden.ordenId);
                    console.log('borro par insertar:', removeIndex);

                    if (removeIndex !== undefined && removeIndex >= 0) {
                      console.log('borro par insertar:', removeIndex);
                      this.ordenes.splice(removeIndex, 1);
                    }

                    this.ordenes.unshift(orden);
                    this.storage.set('ordenes', this.ordenes); //   this.loadOrdenes();

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "getUsuario",
        value: function getUsuario() {
          return this.storage.get('usuario');
        }
      }, {
        key: "loadOrdenes",
        value: function loadOrdenes() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var self, ordenes;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    self = this;
                    _context2.next = 3;
                    return self.storage.get('ordenes');

                  case 3:
                    ordenes = _context2.sent;
                    self.ordenes = ordenes;

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "clearOrdenes",
        value: function clearOrdenes() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    this.ordenes = [];
                    this.storage.set('ordenes', this.ordenes);

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, {
        key: "getMateriales",
        value: function getMateriales() {
          return this.storage.get('materiales');
        }
      }, {
        key: "getEquipos",
        value: function getEquipos() {
          return this.storage.get('equipos');
        }
      }, {
        key: "getTareas",
        value: function getTareas() {
          return this.storage.get('tareas');
        }
      }, {
        key: "getTiposTrabajos",
        value: function getTiposTrabajos() {
          return this.storage.get('tiposTrabajo');
        }
      }, {
        key: "setMateriales",
        value: function setMateriales(equipos) {
          this.storage.set('materiales', equipos);
        }
      }, {
        key: "setEquipos",
        value: function setEquipos(equipos) {
          this.storage.set('equipos', equipos);
        }
      }, {
        key: "setTareas",
        value: function setTareas(tareas) {
          this.storage.set('tareas', tareas);
        }
      }, {
        key: "setTiposTrabajos",
        value: function setTiposTrabajos(tiposTrabajo) {
          this.storage.set('tiposTrabajo', tiposTrabajo);
        }
      }]);

      return DataLocalService;
    }();

    DataLocalService.ctorParameters = function () {
      return [{
        type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]
      }];
    };

    DataLocalService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], DataLocalService);
    /***/
  },

  /***/
  "./src/app/services/uiservice.service.ts":
  /*!***********************************************!*\
    !*** ./src/app/services/uiservice.service.ts ***!
    \***********************************************/

  /*! exports provided: UIserviceService */

  /***/
  function srcAppServicesUiserviceServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UIserviceService", function () {
      return UIserviceService;
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

    var UIserviceService = /*#__PURE__*/function () {
      function UIserviceService(alertController) {
        _classCallCheck(this, UIserviceService);

        this.alertController = alertController;
      }

      _createClass(UIserviceService, [{
        key: "alertInformacion",
        value: function alertInformacion(message) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var alert;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return this.alertController.create({
                      // cssClass: 'my-custom-class',
                      // header: 'Alert',
                      // subHeader: 'Subtitle',
                      message: message,
                      buttons: ['OK']
                    });

                  case 2:
                    alert = _context4.sent;
                    _context4.next = 5;
                    return alert.present();

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
        }
      }, {
        key: "alertConfirm",
        value: function alertConfirm(message, callback) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var alert;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return this.alertController.create({
                      cssClass: 'my-custom-class',
                      header: 'Atenciòn',
                      message: '<strong>' + message + '</strong>!!!',
                      buttons: [{
                        text: 'NO',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: function handler(blah) {}
                      }, {
                        text: 'SI',
                        handler: function handler() {
                          callback();
                        }
                      }]
                    });

                  case 2:
                    alert = _context5.sent;
                    _context5.next = 5;
                    return alert.present();

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));
        }
      }]);

      return UIserviceService;
    }();

    UIserviceService.ctorParameters = function () {
      return [{
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]
      }];
    };

    UIserviceService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], UIserviceService);
    /***/
  },

  /***/
  "./src/environments/environment.prod.ts":
  /*!**********************************************!*\
    !*** ./src/environments/environment.prod.ts ***!
    \**********************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentProdTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });

    var environment = {
      production: true,
      urltest: 'https://jsonplaceholder.typicode.com',
      // url:'http://worker2019.dyndns.org:8796/api'
      // url:'http://alerthor.net:8777/api'
      url: 'http://69.164.213.180:8796/api' //url:'http://localhost:8796/api'

    };
    /***/
  }
}]);
//# sourceMappingURL=pages-agregar-material-form-agregar-material-form-module-es5.js.map