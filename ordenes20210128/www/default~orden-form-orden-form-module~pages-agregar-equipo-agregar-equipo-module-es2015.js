(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~orden-form-orden-form-module~pages-agregar-equipo-agregar-equipo-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-equipo/agregar-equipo.page.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-equipo/agregar-equipo.page.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <div class=\"spin\" *ngIf=\"cargando == true\">\n        <ion-spinner name=\"bubbles\"></ion-spinner>\n    </div>\n    <ion-list>\n        <ion-item-sliding *ngFor=\"let equipo of orden.equipos; let i=index\" class=\"animated fadeInDown\">\n            <ion-item>\n                <ion-thumbnail slot=\"start\">\n                    <img [src]=\"equipo.src\"  onError=\"src = 'assets/imags/default.png';\" >\n                </ion-thumbnail>\n                <ion-label>\n                    <h3>{{equipo.descripcion}}</h3>\n                    <ion-note color=\"dark\" slot=\"end\">{{equipo.nroSerie}}</ion-note>\n                </ion-label>\n            </ion-item>\n            <ion-item-options side=\"end\">\n                <ion-button (click)=\"deleteEquipo(i)\" fill=\"clear\">\n                    <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <!--\n    <ion-row class=\"ion-padding-vertical\">\n        <ion-col class=\"ion-text-center\" *ngIf=\"orden.equipos.length > 0 && guardar\">\n            <ion-button (click)=\"saveEquipos()\" shape=\"round\">\n                Guardar\n            </ion-button>\n        </ion-col>\n    </ion-row>\n\n    -->\n</ion-content>\n<ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)=\"addEquipo()\">\n        <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n</ion-fab>\n");

/***/ }),

/***/ "./src/app/pages/agregar-equipo/agregar-equipo.page.scss":
/*!***************************************************************!*\
  !*** ./src/app/pages/agregar-equipo/agregar-equipo.page.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".custom-font-size {\n  font-size: 0.77em;\n  font-weight: bold;\n}\n\nion-note {\n  color: #822d2dc9;\n  font-size: 0.77em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2FncmVnYXItZXF1aXBvL2FncmVnYXItZXF1aXBvLnBhZ2Uuc2NzcyIsInNyYy9hcHAvcGFnZXMvYWdyZWdhci1lcXVpcG8vYWdyZWdhci1lcXVpcG8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvYWdyZWdhci1lcXVpcG8vYWdyZWdhci1lcXVpcG8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmN1c3RvbS1mb250LXNpemUge1xuICAgIGZvbnQtc2l6ZTogMC43N2VtO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24tbm90ZSB7XG4gICAgY29sb3I6ICM4MjJkMmRjOTtcbiAgICBmb250LXNpemU6IDAuNzdlbTtcbn1cbiIsIi5jdXN0b20tZm9udC1zaXplIHtcbiAgZm9udC1zaXplOiAwLjc3ZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG5pb24tbm90ZSB7XG4gIGNvbG9yOiAjODIyZDJkYzk7XG4gIGZvbnQtc2l6ZTogMC43N2VtO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/agregar-equipo/agregar-equipo.page.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/agregar-equipo/agregar-equipo.page.ts ***!
  \*************************************************************/
/*! exports provided: AgregarEquipoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarEquipoPage", function() { return AgregarEquipoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/functions/funciones */ "./src/app/functions/funciones.ts");
/* harmony import */ var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/interfaces/interfaces */ "./src/app/interfaces/interfaces.ts");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _agregar_equipo_form_agregar_equipo_form_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../agregar-equipo-form/agregar-equipo-form.page */ "./src/app/pages/agregar-equipo-form/agregar-equipo-form.page.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");










//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
let AgregarEquipoPage = class AgregarEquipoPage {
    constructor(ordenesService, route, modalTarea, uiService, sanitizer) {
        this.ordenesService = ordenesService;
        this.route = route;
        this.modalTarea = modalTarea;
        this.uiService = uiService;
        this.sanitizer = sanitizer;
        this.cargando = true;
    }
    ngOnInit() {
        this.guardar = false;
        this.cargando = true;
        this.cargarImagenes();
    }
    addEquipo() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalTarea.create({
                component: _agregar_equipo_form_agregar_equipo_form_page__WEBPACK_IMPORTED_MODULE_8__["AgregarEquipoFormPage"],
                componentProps: {
                    'orden': this.orden
                }
            });
            yield modal.present();
            const { data } = yield modal.onDidDismiss();
            // console.log('Datos para grabar la tarea',data );
            if (data === undefined) {
                return;
            }
            ;
            if (this.orden.equipos === undefined) {
                this.orden.equipos = [];
            }
            data.imagen = "";
            this.orden.equipos.push(data);
            this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_5__["ModoGrabadoOrden"].TODO).then(x => {
            }).catch(x => {
                this.uiService.alertInformacion("NO SE PUDO AGREGAR EL EQUIPO");
            });
        });
    }
    deleteEquipo(index) {
        if (this.orden.estadoId == 15) {
            this.orden.equipos.splice(index, 1);
            this.guardar = true;
        }
        else {
            this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
        }
    }
    cargarImagenes() {
        let _img = "";
        this.orden.equipos.forEach(x => {
            if (x.imagenId && x.imagenId.length > 0 && x.imagen != null) {
                const img = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_4__["str2ab"])(x.imagen);
                const blob = new Blob([img], { type: x.mimeType });
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    _img = reader.result.toString();
                    x.src = this.sanitizer.bypassSecurityTrustUrl(_img);
                    //   x.imagen = "";
                };
            }
        });
        this.cargando = false;
    }
};
AgregarEquipoPage.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__["OrdenesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__["UIserviceService"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__["DomSanitizer"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], AgregarEquipoPage.prototype, "orden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")
], AgregarEquipoPage.prototype, "parentColor", void 0);
AgregarEquipoPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-agregar-equipo',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./agregar-equipo.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-equipo/agregar-equipo.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./agregar-equipo.page.scss */ "./src/app/pages/agregar-equipo/agregar-equipo.page.scss")).default]
    })
], AgregarEquipoPage);



/***/ }),

/***/ "./src/app/services/trabajos.service.ts":
/*!**********************************************!*\
  !*** ./src/app/services/trabajos.service.ts ***!
  \**********************************************/
/*! exports provided: TrabajosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrabajosService", function() { return TrabajosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _data_local_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-local.service */ "./src/app/services/data-local.service.ts");






const URLTEST = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].urltest;
const URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url;
let TrabajosService = class TrabajosService {
    constructor(http, uiService, dlService) {
        this.http = http;
        this.uiService = uiService;
        this.dlService = dlService;
        this.listaTareas = [];
        this.listaTipoTrabajo = [];
        this.listaEquipos = [];
        this.listaMateriales = [];
    }
    getEquipos() {
        if (this.listaEquipos && this.listaEquipos.length > 0) {
            return this.listaEquipos;
        }
        const path = `${URL}/listas/equiposEnDeposito/`;
        new Promise(resolve => {
            this.http.get(path)
                .subscribe(resp => {
                this.listaEquipos = resp[0];
                this.dlService.setEquipos(this.listaEquipos);
                return this.listaEquipos;
            }, err => {
                //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
                this.dlService.getEquipos().then(x => {
                    this.listaEquipos = x;
                    return this.listaEquipos;
                });
            });
        });
    }
    getMateriales() {
        if (this.listaEquipos && this.listaEquipos.length > 0) {
            return this.listaEquipos;
        }
        const path = `${URL}/listas/materiales/`;
        new Promise(resolve => {
            this.http.get(path)
                .subscribe(resp => {
                this.listaMateriales = resp[0];
                this.dlService.setMateriales(this.listaMateriales);
                return this.listaMateriales;
            }, err => {
                //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
                this.dlService.getMateriales().then(x => {
                    this.listaMateriales = x;
                    return this.listaMateriales;
                });
            });
        });
    }
    //WorKerApp
    getTareas() {
        if (this.listaTareas && this.listaTareas.length > 0) {
            return this.listaTareas;
        }
        const path = `${URL}/listas/tareas/`;
        new Promise(resolve => {
            this.http.get(path)
                .subscribe(resp => {
                this.listaTareas = resp[0];
                this.dlService.setTareas(this.listaTareas);
                return this.listaTareas;
            }, err => {
                //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tareas')
                this.dlService.getTareas().then(x => {
                    this.listaTareas = x;
                    return this.listaTareas;
                });
            });
        });
    }
    getTipoTrabajo() {
        //  return this.http.get(`${ URL }/listas/tTrabajo`);
        const path = `${URL}/listas/tTrabajo`;
        return new Promise(resolve => {
            this.http.get(path)
                .subscribe(resp => {
                this.listaTipoTrabajo = resp[0];
                this.dlService.setTiposTrabajos(this.listaTipoTrabajo);
                resolve(this.listaTipoTrabajo);
            }, (err) => {
                //console.log(err);
                //this.uiService.alertInformacion('Error de conexión: \\n' +'No se pudo cargar tipos de trabajo')
                this.dlService.getTiposTrabajos().then(x => {
                    this.listaTipoTrabajo = x;
                    //    console.log(this.listaTipoTrabajo)
                    return this.listaTipoTrabajo;
                });
            });
        });
    }
    // para quitar luego.
    getPostsTest() {
        return this.http.get(`${URL}/todos/`);
    }
    getTarea(id) {
        id = Number(id);
        //  console.log(id);
        return this.listaTareas.find(listaData => listaData.tareaId === id);
    }
    saveStorage(tareas) {
        // localStorage.setItem('tareas',tareas);
    }
    loadStorege() {
        this.listaTareas = [];
        if (localStorage.getItem('data')) {
            this.listaTareas = JSON.parse(localStorage.getItem('data'));
        }
    }
};
TrabajosService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] },
    { type: _data_local_service__WEBPACK_IMPORTED_MODULE_5__["DataLocalService"] }
];
TrabajosService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], TrabajosService);



/***/ })

}]);
//# sourceMappingURL=default~orden-form-orden-form-module~pages-agregar-equipo-agregar-equipo-module-es2015.js.map