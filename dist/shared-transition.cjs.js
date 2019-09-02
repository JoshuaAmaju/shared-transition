'use strict';

require('@babel/polyfill');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function rect(node) {
  return node.getBoundingClientRect(); // return {
  //   top: node.offsetTop,
  //   left: node.offsetLeft,
  //   width: node.clientWidth,
  //   height: node.clientHeight
  // };
}
function style(node) {
  return getComputedStyle(node);
}
function fadeOut(el) {
  Object.assign(el.style, {
    opacity: 0,
    visibility: "hidden"
  });
}
function fadeIn(el) {
  Object.assign(el.style, {
    opacity: 1,
    visibility: "visible"
  });
}
function removeProp(el, prop) {
  el.style.removeProperty(prop);
}
function createDummy(node) {
  var dummy = node.cloneNode(true);
  dummy.style.background = "none";
  dummy.removeAttribute("src");
  dummy.removeAttribute("style");
  dummy.style.visibility = "hidden";
  dummy.removeAttribute("data-key");
  dummy.setAttribute("data-clone", "clone");
  node.parentNode.insertBefore(dummy, node);
  return dummy;
}

var SharedTansition =
/*#__PURE__*/
function () {
  function SharedTansition(from, to) {
    _classCallCheck(this, SharedTansition);

    this.to = to;
    this.wait = 0;
    this.time = 250;
    this.from = from;
    this.played = false;
    this.props = undefined;
    this.style = undefined;
    this.animation = undefined;
    this.toAnimationObj = undefined;
    this.timingFunc = "ease-in-out";
    this.fromAnimationObj = undefined;
  }

  _createClass(SharedTansition, [{
    key: "points",
    value: function points(props) {
      this.props = _objectSpread2({}, props);
      return this;
    }
  }, {
    key: "styles",
    value: function styles(style) {
      this.style = style;
      return this;
    }
  }, {
    key: "delay",
    value: function delay(wait) {
      this.wait = wait;
      return this;
    }
  }, {
    key: "easing",
    value: function easing(timingFunc) {
      this.timingFunc = timingFunc;
      return this;
    }
  }, {
    key: "duration",
    value: function duration(time) {
      this.time = time;
      return this;
    }
  }, {
    key: "play",
    value: function () {
      var _play = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var to, from, fakeDelay, animationObj, dummy;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                to = this.to;
                from = this.from;
                fadeIn(to);
                fadeOut(from);

                fakeDelay = function fakeDelay() {
                  return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                      return resolve();
                    }, _this.wait);
                  });
                };

                animationObj = this.returnAnimateObj(from, to);
                this.toAnimationObj = animationObj.to;
                this.fromAnimationObj = animationObj.from;
                dummy = createDummy(to);
                this.animation = to.animate([this.fromAnimationObj, this.toAnimationObj], {
                  duration: this.time,
                  easing: this.timingFunc
                });

                if (!this.wait) {
                  _context.next = 15;
                  break;
                }

                this.animation.pause();
                _context.next = 14;
                return fakeDelay();

              case 14:
                this.animation.play();

              case 15:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this.animation.onfinish = function () {
                    _this.played = true;
                    dummy.remove();
                    resolve();
                  };
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function play() {
        return _play.apply(this, arguments);
      }

      return play;
    }()
  }, {
    key: "pause",
    value: function pause() {
      if (this.animation) this.animation.pause();
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var _this2 = this;

      if (!this.played) return;
      var to = this.to;
      var from = this.from;
      var animationObj = this.returnAnimateObj(from, to);
      this.toAnimationObj = animationObj.to;
      this.fromAnimationObj = animationObj.from;
      var dummy = createDummy(to);
      this.animation = to.animate([this.toAnimationObj, this.fromAnimationObj], {
        duration: this.time,
        easing: this.timingFunc
      });
      return new Promise(function (resolve, reject) {
        _this2.animation.onfinish = function () {
          fadeOut(to);
          fadeIn(from);
          removeProp(to, "opacity");
          removeProp(to, "visibility");
          removeProp(from, "opacity");
          removeProp(from, "visibility");
          _this2.played = false;
          dummy.remove();
          resolve();
        };
      });
    }
  }, {
    key: "isTransitioning",
    value: function isTransitioning() {
      var state = this.animation.playState;
      return state =  false ;
    }
  }, {
    key: "returnAnimateObj",
    value: function returnAnimateObj(from, to) {
      var toRect = this.props ? this.props.to : rect(to);
      var fromRect = this.props ? this.props.from : rect(from);
      var toStyle = this.style ? this.style.to : style(to);
      var fromStyle = this.style ? this.style.from : style(from);
      var fromObj = {
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto",
        position: "fixed",
        width: "".concat(fromRect.width, "px"),
        fontSize: fromStyle.fontSize,
        height: "".concat(fromRect.height, "px"),
        background: fromStyle.background,
        transform: "translate3d(".concat(fromRect.left, "px, ").concat(fromRect.top, "px, 0)")
      };
      var toObj = {
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto",
        position: "fixed",
        width: "".concat(toRect.width, "px"),
        fontSize: toStyle.fontSize,
        height: "".concat(toRect.height, "px"),
        background: toStyle.background,
        transform: "translate3d(".concat(toRect.left, "px, ").concat(toRect.top, "px, 0)")
      };
      return {
        from: fromObj,
        to: toObj
      };
    }
  }], [{
    key: "center",
    value: function center(node) {
      if (typeof node === "string") {
        node = document.querySelector(node);
      }

      var winWidth = window.innerWidth;
      var props = rect(node);
      var left = (winWidth - props.width) / 2;
      node.style.left = "".concat(left, "px");
    }
  }]);

  return SharedTansition;
}();

module.exports = SharedTansition;
