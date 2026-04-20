function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~orden-form-orden-form-module~pages-agregar-recupero-agregar-recupero-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.html":
  /*!*******************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.html ***!
    \*******************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesAgregarRecuperoFormAgregarRecuperoFormPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header no-border>\n    <ion-toolbar>\n        <ion-title text-capitalize> REGISTRAR EQUIPO RECUPERADO</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-list>\n    <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n            <ion-text>\n                <b>Orden: {{orden.ordenId}} </b>\n                <p><b>Direccion:{{orden.calle}} {{orden.numero}}</b></p>\n                <p>Cliente: {{orden.cliente}}</p>\n            </ion-text>\n        </ion-label>\n    </ion-item>\n\n</ion-list>\n\n\n<ion-content class=\"ion-padding-top\">\n    <form (ngSubmit)=\"saveNewEquipo(fEquipo)\" #fEquipo=\"ngForm\">\n        <ion-list>\n            <ion-row>\n                <ion-col size=\"7\">\n                    <ion-item >\n                        <ion-label position=\"floating\"> Nro Serie </ion-label>\n                        <ion-input name=\"nroSerie\" type=\"text\" [(ngModel)]=\"nroSerie\"> </ion-input>\n                    </ion-item>\n                </ion-col>\n                <ion-col>\n                    <ion-button outline color=\"primary\" (click)=\"scanner()\">\n                        <ion-icon name=\"barcode\"></ion-icon>\n                    </ion-button>\n                </ion-col>\n                <ion-col>\n                    <ion-button outline color=\"primary\" (click)=\"camara()\">\n                        <ion-icon name=\"camera\"></ion-icon>\n                    </ion-button>\n                </ion-col>\n            </ion-row>\n\n            <ion-row *ngIf=\"tempImage\">\n                <ion-col >\n                    <ion-card>\n                        <img [src]=\"tempImage\" alt=\"imagen\">\n                    </ion-card>\n                </ion-col>\n            </ion-row>\n        </ion-list>\n\n        <ion-row class=\"ion-padding-vertical\">\n            <ion-col size=\"6\" class=\"ion-text-right\">\n                <ion-button (click)=\"cancelAddEquipo()\" color=\"danger\" shape=\"round\">\n                    Cancelar\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" class=\"ion-text-left\">\n                <ion-button type=\"submit\" shape=\"round\">\n                    Agregar\n                </ion-button>\n            </ion-col>\n        </ion-row>\n    </form>\n</ion-content>\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero/agregar-recupero.page.html":
  /*!*********************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero/agregar-recupero.page.html ***!
    \*********************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesAgregarRecuperoAgregarRecuperoPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-content>\n  <div class=\"spin\" *ngIf=\"cargando == true\">\n      <ion-spinner name=\"bubbles\"></ion-spinner>\n  </div>\n  <ion-list>\n      <ion-item-sliding *ngFor=\"let equipo of orden.recuperos; let i=index\" class=\"animated fadeInDown\">\n          <ion-item>\n              <ion-thumbnail slot=\"start\">\n                  <img [src]=\"equipo.src\"  onError=\"src = 'assets/imags/default.png';\" >\n              </ion-thumbnail>\n              <ion-label>\n                  <ion-note color=\"dark\" slot=\"end\">{{equipo.nroSerie}}</ion-note>\n              </ion-label>\n          </ion-item>\n          <ion-item-options side=\"end\">\n              <ion-button (click)=\"deleteEquipo(i)\" fill=\"clear\">\n                  <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n              </ion-button>\n          </ion-item-options>\n      </ion-item-sliding>\n  </ion-list>\n  <!--\n  <ion-row class=\"ion-padding-vertical\">\n      <ion-col class=\"ion-text-center\" *ngIf=\"orden.equipos.length > 0 && guardar\">\n          <ion-button (click)=\"saveEquipos()\" shape=\"round\">\n              Guardar\n          </ion-button>\n      </ion-col>\n  </ion-row>\n\n  -->\n</ion-content>\n<ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n  <ion-fab-button (click)=\"addRecupero()\">\n      <ion-icon name=\"add\"></ion-icon>\n  </ion-fab-button>\n</ion-fab>\n";
    /***/
  },

  /***/
  "./src/app/functions/funciones.ts":
  /*!****************************************!*\
    !*** ./src/app/functions/funciones.ts ***!
    \****************************************/

  /*! exports provided: formatDate, fechaHoyStr, str2ab */

  /***/
  function srcAppFunctionsFuncionesTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "formatDate", function () {
      return formatDate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "fechaHoyStr", function () {
      return fechaHoyStr;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "str2ab", function () {
      return str2ab;
    });

    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }

    function fechaHoyStr() {
      return formatDate(new Date());
    }

    function str2ab(str) {
      var arr = str.split(',');
      var view = new Uint8Array(arr);
      return view.buffer;
    }
    /***/

  },

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
  "./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.scss":
  /*!*****************************************************************************!*\
    !*** ./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.scss ***!
    \*****************************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesAgregarRecuperoFormAgregarRecuperoFormPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItcmVjdXBlcm8tZm9ybS9hZ3JlZ2FyLXJlY3VwZXJvLWZvcm0ucGFnZS5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.ts":
  /*!***************************************************************************!*\
    !*** ./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.ts ***!
    \***************************************************************************/

  /*! exports provided: AgregarRecuperoFormPage */

  /***/
  function srcAppPagesAgregarRecuperoFormAgregarRecuperoFormPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AgregarRecuperoFormPage", function () {
      return AgregarRecuperoFormPage;
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


    var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic-native/barcode-scanner/ngx */
    "./node_modules/@ionic-native/barcode-scanner/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic-native/camera/ngx */
    "./node_modules/@ionic-native/camera/__ivy_ngcc__/ngx/index.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/services/ordenes.service */
    "./src/app/services/ordenes.service.ts");
    /* harmony import */


    var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! uuid */
    "./node_modules/uuid/index.js");
    /* harmony import */


    var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);

    var AgregarRecuperoFormPage = /*#__PURE__*/function () {
      function AgregarRecuperoFormPage(barcodeScanner, camera, sanitizer, equipoCtrl, uiService, ordenesService) {
        _classCallCheck(this, AgregarRecuperoFormPage);

        this.barcodeScanner = barcodeScanner;
        this.camera = camera;
        this.sanitizer = sanitizer;
        this.equipoCtrl = equipoCtrl;
        this.uiService = uiService;
        this.ordenesService = ordenesService;
        this.equipos = [];
        this.id = Object(uuid__WEBPACK_IMPORTED_MODULE_8__["v4"])();
      }

      _createClass(AgregarRecuperoFormPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "cancelAddEquipo",
        value: function cancelAddEquipo() {
          this.equipoCtrl.dismiss();
        }
      }, {
        key: "saveNewEquipo",
        value: function saveNewEquipo(fEquipo) {
          if (this.tempImage && this.tempImage.length > 1 && this.nroSerie.length == 0) {
            this.uiService.alertInformacion("Debe ingresar un numero de serie");
          }

          this.equipoSelected = {
            equipoId: undefined,
            nroSerie: this.nroSerie,
            materialId: 2416,
            descripcion: "",
            src: this.tempImage
          };
          this.equipoSelected.imagenId = this.imagenId;
          this.equipoCtrl.dismiss(this.equipoSelected);
        }
      }, {
        key: "scanner",
        value: function scanner() {
          var _this = this;

          this.barcodeScanner.scan().then(function (barcodeData) {
            console.log('Barcode data', barcodeData);
            _this.nroSerie = barcodeData.text;
            return;
          })["catch"](function (err) {
            console.log('Error', err);

            _this.uiService.alertInformacion(err);
          });
        }
      }, {
        key: "camara",
        value: function camara() {
          var _this2 = this;

          var options = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
          };
          this.camera.getPicture(options).then(function (imageData) {
            _this2.imagenId = Object(uuid__WEBPACK_IMPORTED_MODULE_8__["v4"])();
            var img = window.Ionic.WebView.convertFileSrc(imageData);

            _this2.ordenesService.subirImagen(imageData, _this2.orden.ordenId.toString(), _this2.imagenId);

            _this2.tempImage = _this2.sanitizer.bypassSecurityTrustUrl(img);
          }, function (err) {
            console.log(err);
          });
        }
      }]);

      return AgregarRecuperoFormPage;
    }();

    AgregarRecuperoFormPage.ctorParameters = function () {
      return [{
        type: _ionic_native_barcode_scanner_ngx__WEBPACK_IMPORTED_MODULE_4__["BarcodeScanner"]
      }, {
        type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_5__["Camera"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"]
      }, {
        type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_3__["UIserviceService"]
      }, {
        type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_7__["OrdenesService"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")], AgregarRecuperoFormPage.prototype, "orden", void 0);
    AgregarRecuperoFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-agregar-recupero-form',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./agregar-recupero-form.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./agregar-recupero-form.page.scss */
      "./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.scss"))["default"]]
    })], AgregarRecuperoFormPage);
    /***/
  },

  /***/
  "./src/app/pages/agregar-recupero/agregar-recupero.page.scss":
  /*!*******************************************************************!*\
    !*** ./src/app/pages/agregar-recupero/agregar-recupero.page.scss ***!
    \*******************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesAgregarRecuperoAgregarRecuperoPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItcmVjdXBlcm8vYWdyZWdhci1yZWN1cGVyby5wYWdlLnNjc3MifQ== */";
    /***/
  },

  /***/
  "./src/app/pages/agregar-recupero/agregar-recupero.page.ts":
  /*!*****************************************************************!*\
    !*** ./src/app/pages/agregar-recupero/agregar-recupero.page.ts ***!
    \*****************************************************************/

  /*! exports provided: AgregarRecuperoPage */

  /***/
  function srcAppPagesAgregarRecuperoAgregarRecuperoPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AgregarRecuperoPage", function () {
      return AgregarRecuperoPage;
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


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/functions/funciones */
    "./src/app/functions/funciones.ts");
    /* harmony import */


    var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! src/app/interfaces/interfaces */
    "./src/app/interfaces/interfaces.ts");
    /* harmony import */


    var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! src/app/services/ordenes.service */
    "./src/app/services/ordenes.service.ts");
    /* harmony import */


    var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! src/app/services/uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _agregar_recupero_form_agregar_recupero_form_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../agregar-recupero-form/agregar-recupero-form.page */
    "./src/app/pages/agregar-recupero-form/agregar-recupero-form.page.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js"); //import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


    var AgregarRecuperoPage = /*#__PURE__*/function () {
      function AgregarRecuperoPage(ordenesService, route, modalTarea, uiService, sanitizer) {
        _classCallCheck(this, AgregarRecuperoPage);

        this.ordenesService = ordenesService;
        this.route = route;
        this.modalTarea = modalTarea;
        this.uiService = uiService;
        this.sanitizer = sanitizer;
        this.cargando = true;
      }

      _createClass(AgregarRecuperoPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.guardar = false;
          this.cargando = true;
          this.cargarImagenes();
        }
      }, {
        key: "addRecupero",
        value: function addRecupero() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this3 = this;

            var modal, _yield$modal$onDidDis, data;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.modalTarea.create({
                      component: _agregar_recupero_form_agregar_recupero_form_page__WEBPACK_IMPORTED_MODULE_8__["AgregarRecuperoFormPage"],
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

                    if (this.orden.recuperos === undefined) {
                      this.orden.recuperos = [];
                    }

                    data.imagen = "";
                    this.orden.recuperos.push(data);
                    this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_5__["ModoGrabadoOrden"].TODO).then(function (x) {})["catch"](function (x) {
                      _this3.uiService.alertInformacion("NO SE PUDO AGREGAR EL EQUIPO");
                    });

                  case 16:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "deleteEquipo",
        value: function deleteEquipo(index) {
          if (this.orden.estadoId == 15) {
            this.orden.equipos.splice(index, 1);
            this.guardar = true;
          } else {
            this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
          }
        }
      }, {
        key: "cargarImagenes",
        value: function cargarImagenes() {
          var _this4 = this;

          var _img = "";
          this.orden.equipos.forEach(function (x) {
            if (x.imagenId && x.imagenId.length > 0 && x.imagen != null) {
              var img = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_4__["str2ab"])(x.imagen);
              var blob = new Blob([img], {
                type: x.mimeType
              });
              var reader = new FileReader();
              reader.readAsDataURL(blob);

              reader.onloadend = function () {
                _img = reader.result.toString();
                x.src = _this4.sanitizer.bypassSecurityTrustUrl(_img); //   x.imagen = "";
              };
            }
          });
          this.cargando = false;
        }
      }]);

      return AgregarRecuperoPage;
    }();

    AgregarRecuperoPage.ctorParameters = function () {
      return [{
        type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__["OrdenesService"]
      }, {
        type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"]
      }, {
        type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__["UIserviceService"]
      }, {
        type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__["DomSanitizer"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")], AgregarRecuperoPage.prototype, "orden", void 0);
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")], AgregarRecuperoPage.prototype, "parentColor", void 0);
    AgregarRecuperoPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-agregar-recupero',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./agregar-recupero.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-recupero/agregar-recupero.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./agregar-recupero.page.scss */
      "./src/app/pages/agregar-recupero/agregar-recupero.page.scss"))["default"]]
    })], AgregarRecuperoPage);
    /***/
  }
}]);
//# sourceMappingURL=default~orden-form-orden-form-module~pages-agregar-recupero-agregar-recupero-module-es5.js.map