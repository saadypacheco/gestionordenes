(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-agregar-material-form-agregar-material-form-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header no-border>\n  <ion-toolbar>\n      <ion-title text-capitalize> REGISTRAR MATERIAL</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-list>\n  <ion-item>\n      <ion-label class=\"ion-text-wrap\">\n          <ion-text>\n              <b>Orden: {{orden.ordenId}} </b>\n              <p><b>Direccion:{{orden.calle}} {{orden.numero}}</b></p>\n              <p>Cliente: {{orden.cliente}}</p>\n          </ion-text>\n      </ion-label>\n  </ion-item>\n\n</ion-list>\n\n<ion-content class=\"ion-padding-top\">\n  <form (ngSubmit)=\"saveNewMaterial(fMaterial)\" #fMaterial=\"ngForm\">\n      <ion-list>\n          <ion-item class=\"padding\">\n              <ion-label position=\"floating\"> Material </ion-label>\n              <ionic-selectable name=\"material\" item-content slot [(ngModel)]=\"materialSelected\" \n              [items]=\"materiales\" itemValueField=\"materialId\" \n              itemTextField=\"descripcion\" \n              [canSearch]=\"true\" \n              searchFailText=\"Lo sentimos no hay resultado \" \n              (onSearch)=\"buscarMaterial($event)\">\n                  <ng-template ionicSelectableItemTemplate let-materialSelected=\"item\">\n                      <ion-text class=\"ion-text-lowercase\">\n                          {{materialSelected.codigoSap}} - {{materialSelected.descripcion}}\n                      </ion-text>\n                  </ng-template>\n              </ionic-selectable>\n          </ion-item>\n\n          <ion-item class=\"padding\">\n              <ion-label position=\"floating\"> Cantidad </ion-label>\n              <ion-input name=\"cantidad\" type=\"tel\" [(ngModel)]=\"cantidad\" required> </ion-input>\n          </ion-item>\n\n      </ion-list>\n\n\n      <ion-row class=\"ion-padding-vertical\">\n          <ion-col size=\"6\" class=\"ion-text-right\">\n              <ion-button (click)=\"cancelAddMaterial()\" color=\"danger\" shape=\"round\">\n                  Cancelar\n              </ion-button>\n          </ion-col>\n          <ion-col size=\"6\" class=\"ion-text-left\">\n              <ion-button type=\"submit\" shape=\"round\">\n                  Guardar\n              </ion-button>\n          </ion-col>\n      </ion-row>\n  </form>\n</ion-content>");

/***/ }),

/***/ "./src/app/pages/agregar-material-form/agregar-material-form.page.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/agregar-material-form/agregar-material-form.page.scss ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItbWF0ZXJpYWwtZm9ybS9hZ3JlZ2FyLW1hdGVyaWFsLWZvcm0ucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/agregar-material-form/agregar-material-form.page.ts":
/*!***************************************************************************!*\
  !*** ./src/app/pages/agregar-material-form/agregar-material-form.page.ts ***!
  \***************************************************************************/
/*! exports provided: AgregarMaterialFormPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarMaterialFormPage", function() { return AgregarMaterialFormPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/trabajos.service */ "./src/app/services/trabajos.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");





let AgregarMaterialFormPage = class AgregarMaterialFormPage {
    constructor(materialCtrl, materialesService, uiService, tServie) {
        this.materialCtrl = materialCtrl;
        this.materialesService = materialesService;
        this.uiService = uiService;
        this.tServie = tServie;
        this.searchString = '';
        this.materiales = [];
    }
    ngOnInit() {
        this.materiales = this.tServie.listaMateriales;
    }
    buscarMaterial(event) {
        let text = event.text.trim().toLowerCase();
        event.component.startSearch();
        // Close any running subscription.
        if (!text) {
            event.component.items = this.materiales;
            event.component.endSearch();
            return;
        }
        event.component.items = this.materialesService.listaMateriales.filter(x => {
            if (x.descripcion.toLowerCase().search(text) >= 0 || (x.codigoSap && x.codigoSap.toString().search(text) >= 0)) {
                return x;
            }
        });
        event.component.endSearch();
    }
    cancelAddMaterial() {
        this.materialCtrl.dismiss();
    }
    saveNewMaterial(fmaterial) {
        if (this.materialSelected === undefined || this.materialSelected === null) {
            return;
        }
        if (this.orden.materiales && this.orden.materiales.filter(x => { return x.materialId == this.materialSelected.materialId; }).length > 0) {
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
};
AgregarMaterialFormPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] },
    { type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], AgregarMaterialFormPage.prototype, "orden", void 0);
AgregarMaterialFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-agregar-material-form',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./agregar-material-form.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-material-form/agregar-material-form.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./agregar-material-form.page.scss */ "./src/app/pages/agregar-material-form/agregar-material-form.page.scss")).default]
    })
], AgregarMaterialFormPage);



/***/ }),

/***/ "./src/app/services/data-local.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/data-local.service.ts ***!
  \************************************************/
/*! exports provided: DataLocalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataLocalService", function() { return DataLocalService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");



let DataLocalService = class DataLocalService {
    constructor(storage) {
        this.storage = storage;
        this.usuarioLogeado = null;
        this.ordenes = [];
        this.tareas = [];
        this.equipos = [];
        this.materiales = [];
    }
    saveOrdenes(orden) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // let self = this
            if (this.ordenes == null) {
                this.ordenes = [];
            }
            //si esta la orden primero la borro para luego agregarla modificada
            var removeIndex = this.ordenes.map(function (item) { return item.ordenId; }).indexOf(orden.ordenId);
            console.log('borro par insertar:', removeIndex);
            if (removeIndex !== undefined && removeIndex >= 0) {
                console.log('borro par insertar:', removeIndex);
                this.ordenes.splice(removeIndex, 1);
            }
            this.ordenes.unshift(orden);
            this.storage.set('ordenes', this.ordenes);
            //   this.loadOrdenes();
        });
    }
    getUsuario() {
        return this.storage.get('usuario');
    }
    loadOrdenes() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let self = this;
            const ordenes = yield self.storage.get('ordenes');
            self.ordenes = ordenes;
        });
    }
    clearOrdenes() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.ordenes = [];
            this.storage.set('ordenes', this.ordenes);
        });
    }
    getMateriales() {
        return this.storage.get('materiales');
    }
    getEquipos() {
        return this.storage.get('equipos');
    }
    getTareas() {
        return this.storage.get('tareas');
    }
    getTiposTrabajos() {
        return this.storage.get('tiposTrabajo');
    }
    setMateriales(equipos) {
        this.storage.set('materiales', equipos);
    }
    setEquipos(equipos) {
        this.storage.set('equipos', equipos);
    }
    setTareas(tareas) {
        this.storage.set('tareas', tareas);
    }
    setTiposTrabajos(tiposTrabajo) {
        this.storage.set('tiposTrabajo', tiposTrabajo);
    }
};
DataLocalService.ctorParameters = () => [
    { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] }
];
DataLocalService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DataLocalService);



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
//# sourceMappingURL=pages-agregar-material-form-agregar-material-form-module-es2015.js.map