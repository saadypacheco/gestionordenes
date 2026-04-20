(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-agregar-equipo-agregar-equipo-module~pages-agregar-equipo-form-agregar-equipo-form-mod~c462d101"],{

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

/***/ "./src/app/services/ordenes.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/ordenes.service.ts ***!
  \*********************************************/
/*! exports provided: OrdenesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdenesService", function() { return OrdenesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment.prod */ "./src/environments/environment.prod.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _data_local_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data-local.service */ "./src/app/services/data-local.service.ts");
/* harmony import */ var _uiservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/file-transfer/ngx */ "./node_modules/@ionic-native/file-transfer/__ivy_ngcc__/ngx/index.js");








const URL = _environments_environment_prod__WEBPACK_IMPORTED_MODULE_3__["environment"].url;
let OrdenesService = class OrdenesService {
    constructor(http, platform, localdata, uiService, fileTransfer) {
        this.http = http;
        this.platform = platform;
        this.localdata = localdata;
        this.uiService = uiService;
        this.fileTransfer = fileTransfer;
        this.hayConexion = false;
        this.ordenes = [];
    }
    getOrden(ordenId) {
        const x = this.localdata.ordenes;
        return x.filter(o => { return o.ordenId == ordenId; })[0];
    }
    getOrdenes(fechaDesde, fechaHasta, instaladorId) {
        let self = this;
        //this.uiService.alertInformacion(`${ URL }/ordenes/listarInst/"${ fechaDesde }"/"${ fechaHasta }"/${ instaladorId }`);
        const path = `${URL}/ordenes/listarInst/"${fechaDesde}"/"${fechaHasta}"/${instaladorId}`;
        self.sincronizar().subscribe(x => {
            self.http.get(path).subscribe((resp) => {
                self.localdata.clearOrdenes();
                resp.forEach(ord => {
                    ord.sincronizado = true;
                    ord.fechaInstalacion = ord.fechaInstalacion.substring(0, 10);
                    ord.cliente = ord.cliente == 'undefined' ? '' : ord.cliente;
                    ord.materiales.forEach(mat => {
                        mat.cantidad = mat.Cantidad;
                        mat.materialId = mat.materialid;
                    });
                    ord.recuperos.forEach(mat => {
                        mat.nroSerie = mat.MAC;
                        mat.materialId = mat.materialid;
                    });
                    self.localdata.saveOrdenes(ord);
                });
                document.body.setAttribute('color-theme', 'dark');
                this.ordenes = resp;
            }, (err) => {
                console.log(err);
                self.localdata.loadOrdenes().then(x => {
                    this.ordenes = self.localdata.ordenes;
                    document.body.setAttribute('color-theme', 'light');
                    //     this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
                });
            });
        }, (err) => {
            this.hayConexion = false;
            self.localdata.loadOrdenes().then(x => {
                this.ordenes = self.localdata.ordenes;
                document.body.setAttribute('color-theme', 'light');
                //    this.uiService.alertInformacion('<b>Error de conexión:</b> </br>' +'No se pudo cargar ordenes del instalador');
            });
        });
    }
    hayQueSincronizar() {
        return this.localdata.ordenes.filter(x => { return x.sincronizado == false; }).length > 0;
    }
    setConexion(valor) {
        let self = this;
        self.hayConexion = valor;
    }
    sincronizar() {
        //console.log('voy a sincronizar')
        let ordenes = this.localdata.ordenes.filter(x => { return x.sincronizado == false; });
        ordenes = ordenes.map(x => { x.imagenes = []; return x; });
        return this.http.post(`${URL}/ordenes/sincronizar`, { "ordenes": ordenes });
    }
    grabarSincronizar(ordenActual, modo) {
        //console.log('voy a sincronizar')
        // filtra las ordenes de la local sotrage y se queda con las que estan
        // sin sincronizar
        let ordenes = this.localdata.ordenes.filter(x => { return x.sincronizado == false && x.ordenId != ordenActual.ordenId; });
        ordenes = ordenes.map(x => {
            x.imagenes = [];
            x.equipos = x.equipos.map(e => { e.imagen = ""; return e; });
            return x;
        });
        //hago una copia de la orden actual sin las imagenes para mandar a grabar
        var _ordenAct = ordenActual;
        if (_ordenAct.equipos)
            _ordenAct.equipos = _ordenAct.equipos.map(e => { e.imagen = ""; return e; });
        // console.log('voy a sincronizar',ordenes)
        // llama al WS para guardar ordenes sin sincroinizar
        // envia las ordenes sin sincronizar y la orden actual por separado
        // si no hay error al grabar :
        //    graba orden actual en LS
        //    pone todas las ordenes como sincronizado
        //si hay error solo agrega orden actual a LS
        return new Promise(resolve => {
            this.http.post(`${URL}/ordenes/grabarSincronizar`, { "ordenes": ordenes, "ordenActual": _ordenAct, "modo": modo })
                .subscribe(x => {
                ordenActual.sincronizado = true;
                this.localdata.saveOrdenes(ordenActual);
                this.localdata.ordenes.forEach(ord => {
                    ord.sincronizado = true;
                    ord.fechaInstalacion = ord.fechaInstalacion.substring(0, 10);
                    this.localdata.saveOrdenes(ord);
                });
                document.body.setAttribute('color-theme', 'dark');
                resolve({ "resultado": true });
            }, err => {
                ordenActual.sincronizado = false;
                if (err.error.status) {
                    resolve({ "resultado": true, "error": err.error.error });
                }
                else {
                    this.localdata.saveOrdenes(ordenActual);
                    document.body.setAttribute('color-theme', 'light');
                    resolve({ "resultado": true });
                }
            });
        });
    }
    mostrarError(error, entidad) {
        console.log(error);
        let msg = "<b>Error de Conexion: </b></br>" + "No se pudo grabar" + entidad;
        this.uiService.alertInformacion(msg);
    }
    subirImagen(img, ordenId, imagenId) {
        const options = {
            fileKey: 'image',
            params: { ordenId: ordenId, imagenId: imagenId }
        };
        const fileTransfer = this.fileTransfer.create();
        fileTransfer.upload(img, `${URL}/ordenes/guardarImagen`, options)
            .then(data => {
            console.log(data);
        }).catch(err => {
            console.log('error en carga', err);
        });
    }
    getImagenes(ordenId) {
        console.log("voy a buscar la orden");
        const path = `${URL}/ordenes/imagenesListar/${ordenId}`;
        return this.http.get(path);
    }
};
OrdenesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: _data_local_service__WEBPACK_IMPORTED_MODULE_5__["DataLocalService"] },
    { type: _uiservice_service__WEBPACK_IMPORTED_MODULE_6__["UIserviceService"] },
    { type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_7__["FileTransfer"] }
];
OrdenesService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], OrdenesService);



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
//# sourceMappingURL=default~pages-agregar-equipo-agregar-equipo-module~pages-agregar-equipo-form-agregar-equipo-form-mod~c462d101-es2015.js.map