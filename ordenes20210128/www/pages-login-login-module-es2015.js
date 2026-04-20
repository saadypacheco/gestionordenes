(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-toolbar color=\"primary\">\n    <ion-title>WORKER</ion-title>\n    <ion-label slot=\"end\">(v2.0.8)</ion-label>\n</ion-toolbar>\n<ion-content>\n\n    <ion-slides class=\"mainSlide\" #slidePrincipal>\n        <ion-slide>\n            <form (ngSubmit)=\"login(fLogin)\" #fLogin=\"ngForm\">\n                <ion-grid fixed>\n                    <ion-row>\n                        <ion-col>\n                            <img src=\"/assets/avatars/av-1.png\">\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n\n                            <ion-list>\n\n                                <ion-item>\n                                    <ion-label>Usuario: </ion-label>\n                                    <ion-input name=\"xalias\" type=\"text\" [(ngModel)]=\"loginUser.xalias\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Clave: </ion-label>\n                                    <ion-input name=\"xpass\" type=\"password\" [(ngModel)]=\"loginUser.xpass\" required></ion-input>\n                                </ion-item>\n\n                            </ion-list>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col>\n                            <ion-button type=\"submit\" color=\"tertiary\" shape=\"round\">\n                                Ingresar\n                            </ion-button>\n                        </ion-col>\n                    </ion-row>\n\n                </ion-grid>\n            </form>\n\n\n\n        </ion-slide>\n        <!-- \n        <ion-slide>\n\n\n            <ion-grid fixed>\n\n                <ion-row>\n                    <ion-col>\n                        <h3>Seleccione Avatar</h3>\n                    </ion-col>\n                </ion-row>\n\n                <ion-row>\n                    <ion-col>\n                        <ion-slides [options]=\"avatarSlide\">\n                            <ion-slide *ngFor=\"let avatar of avatars\">\n                                <ion-img class=\"pick-avatar\" src=\"/assets/avatars/{{avatar.img}}\" [ngClass]=\"{ 'pick-avatar-seleccionado':avatar.seleccionado}\" (click)=\"seleccionarAvatar(avatar)\"></ion-img>\n                            </ion-slide>\n                        </ion-slides>\n                    </ion-col>\n                </ion-row>\n\n                <form (ngSubmit)=\"registro(fRegistro)\" #fRegistro=\"ngForm\">\n                    <ion-row>\n                        <ion-col>\n\n                            <ion-list>\n\n                                <ion-item>\n                                    <ion-label>Email</ion-label>\n                                    <ion-input name=\"email\" type=\"email\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Nombre</ion-label>\n                                    <ion-input name=\"nombre\" type=\"text\" required></ion-input>\n                                </ion-item>\n\n                                <ion-item>\n                                    <ion-label>Password</ion-label>\n                                    <ion-input name=\"password\" type=\"password\" required></ion-input>\n                                </ion-item>\n\n                            </ion-list>\n                        </ion-col>\n                    </ion-row>\n\n                    <ion-row>\n                        <ion-col>\n                            <ion-button type=\"submit\" color=\"tertiary\" shape=\"round\">\n                                Crear usuario\n                            </ion-button>\n                        </ion-col>\n                    </ion-row>\n\n                </form>\n            </ion-grid>\n\n\n        </ion-slide> -->\n\n\n    </ion-slides>\n\n\n\n</ion-content>\n\n<!-- \n<ion-footer no-border>\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col>\n                <ion-button shape=\"round\" expand=\"full\" size=\"small\" fill=\"outline\" color=\"tertiary\" (click)=\"mostrarRegistro()\"> Ingresar\n                </ion-button>\n            </ion-col>\n\n            <ion-col>\n                <ion-button shape=\"round\" expand=\"full\" size=\"small\" fill=\"outline\" color=\"tertiary\" (click)=\"mostrarLogin()\">\n                    Registrarme\n                </ion-button>\n            </ion-col>\n\n        </ion-row>\n\n\n\n    </ion-toolbar>\n</ion-footer> -->\n");

/***/ }),

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

/***/ "./src/app/pages/login/login-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/login-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/login/login.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/pages/login/login-routing.module.ts");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/pages/login/login.page.ts");







let LoginPageModule = class LoginPageModule {
};
LoginPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"]
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "./src/app/pages/login/login.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mainSlide,\n.mainSlide ion-slide {\n  width: 100%;\n  height: 100%;\n  --background: linear-gradient(135deg, var(--ion-color-dark), var(--ion-color-primary));\n}\n\nimg {\n  width: 120px;\n}\n\n.pick-avatar {\n  width: 80px;\n  opacity: 0.3;\n}\n\n.pick-avatar-seleccionado {\n  transition: opacity 0.5s linear;\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBOztFQUVJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esc0ZBQUE7QUNKSjs7QURPQTtFQUNJLFlBQUE7QUNKSjs7QURPQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0FDSko7O0FET0E7RUFDSSwrQkFBQTtFQUNBLHFCQUFBO0FDSkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA6aG9zdCB7XHJcbi8vICAgICBpb24tY29udGVudCB7XHJcbi8vICAgICAgICAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItZGFyayksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLm1haW5TbGlkZSxcclxuLm1haW5TbGlkZSBpb24tc2xpZGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAtLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWlvbi1jb2xvci1kYXJrKSwgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpKTtcclxufVxyXG5cclxuaW1nIHtcclxuICAgIHdpZHRoOiAxMjBweDtcclxufVxyXG5cclxuLnBpY2stYXZhdGFyIHtcclxuICAgIHdpZHRoOiA4MHB4O1xyXG4gICAgb3BhY2l0eTogMC4zO1xyXG59XHJcblxyXG4ucGljay1hdmF0YXItc2VsZWNjaW9uYWRvIHtcclxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBsaW5lYXI7XHJcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8vIGlvbi1yb3cge1xyXG4vLyAgICAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLWRhcmspLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkpO1xyXG4vLyB9IiwiLm1haW5TbGlkZSxcbi5tYWluU2xpZGUgaW9uLXNsaWRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3ItZGFyayksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XG59XG5cbmltZyB7XG4gIHdpZHRoOiAxMjBweDtcbn1cblxuLnBpY2stYXZhdGFyIHtcbiAgd2lkdGg6IDgwcHg7XG4gIG9wYWNpdHk6IDAuMztcbn1cblxuLnBpY2stYXZhdGFyLXNlbGVjY2lvbmFkbyB7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBsaW5lYXI7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/login/login.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/uiservice.service */ "./src/app/services/uiservice.service.ts");





let LoginPage = class LoginPage {
    constructor(usuarioService, navPage, uiService) {
        this.usuarioService = usuarioService;
        this.navPage = navPage;
        this.uiService = uiService;
        this.avatars = [
            {
                img: 'av-1.png',
                seleccionado: true
            },
            {
                img: 'av-2.png',
                seleccionado: false
            },
            {
                img: 'av-3.png',
                seleccionado: false
            },
            {
                img: 'av-4.png',
                seleccionado: false
            },
            {
                img: 'av-5.png',
                seleccionado: false
            },
            {
                img: 'av-6.png',
                seleccionado: false
            },
            {
                img: 'av-7.png',
                seleccionado: false
            },
            {
                img: 'av-8.png',
                seleccionado: false
            },
        ];
        this.avatarSlide = {
            slidesPerView: 3.5
        };
        this.loginUser = {
            xalias: '',
            xpass: ''
        };
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.slides.lockSwipes(true);
            this.usuarioService.getUltimoUsuario().then(x => {
                if (x != undefined) {
                    this.loginUser = x;
                }
            }).catch(y => {
                console.log(y);
                this.uiService.alertInformacion("Error al obter usuario logueado");
            });
        });
    }
    login(fLogin) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (fLogin.invalid) {
                this.uiService.alertInformacion("Ingrese usuario y clave");
                return;
            }
            var mensaje = '';
            this.usuarioService.login(this.loginUser.xalias, this.loginUser.xpass).then(x => {
                if (x) {
                    document.body.setAttribute('color-theme', 'dark');
                    this.navPage.navigateRoot('/main/tabs/tab1', { animated: true });
                }
                else {
                    this.uiService.alertInformacion("<b>Error de Ingreso <b></br> Usuario o clave incorrecto");
                }
            }).catch(err => {
                document.body.setAttribute('color-theme', 'light');
                this.uiService.alertInformacion(this.usuarioService.mensaje);
            });
        });
    }
    registro(fRegistro) {
        console.log(fRegistro.valid);
    }
    seleccionarAvatar(avatar) {
        this.avatars.forEach(av => av.seleccionado = false);
        avatar.seleccionado = true;
    }
    mostrarRegistro() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0);
        this.slides.lockSwipes(true);
    }
    mostrarLogin() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1);
        this.slides.lockSwipes(true);
    }
};
LoginPage.ctorParameters = () => [
    { type: _services_usuario_service__WEBPACK_IMPORTED_MODULE_3__["UsuarioService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"] },
    { type: _services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('slidePrincipal', { static: false })
], LoginPage.prototype, "slides", void 0);
LoginPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./login.page.scss */ "./src/app/pages/login/login.page.scss")).default]
    })
], LoginPage);



/***/ }),

/***/ "./src/app/services/uiservice.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/uiservice.service.ts ***!
  \***********************************************/
/*! exports provided: UIserviceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UIserviceService", function() { return UIserviceService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");



let UIserviceService = class UIserviceService {
    constructor(alertController) {
        this.alertController = alertController;
    }
    alertInformacion(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                // cssClass: 'my-custom-class',
                // header: 'Alert',
                // subHeader: 'Subtitle',
                message,
                buttons: ['OK']
            });
            yield alert.present();
        });
    }
    alertConfirm(message, callback) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Atenciòn',
                message: '<strong>' + message + '</strong>!!!',
                buttons: [
                    {
                        text: 'NO',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                        }
                    }, {
                        text: 'SI',
                        handler: () => {
                            callback();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
UIserviceService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"] }
];
UIserviceService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UIserviceService);



/***/ }),

/***/ "./src/app/services/usuario.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/usuario.service.ts ***!
  \*********************************************/
/*! exports provided: UsuarioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioService", function() { return UsuarioService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _functions_funciones__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../functions/funciones */ "./src/app/functions/funciones.ts");








const URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_4__["environment"].url;
//const URL = "http://localhost:8796/api"
let UsuarioService = class UsuarioService {
    constructor(http, storage, navCtrl, uiService) {
        this.http = http;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.uiService = uiService;
        this.xmovilid = null;
        this.usuarioTmp = {};
        this.usuario = {};
        this.mensaje = '';
    }
    getUltimoUsuario() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.loadUserStorage().then(x => {
                    if (this.lgn != undefined && this.lgn != null)
                        resolve(this.lgn);
                });
            }));
        });
    }
    login(xalias, xpass) {
        const self = this;
        const data = { "xalias": xalias, "xpass": xpass };
        // this.storage.set('lgn',data);
        let errorMessage = "";
        return new Promise(resolve => {
            this.http.post(`${URL}/usuarios/login`, data)
                .subscribe(resp => {
                if (resp[0].length > 0) {
                    if (this.usuarioTmp == null)
                        this.usuarioTmp = {};
                    Object.assign(this.usuarioTmp, resp[0][0]);
                    if (this.usuarioTmp.fecha != undefined) {
                        this.usuarioTmp.fecha = this.usuarioTmp.fecha.substring(0, 10);
                    }
                    self.usuario = self.usuarioTmp;
                    if (this.usuarioTmp.movilId === null) {
                        this.mensaje = 'No tiene asignado un movil';
                        resolve(false);
                    }
                    else {
                        this.saveUser(this.usuarioTmp, data);
                        resolve(true);
                    }
                }
                else {
                    this.mensaje = 'Usuario y/o contraseña no son correctos';
                    resolve(false);
                }
            }, (err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log(err);
                this.uiService.alertInformacion("no se pudo conectar");
                if (err instanceof ErrorEvent) {
                    // client-side error
                    this.mensaje = `Client-side error: ${err.error.message}`;
                }
                else {
                    // backend error
                    this.mensaje = `Server-side error: ${err.status} ${err.message} </br> ${err.error}`;
                    console.log(err.error);
                }
                // si no tiene red me fijo si el usuario se ya se logueo en el dia
                yield this.loadUserStorage();
                if (this.usuarioTmp) {
                    if (this.lgn && this.lgn.xalias == data.xalias && this.lgn.xpass == data.xpass)
                        if (this.usuarioTmp.fecha == Object(_functions_funciones__WEBPACK_IMPORTED_MODULE_7__["fechaHoyStr"])()) {
                            this.usuario = this.usuarioTmp;
                            resolve(true);
                        }
                        else {
                            resolve(false);
                            this.mensaje = '<b>Error:</b> </br>' + 'Usuario no tiene movil asignado';
                        }
                }
                else {
                    //this.storage.clear();
                    resolve(false);
                    //this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'Usuario y/o contraseña no son correctos')
                    this.mensaje = '<b>Error de conexión:</b> </br>' + 'Usuario y/o contraseña no son correctos';
                }
            }));
        });
    }
    saveUser(usuario, lgn) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.usuarioTmp = usuario;
            yield this.storage.set('usuario', usuario);
            yield this.storage.set('lgn', lgn);
        });
    }
    // busco al usuario del storage para validar
    // esto se necesita para controlar hasta cuando es valido el storage.
    loadUserStorage() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            /*
                this.storage.get('usuario').then( x => {
                  this.usuarioTmp = x
                  console.log(x)
                  this.storage.get('lgn').then (y=>{
                    this.lgn = y
                    console.log(y)
                  })
                }
            
                )
             */
            this.usuarioTmp = (yield this.storage.get('usuario')) || null;
            this.lgn = (yield this.storage.get('lgn')) || null;
        });
    }
    // falta un servicio: dado un idusuario , me devuelva el movilid
    validarUser() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // busco al usuario legeado en mi localstorage
            yield this.loadUserStorage();
            // si no recupera a ninguno entonces lo manda a loggin
            if (!this.usuarioTmp) {
                this.navCtrl.navigateRoot('/login');
                return Promise.resolve(false);
            }
            return new Promise(resolve => {
                resolve(true);
            });
        });
    }
};
UsuarioService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: _uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"] }
];
UsuarioService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UsuarioService);



/***/ }),

/***/ "./src/environments/environment.prod.ts":
/*!**********************************************!*\
  !*** ./src/environments/environment.prod.ts ***!
  \**********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: true,
    urltest: 'https://jsonplaceholder.typicode.com',
    // url:'http://worker2019.dyndns.org:8796/api'
    // url:'http://alerthor.net:8777/api'
    url: 'http://69.164.213.180:8796/api'
    //url:'http://localhost:8796/api'
};


/***/ })

}]);
//# sourceMappingURL=pages-login-login-module-es2015.js.map