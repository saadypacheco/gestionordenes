function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html":
  /*!***********************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html ***!
    \***********************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppPagesLoginLoginPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-toolbar color=\"primary\">\n    <ion-title>WORKER</ion-title>\n    <ion-label slot=\"end\">(v2.0.8)</ion-label>\n</ion-toolbar>\n<ion-content>\n\n    <ion-slides class=\"mainSlide\" #slidePrincipal>\n        <ion-slide>\n            <form (ngSubmit)=\"login(fLogin)\" #fLogin=\"ngForm\">\n                <ion-grid fixed>\n                    <ion-row>\n                        <ion-col>\n                            <img src=\"/assets/avatars/av-1.png\">\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n\n                            <ion-list>\n\n                                <ion-item>\n                                    <ion-label>Usuario: </ion-label>\n                                    <ion-input name=\"xalias\" type=\"text\" [(ngModel)]=\"loginUser.xalias\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Clave: </ion-label>\n                                    <ion-input name=\"xpass\" type=\"password\" [(ngModel)]=\"loginUser.xpass\" required></ion-input>\n                                </ion-item>\n\n                            </ion-list>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col>\n                            <ion-button type=\"submit\" color=\"tertiary\" shape=\"round\">\n                                Ingresar\n                            </ion-button>\n                        </ion-col>\n                    </ion-row>\n\n                </ion-grid>\n            </form>\n\n\n\n        </ion-slide>\n        <!-- \n        <ion-slide>\n\n\n            <ion-grid fixed>\n\n                <ion-row>\n                    <ion-col>\n                        <h3>Seleccione Avatar</h3>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col>\n                        <ion-slides [options]=\"avatarSlide\">\n                            <ion-slide *ngFor=\"let avatar of avatars\">\n                                <ion-img class=\"pick-avatar\" src=\"/assets/avatars/{{avatar.img}}\" [ngClass]=\"{ 'pick-avatar-seleccionado':avatar.seleccionado}\" (click)=\"seleccionarAvatar(avatar)\"></ion-img>\n                            </ion-slide>\n                        </ion-slides>\n                    </ion-col>\n                </ion-row>\n\n                <form (ngSubmit)=\"registro(fRegistro)\" #fRegistro=\"ngForm\">\n                    <ion-row>\n                        <ion-col>\n\n                            <ion-list>\n\n                                <ion-item>\n                                    <ion-label>Email</ion-label>\n                                    <ion-input name=\"email\" type=\"email\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Nombre</ion-label>\n                                    <ion-input name=\"nombre\" type=\"text\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Password</ion-label>\n                                    <ion-input name=\"password\" type=\"password\" required></ion-input>\n                                </ion-item>\n\n                            </ion-list>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col>\n                            <ion-button type=\"submit\" color=\"tertiary\" shape=\"round\">\n                                Crear usuario\n                            </ion-button>\n                        </ion-col>\n                    </ion-row>\n\n                </form>\n            </ion-grid>\n\n\n        </ion-slide> -->\n\n\n    </ion-slides>\n\n\n\n</ion-content>\n\n<!-- \n<ion-footer no-border>\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col>\n                <ion-button shape=\"round\" expand=\"full\" size=\"small\" fill=\"outline\" color=\"tertiary\" (click)=\"mostrarRegistro()\"> Ingresar\n                </ion-button>\n            </ion-col>\n\n            <ion-col>\n                <ion-button shape=\"round\" expand=\"full\" size=\"small\" fill=\"outline\" color=\"tertiary\" (click)=\"mostrarLogin()\">\n                    Registrarme\n                </ion-button>\n            </ion-col>\n\n        </ion-row>\n\n\n\n    </ion-toolbar>\n</ion-footer> -->\n";
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
  "./src/app/pages/login/login-routing.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/pages/login/login-routing.module.ts ***!
    \*****************************************************/

  /*! exports provided: LoginPageRoutingModule */

  /***/
  function srcAppPagesLoginLoginRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function () {
      return LoginPageRoutingModule;
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


    var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login.page */
    "./src/app/pages/login/login.page.ts");

    var routes = [{
      path: '',
      component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }];

    var LoginPageRoutingModule = function LoginPageRoutingModule() {
      _classCallCheck(this, LoginPageRoutingModule);
    };

    LoginPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], LoginPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/pages/login/login.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/pages/login/login.module.ts ***!
    \*********************************************/

  /*! exports provided: LoginPageModule */

  /***/
  function srcAppPagesLoginLoginModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPageModule", function () {
      return LoginPageModule;
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


    var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./login-routing.module */
    "./src/app/pages/login/login-routing.module.ts");
    /* harmony import */


    var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./login.page */
    "./src/app/pages/login/login.page.ts");

    var LoginPageModule = function LoginPageModule() {
      _classCallCheck(this, LoginPageModule);
    };

    LoginPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"]],
      declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })], LoginPageModule);
    /***/
  },

  /***/
  "./src/app/pages/login/login.page.scss":
  /*!*********************************************!*\
    !*** ./src/app/pages/login/login.page.scss ***!
    \*********************************************/

  /*! exports provided: default */

  /***/
  function srcAppPagesLoginLoginPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".mainSlide,\n.mainSlide ion-slide {\n  width: 100%;\n  height: 100%;\n  --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n}\n\nimg {\n  width: 120px;\n}\n\n.pick-avatar {\n  width: 80px;\n  opacity: 0.3;\n}\n\n.pick-avatar-seleccionado {\n  transition: opacity 0.5s linear;\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBOztFQUVJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0ZBQUE7QUNKSjs7QURPQTtFQUNJLFlBQUE7QUNKSjs7QURPQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDSko7O0FET0E7RUFDSSwrQkFBQTtFQUNBLHFCQUFBO0FDSkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA6aG9zdCB7XHJcbi8vICAgICBpb24tY29udGVudCB7XHJcbi8vICAgICAgICAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItZGFyayksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLm1haW5TbGlkZSxcclxuLm1haW5TbGlkZSBpb24tc2xpZGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWlvbi1jb2xvci1kYXJrKSwgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpKTtcclxufVxyXG5cclxuaW1nIHtcclxuICAgIHdpZHRoOiAxMjBweDtcclxufVxyXG5cclxuLnBpY2stYXZhdGFyIHtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgb3BhY2l0eTogMC4zO1xyXG59XHJcblxyXG4ucGljay1hdmF0YXItc2VsZWNjaW9uYWRvIHtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBsaW5lYXI7XHJcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8vIGlvbi1yb3cge1xyXG4vLyAgICAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLWRhcmspLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkpO1xyXG4vLyB9IiwiLm1haW5TbGlkZSxcbi5tYWluU2xpZGUgaW9uLXNsaWRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItZGFyayksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XG59XG5cbmltZyB7XG4gIHdpZHRoOiAxMjBweDtcbn1cblxuLnBpY2stYXZhdGFyIHtcbiAgd2lkdGg6IDgwcHg7XG4gIG9wYWNpdHk6IDAuMztcbn1cblxuLnBpY2stYXZhdGFyLXNlbGVjY2lvbmFkbyB7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBsaW5lYXI7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/pages/login/login.page.ts":
  /*!*******************************************!*\
    !*** ./src/app/pages/login/login.page.ts ***!
    \*******************************************/

  /*! exports provided: LoginPage */

  /***/
  function srcAppPagesLoginLoginPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPage", function () {
      return LoginPage;
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


    var _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/usuario.service */
    "./src/app/services/usuario.service.ts");
    /* harmony import */


    var _services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../services/uiservice.service */
    "./src/app/services/uiservice.service.ts");

    var LoginPage = /*#__PURE__*/function () {
      function LoginPage(usuarioService, navPage, uiService) {
        _classCallCheck(this, LoginPage);

        this.usuarioService = usuarioService;
        this.navPage = navPage;
        this.uiService = uiService;
        this.avatars = [{
          img: 'av-1.png',
          seleccionado: true
        }, {
          img: 'av-2.png',
          seleccionado: false
        }, {
          img: 'av-3.png',
          seleccionado: false
        }, {
          img: 'av-4.png',
          seleccionado: false
        }, {
          img: 'av-5.png',
          seleccionado: false
        }, {
          img: 'av-6.png',
          seleccionado: false
        }, {
          img: 'av-7.png',
          seleccionado: false
        }, {
          img: 'av-8.png',
          seleccionado: false
        }];
        this.avatarSlide = {
          slidesPerView: 3.5
        };
        this.loginUser = {
          xalias: '',
          xpass: ''
        };
      }

      _createClass(LoginPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this = this;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.slides.lockSwipes(true);
                    this.usuarioService.getUltimoUsuario().then(function (x) {
                      if (x != undefined) {
                        _this.loginUser = x;
                      }
                    })["catch"](function (y) {
                      console.log(y);

                      _this.uiService.alertInformacion("Error al obter usuario logueado");
                    });

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "login",
        value: function login(fLogin) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var _this2 = this;

            var mensaje;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!fLogin.invalid) {
                      _context2.next = 3;
                      break;
                    }

                    this.uiService.alertInformacion("Ingrese usuario y clave");
                    return _context2.abrupt("return");

                  case 3:
                    mensaje = '';
                    this.usuarioService.login(this.loginUser.xalias, this.loginUser.xpass).then(function (x) {
                      if (x) {
                        document.body.setAttribute('color-theme', 'dark');

                        _this2.navPage.navigateRoot('/main/tabs/tab1', {
                          animated: true
                        });
                      } else {
                        _this2.uiService.alertInformacion("<b>Error de Ingreso <b></br> Usuario o clave incorrecto");
                      }
                    })["catch"](function (err) {
                      document.body.setAttribute('color-theme', 'light');

                      _this2.uiService.alertInformacion(_this2.usuarioService.mensaje);
                    });

                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
        }
      }, {
        key: "registro",
        value: function registro(fRegistro) {
          console.log(fRegistro.valid);
        }
      }, {
        key: "seleccionarAvatar",
        value: function seleccionarAvatar(avatar) {
          this.avatars.forEach(function (av) {
            return av.seleccionado = false;
          });
          avatar.seleccionado = true;
        }
      }, {
        key: "mostrarRegistro",
        value: function mostrarRegistro() {
          this.slides.lockSwipes(false);
          this.slides.slideTo(0);
          this.slides.lockSwipes(true);
        }
      }, {
        key: "mostrarLogin",
        value: function mostrarLogin() {
          this.slides.lockSwipes(false);
          this.slides.slideTo(1);
          this.slides.lockSwipes(true);
        }
      }]);

      return LoginPage;
    }();

    LoginPage.ctorParameters = function () {
      return [{
        type: _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioService"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"]
      }, {
        type: _services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"]
      }];
    };

    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('slidePrincipal', {
      "static": false
    })], LoginPage.prototype, "slides", void 0);
    LoginPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! raw-loader!./login.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html"))["default"],
      styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
      /*! ./login.page.scss */
      "./src/app/pages/login/login.page.scss"))["default"]]
    })], LoginPage);
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
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var alert;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return this.alertController.create({
                      // cssClass: 'my-custom-class',
                      // header: 'Alert',
                      // subHeader: 'Subtitle',
                      message: message,
                      buttons: ['OK']
                    });

                  case 2:
                    alert = _context3.sent;
                    _context3.next = 5;
                    return alert.present();

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
        }
      }, {
        key: "alertConfirm",
        value: function alertConfirm(message, callback) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var alert;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
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
  "./src/app/services/usuario.service.ts":
  /*!*********************************************!*\
    !*** ./src/app/services/usuario.service.ts ***!
    \*********************************************/

  /*! exports provided: UsuarioService */

  /***/
  function srcAppServicesUsuarioServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UsuarioService", function () {
      return UsuarioService;
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


    var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/storage */
    "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
    /* harmony import */


    var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../../environments/environment.prod */
    "./src/environments/environment.prod.ts");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
    /* harmony import */


    var _uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./uiservice.service */
    "./src/app/services/uiservice.service.ts");
    /* harmony import */


    var _functions_funciones__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ../functions/funciones */
    "./src/app/functions/funciones.ts");

    var URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url; //const URL = "http://localhost:8796/api"

    var UsuarioService = /*#__PURE__*/function () {
      function UsuarioService(http, storage, navCtrl, uiService) {
        _classCallCheck(this, UsuarioService);

        this.http = http;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        this.xmovilid = null;
        this.usuarioTmp = {};
        this.usuario = {};
        this.mensaje = '';
      }

      _createClass(UsuarioService, [{
        key: "getUltimoUsuario",
        value: function getUltimoUsuario() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var _this3 = this;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt("return", new Promise(function (resolve) {
                      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                        var _this4 = this;

                        return regeneratorRuntime.wrap(function _callee5$(_context5) {
                          while (1) {
                            switch (_context5.prev = _context5.next) {
                              case 0:
                                this.loadUserStorage().then(function (x) {
                                  if (_this4.lgn != undefined && _this4.lgn != null) resolve(_this4.lgn);
                                });

                              case 1:
                              case "end":
                                return _context5.stop();
                            }
                          }
                        }, _callee5, this);
                      }));
                    }));

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));
        }
      }, {
        key: "login",
        value: function login(xalias, xpass) {
          var _this5 = this;

          var self = this;
          var data = {
            "xalias": xalias,
            "xpass": xpass
          }; // this.storage.set('lgn',data);

          var errorMessage = "";
          return new Promise(function (resolve) {
            _this5.http.post("".concat(URL, "/usuarios/login"), data).subscribe(function (resp) {
              if (resp[0].length > 0) {
                if (_this5.usuarioTmp == null) _this5.usuarioTmp = {};
                Object.assign(_this5.usuarioTmp, resp[0][0]);

                if (_this5.usuarioTmp.fecha != undefined) {
                  _this5.usuarioTmp.fecha = _this5.usuarioTmp.fecha.substring(0, 10);
                }

                self.usuario = self.usuarioTmp;

                if (_this5.usuarioTmp.movilId === null) {
                  _this5.mensaje = 'No tiene asignado un movil';
                  resolve(false);
                } else {
                  _this5.saveUser(_this5.usuarioTmp, data);

                  resolve(true);
                }
              } else {
                _this5.mensaje = 'Usuario y/o contraseña no son correctos';
                resolve(false);
              }
            }, function (err) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this5, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        console.log(err);
                        this.uiService.alertInformacion("no se pudo conectar");

                        if (err instanceof ErrorEvent) {
                          // client-side error
                          this.mensaje = "Client-side error: ".concat(err.error.message);
                        } else {
                          // backend error
                          this.mensaje = "Server-side error: ".concat(err.status, " ").concat(err.message, " </br> ").concat(err.error);
                          console.log(err.error);
                        } // si no tiene red me fijo si el usuario se ya se logueo en el dia


                        _context7.next = 5;
                        return this.loadUserStorage();

                      case 5:
                        if (this.usuarioTmp) {
                          if (this.lgn && this.lgn.xalias == data.xalias && this.lgn.xpass == data.xpass) if (this.usuarioTmp.fecha == Object(_functions_funciones__WEBPACK_IMPORTED_MODULE_7__["fechaHoyStr"])()) {
                            this.usuario = this.usuarioTmp;
                            resolve(true);
                          } else {
                            resolve(false);
                            this.mensaje = '<b>Error:</b> </br>' + 'Usuario no tiene movil asignado';
                          }
                        } else {
                          //this.storage.clear();
                          resolve(false); //this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'Usuario y/o contraseña no son correctos')

                          this.mensaje = '<b>Error de conexión:</b> </br>' + 'Usuario y/o contraseña no son correctos';
                        }

                      case 6:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, this);
              }));
            });
          });
        }
      }, {
        key: "saveUser",
        value: function saveUser(usuario, lgn) {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    this.usuarioTmp = usuario;
                    _context8.next = 3;
                    return this.storage.set('usuario', usuario);

                  case 3:
                    _context8.next = 5;
                    return this.storage.set('lgn', lgn);

                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));
        } // busco al usuario del storage para validar
        // esto se necesita para controlar hasta cuando es valido el storage.

      }, {
        key: "loadUserStorage",
        value: function loadUserStorage() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return this.storage.get('usuario');

                  case 2:
                    _context9.t0 = _context9.sent;

                    if (_context9.t0) {
                      _context9.next = 5;
                      break;
                    }

                    _context9.t0 = null;

                  case 5:
                    this.usuarioTmp = _context9.t0;
                    _context9.next = 8;
                    return this.storage.get('lgn');

                  case 8:
                    _context9.t1 = _context9.sent;

                    if (_context9.t1) {
                      _context9.next = 11;
                      break;
                    }

                    _context9.t1 = null;

                  case 11:
                    this.lgn = _context9.t1;

                  case 12:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));
        } // falta un servicio: dado un idusuario , me devuelva el movilid

      }, {
        key: "validarUser",
        value: function validarUser() {
          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    _context10.next = 2;
                    return this.loadUserStorage();

                  case 2:
                    if (this.usuarioTmp) {
                      _context10.next = 5;
                      break;
                    }

                    this.navCtrl.navigateRoot('/login');
                    return _context10.abrupt("return", Promise.resolve(false));

                  case 5:
                    return _context10.abrupt("return", new Promise(function (resolve) {
                      resolve(true);
                    }));

                  case 6:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));
        }
      }]);

      return UsuarioService;
    }();

    UsuarioService.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }, {
        type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]
      }, {
        type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"]
      }, {
        type: _uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"]
      }];
    };

    UsuarioService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
      providedIn: 'root'
    })], UsuarioService);
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
//# sourceMappingURL=pages-login-login-module-es5.js.map