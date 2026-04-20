(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm/button-active-a6787d69.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/button-active-a6787d69.js ***!
  \*********************************************************************/
/*! exports provided: c */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createButtonActiveGesture; });
/* harmony import */ var _index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-e806d1f6.js */ "./node_modules/@ionic/core/dist/esm/index-e806d1f6.js");
/* harmony import */ var _index_f49d994d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-f49d994d.js */ "./node_modules/@ionic/core/dist/esm/index-f49d994d.js");
/* harmony import */ var _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haptic-27b3f981.js */ "./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js");




const createButtonActiveGesture = (el, isButton) => {
  let currentTouchedButton;
  let initialTouchedButton;
  const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
    if (typeof document === 'undefined') {
      return;
    }
    const target = document.elementFromPoint(x, y);
    if (!target || !isButton(target)) {
      clearActiveButton();
      return;
    }
    if (target !== currentTouchedButton) {
      clearActiveButton();
      setActiveButton(target, hapticFeedbackFn);
    }
  };
  const setActiveButton = (button, hapticFeedbackFn) => {
    currentTouchedButton = button;
    if (!initialTouchedButton) {
      initialTouchedButton = currentTouchedButton;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.add('ion-activated'));
    hapticFeedbackFn();
  };
  const clearActiveButton = (dispatchClick = false) => {
    if (!currentTouchedButton) {
      return;
    }
    const buttonToModify = currentTouchedButton;
    Object(_index_e806d1f6_js__WEBPACK_IMPORTED_MODULE_0__["c"])(() => buttonToModify.classList.remove('ion-activated'));
    /**
     * Clicking on one button, but releasing on another button
     * does not dispatch a click event in browsers, so we
     * need to do it manually here. Some browsers will
     * dispatch a click if clicking on one button, dragging over
     * another button, and releasing on the original button. In that
     * case, we need to make sure we do not cause a double click there.
     */
    if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
      currentTouchedButton.click();
    }
    currentTouchedButton = undefined;
  };
  return Object(_index_f49d994d_js__WEBPACK_IMPORTED_MODULE_1__["createGesture"])({
    el,
    gestureName: 'buttonActiveDrag',
    threshold: 0,
    onStart: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["a"]),
    onMove: ev => activateButtonAtPoint(ev.currentX, ev.currentY, _haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["b"]),
    onEnd: () => {
      clearActiveButton(true);
      Object(_haptic_27b3f981_js__WEBPACK_IMPORTED_MODULE_2__["h"])();
      initialTouchedButton = undefined;
    }
  });
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/framework-delegate-4584ab5a.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/framework-delegate-4584ab5a.js ***!
  \**************************************************************************/
/*! exports provided: a, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return detachComponent; });
const attachComponent = async (delegate, container, component, cssClasses, componentProps) => {
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses);
  }
  if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
    throw new Error('framework delegate is missing');
  }
  const el = (typeof component === 'string')
    ? container.ownerDocument && container.ownerDocument.createElement(component)
    : component;
  if (cssClasses) {
    cssClasses.forEach(c => el.classList.add(c));
  }
  if (componentProps) {
    Object.assign(el, componentProps);
  }
  container.appendChild(el);
  if (el.componentOnReady) {
    await el.componentOnReady();
  }
  return el;
};
const detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }
    element.remove();
  }
  return Promise.resolve();
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/haptic-27b3f981.js ***!
  \**************************************************************/
/*! exports provided: a, b, c, d, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticImpact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hapticSelectionEnd; });
const HapticEngine = {
  getEngine() {
    const win = window;
    return (win.TapticEngine) || (win.Capacitor && win.Capacitor.isPluginAvailable('Haptics') && win.Capacitor.Plugins.Haptics);
  },
  available() {
    return !!this.getEngine();
  },
  isCordova() {
    return !!window.TapticEngine;
  },
  isCapacitor() {
    const win = window;
    return !!win.Capacitor;
  },
  impact(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.impact({ style });
  },
  notification(options) {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    const style = this.isCapacitor() ? options.style.toUpperCase() : options.style;
    engine.notification({ style });
  },
  selection() {
    this.impact({ style: 'light' });
  },
  selectionStart() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionStart();
    }
    else {
      engine.gestureSelectionStart();
    }
  },
  selectionChanged() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionChanged();
    }
    else {
      engine.gestureSelectionChanged();
    }
  },
  selectionEnd() {
    const engine = this.getEngine();
    if (!engine) {
      return;
    }
    if (this.isCapacitor()) {
      engine.selectionEnd();
    }
    else {
      engine.gestureSelectionEnd();
    }
  }
};
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
const hapticSelection = () => {
  HapticEngine.selection();
};
/**
 * Tell the haptic engine that a gesture for a selection change is starting.
 */
const hapticSelectionStart = () => {
  HapticEngine.selectionStart();
};
/**
 * Tell the haptic engine that a selection changed during a gesture.
 */
const hapticSelectionChanged = () => {
  HapticEngine.selectionChanged();
};
/**
 * Tell the haptic engine we are done with a gesture. This needs to be
 * called lest resources are not properly recycled.
 */
const hapticSelectionEnd = () => {
  HapticEngine.selectionEnd();
};
/**
 * Use this to indicate success/failure/warning to the user.
 * options should be of the type `{ style: 'light' }` (or `medium`/`heavy`)
 */
const hapticImpact = (options) => {
  HapticEngine.impact(options);
};




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/spinner-configs-cd7845af.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/spinner-configs-cd7845af.js ***!
  \***********************************************************************/
/*! exports provided: S */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return SPINNERS; });
const spinners = {
  'bubbles': {
    dur: 1000,
    circles: 9,
    fn: (dur, index, total) => {
      const animationDelay = `${(dur * index / total) - dur}ms`;
      const angle = 2 * Math.PI * index / total;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circles': {
    dur: 1000,
    circles: 8,
    fn: (dur, index, total) => {
      const step = index / total;
      const animationDelay = `${(dur * step) - dur}ms`;
      const angle = 2 * Math.PI * step;
      return {
        r: 5,
        style: {
          'top': `${9 * Math.sin(angle)}px`,
          'left': `${9 * Math.cos(angle)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'circular': {
    dur: 1400,
    elmDuration: true,
    circles: 1,
    fn: () => {
      return {
        r: 20,
        cx: 48,
        cy: 48,
        fill: 'none',
        viewBox: '24 24 48 48',
        transform: 'translate(0,0)',
        style: {}
      };
    }
  },
  'crescent': {
    dur: 750,
    circles: 1,
    fn: () => {
      return {
        r: 26,
        style: {}
      };
    }
  },
  'dots': {
    dur: 750,
    circles: 3,
    fn: (_, index) => {
      const animationDelay = -(110 * index) + 'ms';
      return {
        r: 6,
        style: {
          'left': `${9 - (9 * index)}px`,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 17,
        y2: 29,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  },
  'lines-small': {
    dur: 1000,
    lines: 12,
    fn: (dur, index, total) => {
      const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
      const animationDelay = `${(dur * index / total) - dur}ms`;
      return {
        y1: 12,
        y2: 20,
        style: {
          'transform': transform,
          'animation-delay': animationDelay,
        }
      };
    }
  }
};
const SPINNERS = spinners;




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/theme-ff3fc52f.js ***!
  \*************************************************************/
/*! exports provided: c, g, h, o */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return openURL; });
const hostContext = (selector, el) => {
  return el.closest(selector) !== null;
};
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
const createColorClasses = (color, cssClassMap) => {
  return (typeof color === 'string' && color.length > 0) ? Object.assign({ 'ion-color': true, [`ion-color-${color}`]: true }, cssClassMap) : cssClassMap;
};
const getClassList = (classes) => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter(c => c != null)
      .map(c => c.trim())
      .filter(c => c !== '');
  }
  return [];
};
const getClassMap = (classes) => {
  const map = {};
  getClassList(classes).forEach(c => map[c] = true);
  return map;
};
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
const openURL = async (url, ev, direction, animation) => {
  if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
    const router = document.querySelector('ion-router');
    if (router) {
      if (ev != null) {
        ev.preventDefault();
      }
      return router.push(url, direction, animation);
    }
  }
  return false;
};




/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/comentarios-form/comentarios-form.page.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/comentarios-form/comentarios-form.page.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n\n    <ion-list padding-top>\n        <ion-item [disabled]=\"orden.estadoId== 20\">\n\n            <ion-textarea type=\"text\" [(ngModel)]=\"orden.comentarios\" rows=\"10\" cols=\"50\" placeholder=\"Ingrese aqui sus comentarios...\"></ion-textarea>\n            <ion-textarea type=\"text\"></ion-textarea>\n        </ion-item>\n\n        <ion-row>\n            <ion-col size=\"12\" class=\"ion-text-center\">\n                <ion-button (click)=\"saveNewOrden()\" *ngIf=\"orden.estadoId== 15\">\n                    Guardar\n                </ion-button>\n            </ion-col>\n        </ion-row>\n    </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/datos-form/datos-form.page.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/datos-form/datos-form.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <!-- ({{orden.movilId}}) {{usuService.usuario.descripcion}} - {{usuService.usuario.Apellido}}  {{usuService.usuario.Nombre}} -->\n    <ion-list>\n\n        <ion-item [disabled]=\"orden.estadoId !=15\">\n            <ion-label>Tipo Trabajo</ion-label>\n            <ion-select [(ngModel)]=\"orden.tipoTrabajoId\" interface=\"popover\" placeholder=\"seleccionar ...\" required>\n                <ion-select-option *ngFor=\"let tipo of dataService.listaTipoTrabajo\" [(value)]=\"tipo.tipoTrabajoId\">{{tipo.descripcion}}</ion-select-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- <ion-item-divider color=\"medium\">\n            <ion-label>\n                <p> DATOS DEL CLIENTE </p>\n            </ion-label>\n        </ion-item-divider> -->\n        <ion-item [disabled]=\"orden.estadoId !=15\">\n            <ion-label position=\"floating\"> Cliente </ion-label>\n            <ion-input type=\"text\" [(ngModel)]=\"orden.cliente\" required> </ion-input>\n        </ion-item>\n        <ion-row>\n            <ion-col size=\"7\">\n                <ion-item [disabled]=\"orden.estadoId !=15\">\n                    <ion-label position=\"floating\"> Calle </ion-label>\n                    <ion-input type=\"text\" [(ngModel)]=\"orden.calle\" required> </ion-input>\n                </ion-item>\n            </ion-col>\n            <ion-col>\n                <ion-item [disabled]=\"orden.estadoId !=15\">\n                    <ion-label position=\"floating\"> Nro. </ion-label>\n                    <ion-input type=\"tel\" [(ngModel)]=\"orden.numero\" required> </ion-input>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n\n    </ion-list>\n\n    <ion-row>\n        <ion-col size=\"12\" class=\"ion-text-center\">\n            <ion-button (click)=\"saveNewOrden()\" *ngIf=\"orden.estadoId ==15\">\n                Guardar\n            </ion-button>\n        </ion-col>\n    </ion-row>\n\n\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/fotos/fotos.page.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/fotos/fotos.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n    <ion-grid fixed>\n        <ion-row>\n            <div class=\"spin\" *ngIf=\"cargando == true\">\n                <ion-spinner name=\"bubbles\"></ion-spinner>\n            </div>\n            <ion-col size=\"12\" size-lg=\"3\" size md=\"4\" size-md=\"6\" size-xs=\"12\" *ngFor=\"let image of fotos\">\n                <ion-card>\n                    <img [src]=\"image\">\n                </ion-card>\n            </ion-col>\n        </ion-row>\n        <ion-row class=\"ion-padding-vertical\">\n            <ion-col class=\"ion-text-center\" *ngIf=\"fotos.length > 0 && guardar\">\n                <ion-button (click)=\"saveFotos()\" shape=\"round\">\n                    Guardar\n                </ion-button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n<ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)=\"gallery()\">\n        <ion-icon name=\"camera\"></ion-icon>\n    </ion-fab-button>\n</ion-fab>\n");

/***/ }),

/***/ "./src/app/pages/agregar-material-form/agregar-material-form-routing.module.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/pages/agregar-material-form/agregar-material-form-routing.module.ts ***!
  \*************************************************************************************/
/*! exports provided: AgregarMaterialFormPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarMaterialFormPageRoutingModule", function() { return AgregarMaterialFormPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _agregar_material_form_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agregar-material-form.page */ "./src/app/pages/agregar-material-form/agregar-material-form.page.ts");




const routes = [
    {
        path: '',
        component: _agregar_material_form_page__WEBPACK_IMPORTED_MODULE_3__["AgregarMaterialFormPage"]
    }
];
let AgregarMaterialFormPageRoutingModule = class AgregarMaterialFormPageRoutingModule {
};
AgregarMaterialFormPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarMaterialFormPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/agregar-material-form/agregar-material-form.module.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/agregar-material-form/agregar-material-form.module.ts ***!
  \*****************************************************************************/
/*! exports provided: AgregarMaterialFormPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarMaterialFormPageModule", function() { return AgregarMaterialFormPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _agregar_material_form_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-material-form-routing.module */ "./src/app/pages/agregar-material-form/agregar-material-form-routing.module.ts");
/* harmony import */ var _agregar_material_form_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agregar-material-form.page */ "./src/app/pages/agregar-material-form/agregar-material-form.page.ts");
/* harmony import */ var ionic_selectable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ionic-selectable */ "./node_modules/ionic-selectable/__ivy_ngcc__/esm2015/ionic-selectable.min.js");
/* harmony import */ var src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");









let AgregarMaterialFormPageModule = class AgregarMaterialFormPageModule {
};
AgregarMaterialFormPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_material_form_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarMaterialFormPageRoutingModule"],
            src_app_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"],
            ionic_selectable__WEBPACK_IMPORTED_MODULE_7__["IonicSelectableModule"]
        ],
        declarations: [_agregar_material_form_page__WEBPACK_IMPORTED_MODULE_6__["AgregarMaterialFormPage"]]
    })
], AgregarMaterialFormPageModule);



/***/ }),

/***/ "./src/app/pages/comentarios-form/comentarios-form.page.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/comentarios-form/comentarios-form.page.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvbWVudGFyaW9zLWZvcm0vY29tZW50YXJpb3MtZm9ybS5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/comentarios-form/comentarios-form.page.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/comentarios-form/comentarios-form.page.ts ***!
  \*****************************************************************/
/*! exports provided: ComentariosFormPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComentariosFormPage", function() { return ComentariosFormPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/interfaces/interfaces */ "./src/app/interfaces/interfaces.ts");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");





let ComentariosFormPage = class ComentariosFormPage {
    constructor(ordenService, uiService) {
        this.ordenService = ordenService;
        this.uiService = uiService;
    }
    ngOnInit() {
        //  console.log(this.orden)
    }
    saveNewOrden() {
        this.ordenService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_2__["ModoGrabadoOrden"].TODO).then((res) => {
            this.uiService.alertInformacion("datos modificados");
        });
        ;
    }
};
ComentariosFormPage.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], ComentariosFormPage.prototype, "orden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")
], ComentariosFormPage.prototype, "parentColor", void 0);
ComentariosFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-comentarios-form',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./comentarios-form.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/comentarios-form/comentarios-form.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./comentarios-form.page.scss */ "./src/app/pages/comentarios-form/comentarios-form.page.scss")).default]
    })
], ComentariosFormPage);



/***/ }),

/***/ "./src/app/pages/datos-form/datos-form.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/pages/datos-form/datos-form.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-select {\n  /* Applies to the value and placeholder color */\n  color: #545ca7;\n  /* Set a different placeholder color */\n  --placeholder-color: #971e49;\n  /* Set full opacity on the placeholder */\n  --placeholder-opacity: 1;\n  size: 9px;\n  width: 100%;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2RhdG9zLWZvcm0vZGF0b3MtZm9ybS5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2RhdG9zLWZvcm0vZGF0b3MtZm9ybS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0JBO0VBQ0ksK0NBQUE7RUFDQSxjQUFBO0VBQ0Esc0NBQUE7RUFDQSw0QkFBQTtFQUNBLHdDQUFBO0VBQ0Esd0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0FDZkoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kYXRvcy1mb3JtL2RhdG9zLWZvcm0ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gOmhvc3Qge1xyXG4vLyAgICAgaW9uLWNvbnRlbnQge1xyXG4vLyAgICAgICAgIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLWRhcmspLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkpO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGlvbi1zZWxlY3Qge1xyXG4vLyAgICAgLyogQXBwbGllcyB0byB0aGUgdmFsdWUgYW5kIHBsYWNlaG9sZGVyIGNvbG9yICovXHJcbi8vICAgICBjb2xvcjogIzI2MmM2NDtcclxuLy8gICAgIC8qIFNldCBhIGRpZmZlcmVudCBwbGFjZWhvbGRlciBjb2xvciAqL1xyXG4vLyAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzdmMWU5NztcclxuLy8gICAgIC8qIFNldCBmdWxsIG9wYWNpdHkgb24gdGhlIHBsYWNlaG9sZGVyICovXHJcbi8vICAgICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDE7XHJcbi8vICAgICBzaXplOiA5cHg7XHJcbi8vICAgICB3aWR0aDogMTAwJTtcclxuLy8gICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4vLyB9XHJcbmlvbi1zZWxlY3Qge1xyXG4gICAgLyogQXBwbGllcyB0byB0aGUgdmFsdWUgYW5kIHBsYWNlaG9sZGVyIGNvbG9yICovXHJcbiAgICBjb2xvcjogIzU0NWNhNztcclxuICAgIC8qIFNldCBhIGRpZmZlcmVudCBwbGFjZWhvbGRlciBjb2xvciAqL1xyXG4gICAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzk3MWU0OTtcclxuICAgIC8qIFNldCBmdWxsIG9wYWNpdHkgb24gdGhlIHBsYWNlaG9sZGVyICovXHJcbiAgICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDE7XHJcbiAgICBzaXplOiA5cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbiIsImlvbi1zZWxlY3Qge1xuICAvKiBBcHBsaWVzIHRvIHRoZSB2YWx1ZSBhbmQgcGxhY2Vob2xkZXIgY29sb3IgKi9cbiAgY29sb3I6ICM1NDVjYTc7XG4gIC8qIFNldCBhIGRpZmZlcmVudCBwbGFjZWhvbGRlciBjb2xvciAqL1xuICAtLXBsYWNlaG9sZGVyLWNvbG9yOiAjOTcxZTQ5O1xuICAvKiBTZXQgZnVsbCBvcGFjaXR5IG9uIHRoZSBwbGFjZWhvbGRlciAqL1xuICAtLXBsYWNlaG9sZGVyLW9wYWNpdHk6IDE7XG4gIHNpemU6IDlweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/pages/datos-form/datos-form.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/datos-form/datos-form.page.ts ***!
  \*****************************************************/
/*! exports provided: DatosFormPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatosFormPage", function() { return DatosFormPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/interfaces/interfaces */ "./src/app/interfaces/interfaces.ts");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_trabajos_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/trabajos.service */ "./src/app/services/trabajos.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");






let DatosFormPage = class DatosFormPage {
    constructor(ordenService, dataService, uiService) {
        this.ordenService = ordenService;
        this.dataService = dataService;
        this.uiService = uiService;
    }
    ngOnInit() { }
    saveNewOrden() {
        this.ordenService.grabarSincronizar(this.orden, src_app_interfaces_interfaces__WEBPACK_IMPORTED_MODULE_2__["ModoGrabadoOrden"].TODO).then((res) => {
            this.uiService.alertInformacion("datos modificados");
        });
        ;
    }
};
DatosFormPage.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"] },
    { type: src_app_services_trabajos_service__WEBPACK_IMPORTED_MODULE_4__["TrabajosService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_5__["UIserviceService"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], DatosFormPage.prototype, "orden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")
], DatosFormPage.prototype, "parentColor", void 0);
DatosFormPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-datos-form',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./datos-form.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/datos-form/datos-form.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./datos-form.page.scss */ "./src/app/pages/datos-form/datos-form.page.scss")).default]
    })
], DatosFormPage);



/***/ }),

/***/ "./src/app/pages/fotos/fotos.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/fotos/fotos.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZvdG9zL2ZvdG9zLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/fotos/fotos.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/fotos/fotos.page.ts ***!
  \*******************************************/
/*! exports provided: FotosPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FotosPage", function() { return FotosPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/functions/funciones */ "./src/app/functions/funciones.ts");










let FotosPage = class FotosPage {
    constructor(ordeneService, route, navPage, uiService, camera, ordenesService, sanitizer) {
        this.ordeneService = ordeneService;
        this.route = route;
        this.navPage = navPage;
        this.uiService = uiService;
        this.camera = camera;
        this.ordenesService = ordenesService;
        this.sanitizer = sanitizer;
        this.fotos = [];
    }
    ngOnInit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.guardar = false;
            this.cargando = true;
            if (!this.orden.imagenes) {
                this.ordeneService.getImagenes(this.orden.ordenId.toString()).subscribe(imagenes => {
                    // console.log(imagenes)
                    this.orden.imagenes = imagenes[0];
                    this.orden.imagenes.forEach(x => {
                        const img = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_9__["str2ab"])(x.imagen);
                        const blob = new Blob([img], { type: x.mimeType });
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = () => {
                            const urlSanetizada = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
                            this.fotos.push(urlSanetizada);
                        };
                    });
                    this.cargando = false;
                });
            }
            else {
                this.orden.imagenes.forEach(x => {
                    const img = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_9__["str2ab"])(x.imagen);
                    const blob = new Blob([img], { type: x.mimeType });
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        this.fotos.push(this.sanitizer.bypassSecurityTrustUrl(reader.result.toString()));
                    };
                    this.cargando = false;
                });
            }
        });
    }
    gallery() {
        const options = {
            quality: 40,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA
        };
        this.camera.getPicture(options).then((imageData) => {
            if (this.fotos.length <= 4) {
                this.id = Object(uuid__WEBPACK_IMPORTED_MODULE_8__["v4"])();
                const img = window.Ionic.WebView.convertFileSrc(imageData);
                this.ordenesService.subirImagen(imageData, this.orden.ordenId.toString(), this.id);
                this.fotos.push(this.sanitizer.bypassSecurityTrustUrl(img));
            }
            else {
                this.guardar = false;
            }
        }, (err) => {
            console.log(err);
        });
    }
    saveFotos() {
    }
};
FotosPage.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_4__["UIserviceService"] },
    { type: _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_6__["Camera"] },
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_3__["OrdenesService"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("orden")
], FotosPage.prototype, "orden", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])("color")
], FotosPage.prototype, "parentColor", void 0);
FotosPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-fotos',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./fotos.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/fotos/fotos.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./fotos.page.scss */ "./src/app/pages/fotos/fotos.page.scss")).default]
    })
], FotosPage);



/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map