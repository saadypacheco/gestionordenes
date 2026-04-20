(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab1-tab1-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-orden/agregar-orden.page.html":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-orden/agregar-orden.page.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar>\n        <!-- <ion-buttons slot=\"start\">\n            <ion-back-button defaultHref=\"/main/tabs/tab1\"></ion-back-button>\n        </ion-buttons> -->\n\n        <ion-buttons>\n            <ion-button slot=\"start\" (click)=\"cancelAddOrden()\">\n                <ion-icon name=\"arrow-back\"></ion-icon>\n            </ion-button>\n            <ion-title text-capitalize> REGISTRAR ORDEN</ion-title>\n            <ion-button>\n                <ion-datetime displayFormat=\"YYYY-MM-DD\" disabled [(ngModel)]=\"orden.fechaInstalacion\"></ion-datetime>\n            </ion-button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n    <!-- ({{orden.movilId}}) {{usuService.usuario.descripcion}} - {{usuService.usuario.Apellido}}  {{usuService.usuario.Nombre}} -->\n\n    <ion-list>\n        <!-- <ion-item>\n            <ion-label class=\"ion-text-wrap\">\n                <ion-text>\n                    {{usuService.usuario.Apellido}} {{usuService.usuario.Nombre}} Movil: ({{orden.movilId}}) {{usuService.usuario.descripcion}}\n                </ion-text>\n            </ion-label>\n            <ion-label></ion-label>\n            <ion-datetime color=\"success\" displayFormat=\"YYYY-MM-DD\" disabled [(ngModel)]=\"orden.fechaInstalacion\"></ion-datetime>\n        </ion-item> -->\n\n        <ion-item>\n            <ion-label position=\"floating\"> Nro. Orden </ion-label>\n            <ion-input type=\"number\" [(ngModel)]=\"orden.ordenId\" required> </ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Tipo Trabajo</ion-label>\n            <ion-select [(ngModel)]=\"orden.tipoTrabajoId\" interface=\"popover\" placeholder=\"seleccionar ...\" required>\n                <ion-select-option *ngFor=\"let tipo of dataService.listaTipoTrabajo\" value={{tipo.tipoTrabajoId}}>{{tipo.descripcion}}</ion-select-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item-divider color=\"medium\">\n            <ion-label>\n                <p> <b>DATOS DEL CLIENTE </b></p>\n            </ion-label>\n        </ion-item-divider>\n        <ion-row>\n            <ion-col>\n                <ion-item>\n                    <ion-label position=\"floating\"> Cliente </ion-label>\n                    <ion-input type=\"text\" [(ngModel)]=\"orden.cliente\" required> </ion-input>\n                </ion-item>\n            </ion-col>\n\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"7\">\n                <ion-item>\n                    <ion-label position=\"floating\"> Calle </ion-label>\n                    <ion-input type=\"text\" [(ngModel)]=\"orden.calle\" required> </ion-input>\n                </ion-item>\n            </ion-col>\n            <ion-col>\n                <ion-item>\n                    <ion-label position=\"floating\"> Nro. </ion-label>\n                    <ion-input type=\"number\" [(ngModel)]=\"orden.numero\" required> </ion-input>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n\n        <!-- <ion-input value=\"Disabled\" disabled>estado</ion-input> -->\n        <ion-item-group>\n            <ion-item>\n                <ion-textarea [(ngModel)]=\"orden.comentarios\" rows=\"6\" cols=\"40\" placeholder=\"Ingrese aqui sus comentarios...\"></ion-textarea>\n            </ion-item>\n        </ion-item-group>\n    </ion-list>\n    <ion-row>\n        <ion-col size=\"6\" class=\"ion-text-right\">\n            <ion-button (click)=\"cancelAddOrden()\" color=\"danger\">\n                Cancelar\n            </ion-button>\n        </ion-col>\n        <ion-col size=\"6\" class=\"ion-text-left\">\n            <ion-button (click)=\"saveNewOrden()\">\n                Guardar\n            </ion-button>\n        </ion-col>\n    </ion-row>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab1/tab1.page.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab1/tab1.page.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar>\n        <!-- <ion-buttons slot=\"start\">\n            <ion-back-button defaultHref=\"/\"></ion-back-button>\n        </ion-buttons> -->\n        <ion-title>\n            ORDENES DIARIAS\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-list>\n        <ion-item *ngFor=\"let orden of ordeneService.ordenes\" (click)=\"verOrden(orden)\">\n            <ion-label class=\"ion-text-wrap\">\n                <ion-text>\n                    {{orden.ordenId}} : {{orden.calle}} {{orden.numero}}\n                    <p>\n                        {{orden.cliente}}\n                    </p>\n\n                </ion-text>\n            </ion-label>\n            <ion-note slot=\"end\" color=\"success\" *ngIf=\"orden.estadoId==20\">Cerrada </ion-note>\n            <ion-note slot=\"end\" color=\"danger\" *ngIf=\"orden.estadoId==15\">En curso </ion-note>\n            <ion-note slot=\"end\" color=\"dark\" *ngIf=\"orden.estadoId==90\">Anulada </ion-note>\n        </ion-item>\n\n    </ion-list>\n\n\n    <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n        <ion-fab-button (click)=\"addOrden()\">\n            <ion-icon name=\"add\"></ion-icon>\n        </ion-fab-button>\n    </ion-fab>\n</ion-content>\n");

/***/ }),

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/*!*********************************************************************!*\
  !*** ./node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

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

/***/ "./src/app/pages/agregar-orden/agregar-orden-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/pages/agregar-orden/agregar-orden-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: AgregarOrdenPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarOrdenPageRoutingModule", function() { return AgregarOrdenPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _agregar_orden_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agregar-orden.page */ "./src/app/pages/agregar-orden/agregar-orden.page.ts");




const routes = [
    {
        path: '',
        component: _agregar_orden_page__WEBPACK_IMPORTED_MODULE_3__["AgregarOrdenPage"]
    }
];
let AgregarOrdenPageRoutingModule = class AgregarOrdenPageRoutingModule {
};
AgregarOrdenPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AgregarOrdenPageRoutingModule);



/***/ }),

/***/ "./src/app/pages/agregar-orden/agregar-orden.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/pages/agregar-orden/agregar-orden.module.ts ***!
  \*************************************************************/
/*! exports provided: AgregarOrdenPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarOrdenPageModule", function() { return AgregarOrdenPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _agregar_orden_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agregar-orden-routing.module */ "./src/app/pages/agregar-orden/agregar-orden-routing.module.ts");
/* harmony import */ var _agregar_orden_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agregar-orden.page */ "./src/app/pages/agregar-orden/agregar-orden.page.ts");







let AgregarOrdenPageModule = class AgregarOrdenPageModule {
};
AgregarOrdenPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _agregar_orden_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgregarOrdenPageRoutingModule"],
        ],
        declarations: [_agregar_orden_page__WEBPACK_IMPORTED_MODULE_6__["AgregarOrdenPage"]]
    })
], AgregarOrdenPageModule);



/***/ }),

/***/ "./src/app/pages/agregar-orden/agregar-orden.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/pages/agregar-orden/agregar-orden.page.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-select {\n  /* Applies to the value and placeholder color */\n  color: #545ca7;\n  /* Set a different placeholder color */\n  --placeholder-color: #971e49;\n  /* Set full opacity on the placeholder */\n  --placeholder-opacity: 1;\n  size: 9px;\n  width: 100%;\n  justify-content: center;\n}\n\nion-datetime {\n  color: #ffffff !important;\n  opacity: 0.9 !important;\n  size: large !important;\n  padding-top: 19px !important;\n  padding-right: 19px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vRG9jdW1lbnRvcy9Qcm95ZWN0b3MvaW9uaWMvb3JkZW5lcy9zcmMvYXBwL3BhZ2VzL2FncmVnYXItb3JkZW4vYWdyZWdhci1vcmRlbi5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2FncmVnYXItb3JkZW4vYWdyZWdhci1vcmRlbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSwrQ0FBQTtFQUNBLGNBQUE7RUFDQSxzQ0FBQTtFQUNBLDRCQUFBO0VBQ0Esd0NBQUE7RUFDQSx3QkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7QUNDSjs7QURFQTtFQUNJLHlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0VBQ0EsOEJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FncmVnYXItb3JkZW4vYWdyZWdhci1vcmRlbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2VsZWN0IHtcclxuICAgIC8qIEFwcGxpZXMgdG8gdGhlIHZhbHVlIGFuZCBwbGFjZWhvbGRlciBjb2xvciAqL1xyXG4gICAgY29sb3I6ICM1NDVjYTc7XHJcbiAgICAvKiBTZXQgYSBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgY29sb3IgKi9cclxuICAgIC0tcGxhY2Vob2xkZXItY29sb3I6ICM5NzFlNDk7XHJcbiAgICAvKiBTZXQgZnVsbCBvcGFjaXR5IG9uIHRoZSBwbGFjZWhvbGRlciAqL1xyXG4gICAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xyXG4gICAgc2l6ZTogOXB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuaW9uLWRhdGV0aW1lIHtcclxuICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgICBvcGFjaXR5OiAwLjkgIWltcG9ydGFudDtcclxuICAgIHNpemU6IGxhcmdlIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmctdG9wOiAxOXB4ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxOXB4ICFpbXBvcnRhbnQ7XHJcbn0iLCJpb24tc2VsZWN0IHtcbiAgLyogQXBwbGllcyB0byB0aGUgdmFsdWUgYW5kIHBsYWNlaG9sZGVyIGNvbG9yICovXG4gIGNvbG9yOiAjNTQ1Y2E3O1xuICAvKiBTZXQgYSBkaWZmZXJlbnQgcGxhY2Vob2xkZXIgY29sb3IgKi9cbiAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzk3MWU0OTtcbiAgLyogU2V0IGZ1bGwgb3BhY2l0eSBvbiB0aGUgcGxhY2Vob2xkZXIgKi9cbiAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xuICBzaXplOiA5cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuaW9uLWRhdGV0aW1lIHtcbiAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgb3BhY2l0eTogMC45ICFpbXBvcnRhbnQ7XG4gIHNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctdG9wOiAxOXB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDE5cHggIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/agregar-orden/agregar-orden.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/agregar-orden/agregar-orden.page.ts ***!
  \***********************************************************/
/*! exports provided: AgregarOrdenPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarOrdenPage", function() { return AgregarOrdenPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/trabajos.service */ "./src/app/services/trabajos.service.ts");
/* harmony import */ var _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../interfaces/interfaces */ "./src/app/interfaces/interfaces.ts");
/* harmony import */ var src_app_services_usuario_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var _services_data_local_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/data-local.service */ "./src/app/services/data-local.service.ts");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/functions/funciones */ "./src/app/functions/funciones.ts");











let AgregarOrdenPage = class AgregarOrdenPage {
    constructor(dataService, modalOrden, usuService, ordenService, uiService, dataLocal) {
        this.dataService = dataService;
        this.modalOrden = modalOrden;
        this.usuService = usuService;
        this.ordenService = ordenService;
        this.uiService = uiService;
        this.dataLocal = dataLocal;
        // cambiar :recibo datos de la pagina llama al modal.
        // podemos recibir los datos del usuario o calcularlos aca.
        this.orden = {};
        this.tipoTrabajos = [];
        this.grabando = false;
        this.orden.movilId = this.usuService.usuario.movilId;
        this.orden.instaladorId = this.usuService.usuario.instaladorId;
        this.orden.estadoId = 15;
        this.orden.usuarioId = this.usuService.usuario.usuarioId;
        this.orden.comentarios = "";
        this.orden.fechaInstalacion = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_10__["fechaHoyStr"])();
        // console.log(this.orden.fechaInstalacion);
        const fecha = new Date();
    }
    ngOnInit() {
    }
    cancelAddOrden() {
        this.modalOrden.dismiss();
    }
    saveNewOrden() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //  console.log(this.orden.calle);
            this.orden.usuarioId = this.usuService.usuario.usuarioId;
            if (!this.orden.ordenId || !Object(util__WEBPACK_IMPORTED_MODULE_9__["isNumber"])(this.orden.ordenId)) {
                this.uiService.alertInformacion("Numero de Orden incorrecto ");
                return;
            }
            if (!this.orden.tipoTrabajoId) {
                this.uiService.alertInformacion("Seleccione tipo de Trabajo");
                return;
            }
            if (!this.orden.calle) {
                this.uiService.alertInformacion("Ingrese Dirección ");
                return;
            }
            if (isNaN(Number(this.orden.numero))) {
                this.uiService.alertInformacion("Numero de Domicilio incorrecto ");
                return;
            }
            this.grabando = true;
            if (!Object(util__WEBPACK_IMPORTED_MODULE_9__["isNumber"])(this.orden.tipoTrabajoId)) {
                this.orden.tipoTrabajoId = this.orden.tipoTrabajoId * 1;
            }
            this.ordenService.grabarSincronizar(this.orden, _interfaces_interfaces__WEBPACK_IMPORTED_MODULE_4__["ModoGrabadoOrden"].TODO).then((res) => {
                if (res) {
                    //this.dataLocal.saveOrdenes(this.orden);
                    this.grabando = false;
                    this.modalOrden.dismiss(this.orden);
                }
                else {
                    this.uiService.alertInformacion(res.error.error);
                    document.body.setAttribute('color-theme', 'light');
                }
            }, err => {
                this.uiService.alertInformacion("No se pudo grabar");
                document.body.setAttribute('color-theme', 'light');
                console.log(err);
            });
        });
    }
};
AgregarOrdenPage.ctorParameters = () => [
    { type: _services_trabajos_service__WEBPACK_IMPORTED_MODULE_3__["TrabajosService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"] },
    { type: src_app_services_usuario_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioService"] },
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_6__["OrdenesService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_7__["UIserviceService"] },
    { type: _services_data_local_service__WEBPACK_IMPORTED_MODULE_8__["DataLocalService"] }
];
AgregarOrdenPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-agregar-orden',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./agregar-orden.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/agregar-orden/agregar-orden.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./agregar-orden.page.scss */ "./src/app/pages/agregar-orden/agregar-orden.page.scss")).default]
    })
], AgregarOrdenPage);



/***/ }),

/***/ "./src/app/pages/tab1/tab1-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/tab1/tab1-routing.module.ts ***!
  \***************************************************/
/*! exports provided: Tab1PageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageRoutingModule", function() { return Tab1PageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab1.page */ "./src/app/pages/tab1/tab1.page.ts");




const routes = [
    {
        path: '',
        component: _tab1_page__WEBPACK_IMPORTED_MODULE_3__["Tab1Page"],
    },
];
let Tab1PageRoutingModule = class Tab1PageRoutingModule {
};
Tab1PageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], Tab1PageRoutingModule);



/***/ }),

/***/ "./src/app/pages/tab1/tab1.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/tab1/tab1.module.ts ***!
  \*******************************************/
/*! exports provided: Tab1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function() { return Tab1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tab1.page */ "./src/app/pages/tab1/tab1.page.ts");
/* harmony import */ var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../explore-container/explore-container.module */ "./src/app/explore-container/explore-container.module.ts");
/* harmony import */ var _agregar_orden_agregar_orden_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../agregar-orden/agregar-orden.page */ "./src/app/pages/agregar-orden/agregar-orden.page.ts");
/* harmony import */ var _tab1_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tab1-routing.module */ "./src/app/pages/tab1/tab1-routing.module.ts");
/* harmony import */ var _agregar_orden_agregar_orden_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../agregar-orden/agregar-orden.module */ "./src/app/pages/agregar-orden/agregar-orden.module.ts");










let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        entryComponents: [
            _agregar_orden_agregar_orden_page__WEBPACK_IMPORTED_MODULE_7__["AgregarOrdenPage"]
        ],
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_6__["ExploreContainerComponentModule"],
            _tab1_routing_module__WEBPACK_IMPORTED_MODULE_8__["Tab1PageRoutingModule"],
            _agregar_orden_agregar_orden_module__WEBPACK_IMPORTED_MODULE_9__["AgregarOrdenPageModule"]
        ],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_5__["Tab1Page"]]
    })
], Tab1PageModule);



/***/ }),

/***/ "./src/app/pages/tab1/tab1.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/tab1/tab1.page.scss ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhYjEvdGFiMS5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/tab1/tab1.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/tab1/tab1.page.ts ***!
  \*****************************************/
/*! exports provided: Tab1Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1Page", function() { return Tab1Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
/* harmony import */ var _pages_agregar_orden_agregar_orden_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pages/agregar-orden/agregar-orden.page */ "./src/app/pages/agregar-orden/agregar-orden.page.ts");
/* harmony import */ var src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/ordenes.service */ "./src/app/services/ordenes.service.ts");
/* harmony import */ var src_app_services_usuario_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/usuario.service */ "./src/app/services/usuario.service.ts");
/* harmony import */ var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/network/ngx */ "./node_modules/@ionic-native/network/__ivy_ngcc__/ngx/index.js");
/* harmony import */ var src_app_services_trabajos_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/trabajos.service */ "./src/app/services/trabajos.service.ts");
/* harmony import */ var src_app_services_data_local_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/data-local.service */ "./src/app/services/data-local.service.ts");
/* harmony import */ var src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/uiservice.service */ "./src/app/services/uiservice.service.ts");
/* harmony import */ var src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/functions/funciones */ "./src/app/functions/funciones.ts");












//import { AppVersion } from '@ionic-native/app-version/ngx';
let Tab1Page = class Tab1Page {
    constructor(ordeneService, router, modalOrden, usuarioService, network, dataService, platform, localdata, uiService) {
        this.ordeneService = ordeneService;
        this.router = router;
        this.modalOrden = modalOrden;
        this.usuarioService = usuarioService;
        this.network = network;
        this.dataService = dataService;
        this.platform = platform;
        this.localdata = localdata;
        this.uiService = uiService;
        this.ordenes = [];
    }
    ngOnInit() { }
    ionViewWillEnter() {
        this.refresh();
    }
    refresh() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //    alert (this.appVersion.getAppName())
            const fechStr = Object(src_app_functions_funciones__WEBPACK_IMPORTED_MODULE_11__["fechaHoyStr"])();
            if (!this.usuarioService.usuario.instaladorId || this.usuarioService.usuario.instaladorId == null || this.usuarioService.usuario.instaladorId == undefined) {
                this.uiService.alertInformacion("Por favor Ingrese Usuario y clave");
                this.router.navigate(['/login']);
                return;
            }
            this.dataService.getTareas();
            this.dataService.getTipoTrabajo();
            this.dataService.getEquipos();
            this.dataService.getMateriales();
            this.ordeneService.getOrdenes(fechStr, fechStr, this.usuarioService.usuario.instaladorId.toString());
        });
    }
    addOrden() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // validar que tenga movil asignado al login. tambien verificar en el login
            //console.log("movil: " + this.usuarioService.usuario.movilId);
            if (this.usuarioService.usuario.movilId === undefined || this.usuarioService.usuario.movilId === null) {
                //console.log ('mensaje de que no tiene movil asignado:'+ this.usuarioService.usuario.movilId );
                let msg = "No hay movil asignado para el usuario";
                this.uiService.alertInformacion(msg);
            }
            else {
                //buscar ordenes en curso
                //console.log('ordenes[0]:'+this.ordenes[0].estadoid);
                var ordenesOpen = this.ordeneService.ordenes.filter(function (od) {
                    return od.estadoId === 15;
                });
                if (ordenesOpen.length >= 1) {
                    //console.log("cierre las ordenes activas: "+ ordenesOpen.length);
                    let msg = 'cierre la orden en curso';
                    this.uiService.alertInformacion(msg);
                }
                else {
                    const modal = yield this.modalOrden.create({
                        component: _pages_agregar_orden_agregar_orden_page__WEBPACK_IMPORTED_MODULE_4__["AgregarOrdenPage"],
                    });
                    yield modal.present();
                    const { data } = yield modal.onDidDismiss();
                    this.refresh();
                }
            }
        });
    }
    verOrden(orden) {
        orden.usuarioId = this.usuarioService.usuario.usuarioId;
        this.router.navigateByUrl(`/main/tabs/orden/orden-form/${orden.ordenId}`);
    }
};
Tab1Page.ctorParameters = () => [
    { type: src_app_services_ordenes_service__WEBPACK_IMPORTED_MODULE_5__["OrdenesService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"] },
    { type: src_app_services_usuario_service__WEBPACK_IMPORTED_MODULE_6__["UsuarioService"] },
    { type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_7__["Network"] },
    { type: src_app_services_trabajos_service__WEBPACK_IMPORTED_MODULE_8__["TrabajosService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["Platform"] },
    { type: src_app_services_data_local_service__WEBPACK_IMPORTED_MODULE_9__["DataLocalService"] },
    { type: src_app_services_uiservice_service__WEBPACK_IMPORTED_MODULE_10__["UIserviceService"] }
];
Tab1Page = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab1',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./tab1.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/tab1/tab1.page.html")).default,
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./tab1.page.scss */ "./src/app/pages/tab1/tab1.page.scss")).default]
    })
], Tab1Page);



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
//# sourceMappingURL=tab1-tab1-module-es2015.js.map