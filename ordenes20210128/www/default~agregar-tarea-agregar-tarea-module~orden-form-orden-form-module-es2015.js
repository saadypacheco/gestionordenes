(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~agregar-tarea-agregar-tarea-module~orden-form-orden-form-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header no-border>\n    <ion-toolbar>\n        <ion-title text-capitalize> REGISTRAR TAREA</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-list>\n    <ion-item>\n        <ion-label class=\"ion-text-wrap\">\n            <ion-text>\n                <b>Orden: {{orden.ordenId}} </b>\n                <p><b>Direccion:{{orden.calle}} {{orden.numero}}</b></p>\n                <p>Cliente: {{orden.cliente}}</p>\n            </ion-text>\n        </ion-label>\n    </ion-item>\n\n</ion-list>\n\n<ion-content class=\"ion-padding-top\">\n    <form (ngSubmit)=\"saveNewTarea(fTarea)\" #fTarea=\"ngForm\">\n        <ion-list>\n            <ion-item class=\"padding\">\n                <ion-label position=\"floating\"> Tarea </ion-label>\n                <ionic-selectable name=\"tarea\" item-content slot [(ngModel)]=\"tareaSelected\" \n                [items]=\"tareas\" itemValueField=\"tareaId\" \n                itemTextField=\"descripcion\" \n                closeButtonText=\"Cerrar\"\n                closeButtonSlot=\"end\"\n                interface=\"popover\"    \n                [canSearch]=\"true\" \n                searchFailText=\"Lo sentimos no hay resultado \" \n                (onSearch)=\"buscarTarea($event)\">\n                    <ng-template ionicSelectableItemTemplate let-tareaSelected=\"item\">\n                        <ion-text class=\"ion-text-lowercase\">\n                            {{tareaSelected.tareaId}} - {{tareaSelected.descripcion}}\n                        </ion-text>\n                    </ng-template>\n                </ionic-selectable>\n            </ion-item>\n\n            <ion-item class=\"padding\">\n                <ion-label position=\"floating\"> Cantidad </ion-label>\n                <ion-input name=\"cantidad\" type=\"tel\" [(ngModel)]=\"cantidad\" required> </ion-input>\n            </ion-item>\n\n        </ion-list>\n\n\n        <ion-row class=\"ion-padding-vertical\">\n            <ion-col size=\"6\" class=\"ion-text-right\">\n                <ion-button (click)=\"cancelAddTarea()\" color=\"danger\" shape=\"round\">\n                    Cancelar\n                </ion-button>\n            </ion-col>\n            <ion-col size=\"6\" class=\"ion-text-left\">\n                <ion-button type=\"submit\" shape=\"round\">\n                    Guardar\n                </ion-button>\n            </ion-col>\n        </ion-row>\n    </form>\n</ion-content>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea/agregar-tarea.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea/agregar-tarea.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <ion-list>\n        <ion-item-sliding *ngFor=\"let tarea of orden.tareas; let i=index\" class=\"animated fadeInDown\">\n            <ion-item>\n                <div class=\"ion-text-uppercase\">\n                    <ion-label>\n                        <ion-text>\n                            <strong>{{tarea.tareaId}}</strong>-{{tarea.Descripcion}} ({{tarea.cantidad}})\n                        </ion-text>\n                    </ion-label>\n                </div>\n            </ion-item>\n            <ion-item-options side=\"end\" *ngIf=\"orden.estadoId== 15\">\n                <ion-item-option (click)=\"deleteTarea(i)\" color=\"danger\">\n                    <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>\n<ion-fab *ngIf=\"orden.estadoId== 15\" vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)=\"addTarea()\">\n        <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n</ion-fab>\n");

/***/ }),

/***/ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".top-20 {\n  margin-top: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2FncmVnYXItdGFyZWEtZm9ybS9hZ3JlZ2FyLXRhcmVhLWZvcm0ucGFnZS5zY3NzIiwic3JjL2FwcC9wYWdlcy9hZ3JlZ2FyLXRhcmVhLWZvcm0vYWdyZWdhci10YXJlYS1mb3JtLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQTtFQUNJLGdCQUFBO0FDYkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hZ3JlZ2FyLXRhcmVhLWZvcm0vYWdyZWdhci10YXJlYS1mb3JtLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGlvbmljLXNlbGVjdGFibGUtbWQge1xyXG4vLyAgICAgLyogQXBwbGllcyB0byB0aGUgdmFsdWUgYW5kIHBsYWNlaG9sZGVyIGNvbG9yICovXHJcbi8vICAgICBjb2xvcjogIzBiMGIwYyAhaW1wb3J0YW50O1xyXG4vLyAgICAgLyogU2V0IGEgZGlmZmVyZW50IHBsYWNlaG9sZGVyIGNvbG9yICovXHJcbi8vICAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiAjMTMyNzY5ICFpbXBvcnRhbnQ7XHJcbi8vICAgICAvKiBTZXQgZnVsbCBvcGFjaXR5IG9uIHRoZSBwbGFjZWhvbGRlciAqL1xyXG4vLyAgICAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAwLjE7XHJcbi8vIH1cclxuLy8gLnNlYXJjaGJhci1pbnB1dC5zYy1pb24tc2VhcmNoYmFyLW1kIHtcclxuLy8gICAgIGNvbG9yOiAjMTMyNzY5ICFpbXBvcnRhbnQ7XHJcbi8vIH1cclxuLy8gLS1pb24taXRlbS1iYWNrZ3JvdW5ke1xyXG4vLyAgICAgY29sb3I6IzBiMGIwYyAhaW1wb3J0YW50OyBcclxuLy8gfVxyXG4udG9wLTIwIHtcclxuICAgIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuIiwiLnRvcC0yMCB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.ts ***!
  \*********************************************************************/
/*! exports provided: AgregarTareaFormPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaFormPage", function() { return AgregarTareaFormPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/trabajos.service */ "./src/app/services/trabajos.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");





let AgregarTareaFormPage = class AgregarTareaFormPage {
    constructor(tareaCtrl, tareasService, uiService) {
        this.tareaCtrl = tareaCtrl;
        this.tareasService = tareasService;
        this.uiService = uiService;
        this.tareasTiposInicial = [];
        this.tareasTipos = [];
        this.searchString = '';
        this.tareas = [];
    }
    ngOnInit() {
        //this.tareasService.getTareas()
        this.tareas = []; //this.tareasService.listaTareas
    }
    buscarTarea(event) {
        let text = event.text.trim().toLowerCase();
        event.component.startSearch();
        // Close any running subscription.
        if (!text) {
            event.component.items = this.tareas;
            event.component.endSearch();
            return;
        }
        event.component.items = this.tareasService.listaTareas.filter(x => {
            if (x.tareaId.toString().search(text) >= 0 || x.descripcion.search(text) >= 0) {
                return x;
            }
        });
        event.component.endSearch();
    }
    cancelAddTarea() {
        this.tareaCtrl.dismiss();
    }
    saveNewTarea(fTarea) {
        if (this.tareaSelected === undefined || this.tareaSelected === null) {
            return;
        }
        if (this.orden.tareas && this.orden.tareas.filter(x => { return x.tareaId == this.tareaSelected.tareaId.toString(); }).length > 0) {
            this.uiService.alertInformacion("Tarea : </br>" + this.tareaSelected.descripcion + "</br>" + " ya fue ingresada");
            return;
        }
        if (this.cantidad === undefined || this.cantidad <= 0) {
            this.uiService.alertInformacion("Seleccione Cantidad");
            return;
        }
        this.tareaCtrl.dismiss({
            tareaId: this.tareaSelected.tareaId,
            cantidad: this.cantidad,
            descripcion: this.tareaSelected.descripcion
        });
    }
};
AgregarTareaFormPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], AgregarTareaFormPage.prototype, "orden", void 0);
AgregarTareaFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-agregar-tarea-form',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./agregar-tarea-form.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./agregar-tarea-form.page.scss */ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.scss")).default]
    })
], AgregarTareaFormPage);



/***/ }),

/***/ "./src/app/pages/agregar-tarea/agregar-tarea.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/agregar-tarea/agregar-tarea.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItdGFyZWEvYWdyZWdhci10YXJlYS5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/agregar-tarea/agregar-tarea.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/agregar-tarea/agregar-tarea.page.ts ***!
  \***********************************************************/
/*! exports provided: AgregarTareaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTareaPage", function() { return AgregarTareaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/interfaces/interfaces */ "./src/app/interfaces/interfaces.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _agregar_tarea_form_agregar_tarea_form_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../agregar-tarea-form/agregar-tarea-form.page */ "./src/app/pages/agregar-tarea-form/agregar-tarea-form.page.ts");






//import { AgregarTareaFormPage } from '../agregar-tarea-form/agregar-tarea-form.page';


let AgregarTareaPage = class AgregarTareaPage {
    constructor(ordenesService, route, modalTarea, uiService) {
        this.ordenesService = ordenesService;
        this.route = route;
        this.modalTarea = modalTarea;
        this.uiService = uiService;
        this.listaTarea = [];
        this.nombreItemTarea = '';
    }
    ngOnInit() {
    }
    addTarea() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const modal = yield this.modalTarea.create({
                component: _agregar_tarea_form_agregar_tarea_form_page__WEBPACK_IMPORTED_MODULE_7__["AgregarTareaFormPage"],
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
            this.tarea = {
                tareaId: data.tareaId,
                Descripcion: data.descripcion,
                cantidad: data.cantidad
            };
            if (this.orden.tareas === undefined) {
                this.orden.tareas = [];
            }
            if (this.orden.tareas.filter(x => { return x.tareaId == data.tareaId; }).length === 0) {
                this.orden.tareas.push(this.tarea);
                this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(x => {
                    //     this.uiService.alertInformacion("tarea agregada")  
                }).catch(x => {
                    this.uiService.alertInformacion("NO SE PUDO AGREGAR TAREA");
                });
            }
        });
    }
    deleteTarea(i) {
        if (this.orden.estadoId == 15) {
            this.orden.tareas.splice(i, 1);
            this.ordenesService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then(x => {
                this.uiService.alertInformacion("tarea eliminada");
            });
        }
        else {
            this.uiService.alertInformacion("No se permite eliminar tareas cuando la orden esta anula o cerrada");
        }
    }
};
AgregarTareaPage.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], AgregarTareaPage.prototype, "orden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")
], AgregarTareaPage.prototype, "parentColor", void 0);
AgregarTareaPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-agregar-tarea',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./agregar-tarea.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-tarea/agregar-tarea.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./agregar-tarea.page.scss */ "./src/app/pages/agregar-tarea/agregar-tarea.page.scss")).default]
    })
], AgregarTareaPage);



/***/ })

}]);
//# sourceMappingURL=default~agregar-tarea-agregar-tarea-module~orden-form-orden-form-module-es2015.js.map