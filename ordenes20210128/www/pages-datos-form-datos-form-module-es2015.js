(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-datos-form-datos-form-module"],{

/***/ "./src/app/interfaces/interfaces.ts":
/*!******************************************!*\
  !*** ./src/app/interfaces/interfaces.ts ***!
  \******************************************/
/*! exports provided: ModoGrabadoOrden */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModoGrabadoOrden", function() { return ModoGrabadoOrden; });
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


/***/ }),

/***/ "./src/app/pages/datos-form/datos-form-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/datos-form/datos-form-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: DatosFormPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatosFormPageRoutingModule", function() { return DatosFormPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _datos_form_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datos-form.page */ "./src/app/pages/datos-form/datos-form.page.ts");




const routes = [
    {
        path: '',
        component: _datos_form_page__WEBPACK_IMPORTED_MODULE_3__["DatosFormPage"]
    }
];
let DatosFormPageRoutingModule = class DatosFormPageRoutingModule {
};
DatosFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], DatosFormPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/datos-form/datos-form.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/datos-form/datos-form.module.ts ***!
  \*******************************************************/
/*! exports provided: DatosFormPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatosFormPageModule", function() { return DatosFormPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _datos_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datos-form-routing.module */ "./src/app/pages/datos-form/datos-form-routing.module.ts");






//import { DatosFormPage } from './datos-form.page';
let DatosFormPageModule = class DatosFormPageModule {
};
DatosFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _datos_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["DatosFormPageRoutingModule"]
        ],
        declarations: []
    })
], DatosFormPageModule);



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
//# sourceMappingURL=pages-datos-form-datos-form-module-es2015.js.map