(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var html, chai, __coffeescriptShare, assert, expect, should;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/practicalmeteor_chai/packages/practicalmeteor_chai.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/practicalmeteor:chai/chai-1.9.2.js                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/**                                                                                                           // 1
 * Require the given path.                                                                                    // 2
 *                                                                                                            // 3
 * @param {String} path                                                                                       // 4
 * @return {Object} exports                                                                                   // 5
 * @api public                                                                                                // 6
 */                                                                                                           // 7
                                                                                                              // 8
function require(path, parent, orig) {                                                                        // 9
  var resolved = require.resolve(path);                                                                       // 10
                                                                                                              // 11
  // lookup failed                                                                                            // 12
  if (null == resolved) {                                                                                     // 13
    orig = orig || path;                                                                                      // 14
    parent = parent || 'root';                                                                                // 15
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');                            // 16
    err.path = orig;                                                                                          // 17
    err.parent = parent;                                                                                      // 18
    err.require = true;                                                                                       // 19
    throw err;                                                                                                // 20
  }                                                                                                           // 21
                                                                                                              // 22
  var module = require.modules[resolved];                                                                     // 23
                                                                                                              // 24
  // perform real require()                                                                                   // 25
  // by invoking the module's                                                                                 // 26
  // registered function                                                                                      // 27
  if (!module._resolving && !module.exports) {                                                                // 28
    var mod = {};                                                                                             // 29
    mod.exports = {};                                                                                         // 30
    mod.client = mod.component = true;                                                                        // 31
    module._resolving = true;                                                                                 // 32
    module.call(this, mod.exports, require.relative(resolved), mod);                                          // 33
    delete module._resolving;                                                                                 // 34
    module.exports = mod.exports;                                                                             // 35
  }                                                                                                           // 36
                                                                                                              // 37
  return module.exports;                                                                                      // 38
}                                                                                                             // 39
                                                                                                              // 40
/**                                                                                                           // 41
 * Registered modules.                                                                                        // 42
 */                                                                                                           // 43
                                                                                                              // 44
require.modules = {};                                                                                         // 45
                                                                                                              // 46
/**                                                                                                           // 47
 * Registered aliases.                                                                                        // 48
 */                                                                                                           // 49
                                                                                                              // 50
require.aliases = {};                                                                                         // 51
                                                                                                              // 52
/**                                                                                                           // 53
 * Resolve `path`.                                                                                            // 54
 *                                                                                                            // 55
 * Lookup:                                                                                                    // 56
 *                                                                                                            // 57
 *   - PATH/index.js                                                                                          // 58
 *   - PATH.js                                                                                                // 59
 *   - PATH                                                                                                   // 60
 *                                                                                                            // 61
 * @param {String} path                                                                                       // 62
 * @return {String} path or null                                                                              // 63
 * @api private                                                                                               // 64
 */                                                                                                           // 65
                                                                                                              // 66
require.resolve = function(path) {                                                                            // 67
  if (path.charAt(0) === '/') path = path.slice(1);                                                           // 68
                                                                                                              // 69
  var paths = [                                                                                               // 70
    path,                                                                                                     // 71
    path + '.js',                                                                                             // 72
    path + '.json',                                                                                           // 73
    path + '/index.js',                                                                                       // 74
    path + '/index.json'                                                                                      // 75
  ];                                                                                                          // 76
                                                                                                              // 77
  for (var i = 0; i < paths.length; i++) {                                                                    // 78
    var path = paths[i];                                                                                      // 79
    if (require.modules.hasOwnProperty(path)) return path;                                                    // 80
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];                                   // 81
  }                                                                                                           // 82
};                                                                                                            // 83
                                                                                                              // 84
/**                                                                                                           // 85
 * Normalize `path` relative to the current path.                                                             // 86
 *                                                                                                            // 87
 * @param {String} curr                                                                                       // 88
 * @param {String} path                                                                                       // 89
 * @return {String}                                                                                           // 90
 * @api private                                                                                               // 91
 */                                                                                                           // 92
                                                                                                              // 93
require.normalize = function(curr, path) {                                                                    // 94
  var segs = [];                                                                                              // 95
                                                                                                              // 96
  if ('.' != path.charAt(0)) return path;                                                                     // 97
                                                                                                              // 98
  curr = curr.split('/');                                                                                     // 99
  path = path.split('/');                                                                                     // 100
                                                                                                              // 101
  for (var i = 0; i < path.length; ++i) {                                                                     // 102
    if ('..' == path[i]) {                                                                                    // 103
      curr.pop();                                                                                             // 104
    } else if ('.' != path[i] && '' != path[i]) {                                                             // 105
      segs.push(path[i]);                                                                                     // 106
    }                                                                                                         // 107
  }                                                                                                           // 108
                                                                                                              // 109
  return curr.concat(segs).join('/');                                                                         // 110
};                                                                                                            // 111
                                                                                                              // 112
/**                                                                                                           // 113
 * Register module at `path` with callback `definition`.                                                      // 114
 *                                                                                                            // 115
 * @param {String} path                                                                                       // 116
 * @param {Function} definition                                                                               // 117
 * @api private                                                                                               // 118
 */                                                                                                           // 119
                                                                                                              // 120
require.register = function(path, definition) {                                                               // 121
  require.modules[path] = definition;                                                                         // 122
};                                                                                                            // 123
                                                                                                              // 124
/**                                                                                                           // 125
 * Alias a module definition.                                                                                 // 126
 *                                                                                                            // 127
 * @param {String} from                                                                                       // 128
 * @param {String} to                                                                                         // 129
 * @api private                                                                                               // 130
 */                                                                                                           // 131
                                                                                                              // 132
require.alias = function(from, to) {                                                                          // 133
  if (!require.modules.hasOwnProperty(from)) {                                                                // 134
    throw new Error('Failed to alias "' + from + '", it does not exist');                                     // 135
  }                                                                                                           // 136
  require.aliases[to] = from;                                                                                 // 137
};                                                                                                            // 138
                                                                                                              // 139
/**                                                                                                           // 140
 * Return a require function relative to the `parent` path.                                                   // 141
 *                                                                                                            // 142
 * @param {String} parent                                                                                     // 143
 * @return {Function}                                                                                         // 144
 * @api private                                                                                               // 145
 */                                                                                                           // 146
                                                                                                              // 147
require.relative = function(parent) {                                                                         // 148
  var p = require.normalize(parent, '..');                                                                    // 149
                                                                                                              // 150
  /**                                                                                                         // 151
   * lastIndexOf helper.                                                                                      // 152
   */                                                                                                         // 153
                                                                                                              // 154
  function lastIndexOf(arr, obj) {                                                                            // 155
    var i = arr.length;                                                                                       // 156
    while (i--) {                                                                                             // 157
      if (arr[i] === obj) return i;                                                                           // 158
    }                                                                                                         // 159
    return -1;                                                                                                // 160
  }                                                                                                           // 161
                                                                                                              // 162
  /**                                                                                                         // 163
   * The relative require() itself.                                                                           // 164
   */                                                                                                         // 165
                                                                                                              // 166
  function localRequire(path) {                                                                               // 167
    var resolved = localRequire.resolve(path);                                                                // 168
    return require(resolved, parent, path);                                                                   // 169
  }                                                                                                           // 170
                                                                                                              // 171
  /**                                                                                                         // 172
   * Resolve relative to the parent.                                                                          // 173
   */                                                                                                         // 174
                                                                                                              // 175
  localRequire.resolve = function(path) {                                                                     // 176
    var c = path.charAt(0);                                                                                   // 177
    if ('/' == c) return path.slice(1);                                                                       // 178
    if ('.' == c) return require.normalize(p, path);                                                          // 179
                                                                                                              // 180
    // resolve deps by returning                                                                              // 181
    // the dep in the nearest "deps"                                                                          // 182
    // directory                                                                                              // 183
    var segs = parent.split('/');                                                                             // 184
    var i = lastIndexOf(segs, 'deps') + 1;                                                                    // 185
    if (!i) i = 0;                                                                                            // 186
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;                                                  // 187
    return path;                                                                                              // 188
  };                                                                                                          // 189
                                                                                                              // 190
  /**                                                                                                         // 191
   * Check if module is defined at `path`.                                                                    // 192
   */                                                                                                         // 193
                                                                                                              // 194
  localRequire.exists = function(path) {                                                                      // 195
    return require.modules.hasOwnProperty(localRequire.resolve(path));                                        // 196
  };                                                                                                          // 197
                                                                                                              // 198
  return localRequire;                                                                                        // 199
};                                                                                                            // 200
require.register("chaijs-assertion-error/index.js", function(exports, require, module){                       // 201
/*!                                                                                                           // 202
 * assertion-error                                                                                            // 203
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>                                                           // 204
 * MIT Licensed                                                                                               // 205
 */                                                                                                           // 206
                                                                                                              // 207
/*!                                                                                                           // 208
 * Return a function that will copy properties from                                                           // 209
 * one object to another excluding any originally                                                             // 210
 * listed. Returned function will create a new `{}`.                                                          // 211
 *                                                                                                            // 212
 * @param {String} excluded properties ...                                                                    // 213
 * @return {Function}                                                                                         // 214
 */                                                                                                           // 215
                                                                                                              // 216
function exclude () {                                                                                         // 217
  var excludes = [].slice.call(arguments);                                                                    // 218
                                                                                                              // 219
  function excludeProps (res, obj) {                                                                          // 220
    Object.keys(obj).forEach(function (key) {                                                                 // 221
      if (!~excludes.indexOf(key)) res[key] = obj[key];                                                       // 222
    });                                                                                                       // 223
  }                                                                                                           // 224
                                                                                                              // 225
  return function extendExclude () {                                                                          // 226
    var args = [].slice.call(arguments)                                                                       // 227
      , i = 0                                                                                                 // 228
      , res = {};                                                                                             // 229
                                                                                                              // 230
    for (; i < args.length; i++) {                                                                            // 231
      excludeProps(res, args[i]);                                                                             // 232
    }                                                                                                         // 233
                                                                                                              // 234
    return res;                                                                                               // 235
  };                                                                                                          // 236
};                                                                                                            // 237
                                                                                                              // 238
/*!                                                                                                           // 239
 * Primary Exports                                                                                            // 240
 */                                                                                                           // 241
                                                                                                              // 242
module.exports = AssertionError;                                                                              // 243
                                                                                                              // 244
/**                                                                                                           // 245
 * ### AssertionError                                                                                         // 246
 *                                                                                                            // 247
 * An extension of the JavaScript `Error` constructor for                                                     // 248
 * assertion and validation scenarios.                                                                        // 249
 *                                                                                                            // 250
 * @param {String} message                                                                                    // 251
 * @param {Object} properties to include (optional)                                                           // 252
 * @param {callee} start stack function (optional)                                                            // 253
 */                                                                                                           // 254
                                                                                                              // 255
function AssertionError (message, _props, ssf) {                                                              // 256
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')                                   // 257
    , props = extend(_props || {});                                                                           // 258
                                                                                                              // 259
  // default values                                                                                           // 260
  this.message = message || 'Unspecified AssertionError';                                                     // 261
  this.showDiff = false;                                                                                      // 262
                                                                                                              // 263
  // copy from properties                                                                                     // 264
  for (var key in props) {                                                                                    // 265
    this[key] = props[key];                                                                                   // 266
  }                                                                                                           // 267
                                                                                                              // 268
  // capture stack trace                                                                                      // 269
  ssf = ssf || arguments.callee;                                                                              // 270
  if (ssf && Error.captureStackTrace) {                                                                       // 271
    Error.captureStackTrace(this, ssf);                                                                       // 272
  }                                                                                                           // 273
}                                                                                                             // 274
                                                                                                              // 275
/*!                                                                                                           // 276
 * Inherit from Error.prototype                                                                               // 277
 */                                                                                                           // 278
                                                                                                              // 279
AssertionError.prototype = Object.create(Error.prototype);                                                    // 280
                                                                                                              // 281
/*!                                                                                                           // 282
 * Statically set name                                                                                        // 283
 */                                                                                                           // 284
                                                                                                              // 285
AssertionError.prototype.name = 'AssertionError';                                                             // 286
                                                                                                              // 287
/*!                                                                                                           // 288
 * Ensure correct constructor                                                                                 // 289
 */                                                                                                           // 290
                                                                                                              // 291
AssertionError.prototype.constructor = AssertionError;                                                        // 292
                                                                                                              // 293
/**                                                                                                           // 294
 * Allow errors to be converted to JSON for static transfer.                                                  // 295
 *                                                                                                            // 296
 * @param {Boolean} include stack (default: `true`)                                                           // 297
 * @return {Object} object that can be `JSON.stringify`                                                       // 298
 */                                                                                                           // 299
                                                                                                              // 300
AssertionError.prototype.toJSON = function (stack) {                                                          // 301
  var extend = exclude('constructor', 'toJSON', 'stack')                                                      // 302
    , props = extend({ name: this.name }, this);                                                              // 303
                                                                                                              // 304
  // include stack if exists and not turned off                                                               // 305
  if (false !== stack && this.stack) {                                                                        // 306
    props.stack = this.stack;                                                                                 // 307
  }                                                                                                           // 308
                                                                                                              // 309
  return props;                                                                                               // 310
};                                                                                                            // 311
                                                                                                              // 312
});                                                                                                           // 313
require.register("chaijs-type-detect/lib/type.js", function(exports, require, module){                        // 314
/*!                                                                                                           // 315
 * type-detect                                                                                                // 316
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>                                                     // 317
 * MIT Licensed                                                                                               // 318
 */                                                                                                           // 319
                                                                                                              // 320
/*!                                                                                                           // 321
 * Primary Exports                                                                                            // 322
 */                                                                                                           // 323
                                                                                                              // 324
var exports = module.exports = getType;                                                                       // 325
                                                                                                              // 326
/*!                                                                                                           // 327
 * Detectable javascript natives                                                                              // 328
 */                                                                                                           // 329
                                                                                                              // 330
var natives = {                                                                                               // 331
    '[object Array]': 'array'                                                                                 // 332
  , '[object RegExp]': 'regexp'                                                                               // 333
  , '[object Function]': 'function'                                                                           // 334
  , '[object Arguments]': 'arguments'                                                                         // 335
  , '[object Date]': 'date'                                                                                   // 336
};                                                                                                            // 337
                                                                                                              // 338
/**                                                                                                           // 339
 * ### typeOf (obj)                                                                                           // 340
 *                                                                                                            // 341
 * Use several different techniques to determine                                                              // 342
 * the type of object being tested.                                                                           // 343
 *                                                                                                            // 344
 *                                                                                                            // 345
 * @param {Mixed} object                                                                                      // 346
 * @return {String} object type                                                                               // 347
 * @api public                                                                                                // 348
 */                                                                                                           // 349
                                                                                                              // 350
function getType (obj) {                                                                                      // 351
  var str = Object.prototype.toString.call(obj);                                                              // 352
  if (natives[str]) return natives[str];                                                                      // 353
  if (obj === null) return 'null';                                                                            // 354
  if (obj === undefined) return 'undefined';                                                                  // 355
  if (obj === Object(obj)) return 'object';                                                                   // 356
  return typeof obj;                                                                                          // 357
}                                                                                                             // 358
                                                                                                              // 359
exports.Library = Library;                                                                                    // 360
                                                                                                              // 361
/**                                                                                                           // 362
 * ### Library                                                                                                // 363
 *                                                                                                            // 364
 * Create a repository for custom type detection.                                                             // 365
 *                                                                                                            // 366
 * ```js                                                                                                      // 367
 * var lib = new type.Library;                                                                                // 368
 * ```                                                                                                        // 369
 *                                                                                                            // 370
 */                                                                                                           // 371
                                                                                                              // 372
function Library () {                                                                                         // 373
  this.tests = {};                                                                                            // 374
}                                                                                                             // 375
                                                                                                              // 376
/**                                                                                                           // 377
 * #### .of (obj)                                                                                             // 378
 *                                                                                                            // 379
 * Expose replacement `typeof` detection to the library.                                                      // 380
 *                                                                                                            // 381
 * ```js                                                                                                      // 382
 * if ('string' === lib.of('hello world')) {                                                                  // 383
 *   // ...                                                                                                   // 384
 * }                                                                                                          // 385
 * ```                                                                                                        // 386
 *                                                                                                            // 387
 * @param {Mixed} object to test                                                                              // 388
 * @return {String} type                                                                                      // 389
 */                                                                                                           // 390
                                                                                                              // 391
Library.prototype.of = getType;                                                                               // 392
                                                                                                              // 393
/**                                                                                                           // 394
 * #### .define (type, test)                                                                                  // 395
 *                                                                                                            // 396
 * Add a test to for the `.test()` assertion.                                                                 // 397
 *                                                                                                            // 398
 * Can be defined as a regular expression:                                                                    // 399
 *                                                                                                            // 400
 * ```js                                                                                                      // 401
 * lib.define('int', /^[0-9]+$/);                                                                             // 402
 * ```                                                                                                        // 403
 *                                                                                                            // 404
 * ... or as a function:                                                                                      // 405
 *                                                                                                            // 406
 * ```js                                                                                                      // 407
 * lib.define('bln', function (obj) {                                                                         // 408
 *   if ('boolean' === lib.of(obj)) return true;                                                              // 409
 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];                                                       // 410
 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();                                                   // 411
 *   return !! ~blns.indexOf(obj);                                                                            // 412
 * });                                                                                                        // 413
 * ```                                                                                                        // 414
 *                                                                                                            // 415
 * @param {String} type                                                                                       // 416
 * @param {RegExp|Function} test                                                                              // 417
 * @api public                                                                                                // 418
 */                                                                                                           // 419
                                                                                                              // 420
Library.prototype.define = function (type, test) {                                                            // 421
  if (arguments.length === 1) return this.tests[type];                                                        // 422
  this.tests[type] = test;                                                                                    // 423
  return this;                                                                                                // 424
};                                                                                                            // 425
                                                                                                              // 426
/**                                                                                                           // 427
 * #### .test (obj, test)                                                                                     // 428
 *                                                                                                            // 429
 * Assert that an object is of type. Will first                                                               // 430
 * check natives, and if that does not pass it will                                                           // 431
 * use the user defined custom tests.                                                                         // 432
 *                                                                                                            // 433
 * ```js                                                                                                      // 434
 * assert(lib.test('1', 'int'));                                                                              // 435
 * assert(lib.test('yes', 'bln'));                                                                            // 436
 * ```                                                                                                        // 437
 *                                                                                                            // 438
 * @param {Mixed} object                                                                                      // 439
 * @param {String} type                                                                                       // 440
 * @return {Boolean} result                                                                                   // 441
 * @api public                                                                                                // 442
 */                                                                                                           // 443
                                                                                                              // 444
Library.prototype.test = function (obj, type) {                                                               // 445
  if (type === getType(obj)) return true;                                                                     // 446
  var test = this.tests[type];                                                                                // 447
                                                                                                              // 448
  if (test && 'regexp' === getType(test)) {                                                                   // 449
    return test.test(obj);                                                                                    // 450
  } else if (test && 'function' === getType(test)) {                                                          // 451
    return test(obj);                                                                                         // 452
  } else {                                                                                                    // 453
    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');                             // 454
  }                                                                                                           // 455
};                                                                                                            // 456
                                                                                                              // 457
});                                                                                                           // 458
require.register("chaijs-deep-eql/lib/eql.js", function(exports, require, module){                            // 459
/*!                                                                                                           // 460
 * deep-eql                                                                                                   // 461
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>                                                     // 462
 * MIT Licensed                                                                                               // 463
 */                                                                                                           // 464
                                                                                                              // 465
/*!                                                                                                           // 466
 * Module dependencies                                                                                        // 467
 */                                                                                                           // 468
                                                                                                              // 469
var type = require('type-detect');                                                                            // 470
                                                                                                              // 471
/*!                                                                                                           // 472
 * Buffer.isBuffer browser shim                                                                               // 473
 */                                                                                                           // 474
                                                                                                              // 475
var Buffer;                                                                                                   // 476
try { Buffer = require('buffer').Buffer; }                                                                    // 477
catch(ex) {                                                                                                   // 478
  Buffer = {};                                                                                                // 479
  Buffer.isBuffer = function() { return false; }                                                              // 480
}                                                                                                             // 481
                                                                                                              // 482
/*!                                                                                                           // 483
 * Primary Export                                                                                             // 484
 */                                                                                                           // 485
                                                                                                              // 486
module.exports = deepEqual;                                                                                   // 487
                                                                                                              // 488
/**                                                                                                           // 489
 * Assert super-strict (egal) equality between                                                                // 490
 * two objects of any type.                                                                                   // 491
 *                                                                                                            // 492
 * @param {Mixed} a                                                                                           // 493
 * @param {Mixed} b                                                                                           // 494
 * @param {Array} memoised (optional)                                                                         // 495
 * @return {Boolean} equal match                                                                              // 496
 */                                                                                                           // 497
                                                                                                              // 498
function deepEqual(a, b, m) {                                                                                 // 499
  if (sameValue(a, b)) {                                                                                      // 500
    return true;                                                                                              // 501
  } else if ('date' === type(a)) {                                                                            // 502
    return dateEqual(a, b);                                                                                   // 503
  } else if ('regexp' === type(a)) {                                                                          // 504
    return regexpEqual(a, b);                                                                                 // 505
  } else if (Buffer.isBuffer(a)) {                                                                            // 506
    return bufferEqual(a, b);                                                                                 // 507
  } else if ('arguments' === type(a)) {                                                                       // 508
    return argumentsEqual(a, b, m);                                                                           // 509
  } else if (!typeEqual(a, b)) {                                                                              // 510
    return false;                                                                                             // 511
  } else if (('object' !== type(a) && 'object' !== type(b))                                                   // 512
  && ('array' !== type(a) && 'array' !== type(b))) {                                                          // 513
    return sameValue(a, b);                                                                                   // 514
  } else {                                                                                                    // 515
    return objectEqual(a, b, m);                                                                              // 516
  }                                                                                                           // 517
}                                                                                                             // 518
                                                                                                              // 519
/*!                                                                                                           // 520
 * Strict (egal) equality test. Ensures that NaN always                                                       // 521
 * equals NaN and `-0` does not equal `+0`.                                                                   // 522
 *                                                                                                            // 523
 * @param {Mixed} a                                                                                           // 524
 * @param {Mixed} b                                                                                           // 525
 * @return {Boolean} equal match                                                                              // 526
 */                                                                                                           // 527
                                                                                                              // 528
function sameValue(a, b) {                                                                                    // 529
  if (a === b) return a !== 0 || 1 / a === 1 / b;                                                             // 530
  return a !== a && b !== b;                                                                                  // 531
}                                                                                                             // 532
                                                                                                              // 533
/*!                                                                                                           // 534
 * Compare the types of two given objects and                                                                 // 535
 * return if they are equal. Note that an Array                                                               // 536
 * has a type of `array` (not `object`) and arguments                                                         // 537
 * have a type of `arguments` (not `array`/`object`).                                                         // 538
 *                                                                                                            // 539
 * @param {Mixed} a                                                                                           // 540
 * @param {Mixed} b                                                                                           // 541
 * @return {Boolean} result                                                                                   // 542
 */                                                                                                           // 543
                                                                                                              // 544
function typeEqual(a, b) {                                                                                    // 545
  return type(a) === type(b);                                                                                 // 546
}                                                                                                             // 547
                                                                                                              // 548
/*!                                                                                                           // 549
 * Compare two Date objects by asserting that                                                                 // 550
 * the time values are equal using `saveValue`.                                                               // 551
 *                                                                                                            // 552
 * @param {Date} a                                                                                            // 553
 * @param {Date} b                                                                                            // 554
 * @return {Boolean} result                                                                                   // 555
 */                                                                                                           // 556
                                                                                                              // 557
function dateEqual(a, b) {                                                                                    // 558
  if ('date' !== type(b)) return false;                                                                       // 559
  return sameValue(a.getTime(), b.getTime());                                                                 // 560
}                                                                                                             // 561
                                                                                                              // 562
/*!                                                                                                           // 563
 * Compare two regular expressions by converting them                                                         // 564
 * to string and checking for `sameValue`.                                                                    // 565
 *                                                                                                            // 566
 * @param {RegExp} a                                                                                          // 567
 * @param {RegExp} b                                                                                          // 568
 * @return {Boolean} result                                                                                   // 569
 */                                                                                                           // 570
                                                                                                              // 571
function regexpEqual(a, b) {                                                                                  // 572
  if ('regexp' !== type(b)) return false;                                                                     // 573
  return sameValue(a.toString(), b.toString());                                                               // 574
}                                                                                                             // 575
                                                                                                              // 576
/*!                                                                                                           // 577
 * Assert deep equality of two `arguments` objects.                                                           // 578
 * Unfortunately, these must be sliced to arrays                                                              // 579
 * prior to test to ensure no bad behavior.                                                                   // 580
 *                                                                                                            // 581
 * @param {Arguments} a                                                                                       // 582
 * @param {Arguments} b                                                                                       // 583
 * @param {Array} memoize (optional)                                                                          // 584
 * @return {Boolean} result                                                                                   // 585
 */                                                                                                           // 586
                                                                                                              // 587
function argumentsEqual(a, b, m) {                                                                            // 588
  if ('arguments' !== type(b)) return false;                                                                  // 589
  a = [].slice.call(a);                                                                                       // 590
  b = [].slice.call(b);                                                                                       // 591
  return deepEqual(a, b, m);                                                                                  // 592
}                                                                                                             // 593
                                                                                                              // 594
/*!                                                                                                           // 595
 * Get enumerable properties of a given object.                                                               // 596
 *                                                                                                            // 597
 * @param {Object} a                                                                                          // 598
 * @return {Array} property names                                                                             // 599
 */                                                                                                           // 600
                                                                                                              // 601
function enumerable(a) {                                                                                      // 602
  var res = [];                                                                                               // 603
  for (var key in a) res.push(key);                                                                           // 604
  return res;                                                                                                 // 605
}                                                                                                             // 606
                                                                                                              // 607
/*!                                                                                                           // 608
 * Simple equality for flat iterable objects                                                                  // 609
 * such as Arrays or Node.js buffers.                                                                         // 610
 *                                                                                                            // 611
 * @param {Iterable} a                                                                                        // 612
 * @param {Iterable} b                                                                                        // 613
 * @return {Boolean} result                                                                                   // 614
 */                                                                                                           // 615
                                                                                                              // 616
function iterableEqual(a, b) {                                                                                // 617
  if (a.length !==  b.length) return false;                                                                   // 618
                                                                                                              // 619
  var i = 0;                                                                                                  // 620
  var match = true;                                                                                           // 621
                                                                                                              // 622
  for (; i < a.length; i++) {                                                                                 // 623
    if (a[i] !== b[i]) {                                                                                      // 624
      match = false;                                                                                          // 625
      break;                                                                                                  // 626
    }                                                                                                         // 627
  }                                                                                                           // 628
                                                                                                              // 629
  return match;                                                                                               // 630
}                                                                                                             // 631
                                                                                                              // 632
/*!                                                                                                           // 633
 * Extension to `iterableEqual` specifically                                                                  // 634
 * for Node.js Buffers.                                                                                       // 635
 *                                                                                                            // 636
 * @param {Buffer} a                                                                                          // 637
 * @param {Mixed} b                                                                                           // 638
 * @return {Boolean} result                                                                                   // 639
 */                                                                                                           // 640
                                                                                                              // 641
function bufferEqual(a, b) {                                                                                  // 642
  if (!Buffer.isBuffer(b)) return false;                                                                      // 643
  return iterableEqual(a, b);                                                                                 // 644
}                                                                                                             // 645
                                                                                                              // 646
/*!                                                                                                           // 647
 * Block for `objectEqual` ensuring non-existing                                                              // 648
 * values don't get in.                                                                                       // 649
 *                                                                                                            // 650
 * @param {Mixed} object                                                                                      // 651
 * @return {Boolean} result                                                                                   // 652
 */                                                                                                           // 653
                                                                                                              // 654
function isValue(a) {                                                                                         // 655
  return a !== null && a !== undefined;                                                                       // 656
}                                                                                                             // 657
                                                                                                              // 658
/*!                                                                                                           // 659
 * Recursively check the equality of two objects.                                                             // 660
 * Once basic sameness has been established it will                                                           // 661
 * defer to `deepEqual` for each enumerable key                                                               // 662
 * in the object.                                                                                             // 663
 *                                                                                                            // 664
 * @param {Mixed} a                                                                                           // 665
 * @param {Mixed} b                                                                                           // 666
 * @return {Boolean} result                                                                                   // 667
 */                                                                                                           // 668
                                                                                                              // 669
function objectEqual(a, b, m) {                                                                               // 670
  if (!isValue(a) || !isValue(b)) {                                                                           // 671
    return false;                                                                                             // 672
  }                                                                                                           // 673
                                                                                                              // 674
  if (a.prototype !== b.prototype) {                                                                          // 675
    return false;                                                                                             // 676
  }                                                                                                           // 677
                                                                                                              // 678
  var i;                                                                                                      // 679
  if (m) {                                                                                                    // 680
    for (i = 0; i < m.length; i++) {                                                                          // 681
      if ((m[i][0] === a && m[i][1] === b)                                                                    // 682
      ||  (m[i][0] === b && m[i][1] === a)) {                                                                 // 683
        return true;                                                                                          // 684
      }                                                                                                       // 685
    }                                                                                                         // 686
  } else {                                                                                                    // 687
    m = [];                                                                                                   // 688
  }                                                                                                           // 689
                                                                                                              // 690
  try {                                                                                                       // 691
    var ka = enumerable(a);                                                                                   // 692
    var kb = enumerable(b);                                                                                   // 693
  } catch (ex) {                                                                                              // 694
    return false;                                                                                             // 695
  }                                                                                                           // 696
                                                                                                              // 697
  ka.sort();                                                                                                  // 698
  kb.sort();                                                                                                  // 699
                                                                                                              // 700
  if (!iterableEqual(ka, kb)) {                                                                               // 701
    return false;                                                                                             // 702
  }                                                                                                           // 703
                                                                                                              // 704
  m.push([ a, b ]);                                                                                           // 705
                                                                                                              // 706
  var key;                                                                                                    // 707
  for (i = ka.length - 1; i >= 0; i--) {                                                                      // 708
    key = ka[i];                                                                                              // 709
    if (!deepEqual(a[key], b[key], m)) {                                                                      // 710
      return false;                                                                                           // 711
    }                                                                                                         // 712
  }                                                                                                           // 713
                                                                                                              // 714
  return true;                                                                                                // 715
}                                                                                                             // 716
                                                                                                              // 717
});                                                                                                           // 718
require.register("chai/index.js", function(exports, require, module){                                         // 719
module.exports = require('./lib/chai');                                                                       // 720
                                                                                                              // 721
});                                                                                                           // 722
require.register("chai/lib/chai.js", function(exports, require, module){                                      // 723
/*!                                                                                                           // 724
 * chai                                                                                                       // 725
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 726
 * MIT Licensed                                                                                               // 727
 */                                                                                                           // 728
                                                                                                              // 729
var used = []                                                                                                 // 730
  , exports = module.exports = {};                                                                            // 731
                                                                                                              // 732
/*!                                                                                                           // 733
 * Chai version                                                                                               // 734
 */                                                                                                           // 735
                                                                                                              // 736
exports.version = '1.9.2';                                                                                    // 737
                                                                                                              // 738
/*!                                                                                                           // 739
 * Assertion Error                                                                                            // 740
 */                                                                                                           // 741
                                                                                                              // 742
exports.AssertionError = require('assertion-error');                                                          // 743
                                                                                                              // 744
/*!                                                                                                           // 745
 * Utils for plugins (not exported)                                                                           // 746
 */                                                                                                           // 747
                                                                                                              // 748
var util = require('./chai/utils');                                                                           // 749
                                                                                                              // 750
/**                                                                                                           // 751
 * # .use(function)                                                                                           // 752
 *                                                                                                            // 753
 * Provides a way to extend the internals of Chai                                                             // 754
 *                                                                                                            // 755
 * @param {Function}                                                                                          // 756
 * @returns {this} for chaining                                                                               // 757
 * @api public                                                                                                // 758
 */                                                                                                           // 759
                                                                                                              // 760
exports.use = function (fn) {                                                                                 // 761
  if (!~used.indexOf(fn)) {                                                                                   // 762
    fn(this, util);                                                                                           // 763
    used.push(fn);                                                                                            // 764
  }                                                                                                           // 765
                                                                                                              // 766
  return this;                                                                                                // 767
};                                                                                                            // 768
                                                                                                              // 769
/*!                                                                                                           // 770
 * Configuration                                                                                              // 771
 */                                                                                                           // 772
                                                                                                              // 773
var config = require('./chai/config');                                                                        // 774
exports.config = config;                                                                                      // 775
                                                                                                              // 776
/*!                                                                                                           // 777
 * Primary `Assertion` prototype                                                                              // 778
 */                                                                                                           // 779
                                                                                                              // 780
var assertion = require('./chai/assertion');                                                                  // 781
exports.use(assertion);                                                                                       // 782
                                                                                                              // 783
/*!                                                                                                           // 784
 * Core Assertions                                                                                            // 785
 */                                                                                                           // 786
                                                                                                              // 787
var core = require('./chai/core/assertions');                                                                 // 788
exports.use(core);                                                                                            // 789
                                                                                                              // 790
/*!                                                                                                           // 791
 * Expect interface                                                                                           // 792
 */                                                                                                           // 793
                                                                                                              // 794
var expect = require('./chai/interface/expect');                                                              // 795
exports.use(expect);                                                                                          // 796
                                                                                                              // 797
/*!                                                                                                           // 798
 * Should interface                                                                                           // 799
 */                                                                                                           // 800
                                                                                                              // 801
var should = require('./chai/interface/should');                                                              // 802
exports.use(should);                                                                                          // 803
                                                                                                              // 804
/*!                                                                                                           // 805
 * Assert interface                                                                                           // 806
 */                                                                                                           // 807
                                                                                                              // 808
var assert = require('./chai/interface/assert');                                                              // 809
exports.use(assert);                                                                                          // 810
                                                                                                              // 811
});                                                                                                           // 812
require.register("chai/lib/chai/assertion.js", function(exports, require, module){                            // 813
/*!                                                                                                           // 814
 * chai                                                                                                       // 815
 * http://chaijs.com                                                                                          // 816
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 817
 * MIT Licensed                                                                                               // 818
 */                                                                                                           // 819
                                                                                                              // 820
var config = require('./config');                                                                             // 821
                                                                                                              // 822
module.exports = function (_chai, util) {                                                                     // 823
  /*!                                                                                                         // 824
   * Module dependencies.                                                                                     // 825
   */                                                                                                         // 826
                                                                                                              // 827
  var AssertionError = _chai.AssertionError                                                                   // 828
    , flag = util.flag;                                                                                       // 829
                                                                                                              // 830
  /*!                                                                                                         // 831
   * Module export.                                                                                           // 832
   */                                                                                                         // 833
                                                                                                              // 834
  _chai.Assertion = Assertion;                                                                                // 835
                                                                                                              // 836
  /*!                                                                                                         // 837
   * Assertion Constructor                                                                                    // 838
   *                                                                                                          // 839
   * Creates object for chaining.                                                                             // 840
   *                                                                                                          // 841
   * @api private                                                                                             // 842
   */                                                                                                         // 843
                                                                                                              // 844
  function Assertion (obj, msg, stack) {                                                                      // 845
    flag(this, 'ssfi', stack || arguments.callee);                                                            // 846
    flag(this, 'object', obj);                                                                                // 847
    flag(this, 'message', msg);                                                                               // 848
  }                                                                                                           // 849
                                                                                                              // 850
  Object.defineProperty(Assertion, 'includeStack', {                                                          // 851
    get: function() {                                                                                         // 852
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');            // 853
      return config.includeStack;                                                                             // 854
    },                                                                                                        // 855
    set: function(value) {                                                                                    // 856
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');            // 857
      config.includeStack = value;                                                                            // 858
    }                                                                                                         // 859
  });                                                                                                         // 860
                                                                                                              // 861
  Object.defineProperty(Assertion, 'showDiff', {                                                              // 862
    get: function() {                                                                                         // 863
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');                    // 864
      return config.showDiff;                                                                                 // 865
    },                                                                                                        // 866
    set: function(value) {                                                                                    // 867
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');                    // 868
      config.showDiff = value;                                                                                // 869
    }                                                                                                         // 870
  });                                                                                                         // 871
                                                                                                              // 872
  Assertion.addProperty = function (name, fn) {                                                               // 873
    util.addProperty(this.prototype, name, fn);                                                               // 874
  };                                                                                                          // 875
                                                                                                              // 876
  Assertion.addMethod = function (name, fn) {                                                                 // 877
    util.addMethod(this.prototype, name, fn);                                                                 // 878
  };                                                                                                          // 879
                                                                                                              // 880
  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {                                      // 881
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);                                      // 882
  };                                                                                                          // 883
                                                                                                              // 884
  Assertion.overwriteProperty = function (name, fn) {                                                         // 885
    util.overwriteProperty(this.prototype, name, fn);                                                         // 886
  };                                                                                                          // 887
                                                                                                              // 888
  Assertion.overwriteMethod = function (name, fn) {                                                           // 889
    util.overwriteMethod(this.prototype, name, fn);                                                           // 890
  };                                                                                                          // 891
                                                                                                              // 892
  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {                                // 893
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);                                // 894
  };                                                                                                          // 895
                                                                                                              // 896
  /*!                                                                                                         // 897
   * ### .assert(expression, message, negateMessage, expected, actual)                                        // 898
   *                                                                                                          // 899
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass. // 900
   *                                                                                                          // 901
   * @name assert                                                                                             // 902
   * @param {Philosophical} expression to be tested                                                           // 903
   * @param {String or Function} message or function that returns message to display if fails                 // 904
   * @param {String or Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)                                           // 906
   * @param {Mixed} actual (optional) will default to `this.obj`                                              // 907
   * @api private                                                                                             // 908
   */                                                                                                         // 909
                                                                                                              // 910
  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {                 // 911
    var ok = util.test(this, arguments);                                                                      // 912
    if (true !== showDiff) showDiff = false;                                                                  // 913
    if (true !== config.showDiff) showDiff = false;                                                           // 914
                                                                                                              // 915
    if (!ok) {                                                                                                // 916
      var msg = util.getMessage(this, arguments)                                                              // 917
        , actual = util.getActual(this, arguments);                                                           // 918
      throw new AssertionError(msg, {                                                                         // 919
          actual: actual                                                                                      // 920
        , expected: expected                                                                                  // 921
        , showDiff: showDiff                                                                                  // 922
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));                                           // 923
    }                                                                                                         // 924
  };                                                                                                          // 925
                                                                                                              // 926
  /*!                                                                                                         // 927
   * ### ._obj                                                                                                // 928
   *                                                                                                          // 929
   * Quick reference to stored `actual` value for plugin developers.                                          // 930
   *                                                                                                          // 931
   * @api private                                                                                             // 932
   */                                                                                                         // 933
                                                                                                              // 934
  Object.defineProperty(Assertion.prototype, '_obj',                                                          // 935
    { get: function () {                                                                                      // 936
        return flag(this, 'object');                                                                          // 937
      }                                                                                                       // 938
    , set: function (val) {                                                                                   // 939
        flag(this, 'object', val);                                                                            // 940
      }                                                                                                       // 941
  });                                                                                                         // 942
};                                                                                                            // 943
                                                                                                              // 944
});                                                                                                           // 945
require.register("chai/lib/chai/config.js", function(exports, require, module){                               // 946
module.exports = {                                                                                            // 947
                                                                                                              // 948
  /**                                                                                                         // 949
   * ### config.includeStack                                                                                  // 950
   *                                                                                                          // 951
   * User configurable property, influences whether stack trace                                               // 952
   * is included in Assertion error message. Default of false                                                 // 953
   * suppresses stack trace in the error message.                                                             // 954
   *                                                                                                          // 955
   *     chai.config.includeStack = true;  // enable stack on error                                           // 956
   *                                                                                                          // 957
   * @param {Boolean}                                                                                         // 958
   * @api public                                                                                              // 959
   */                                                                                                         // 960
                                                                                                              // 961
   includeStack: false,                                                                                       // 962
                                                                                                              // 963
  /**                                                                                                         // 964
   * ### config.showDiff                                                                                      // 965
   *                                                                                                          // 966
   * User configurable property, influences whether or not                                                    // 967
   * the `showDiff` flag should be included in the thrown                                                     // 968
   * AssertionErrors. `false` will always be `false`; `true`                                                  // 969
   * will be true when the assertion has requested a diff                                                     // 970
   * be shown.                                                                                                // 971
   *                                                                                                          // 972
   * @param {Boolean}                                                                                         // 973
   * @api public                                                                                              // 974
   */                                                                                                         // 975
                                                                                                              // 976
  showDiff: true,                                                                                             // 977
                                                                                                              // 978
  /**                                                                                                         // 979
   * ### config.truncateThreshold                                                                             // 980
   *                                                                                                          // 981
   * User configurable property, sets length threshold for actual and                                         // 982
   * expected values in assertion errors. If this threshold is exceeded,                                      // 983
   * the value is truncated.                                                                                  // 984
   *                                                                                                          // 985
   * Set it to zero if you want to disable truncating altogether.                                             // 986
   *                                                                                                          // 987
   *     chai.config.truncateThreshold = 0;  // disable truncating                                            // 988
   *                                                                                                          // 989
   * @param {Number}                                                                                          // 990
   * @api public                                                                                              // 991
   */                                                                                                         // 992
                                                                                                              // 993
  truncateThreshold: 40                                                                                       // 994
                                                                                                              // 995
};                                                                                                            // 996
                                                                                                              // 997
});                                                                                                           // 998
require.register("chai/lib/chai/core/assertions.js", function(exports, require, module){                      // 999
/*!                                                                                                           // 1000
 * chai                                                                                                       // 1001
 * http://chaijs.com                                                                                          // 1002
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 1003
 * MIT Licensed                                                                                               // 1004
 */                                                                                                           // 1005
                                                                                                              // 1006
module.exports = function (chai, _) {                                                                         // 1007
  var Assertion = chai.Assertion                                                                              // 1008
    , toString = Object.prototype.toString                                                                    // 1009
    , flag = _.flag;                                                                                          // 1010
                                                                                                              // 1011
  /**                                                                                                         // 1012
   * ### Language Chains                                                                                      // 1013
   *                                                                                                          // 1014
   * The following are provided as chainable getters to                                                       // 1015
   * improve the readability of your assertions. They                                                         // 1016
   * do not provide testing capabilities unless they                                                          // 1017
   * have been overwritten by a plugin.                                                                       // 1018
   *                                                                                                          // 1019
   * **Chains**                                                                                               // 1020
   *                                                                                                          // 1021
   * - to                                                                                                     // 1022
   * - be                                                                                                     // 1023
   * - been                                                                                                   // 1024
   * - is                                                                                                     // 1025
   * - that                                                                                                   // 1026
   * - and                                                                                                    // 1027
   * - has                                                                                                    // 1028
   * - have                                                                                                   // 1029
   * - with                                                                                                   // 1030
   * - at                                                                                                     // 1031
   * - of                                                                                                     // 1032
   * - same                                                                                                   // 1033
   *                                                                                                          // 1034
   * @name language chains                                                                                    // 1035
   * @api public                                                                                              // 1036
   */                                                                                                         // 1037
                                                                                                              // 1038
  [ 'to', 'be', 'been'                                                                                        // 1039
  , 'is', 'and', 'has', 'have'                                                                                // 1040
  , 'with', 'that', 'at'                                                                                      // 1041
  , 'of', 'same' ].forEach(function (chain) {                                                                 // 1042
    Assertion.addProperty(chain, function () {                                                                // 1043
      return this;                                                                                            // 1044
    });                                                                                                       // 1045
  });                                                                                                         // 1046
                                                                                                              // 1047
  /**                                                                                                         // 1048
   * ### .not                                                                                                 // 1049
   *                                                                                                          // 1050
   * Negates any of assertions following in the chain.                                                        // 1051
   *                                                                                                          // 1052
   *     expect(foo).to.not.equal('bar');                                                                     // 1053
   *     expect(goodFn).to.not.throw(Error);                                                                  // 1054
   *     expect({ foo: 'baz' }).to.have.property('foo')                                                       // 1055
   *       .and.not.equal('bar');                                                                             // 1056
   *                                                                                                          // 1057
   * @name not                                                                                                // 1058
   * @api public                                                                                              // 1059
   */                                                                                                         // 1060
                                                                                                              // 1061
  Assertion.addProperty('not', function () {                                                                  // 1062
    flag(this, 'negate', true);                                                                               // 1063
  });                                                                                                         // 1064
                                                                                                              // 1065
  /**                                                                                                         // 1066
   * ### .deep                                                                                                // 1067
   *                                                                                                          // 1068
   * Sets the `deep` flag, later used by the `equal` and                                                      // 1069
   * `property` assertions.                                                                                   // 1070
   *                                                                                                          // 1071
   *     expect(foo).to.deep.equal({ bar: 'baz' });                                                           // 1072
   *     expect({ foo: { bar: { baz: 'quux' } } })                                                            // 1073
   *       .to.have.deep.property('foo.bar.baz', 'quux');                                                     // 1074
   *                                                                                                          // 1075
   * @name deep                                                                                               // 1076
   * @api public                                                                                              // 1077
   */                                                                                                         // 1078
                                                                                                              // 1079
  Assertion.addProperty('deep', function () {                                                                 // 1080
    flag(this, 'deep', true);                                                                                 // 1081
  });                                                                                                         // 1082
                                                                                                              // 1083
  /**                                                                                                         // 1084
   * ### .a(type)                                                                                             // 1085
   *                                                                                                          // 1086
   * The `a` and `an` assertions are aliases that can be                                                      // 1087
   * used either as language chains or to assert a value's                                                    // 1088
   * type.                                                                                                    // 1089
   *                                                                                                          // 1090
   *     // typeof                                                                                            // 1091
   *     expect('test').to.be.a('string');                                                                    // 1092
   *     expect({ foo: 'bar' }).to.be.an('object');                                                           // 1093
   *     expect(null).to.be.a('null');                                                                        // 1094
   *     expect(undefined).to.be.an('undefined');                                                             // 1095
   *                                                                                                          // 1096
   *     // language chain                                                                                    // 1097
   *     expect(foo).to.be.an.instanceof(Foo);                                                                // 1098
   *                                                                                                          // 1099
   * @name a                                                                                                  // 1100
   * @alias an                                                                                                // 1101
   * @param {String} type                                                                                     // 1102
   * @param {String} message _optional_                                                                       // 1103
   * @api public                                                                                              // 1104
   */                                                                                                         // 1105
                                                                                                              // 1106
  function an (type, msg) {                                                                                   // 1107
    if (msg) flag(this, 'message', msg);                                                                      // 1108
    type = type.toLowerCase();                                                                                // 1109
    var obj = flag(this, 'object')                                                                            // 1110
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';                        // 1111
                                                                                                              // 1112
    this.assert(                                                                                              // 1113
        type === _.type(obj)                                                                                  // 1114
      , 'expected #{this} to be ' + article + type                                                            // 1115
      , 'expected #{this} not to be ' + article + type                                                        // 1116
    );                                                                                                        // 1117
  }                                                                                                           // 1118
                                                                                                              // 1119
  Assertion.addChainableMethod('an', an);                                                                     // 1120
  Assertion.addChainableMethod('a', an);                                                                      // 1121
                                                                                                              // 1122
  /**                                                                                                         // 1123
   * ### .include(value)                                                                                      // 1124
   *                                                                                                          // 1125
   * The `include` and `contain` assertions can be used as either property                                    // 1126
   * based language chains or as methods to assert the inclusion of an object                                 // 1127
   * in an array or a substring in a string. When used as language chains,                                    // 1128
   * they toggle the `contain` flag for the `keys` assertion.                                                 // 1129
   *                                                                                                          // 1130
   *     expect([1,2,3]).to.include(2);                                                                       // 1131
   *     expect('foobar').to.contain('foo');                                                                  // 1132
   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');                                    // 1133
   *                                                                                                          // 1134
   * @name include                                                                                            // 1135
   * @alias contain                                                                                           // 1136
   * @param {Object|String|Number} obj                                                                        // 1137
   * @param {String} message _optional_                                                                       // 1138
   * @api public                                                                                              // 1139
   */                                                                                                         // 1140
                                                                                                              // 1141
  function includeChainingBehavior () {                                                                       // 1142
    flag(this, 'contains', true);                                                                             // 1143
  }                                                                                                           // 1144
                                                                                                              // 1145
  function include (val, msg) {                                                                               // 1146
    if (msg) flag(this, 'message', msg);                                                                      // 1147
    var obj = flag(this, 'object');                                                                           // 1148
    var expected = false;                                                                                     // 1149
    if (_.type(obj) === 'array' && _.type(val) === 'object') {                                                // 1150
      for (var i in obj) {                                                                                    // 1151
        if (_.eql(obj[i], val)) {                                                                             // 1152
          expected = true;                                                                                    // 1153
          break;                                                                                              // 1154
        }                                                                                                     // 1155
      }                                                                                                       // 1156
    } else if (_.type(val) === 'object') {                                                                    // 1157
      if (!flag(this, 'negate')) {                                                                            // 1158
        for (var k in val) new Assertion(obj).property(k, val[k]);                                            // 1159
        return;                                                                                               // 1160
      }                                                                                                       // 1161
      var subset = {}                                                                                         // 1162
      for (var k in val) subset[k] = obj[k]                                                                   // 1163
      expected = _.eql(subset, val);                                                                          // 1164
    } else {                                                                                                  // 1165
      expected = obj && ~obj.indexOf(val)                                                                     // 1166
    }                                                                                                         // 1167
    this.assert(                                                                                              // 1168
        expected                                                                                              // 1169
      , 'expected #{this} to include ' + _.inspect(val)                                                       // 1170
      , 'expected #{this} to not include ' + _.inspect(val));                                                 // 1171
  }                                                                                                           // 1172
                                                                                                              // 1173
  Assertion.addChainableMethod('include', include, includeChainingBehavior);                                  // 1174
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);                                  // 1175
                                                                                                              // 1176
  /**                                                                                                         // 1177
   * ### .ok                                                                                                  // 1178
   *                                                                                                          // 1179
   * Asserts that the target is truthy.                                                                       // 1180
   *                                                                                                          // 1181
   *     expect('everthing').to.be.ok;                                                                        // 1182
   *     expect(1).to.be.ok;                                                                                  // 1183
   *     expect(false).to.not.be.ok;                                                                          // 1184
   *     expect(undefined).to.not.be.ok;                                                                      // 1185
   *     expect(null).to.not.be.ok;                                                                           // 1186
   *                                                                                                          // 1187
   * @name ok                                                                                                 // 1188
   * @api public                                                                                              // 1189
   */                                                                                                         // 1190
                                                                                                              // 1191
  Assertion.addProperty('ok', function () {                                                                   // 1192
    this.assert(                                                                                              // 1193
        flag(this, 'object')                                                                                  // 1194
      , 'expected #{this} to be truthy'                                                                       // 1195
      , 'expected #{this} to be falsy');                                                                      // 1196
  });                                                                                                         // 1197
                                                                                                              // 1198
  /**                                                                                                         // 1199
   * ### .true                                                                                                // 1200
   *                                                                                                          // 1201
   * Asserts that the target is `true`.                                                                       // 1202
   *                                                                                                          // 1203
   *     expect(true).to.be.true;                                                                             // 1204
   *     expect(1).to.not.be.true;                                                                            // 1205
   *                                                                                                          // 1206
   * @name true                                                                                               // 1207
   * @api public                                                                                              // 1208
   */                                                                                                         // 1209
                                                                                                              // 1210
  Assertion.addProperty('true', function () {                                                                 // 1211
    this.assert(                                                                                              // 1212
        true === flag(this, 'object')                                                                         // 1213
      , 'expected #{this} to be true'                                                                         // 1214
      , 'expected #{this} to be false'                                                                        // 1215
      , this.negate ? false : true                                                                            // 1216
    );                                                                                                        // 1217
  });                                                                                                         // 1218
                                                                                                              // 1219
  /**                                                                                                         // 1220
   * ### .false                                                                                               // 1221
   *                                                                                                          // 1222
   * Asserts that the target is `false`.                                                                      // 1223
   *                                                                                                          // 1224
   *     expect(false).to.be.false;                                                                           // 1225
   *     expect(0).to.not.be.false;                                                                           // 1226
   *                                                                                                          // 1227
   * @name false                                                                                              // 1228
   * @api public                                                                                              // 1229
   */                                                                                                         // 1230
                                                                                                              // 1231
  Assertion.addProperty('false', function () {                                                                // 1232
    this.assert(                                                                                              // 1233
        false === flag(this, 'object')                                                                        // 1234
      , 'expected #{this} to be false'                                                                        // 1235
      , 'expected #{this} to be true'                                                                         // 1236
      , this.negate ? true : false                                                                            // 1237
    );                                                                                                        // 1238
  });                                                                                                         // 1239
                                                                                                              // 1240
  /**                                                                                                         // 1241
   * ### .null                                                                                                // 1242
   *                                                                                                          // 1243
   * Asserts that the target is `null`.                                                                       // 1244
   *                                                                                                          // 1245
   *     expect(null).to.be.null;                                                                             // 1246
   *     expect(undefined).not.to.be.null;                                                                    // 1247
   *                                                                                                          // 1248
   * @name null                                                                                               // 1249
   * @api public                                                                                              // 1250
   */                                                                                                         // 1251
                                                                                                              // 1252
  Assertion.addProperty('null', function () {                                                                 // 1253
    this.assert(                                                                                              // 1254
        null === flag(this, 'object')                                                                         // 1255
      , 'expected #{this} to be null'                                                                         // 1256
      , 'expected #{this} not to be null'                                                                     // 1257
    );                                                                                                        // 1258
  });                                                                                                         // 1259
                                                                                                              // 1260
  /**                                                                                                         // 1261
   * ### .undefined                                                                                           // 1262
   *                                                                                                          // 1263
   * Asserts that the target is `undefined`.                                                                  // 1264
   *                                                                                                          // 1265
   *     expect(undefined).to.be.undefined;                                                                   // 1266
   *     expect(null).to.not.be.undefined;                                                                    // 1267
   *                                                                                                          // 1268
   * @name undefined                                                                                          // 1269
   * @api public                                                                                              // 1270
   */                                                                                                         // 1271
                                                                                                              // 1272
  Assertion.addProperty('undefined', function () {                                                            // 1273
    this.assert(                                                                                              // 1274
        undefined === flag(this, 'object')                                                                    // 1275
      , 'expected #{this} to be undefined'                                                                    // 1276
      , 'expected #{this} not to be undefined'                                                                // 1277
    );                                                                                                        // 1278
  });                                                                                                         // 1279
                                                                                                              // 1280
  /**                                                                                                         // 1281
   * ### .exist                                                                                               // 1282
   *                                                                                                          // 1283
   * Asserts that the target is neither `null` nor `undefined`.                                               // 1284
   *                                                                                                          // 1285
   *     var foo = 'hi'                                                                                       // 1286
   *       , bar = null                                                                                       // 1287
   *       , baz;                                                                                             // 1288
   *                                                                                                          // 1289
   *     expect(foo).to.exist;                                                                                // 1290
   *     expect(bar).to.not.exist;                                                                            // 1291
   *     expect(baz).to.not.exist;                                                                            // 1292
   *                                                                                                          // 1293
   * @name exist                                                                                              // 1294
   * @api public                                                                                              // 1295
   */                                                                                                         // 1296
                                                                                                              // 1297
  Assertion.addProperty('exist', function () {                                                                // 1298
    this.assert(                                                                                              // 1299
        null != flag(this, 'object')                                                                          // 1300
      , 'expected #{this} to exist'                                                                           // 1301
      , 'expected #{this} to not exist'                                                                       // 1302
    );                                                                                                        // 1303
  });                                                                                                         // 1304
                                                                                                              // 1305
                                                                                                              // 1306
  /**                                                                                                         // 1307
   * ### .empty                                                                                               // 1308
   *                                                                                                          // 1309
   * Asserts that the target's length is `0`. For arrays, it checks                                           // 1310
   * the `length` property. For objects, it gets the count of                                                 // 1311
   * enumerable keys.                                                                                         // 1312
   *                                                                                                          // 1313
   *     expect([]).to.be.empty;                                                                              // 1314
   *     expect('').to.be.empty;                                                                              // 1315
   *     expect({}).to.be.empty;                                                                              // 1316
   *                                                                                                          // 1317
   * @name empty                                                                                              // 1318
   * @api public                                                                                              // 1319
   */                                                                                                         // 1320
                                                                                                              // 1321
  Assertion.addProperty('empty', function () {                                                                // 1322
    var obj = flag(this, 'object')                                                                            // 1323
      , expected = obj;                                                                                       // 1324
                                                                                                              // 1325
    if (Array.isArray(obj) || 'string' === typeof object) {                                                   // 1326
      expected = obj.length;                                                                                  // 1327
    } else if (typeof obj === 'object') {                                                                     // 1328
      expected = Object.keys(obj).length;                                                                     // 1329
    }                                                                                                         // 1330
                                                                                                              // 1331
    this.assert(                                                                                              // 1332
        !expected                                                                                             // 1333
      , 'expected #{this} to be empty'                                                                        // 1334
      , 'expected #{this} not to be empty'                                                                    // 1335
    );                                                                                                        // 1336
  });                                                                                                         // 1337
                                                                                                              // 1338
  /**                                                                                                         // 1339
   * ### .arguments                                                                                           // 1340
   *                                                                                                          // 1341
   * Asserts that the target is an arguments object.                                                          // 1342
   *                                                                                                          // 1343
   *     function test () {                                                                                   // 1344
   *       expect(arguments).to.be.arguments;                                                                 // 1345
   *     }                                                                                                    // 1346
   *                                                                                                          // 1347
   * @name arguments                                                                                          // 1348
   * @alias Arguments                                                                                         // 1349
   * @api public                                                                                              // 1350
   */                                                                                                         // 1351
                                                                                                              // 1352
  function checkArguments () {                                                                                // 1353
    var obj = flag(this, 'object')                                                                            // 1354
      , type = Object.prototype.toString.call(obj);                                                           // 1355
    this.assert(                                                                                              // 1356
        '[object Arguments]' === type                                                                         // 1357
      , 'expected #{this} to be arguments but got ' + type                                                    // 1358
      , 'expected #{this} to not be arguments'                                                                // 1359
    );                                                                                                        // 1360
  }                                                                                                           // 1361
                                                                                                              // 1362
  Assertion.addProperty('arguments', checkArguments);                                                         // 1363
  Assertion.addProperty('Arguments', checkArguments);                                                         // 1364
                                                                                                              // 1365
  /**                                                                                                         // 1366
   * ### .equal(value)                                                                                        // 1367
   *                                                                                                          // 1368
   * Asserts that the target is strictly equal (`===`) to `value`.                                            // 1369
   * Alternately, if the `deep` flag is set, asserts that                                                     // 1370
   * the target is deeply equal to `value`.                                                                   // 1371
   *                                                                                                          // 1372
   *     expect('hello').to.equal('hello');                                                                   // 1373
   *     expect(42).to.equal(42);                                                                             // 1374
   *     expect(1).to.not.equal(true);                                                                        // 1375
   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });                                                 // 1376
   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });                                                // 1377
   *                                                                                                          // 1378
   * @name equal                                                                                              // 1379
   * @alias equals                                                                                            // 1380
   * @alias eq                                                                                                // 1381
   * @alias deep.equal                                                                                        // 1382
   * @param {Mixed} value                                                                                     // 1383
   * @param {String} message _optional_                                                                       // 1384
   * @api public                                                                                              // 1385
   */                                                                                                         // 1386
                                                                                                              // 1387
  function assertEqual (val, msg) {                                                                           // 1388
    if (msg) flag(this, 'message', msg);                                                                      // 1389
    var obj = flag(this, 'object');                                                                           // 1390
    if (flag(this, 'deep')) {                                                                                 // 1391
      return this.eql(val);                                                                                   // 1392
    } else {                                                                                                  // 1393
      this.assert(                                                                                            // 1394
          val === obj                                                                                         // 1395
        , 'expected #{this} to equal #{exp}'                                                                  // 1396
        , 'expected #{this} to not equal #{exp}'                                                              // 1397
        , val                                                                                                 // 1398
        , this._obj                                                                                           // 1399
        , true                                                                                                // 1400
      );                                                                                                      // 1401
    }                                                                                                         // 1402
  }                                                                                                           // 1403
                                                                                                              // 1404
  Assertion.addMethod('equal', assertEqual);                                                                  // 1405
  Assertion.addMethod('equals', assertEqual);                                                                 // 1406
  Assertion.addMethod('eq', assertEqual);                                                                     // 1407
                                                                                                              // 1408
  /**                                                                                                         // 1409
   * ### .eql(value)                                                                                          // 1410
   *                                                                                                          // 1411
   * Asserts that the target is deeply equal to `value`.                                                      // 1412
   *                                                                                                          // 1413
   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });                                                       // 1414
   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);                                                             // 1415
   *                                                                                                          // 1416
   * @name eql                                                                                                // 1417
   * @alias eqls                                                                                              // 1418
   * @param {Mixed} value                                                                                     // 1419
   * @param {String} message _optional_                                                                       // 1420
   * @api public                                                                                              // 1421
   */                                                                                                         // 1422
                                                                                                              // 1423
  function assertEql(obj, msg) {                                                                              // 1424
    if (msg) flag(this, 'message', msg);                                                                      // 1425
    this.assert(                                                                                              // 1426
        _.eql(obj, flag(this, 'object'))                                                                      // 1427
      , 'expected #{this} to deeply equal #{exp}'                                                             // 1428
      , 'expected #{this} to not deeply equal #{exp}'                                                         // 1429
      , obj                                                                                                   // 1430
      , this._obj                                                                                             // 1431
      , true                                                                                                  // 1432
    );                                                                                                        // 1433
  }                                                                                                           // 1434
                                                                                                              // 1435
  Assertion.addMethod('eql', assertEql);                                                                      // 1436
  Assertion.addMethod('eqls', assertEql);                                                                     // 1437
                                                                                                              // 1438
  /**                                                                                                         // 1439
   * ### .above(value)                                                                                        // 1440
   *                                                                                                          // 1441
   * Asserts that the target is greater than `value`.                                                         // 1442
   *                                                                                                          // 1443
   *     expect(10).to.be.above(5);                                                                           // 1444
   *                                                                                                          // 1445
   * Can also be used in conjunction with `length` to                                                         // 1446
   * assert a minimum length. The benefit being a                                                             // 1447
   * more informative error message than if the length                                                        // 1448
   * was supplied directly.                                                                                   // 1449
   *                                                                                                          // 1450
   *     expect('foo').to.have.length.above(2);                                                               // 1451
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);                                                         // 1452
   *                                                                                                          // 1453
   * @name above                                                                                              // 1454
   * @alias gt                                                                                                // 1455
   * @alias greaterThan                                                                                       // 1456
   * @param {Number} value                                                                                    // 1457
   * @param {String} message _optional_                                                                       // 1458
   * @api public                                                                                              // 1459
   */                                                                                                         // 1460
                                                                                                              // 1461
  function assertAbove (n, msg) {                                                                             // 1462
    if (msg) flag(this, 'message', msg);                                                                      // 1463
    var obj = flag(this, 'object');                                                                           // 1464
    if (flag(this, 'doLength')) {                                                                             // 1465
      new Assertion(obj, msg).to.have.property('length');                                                     // 1466
      var len = obj.length;                                                                                   // 1467
      this.assert(                                                                                            // 1468
          len > n                                                                                             // 1469
        , 'expected #{this} to have a length above #{exp} but got #{act}'                                     // 1470
        , 'expected #{this} to not have a length above #{exp}'                                                // 1471
        , n                                                                                                   // 1472
        , len                                                                                                 // 1473
      );                                                                                                      // 1474
    } else {                                                                                                  // 1475
      this.assert(                                                                                            // 1476
          obj > n                                                                                             // 1477
        , 'expected #{this} to be above ' + n                                                                 // 1478
        , 'expected #{this} to be at most ' + n                                                               // 1479
      );                                                                                                      // 1480
    }                                                                                                         // 1481
  }                                                                                                           // 1482
                                                                                                              // 1483
  Assertion.addMethod('above', assertAbove);                                                                  // 1484
  Assertion.addMethod('gt', assertAbove);                                                                     // 1485
  Assertion.addMethod('greaterThan', assertAbove);                                                            // 1486
                                                                                                              // 1487
  /**                                                                                                         // 1488
   * ### .least(value)                                                                                        // 1489
   *                                                                                                          // 1490
   * Asserts that the target is greater than or equal to `value`.                                             // 1491
   *                                                                                                          // 1492
   *     expect(10).to.be.at.least(10);                                                                       // 1493
   *                                                                                                          // 1494
   * Can also be used in conjunction with `length` to                                                         // 1495
   * assert a minimum length. The benefit being a                                                             // 1496
   * more informative error message than if the length                                                        // 1497
   * was supplied directly.                                                                                   // 1498
   *                                                                                                          // 1499
   *     expect('foo').to.have.length.of.at.least(2);                                                         // 1500
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);                                                   // 1501
   *                                                                                                          // 1502
   * @name least                                                                                              // 1503
   * @alias gte                                                                                               // 1504
   * @param {Number} value                                                                                    // 1505
   * @param {String} message _optional_                                                                       // 1506
   * @api public                                                                                              // 1507
   */                                                                                                         // 1508
                                                                                                              // 1509
  function assertLeast (n, msg) {                                                                             // 1510
    if (msg) flag(this, 'message', msg);                                                                      // 1511
    var obj = flag(this, 'object');                                                                           // 1512
    if (flag(this, 'doLength')) {                                                                             // 1513
      new Assertion(obj, msg).to.have.property('length');                                                     // 1514
      var len = obj.length;                                                                                   // 1515
      this.assert(                                                                                            // 1516
          len >= n                                                                                            // 1517
        , 'expected #{this} to have a length at least #{exp} but got #{act}'                                  // 1518
        , 'expected #{this} to have a length below #{exp}'                                                    // 1519
        , n                                                                                                   // 1520
        , len                                                                                                 // 1521
      );                                                                                                      // 1522
    } else {                                                                                                  // 1523
      this.assert(                                                                                            // 1524
          obj >= n                                                                                            // 1525
        , 'expected #{this} to be at least ' + n                                                              // 1526
        , 'expected #{this} to be below ' + n                                                                 // 1527
      );                                                                                                      // 1528
    }                                                                                                         // 1529
  }                                                                                                           // 1530
                                                                                                              // 1531
  Assertion.addMethod('least', assertLeast);                                                                  // 1532
  Assertion.addMethod('gte', assertLeast);                                                                    // 1533
                                                                                                              // 1534
  /**                                                                                                         // 1535
   * ### .below(value)                                                                                        // 1536
   *                                                                                                          // 1537
   * Asserts that the target is less than `value`.                                                            // 1538
   *                                                                                                          // 1539
   *     expect(5).to.be.below(10);                                                                           // 1540
   *                                                                                                          // 1541
   * Can also be used in conjunction with `length` to                                                         // 1542
   * assert a maximum length. The benefit being a                                                             // 1543
   * more informative error message than if the length                                                        // 1544
   * was supplied directly.                                                                                   // 1545
   *                                                                                                          // 1546
   *     expect('foo').to.have.length.below(4);                                                               // 1547
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);                                                         // 1548
   *                                                                                                          // 1549
   * @name below                                                                                              // 1550
   * @alias lt                                                                                                // 1551
   * @alias lessThan                                                                                          // 1552
   * @param {Number} value                                                                                    // 1553
   * @param {String} message _optional_                                                                       // 1554
   * @api public                                                                                              // 1555
   */                                                                                                         // 1556
                                                                                                              // 1557
  function assertBelow (n, msg) {                                                                             // 1558
    if (msg) flag(this, 'message', msg);                                                                      // 1559
    var obj = flag(this, 'object');                                                                           // 1560
    if (flag(this, 'doLength')) {                                                                             // 1561
      new Assertion(obj, msg).to.have.property('length');                                                     // 1562
      var len = obj.length;                                                                                   // 1563
      this.assert(                                                                                            // 1564
          len < n                                                                                             // 1565
        , 'expected #{this} to have a length below #{exp} but got #{act}'                                     // 1566
        , 'expected #{this} to not have a length below #{exp}'                                                // 1567
        , n                                                                                                   // 1568
        , len                                                                                                 // 1569
      );                                                                                                      // 1570
    } else {                                                                                                  // 1571
      this.assert(                                                                                            // 1572
          obj < n                                                                                             // 1573
        , 'expected #{this} to be below ' + n                                                                 // 1574
        , 'expected #{this} to be at least ' + n                                                              // 1575
      );                                                                                                      // 1576
    }                                                                                                         // 1577
  }                                                                                                           // 1578
                                                                                                              // 1579
  Assertion.addMethod('below', assertBelow);                                                                  // 1580
  Assertion.addMethod('lt', assertBelow);                                                                     // 1581
  Assertion.addMethod('lessThan', assertBelow);                                                               // 1582
                                                                                                              // 1583
  /**                                                                                                         // 1584
   * ### .most(value)                                                                                         // 1585
   *                                                                                                          // 1586
   * Asserts that the target is less than or equal to `value`.                                                // 1587
   *                                                                                                          // 1588
   *     expect(5).to.be.at.most(5);                                                                          // 1589
   *                                                                                                          // 1590
   * Can also be used in conjunction with `length` to                                                         // 1591
   * assert a maximum length. The benefit being a                                                             // 1592
   * more informative error message than if the length                                                        // 1593
   * was supplied directly.                                                                                   // 1594
   *                                                                                                          // 1595
   *     expect('foo').to.have.length.of.at.most(4);                                                          // 1596
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);                                                    // 1597
   *                                                                                                          // 1598
   * @name most                                                                                               // 1599
   * @alias lte                                                                                               // 1600
   * @param {Number} value                                                                                    // 1601
   * @param {String} message _optional_                                                                       // 1602
   * @api public                                                                                              // 1603
   */                                                                                                         // 1604
                                                                                                              // 1605
  function assertMost (n, msg) {                                                                              // 1606
    if (msg) flag(this, 'message', msg);                                                                      // 1607
    var obj = flag(this, 'object');                                                                           // 1608
    if (flag(this, 'doLength')) {                                                                             // 1609
      new Assertion(obj, msg).to.have.property('length');                                                     // 1610
      var len = obj.length;                                                                                   // 1611
      this.assert(                                                                                            // 1612
          len <= n                                                                                            // 1613
        , 'expected #{this} to have a length at most #{exp} but got #{act}'                                   // 1614
        , 'expected #{this} to have a length above #{exp}'                                                    // 1615
        , n                                                                                                   // 1616
        , len                                                                                                 // 1617
      );                                                                                                      // 1618
    } else {                                                                                                  // 1619
      this.assert(                                                                                            // 1620
          obj <= n                                                                                            // 1621
        , 'expected #{this} to be at most ' + n                                                               // 1622
        , 'expected #{this} to be above ' + n                                                                 // 1623
      );                                                                                                      // 1624
    }                                                                                                         // 1625
  }                                                                                                           // 1626
                                                                                                              // 1627
  Assertion.addMethod('most', assertMost);                                                                    // 1628
  Assertion.addMethod('lte', assertMost);                                                                     // 1629
                                                                                                              // 1630
  /**                                                                                                         // 1631
   * ### .within(start, finish)                                                                               // 1632
   *                                                                                                          // 1633
   * Asserts that the target is within a range.                                                               // 1634
   *                                                                                                          // 1635
   *     expect(7).to.be.within(5,10);                                                                        // 1636
   *                                                                                                          // 1637
   * Can also be used in conjunction with `length` to                                                         // 1638
   * assert a length range. The benefit being a                                                               // 1639
   * more informative error message than if the length                                                        // 1640
   * was supplied directly.                                                                                   // 1641
   *                                                                                                          // 1642
   *     expect('foo').to.have.length.within(2,4);                                                            // 1643
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);                                                      // 1644
   *                                                                                                          // 1645
   * @name within                                                                                             // 1646
   * @param {Number} start lowerbound inclusive                                                               // 1647
   * @param {Number} finish upperbound inclusive                                                              // 1648
   * @param {String} message _optional_                                                                       // 1649
   * @api public                                                                                              // 1650
   */                                                                                                         // 1651
                                                                                                              // 1652
  Assertion.addMethod('within', function (start, finish, msg) {                                               // 1653
    if (msg) flag(this, 'message', msg);                                                                      // 1654
    var obj = flag(this, 'object')                                                                            // 1655
      , range = start + '..' + finish;                                                                        // 1656
    if (flag(this, 'doLength')) {                                                                             // 1657
      new Assertion(obj, msg).to.have.property('length');                                                     // 1658
      var len = obj.length;                                                                                   // 1659
      this.assert(                                                                                            // 1660
          len >= start && len <= finish                                                                       // 1661
        , 'expected #{this} to have a length within ' + range                                                 // 1662
        , 'expected #{this} to not have a length within ' + range                                             // 1663
      );                                                                                                      // 1664
    } else {                                                                                                  // 1665
      this.assert(                                                                                            // 1666
          obj >= start && obj <= finish                                                                       // 1667
        , 'expected #{this} to be within ' + range                                                            // 1668
        , 'expected #{this} to not be within ' + range                                                        // 1669
      );                                                                                                      // 1670
    }                                                                                                         // 1671
  });                                                                                                         // 1672
                                                                                                              // 1673
  /**                                                                                                         // 1674
   * ### .instanceof(constructor)                                                                             // 1675
   *                                                                                                          // 1676
   * Asserts that the target is an instance of `constructor`.                                                 // 1677
   *                                                                                                          // 1678
   *     var Tea = function (name) { this.name = name; }                                                      // 1679
   *       , Chai = new Tea('chai');                                                                          // 1680
   *                                                                                                          // 1681
   *     expect(Chai).to.be.an.instanceof(Tea);                                                               // 1682
   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);                                                         // 1683
   *                                                                                                          // 1684
   * @name instanceof                                                                                         // 1685
   * @param {Constructor} constructor                                                                         // 1686
   * @param {String} message _optional_                                                                       // 1687
   * @alias instanceOf                                                                                        // 1688
   * @api public                                                                                              // 1689
   */                                                                                                         // 1690
                                                                                                              // 1691
  function assertInstanceOf (constructor, msg) {                                                              // 1692
    if (msg) flag(this, 'message', msg);                                                                      // 1693
    var name = _.getName(constructor);                                                                        // 1694
    this.assert(                                                                                              // 1695
        flag(this, 'object') instanceof constructor                                                           // 1696
      , 'expected #{this} to be an instance of ' + name                                                       // 1697
      , 'expected #{this} to not be an instance of ' + name                                                   // 1698
    );                                                                                                        // 1699
  };                                                                                                          // 1700
                                                                                                              // 1701
  Assertion.addMethod('instanceof', assertInstanceOf);                                                        // 1702
  Assertion.addMethod('instanceOf', assertInstanceOf);                                                        // 1703
                                                                                                              // 1704
  /**                                                                                                         // 1705
   * ### .property(name, [value])                                                                             // 1706
   *                                                                                                          // 1707
   * Asserts that the target has a property `name`, optionally asserting that                                 // 1708
   * the value of that property is strictly equal to  `value`.                                                // 1709
   * If the `deep` flag is set, you can use dot- and bracket-notation for deep                                // 1710
   * references into objects and arrays.                                                                      // 1711
   *                                                                                                          // 1712
   *     // simple referencing                                                                                // 1713
   *     var obj = { foo: 'bar' };                                                                            // 1714
   *     expect(obj).to.have.property('foo');                                                                 // 1715
   *     expect(obj).to.have.property('foo', 'bar');                                                          // 1716
   *                                                                                                          // 1717
   *     // deep referencing                                                                                  // 1718
   *     var deepObj = {                                                                                      // 1719
   *         green: { tea: 'matcha' }                                                                         // 1720
   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]                                                   // 1721
   *     };                                                                                                   // 1722
                                                                                                              // 1723
   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');                                        // 1724
   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');                                          // 1725
   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');                                     // 1726
   *                                                                                                          // 1727
   * You can also use an array as the starting point of a `deep.property`                                     // 1728
   * assertion, or traverse nested arrays.                                                                    // 1729
   *                                                                                                          // 1730
   *     var arr = [                                                                                          // 1731
   *         [ 'chai', 'matcha', 'konacha' ]                                                                  // 1732
   *       , [ { tea: 'chai' }                                                                                // 1733
   *         , { tea: 'matcha' }                                                                              // 1734
   *         , { tea: 'konacha' } ]                                                                           // 1735
   *     ];                                                                                                   // 1736
   *                                                                                                          // 1737
   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');                                               // 1738
   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');                                          // 1739
   *                                                                                                          // 1740
   * Furthermore, `property` changes the subject of the assertion                                             // 1741
   * to be the value of that property from the original object. This                                          // 1742
   * permits for further chainable assertions on that property.                                               // 1743
   *                                                                                                          // 1744
   *     expect(obj).to.have.property('foo')                                                                  // 1745
   *       .that.is.a('string');                                                                              // 1746
   *     expect(deepObj).to.have.property('green')                                                            // 1747
   *       .that.is.an('object')                                                                              // 1748
   *       .that.deep.equals({ tea: 'matcha' });                                                              // 1749
   *     expect(deepObj).to.have.property('teas')                                                             // 1750
   *       .that.is.an('array')                                                                               // 1751
   *       .with.deep.property('[2]')                                                                         // 1752
   *         .that.deep.equals({ tea: 'konacha' });                                                           // 1753
   *                                                                                                          // 1754
   * @name property                                                                                           // 1755
   * @alias deep.property                                                                                     // 1756
   * @param {String} name                                                                                     // 1757
   * @param {Mixed} value (optional)                                                                          // 1758
   * @param {String} message _optional_                                                                       // 1759
   * @returns value of property for chaining                                                                  // 1760
   * @api public                                                                                              // 1761
   */                                                                                                         // 1762
                                                                                                              // 1763
  Assertion.addMethod('property', function (name, val, msg) {                                                 // 1764
    if (msg) flag(this, 'message', msg);                                                                      // 1765
                                                                                                              // 1766
    var descriptor = flag(this, 'deep') ? 'deep property ' : 'property '                                      // 1767
      , negate = flag(this, 'negate')                                                                         // 1768
      , obj = flag(this, 'object')                                                                            // 1769
      , value = flag(this, 'deep')                                                                            // 1770
        ? _.getPathValue(name, obj)                                                                           // 1771
        : obj[name];                                                                                          // 1772
                                                                                                              // 1773
    if (negate && undefined !== val) {                                                                        // 1774
      if (undefined === value) {                                                                              // 1775
        msg = (msg != null) ? msg + ': ' : '';                                                                // 1776
        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));                    // 1777
      }                                                                                                       // 1778
    } else {                                                                                                  // 1779
      this.assert(                                                                                            // 1780
          undefined !== value                                                                                 // 1781
        , 'expected #{this} to have a ' + descriptor + _.inspect(name)                                        // 1782
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));                                    // 1783
    }                                                                                                         // 1784
                                                                                                              // 1785
    if (undefined !== val) {                                                                                  // 1786
      this.assert(                                                                                            // 1787
          val === value                                                                                       // 1788
        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'         // 1789
        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'                     // 1790
        , val                                                                                                 // 1791
        , value                                                                                               // 1792
      );                                                                                                      // 1793
    }                                                                                                         // 1794
                                                                                                              // 1795
    flag(this, 'object', value);                                                                              // 1796
  });                                                                                                         // 1797
                                                                                                              // 1798
                                                                                                              // 1799
  /**                                                                                                         // 1800
   * ### .ownProperty(name)                                                                                   // 1801
   *                                                                                                          // 1802
   * Asserts that the target has an own property `name`.                                                      // 1803
   *                                                                                                          // 1804
   *     expect('test').to.have.ownProperty('length');                                                        // 1805
   *                                                                                                          // 1806
   * @name ownProperty                                                                                        // 1807
   * @alias haveOwnProperty                                                                                   // 1808
   * @param {String} name                                                                                     // 1809
   * @param {String} message _optional_                                                                       // 1810
   * @api public                                                                                              // 1811
   */                                                                                                         // 1812
                                                                                                              // 1813
  function assertOwnProperty (name, msg) {                                                                    // 1814
    if (msg) flag(this, 'message', msg);                                                                      // 1815
    var obj = flag(this, 'object');                                                                           // 1816
    this.assert(                                                                                              // 1817
        obj.hasOwnProperty(name)                                                                              // 1818
      , 'expected #{this} to have own property ' + _.inspect(name)                                            // 1819
      , 'expected #{this} to not have own property ' + _.inspect(name)                                        // 1820
    );                                                                                                        // 1821
  }                                                                                                           // 1822
                                                                                                              // 1823
  Assertion.addMethod('ownProperty', assertOwnProperty);                                                      // 1824
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);                                                  // 1825
                                                                                                              // 1826
  /**                                                                                                         // 1827
   * ### .length(value)                                                                                       // 1828
   *                                                                                                          // 1829
   * Asserts that the target's `length` property has                                                          // 1830
   * the expected value.                                                                                      // 1831
   *                                                                                                          // 1832
   *     expect([ 1, 2, 3]).to.have.length(3);                                                                // 1833
   *     expect('foobar').to.have.length(6);                                                                  // 1834
   *                                                                                                          // 1835
   * Can also be used as a chain precursor to a value                                                         // 1836
   * comparison for the length property.                                                                      // 1837
   *                                                                                                          // 1838
   *     expect('foo').to.have.length.above(2);                                                               // 1839
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);                                                         // 1840
   *     expect('foo').to.have.length.below(4);                                                               // 1841
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);                                                         // 1842
   *     expect('foo').to.have.length.within(2,4);                                                            // 1843
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);                                                      // 1844
   *                                                                                                          // 1845
   * @name length                                                                                             // 1846
   * @alias lengthOf                                                                                          // 1847
   * @param {Number} length                                                                                   // 1848
   * @param {String} message _optional_                                                                       // 1849
   * @api public                                                                                              // 1850
   */                                                                                                         // 1851
                                                                                                              // 1852
  function assertLengthChain () {                                                                             // 1853
    flag(this, 'doLength', true);                                                                             // 1854
  }                                                                                                           // 1855
                                                                                                              // 1856
  function assertLength (n, msg) {                                                                            // 1857
    if (msg) flag(this, 'message', msg);                                                                      // 1858
    var obj = flag(this, 'object');                                                                           // 1859
    new Assertion(obj, msg).to.have.property('length');                                                       // 1860
    var len = obj.length;                                                                                     // 1861
                                                                                                              // 1862
    this.assert(                                                                                              // 1863
        len == n                                                                                              // 1864
      , 'expected #{this} to have a length of #{exp} but got #{act}'                                          // 1865
      , 'expected #{this} to not have a length of #{act}'                                                     // 1866
      , n                                                                                                     // 1867
      , len                                                                                                   // 1868
    );                                                                                                        // 1869
  }                                                                                                           // 1870
                                                                                                              // 1871
  Assertion.addChainableMethod('length', assertLength, assertLengthChain);                                    // 1872
  Assertion.addMethod('lengthOf', assertLength);                                                              // 1873
                                                                                                              // 1874
  /**                                                                                                         // 1875
   * ### .match(regexp)                                                                                       // 1876
   *                                                                                                          // 1877
   * Asserts that the target matches a regular expression.                                                    // 1878
   *                                                                                                          // 1879
   *     expect('foobar').to.match(/^foo/);                                                                   // 1880
   *                                                                                                          // 1881
   * @name match                                                                                              // 1882
   * @param {RegExp} RegularExpression                                                                        // 1883
   * @param {String} message _optional_                                                                       // 1884
   * @api public                                                                                              // 1885
   */                                                                                                         // 1886
                                                                                                              // 1887
  Assertion.addMethod('match', function (re, msg) {                                                           // 1888
    if (msg) flag(this, 'message', msg);                                                                      // 1889
    var obj = flag(this, 'object');                                                                           // 1890
    this.assert(                                                                                              // 1891
        re.exec(obj)                                                                                          // 1892
      , 'expected #{this} to match ' + re                                                                     // 1893
      , 'expected #{this} not to match ' + re                                                                 // 1894
    );                                                                                                        // 1895
  });                                                                                                         // 1896
                                                                                                              // 1897
  /**                                                                                                         // 1898
   * ### .string(string)                                                                                      // 1899
   *                                                                                                          // 1900
   * Asserts that the string target contains another string.                                                  // 1901
   *                                                                                                          // 1902
   *     expect('foobar').to.have.string('bar');                                                              // 1903
   *                                                                                                          // 1904
   * @name string                                                                                             // 1905
   * @param {String} string                                                                                   // 1906
   * @param {String} message _optional_                                                                       // 1907
   * @api public                                                                                              // 1908
   */                                                                                                         // 1909
                                                                                                              // 1910
  Assertion.addMethod('string', function (str, msg) {                                                         // 1911
    if (msg) flag(this, 'message', msg);                                                                      // 1912
    var obj = flag(this, 'object');                                                                           // 1913
    new Assertion(obj, msg).is.a('string');                                                                   // 1914
                                                                                                              // 1915
    this.assert(                                                                                              // 1916
        ~obj.indexOf(str)                                                                                     // 1917
      , 'expected #{this} to contain ' + _.inspect(str)                                                       // 1918
      , 'expected #{this} to not contain ' + _.inspect(str)                                                   // 1919
    );                                                                                                        // 1920
  });                                                                                                         // 1921
                                                                                                              // 1922
                                                                                                              // 1923
  /**                                                                                                         // 1924
   * ### .keys(key1, [key2], [...])                                                                           // 1925
   *                                                                                                          // 1926
   * Asserts that the target has exactly the given keys, or                                                   // 1927
   * asserts the inclusion of some keys when using the                                                        // 1928
   * `include` or `contain` modifiers.                                                                        // 1929
   *                                                                                                          // 1930
   *     expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);                                             // 1931
   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');                                    // 1932
   *                                                                                                          // 1933
   * @name keys                                                                                               // 1934
   * @alias key                                                                                               // 1935
   * @param {String...|Array} keys                                                                            // 1936
   * @api public                                                                                              // 1937
   */                                                                                                         // 1938
                                                                                                              // 1939
  function assertKeys (keys) {                                                                                // 1940
    var obj = flag(this, 'object')                                                                            // 1941
      , str                                                                                                   // 1942
      , ok = true;                                                                                            // 1943
                                                                                                              // 1944
    keys = keys instanceof Array                                                                              // 1945
      ? keys                                                                                                  // 1946
      : Array.prototype.slice.call(arguments);                                                                // 1947
                                                                                                              // 1948
    if (!keys.length) throw new Error('keys required');                                                       // 1949
                                                                                                              // 1950
    var actual = Object.keys(obj)                                                                             // 1951
      , expected = keys                                                                                       // 1952
      , len = keys.length;                                                                                    // 1953
                                                                                                              // 1954
    // Inclusion                                                                                              // 1955
    ok = keys.every(function(key){                                                                            // 1956
      return ~actual.indexOf(key);                                                                            // 1957
    });                                                                                                       // 1958
                                                                                                              // 1959
    // Strict                                                                                                 // 1960
    if (!flag(this, 'negate') && !flag(this, 'contains')) {                                                   // 1961
      ok = ok && keys.length == actual.length;                                                                // 1962
    }                                                                                                         // 1963
                                                                                                              // 1964
    // Key string                                                                                             // 1965
    if (len > 1) {                                                                                            // 1966
      keys = keys.map(function(key){                                                                          // 1967
        return _.inspect(key);                                                                                // 1968
      });                                                                                                     // 1969
      var last = keys.pop();                                                                                  // 1970
      str = keys.join(', ') + ', and ' + last;                                                                // 1971
    } else {                                                                                                  // 1972
      str = _.inspect(keys[0]);                                                                               // 1973
    }                                                                                                         // 1974
                                                                                                              // 1975
    // Form                                                                                                   // 1976
    str = (len > 1 ? 'keys ' : 'key ') + str;                                                                 // 1977
                                                                                                              // 1978
    // Have / include                                                                                         // 1979
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;                                              // 1980
                                                                                                              // 1981
    // Assertion                                                                                              // 1982
    this.assert(                                                                                              // 1983
        ok                                                                                                    // 1984
      , 'expected #{this} to ' + str                                                                          // 1985
      , 'expected #{this} to not ' + str                                                                      // 1986
      , expected.sort()                                                                                       // 1987
      , actual.sort()                                                                                         // 1988
      , true                                                                                                  // 1989
    );                                                                                                        // 1990
  }                                                                                                           // 1991
                                                                                                              // 1992
  Assertion.addMethod('keys', assertKeys);                                                                    // 1993
  Assertion.addMethod('key', assertKeys);                                                                     // 1994
                                                                                                              // 1995
  /**                                                                                                         // 1996
   * ### .throw(constructor)                                                                                  // 1997
   *                                                                                                          // 1998
   * Asserts that the function target will throw a specific error, or specific type of error                  // 1999
   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test                    // 2000
   * for the error's message.                                                                                 // 2001
   *                                                                                                          // 2002
   *     var err = new ReferenceError('This is a bad function.');                                             // 2003
   *     var fn = function () { throw err; }                                                                  // 2004
   *     expect(fn).to.throw(ReferenceError);                                                                 // 2005
   *     expect(fn).to.throw(Error);                                                                          // 2006
   *     expect(fn).to.throw(/bad function/);                                                                 // 2007
   *     expect(fn).to.not.throw('good function');                                                            // 2008
   *     expect(fn).to.throw(ReferenceError, /bad function/);                                                 // 2009
   *     expect(fn).to.throw(err);                                                                            // 2010
   *     expect(fn).to.not.throw(new RangeError('Out of range.'));                                            // 2011
   *                                                                                                          // 2012
   * Please note that when a throw expectation is negated, it will check each                                 // 2013
   * parameter independently, starting with error constructor type. The appropriate way                       // 2014
   * to check for the existence of a type of error but for a message that does not match                      // 2015
   * is to use `and`.                                                                                         // 2016
   *                                                                                                          // 2017
   *     expect(fn).to.throw(ReferenceError)                                                                  // 2018
   *        .and.not.throw(/good function/);                                                                  // 2019
   *                                                                                                          // 2020
   * @name throw                                                                                              // 2021
   * @alias throws                                                                                            // 2022
   * @alias Throw                                                                                             // 2023
   * @param {ErrorConstructor} constructor                                                                    // 2024
   * @param {String|RegExp} expected error message                                                            // 2025
   * @param {String} message _optional_                                                                       // 2026
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types              // 2027
   * @returns error for chaining (null if no error)                                                           // 2028
   * @api public                                                                                              // 2029
   */                                                                                                         // 2030
                                                                                                              // 2031
  function assertThrows (constructor, errMsg, msg) {                                                          // 2032
    if (msg) flag(this, 'message', msg);                                                                      // 2033
    var obj = flag(this, 'object');                                                                           // 2034
    new Assertion(obj, msg).is.a('function');                                                                 // 2035
                                                                                                              // 2036
    var thrown = false                                                                                        // 2037
      , desiredError = null                                                                                   // 2038
      , name = null                                                                                           // 2039
      , thrownError = null;                                                                                   // 2040
                                                                                                              // 2041
    if (arguments.length === 0) {                                                                             // 2042
      errMsg = null;                                                                                          // 2043
      constructor = null;                                                                                     // 2044
    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {           // 2045
      errMsg = constructor;                                                                                   // 2046
      constructor = null;                                                                                     // 2047
    } else if (constructor && constructor instanceof Error) {                                                 // 2048
      desiredError = constructor;                                                                             // 2049
      constructor = null;                                                                                     // 2050
      errMsg = null;                                                                                          // 2051
    } else if (typeof constructor === 'function') {                                                           // 2052
      name = constructor.prototype.name || constructor.name;                                                  // 2053
      if (name === 'Error' && constructor !== Error) {                                                        // 2054
        name = (new constructor()).name;                                                                      // 2055
      }                                                                                                       // 2056
    } else {                                                                                                  // 2057
      constructor = null;                                                                                     // 2058
    }                                                                                                         // 2059
                                                                                                              // 2060
    try {                                                                                                     // 2061
      obj();                                                                                                  // 2062
    } catch (err) {                                                                                           // 2063
      // first, check desired error                                                                           // 2064
      if (desiredError) {                                                                                     // 2065
        this.assert(                                                                                          // 2066
            err === desiredError                                                                              // 2067
          , 'expected #{this} to throw #{exp} but #{act} was thrown'                                          // 2068
          , 'expected #{this} to not throw #{exp}'                                                            // 2069
          , (desiredError instanceof Error ? desiredError.toString() : desiredError)                          // 2070
          , (err instanceof Error ? err.toString() : err)                                                     // 2071
        );                                                                                                    // 2072
                                                                                                              // 2073
        flag(this, 'object', err);                                                                            // 2074
        return this;                                                                                          // 2075
      }                                                                                                       // 2076
                                                                                                              // 2077
      // next, check constructor                                                                              // 2078
      if (constructor) {                                                                                      // 2079
        this.assert(                                                                                          // 2080
            err instanceof constructor                                                                        // 2081
          , 'expected #{this} to throw #{exp} but #{act} was thrown'                                          // 2082
          , 'expected #{this} to not throw #{exp} but #{act} was thrown'                                      // 2083
          , name                                                                                              // 2084
          , (err instanceof Error ? err.toString() : err)                                                     // 2085
        );                                                                                                    // 2086
                                                                                                              // 2087
        if (!errMsg) {                                                                                        // 2088
          flag(this, 'object', err);                                                                          // 2089
          return this;                                                                                        // 2090
        }                                                                                                     // 2091
      }                                                                                                       // 2092
                                                                                                              // 2093
      // next, check message                                                                                  // 2094
      var message = 'object' === _.type(err) && "message" in err                                              // 2095
        ? err.message                                                                                         // 2096
        : '' + err;                                                                                           // 2097
                                                                                                              // 2098
      if ((message != null) && errMsg && errMsg instanceof RegExp) {                                          // 2099
        this.assert(                                                                                          // 2100
            errMsg.exec(message)                                                                              // 2101
          , 'expected #{this} to throw error matching #{exp} but got #{act}'                                  // 2102
          , 'expected #{this} to throw error not matching #{exp}'                                             // 2103
          , errMsg                                                                                            // 2104
          , message                                                                                           // 2105
        );                                                                                                    // 2106
                                                                                                              // 2107
        flag(this, 'object', err);                                                                            // 2108
        return this;                                                                                          // 2109
      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {                                 // 2110
        this.assert(                                                                                          // 2111
            ~message.indexOf(errMsg)                                                                          // 2112
          , 'expected #{this} to throw error including #{exp} but got #{act}'                                 // 2113
          , 'expected #{this} to throw error not including #{act}'                                            // 2114
          , errMsg                                                                                            // 2115
          , message                                                                                           // 2116
        );                                                                                                    // 2117
                                                                                                              // 2118
        flag(this, 'object', err);                                                                            // 2119
        return this;                                                                                          // 2120
      } else {                                                                                                // 2121
        thrown = true;                                                                                        // 2122
        thrownError = err;                                                                                    // 2123
      }                                                                                                       // 2124
    }                                                                                                         // 2125
                                                                                                              // 2126
    var actuallyGot = ''                                                                                      // 2127
      , expectedThrown = name !== null                                                                        // 2128
        ? name                                                                                                // 2129
        : desiredError                                                                                        // 2130
          ? '#{exp}' //_.inspect(desiredError)                                                                // 2131
          : 'an error';                                                                                       // 2132
                                                                                                              // 2133
    if (thrown) {                                                                                             // 2134
      actuallyGot = ' but #{act} was thrown'                                                                  // 2135
    }                                                                                                         // 2136
                                                                                                              // 2137
    this.assert(                                                                                              // 2138
        thrown === true                                                                                       // 2139
      , 'expected #{this} to throw ' + expectedThrown + actuallyGot                                           // 2140
      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot                                       // 2141
      , (desiredError instanceof Error ? desiredError.toString() : desiredError)                              // 2142
      , (thrownError instanceof Error ? thrownError.toString() : thrownError)                                 // 2143
    );                                                                                                        // 2144
                                                                                                              // 2145
    flag(this, 'object', thrownError);                                                                        // 2146
  };                                                                                                          // 2147
                                                                                                              // 2148
  Assertion.addMethod('throw', assertThrows);                                                                 // 2149
  Assertion.addMethod('throws', assertThrows);                                                                // 2150
  Assertion.addMethod('Throw', assertThrows);                                                                 // 2151
                                                                                                              // 2152
  /**                                                                                                         // 2153
   * ### .respondTo(method)                                                                                   // 2154
   *                                                                                                          // 2155
   * Asserts that the object or class target will respond to a method.                                        // 2156
   *                                                                                                          // 2157
   *     Klass.prototype.bar = function(){};                                                                  // 2158
   *     expect(Klass).to.respondTo('bar');                                                                   // 2159
   *     expect(obj).to.respondTo('bar');                                                                     // 2160
   *                                                                                                          // 2161
   * To check if a constructor will respond to a static function,                                             // 2162
   * set the `itself` flag.                                                                                   // 2163
   *                                                                                                          // 2164
   *     Klass.baz = function(){};                                                                            // 2165
   *     expect(Klass).itself.to.respondTo('baz');                                                            // 2166
   *                                                                                                          // 2167
   * @name respondTo                                                                                          // 2168
   * @param {String} method                                                                                   // 2169
   * @param {String} message _optional_                                                                       // 2170
   * @api public                                                                                              // 2171
   */                                                                                                         // 2172
                                                                                                              // 2173
  Assertion.addMethod('respondTo', function (method, msg) {                                                   // 2174
    if (msg) flag(this, 'message', msg);                                                                      // 2175
    var obj = flag(this, 'object')                                                                            // 2176
      , itself = flag(this, 'itself')                                                                         // 2177
      , context = ('function' === _.type(obj) && !itself)                                                     // 2178
        ? obj.prototype[method]                                                                               // 2179
        : obj[method];                                                                                        // 2180
                                                                                                              // 2181
    this.assert(                                                                                              // 2182
        'function' === typeof context                                                                         // 2183
      , 'expected #{this} to respond to ' + _.inspect(method)                                                 // 2184
      , 'expected #{this} to not respond to ' + _.inspect(method)                                             // 2185
    );                                                                                                        // 2186
  });                                                                                                         // 2187
                                                                                                              // 2188
  /**                                                                                                         // 2189
   * ### .itself                                                                                              // 2190
   *                                                                                                          // 2191
   * Sets the `itself` flag, later used by the `respondTo` assertion.                                         // 2192
   *                                                                                                          // 2193
   *     function Foo() {}                                                                                    // 2194
   *     Foo.bar = function() {}                                                                              // 2195
   *     Foo.prototype.baz = function() {}                                                                    // 2196
   *                                                                                                          // 2197
   *     expect(Foo).itself.to.respondTo('bar');                                                              // 2198
   *     expect(Foo).itself.not.to.respondTo('baz');                                                          // 2199
   *                                                                                                          // 2200
   * @name itself                                                                                             // 2201
   * @api public                                                                                              // 2202
   */                                                                                                         // 2203
                                                                                                              // 2204
  Assertion.addProperty('itself', function () {                                                               // 2205
    flag(this, 'itself', true);                                                                               // 2206
  });                                                                                                         // 2207
                                                                                                              // 2208
  /**                                                                                                         // 2209
   * ### .satisfy(method)                                                                                     // 2210
   *                                                                                                          // 2211
   * Asserts that the target passes a given truth test.                                                       // 2212
   *                                                                                                          // 2213
   *     expect(1).to.satisfy(function(num) { return num > 0; });                                             // 2214
   *                                                                                                          // 2215
   * @name satisfy                                                                                            // 2216
   * @param {Function} matcher                                                                                // 2217
   * @param {String} message _optional_                                                                       // 2218
   * @api public                                                                                              // 2219
   */                                                                                                         // 2220
                                                                                                              // 2221
  Assertion.addMethod('satisfy', function (matcher, msg) {                                                    // 2222
    if (msg) flag(this, 'message', msg);                                                                      // 2223
    var obj = flag(this, 'object');                                                                           // 2224
    var result = matcher(obj);                                                                                // 2225
    this.assert(                                                                                              // 2226
        result                                                                                                // 2227
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)                                                // 2228
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)                                             // 2229
      , this.negate ? false : true                                                                            // 2230
      , result                                                                                                // 2231
    );                                                                                                        // 2232
  });                                                                                                         // 2233
                                                                                                              // 2234
  /**                                                                                                         // 2235
   * ### .closeTo(expected, delta)                                                                            // 2236
   *                                                                                                          // 2237
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.                              // 2238
   *                                                                                                          // 2239
   *     expect(1.5).to.be.closeTo(1, 0.5);                                                                   // 2240
   *                                                                                                          // 2241
   * @name closeTo                                                                                            // 2242
   * @param {Number} expected                                                                                 // 2243
   * @param {Number} delta                                                                                    // 2244
   * @param {String} message _optional_                                                                       // 2245
   * @api public                                                                                              // 2246
   */                                                                                                         // 2247
                                                                                                              // 2248
  Assertion.addMethod('closeTo', function (expected, delta, msg) {                                            // 2249
    if (msg) flag(this, 'message', msg);                                                                      // 2250
    var obj = flag(this, 'object');                                                                           // 2251
                                                                                                              // 2252
    new Assertion(obj, msg).is.a('number');                                                                   // 2253
    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {                                        // 2254
      throw new Error('the arguments to closeTo must be numbers');                                            // 2255
    }                                                                                                         // 2256
                                                                                                              // 2257
    this.assert(                                                                                              // 2258
        Math.abs(obj - expected) <= delta                                                                     // 2259
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta                                       // 2260
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta                                   // 2261
    );                                                                                                        // 2262
  });                                                                                                         // 2263
                                                                                                              // 2264
  function isSubsetOf(subset, superset, cmp) {                                                                // 2265
    return subset.every(function(elem) {                                                                      // 2266
      if (!cmp) return superset.indexOf(elem) !== -1;                                                         // 2267
                                                                                                              // 2268
      return superset.some(function(elem2) {                                                                  // 2269
        return cmp(elem, elem2);                                                                              // 2270
      });                                                                                                     // 2271
    })                                                                                                        // 2272
  }                                                                                                           // 2273
                                                                                                              // 2274
  /**                                                                                                         // 2275
   * ### .members(set)                                                                                        // 2276
   *                                                                                                          // 2277
   * Asserts that the target is a superset of `set`,                                                          // 2278
   * or that the target and `set` have the same strictly-equal (===) members.                                 // 2279
   * Alternately, if the `deep` flag is set, set members are compared for deep                                // 2280
   * equality.                                                                                                // 2281
   *                                                                                                          // 2282
   *     expect([1, 2, 3]).to.include.members([3, 2]);                                                        // 2283
   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);                                                 // 2284
   *                                                                                                          // 2285
   *     expect([4, 2]).to.have.members([2, 4]);                                                              // 2286
   *     expect([5, 2]).to.not.have.members([5, 2, 1]);                                                       // 2287
   *                                                                                                          // 2288
   *     expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);                                            // 2289
   *                                                                                                          // 2290
   * @name members                                                                                            // 2291
   * @param {Array} set                                                                                       // 2292
   * @param {String} message _optional_                                                                       // 2293
   * @api public                                                                                              // 2294
   */                                                                                                         // 2295
                                                                                                              // 2296
  Assertion.addMethod('members', function (subset, msg) {                                                     // 2297
    if (msg) flag(this, 'message', msg);                                                                      // 2298
    var obj = flag(this, 'object');                                                                           // 2299
                                                                                                              // 2300
    new Assertion(obj).to.be.an('array');                                                                     // 2301
    new Assertion(subset).to.be.an('array');                                                                  // 2302
                                                                                                              // 2303
    var cmp = flag(this, 'deep') ? _.eql : undefined;                                                         // 2304
                                                                                                              // 2305
    if (flag(this, 'contains')) {                                                                             // 2306
      return this.assert(                                                                                     // 2307
          isSubsetOf(subset, obj, cmp)                                                                        // 2308
        , 'expected #{this} to be a superset of #{act}'                                                       // 2309
        , 'expected #{this} to not be a superset of #{act}'                                                   // 2310
        , obj                                                                                                 // 2311
        , subset                                                                                              // 2312
      );                                                                                                      // 2313
    }                                                                                                         // 2314
                                                                                                              // 2315
    this.assert(                                                                                              // 2316
        isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp)                                          // 2317
        , 'expected #{this} to have the same members as #{act}'                                               // 2318
        , 'expected #{this} to not have the same members as #{act}'                                           // 2319
        , obj                                                                                                 // 2320
        , subset                                                                                              // 2321
    );                                                                                                        // 2322
  });                                                                                                         // 2323
};                                                                                                            // 2324
                                                                                                              // 2325
});                                                                                                           // 2326
require.register("chai/lib/chai/interface/assert.js", function(exports, require, module){                     // 2327
/*!                                                                                                           // 2328
 * chai                                                                                                       // 2329
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 2330
 * MIT Licensed                                                                                               // 2331
 */                                                                                                           // 2332
                                                                                                              // 2333
                                                                                                              // 2334
module.exports = function (chai, util) {                                                                      // 2335
                                                                                                              // 2336
  /*!                                                                                                         // 2337
   * Chai dependencies.                                                                                       // 2338
   */                                                                                                         // 2339
                                                                                                              // 2340
  var Assertion = chai.Assertion                                                                              // 2341
    , flag = util.flag;                                                                                       // 2342
                                                                                                              // 2343
  /*!                                                                                                         // 2344
   * Module export.                                                                                           // 2345
   */                                                                                                         // 2346
                                                                                                              // 2347
  /**                                                                                                         // 2348
   * ### assert(expression, message)                                                                          // 2349
   *                                                                                                          // 2350
   * Write your own test expressions.                                                                         // 2351
   *                                                                                                          // 2352
   *     assert('foo' !== 'bar', 'foo is not bar');                                                           // 2353
   *     assert(Array.isArray([]), 'empty arrays are arrays');                                                // 2354
   *                                                                                                          // 2355
   * @param {Mixed} expression to test for truthiness                                                         // 2356
   * @param {String} message to display on error                                                              // 2357
   * @name assert                                                                                             // 2358
   * @api public                                                                                              // 2359
   */                                                                                                         // 2360
                                                                                                              // 2361
  var assert = chai.assert = function (express, errmsg) {                                                     // 2362
    var test = new Assertion(null, null, chai.assert);                                                        // 2363
    test.assert(                                                                                              // 2364
        express                                                                                               // 2365
      , errmsg                                                                                                // 2366
      , '[ negation message unavailable ]'                                                                    // 2367
    );                                                                                                        // 2368
  };                                                                                                          // 2369
                                                                                                              // 2370
  /**                                                                                                         // 2371
   * ### .fail(actual, expected, [message], [operator])                                                       // 2372
   *                                                                                                          // 2373
   * Throw a failure. Node.js `assert` module-compatible.                                                     // 2374
   *                                                                                                          // 2375
   * @name fail                                                                                               // 2376
   * @param {Mixed} actual                                                                                    // 2377
   * @param {Mixed} expected                                                                                  // 2378
   * @param {String} message                                                                                  // 2379
   * @param {String} operator                                                                                 // 2380
   * @api public                                                                                              // 2381
   */                                                                                                         // 2382
                                                                                                              // 2383
  assert.fail = function (actual, expected, message, operator) {                                              // 2384
    message = message || 'assert.fail()';                                                                     // 2385
    throw new chai.AssertionError(message, {                                                                  // 2386
        actual: actual                                                                                        // 2387
      , expected: expected                                                                                    // 2388
      , operator: operator                                                                                    // 2389
    }, assert.fail);                                                                                          // 2390
  };                                                                                                          // 2391
                                                                                                              // 2392
  /**                                                                                                         // 2393
   * ### .ok(object, [message])                                                                               // 2394
   *                                                                                                          // 2395
   * Asserts that `object` is truthy.                                                                         // 2396
   *                                                                                                          // 2397
   *     assert.ok('everything', 'everything is ok');                                                         // 2398
   *     assert.ok(false, 'this will fail');                                                                  // 2399
   *                                                                                                          // 2400
   * @name ok                                                                                                 // 2401
   * @param {Mixed} object to test                                                                            // 2402
   * @param {String} message                                                                                  // 2403
   * @api public                                                                                              // 2404
   */                                                                                                         // 2405
                                                                                                              // 2406
  assert.ok = function (val, msg) {                                                                           // 2407
    new Assertion(val, msg).is.ok;                                                                            // 2408
  };                                                                                                          // 2409
                                                                                                              // 2410
  /**                                                                                                         // 2411
   * ### .notOk(object, [message])                                                                            // 2412
   *                                                                                                          // 2413
   * Asserts that `object` is falsy.                                                                          // 2414
   *                                                                                                          // 2415
   *     assert.notOk('everything', 'this will fail');                                                        // 2416
   *     assert.notOk(false, 'this will pass');                                                               // 2417
   *                                                                                                          // 2418
   * @name notOk                                                                                              // 2419
   * @param {Mixed} object to test                                                                            // 2420
   * @param {String} message                                                                                  // 2421
   * @api public                                                                                              // 2422
   */                                                                                                         // 2423
                                                                                                              // 2424
  assert.notOk = function (val, msg) {                                                                        // 2425
    new Assertion(val, msg).is.not.ok;                                                                        // 2426
  };                                                                                                          // 2427
                                                                                                              // 2428
  /**                                                                                                         // 2429
   * ### .equal(actual, expected, [message])                                                                  // 2430
   *                                                                                                          // 2431
   * Asserts non-strict equality (`==`) of `actual` and `expected`.                                           // 2432
   *                                                                                                          // 2433
   *     assert.equal(3, '3', '== coerces values to strings');                                                // 2434
   *                                                                                                          // 2435
   * @name equal                                                                                              // 2436
   * @param {Mixed} actual                                                                                    // 2437
   * @param {Mixed} expected                                                                                  // 2438
   * @param {String} message                                                                                  // 2439
   * @api public                                                                                              // 2440
   */                                                                                                         // 2441
                                                                                                              // 2442
  assert.equal = function (act, exp, msg) {                                                                   // 2443
    var test = new Assertion(act, msg, assert.equal);                                                         // 2444
                                                                                                              // 2445
    test.assert(                                                                                              // 2446
        exp == flag(test, 'object')                                                                           // 2447
      , 'expected #{this} to equal #{exp}'                                                                    // 2448
      , 'expected #{this} to not equal #{act}'                                                                // 2449
      , exp                                                                                                   // 2450
      , act                                                                                                   // 2451
    );                                                                                                        // 2452
  };                                                                                                          // 2453
                                                                                                              // 2454
  /**                                                                                                         // 2455
   * ### .notEqual(actual, expected, [message])                                                               // 2456
   *                                                                                                          // 2457
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.                                         // 2458
   *                                                                                                          // 2459
   *     assert.notEqual(3, 4, 'these numbers are not equal');                                                // 2460
   *                                                                                                          // 2461
   * @name notEqual                                                                                           // 2462
   * @param {Mixed} actual                                                                                    // 2463
   * @param {Mixed} expected                                                                                  // 2464
   * @param {String} message                                                                                  // 2465
   * @api public                                                                                              // 2466
   */                                                                                                         // 2467
                                                                                                              // 2468
  assert.notEqual = function (act, exp, msg) {                                                                // 2469
    var test = new Assertion(act, msg, assert.notEqual);                                                      // 2470
                                                                                                              // 2471
    test.assert(                                                                                              // 2472
        exp != flag(test, 'object')                                                                           // 2473
      , 'expected #{this} to not equal #{exp}'                                                                // 2474
      , 'expected #{this} to equal #{act}'                                                                    // 2475
      , exp                                                                                                   // 2476
      , act                                                                                                   // 2477
    );                                                                                                        // 2478
  };                                                                                                          // 2479
                                                                                                              // 2480
  /**                                                                                                         // 2481
   * ### .strictEqual(actual, expected, [message])                                                            // 2482
   *                                                                                                          // 2483
   * Asserts strict equality (`===`) of `actual` and `expected`.                                              // 2484
   *                                                                                                          // 2485
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');                                 // 2486
   *                                                                                                          // 2487
   * @name strictEqual                                                                                        // 2488
   * @param {Mixed} actual                                                                                    // 2489
   * @param {Mixed} expected                                                                                  // 2490
   * @param {String} message                                                                                  // 2491
   * @api public                                                                                              // 2492
   */                                                                                                         // 2493
                                                                                                              // 2494
  assert.strictEqual = function (act, exp, msg) {                                                             // 2495
    new Assertion(act, msg).to.equal(exp);                                                                    // 2496
  };                                                                                                          // 2497
                                                                                                              // 2498
  /**                                                                                                         // 2499
   * ### .notStrictEqual(actual, expected, [message])                                                         // 2500
   *                                                                                                          // 2501
   * Asserts strict inequality (`!==`) of `actual` and `expected`.                                            // 2502
   *                                                                                                          // 2503
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');                                    // 2504
   *                                                                                                          // 2505
   * @name notStrictEqual                                                                                     // 2506
   * @param {Mixed} actual                                                                                    // 2507
   * @param {Mixed} expected                                                                                  // 2508
   * @param {String} message                                                                                  // 2509
   * @api public                                                                                              // 2510
   */                                                                                                         // 2511
                                                                                                              // 2512
  assert.notStrictEqual = function (act, exp, msg) {                                                          // 2513
    new Assertion(act, msg).to.not.equal(exp);                                                                // 2514
  };                                                                                                          // 2515
                                                                                                              // 2516
  /**                                                                                                         // 2517
   * ### .deepEqual(actual, expected, [message])                                                              // 2518
   *                                                                                                          // 2519
   * Asserts that `actual` is deeply equal to `expected`.                                                     // 2520
   *                                                                                                          // 2521
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });                                                // 2522
   *                                                                                                          // 2523
   * @name deepEqual                                                                                          // 2524
   * @param {Mixed} actual                                                                                    // 2525
   * @param {Mixed} expected                                                                                  // 2526
   * @param {String} message                                                                                  // 2527
   * @api public                                                                                              // 2528
   */                                                                                                         // 2529
                                                                                                              // 2530
  assert.deepEqual = function (act, exp, msg) {                                                               // 2531
    new Assertion(act, msg).to.eql(exp);                                                                      // 2532
  };                                                                                                          // 2533
                                                                                                              // 2534
  /**                                                                                                         // 2535
   * ### .notDeepEqual(actual, expected, [message])                                                           // 2536
   *                                                                                                          // 2537
   * Assert that `actual` is not deeply equal to `expected`.                                                  // 2538
   *                                                                                                          // 2539
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });                                           // 2540
   *                                                                                                          // 2541
   * @name notDeepEqual                                                                                       // 2542
   * @param {Mixed} actual                                                                                    // 2543
   * @param {Mixed} expected                                                                                  // 2544
   * @param {String} message                                                                                  // 2545
   * @api public                                                                                              // 2546
   */                                                                                                         // 2547
                                                                                                              // 2548
  assert.notDeepEqual = function (act, exp, msg) {                                                            // 2549
    new Assertion(act, msg).to.not.eql(exp);                                                                  // 2550
  };                                                                                                          // 2551
                                                                                                              // 2552
  /**                                                                                                         // 2553
   * ### .isTrue(value, [message])                                                                            // 2554
   *                                                                                                          // 2555
   * Asserts that `value` is true.                                                                            // 2556
   *                                                                                                          // 2557
   *     var teaServed = true;                                                                                // 2558
   *     assert.isTrue(teaServed, 'the tea has been served');                                                 // 2559
   *                                                                                                          // 2560
   * @name isTrue                                                                                             // 2561
   * @param {Mixed} value                                                                                     // 2562
   * @param {String} message                                                                                  // 2563
   * @api public                                                                                              // 2564
   */                                                                                                         // 2565
                                                                                                              // 2566
  assert.isTrue = function (val, msg) {                                                                       // 2567
    new Assertion(val, msg).is['true'];                                                                       // 2568
  };                                                                                                          // 2569
                                                                                                              // 2570
  /**                                                                                                         // 2571
   * ### .isFalse(value, [message])                                                                           // 2572
   *                                                                                                          // 2573
   * Asserts that `value` is false.                                                                           // 2574
   *                                                                                                          // 2575
   *     var teaServed = false;                                                                               // 2576
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');                                                     // 2577
   *                                                                                                          // 2578
   * @name isFalse                                                                                            // 2579
   * @param {Mixed} value                                                                                     // 2580
   * @param {String} message                                                                                  // 2581
   * @api public                                                                                              // 2582
   */                                                                                                         // 2583
                                                                                                              // 2584
  assert.isFalse = function (val, msg) {                                                                      // 2585
    new Assertion(val, msg).is['false'];                                                                      // 2586
  };                                                                                                          // 2587
                                                                                                              // 2588
  /**                                                                                                         // 2589
   * ### .isNull(value, [message])                                                                            // 2590
   *                                                                                                          // 2591
   * Asserts that `value` is null.                                                                            // 2592
   *                                                                                                          // 2593
   *     assert.isNull(err, 'there was no error');                                                            // 2594
   *                                                                                                          // 2595
   * @name isNull                                                                                             // 2596
   * @param {Mixed} value                                                                                     // 2597
   * @param {String} message                                                                                  // 2598
   * @api public                                                                                              // 2599
   */                                                                                                         // 2600
                                                                                                              // 2601
  assert.isNull = function (val, msg) {                                                                       // 2602
    new Assertion(val, msg).to.equal(null);                                                                   // 2603
  };                                                                                                          // 2604
                                                                                                              // 2605
  /**                                                                                                         // 2606
   * ### .isNotNull(value, [message])                                                                         // 2607
   *                                                                                                          // 2608
   * Asserts that `value` is not null.                                                                        // 2609
   *                                                                                                          // 2610
   *     var tea = 'tasty chai';                                                                              // 2611
   *     assert.isNotNull(tea, 'great, time for tea!');                                                       // 2612
   *                                                                                                          // 2613
   * @name isNotNull                                                                                          // 2614
   * @param {Mixed} value                                                                                     // 2615
   * @param {String} message                                                                                  // 2616
   * @api public                                                                                              // 2617
   */                                                                                                         // 2618
                                                                                                              // 2619
  assert.isNotNull = function (val, msg) {                                                                    // 2620
    new Assertion(val, msg).to.not.equal(null);                                                               // 2621
  };                                                                                                          // 2622
                                                                                                              // 2623
  /**                                                                                                         // 2624
   * ### .isUndefined(value, [message])                                                                       // 2625
   *                                                                                                          // 2626
   * Asserts that `value` is `undefined`.                                                                     // 2627
   *                                                                                                          // 2628
   *     var tea;                                                                                             // 2629
   *     assert.isUndefined(tea, 'no tea defined');                                                           // 2630
   *                                                                                                          // 2631
   * @name isUndefined                                                                                        // 2632
   * @param {Mixed} value                                                                                     // 2633
   * @param {String} message                                                                                  // 2634
   * @api public                                                                                              // 2635
   */                                                                                                         // 2636
                                                                                                              // 2637
  assert.isUndefined = function (val, msg) {                                                                  // 2638
    new Assertion(val, msg).to.equal(undefined);                                                              // 2639
  };                                                                                                          // 2640
                                                                                                              // 2641
  /**                                                                                                         // 2642
   * ### .isDefined(value, [message])                                                                         // 2643
   *                                                                                                          // 2644
   * Asserts that `value` is not `undefined`.                                                                 // 2645
   *                                                                                                          // 2646
   *     var tea = 'cup of chai';                                                                             // 2647
   *     assert.isDefined(tea, 'tea has been defined');                                                       // 2648
   *                                                                                                          // 2649
   * @name isDefined                                                                                          // 2650
   * @param {Mixed} value                                                                                     // 2651
   * @param {String} message                                                                                  // 2652
   * @api public                                                                                              // 2653
   */                                                                                                         // 2654
                                                                                                              // 2655
  assert.isDefined = function (val, msg) {                                                                    // 2656
    new Assertion(val, msg).to.not.equal(undefined);                                                          // 2657
  };                                                                                                          // 2658
                                                                                                              // 2659
  /**                                                                                                         // 2660
   * ### .isFunction(value, [message])                                                                        // 2661
   *                                                                                                          // 2662
   * Asserts that `value` is a function.                                                                      // 2663
   *                                                                                                          // 2664
   *     function serveTea() { return 'cup of tea'; };                                                        // 2665
   *     assert.isFunction(serveTea, 'great, we can have tea now');                                           // 2666
   *                                                                                                          // 2667
   * @name isFunction                                                                                         // 2668
   * @param {Mixed} value                                                                                     // 2669
   * @param {String} message                                                                                  // 2670
   * @api public                                                                                              // 2671
   */                                                                                                         // 2672
                                                                                                              // 2673
  assert.isFunction = function (val, msg) {                                                                   // 2674
    new Assertion(val, msg).to.be.a('function');                                                              // 2675
  };                                                                                                          // 2676
                                                                                                              // 2677
  /**                                                                                                         // 2678
   * ### .isNotFunction(value, [message])                                                                     // 2679
   *                                                                                                          // 2680
   * Asserts that `value` is _not_ a function.                                                                // 2681
   *                                                                                                          // 2682
   *     var serveTea = [ 'heat', 'pour', 'sip' ];                                                            // 2683
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');                                   // 2684
   *                                                                                                          // 2685
   * @name isNotFunction                                                                                      // 2686
   * @param {Mixed} value                                                                                     // 2687
   * @param {String} message                                                                                  // 2688
   * @api public                                                                                              // 2689
   */                                                                                                         // 2690
                                                                                                              // 2691
  assert.isNotFunction = function (val, msg) {                                                                // 2692
    new Assertion(val, msg).to.not.be.a('function');                                                          // 2693
  };                                                                                                          // 2694
                                                                                                              // 2695
  /**                                                                                                         // 2696
   * ### .isObject(value, [message])                                                                          // 2697
   *                                                                                                          // 2698
   * Asserts that `value` is an object (as revealed by                                                        // 2699
   * `Object.prototype.toString`).                                                                            // 2700
   *                                                                                                          // 2701
   *     var selection = { name: 'Chai', serve: 'with spices' };                                              // 2702
   *     assert.isObject(selection, 'tea selection is an object');                                            // 2703
   *                                                                                                          // 2704
   * @name isObject                                                                                           // 2705
   * @param {Mixed} value                                                                                     // 2706
   * @param {String} message                                                                                  // 2707
   * @api public                                                                                              // 2708
   */                                                                                                         // 2709
                                                                                                              // 2710
  assert.isObject = function (val, msg) {                                                                     // 2711
    new Assertion(val, msg).to.be.a('object');                                                                // 2712
  };                                                                                                          // 2713
                                                                                                              // 2714
  /**                                                                                                         // 2715
   * ### .isNotObject(value, [message])                                                                       // 2716
   *                                                                                                          // 2717
   * Asserts that `value` is _not_ an object.                                                                 // 2718
   *                                                                                                          // 2719
   *     var selection = 'chai'                                                                               // 2720
   *     assert.isNotObject(selection, 'tea selection is not an object');                                     // 2721
   *     assert.isNotObject(null, 'null is not an object');                                                   // 2722
   *                                                                                                          // 2723
   * @name isNotObject                                                                                        // 2724
   * @param {Mixed} value                                                                                     // 2725
   * @param {String} message                                                                                  // 2726
   * @api public                                                                                              // 2727
   */                                                                                                         // 2728
                                                                                                              // 2729
  assert.isNotObject = function (val, msg) {                                                                  // 2730
    new Assertion(val, msg).to.not.be.a('object');                                                            // 2731
  };                                                                                                          // 2732
                                                                                                              // 2733
  /**                                                                                                         // 2734
   * ### .isArray(value, [message])                                                                           // 2735
   *                                                                                                          // 2736
   * Asserts that `value` is an array.                                                                        // 2737
   *                                                                                                          // 2738
   *     var menu = [ 'green', 'chai', 'oolong' ];                                                            // 2739
   *     assert.isArray(menu, 'what kind of tea do we want?');                                                // 2740
   *                                                                                                          // 2741
   * @name isArray                                                                                            // 2742
   * @param {Mixed} value                                                                                     // 2743
   * @param {String} message                                                                                  // 2744
   * @api public                                                                                              // 2745
   */                                                                                                         // 2746
                                                                                                              // 2747
  assert.isArray = function (val, msg) {                                                                      // 2748
    new Assertion(val, msg).to.be.an('array');                                                                // 2749
  };                                                                                                          // 2750
                                                                                                              // 2751
  /**                                                                                                         // 2752
   * ### .isNotArray(value, [message])                                                                        // 2753
   *                                                                                                          // 2754
   * Asserts that `value` is _not_ an array.                                                                  // 2755
   *                                                                                                          // 2756
   *     var menu = 'green|chai|oolong';                                                                      // 2757
   *     assert.isNotArray(menu, 'what kind of tea do we want?');                                             // 2758
   *                                                                                                          // 2759
   * @name isNotArray                                                                                         // 2760
   * @param {Mixed} value                                                                                     // 2761
   * @param {String} message                                                                                  // 2762
   * @api public                                                                                              // 2763
   */                                                                                                         // 2764
                                                                                                              // 2765
  assert.isNotArray = function (val, msg) {                                                                   // 2766
    new Assertion(val, msg).to.not.be.an('array');                                                            // 2767
  };                                                                                                          // 2768
                                                                                                              // 2769
  /**                                                                                                         // 2770
   * ### .isString(value, [message])                                                                          // 2771
   *                                                                                                          // 2772
   * Asserts that `value` is a string.                                                                        // 2773
   *                                                                                                          // 2774
   *     var teaOrder = 'chai';                                                                               // 2775
   *     assert.isString(teaOrder, 'order placed');                                                           // 2776
   *                                                                                                          // 2777
   * @name isString                                                                                           // 2778
   * @param {Mixed} value                                                                                     // 2779
   * @param {String} message                                                                                  // 2780
   * @api public                                                                                              // 2781
   */                                                                                                         // 2782
                                                                                                              // 2783
  assert.isString = function (val, msg) {                                                                     // 2784
    new Assertion(val, msg).to.be.a('string');                                                                // 2785
  };                                                                                                          // 2786
                                                                                                              // 2787
  /**                                                                                                         // 2788
   * ### .isNotString(value, [message])                                                                       // 2789
   *                                                                                                          // 2790
   * Asserts that `value` is _not_ a string.                                                                  // 2791
   *                                                                                                          // 2792
   *     var teaOrder = 4;                                                                                    // 2793
   *     assert.isNotString(teaOrder, 'order placed');                                                        // 2794
   *                                                                                                          // 2795
   * @name isNotString                                                                                        // 2796
   * @param {Mixed} value                                                                                     // 2797
   * @param {String} message                                                                                  // 2798
   * @api public                                                                                              // 2799
   */                                                                                                         // 2800
                                                                                                              // 2801
  assert.isNotString = function (val, msg) {                                                                  // 2802
    new Assertion(val, msg).to.not.be.a('string');                                                            // 2803
  };                                                                                                          // 2804
                                                                                                              // 2805
  /**                                                                                                         // 2806
   * ### .isNumber(value, [message])                                                                          // 2807
   *                                                                                                          // 2808
   * Asserts that `value` is a number.                                                                        // 2809
   *                                                                                                          // 2810
   *     var cups = 2;                                                                                        // 2811
   *     assert.isNumber(cups, 'how many cups');                                                              // 2812
   *                                                                                                          // 2813
   * @name isNumber                                                                                           // 2814
   * @param {Number} value                                                                                    // 2815
   * @param {String} message                                                                                  // 2816
   * @api public                                                                                              // 2817
   */                                                                                                         // 2818
                                                                                                              // 2819
  assert.isNumber = function (val, msg) {                                                                     // 2820
    new Assertion(val, msg).to.be.a('number');                                                                // 2821
  };                                                                                                          // 2822
                                                                                                              // 2823
  /**                                                                                                         // 2824
   * ### .isNotNumber(value, [message])                                                                       // 2825
   *                                                                                                          // 2826
   * Asserts that `value` is _not_ a number.                                                                  // 2827
   *                                                                                                          // 2828
   *     var cups = '2 cups please';                                                                          // 2829
   *     assert.isNotNumber(cups, 'how many cups');                                                           // 2830
   *                                                                                                          // 2831
   * @name isNotNumber                                                                                        // 2832
   * @param {Mixed} value                                                                                     // 2833
   * @param {String} message                                                                                  // 2834
   * @api public                                                                                              // 2835
   */                                                                                                         // 2836
                                                                                                              // 2837
  assert.isNotNumber = function (val, msg) {                                                                  // 2838
    new Assertion(val, msg).to.not.be.a('number');                                                            // 2839
  };                                                                                                          // 2840
                                                                                                              // 2841
  /**                                                                                                         // 2842
   * ### .isBoolean(value, [message])                                                                         // 2843
   *                                                                                                          // 2844
   * Asserts that `value` is a boolean.                                                                       // 2845
   *                                                                                                          // 2846
   *     var teaReady = true                                                                                  // 2847
   *       , teaServed = false;                                                                               // 2848
   *                                                                                                          // 2849
   *     assert.isBoolean(teaReady, 'is the tea ready');                                                      // 2850
   *     assert.isBoolean(teaServed, 'has tea been served');                                                  // 2851
   *                                                                                                          // 2852
   * @name isBoolean                                                                                          // 2853
   * @param {Mixed} value                                                                                     // 2854
   * @param {String} message                                                                                  // 2855
   * @api public                                                                                              // 2856
   */                                                                                                         // 2857
                                                                                                              // 2858
  assert.isBoolean = function (val, msg) {                                                                    // 2859
    new Assertion(val, msg).to.be.a('boolean');                                                               // 2860
  };                                                                                                          // 2861
                                                                                                              // 2862
  /**                                                                                                         // 2863
   * ### .isNotBoolean(value, [message])                                                                      // 2864
   *                                                                                                          // 2865
   * Asserts that `value` is _not_ a boolean.                                                                 // 2866
   *                                                                                                          // 2867
   *     var teaReady = 'yep'                                                                                 // 2868
   *       , teaServed = 'nope';                                                                              // 2869
   *                                                                                                          // 2870
   *     assert.isNotBoolean(teaReady, 'is the tea ready');                                                   // 2871
   *     assert.isNotBoolean(teaServed, 'has tea been served');                                               // 2872
   *                                                                                                          // 2873
   * @name isNotBoolean                                                                                       // 2874
   * @param {Mixed} value                                                                                     // 2875
   * @param {String} message                                                                                  // 2876
   * @api public                                                                                              // 2877
   */                                                                                                         // 2878
                                                                                                              // 2879
  assert.isNotBoolean = function (val, msg) {                                                                 // 2880
    new Assertion(val, msg).to.not.be.a('boolean');                                                           // 2881
  };                                                                                                          // 2882
                                                                                                              // 2883
  /**                                                                                                         // 2884
   * ### .typeOf(value, name, [message])                                                                      // 2885
   *                                                                                                          // 2886
   * Asserts that `value`'s type is `name`, as determined by                                                  // 2887
   * `Object.prototype.toString`.                                                                             // 2888
   *                                                                                                          // 2889
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');                                       // 2890
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');                                     // 2891
   *     assert.typeOf('tea', 'string', 'we have a string');                                                  // 2892
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');                                      // 2893
   *     assert.typeOf(null, 'null', 'we have a null');                                                       // 2894
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');                                       // 2895
   *                                                                                                          // 2896
   * @name typeOf                                                                                             // 2897
   * @param {Mixed} value                                                                                     // 2898
   * @param {String} name                                                                                     // 2899
   * @param {String} message                                                                                  // 2900
   * @api public                                                                                              // 2901
   */                                                                                                         // 2902
                                                                                                              // 2903
  assert.typeOf = function (val, type, msg) {                                                                 // 2904
    new Assertion(val, msg).to.be.a(type);                                                                    // 2905
  };                                                                                                          // 2906
                                                                                                              // 2907
  /**                                                                                                         // 2908
   * ### .notTypeOf(value, name, [message])                                                                   // 2909
   *                                                                                                          // 2910
   * Asserts that `value`'s type is _not_ `name`, as determined by                                            // 2911
   * `Object.prototype.toString`.                                                                             // 2912
   *                                                                                                          // 2913
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');                                        // 2914
   *                                                                                                          // 2915
   * @name notTypeOf                                                                                          // 2916
   * @param {Mixed} value                                                                                     // 2917
   * @param {String} typeof name                                                                              // 2918
   * @param {String} message                                                                                  // 2919
   * @api public                                                                                              // 2920
   */                                                                                                         // 2921
                                                                                                              // 2922
  assert.notTypeOf = function (val, type, msg) {                                                              // 2923
    new Assertion(val, msg).to.not.be.a(type);                                                                // 2924
  };                                                                                                          // 2925
                                                                                                              // 2926
  /**                                                                                                         // 2927
   * ### .instanceOf(object, constructor, [message])                                                          // 2928
   *                                                                                                          // 2929
   * Asserts that `value` is an instance of `constructor`.                                                    // 2930
   *                                                                                                          // 2931
   *     var Tea = function (name) { this.name = name; }                                                      // 2932
   *       , chai = new Tea('chai');                                                                          // 2933
   *                                                                                                          // 2934
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');                                          // 2935
   *                                                                                                          // 2936
   * @name instanceOf                                                                                         // 2937
   * @param {Object} object                                                                                   // 2938
   * @param {Constructor} constructor                                                                         // 2939
   * @param {String} message                                                                                  // 2940
   * @api public                                                                                              // 2941
   */                                                                                                         // 2942
                                                                                                              // 2943
  assert.instanceOf = function (val, type, msg) {                                                             // 2944
    new Assertion(val, msg).to.be.instanceOf(type);                                                           // 2945
  };                                                                                                          // 2946
                                                                                                              // 2947
  /**                                                                                                         // 2948
   * ### .notInstanceOf(object, constructor, [message])                                                       // 2949
   *                                                                                                          // 2950
   * Asserts `value` is not an instance of `constructor`.                                                     // 2951
   *                                                                                                          // 2952
   *     var Tea = function (name) { this.name = name; }                                                      // 2953
   *       , chai = new String('chai');                                                                       // 2954
   *                                                                                                          // 2955
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');                                   // 2956
   *                                                                                                          // 2957
   * @name notInstanceOf                                                                                      // 2958
   * @param {Object} object                                                                                   // 2959
   * @param {Constructor} constructor                                                                         // 2960
   * @param {String} message                                                                                  // 2961
   * @api public                                                                                              // 2962
   */                                                                                                         // 2963
                                                                                                              // 2964
  assert.notInstanceOf = function (val, type, msg) {                                                          // 2965
    new Assertion(val, msg).to.not.be.instanceOf(type);                                                       // 2966
  };                                                                                                          // 2967
                                                                                                              // 2968
  /**                                                                                                         // 2969
   * ### .include(haystack, needle, [message])                                                                // 2970
   *                                                                                                          // 2971
   * Asserts that `haystack` includes `needle`. Works                                                         // 2972
   * for strings and arrays.                                                                                  // 2973
   *                                                                                                          // 2974
   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');                                     // 2975
   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');                                              // 2976
   *                                                                                                          // 2977
   * @name include                                                                                            // 2978
   * @param {Array|String} haystack                                                                           // 2979
   * @param {Mixed} needle                                                                                    // 2980
   * @param {String} message                                                                                  // 2981
   * @api public                                                                                              // 2982
   */                                                                                                         // 2983
                                                                                                              // 2984
  assert.include = function (exp, inc, msg) {                                                                 // 2985
    new Assertion(exp, msg, assert.include).include(inc);                                                     // 2986
  };                                                                                                          // 2987
                                                                                                              // 2988
  /**                                                                                                         // 2989
   * ### .notInclude(haystack, needle, [message])                                                             // 2990
   *                                                                                                          // 2991
   * Asserts that `haystack` does not include `needle`. Works                                                 // 2992
   * for strings and arrays.                                                                                  // 2993
   *i                                                                                                         // 2994
   *     assert.notInclude('foobar', 'baz', 'string not include substring');                                  // 2995
   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');                                // 2996
   *                                                                                                          // 2997
   * @name notInclude                                                                                         // 2998
   * @param {Array|String} haystack                                                                           // 2999
   * @param {Mixed} needle                                                                                    // 3000
   * @param {String} message                                                                                  // 3001
   * @api public                                                                                              // 3002
   */                                                                                                         // 3003
                                                                                                              // 3004
  assert.notInclude = function (exp, inc, msg) {                                                              // 3005
    new Assertion(exp, msg, assert.notInclude).not.include(inc);                                              // 3006
  };                                                                                                          // 3007
                                                                                                              // 3008
  /**                                                                                                         // 3009
   * ### .match(value, regexp, [message])                                                                     // 3010
   *                                                                                                          // 3011
   * Asserts that `value` matches the regular expression `regexp`.                                            // 3012
   *                                                                                                          // 3013
   *     assert.match('foobar', /^foo/, 'regexp matches');                                                    // 3014
   *                                                                                                          // 3015
   * @name match                                                                                              // 3016
   * @param {Mixed} value                                                                                     // 3017
   * @param {RegExp} regexp                                                                                   // 3018
   * @param {String} message                                                                                  // 3019
   * @api public                                                                                              // 3020
   */                                                                                                         // 3021
                                                                                                              // 3022
  assert.match = function (exp, re, msg) {                                                                    // 3023
    new Assertion(exp, msg).to.match(re);                                                                     // 3024
  };                                                                                                          // 3025
                                                                                                              // 3026
  /**                                                                                                         // 3027
   * ### .notMatch(value, regexp, [message])                                                                  // 3028
   *                                                                                                          // 3029
   * Asserts that `value` does not match the regular expression `regexp`.                                     // 3030
   *                                                                                                          // 3031
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');                                          // 3032
   *                                                                                                          // 3033
   * @name notMatch                                                                                           // 3034
   * @param {Mixed} value                                                                                     // 3035
   * @param {RegExp} regexp                                                                                   // 3036
   * @param {String} message                                                                                  // 3037
   * @api public                                                                                              // 3038
   */                                                                                                         // 3039
                                                                                                              // 3040
  assert.notMatch = function (exp, re, msg) {                                                                 // 3041
    new Assertion(exp, msg).to.not.match(re);                                                                 // 3042
  };                                                                                                          // 3043
                                                                                                              // 3044
  /**                                                                                                         // 3045
   * ### .property(object, property, [message])                                                               // 3046
   *                                                                                                          // 3047
   * Asserts that `object` has a property named by `property`.                                                // 3048
   *                                                                                                          // 3049
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');                                                 // 3050
   *                                                                                                          // 3051
   * @name property                                                                                           // 3052
   * @param {Object} object                                                                                   // 3053
   * @param {String} property                                                                                 // 3054
   * @param {String} message                                                                                  // 3055
   * @api public                                                                                              // 3056
   */                                                                                                         // 3057
                                                                                                              // 3058
  assert.property = function (obj, prop, msg) {                                                               // 3059
    new Assertion(obj, msg).to.have.property(prop);                                                           // 3060
  };                                                                                                          // 3061
                                                                                                              // 3062
  /**                                                                                                         // 3063
   * ### .notProperty(object, property, [message])                                                            // 3064
   *                                                                                                          // 3065
   * Asserts that `object` does _not_ have a property named by `property`.                                    // 3066
   *                                                                                                          // 3067
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');                                           // 3068
   *                                                                                                          // 3069
   * @name notProperty                                                                                        // 3070
   * @param {Object} object                                                                                   // 3071
   * @param {String} property                                                                                 // 3072
   * @param {String} message                                                                                  // 3073
   * @api public                                                                                              // 3074
   */                                                                                                         // 3075
                                                                                                              // 3076
  assert.notProperty = function (obj, prop, msg) {                                                            // 3077
    new Assertion(obj, msg).to.not.have.property(prop);                                                       // 3078
  };                                                                                                          // 3079
                                                                                                              // 3080
  /**                                                                                                         // 3081
   * ### .deepProperty(object, property, [message])                                                           // 3082
   *                                                                                                          // 3083
   * Asserts that `object` has a property named by `property`, which can be a                                 // 3084
   * string using dot- and bracket-notation for deep reference.                                               // 3085
   *                                                                                                          // 3086
   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');                                       // 3087
   *                                                                                                          // 3088
   * @name deepProperty                                                                                       // 3089
   * @param {Object} object                                                                                   // 3090
   * @param {String} property                                                                                 // 3091
   * @param {String} message                                                                                  // 3092
   * @api public                                                                                              // 3093
   */                                                                                                         // 3094
                                                                                                              // 3095
  assert.deepProperty = function (obj, prop, msg) {                                                           // 3096
    new Assertion(obj, msg).to.have.deep.property(prop);                                                      // 3097
  };                                                                                                          // 3098
                                                                                                              // 3099
  /**                                                                                                         // 3100
   * ### .notDeepProperty(object, property, [message])                                                        // 3101
   *                                                                                                          // 3102
   * Asserts that `object` does _not_ have a property named by `property`, which                              // 3103
   * can be a string using dot- and bracket-notation for deep reference.                                      // 3104
   *                                                                                                          // 3105
   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');                                   // 3106
   *                                                                                                          // 3107
   * @name notDeepProperty                                                                                    // 3108
   * @param {Object} object                                                                                   // 3109
   * @param {String} property                                                                                 // 3110
   * @param {String} message                                                                                  // 3111
   * @api public                                                                                              // 3112
   */                                                                                                         // 3113
                                                                                                              // 3114
  assert.notDeepProperty = function (obj, prop, msg) {                                                        // 3115
    new Assertion(obj, msg).to.not.have.deep.property(prop);                                                  // 3116
  };                                                                                                          // 3117
                                                                                                              // 3118
  /**                                                                                                         // 3119
   * ### .propertyVal(object, property, value, [message])                                                     // 3120
   *                                                                                                          // 3121
   * Asserts that `object` has a property named by `property` with value given                                // 3122
   * by `value`.                                                                                              // 3123
   *                                                                                                          // 3124
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');                                            // 3125
   *                                                                                                          // 3126
   * @name propertyVal                                                                                        // 3127
   * @param {Object} object                                                                                   // 3128
   * @param {String} property                                                                                 // 3129
   * @param {Mixed} value                                                                                     // 3130
   * @param {String} message                                                                                  // 3131
   * @api public                                                                                              // 3132
   */                                                                                                         // 3133
                                                                                                              // 3134
  assert.propertyVal = function (obj, prop, val, msg) {                                                       // 3135
    new Assertion(obj, msg).to.have.property(prop, val);                                                      // 3136
  };                                                                                                          // 3137
                                                                                                              // 3138
  /**                                                                                                         // 3139
   * ### .propertyNotVal(object, property, value, [message])                                                  // 3140
   *                                                                                                          // 3141
   * Asserts that `object` has a property named by `property`, but with a value                               // 3142
   * different from that given by `value`.                                                                    // 3143
   *                                                                                                          // 3144
   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');                                          // 3145
   *                                                                                                          // 3146
   * @name propertyNotVal                                                                                     // 3147
   * @param {Object} object                                                                                   // 3148
   * @param {String} property                                                                                 // 3149
   * @param {Mixed} value                                                                                     // 3150
   * @param {String} message                                                                                  // 3151
   * @api public                                                                                              // 3152
   */                                                                                                         // 3153
                                                                                                              // 3154
  assert.propertyNotVal = function (obj, prop, val, msg) {                                                    // 3155
    new Assertion(obj, msg).to.not.have.property(prop, val);                                                  // 3156
  };                                                                                                          // 3157
                                                                                                              // 3158
  /**                                                                                                         // 3159
   * ### .deepPropertyVal(object, property, value, [message])                                                 // 3160
   *                                                                                                          // 3161
   * Asserts that `object` has a property named by `property` with value given                                // 3162
   * by `value`. `property` can use dot- and bracket-notation for deep                                        // 3163
   * reference.                                                                                               // 3164
   *                                                                                                          // 3165
   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');                          // 3166
   *                                                                                                          // 3167
   * @name deepPropertyVal                                                                                    // 3168
   * @param {Object} object                                                                                   // 3169
   * @param {String} property                                                                                 // 3170
   * @param {Mixed} value                                                                                     // 3171
   * @param {String} message                                                                                  // 3172
   * @api public                                                                                              // 3173
   */                                                                                                         // 3174
                                                                                                              // 3175
  assert.deepPropertyVal = function (obj, prop, val, msg) {                                                   // 3176
    new Assertion(obj, msg).to.have.deep.property(prop, val);                                                 // 3177
  };                                                                                                          // 3178
                                                                                                              // 3179
  /**                                                                                                         // 3180
   * ### .deepPropertyNotVal(object, property, value, [message])                                              // 3181
   *                                                                                                          // 3182
   * Asserts that `object` has a property named by `property`, but with a value                               // 3183
   * different from that given by `value`. `property` can use dot- and                                        // 3184
   * bracket-notation for deep reference.                                                                     // 3185
   *                                                                                                          // 3186
   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');                      // 3187
   *                                                                                                          // 3188
   * @name deepPropertyNotVal                                                                                 // 3189
   * @param {Object} object                                                                                   // 3190
   * @param {String} property                                                                                 // 3191
   * @param {Mixed} value                                                                                     // 3192
   * @param {String} message                                                                                  // 3193
   * @api public                                                                                              // 3194
   */                                                                                                         // 3195
                                                                                                              // 3196
  assert.deepPropertyNotVal = function (obj, prop, val, msg) {                                                // 3197
    new Assertion(obj, msg).to.not.have.deep.property(prop, val);                                             // 3198
  };                                                                                                          // 3199
                                                                                                              // 3200
  /**                                                                                                         // 3201
   * ### .lengthOf(object, length, [message])                                                                 // 3202
   *                                                                                                          // 3203
   * Asserts that `object` has a `length` property with the expected value.                                   // 3204
   *                                                                                                          // 3205
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');                                                // 3206
   *     assert.lengthOf('foobar', 5, 'string has length of 6');                                              // 3207
   *                                                                                                          // 3208
   * @name lengthOf                                                                                           // 3209
   * @param {Mixed} object                                                                                    // 3210
   * @param {Number} length                                                                                   // 3211
   * @param {String} message                                                                                  // 3212
   * @api public                                                                                              // 3213
   */                                                                                                         // 3214
                                                                                                              // 3215
  assert.lengthOf = function (exp, len, msg) {                                                                // 3216
    new Assertion(exp, msg).to.have.length(len);                                                              // 3217
  };                                                                                                          // 3218
                                                                                                              // 3219
  /**                                                                                                         // 3220
   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])                           // 3221
   *                                                                                                          // 3222
   * Asserts that `function` will throw an error that is an instance of                                       // 3223
   * `constructor`, or alternately that it will throw an error with message                                   // 3224
   * matching `regexp`.                                                                                       // 3225
   *                                                                                                          // 3226
   *     assert.throw(fn, 'function throws a reference error');                                               // 3227
   *     assert.throw(fn, /function throws a reference error/);                                               // 3228
   *     assert.throw(fn, ReferenceError);                                                                    // 3229
   *     assert.throw(fn, ReferenceError, 'function throws a reference error');                               // 3230
   *     assert.throw(fn, ReferenceError, /function throws a reference error/);                               // 3231
   *                                                                                                          // 3232
   * @name throws                                                                                             // 3233
   * @alias throw                                                                                             // 3234
   * @alias Throw                                                                                             // 3235
   * @param {Function} function                                                                               // 3236
   * @param {ErrorConstructor} constructor                                                                    // 3237
   * @param {RegExp} regexp                                                                                   // 3238
   * @param {String} message                                                                                  // 3239
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types              // 3240
   * @api public                                                                                              // 3241
   */                                                                                                         // 3242
                                                                                                              // 3243
  assert.Throw = function (fn, errt, errs, msg) {                                                             // 3244
    if ('string' === typeof errt || errt instanceof RegExp) {                                                 // 3245
      errs = errt;                                                                                            // 3246
      errt = null;                                                                                            // 3247
    }                                                                                                         // 3248
                                                                                                              // 3249
    var assertErr = new Assertion(fn, msg).to.Throw(errt, errs);                                              // 3250
    return flag(assertErr, 'object');                                                                         // 3251
  };                                                                                                          // 3252
                                                                                                              // 3253
  /**                                                                                                         // 3254
   * ### .doesNotThrow(function, [constructor/regexp], [message])                                             // 3255
   *                                                                                                          // 3256
   * Asserts that `function` will _not_ throw an error that is an instance of                                 // 3257
   * `constructor`, or alternately that it will not throw an error with message                               // 3258
   * matching `regexp`.                                                                                       // 3259
   *                                                                                                          // 3260
   *     assert.doesNotThrow(fn, Error, 'function does not throw');                                           // 3261
   *                                                                                                          // 3262
   * @name doesNotThrow                                                                                       // 3263
   * @param {Function} function                                                                               // 3264
   * @param {ErrorConstructor} constructor                                                                    // 3265
   * @param {RegExp} regexp                                                                                   // 3266
   * @param {String} message                                                                                  // 3267
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types              // 3268
   * @api public                                                                                              // 3269
   */                                                                                                         // 3270
                                                                                                              // 3271
  assert.doesNotThrow = function (fn, type, msg) {                                                            // 3272
    if ('string' === typeof type) {                                                                           // 3273
      msg = type;                                                                                             // 3274
      type = null;                                                                                            // 3275
    }                                                                                                         // 3276
                                                                                                              // 3277
    new Assertion(fn, msg).to.not.Throw(type);                                                                // 3278
  };                                                                                                          // 3279
                                                                                                              // 3280
  /**                                                                                                         // 3281
   * ### .operator(val1, operator, val2, [message])                                                           // 3282
   *                                                                                                          // 3283
   * Compares two values using `operator`.                                                                    // 3284
   *                                                                                                          // 3285
   *     assert.operator(1, '<', 2, 'everything is ok');                                                      // 3286
   *     assert.operator(1, '>', 2, 'this will fail');                                                        // 3287
   *                                                                                                          // 3288
   * @name operator                                                                                           // 3289
   * @param {Mixed} val1                                                                                      // 3290
   * @param {String} operator                                                                                 // 3291
   * @param {Mixed} val2                                                                                      // 3292
   * @param {String} message                                                                                  // 3293
   * @api public                                                                                              // 3294
   */                                                                                                         // 3295
                                                                                                              // 3296
  assert.operator = function (val, operator, val2, msg) {                                                     // 3297
    if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {                               // 3298
      throw new Error('Invalid operator "' + operator + '"');                                                 // 3299
    }                                                                                                         // 3300
    var test = new Assertion(eval(val + operator + val2), msg);                                               // 3301
    test.assert(                                                                                              // 3302
        true === flag(test, 'object')                                                                         // 3303
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)                     // 3304
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );              // 3305
  };                                                                                                          // 3306
                                                                                                              // 3307
  /**                                                                                                         // 3308
   * ### .closeTo(actual, expected, delta, [message])                                                         // 3309
   *                                                                                                          // 3310
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.                              // 3311
   *                                                                                                          // 3312
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');                                                    // 3313
   *                                                                                                          // 3314
   * @name closeTo                                                                                            // 3315
   * @param {Number} actual                                                                                   // 3316
   * @param {Number} expected                                                                                 // 3317
   * @param {Number} delta                                                                                    // 3318
   * @param {String} message                                                                                  // 3319
   * @api public                                                                                              // 3320
   */                                                                                                         // 3321
                                                                                                              // 3322
  assert.closeTo = function (act, exp, delta, msg) {                                                          // 3323
    new Assertion(act, msg).to.be.closeTo(exp, delta);                                                        // 3324
  };                                                                                                          // 3325
                                                                                                              // 3326
  /**                                                                                                         // 3327
   * ### .sameMembers(set1, set2, [message])                                                                  // 3328
   *                                                                                                          // 3329
   * Asserts that `set1` and `set2` have the same members.                                                    // 3330
   * Order is not taken into account.                                                                         // 3331
   *                                                                                                          // 3332
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');                                        // 3333
   *                                                                                                          // 3334
   * @name sameMembers                                                                                        // 3335
   * @param {Array} set1                                                                                      // 3336
   * @param {Array} set2                                                                                      // 3337
   * @param {String} message                                                                                  // 3338
   * @api public                                                                                              // 3339
   */                                                                                                         // 3340
                                                                                                              // 3341
  assert.sameMembers = function (set1, set2, msg) {                                                           // 3342
    new Assertion(set1, msg).to.have.same.members(set2);                                                      // 3343
  }                                                                                                           // 3344
                                                                                                              // 3345
  /**                                                                                                         // 3346
   * ### .includeMembers(superset, subset, [message])                                                         // 3347
   *                                                                                                          // 3348
   * Asserts that `subset` is included in `superset`.                                                         // 3349
   * Order is not taken into account.                                                                         // 3350
   *                                                                                                          // 3351
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');                                     // 3352
   *                                                                                                          // 3353
   * @name includeMembers                                                                                     // 3354
   * @param {Array} superset                                                                                  // 3355
   * @param {Array} subset                                                                                    // 3356
   * @param {String} message                                                                                  // 3357
   * @api public                                                                                              // 3358
   */                                                                                                         // 3359
                                                                                                              // 3360
  assert.includeMembers = function (superset, subset, msg) {                                                  // 3361
    new Assertion(superset, msg).to.include.members(subset);                                                  // 3362
  }                                                                                                           // 3363
                                                                                                              // 3364
  /*!                                                                                                         // 3365
   * Undocumented / untested                                                                                  // 3366
   */                                                                                                         // 3367
                                                                                                              // 3368
  assert.ifError = function (val, msg) {                                                                      // 3369
    new Assertion(val, msg).to.not.be.ok;                                                                     // 3370
  };                                                                                                          // 3371
                                                                                                              // 3372
  /*!                                                                                                         // 3373
   * Aliases.                                                                                                 // 3374
   */                                                                                                         // 3375
                                                                                                              // 3376
  (function alias(name, as){                                                                                  // 3377
    assert[as] = assert[name];                                                                                // 3378
    return alias;                                                                                             // 3379
  })                                                                                                          // 3380
  ('Throw', 'throw')                                                                                          // 3381
  ('Throw', 'throws');                                                                                        // 3382
};                                                                                                            // 3383
                                                                                                              // 3384
});                                                                                                           // 3385
require.register("chai/lib/chai/interface/expect.js", function(exports, require, module){                     // 3386
/*!                                                                                                           // 3387
 * chai                                                                                                       // 3388
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3389
 * MIT Licensed                                                                                               // 3390
 */                                                                                                           // 3391
                                                                                                              // 3392
module.exports = function (chai, util) {                                                                      // 3393
  chai.expect = function (val, message) {                                                                     // 3394
    return new chai.Assertion(val, message);                                                                  // 3395
  };                                                                                                          // 3396
};                                                                                                            // 3397
                                                                                                              // 3398
                                                                                                              // 3399
});                                                                                                           // 3400
require.register("chai/lib/chai/interface/should.js", function(exports, require, module){                     // 3401
/*!                                                                                                           // 3402
 * chai                                                                                                       // 3403
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3404
 * MIT Licensed                                                                                               // 3405
 */                                                                                                           // 3406
                                                                                                              // 3407
module.exports = function (chai, util) {                                                                      // 3408
  var Assertion = chai.Assertion;                                                                             // 3409
                                                                                                              // 3410
  function loadShould () {                                                                                    // 3411
    // explicitly define this method as function as to have it's name to include as `ssfi`                    // 3412
    function shouldGetter() {                                                                                 // 3413
      if (this instanceof String || this instanceof Number) {                                                 // 3414
        return new Assertion(this.constructor(this), null, shouldGetter);                                     // 3415
      } else if (this instanceof Boolean) {                                                                   // 3416
        return new Assertion(this == true, null, shouldGetter);                                               // 3417
      }                                                                                                       // 3418
      return new Assertion(this, null, shouldGetter);                                                         // 3419
    }                                                                                                         // 3420
    function shouldSetter(value) {                                                                            // 3421
      // See https://github.com/chaijs/chai/issues/86: this makes                                             // 3422
      // `whatever.should = someValue` actually set `someValue`, which is                                     // 3423
      // especially useful for `global.should = require('chai').should()`.                                    // 3424
      //                                                                                                      // 3425
      // Note that we have to use [[DefineProperty]] instead of [[Put]]                                       // 3426
      // since otherwise we would trigger this very setter!                                                   // 3427
      Object.defineProperty(this, 'should', {                                                                 // 3428
        value: value,                                                                                         // 3429
        enumerable: true,                                                                                     // 3430
        configurable: true,                                                                                   // 3431
        writable: true                                                                                        // 3432
      });                                                                                                     // 3433
    }                                                                                                         // 3434
    // modify Object.prototype to have `should`                                                               // 3435
    Object.defineProperty(Object.prototype, 'should', {                                                       // 3436
      set: shouldSetter                                                                                       // 3437
      , get: shouldGetter                                                                                     // 3438
      , configurable: true                                                                                    // 3439
    });                                                                                                       // 3440
                                                                                                              // 3441
    var should = {};                                                                                          // 3442
                                                                                                              // 3443
    should.equal = function (val1, val2, msg) {                                                               // 3444
      new Assertion(val1, msg).to.equal(val2);                                                                // 3445
    };                                                                                                        // 3446
                                                                                                              // 3447
    should.Throw = function (fn, errt, errs, msg) {                                                           // 3448
      new Assertion(fn, msg).to.Throw(errt, errs);                                                            // 3449
    };                                                                                                        // 3450
                                                                                                              // 3451
    should.exist = function (val, msg) {                                                                      // 3452
      new Assertion(val, msg).to.exist;                                                                       // 3453
    }                                                                                                         // 3454
                                                                                                              // 3455
    // negation                                                                                               // 3456
    should.not = {}                                                                                           // 3457
                                                                                                              // 3458
    should.not.equal = function (val1, val2, msg) {                                                           // 3459
      new Assertion(val1, msg).to.not.equal(val2);                                                            // 3460
    };                                                                                                        // 3461
                                                                                                              // 3462
    should.not.Throw = function (fn, errt, errs, msg) {                                                       // 3463
      new Assertion(fn, msg).to.not.Throw(errt, errs);                                                        // 3464
    };                                                                                                        // 3465
                                                                                                              // 3466
    should.not.exist = function (val, msg) {                                                                  // 3467
      new Assertion(val, msg).to.not.exist;                                                                   // 3468
    }                                                                                                         // 3469
                                                                                                              // 3470
    should['throw'] = should['Throw'];                                                                        // 3471
    should.not['throw'] = should.not['Throw'];                                                                // 3472
                                                                                                              // 3473
    return should;                                                                                            // 3474
  };                                                                                                          // 3475
                                                                                                              // 3476
  chai.should = loadShould;                                                                                   // 3477
  chai.Should = loadShould;                                                                                   // 3478
};                                                                                                            // 3479
                                                                                                              // 3480
});                                                                                                           // 3481
require.register("chai/lib/chai/utils/addChainableMethod.js", function(exports, require, module){             // 3482
/*!                                                                                                           // 3483
 * Chai - addChainingMethod utility                                                                           // 3484
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3485
 * MIT Licensed                                                                                               // 3486
 */                                                                                                           // 3487
                                                                                                              // 3488
/*!                                                                                                           // 3489
 * Module dependencies                                                                                        // 3490
 */                                                                                                           // 3491
                                                                                                              // 3492
var transferFlags = require('./transferFlags');                                                               // 3493
var flag = require('./flag');                                                                                 // 3494
var config = require('../config');                                                                            // 3495
                                                                                                              // 3496
/*!                                                                                                           // 3497
 * Module variables                                                                                           // 3498
 */                                                                                                           // 3499
                                                                                                              // 3500
// Check whether `__proto__` is supported                                                                     // 3501
var hasProtoSupport = '__proto__' in Object;                                                                  // 3502
                                                                                                              // 3503
// Without `__proto__` support, this module will need to add properties to a function.                        // 3504
// However, some Function.prototype methods cannot be overwritten,                                            // 3505
// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).                    // 3506
var excludeNames = /^(?:length|name|arguments|caller)$/;                                                      // 3507
                                                                                                              // 3508
// Cache `Function` properties                                                                                // 3509
var call  = Function.prototype.call,                                                                          // 3510
    apply = Function.prototype.apply;                                                                         // 3511
                                                                                                              // 3512
/**                                                                                                           // 3513
 * ### addChainableMethod (ctx, name, method, chainingBehavior)                                               // 3514
 *                                                                                                            // 3515
 * Adds a method to an object, such that the method can also be chained.                                      // 3516
 *                                                                                                            // 3517
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {                             // 3518
 *       var obj = utils.flag(this, 'object');                                                                // 3519
 *       new chai.Assertion(obj).to.be.equal(str);                                                            // 3520
 *     });                                                                                                    // 3521
 *                                                                                                            // 3522
 * Can also be accessed directly from `chai.Assertion`.                                                       // 3523
 *                                                                                                            // 3524
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);                                        // 3525
 *                                                                                                            // 3526
 * The result can then be used as both a method assertion, executing both `method` and                        // 3527
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.                        // 3528
 *                                                                                                            // 3529
 *     expect(fooStr).to.be.foo('bar');                                                                       // 3530
 *     expect(fooStr).to.be.foo.equal('foo');                                                                 // 3531
 *                                                                                                            // 3532
 * @param {Object} ctx object to which the method is added                                                    // 3533
 * @param {String} name of method to add                                                                      // 3534
 * @param {Function} method function to be used for `name`, when called                                       // 3535
 * @param {Function} chainingBehavior function to be called every time the property is accessed               // 3536
 * @name addChainableMethod                                                                                   // 3537
 * @api public                                                                                                // 3538
 */                                                                                                           // 3539
                                                                                                              // 3540
module.exports = function (ctx, name, method, chainingBehavior) {                                             // 3541
  if (typeof chainingBehavior !== 'function') {                                                               // 3542
    chainingBehavior = function () { };                                                                       // 3543
  }                                                                                                           // 3544
                                                                                                              // 3545
  var chainableBehavior = {                                                                                   // 3546
      method: method                                                                                          // 3547
    , chainingBehavior: chainingBehavior                                                                      // 3548
  };                                                                                                          // 3549
                                                                                                              // 3550
  // save the methods so we can overwrite them later, if we need to.                                          // 3551
  if (!ctx.__methods) {                                                                                       // 3552
    ctx.__methods = {};                                                                                       // 3553
  }                                                                                                           // 3554
  ctx.__methods[name] = chainableBehavior;                                                                    // 3555
                                                                                                              // 3556
  Object.defineProperty(ctx, name,                                                                            // 3557
    { get: function () {                                                                                      // 3558
        chainableBehavior.chainingBehavior.call(this);                                                        // 3559
                                                                                                              // 3560
        var assert = function assert() {                                                                      // 3561
          var old_ssfi = flag(this, 'ssfi');                                                                  // 3562
          if (old_ssfi && config.includeStack === false)                                                      // 3563
            flag(this, 'ssfi', assert);                                                                       // 3564
          var result = chainableBehavior.method.apply(this, arguments);                                       // 3565
          return result === undefined ? this : result;                                                        // 3566
        };                                                                                                    // 3567
                                                                                                              // 3568
        // Use `__proto__` if available                                                                       // 3569
        if (hasProtoSupport) {                                                                                // 3570
          // Inherit all properties from the object by replacing the `Function` prototype                     // 3571
          var prototype = assert.__proto__ = Object.create(this);                                             // 3572
          // Restore the `call` and `apply` methods from `Function`                                           // 3573
          prototype.call = call;                                                                              // 3574
          prototype.apply = apply;                                                                            // 3575
        }                                                                                                     // 3576
        // Otherwise, redefine all properties (slow!)                                                         // 3577
        else {                                                                                                // 3578
          var asserterNames = Object.getOwnPropertyNames(ctx);                                                // 3579
          asserterNames.forEach(function (asserterName) {                                                     // 3580
            if (!excludeNames.test(asserterName)) {                                                           // 3581
              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);                                    // 3582
              Object.defineProperty(assert, asserterName, pd);                                                // 3583
            }                                                                                                 // 3584
          });                                                                                                 // 3585
        }                                                                                                     // 3586
                                                                                                              // 3587
        transferFlags(this, assert);                                                                          // 3588
        return assert;                                                                                        // 3589
      }                                                                                                       // 3590
    , configurable: true                                                                                      // 3591
  });                                                                                                         // 3592
};                                                                                                            // 3593
                                                                                                              // 3594
});                                                                                                           // 3595
require.register("chai/lib/chai/utils/addMethod.js", function(exports, require, module){                      // 3596
/*!                                                                                                           // 3597
 * Chai - addMethod utility                                                                                   // 3598
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3599
 * MIT Licensed                                                                                               // 3600
 */                                                                                                           // 3601
                                                                                                              // 3602
var config = require('../config');                                                                            // 3603
                                                                                                              // 3604
/**                                                                                                           // 3605
 * ### .addMethod (ctx, name, method)                                                                         // 3606
 *                                                                                                            // 3607
 * Adds a method to the prototype of an object.                                                               // 3608
 *                                                                                                            // 3609
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {                                      // 3610
 *       var obj = utils.flag(this, 'object');                                                                // 3611
 *       new chai.Assertion(obj).to.be.equal(str);                                                            // 3612
 *     });                                                                                                    // 3613
 *                                                                                                            // 3614
 * Can also be accessed directly from `chai.Assertion`.                                                       // 3615
 *                                                                                                            // 3616
 *     chai.Assertion.addMethod('foo', fn);                                                                   // 3617
 *                                                                                                            // 3618
 * Then can be used as any other assertion.                                                                   // 3619
 *                                                                                                            // 3620
 *     expect(fooStr).to.be.foo('bar');                                                                       // 3621
 *                                                                                                            // 3622
 * @param {Object} ctx object to which the method is added                                                    // 3623
 * @param {String} name of method to add                                                                      // 3624
 * @param {Function} method function to be used for name                                                      // 3625
 * @name addMethod                                                                                            // 3626
 * @api public                                                                                                // 3627
 */                                                                                                           // 3628
var flag = require('./flag');                                                                                 // 3629
                                                                                                              // 3630
module.exports = function (ctx, name, method) {                                                               // 3631
  ctx[name] = function () {                                                                                   // 3632
    var old_ssfi = flag(this, 'ssfi');                                                                        // 3633
    if (old_ssfi && config.includeStack === false)                                                            // 3634
      flag(this, 'ssfi', ctx[name]);                                                                          // 3635
    var result = method.apply(this, arguments);                                                               // 3636
    return result === undefined ? this : result;                                                              // 3637
  };                                                                                                          // 3638
};                                                                                                            // 3639
                                                                                                              // 3640
});                                                                                                           // 3641
require.register("chai/lib/chai/utils/addProperty.js", function(exports, require, module){                    // 3642
/*!                                                                                                           // 3643
 * Chai - addProperty utility                                                                                 // 3644
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3645
 * MIT Licensed                                                                                               // 3646
 */                                                                                                           // 3647
                                                                                                              // 3648
/**                                                                                                           // 3649
 * ### addProperty (ctx, name, getter)                                                                        // 3650
 *                                                                                                            // 3651
 * Adds a property to the prototype of an object.                                                             // 3652
 *                                                                                                            // 3653
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {                                       // 3654
 *       var obj = utils.flag(this, 'object');                                                                // 3655
 *       new chai.Assertion(obj).to.be.instanceof(Foo);                                                       // 3656
 *     });                                                                                                    // 3657
 *                                                                                                            // 3658
 * Can also be accessed directly from `chai.Assertion`.                                                       // 3659
 *                                                                                                            // 3660
 *     chai.Assertion.addProperty('foo', fn);                                                                 // 3661
 *                                                                                                            // 3662
 * Then can be used as any other assertion.                                                                   // 3663
 *                                                                                                            // 3664
 *     expect(myFoo).to.be.foo;                                                                               // 3665
 *                                                                                                            // 3666
 * @param {Object} ctx object to which the property is added                                                  // 3667
 * @param {String} name of property to add                                                                    // 3668
 * @param {Function} getter function to be used for name                                                      // 3669
 * @name addProperty                                                                                          // 3670
 * @api public                                                                                                // 3671
 */                                                                                                           // 3672
                                                                                                              // 3673
module.exports = function (ctx, name, getter) {                                                               // 3674
  Object.defineProperty(ctx, name,                                                                            // 3675
    { get: function () {                                                                                      // 3676
        var result = getter.call(this);                                                                       // 3677
        return result === undefined ? this : result;                                                          // 3678
      }                                                                                                       // 3679
    , configurable: true                                                                                      // 3680
  });                                                                                                         // 3681
};                                                                                                            // 3682
                                                                                                              // 3683
});                                                                                                           // 3684
require.register("chai/lib/chai/utils/flag.js", function(exports, require, module){                           // 3685
/*!                                                                                                           // 3686
 * Chai - flag utility                                                                                        // 3687
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3688
 * MIT Licensed                                                                                               // 3689
 */                                                                                                           // 3690
                                                                                                              // 3691
/**                                                                                                           // 3692
 * ### flag(object ,key, [value])                                                                             // 3693
 *                                                                                                            // 3694
 * Get or set a flag value on an object. If a                                                                 // 3695
 * value is provided it will be set, else it will                                                             // 3696
 * return the currently set value or `undefined` if                                                           // 3697
 * the value is not set.                                                                                      // 3698
 *                                                                                                            // 3699
 *     utils.flag(this, 'foo', 'bar'); // setter                                                              // 3700
 *     utils.flag(this, 'foo'); // getter, returns `bar`                                                      // 3701
 *                                                                                                            // 3702
 * @param {Object} object (constructed Assertion                                                              // 3703
 * @param {String} key                                                                                        // 3704
 * @param {Mixed} value (optional)                                                                            // 3705
 * @name flag                                                                                                 // 3706
 * @api private                                                                                               // 3707
 */                                                                                                           // 3708
                                                                                                              // 3709
module.exports = function (obj, key, value) {                                                                 // 3710
  var flags = obj.__flags || (obj.__flags = Object.create(null));                                             // 3711
  if (arguments.length === 3) {                                                                               // 3712
    flags[key] = value;                                                                                       // 3713
  } else {                                                                                                    // 3714
    return flags[key];                                                                                        // 3715
  }                                                                                                           // 3716
};                                                                                                            // 3717
                                                                                                              // 3718
});                                                                                                           // 3719
require.register("chai/lib/chai/utils/getActual.js", function(exports, require, module){                      // 3720
/*!                                                                                                           // 3721
 * Chai - getActual utility                                                                                   // 3722
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3723
 * MIT Licensed                                                                                               // 3724
 */                                                                                                           // 3725
                                                                                                              // 3726
/**                                                                                                           // 3727
 * # getActual(object, [actual])                                                                              // 3728
 *                                                                                                            // 3729
 * Returns the `actual` value for an Assertion                                                                // 3730
 *                                                                                                            // 3731
 * @param {Object} object (constructed Assertion)                                                             // 3732
 * @param {Arguments} chai.Assertion.prototype.assert arguments                                               // 3733
 */                                                                                                           // 3734
                                                                                                              // 3735
module.exports = function (obj, args) {                                                                       // 3736
  return args.length > 4 ? args[4] : obj._obj;                                                                // 3737
};                                                                                                            // 3738
                                                                                                              // 3739
});                                                                                                           // 3740
require.register("chai/lib/chai/utils/getEnumerableProperties.js", function(exports, require, module){        // 3741
/*!                                                                                                           // 3742
 * Chai - getEnumerableProperties utility                                                                     // 3743
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3744
 * MIT Licensed                                                                                               // 3745
 */                                                                                                           // 3746
                                                                                                              // 3747
/**                                                                                                           // 3748
 * ### .getEnumerableProperties(object)                                                                       // 3749
 *                                                                                                            // 3750
 * This allows the retrieval of enumerable property names of an object,                                       // 3751
 * inherited or not.                                                                                          // 3752
 *                                                                                                            // 3753
 * @param {Object} object                                                                                     // 3754
 * @returns {Array}                                                                                           // 3755
 * @name getEnumerableProperties                                                                              // 3756
 * @api public                                                                                                // 3757
 */                                                                                                           // 3758
                                                                                                              // 3759
module.exports = function getEnumerableProperties(object) {                                                   // 3760
  var result = [];                                                                                            // 3761
  for (var name in object) {                                                                                  // 3762
    result.push(name);                                                                                        // 3763
  }                                                                                                           // 3764
  return result;                                                                                              // 3765
};                                                                                                            // 3766
                                                                                                              // 3767
});                                                                                                           // 3768
require.register("chai/lib/chai/utils/getMessage.js", function(exports, require, module){                     // 3769
/*!                                                                                                           // 3770
 * Chai - message composition utility                                                                         // 3771
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3772
 * MIT Licensed                                                                                               // 3773
 */                                                                                                           // 3774
                                                                                                              // 3775
/*!                                                                                                           // 3776
 * Module dependancies                                                                                        // 3777
 */                                                                                                           // 3778
                                                                                                              // 3779
var flag = require('./flag')                                                                                  // 3780
  , getActual = require('./getActual')                                                                        // 3781
  , inspect = require('./inspect')                                                                            // 3782
  , objDisplay = require('./objDisplay');                                                                     // 3783
                                                                                                              // 3784
/**                                                                                                           // 3785
 * ### .getMessage(object, message, negateMessage)                                                            // 3786
 *                                                                                                            // 3787
 * Construct the error message based on flags                                                                 // 3788
 * and template tags. Template tags will return                                                               // 3789
 * a stringified inspection of the object referenced.                                                         // 3790
 *                                                                                                            // 3791
 * Message template tags:                                                                                     // 3792
 * - `#{this}` current asserted object                                                                        // 3793
 * - `#{act}` actual value                                                                                    // 3794
 * - `#{exp}` expected value                                                                                  // 3795
 *                                                                                                            // 3796
 * @param {Object} object (constructed Assertion)                                                             // 3797
 * @param {Arguments} chai.Assertion.prototype.assert arguments                                               // 3798
 * @name getMessage                                                                                           // 3799
 * @api public                                                                                                // 3800
 */                                                                                                           // 3801
                                                                                                              // 3802
module.exports = function (obj, args) {                                                                       // 3803
  var negate = flag(obj, 'negate')                                                                            // 3804
    , val = flag(obj, 'object')                                                                               // 3805
    , expected = args[3]                                                                                      // 3806
    , actual = getActual(obj, args)                                                                           // 3807
    , msg = negate ? args[2] : args[1]                                                                        // 3808
    , flagMsg = flag(obj, 'message');                                                                         // 3809
                                                                                                              // 3810
  if(typeof msg === "function") msg = msg();                                                                  // 3811
  msg = msg || '';                                                                                            // 3812
  msg = msg                                                                                                   // 3813
    .replace(/#{this}/g, objDisplay(val))                                                                     // 3814
    .replace(/#{act}/g, objDisplay(actual))                                                                   // 3815
    .replace(/#{exp}/g, objDisplay(expected));                                                                // 3816
                                                                                                              // 3817
  return flagMsg ? flagMsg + ': ' + msg : msg;                                                                // 3818
};                                                                                                            // 3819
                                                                                                              // 3820
});                                                                                                           // 3821
require.register("chai/lib/chai/utils/getName.js", function(exports, require, module){                        // 3822
/*!                                                                                                           // 3823
 * Chai - getName utility                                                                                     // 3824
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3825
 * MIT Licensed                                                                                               // 3826
 */                                                                                                           // 3827
                                                                                                              // 3828
/**                                                                                                           // 3829
 * # getName(func)                                                                                            // 3830
 *                                                                                                            // 3831
 * Gets the name of a function, in a cross-browser way.                                                       // 3832
 *                                                                                                            // 3833
 * @param {Function} a function (usually a constructor)                                                       // 3834
 */                                                                                                           // 3835
                                                                                                              // 3836
module.exports = function (func) {                                                                            // 3837
  if (func.name) return func.name;                                                                            // 3838
                                                                                                              // 3839
  var match = /^\s?function ([^(]*)\(/.exec(func);                                                            // 3840
  return match && match[1] ? match[1] : "";                                                                   // 3841
};                                                                                                            // 3842
                                                                                                              // 3843
});                                                                                                           // 3844
require.register("chai/lib/chai/utils/getPathValue.js", function(exports, require, module){                   // 3845
/*!                                                                                                           // 3846
 * Chai - getPathValue utility                                                                                // 3847
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3848
 * @see https://github.com/logicalparadox/filtr                                                               // 3849
 * MIT Licensed                                                                                               // 3850
 */                                                                                                           // 3851
                                                                                                              // 3852
/**                                                                                                           // 3853
 * ### .getPathValue(path, object)                                                                            // 3854
 *                                                                                                            // 3855
 * This allows the retrieval of values in an                                                                  // 3856
 * object given a string path.                                                                                // 3857
 *                                                                                                            // 3858
 *     var obj = {                                                                                            // 3859
 *         prop1: {                                                                                           // 3860
 *             arr: ['a', 'b', 'c']                                                                           // 3861
 *           , str: 'Hello'                                                                                   // 3862
 *         }                                                                                                  // 3863
 *       , prop2: {                                                                                           // 3864
 *             arr: [ { nested: 'Universe' } ]                                                                // 3865
 *           , str: 'Hello again!'                                                                            // 3866
 *         }                                                                                                  // 3867
 *     }                                                                                                      // 3868
 *                                                                                                            // 3869
 * The following would be the results.                                                                        // 3870
 *                                                                                                            // 3871
 *     getPathValue('prop1.str', obj); // Hello                                                               // 3872
 *     getPathValue('prop1.att[2]', obj); // b                                                                // 3873
 *     getPathValue('prop2.arr[0].nested', obj); // Universe                                                  // 3874
 *                                                                                                            // 3875
 * @param {String} path                                                                                       // 3876
 * @param {Object} object                                                                                     // 3877
 * @returns {Object} value or `undefined`                                                                     // 3878
 * @name getPathValue                                                                                         // 3879
 * @api public                                                                                                // 3880
 */                                                                                                           // 3881
                                                                                                              // 3882
var getPathValue = module.exports = function (path, obj) {                                                    // 3883
  var parsed = parsePath(path);                                                                               // 3884
  return _getPathValue(parsed, obj);                                                                          // 3885
};                                                                                                            // 3886
                                                                                                              // 3887
/*!                                                                                                           // 3888
 * ## parsePath(path)                                                                                         // 3889
 *                                                                                                            // 3890
 * Helper function used to parse string object                                                                // 3891
 * paths. Use in conjunction with `_getPathValue`.                                                            // 3892
 *                                                                                                            // 3893
 *      var parsed = parsePath('myobject.property.subprop');                                                  // 3894
 *                                                                                                            // 3895
 * ### Paths:                                                                                                 // 3896
 *                                                                                                            // 3897
 * * Can be as near infinitely deep and nested                                                                // 3898
 * * Arrays are also valid using the formal `myobject.document[3].property`.                                  // 3899
 *                                                                                                            // 3900
 * @param {String} path                                                                                       // 3901
 * @returns {Object} parsed                                                                                   // 3902
 * @api private                                                                                               // 3903
 */                                                                                                           // 3904
                                                                                                              // 3905
function parsePath (path) {                                                                                   // 3906
  var str = path.replace(/\[/g, '.[')                                                                         // 3907
    , parts = str.match(/(\\\.|[^.]+?)+/g);                                                                   // 3908
  return parts.map(function (value) {                                                                         // 3909
    var re = /\[(\d+)\]$/                                                                                     // 3910
      , mArr = re.exec(value)                                                                                 // 3911
    if (mArr) return { i: parseFloat(mArr[1]) };                                                              // 3912
    else return { p: value };                                                                                 // 3913
  });                                                                                                         // 3914
};                                                                                                            // 3915
                                                                                                              // 3916
/*!                                                                                                           // 3917
 * ## _getPathValue(parsed, obj)                                                                              // 3918
 *                                                                                                            // 3919
 * Helper companion function for `.parsePath` that returns                                                    // 3920
 * the value located at the parsed address.                                                                   // 3921
 *                                                                                                            // 3922
 *      var value = getPathValue(parsed, obj);                                                                // 3923
 *                                                                                                            // 3924
 * @param {Object} parsed definition from `parsePath`.                                                        // 3925
 * @param {Object} object to search against                                                                   // 3926
 * @returns {Object|Undefined} value                                                                          // 3927
 * @api private                                                                                               // 3928
 */                                                                                                           // 3929
                                                                                                              // 3930
function _getPathValue (parsed, obj) {                                                                        // 3931
  var tmp = obj                                                                                               // 3932
    , res;                                                                                                    // 3933
  for (var i = 0, l = parsed.length; i < l; i++) {                                                            // 3934
    var part = parsed[i];                                                                                     // 3935
    if (tmp) {                                                                                                // 3936
      if ('undefined' !== typeof part.p)                                                                      // 3937
        tmp = tmp[part.p];                                                                                    // 3938
      else if ('undefined' !== typeof part.i)                                                                 // 3939
        tmp = tmp[part.i];                                                                                    // 3940
      if (i == (l - 1)) res = tmp;                                                                            // 3941
    } else {                                                                                                  // 3942
      res = undefined;                                                                                        // 3943
    }                                                                                                         // 3944
  }                                                                                                           // 3945
  return res;                                                                                                 // 3946
};                                                                                                            // 3947
                                                                                                              // 3948
});                                                                                                           // 3949
require.register("chai/lib/chai/utils/getProperties.js", function(exports, require, module){                  // 3950
/*!                                                                                                           // 3951
 * Chai - getProperties utility                                                                               // 3952
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 3953
 * MIT Licensed                                                                                               // 3954
 */                                                                                                           // 3955
                                                                                                              // 3956
/**                                                                                                           // 3957
 * ### .getProperties(object)                                                                                 // 3958
 *                                                                                                            // 3959
 * This allows the retrieval of property names of an object, enumerable or not,                               // 3960
 * inherited or not.                                                                                          // 3961
 *                                                                                                            // 3962
 * @param {Object} object                                                                                     // 3963
 * @returns {Array}                                                                                           // 3964
 * @name getProperties                                                                                        // 3965
 * @api public                                                                                                // 3966
 */                                                                                                           // 3967
                                                                                                              // 3968
module.exports = function getProperties(object) {                                                             // 3969
  var result = Object.getOwnPropertyNames(subject);                                                           // 3970
                                                                                                              // 3971
  function addProperty(property) {                                                                            // 3972
    if (result.indexOf(property) === -1) {                                                                    // 3973
      result.push(property);                                                                                  // 3974
    }                                                                                                         // 3975
  }                                                                                                           // 3976
                                                                                                              // 3977
  var proto = Object.getPrototypeOf(subject);                                                                 // 3978
  while (proto !== null) {                                                                                    // 3979
    Object.getOwnPropertyNames(proto).forEach(addProperty);                                                   // 3980
    proto = Object.getPrototypeOf(proto);                                                                     // 3981
  }                                                                                                           // 3982
                                                                                                              // 3983
  return result;                                                                                              // 3984
};                                                                                                            // 3985
                                                                                                              // 3986
});                                                                                                           // 3987
require.register("chai/lib/chai/utils/index.js", function(exports, require, module){                          // 3988
/*!                                                                                                           // 3989
 * chai                                                                                                       // 3990
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>                                                     // 3991
 * MIT Licensed                                                                                               // 3992
 */                                                                                                           // 3993
                                                                                                              // 3994
/*!                                                                                                           // 3995
 * Main exports                                                                                               // 3996
 */                                                                                                           // 3997
                                                                                                              // 3998
var exports = module.exports = {};                                                                            // 3999
                                                                                                              // 4000
/*!                                                                                                           // 4001
 * test utility                                                                                               // 4002
 */                                                                                                           // 4003
                                                                                                              // 4004
exports.test = require('./test');                                                                             // 4005
                                                                                                              // 4006
/*!                                                                                                           // 4007
 * type utility                                                                                               // 4008
 */                                                                                                           // 4009
                                                                                                              // 4010
exports.type = require('./type');                                                                             // 4011
                                                                                                              // 4012
/*!                                                                                                           // 4013
 * message utility                                                                                            // 4014
 */                                                                                                           // 4015
                                                                                                              // 4016
exports.getMessage = require('./getMessage');                                                                 // 4017
                                                                                                              // 4018
/*!                                                                                                           // 4019
 * actual utility                                                                                             // 4020
 */                                                                                                           // 4021
                                                                                                              // 4022
exports.getActual = require('./getActual');                                                                   // 4023
                                                                                                              // 4024
/*!                                                                                                           // 4025
 * Inspect util                                                                                               // 4026
 */                                                                                                           // 4027
                                                                                                              // 4028
exports.inspect = require('./inspect');                                                                       // 4029
                                                                                                              // 4030
/*!                                                                                                           // 4031
 * Object Display util                                                                                        // 4032
 */                                                                                                           // 4033
                                                                                                              // 4034
exports.objDisplay = require('./objDisplay');                                                                 // 4035
                                                                                                              // 4036
/*!                                                                                                           // 4037
 * Flag utility                                                                                               // 4038
 */                                                                                                           // 4039
                                                                                                              // 4040
exports.flag = require('./flag');                                                                             // 4041
                                                                                                              // 4042
/*!                                                                                                           // 4043
 * Flag transferring utility                                                                                  // 4044
 */                                                                                                           // 4045
                                                                                                              // 4046
exports.transferFlags = require('./transferFlags');                                                           // 4047
                                                                                                              // 4048
/*!                                                                                                           // 4049
 * Deep equal utility                                                                                         // 4050
 */                                                                                                           // 4051
                                                                                                              // 4052
exports.eql = require('deep-eql');                                                                            // 4053
                                                                                                              // 4054
/*!                                                                                                           // 4055
 * Deep path value                                                                                            // 4056
 */                                                                                                           // 4057
                                                                                                              // 4058
exports.getPathValue = require('./getPathValue');                                                             // 4059
                                                                                                              // 4060
/*!                                                                                                           // 4061
 * Function name                                                                                              // 4062
 */                                                                                                           // 4063
                                                                                                              // 4064
exports.getName = require('./getName');                                                                       // 4065
                                                                                                              // 4066
/*!                                                                                                           // 4067
 * add Property                                                                                               // 4068
 */                                                                                                           // 4069
                                                                                                              // 4070
exports.addProperty = require('./addProperty');                                                               // 4071
                                                                                                              // 4072
/*!                                                                                                           // 4073
 * add Method                                                                                                 // 4074
 */                                                                                                           // 4075
                                                                                                              // 4076
exports.addMethod = require('./addMethod');                                                                   // 4077
                                                                                                              // 4078
/*!                                                                                                           // 4079
 * overwrite Property                                                                                         // 4080
 */                                                                                                           // 4081
                                                                                                              // 4082
exports.overwriteProperty = require('./overwriteProperty');                                                   // 4083
                                                                                                              // 4084
/*!                                                                                                           // 4085
 * overwrite Method                                                                                           // 4086
 */                                                                                                           // 4087
                                                                                                              // 4088
exports.overwriteMethod = require('./overwriteMethod');                                                       // 4089
                                                                                                              // 4090
/*!                                                                                                           // 4091
 * Add a chainable method                                                                                     // 4092
 */                                                                                                           // 4093
                                                                                                              // 4094
exports.addChainableMethod = require('./addChainableMethod');                                                 // 4095
                                                                                                              // 4096
/*!                                                                                                           // 4097
 * Overwrite chainable method                                                                                 // 4098
 */                                                                                                           // 4099
                                                                                                              // 4100
exports.overwriteChainableMethod = require('./overwriteChainableMethod');                                     // 4101
                                                                                                              // 4102
                                                                                                              // 4103
});                                                                                                           // 4104
require.register("chai/lib/chai/utils/inspect.js", function(exports, require, module){                        // 4105
// This is (almost) directly from Node.js utils                                                               // 4106
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js                   // 4107
                                                                                                              // 4108
var getName = require('./getName');                                                                           // 4109
var getProperties = require('./getProperties');                                                               // 4110
var getEnumerableProperties = require('./getEnumerableProperties');                                           // 4111
                                                                                                              // 4112
module.exports = inspect;                                                                                     // 4113
                                                                                                              // 4114
/**                                                                                                           // 4115
 * Echos the value of a value. Trys to print the value out                                                    // 4116
 * in the best way possible given the different types.                                                        // 4117
 *                                                                                                            // 4118
 * @param {Object} obj The object to print out.                                                               // 4119
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)                                        // 4120
 *    properties of objects.                                                                                  // 4121
 * @param {Number} depth Depth in which to descend in object. Default is 2.                                   // 4122
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the                                     // 4123
 *    output. Default is false (no coloring).                                                                 // 4124
 */                                                                                                           // 4125
function inspect(obj, showHidden, depth, colors) {                                                            // 4126
  var ctx = {                                                                                                 // 4127
    showHidden: showHidden,                                                                                   // 4128
    seen: [],                                                                                                 // 4129
    stylize: function (str) { return str; }                                                                   // 4130
  };                                                                                                          // 4131
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));                                   // 4132
}                                                                                                             // 4133
                                                                                                              // 4134
// Returns true if object is a DOM element.                                                                   // 4135
var isDOMElement = function (object) {                                                                        // 4136
  if (typeof HTMLElement === 'object') {                                                                      // 4137
    return object instanceof HTMLElement;                                                                     // 4138
  } else {                                                                                                    // 4139
    return object &&                                                                                          // 4140
      typeof object === 'object' &&                                                                           // 4141
      object.nodeType === 1 &&                                                                                // 4142
      typeof object.nodeName === 'string';                                                                    // 4143
  }                                                                                                           // 4144
};                                                                                                            // 4145
                                                                                                              // 4146
function formatValue(ctx, value, recurseTimes) {                                                              // 4147
  // Provide a hook for user-specified inspect functions.                                                     // 4148
  // Check that value is an object with an inspect function on it                                             // 4149
  if (value && typeof value.inspect === 'function' &&                                                         // 4150
      // Filter out the util module, it's inspect function is special                                         // 4151
      value.inspect !== exports.inspect &&                                                                    // 4152
      // Also filter out any prototype objects using the circular check.                                      // 4153
      !(value.constructor && value.constructor.prototype === value)) {                                        // 4154
    var ret = value.inspect(recurseTimes);                                                                    // 4155
    if (typeof ret !== 'string') {                                                                            // 4156
      ret = formatValue(ctx, ret, recurseTimes);                                                              // 4157
    }                                                                                                         // 4158
    return ret;                                                                                               // 4159
  }                                                                                                           // 4160
                                                                                                              // 4161
  // Primitive types cannot have properties                                                                   // 4162
  var primitive = formatPrimitive(ctx, value);                                                                // 4163
  if (primitive) {                                                                                            // 4164
    return primitive;                                                                                         // 4165
  }                                                                                                           // 4166
                                                                                                              // 4167
  // If this is a DOM element, try to get the outer HTML.                                                     // 4168
  if (isDOMElement(value)) {                                                                                  // 4169
    if ('outerHTML' in value) {                                                                               // 4170
      return value.outerHTML;                                                                                 // 4171
      // This value does not have an outerHTML attribute,                                                     // 4172
      //   it could still be an XML element                                                                   // 4173
    } else {                                                                                                  // 4174
      // Attempt to serialize it                                                                              // 4175
      try {                                                                                                   // 4176
        if (document.xmlVersion) {                                                                            // 4177
          var xmlSerializer = new XMLSerializer();                                                            // 4178
          return xmlSerializer.serializeToString(value);                                                      // 4179
        } else {                                                                                              // 4180
          // Firefox 11- do not support outerHTML                                                             // 4181
          //   It does, however, support innerHTML                                                            // 4182
          //   Use the following to render the element                                                        // 4183
          var ns = "http://www.w3.org/1999/xhtml";                                                            // 4184
          var container = document.createElementNS(ns, '_');                                                  // 4185
                                                                                                              // 4186
          container.appendChild(value.cloneNode(false));                                                      // 4187
          html = container.innerHTML                                                                          // 4188
            .replace('><', '>' + value.innerHTML + '<');                                                      // 4189
          container.innerHTML = '';                                                                           // 4190
          return html;                                                                                        // 4191
        }                                                                                                     // 4192
      } catch (err) {                                                                                         // 4193
        // This could be a non-native DOM implementation,                                                     // 4194
        //   continue with the normal flow:                                                                   // 4195
        //   printing the element as if it is an object.                                                      // 4196
      }                                                                                                       // 4197
    }                                                                                                         // 4198
  }                                                                                                           // 4199
                                                                                                              // 4200
  // Look up the keys of the object.                                                                          // 4201
  var visibleKeys = getEnumerableProperties(value);                                                           // 4202
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;                                             // 4203
                                                                                                              // 4204
  // Some type of object without properties can be shortcutted.                                               // 4205
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,                            // 4206
  // a `stack` plus `description` property; ignore those for consistency.                                     // 4207
  if (keys.length === 0 || (isError(value) && (                                                               // 4208
      (keys.length === 1 && keys[0] === 'stack') ||                                                           // 4209
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')                                 // 4210
     ))) {                                                                                                    // 4211
    if (typeof value === 'function') {                                                                        // 4212
      var name = getName(value);                                                                              // 4213
      var nameSuffix = name ? ': ' + name : '';                                                               // 4214
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');                                          // 4215
    }                                                                                                         // 4216
    if (isRegExp(value)) {                                                                                    // 4217
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');                                    // 4218
    }                                                                                                         // 4219
    if (isDate(value)) {                                                                                      // 4220
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');                                     // 4221
    }                                                                                                         // 4222
    if (isError(value)) {                                                                                     // 4223
      return formatError(value);                                                                              // 4224
    }                                                                                                         // 4225
  }                                                                                                           // 4226
                                                                                                              // 4227
  var base = '', array = false, braces = ['{', '}'];                                                          // 4228
                                                                                                              // 4229
  // Make Array say that they are Array                                                                       // 4230
  if (isArray(value)) {                                                                                       // 4231
    array = true;                                                                                             // 4232
    braces = ['[', ']'];                                                                                      // 4233
  }                                                                                                           // 4234
                                                                                                              // 4235
  // Make functions say that they are functions                                                               // 4236
  if (typeof value === 'function') {                                                                          // 4237
    var name = getName(value);                                                                                // 4238
    var nameSuffix = name ? ': ' + name : '';                                                                 // 4239
    base = ' [Function' + nameSuffix + ']';                                                                   // 4240
  }                                                                                                           // 4241
                                                                                                              // 4242
  // Make RegExps say that they are RegExps                                                                   // 4243
  if (isRegExp(value)) {                                                                                      // 4244
    base = ' ' + RegExp.prototype.toString.call(value);                                                       // 4245
  }                                                                                                           // 4246
                                                                                                              // 4247
  // Make dates with properties first say the date                                                            // 4248
  if (isDate(value)) {                                                                                        // 4249
    base = ' ' + Date.prototype.toUTCString.call(value);                                                      // 4250
  }                                                                                                           // 4251
                                                                                                              // 4252
  // Make error with message first say the error                                                              // 4253
  if (isError(value)) {                                                                                       // 4254
    return formatError(value);                                                                                // 4255
  }                                                                                                           // 4256
                                                                                                              // 4257
  if (keys.length === 0 && (!array || value.length == 0)) {                                                   // 4258
    return braces[0] + base + braces[1];                                                                      // 4259
  }                                                                                                           // 4260
                                                                                                              // 4261
  if (recurseTimes < 0) {                                                                                     // 4262
    if (isRegExp(value)) {                                                                                    // 4263
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');                                    // 4264
    } else {                                                                                                  // 4265
      return ctx.stylize('[Object]', 'special');                                                              // 4266
    }                                                                                                         // 4267
  }                                                                                                           // 4268
                                                                                                              // 4269
  ctx.seen.push(value);                                                                                       // 4270
                                                                                                              // 4271
  var output;                                                                                                 // 4272
  if (array) {                                                                                                // 4273
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);                                        // 4274
  } else {                                                                                                    // 4275
    output = keys.map(function(key) {                                                                         // 4276
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);                               // 4277
    });                                                                                                       // 4278
  }                                                                                                           // 4279
                                                                                                              // 4280
  ctx.seen.pop();                                                                                             // 4281
                                                                                                              // 4282
  return reduceToSingleString(output, base, braces);                                                          // 4283
}                                                                                                             // 4284
                                                                                                              // 4285
                                                                                                              // 4286
function formatPrimitive(ctx, value) {                                                                        // 4287
  switch (typeof value) {                                                                                     // 4288
    case 'undefined':                                                                                         // 4289
      return ctx.stylize('undefined', 'undefined');                                                           // 4290
                                                                                                              // 4291
    case 'string':                                                                                            // 4292
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')                                         // 4293
                                               .replace(/'/g, "\\'")                                          // 4294
                                               .replace(/\\"/g, '"') + '\'';                                  // 4295
      return ctx.stylize(simple, 'string');                                                                   // 4296
                                                                                                              // 4297
    case 'number':                                                                                            // 4298
      return ctx.stylize('' + value, 'number');                                                               // 4299
                                                                                                              // 4300
    case 'boolean':                                                                                           // 4301
      return ctx.stylize('' + value, 'boolean');                                                              // 4302
  }                                                                                                           // 4303
  // For some reason typeof null is "object", so special case here.                                           // 4304
  if (value === null) {                                                                                       // 4305
    return ctx.stylize('null', 'null');                                                                       // 4306
  }                                                                                                           // 4307
}                                                                                                             // 4308
                                                                                                              // 4309
                                                                                                              // 4310
function formatError(value) {                                                                                 // 4311
  return '[' + Error.prototype.toString.call(value) + ']';                                                    // 4312
}                                                                                                             // 4313
                                                                                                              // 4314
                                                                                                              // 4315
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {                                           // 4316
  var output = [];                                                                                            // 4317
  for (var i = 0, l = value.length; i < l; ++i) {                                                             // 4318
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {                                             // 4319
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,                                       // 4320
          String(i), true));                                                                                  // 4321
    } else {                                                                                                  // 4322
      output.push('');                                                                                        // 4323
    }                                                                                                         // 4324
  }                                                                                                           // 4325
  keys.forEach(function(key) {                                                                                // 4326
    if (!key.match(/^\d+$/)) {                                                                                // 4327
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,                                       // 4328
          key, true));                                                                                        // 4329
    }                                                                                                         // 4330
  });                                                                                                         // 4331
  return output;                                                                                              // 4332
}                                                                                                             // 4333
                                                                                                              // 4334
                                                                                                              // 4335
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {                                  // 4336
  var name, str;                                                                                              // 4337
  if (value.__lookupGetter__) {                                                                               // 4338
    if (value.__lookupGetter__(key)) {                                                                        // 4339
      if (value.__lookupSetter__(key)) {                                                                      // 4340
        str = ctx.stylize('[Getter/Setter]', 'special');                                                      // 4341
      } else {                                                                                                // 4342
        str = ctx.stylize('[Getter]', 'special');                                                             // 4343
      }                                                                                                       // 4344
    } else {                                                                                                  // 4345
      if (value.__lookupSetter__(key)) {                                                                      // 4346
        str = ctx.stylize('[Setter]', 'special');                                                             // 4347
      }                                                                                                       // 4348
    }                                                                                                         // 4349
  }                                                                                                           // 4350
  if (visibleKeys.indexOf(key) < 0) {                                                                         // 4351
    name = '[' + key + ']';                                                                                   // 4352
  }                                                                                                           // 4353
  if (!str) {                                                                                                 // 4354
    if (ctx.seen.indexOf(value[key]) < 0) {                                                                   // 4355
      if (recurseTimes === null) {                                                                            // 4356
        str = formatValue(ctx, value[key], null);                                                             // 4357
      } else {                                                                                                // 4358
        str = formatValue(ctx, value[key], recurseTimes - 1);                                                 // 4359
      }                                                                                                       // 4360
      if (str.indexOf('\n') > -1) {                                                                           // 4361
        if (array) {                                                                                          // 4362
          str = str.split('\n').map(function(line) {                                                          // 4363
            return '  ' + line;                                                                               // 4364
          }).join('\n').substr(2);                                                                            // 4365
        } else {                                                                                              // 4366
          str = '\n' + str.split('\n').map(function(line) {                                                   // 4367
            return '   ' + line;                                                                              // 4368
          }).join('\n');                                                                                      // 4369
        }                                                                                                     // 4370
      }                                                                                                       // 4371
    } else {                                                                                                  // 4372
      str = ctx.stylize('[Circular]', 'special');                                                             // 4373
    }                                                                                                         // 4374
  }                                                                                                           // 4375
  if (typeof name === 'undefined') {                                                                          // 4376
    if (array && key.match(/^\d+$/)) {                                                                        // 4377
      return str;                                                                                             // 4378
    }                                                                                                         // 4379
    name = JSON.stringify('' + key);                                                                          // 4380
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {                                                         // 4381
      name = name.substr(1, name.length - 2);                                                                 // 4382
      name = ctx.stylize(name, 'name');                                                                       // 4383
    } else {                                                                                                  // 4384
      name = name.replace(/'/g, "\\'")                                                                        // 4385
                 .replace(/\\"/g, '"')                                                                        // 4386
                 .replace(/(^"|"$)/g, "'");                                                                   // 4387
      name = ctx.stylize(name, 'string');                                                                     // 4388
    }                                                                                                         // 4389
  }                                                                                                           // 4390
                                                                                                              // 4391
  return name + ': ' + str;                                                                                   // 4392
}                                                                                                             // 4393
                                                                                                              // 4394
                                                                                                              // 4395
function reduceToSingleString(output, base, braces) {                                                         // 4396
  var numLinesEst = 0;                                                                                        // 4397
  var length = output.reduce(function(prev, cur) {                                                            // 4398
    numLinesEst++;                                                                                            // 4399
    if (cur.indexOf('\n') >= 0) numLinesEst++;                                                                // 4400
    return prev + cur.length + 1;                                                                             // 4401
  }, 0);                                                                                                      // 4402
                                                                                                              // 4403
  if (length > 60) {                                                                                          // 4404
    return braces[0] +                                                                                        // 4405
           (base === '' ? '' : base + '\n ') +                                                                // 4406
           ' ' +                                                                                              // 4407
           output.join(',\n  ') +                                                                             // 4408
           ' ' +                                                                                              // 4409
           braces[1];                                                                                         // 4410
  }                                                                                                           // 4411
                                                                                                              // 4412
  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];                                        // 4413
}                                                                                                             // 4414
                                                                                                              // 4415
function isArray(ar) {                                                                                        // 4416
  return Array.isArray(ar) ||                                                                                 // 4417
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');                                 // 4418
}                                                                                                             // 4419
                                                                                                              // 4420
function isRegExp(re) {                                                                                       // 4421
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';                                  // 4422
}                                                                                                             // 4423
                                                                                                              // 4424
function isDate(d) {                                                                                          // 4425
  return typeof d === 'object' && objectToString(d) === '[object Date]';                                      // 4426
}                                                                                                             // 4427
                                                                                                              // 4428
function isError(e) {                                                                                         // 4429
  return typeof e === 'object' && objectToString(e) === '[object Error]';                                     // 4430
}                                                                                                             // 4431
                                                                                                              // 4432
function objectToString(o) {                                                                                  // 4433
  return Object.prototype.toString.call(o);                                                                   // 4434
}                                                                                                             // 4435
                                                                                                              // 4436
});                                                                                                           // 4437
require.register("chai/lib/chai/utils/objDisplay.js", function(exports, require, module){                     // 4438
/*!                                                                                                           // 4439
 * Chai - flag utility                                                                                        // 4440
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4441
 * MIT Licensed                                                                                               // 4442
 */                                                                                                           // 4443
                                                                                                              // 4444
/*!                                                                                                           // 4445
 * Module dependancies                                                                                        // 4446
 */                                                                                                           // 4447
                                                                                                              // 4448
var inspect = require('./inspect');                                                                           // 4449
var config = require('../config');                                                                            // 4450
                                                                                                              // 4451
/**                                                                                                           // 4452
 * ### .objDisplay (object)                                                                                   // 4453
 *                                                                                                            // 4454
 * Determines if an object or an array matches                                                                // 4455
 * criteria to be inspected in-line for error                                                                 // 4456
 * messages or should be truncated.                                                                           // 4457
 *                                                                                                            // 4458
 * @param {Mixed} javascript object to inspect                                                                // 4459
 * @name objDisplay                                                                                           // 4460
 * @api public                                                                                                // 4461
 */                                                                                                           // 4462
                                                                                                              // 4463
module.exports = function (obj) {                                                                             // 4464
  var str = inspect(obj)                                                                                      // 4465
    , type = Object.prototype.toString.call(obj);                                                             // 4466
                                                                                                              // 4467
  if (config.truncateThreshold && str.length >= config.truncateThreshold) {                                   // 4468
    if (type === '[object Function]') {                                                                       // 4469
      return !obj.name || obj.name === ''                                                                     // 4470
        ? '[Function]'                                                                                        // 4471
        : '[Function: ' + obj.name + ']';                                                                     // 4472
    } else if (type === '[object Array]') {                                                                   // 4473
      return '[ Array(' + obj.length + ') ]';                                                                 // 4474
    } else if (type === '[object Object]') {                                                                  // 4475
      var keys = Object.keys(obj)                                                                             // 4476
        , kstr = keys.length > 2                                                                              // 4477
          ? keys.splice(0, 2).join(', ') + ', ...'                                                            // 4478
          : keys.join(', ');                                                                                  // 4479
      return '{ Object (' + kstr + ') }';                                                                     // 4480
    } else {                                                                                                  // 4481
      return str;                                                                                             // 4482
    }                                                                                                         // 4483
  } else {                                                                                                    // 4484
    return str;                                                                                               // 4485
  }                                                                                                           // 4486
};                                                                                                            // 4487
                                                                                                              // 4488
});                                                                                                           // 4489
require.register("chai/lib/chai/utils/overwriteMethod.js", function(exports, require, module){                // 4490
/*!                                                                                                           // 4491
 * Chai - overwriteMethod utility                                                                             // 4492
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4493
 * MIT Licensed                                                                                               // 4494
 */                                                                                                           // 4495
                                                                                                              // 4496
/**                                                                                                           // 4497
 * ### overwriteMethod (ctx, name, fn)                                                                        // 4498
 *                                                                                                            // 4499
 * Overwites an already existing method and provides                                                          // 4500
 * access to previous function. Must return function                                                          // 4501
 * to be used for name.                                                                                       // 4502
 *                                                                                                            // 4503
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {                           // 4504
 *       return function (str) {                                                                              // 4505
 *         var obj = utils.flag(this, 'object');                                                              // 4506
 *         if (obj instanceof Foo) {                                                                          // 4507
 *           new chai.Assertion(obj.value).to.equal(str);                                                     // 4508
 *         } else {                                                                                           // 4509
 *           _super.apply(this, arguments);                                                                   // 4510
 *         }                                                                                                  // 4511
 *       }                                                                                                    // 4512
 *     });                                                                                                    // 4513
 *                                                                                                            // 4514
 * Can also be accessed directly from `chai.Assertion`.                                                       // 4515
 *                                                                                                            // 4516
 *     chai.Assertion.overwriteMethod('foo', fn);                                                             // 4517
 *                                                                                                            // 4518
 * Then can be used as any other assertion.                                                                   // 4519
 *                                                                                                            // 4520
 *     expect(myFoo).to.equal('bar');                                                                         // 4521
 *                                                                                                            // 4522
 * @param {Object} ctx object whose method is to be overwritten                                               // 4523
 * @param {String} name of method to overwrite                                                                // 4524
 * @param {Function} method function that returns a function to be used for name                              // 4525
 * @name overwriteMethod                                                                                      // 4526
 * @api public                                                                                                // 4527
 */                                                                                                           // 4528
                                                                                                              // 4529
module.exports = function (ctx, name, method) {                                                               // 4530
  var _method = ctx[name]                                                                                     // 4531
    , _super = function () { return this; };                                                                  // 4532
                                                                                                              // 4533
  if (_method && 'function' === typeof _method)                                                               // 4534
    _super = _method;                                                                                         // 4535
                                                                                                              // 4536
  ctx[name] = function () {                                                                                   // 4537
    var result = method(_super).apply(this, arguments);                                                       // 4538
    return result === undefined ? this : result;                                                              // 4539
  }                                                                                                           // 4540
};                                                                                                            // 4541
                                                                                                              // 4542
});                                                                                                           // 4543
require.register("chai/lib/chai/utils/overwriteProperty.js", function(exports, require, module){              // 4544
/*!                                                                                                           // 4545
 * Chai - overwriteProperty utility                                                                           // 4546
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4547
 * MIT Licensed                                                                                               // 4548
 */                                                                                                           // 4549
                                                                                                              // 4550
/**                                                                                                           // 4551
 * ### overwriteProperty (ctx, name, fn)                                                                      // 4552
 *                                                                                                            // 4553
 * Overwites an already existing property getter and provides                                                 // 4554
 * access to previous value. Must return function to use as getter.                                           // 4555
 *                                                                                                            // 4556
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {                            // 4557
 *       return function () {                                                                                 // 4558
 *         var obj = utils.flag(this, 'object');                                                              // 4559
 *         if (obj instanceof Foo) {                                                                          // 4560
 *           new chai.Assertion(obj.name).to.equal('bar');                                                    // 4561
 *         } else {                                                                                           // 4562
 *           _super.call(this);                                                                               // 4563
 *         }                                                                                                  // 4564
 *       }                                                                                                    // 4565
 *     });                                                                                                    // 4566
 *                                                                                                            // 4567
 *                                                                                                            // 4568
 * Can also be accessed directly from `chai.Assertion`.                                                       // 4569
 *                                                                                                            // 4570
 *     chai.Assertion.overwriteProperty('foo', fn);                                                           // 4571
 *                                                                                                            // 4572
 * Then can be used as any other assertion.                                                                   // 4573
 *                                                                                                            // 4574
 *     expect(myFoo).to.be.ok;                                                                                // 4575
 *                                                                                                            // 4576
 * @param {Object} ctx object whose property is to be overwritten                                             // 4577
 * @param {String} name of property to overwrite                                                              // 4578
 * @param {Function} getter function that returns a getter function to be used for name                       // 4579
 * @name overwriteProperty                                                                                    // 4580
 * @api public                                                                                                // 4581
 */                                                                                                           // 4582
                                                                                                              // 4583
module.exports = function (ctx, name, getter) {                                                               // 4584
  var _get = Object.getOwnPropertyDescriptor(ctx, name)                                                       // 4585
    , _super = function () {};                                                                                // 4586
                                                                                                              // 4587
  if (_get && 'function' === typeof _get.get)                                                                 // 4588
    _super = _get.get                                                                                         // 4589
                                                                                                              // 4590
  Object.defineProperty(ctx, name,                                                                            // 4591
    { get: function () {                                                                                      // 4592
        var result = getter(_super).call(this);                                                               // 4593
        return result === undefined ? this : result;                                                          // 4594
      }                                                                                                       // 4595
    , configurable: true                                                                                      // 4596
  });                                                                                                         // 4597
};                                                                                                            // 4598
                                                                                                              // 4599
});                                                                                                           // 4600
require.register("chai/lib/chai/utils/overwriteChainableMethod.js", function(exports, require, module){       // 4601
/*!                                                                                                           // 4602
 * Chai - overwriteChainableMethod utility                                                                    // 4603
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4604
 * MIT Licensed                                                                                               // 4605
 */                                                                                                           // 4606
                                                                                                              // 4607
/**                                                                                                           // 4608
 * ### overwriteChainableMethod (ctx, name, fn)                                                               // 4609
 *                                                                                                            // 4610
 * Overwites an already existing chainable method                                                             // 4611
 * and provides access to the previous function or                                                            // 4612
 * property.  Must return functions to be used for                                                            // 4613
 * name.                                                                                                      // 4614
 *                                                                                                            // 4615
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',                                     // 4616
 *       function (_super) {                                                                                  // 4617
 *       }                                                                                                    // 4618
 *     , function (_super) {                                                                                  // 4619
 *       }                                                                                                    // 4620
 *     );                                                                                                     // 4621
 *                                                                                                            // 4622
 * Can also be accessed directly from `chai.Assertion`.                                                       // 4623
 *                                                                                                            // 4624
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);                                                // 4625
 *                                                                                                            // 4626
 * Then can be used as any other assertion.                                                                   // 4627
 *                                                                                                            // 4628
 *     expect(myFoo).to.have.length(3);                                                                       // 4629
 *     expect(myFoo).to.have.length.above(3);                                                                 // 4630
 *                                                                                                            // 4631
 * @param {Object} ctx object whose method / property is to be overwritten                                    // 4632
 * @param {String} name of method / property to overwrite                                                     // 4633
 * @param {Function} method function that returns a function to be used for name                              // 4634
 * @param {Function} chainingBehavior function that returns a function to be used for property                // 4635
 * @name overwriteChainableMethod                                                                             // 4636
 * @api public                                                                                                // 4637
 */                                                                                                           // 4638
                                                                                                              // 4639
module.exports = function (ctx, name, method, chainingBehavior) {                                             // 4640
  var chainableBehavior = ctx.__methods[name];                                                                // 4641
                                                                                                              // 4642
  var _chainingBehavior = chainableBehavior.chainingBehavior;                                                 // 4643
  chainableBehavior.chainingBehavior = function () {                                                          // 4644
    var result = chainingBehavior(_chainingBehavior).call(this);                                              // 4645
    return result === undefined ? this : result;                                                              // 4646
  };                                                                                                          // 4647
                                                                                                              // 4648
  var _method = chainableBehavior.method;                                                                     // 4649
  chainableBehavior.method = function () {                                                                    // 4650
    var result = method(_method).apply(this, arguments);                                                      // 4651
    return result === undefined ? this : result;                                                              // 4652
  };                                                                                                          // 4653
};                                                                                                            // 4654
                                                                                                              // 4655
});                                                                                                           // 4656
require.register("chai/lib/chai/utils/test.js", function(exports, require, module){                           // 4657
/*!                                                                                                           // 4658
 * Chai - test utility                                                                                        // 4659
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4660
 * MIT Licensed                                                                                               // 4661
 */                                                                                                           // 4662
                                                                                                              // 4663
/*!                                                                                                           // 4664
 * Module dependancies                                                                                        // 4665
 */                                                                                                           // 4666
                                                                                                              // 4667
var flag = require('./flag');                                                                                 // 4668
                                                                                                              // 4669
/**                                                                                                           // 4670
 * # test(object, expression)                                                                                 // 4671
 *                                                                                                            // 4672
 * Test and object for expression.                                                                            // 4673
 *                                                                                                            // 4674
 * @param {Object} object (constructed Assertion)                                                             // 4675
 * @param {Arguments} chai.Assertion.prototype.assert arguments                                               // 4676
 */                                                                                                           // 4677
                                                                                                              // 4678
module.exports = function (obj, args) {                                                                       // 4679
  var negate = flag(obj, 'negate')                                                                            // 4680
    , expr = args[0];                                                                                         // 4681
  return negate ? !expr : expr;                                                                               // 4682
};                                                                                                            // 4683
                                                                                                              // 4684
});                                                                                                           // 4685
require.register("chai/lib/chai/utils/transferFlags.js", function(exports, require, module){                  // 4686
/*!                                                                                                           // 4687
 * Chai - transferFlags utility                                                                               // 4688
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4689
 * MIT Licensed                                                                                               // 4690
 */                                                                                                           // 4691
                                                                                                              // 4692
/**                                                                                                           // 4693
 * ### transferFlags(assertion, object, includeAll = true)                                                    // 4694
 *                                                                                                            // 4695
 * Transfer all the flags for `assertion` to `object`. If                                                     // 4696
 * `includeAll` is set to `false`, then the base Chai                                                         // 4697
 * assertion flags (namely `object`, `ssfi`, and `message`)                                                   // 4698
 * will not be transferred.                                                                                   // 4699
 *                                                                                                            // 4700
 *                                                                                                            // 4701
 *     var newAssertion = new Assertion();                                                                    // 4702
 *     utils.transferFlags(assertion, newAssertion);                                                          // 4703
 *                                                                                                            // 4704
 *     var anotherAsseriton = new Assertion(myObj);                                                           // 4705
 *     utils.transferFlags(assertion, anotherAssertion, false);                                               // 4706
 *                                                                                                            // 4707
 * @param {Assertion} assertion the assertion to transfer the flags from                                      // 4708
 * @param {Object} object the object to transfer the flags too; usually a new assertion                       // 4709
 * @param {Boolean} includeAll                                                                                // 4710
 * @name getAllFlags                                                                                          // 4711
 * @api private                                                                                               // 4712
 */                                                                                                           // 4713
                                                                                                              // 4714
module.exports = function (assertion, object, includeAll) {                                                   // 4715
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));                                 // 4716
                                                                                                              // 4717
  if (!object.__flags) {                                                                                      // 4718
    object.__flags = Object.create(null);                                                                     // 4719
  }                                                                                                           // 4720
                                                                                                              // 4721
  includeAll = arguments.length === 3 ? includeAll : true;                                                    // 4722
                                                                                                              // 4723
  for (var flag in flags) {                                                                                   // 4724
    if (includeAll ||                                                                                         // 4725
        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {                                        // 4726
      object.__flags[flag] = flags[flag];                                                                     // 4727
    }                                                                                                         // 4728
  }                                                                                                           // 4729
};                                                                                                            // 4730
                                                                                                              // 4731
});                                                                                                           // 4732
require.register("chai/lib/chai/utils/type.js", function(exports, require, module){                           // 4733
/*!                                                                                                           // 4734
 * Chai - type utility                                                                                        // 4735
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>                                                // 4736
 * MIT Licensed                                                                                               // 4737
 */                                                                                                           // 4738
                                                                                                              // 4739
/*!                                                                                                           // 4740
 * Detectable javascript natives                                                                              // 4741
 */                                                                                                           // 4742
                                                                                                              // 4743
var natives = {                                                                                               // 4744
    '[object Arguments]': 'arguments'                                                                         // 4745
  , '[object Array]': 'array'                                                                                 // 4746
  , '[object Date]': 'date'                                                                                   // 4747
  , '[object Function]': 'function'                                                                           // 4748
  , '[object Number]': 'number'                                                                               // 4749
  , '[object RegExp]': 'regexp'                                                                               // 4750
  , '[object String]': 'string'                                                                               // 4751
};                                                                                                            // 4752
                                                                                                              // 4753
/**                                                                                                           // 4754
 * ### type(object)                                                                                           // 4755
 *                                                                                                            // 4756
 * Better implementation of `typeof` detection that can                                                       // 4757
 * be used cross-browser. Handles the inconsistencies of                                                      // 4758
 * Array, `null`, and `undefined` detection.                                                                  // 4759
 *                                                                                                            // 4760
 *     utils.type({}) // 'object'                                                                             // 4761
 *     utils.type(null) // `null'                                                                             // 4762
 *     utils.type(undefined) // `undefined`                                                                   // 4763
 *     utils.type([]) // `array`                                                                              // 4764
 *                                                                                                            // 4765
 * @param {Mixed} object to detect type of                                                                    // 4766
 * @name type                                                                                                 // 4767
 * @api private                                                                                               // 4768
 */                                                                                                           // 4769
                                                                                                              // 4770
module.exports = function (obj) {                                                                             // 4771
  var str = Object.prototype.toString.call(obj);                                                              // 4772
  if (natives[str]) return natives[str];                                                                      // 4773
  if (obj === null) return 'null';                                                                            // 4774
  if (obj === undefined) return 'undefined';                                                                  // 4775
  if (obj === Object(obj)) return 'object';                                                                   // 4776
  return typeof obj;                                                                                          // 4777
};                                                                                                            // 4778
                                                                                                              // 4779
});                                                                                                           // 4780
                                                                                                              // 4781
                                                                                                              // 4782
                                                                                                              // 4783
                                                                                                              // 4784
require.alias("chaijs-assertion-error/index.js", "chai/deps/assertion-error/index.js");                       // 4785
require.alias("chaijs-assertion-error/index.js", "chai/deps/assertion-error/index.js");                       // 4786
require.alias("chaijs-assertion-error/index.js", "assertion-error/index.js");                                 // 4787
require.alias("chaijs-assertion-error/index.js", "chaijs-assertion-error/index.js");                          // 4788
require.alias("chaijs-deep-eql/lib/eql.js", "chai/deps/deep-eql/lib/eql.js");                                 // 4789
require.alias("chaijs-deep-eql/lib/eql.js", "chai/deps/deep-eql/index.js");                                   // 4790
require.alias("chaijs-deep-eql/lib/eql.js", "deep-eql/index.js");                                             // 4791
require.alias("chaijs-type-detect/lib/type.js", "chaijs-deep-eql/deps/type-detect/lib/type.js");              // 4792
require.alias("chaijs-type-detect/lib/type.js", "chaijs-deep-eql/deps/type-detect/index.js");                 // 4793
require.alias("chaijs-type-detect/lib/type.js", "chaijs-type-detect/index.js");                               // 4794
require.alias("chaijs-deep-eql/lib/eql.js", "chaijs-deep-eql/index.js");                                      // 4795
require.alias("chai/index.js", "chai/index.js");                                                              // 4796
                                                                                                              // 4797
chai = require("chai");                                                                                       // 4798
                                                                                                              // 4799
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/practicalmeteor:chai/config.coffee.js                                                             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _ref, _ref1, _ref2, _ref3, _ref4;

if (Meteor.isServer) {
  chai.config.includeStack = ((_ref = Meteor.settings) != null ? (_ref1 = _ref.chai) != null ? _ref1.includeStack : void 0 : void 0) || true;
} else {
  chai.config.includeStack = ((_ref2 = Meteor.settings) != null ? (_ref3 = _ref2["public"]) != null ? (_ref4 = _ref3.chai) != null ? _ref4.includeStack : void 0 : void 0 : void 0) || true;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// packages/practicalmeteor:chai/exports.js                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
assert = chai.assert;                                                                                         // 1
expect = chai.expect;                                                                                         // 2
should = chai.should;                                                                                         // 3
                                                                                                              // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['practicalmeteor:chai'] = {}, {
  chai: chai,
  assert: assert,
  expect: expect,
  should: should
});

})();
