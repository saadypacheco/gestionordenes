function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-agregar-equipo-agregar-equipo-module~pages-agregar-equipo-form-agregar-equipo-form-mod~c462d101"], {
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
  "./src/app/services/ordenes.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/ordenes.service.ts ***!
    \*********************************************/

  /*! exports provided: OrdenesService */

  /***/
  function srcAppServicesOrdenesServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrdenesService", function () {
      return OrdenesService;
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


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _data_local_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./data-local.service */
    "./src/app/services/data-local.service.ts");
    /* harmony import */


    var _uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @ionic-native/file-transfer/ngx */
    "./node_modules/@ionic-native/file-transfer/__ivy_ngcc__/ngx/index.js");

    var URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url;

    var OrdenesService = /*#__PURE__*/function () {
      function OrdenesService(http, platform, localdata, uiService, fileTransfer) {
        _classCallCheck(this, OrdenesService);

        this.http = http;
        this.platform = platform;
        this.localdata = localdata;
        this.uiService = uiService;
        this.fileTransfer = fileTransfer;
        this.hayConexion = false;
        this.ordenes = [];
      }

      _createClass(OrdenesService, [{
        key: "getOrden",
        value: function getOrden(ordenId) {
          var x = this.localdata.ordenes;
          return x.filter(function (o) {
            return o.ordenId == ordenId;
          })[0];
        }
      }, {
        key: "getOrdenes",
        value: function getOrdenes(fechaDesde, fechaHasta, instaladorId) {
          var _this = this;

          var self = this; //this.uiService.alertInformacion(`${ URL }/ordenes/listarInst/"${ fechaDesde }"/"${ fechaHasta }"/${ instaladorId }`);

          var path = "".concat(URL, "/ordenes/listarInst/\"").concat(fechaDesde, "\"/\"").concat(fechaHasta, "\"/").concat(instaladorId);
          self.sincronizar().subscribe(function (x) {
            self.http.get(path).subscribe(function (resp) {
              self.localdata.clearOrdenes();
              resp.forEach(function (ord) {
                ord.sincronizado = true;
                ord.fechaInstalacion = ord.fechaInstalacion.substring(0, 10);
                ord.cliente = ord.cliente == 'undefined' ? '' : ord.cliente;
                ord.materiales.forEach(function (mat) {
                  mat.cantidad = mat.Cantidad;
                  mat.materialId = mat.materialid;
                });
                ord.recuperos.forEach(function (mat) {
                  mat.nroSerie = mat.MAC;
                  mat.materialId = mat.materialid;
                });
                self.localdata.saveOrdenes(ord);
              });
              document.body.setAttribute('color-theme', 'dark');
              _this.ordenes = resp;
            }, function (err) {
              console.log(err);
              self.localdata.loadOrdenes().then(function (x) {
                _this.ordenes = self.localdata.ordenes;
                document.body.setAttribute('color-theme', 'light'); //     this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
              });
            });
          }, function (err) {
            _this.hayConexion = false;
            self.localdata.loadOrdenes().then(function (x) {
              _this.ordenes = self.localdata.ordenes;
              document.body.setAttribute('color-theme', 'light'); //    this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
            });
          });
        }
      }, {
        key: "hayQueSincronizar",
        value: function hayQueSincronizar() {
          return this.localdata.ordenes.filter(function (x) {
            return x.sincronizado == false;
          }).length > 0;
        }
      }, {
        key: "setConexion",
        value: function setConexion(valor) {
          var self = this;
          self.hayConexion = valor;
        }
      }, {
        key: "sincronizar",
        value: function sincronizar() {
          //console.log('voy a sincronizar')
          var ordenes = this.localdata.ordenes.filter(function (x) {
            return x.sincronizado == false;
          });
          ordenes = ordenes.map(function (x) {
            x.imagenes = [];
            return x;
          });
          return this.http.post("".concat(URL, "/ordenes/sincronizar"), {
            "ordenes": ordenes
          });
        }
      }, {
        key: "grabarSincronizar",
        value: function grabarSincronizar(ordenActual, modo) {
          var _this2 = this;

          //console.log('voy a sincronizar')
          // filtra las ordenes de la local sotrage y se queda con las que estan
          // sin sincronizar
          var ordenes = this.localdata.ordenes.filter(function (x) {
            return x.sincronizado == false && x.ordenId != ordenActual.ordenId;
          });
          ordenes = ordenes.map(function (x) {
            x.imagenes = [];
            x.equipos = x.equipos.map(function (e) {
              e.imagen = "";
              return e;
            });
            return x;
          }); //hago una copia de la orden actual sin las imagenes para mandar a grabar

          var _ordenAct = ordenActual;
          if (_ordenAct.equipos) _ordenAct.equipos = _ordenAct.equipos.map(function (e) {
            e.imagen = "";
            return e;
          }); // console.log('voy a sincronizar',ordenes)
          // llama al WS para guardar ordenes sin sincroinizar
          // envia las ordenes sin sincronizar y la orden actual por separado
          // si no hay error al grabar :
          //    graba orden actual en LS
          //    pone todas las ordenes como sincronizado
          //si hay error solo agrega orden actual a LS

          return new Promise(function (resolve) {
            _this2.http.post("".concat(URL, "/ordenes/grabarSincronizar"), {
              "ordenes": ordenes,
              "ordenActual": _ordenAct,
              "modo": modo
            }).subscribe(function (x) {
              ordenActual.sincronizado = true;

              _this2.localdata.saveOrdenes(ordenActual);

              _this2.localdata.ordenes.forEach(function (ord) {
                ord.sincronizado = true;
                ord.fechaInstalacion = ord.fechaInstalacion.substring(0, 10);

                _this2.localdata.saveOrdenes(ord);
              });

              document.body.setAttribute('color-theme', 'dark');
              resolve({
                "resultado": true
              });
            }, function (err) {
              ordenActual.sincronizado = false;

              if (err.error.status) {
                resolve({
                  "resultado": true,
                  "error": err.error.error
                });
              } else {
                _this2.localdata.saveOrdenes(ordenActual);

                document.body.setAttribute('color-theme', 'light');
                resolve({
                  "resultado": true
                });
              }
            });
          });
        }
      }, {
        key: "mostrarError",
        value: function mostrarError(error, entidad) {
          console.log(error);
          var msg = "<b>Error de Conexion: </b></br>" + "No se pudo grabar" + entidad;
          this.uiService.alertInformacion(msg);
        }
      }, {
        key: "subirImagen",
        value: function subirImagen(img, ordenId, imagenId) {
          var options = {
            fileKey: 'image',
            params: {
              ordenId: ordenId,
              imagenId: imagenId
            }
          };
          var fileTransfer = this.fileTransfer.create();
          fileTransfer.upload(img, "".concat(URL, "/ordenes/guardarImagen"), options).then(function (data) {
            console.log(data);
          })["catch"](function (err) {
            console.log('error en carga', err);
          });
        }
      }, {
        key: "getImagenes",
        value: function getImagenes(ordenId) {
          console.log("voy a buscar la orden");
          var path = "".concat(URL, "/ordenes/imagenesListar/").concat(ordenId);
          return this.http.get(path);
        }
      }]);

      return OrdenesService;
    }();

    OrdenesService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"]
      }, {
        type: _data_local_service__WEBPACK_IMPORTED_MODULE_5__["DataLocalService"]
      }, {
        type: _uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"]
      }, {
        type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__["FileTransfer"]
      }];
    };

    OrdenesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], OrdenesService);
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
//# sourceMappingURL=default~pages-agregar-equipo-agregar-equipo-module~pages-agregar-equipo-form-agregar-equipo-form-mod~c462d101-es5.js.map