var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var dist = {};
var TodoistApi$1 = {};
var entities = {};
var lib = {};
var reflect = {};
Object.defineProperty(reflect, "__esModule", { value: true });
var result = {};
Object.defineProperty(result, "__esModule", { value: true });
var contract = {};
var errors$1 = {};
var __extends$2 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(errors$1, "__esModule", { value: true });
errors$1.ValidationError = void 0;
var ValidationError = function(_super) {
  __extends$2(ValidationError2, _super);
  function ValidationError2(message, key) {
    var _this = _super.call(this, key ? message + " in " + key : message) || this;
    _this.key = key;
    _this.name = "ValidationError";
    Object.setPrototypeOf(_this, ValidationError2.prototype);
    return _this;
  }
  return ValidationError2;
}(Error);
errors$1.ValidationError = ValidationError;
Object.defineProperty(contract, "__esModule", { value: true });
contract.Contract = void 0;
var errors_1$4 = errors$1;
function Contract() {
  var runtypes = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    runtypes[_i] = arguments[_i];
  }
  var lastIndex = runtypes.length - 1;
  var argTypes = runtypes.slice(0, lastIndex);
  var returnType = runtypes[lastIndex];
  return {
    enforce: function(f2) {
      return function() {
        var args = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          args[_i2] = arguments[_i2];
        }
        if (args.length < argTypes.length)
          throw new errors_1$4.ValidationError("Expected " + argTypes.length + " arguments but only received " + args.length);
        for (var i2 = 0; i2 < argTypes.length; i2++)
          argTypes[i2].check(args[i2]);
        return returnType.check(f2.apply(void 0, args));
      };
    }
  };
}
contract.Contract = Contract;
var asynccontract = {};
Object.defineProperty(asynccontract, "__esModule", { value: true });
asynccontract.AsyncContract = void 0;
var errors_1$3 = errors$1;
function AsyncContract() {
  var runtypes = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    runtypes[_i] = arguments[_i];
  }
  var lastIndex = runtypes.length - 1;
  var argTypes = runtypes.slice(0, lastIndex);
  var returnType = runtypes[lastIndex];
  return {
    enforce: function(f2) {
      return function() {
        var args = [];
        for (var _i2 = 0; _i2 < arguments.length; _i2++) {
          args[_i2] = arguments[_i2];
        }
        if (args.length < argTypes.length)
          throw new errors_1$3.ValidationError("Expected " + argTypes.length + " arguments but only received " + args.length);
        for (var i2 = 0; i2 < argTypes.length; i2++)
          argTypes[i2].check(args[i2]);
        var returnedPromise = f2.apply(void 0, args);
        if (!(returnedPromise instanceof Promise))
          throw new errors_1$3.ValidationError("Expected function to return a promise, but instead got " + returnedPromise);
        return returnedPromise.then(returnType.check);
      };
    }
  };
}
asynccontract.AsyncContract = AsyncContract;
var match$1 = {};
Object.defineProperty(match$1, "__esModule", { value: true });
match$1.match = void 0;
function match() {
  var cases = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    cases[_i] = arguments[_i];
  }
  return function(x) {
    for (var _i2 = 0, cases_1 = cases; _i2 < cases_1.length; _i2++) {
      var _a = cases_1[_i2], T = _a[0], f2 = _a[1];
      if (T.guard(x))
        return f2(x);
    }
    throw new Error("No alternatives were matched");
  };
}
match$1.match = match;
var unknown = {};
var runtype = {};
var show$1 = {};
Object.defineProperty(show$1, "__esModule", { value: true });
var show = function(needsParens, circular) {
  return function(refl) {
    var parenthesize = function(s) {
      return needsParens ? "(" + s + ")" : s;
    };
    if (circular.has(refl)) {
      return parenthesize("CIRCULAR " + refl.tag);
    }
    circular.add(refl);
    try {
      switch (refl.tag) {
        case "unknown":
        case "never":
        case "void":
        case "boolean":
        case "number":
        case "bigint":
        case "string":
        case "symbol":
        case "function":
          return refl.tag;
        case "literal": {
          var value = refl.value;
          return typeof value === "string" ? '"' + value + '"' : String(value);
        }
        case "array":
          return "" + readonlyTag(refl) + show(true, circular)(refl.element) + "[]";
        case "dictionary":
          return "{ [_: " + refl.key + "]: " + show(false, circular)(refl.value) + " }";
        case "record": {
          var keys2 = Object.keys(refl.fields);
          return keys2.length ? "{ " + keys2.map(function(k) {
            return "" + readonlyTag(refl) + k + partialTag(refl, k) + ": " + (refl.fields[k].tag === "optional" ? show(false, circular)(refl.fields[k].underlying) : show(false, circular)(refl.fields[k])) + ";";
          }).join(" ") + " }" : "{}";
        }
        case "tuple":
          return "[" + refl.components.map(show(false, circular)).join(", ") + "]";
        case "union":
          return parenthesize("" + refl.alternatives.map(show(true, circular)).join(" | "));
        case "intersect":
          return parenthesize("" + refl.intersectees.map(show(true, circular)).join(" & "));
        case "optional":
          return show(needsParens, circular)(refl.underlying) + " | undefined";
        case "constraint":
          return refl.name || show(needsParens, circular)(refl.underlying);
        case "instanceof":
          var name_1 = refl.ctor.name;
          return "InstanceOf<" + name_1 + ">";
        case "brand":
          return show(needsParens, circular)(refl.entity);
      }
    } finally {
      circular.delete(refl);
    }
    throw Error("impossible");
  };
};
show$1.default = show(false, /* @__PURE__ */ new Set());
function partialTag(_a, key) {
  var isPartial = _a.isPartial, fields = _a.fields;
  return isPartial || key !== void 0 && fields[key].tag === "optional" ? "?" : "";
}
function readonlyTag(_a) {
  var isReadonly = _a.isReadonly;
  return isReadonly ? "readonly " : "";
}
Object.defineProperty(runtype, "__esModule", { value: true });
runtype.innerValidate = runtype.create = void 0;
var index_1 = lib;
var show_1$3 = show$1;
var errors_1$2 = errors$1;
function create(validate2, A) {
  A.check = check2;
  A.assert = check2;
  A._innerValidate = function(value, visited) {
    if (visited.has(value, A))
      return { success: true, value };
    return validate2(value, visited);
  };
  A.validate = function(value) {
    return A._innerValidate(value, VisitedState());
  };
  A.guard = guard;
  A.Or = Or;
  A.And = And;
  A.optional = optional2;
  A.withConstraint = withConstraint;
  A.withGuard = withGuard;
  A.withBrand = withBrand;
  A.reflect = A;
  A.toString = function() {
    return "Runtype<" + show_1$3.default(A) + ">";
  };
  return A;
  function check2(x) {
    var validated = A.validate(x);
    if (validated.success) {
      return validated.value;
    }
    throw new errors_1$2.ValidationError(validated.message, validated.key);
  }
  function guard(x) {
    return A.validate(x).success;
  }
  function Or(B) {
    return index_1.Union(A, B);
  }
  function And(B) {
    return index_1.Intersect(A, B);
  }
  function optional2() {
    return index_1.Optional(A);
  }
  function withConstraint(constraint2, options) {
    return index_1.Constraint(A, constraint2, options);
  }
  function withGuard(guard2, options) {
    return index_1.Constraint(A, guard2, options);
  }
  function withBrand(B) {
    return index_1.Brand(B, A);
  }
}
runtype.create = create;
function innerValidate(targetType, value, visited) {
  return targetType._innerValidate(value, visited);
}
runtype.innerValidate = innerValidate;
function VisitedState() {
  var members = /* @__PURE__ */ new WeakMap();
  var add2 = function(candidate, type) {
    if (candidate === null || !(typeof candidate === "object"))
      return;
    var typeSet = members.get(candidate);
    members.set(candidate, typeSet ? typeSet.set(type, true) : (/* @__PURE__ */ new WeakMap()).set(type, true));
  };
  var has = function(candidate, type) {
    var typeSet = members.get(candidate);
    var value = typeSet && typeSet.get(type) || false;
    add2(candidate, type);
    return value;
  };
  return { has };
}
Object.defineProperty(unknown, "__esModule", { value: true });
unknown.Unknown = void 0;
var runtype_1$j = runtype;
unknown.Unknown = runtype_1$j.create(function(value) {
  return { success: true, value };
}, { tag: "unknown" });
var never = {};
Object.defineProperty(never, "__esModule", { value: true });
never.Never = void 0;
var runtype_1$i = runtype;
never.Never = runtype_1$i.create(function(value) {
  return {
    success: false,
    message: "Expected nothing, but was " + (value === null ? value : typeof value)
  };
}, { tag: "never" });
var _void = {};
Object.defineProperty(_void, "__esModule", { value: true });
_void.Void = void 0;
var unknown_1$2 = unknown;
_void.Void = unknown_1$2.Unknown;
var literal$1 = {};
Object.defineProperty(literal$1, "__esModule", { value: true });
literal$1.Null = literal$1.Undefined = literal$1.Literal = void 0;
var runtype_1$h = runtype;
function literal(value) {
  return Array.isArray(value) ? String(value.map(String)) : typeof value === "bigint" ? String(value) + "n" : String(value);
}
function Literal(valueBase) {
  return runtype_1$h.create(function(value) {
    return value === valueBase ? { success: true, value } : {
      success: false,
      message: "Expected literal '" + literal(valueBase) + "', but was '" + literal(value) + "'"
    };
  }, { tag: "literal", value: valueBase });
}
literal$1.Literal = Literal;
literal$1.Undefined = Literal(void 0);
literal$1.Null = Literal(null);
var boolean = {};
Object.defineProperty(boolean, "__esModule", { value: true });
boolean.Boolean = void 0;
var runtype_1$g = runtype;
boolean.Boolean = runtype_1$g.create(function(value) {
  return typeof value === "boolean" ? { success: true, value } : {
    success: false,
    message: "Expected boolean, but was " + (value === null ? value : typeof value)
  };
}, { tag: "boolean" });
var number = {};
Object.defineProperty(number, "__esModule", { value: true });
number.Number = void 0;
var runtype_1$f = runtype;
number.Number = runtype_1$f.create(function(value) {
  return typeof value === "number" ? { success: true, value } : {
    success: false,
    message: "Expected number, but was " + (value === null ? value : typeof value)
  };
}, { tag: "number" });
var bigint = {};
Object.defineProperty(bigint, "__esModule", { value: true });
bigint.BigInt = void 0;
var runtype_1$e = runtype;
bigint.BigInt = runtype_1$e.create(function(value) {
  return typeof value === "bigint" ? { success: true, value } : {
    success: false,
    message: "Expected bigint, but was " + (value === null ? value : typeof value)
  };
}, { tag: "bigint" });
var string = {};
Object.defineProperty(string, "__esModule", { value: true });
string.String = void 0;
var runtype_1$d = runtype;
string.String = runtype_1$d.create(function(value) {
  return typeof value === "string" ? { success: true, value } : {
    success: false,
    message: "Expected string, but was " + (value === null ? value : typeof value)
  };
}, { tag: "string" });
var symbol = {};
Object.defineProperty(symbol, "__esModule", { value: true });
symbol.Symbol = void 0;
var runtype_1$c = runtype;
var f$1 = function(key) {
  return runtype_1$c.create(function(value) {
    if (typeof value !== "symbol") {
      return {
        success: false,
        message: "Expected symbol, but was " + typeStringOf(value)
      };
    } else {
      var keyForValue = commonjsGlobal.Symbol.keyFor(value);
      if (keyForValue !== key) {
        return {
          success: false,
          message: "Expected symbol key to be " + quoteIfPresent(key) + ", but was " + quoteIfPresent(keyForValue)
        };
      } else {
        return { success: true, value };
      }
    }
  }, { tag: "symbol", key });
};
symbol.Symbol = runtype_1$c.create(function(value) {
  if (typeof value !== "symbol") {
    return {
      success: false,
      message: "Expected symbol, but was " + typeStringOf(value)
    };
  } else {
    return { success: true, value };
  }
}, Object.assign(f$1, { tag: "symbol" }));
var quoteIfPresent = function(key) {
  return key === void 0 ? "undefined" : '"' + key + '"';
};
var typeStringOf = function(value) {
  return value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
};
var array = {};
Object.defineProperty(array, "__esModule", { value: true });
array.Array = void 0;
var runtype_1$b = runtype;
function InternalArr(element, isReadonly) {
  return withExtraModifierFuncs$1(runtype_1$b.create(function(xs, visited) {
    if (!Array.isArray(xs)) {
      return {
        success: false,
        message: "Expected array, but was " + (xs === null ? xs : typeof xs)
      };
    }
    for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
      var x = xs_1[_i];
      var validated = runtype_1$b.innerValidate(element, x, visited);
      if (!validated.success) {
        return {
          success: false,
          message: validated.message,
          key: validated.key ? "[" + xs.indexOf(x) + "]." + validated.key : "[" + xs.indexOf(x) + "]"
        };
      }
    }
    return { success: true, value: xs };
  }, { tag: "array", isReadonly, element }));
}
function Arr(element) {
  return InternalArr(element, false);
}
array.Array = Arr;
function withExtraModifierFuncs$1(A) {
  A.asReadonly = asReadonly;
  return A;
  function asReadonly() {
    return InternalArr(A.element, true);
  }
}
var tuple = {};
Object.defineProperty(tuple, "__esModule", { value: true });
tuple.Tuple = void 0;
var runtype_1$a = runtype;
var array_1 = array;
var unknown_1$1 = unknown;
function Tuple() {
  var components = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    components[_i] = arguments[_i];
  }
  return runtype_1$a.create(function(x, visited) {
    var validated = runtype_1$a.innerValidate(array_1.Array(unknown_1$1.Unknown), x, visited);
    if (!validated.success) {
      return {
        success: false,
        message: "Expected tuple to be an array:\xA0" + validated.message,
        key: validated.key
      };
    }
    if (validated.value.length !== components.length) {
      return {
        success: false,
        message: "Expected an array of length " + components.length + ", but was " + validated.value.length
      };
    }
    for (var i2 = 0; i2 < components.length; i2++) {
      var validatedComponent = runtype_1$a.innerValidate(components[i2], validated.value[i2], visited);
      if (!validatedComponent.success) {
        return {
          success: false,
          message: validatedComponent.message,
          key: validatedComponent.key ? "[" + i2 + "]." + validatedComponent.key : "[" + i2 + "]"
        };
      }
    }
    return { success: true, value: x };
  }, { tag: "tuple", components });
}
tuple.Tuple = Tuple;
var record = {};
var util = {};
Object.defineProperty(util, "__esModule", { value: true });
util.hasKey = void 0;
function hasKey(k, o) {
  return typeof o === "object" && k in o;
}
util.hasKey = hasKey;
Object.defineProperty(record, "__esModule", { value: true });
record.Partial = record.Record = record.InternalRecord = void 0;
var runtype_1$9 = runtype;
var util_1$1 = util;
var show_1$2 = show$1;
function InternalRecord(fields, isPartial, isReadonly) {
  return withExtraModifierFuncs(runtype_1$9.create(function(x, visited) {
    if (x === null || x === void 0) {
      var a = runtype_1$9.create(function(_x) {
        return { success: true, value: _x };
      }, { tag: "record", fields });
      return { success: false, message: "Expected " + show_1$2.default(a) + ", but was " + x };
    }
    for (var key in fields) {
      var isOptional = isPartial || fields[key].reflect.tag === "optional";
      if (util_1$1.hasKey(key, x)) {
        if (isOptional && x[key] === void 0)
          continue;
        var validated = runtype_1$9.innerValidate(fields[key], x[key], visited);
        if (!validated.success) {
          return {
            success: false,
            message: validated.message,
            key: validated.key ? key + "." + validated.key : key
          };
        }
      } else if (!isOptional) {
        return {
          success: false,
          message: 'Expected "' + key + '" property to be present, but was missing',
          key
        };
      }
    }
    return { success: true, value: x };
  }, { tag: "record", isPartial, isReadonly, fields }));
}
record.InternalRecord = InternalRecord;
function Record(fields) {
  return InternalRecord(fields, false, false);
}
record.Record = Record;
function Partial(fields) {
  return InternalRecord(fields, true, false);
}
record.Partial = Partial;
function withExtraModifierFuncs(A) {
  A.asPartial = asPartial;
  A.asReadonly = asReadonly;
  return A;
  function asPartial() {
    return InternalRecord(A.fields, true, A.isReadonly);
  }
  function asReadonly() {
    return InternalRecord(A.fields, A.isPartial, true);
  }
}
var dictionary = {};
var constraint = {};
Object.defineProperty(constraint, "__esModule", { value: true });
constraint.Guard = constraint.Constraint = void 0;
var runtype_1$8 = runtype;
var string_1$1 = string;
var unknown_1 = unknown;
function Constraint(underlying, constraint2, options) {
  return runtype_1$8.create(function(value) {
    var name2 = options && options.name;
    var validated = underlying.validate(value);
    if (!validated.success) {
      return validated;
    }
    var result2 = constraint2(validated.value);
    if (string_1$1.String.guard(result2))
      return { success: false, message: result2 };
    else if (!result2)
      return { success: false, message: "Failed " + (name2 || "constraint") + " check" };
    return { success: true, value: validated.value };
  }, {
    tag: "constraint",
    underlying,
    constraint: constraint2,
    name: options && options.name,
    args: options && options.args
  });
}
constraint.Constraint = Constraint;
var Guard = function(guard, options) {
  return unknown_1.Unknown.withGuard(guard, options);
};
constraint.Guard = Guard;
var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to2, from2) {
  for (var i2 = 0, il = from2.length, j = to2.length; i2 < il; i2++, j++)
    to2[j] = from2[i2];
  return to2;
};
Object.defineProperty(dictionary, "__esModule", { value: true });
dictionary.Dictionary = void 0;
var runtype_1$7 = runtype;
var string_1 = string;
var constraint_1 = constraint;
var show_1$1 = show$1;
var NumberKey = constraint_1.Constraint(string_1.String, function(s) {
  return !isNaN(+s);
}, { name: "number" });
function Dictionary(value, key) {
  var keyRuntype = key === void 0 ? string_1.String : key === "string" ? string_1.String : key === "number" ? NumberKey : key;
  var keyString = show_1$1.default(keyRuntype);
  return runtype_1$7.create(function(x, visited) {
    if (x === null || x === void 0) {
      var a = runtype_1$7.create(x, { tag: "dictionary", key: keyString, value });
      return { success: false, message: "Expected " + show_1$1.default(a) + ", but was " + x };
    }
    if (typeof x !== "object") {
      var a = runtype_1$7.create(x, { tag: "dictionary", key: keyString, value });
      return { success: false, message: "Expected " + show_1$1.default(a.reflect) + ", but was " + typeof x };
    }
    if (Object.getPrototypeOf(x) !== Object.prototype) {
      if (!Array.isArray(x)) {
        var a = runtype_1$7.create(x, { tag: "dictionary", key: keyString, value });
        return {
          success: false,
          message: "Expected " + show_1$1.default(a.reflect) + ", but was " + Object.getPrototypeOf(x)
        };
      } else if (keyString === "string")
        return { success: false, message: "Expected dictionary, but was array" };
    }
    var numberString = /^(?:NaN|-?\d+(?:\.\d+)?)$/u;
    for (var _i = 0, _a = __spreadArray(__spreadArray([], Object.getOwnPropertyNames(x)), Object.getOwnPropertySymbols(x)); _i < _a.length; _i++) {
      var k = _a[_i];
      var isNumberLikeKey = typeof k === "string" && numberString.test(k);
      var l = isNumberLikeKey ? commonjsGlobal.Number(k) : k;
      if (isNumberLikeKey ? !keyRuntype.guard(l) && !keyRuntype.guard(k) : !keyRuntype.guard(l)) {
        return {
          success: false,
          message: "Expected dictionary key to be a " + keyString + ", but was " + typeof l
        };
      }
      var validated = runtype_1$7.innerValidate(value, x[k], visited);
      if (!validated.success) {
        return {
          success: false,
          message: validated.message,
          key: validated.key ? commonjsGlobal.String(k) + "." + validated.key : commonjsGlobal.String(k)
        };
      }
    }
    return { success: true, value: x };
  }, { tag: "dictionary", key: keyString, value });
}
dictionary.Dictionary = Dictionary;
var union = {};
Object.defineProperty(union, "__esModule", { value: true });
union.Union = void 0;
var runtype_1$6 = runtype;
var show_1 = show$1;
var util_1 = util;
function Union() {
  var alternatives = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    alternatives[_i] = arguments[_i];
  }
  var match5 = function() {
    var cases = [];
    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
      cases[_i2] = arguments[_i2];
    }
    return function(x) {
      for (var i2 = 0; i2 < alternatives.length; i2++) {
        if (alternatives[i2].guard(x)) {
          return cases[i2](x);
        }
      }
    };
  };
  return runtype_1$6.create(function(value, visited) {
    var commonLiteralFields = {};
    for (var _i2 = 0, alternatives_1 = alternatives; _i2 < alternatives_1.length; _i2++) {
      var alternative = alternatives_1[_i2];
      if (alternative.reflect.tag === "record") {
        var _loop_1 = function(fieldName2) {
          var field2 = alternative.reflect.fields[fieldName2];
          if (field2.tag === "literal") {
            if (commonLiteralFields[fieldName2]) {
              if (commonLiteralFields[fieldName2].every(function(value2) {
                return value2 !== field2.value;
              })) {
                commonLiteralFields[fieldName2].push(field2.value);
              }
            } else {
              commonLiteralFields[fieldName2] = [field2.value];
            }
          }
        };
        for (var fieldName in alternative.reflect.fields) {
          _loop_1(fieldName);
        }
      }
    }
    for (var fieldName in commonLiteralFields) {
      if (commonLiteralFields[fieldName].length === alternatives.length) {
        for (var _a = 0, alternatives_2 = alternatives; _a < alternatives_2.length; _a++) {
          var alternative = alternatives_2[_a];
          if (alternative.reflect.tag === "record") {
            var field = alternative.reflect.fields[fieldName];
            if (field.tag === "literal" && util_1.hasKey(fieldName, value) && value[fieldName] === field.value) {
              return runtype_1$6.innerValidate(alternative, value, visited);
            }
          }
        }
      }
    }
    for (var _b = 0, alternatives_3 = alternatives; _b < alternatives_3.length; _b++) {
      var targetType = alternatives_3[_b];
      if (runtype_1$6.innerValidate(targetType, value, visited).success) {
        return { success: true, value };
      }
    }
    var a = runtype_1$6.create(value, { tag: "union", alternatives });
    return {
      success: false,
      message: "Expected " + show_1.default(a) + ", but was " + (value === null ? value : typeof value)
    };
  }, { tag: "union", alternatives, match: match5 });
}
union.Union = Union;
var intersect = {};
Object.defineProperty(intersect, "__esModule", { value: true });
intersect.Intersect = void 0;
var runtype_1$5 = runtype;
function Intersect() {
  var intersectees = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    intersectees[_i] = arguments[_i];
  }
  return runtype_1$5.create(function(value, visited) {
    for (var _i2 = 0, intersectees_1 = intersectees; _i2 < intersectees_1.length; _i2++) {
      var targetType = intersectees_1[_i2];
      var validated = runtype_1$5.innerValidate(targetType, value, visited);
      if (!validated.success) {
        return validated;
      }
    }
    return { success: true, value };
  }, { tag: "intersect", intersectees });
}
intersect.Intersect = Intersect;
var optional = {};
Object.defineProperty(optional, "__esModule", { value: true });
optional.Optional = void 0;
var runtype_1$4 = runtype;
function Optional(runtype2) {
  return runtype_1$4.create(function(value) {
    return value === void 0 ? { success: true, value } : runtype2.validate(value);
  }, { tag: "optional", underlying: runtype2 });
}
optional.Optional = Optional;
var _function = {};
Object.defineProperty(_function, "__esModule", { value: true });
_function.Function = void 0;
var runtype_1$3 = runtype;
_function.Function = runtype_1$3.create(function(value) {
  return typeof value === "function" ? { success: true, value } : {
    success: false,
    message: "Expected function, but was " + (value === null ? value : typeof value)
  };
}, { tag: "function" });
var _instanceof = {};
Object.defineProperty(_instanceof, "__esModule", { value: true });
_instanceof.InstanceOf = void 0;
var runtype_1$2 = runtype;
function InstanceOf(ctor) {
  return runtype_1$2.create(function(value) {
    return value instanceof ctor ? { success: true, value } : {
      success: false,
      message: "Expected " + ctor.name + ", but was " + (value === null ? value : typeof value)
    };
  }, { tag: "instanceof", ctor });
}
_instanceof.InstanceOf = InstanceOf;
var lazy = {};
Object.defineProperty(lazy, "__esModule", { value: true });
lazy.Lazy = void 0;
var runtype_1$1 = runtype;
function Lazy(delayed) {
  var data = {
    get tag() {
      return getWrapped()["tag"];
    }
  };
  var cached;
  function getWrapped() {
    if (!cached) {
      cached = delayed();
      for (var k in cached)
        if (k !== "tag")
          data[k] = cached[k];
    }
    return cached;
  }
  return runtype_1$1.create(function(x) {
    return getWrapped().validate(x);
  }, data);
}
lazy.Lazy = Lazy;
var brand = {};
Object.defineProperty(brand, "__esModule", { value: true });
brand.Brand = void 0;
var runtype_1 = runtype;
function Brand(brand2, entity) {
  return runtype_1.create(function(value) {
    var validated = entity.validate(value);
    return validated.success ? { success: true, value: validated.value } : validated;
  }, {
    tag: "brand",
    brand: brand2,
    entity
  });
}
brand.Brand = Brand;
var decorator = {};
Object.defineProperty(decorator, "__esModule", { value: true });
decorator.checked = decorator.check = void 0;
var errors_1$1 = errors$1;
var prototypes = /* @__PURE__ */ new WeakMap();
function check(target, propertyKey, parameterIndex) {
  var prototype = prototypes.get(target) || /* @__PURE__ */ new Map();
  prototypes.set(target, prototype);
  var validParameterIndices = prototype.get(propertyKey) || [];
  prototype.set(propertyKey, validParameterIndices);
  validParameterIndices.push(parameterIndex);
}
decorator.check = check;
function getValidParameterIndices(target, propertyKey, runtypeCount) {
  var prototype = prototypes.get(target);
  var validParameterIndices = prototype && prototype.get(propertyKey);
  if (validParameterIndices) {
    return validParameterIndices;
  }
  var indices = [];
  for (var i2 = 0; i2 < runtypeCount; i2++) {
    indices.push(i2);
  }
  return indices;
}
function checked() {
  var runtypes = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    runtypes[_i] = arguments[_i];
  }
  if (runtypes.length === 0) {
    throw new Error("No runtype provided to `@checked`. Please remove the decorator.");
  }
  return function(target, propertyKey, descriptor) {
    var method = descriptor.value;
    var methodId = (target.name || target.constructor.name + ".prototype") + (typeof propertyKey === "string" ? '["' + propertyKey + '"]' : "[" + String(propertyKey) + "]");
    var validParameterIndices = getValidParameterIndices(target, propertyKey, runtypes.length);
    if (validParameterIndices.length !== runtypes.length) {
      throw new Error("Number of `@checked` runtypes and @check parameters not matched.");
    }
    if (validParameterIndices.length > method.length) {
      throw new Error("Number of `@checked` runtypes exceeds actual parameter length.");
    }
    descriptor.value = function() {
      var args = [];
      for (var _i2 = 0; _i2 < arguments.length; _i2++) {
        args[_i2] = arguments[_i2];
      }
      runtypes.forEach(function(type, typeIndex) {
        var parameterIndex = validParameterIndices[typeIndex];
        var validated = type.validate(args[parameterIndex]);
        if (!validated.success) {
          throw new errors_1$1.ValidationError(methodId + ", argument #" + parameterIndex + ": " + validated.message, validated.key);
        }
      });
      return method.apply(this, args);
    };
  };
}
decorator.checked = checked;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InstanceOf = exports.Null = exports.Undefined = exports.Literal = void 0;
  __exportStar(reflect, exports);
  __exportStar(result, exports);
  __exportStar(contract, exports);
  __exportStar(asynccontract, exports);
  __exportStar(match$1, exports);
  __exportStar(errors$1, exports);
  __exportStar(unknown, exports);
  __exportStar(never, exports);
  __exportStar(_void, exports);
  var literal_1 = literal$1;
  Object.defineProperty(exports, "Literal", { enumerable: true, get: function() {
    return literal_1.Literal;
  } });
  Object.defineProperty(exports, "Undefined", { enumerable: true, get: function() {
    return literal_1.Undefined;
  } });
  Object.defineProperty(exports, "Null", { enumerable: true, get: function() {
    return literal_1.Null;
  } });
  __exportStar(boolean, exports);
  __exportStar(number, exports);
  __exportStar(bigint, exports);
  __exportStar(string, exports);
  __exportStar(symbol, exports);
  __exportStar(array, exports);
  __exportStar(tuple, exports);
  __exportStar(record, exports);
  __exportStar(dictionary, exports);
  __exportStar(union, exports);
  __exportStar(intersect, exports);
  __exportStar(optional, exports);
  __exportStar(_function, exports);
  var instanceof_1 = _instanceof;
  Object.defineProperty(exports, "InstanceOf", { enumerable: true, get: function() {
    return instanceof_1.InstanceOf;
  } });
  __exportStar(lazy, exports);
  __exportStar(constraint, exports);
  __exportStar(brand, exports);
  __exportStar(decorator, exports);
})(lib);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.User = exports.Comment = exports.Attachment = exports.Label = exports.Section = exports.Project = exports.Task = exports.DueDate = exports.Int = void 0;
  var runtypes_1 = lib;
  exports.Int = runtypes_1.Number.withConstraint(function(n) {
    return Number.isInteger(n) || n + " is not a valid entity id. Should be an integer";
  });
  exports.DueDate = (0, runtypes_1.Record)({
    recurring: runtypes_1.Boolean,
    string: runtypes_1.String,
    date: runtypes_1.String
  }).And((0, runtypes_1.Partial)({
    datetime: runtypes_1.String,
    timezone: runtypes_1.String
  }));
  exports.Task = (0, runtypes_1.Record)({
    id: exports.Int,
    order: exports.Int,
    content: runtypes_1.String,
    description: runtypes_1.String,
    projectId: exports.Int,
    sectionId: exports.Int,
    completed: runtypes_1.Boolean,
    labelIds: (0, runtypes_1.Array)(exports.Int),
    priority: exports.Int,
    commentCount: exports.Int,
    created: runtypes_1.String,
    url: runtypes_1.String
  }).And((0, runtypes_1.Partial)({
    parentId: exports.Int,
    due: exports.DueDate,
    assignee: exports.Int
  }));
  exports.Project = (0, runtypes_1.Record)({
    id: exports.Int,
    name: runtypes_1.String,
    color: exports.Int,
    commentCount: exports.Int,
    shared: runtypes_1.Boolean,
    favorite: runtypes_1.Boolean,
    url: runtypes_1.String
  }).And((0, runtypes_1.Partial)({
    parentId: exports.Int,
    order: exports.Int,
    inboxProject: runtypes_1.Boolean,
    teamInbox: runtypes_1.Boolean,
    syncId: exports.Int
  }));
  exports.Section = (0, runtypes_1.Record)({
    id: exports.Int,
    order: exports.Int,
    name: runtypes_1.String,
    projectId: exports.Int
  });
  exports.Label = (0, runtypes_1.Record)({
    id: exports.Int,
    order: exports.Int,
    name: runtypes_1.String,
    color: exports.Int,
    favorite: runtypes_1.Boolean
  });
  exports.Attachment = (0, runtypes_1.Record)({
    resourceType: runtypes_1.String
  }).And((0, runtypes_1.Partial)({
    fileName: runtypes_1.String,
    fileSize: exports.Int,
    fileType: runtypes_1.String,
    fileUrl: runtypes_1.String,
    fileDuration: exports.Int,
    uploadState: (0, runtypes_1.Union)((0, runtypes_1.Literal)("pending"), (0, runtypes_1.Literal)("completed")),
    image: runtypes_1.String,
    imageWidth: exports.Int,
    imageHeight: exports.Int,
    url: runtypes_1.String,
    title: runtypes_1.String
  }));
  exports.Comment = (0, runtypes_1.Record)({
    id: exports.Int,
    content: runtypes_1.String,
    posted: runtypes_1.String
  }).And((0, runtypes_1.Partial)({
    taskId: exports.Int,
    projectId: exports.Int,
    attachment: exports.Attachment
  }));
  exports.User = (0, runtypes_1.Record)({
    id: exports.Int,
    name: runtypes_1.String,
    email: runtypes_1.String
  });
})(entities);
var restClient = {};
var axios$2 = { exports: {} };
var bind$2 = function bind2(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i2 = 0; i2 < args.length; i2++) {
      args[i2] = arguments[i2];
    }
    return fn.apply(thisArg, args);
  };
};
var bind$1 = bind$2;
var toString$1 = Object.prototype.toString;
function isArray$1(val) {
  return toString$1.call(val) === "[object Array]";
}
function isUndefined$1(val) {
  return typeof val === "undefined";
}
function isBuffer(val) {
  return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
function isArrayBuffer(val) {
  return toString$1.call(val) === "[object ArrayBuffer]";
}
function isFormData$1(val) {
  return typeof FormData !== "undefined" && val instanceof FormData;
}
function isArrayBufferView(val) {
  var result2;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result2 = ArrayBuffer.isView(val);
  } else {
    result2 = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result2;
}
function isString$1(val) {
  return typeof val === "string";
}
function isNumber$1(val) {
  return typeof val === "number";
}
function isObject$1(val) {
  return val !== null && typeof val === "object";
}
function isPlainObject$1(val) {
  if (toString$1.call(val) !== "[object Object]") {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
function isDate$1(val) {
  return toString$1.call(val) === "[object Date]";
}
function isFile(val) {
  return toString$1.call(val) === "[object File]";
}
function isBlob(val) {
  return toString$1.call(val) === "[object Blob]";
}
function isFunction$1(val) {
  return toString$1.call(val) === "[object Function]";
}
function isStream(val) {
  return isObject$1(val) && isFunction$1(val.pipe);
}
function isURLSearchParams$1(val) {
  return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function isStandardBrowserEnv() {
  if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function forEach(obj, fn) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray$1(obj)) {
    for (var i2 = 0, l = obj.length; i2 < l; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
function merge() {
  var result2 = {};
  function assignValue(val, key) {
    if (isPlainObject$1(result2[key]) && isPlainObject$1(val)) {
      result2[key] = merge(result2[key], val);
    } else if (isPlainObject$1(val)) {
      result2[key] = merge({}, val);
    } else if (isArray$1(val)) {
      result2[key] = val.slice();
    } else {
      result2[key] = val;
    }
  }
  for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
    forEach(arguments[i2], assignValue);
  }
  return result2;
}
function extend$1(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind$1(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function stripBOM(content) {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
}
var utils$e = {
  isArray: isArray$1,
  isArrayBuffer,
  isBuffer,
  isFormData: isFormData$1,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isObject: isObject$1,
  isPlainObject: isPlainObject$1,
  isUndefined: isUndefined$1,
  isDate: isDate$1,
  isFile,
  isBlob,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams: isURLSearchParams$1,
  isStandardBrowserEnv,
  forEach,
  merge,
  extend: extend$1,
  trim,
  stripBOM
};
var utils$d = utils$e;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL$2 = function buildURL2(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }
  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$d.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$d.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (utils$d.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }
      utils$d.forEach(val, function parseValue(v) {
        if (utils$d.isDate(v)) {
          v = v.toISOString();
        } else if (utils$d.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + "=" + encode(v));
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
};
var utils$c = utils$e;
function InterceptorManager$1() {
  this.handlers = [];
}
InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled,
    rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
InterceptorManager$1.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager$1.prototype.forEach = function forEach2(fn) {
  utils$c.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;
var utils$b = utils$e;
var normalizeHeaderName$1 = function normalizeHeaderName2(headers, normalizedName) {
  utils$b.forEach(headers, function processHeader(value, name2) {
    if (name2 !== normalizedName && name2.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name2];
    }
  });
};
var enhanceError$2 = function enhanceError2(error, config, code, request3, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request3;
  error.response = response;
  error.isAxiosError = true;
  error.toJSON = function toJSON2() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    };
  };
  return error;
};
var enhanceError$1 = enhanceError$2;
var createError$2 = function createError2(message, config, code, request3, response) {
  var error = new Error(message);
  return enhanceError$1(error, config, code, request3, response);
};
var createError$1 = createError$2;
var settle$1 = function settle2(resolve, reject, response) {
  var validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(createError$1("Request failed with status code " + response.status, response.config, null, response.request, response));
  }
};
var utils$a = utils$e;
var cookies$1 = utils$a.isStandardBrowserEnv() ? function standardBrowserEnv() {
  return {
    write: function write(name2, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name2 + "=" + encodeURIComponent(value));
      if (utils$a.isNumber(expires)) {
        cookie.push("expires=" + new Date(expires).toGMTString());
      }
      if (utils$a.isString(path)) {
        cookie.push("path=" + path);
      }
      if (utils$a.isString(domain)) {
        cookie.push("domain=" + domain);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      document.cookie = cookie.join("; ");
    },
    read: function read(name2) {
      var match5 = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
      return match5 ? decodeURIComponent(match5[3]) : null;
    },
    remove: function remove(name2) {
      this.write(name2, "", Date.now() - 864e5);
    }
  };
}() : function nonStandardBrowserEnv() {
  return {
    write: function write() {
    },
    read: function read() {
      return null;
    },
    remove: function remove() {
    }
  };
}();
var isAbsoluteURL$1 = function isAbsoluteURL2(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
var combineURLs$1 = function combineURLs2(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
var isAbsoluteURL = isAbsoluteURL$1;
var combineURLs = combineURLs$1;
var buildFullPath$1 = function buildFullPath2(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};
var utils$9 = utils$e;
var ignoreDuplicateOf = [
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
];
var parseHeaders$1 = function parseHeaders2(headers) {
  var parsed = {};
  var key;
  var val;
  var i2;
  if (!headers) {
    return parsed;
  }
  utils$9.forEach(headers.split("\n"), function parser(line) {
    i2 = line.indexOf(":");
    key = utils$9.trim(line.substr(0, i2)).toLowerCase();
    val = utils$9.trim(line.substr(i2 + 1));
    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === "set-cookie") {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }
  });
  return parsed;
};
var utils$8 = utils$e;
var isURLSameOrigin$1 = utils$8.isStandardBrowserEnv() ? function standardBrowserEnv2() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement("a");
  var originURL;
  function resolveURL(url) {
    var href = url;
    if (msie) {
      urlParsingNode.setAttribute("href", href);
      href = urlParsingNode.href;
    }
    urlParsingNode.setAttribute("href", href);
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
    };
  }
  originURL = resolveURL(window.location.href);
  return function isURLSameOrigin2(requestURL) {
    var parsed = utils$8.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : function nonStandardBrowserEnv2() {
  return function isURLSameOrigin2() {
    return true;
  };
}();
var utils$7 = utils$e;
var settle = settle$1;
var cookies = cookies$1;
var buildURL$1 = buildURL$2;
var buildFullPath = buildFullPath$1;
var parseHeaders = parseHeaders$1;
var isURLSameOrigin = isURLSameOrigin$1;
var createError = createError$2;
var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    if (utils$7.isFormData(requestData)) {
      delete requestHeaders["Content-Type"];
    }
    var request3 = new XMLHttpRequest();
    if (config.auth) {
      var username = config.auth.username || "";
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
    }
    var fullPath = buildFullPath(config.baseURL, config.url);
    request3.open(config.method.toUpperCase(), buildURL$1(fullPath, config.params, config.paramsSerializer), true);
    request3.timeout = config.timeout;
    function onloadend() {
      if (!request3) {
        return;
      }
      var responseHeaders = "getAllResponseHeaders" in request3 ? parseHeaders(request3.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === "text" || responseType === "json" ? request3.responseText : request3.response;
      var response = {
        data: responseData,
        status: request3.status,
        statusText: request3.statusText,
        headers: responseHeaders,
        config,
        request: request3
      };
      settle(resolve, reject, response);
      request3 = null;
    }
    if ("onloadend" in request3) {
      request3.onloadend = onloadend;
    } else {
      request3.onreadystatechange = function handleLoad() {
        if (!request3 || request3.readyState !== 4) {
          return;
        }
        if (request3.status === 0 && !(request3.responseURL && request3.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request3.onabort = function handleAbort() {
      if (!request3) {
        return;
      }
      reject(createError("Request aborted", config, "ECONNABORTED", request3));
      request3 = null;
    };
    request3.onerror = function handleError() {
      reject(createError("Network Error", config, null, request3));
      request3 = null;
    };
    request3.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request3));
      request3 = null;
    };
    if (utils$7.isStandardBrowserEnv()) {
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    if ("setRequestHeader" in request3) {
      utils$7.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
          delete requestHeaders[key];
        } else {
          request3.setRequestHeader(key, val);
        }
      });
    }
    if (!utils$7.isUndefined(config.withCredentials)) {
      request3.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request3.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request3.addEventListener("progress", config.onDownloadProgress);
    }
    if (typeof config.onUploadProgress === "function" && request3.upload) {
      request3.upload.addEventListener("progress", config.onUploadProgress);
    }
    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request3) {
          return;
        }
        request3.abort();
        reject(cancel);
        request3 = null;
      });
    }
    if (!requestData) {
      requestData = null;
    }
    request3.send(requestData);
  });
};
var utils$6 = utils$e;
var normalizeHeaderName = normalizeHeaderName$1;
var enhanceError = enhanceError$2;
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
  if (!utils$6.isUndefined(headers) && utils$6.isUndefined(headers["Content-Type"])) {
    headers["Content-Type"] = value;
  }
}
function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== "undefined") {
    adapter = xhr;
  } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    adapter = xhr;
  }
  return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$6.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$6.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults$4 = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, "Accept");
    normalizeHeaderName(headers, "Content-Type");
    if (utils$6.isFormData(data) || utils$6.isArrayBuffer(data) || utils$6.isBuffer(data) || utils$6.isStream(data) || utils$6.isFile(data) || utils$6.isBlob(data)) {
      return data;
    }
    if (utils$6.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$6.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
      return data.toString();
    }
    if (utils$6.isObject(data) || headers && headers["Content-Type"] === "application/json") {
      setContentTypeIfUnset(headers, "application/json");
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional2 = this.transitional;
    var silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
    var forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
    if (strictJSONParsing || forcedJSONParsing && utils$6.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw enhanceError(e, this, "E_JSON_PARSE");
          }
          throw e;
        }
      }
    }
    return data;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults$4.headers = {
  common: {
    "Accept": "application/json, text/plain, */*"
  }
};
utils$6.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults$4.headers[method] = {};
});
utils$6.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults$4.headers[method] = utils$6.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults$4;
var utils$5 = utils$e;
var defaults$3 = defaults_1;
var transformData$1 = function transformData2(data, headers, fns) {
  var context = this || defaults$3;
  utils$5.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};
var isCancel$1 = function isCancel2(value) {
  return !!(value && value.__CANCEL__);
};
var utils$4 = utils$e;
var transformData = transformData$1;
var isCancel = isCancel$1;
var defaults$2 = defaults_1;
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
var dispatchRequest$1 = function dispatchRequest2(config) {
  throwIfCancellationRequested(config);
  config.headers = config.headers || {};
  config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
  config.headers = utils$4.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$4.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$2.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};
var utils$3 = utils$e;
var mergeConfig$2 = function mergeConfig2(config1, config2) {
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ["url", "method", "data"];
  var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
  var defaultToConfig2Keys = [
    "baseURL",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "timeoutMessage",
    "withCredentials",
    "adapter",
    "responseType",
    "xsrfCookieName",
    "xsrfHeaderName",
    "onUploadProgress",
    "onDownloadProgress",
    "decompress",
    "maxContentLength",
    "maxBodyLength",
    "maxRedirects",
    "transport",
    "httpAgent",
    "httpsAgent",
    "cancelToken",
    "socketPath",
    "responseEncoding"
  ];
  var directMergeKeys = ["validateStatus"];
  function getMergedValue(target, source2) {
    if (utils$3.isPlainObject(target) && utils$3.isPlainObject(source2)) {
      return utils$3.merge(target, source2);
    } else if (utils$3.isPlainObject(source2)) {
      return utils$3.merge({}, source2);
    } else if (utils$3.isArray(source2)) {
      return source2.slice();
    }
    return source2;
  }
  function mergeDeepProperties(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  }
  utils$3.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(void 0, config2[prop]);
    }
  });
  utils$3.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils$3.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils$3.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(void 0, config2[prop]);
    } else if (!utils$3.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  });
  utils$3.forEach(directMergeKeys, function merge2(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(void 0, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils$3.forEach(otherKeys, mergeDeepProperties);
  return config;
};
const _args = [
  [
    "axios@0.21.4",
    "/Users/rj/Nextcloud/Source/personal/roamist"
  ]
];
const _from = "axios@0.21.4";
const _id = "axios@0.21.4";
const _inBundle = false;
const _integrity = "sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==";
const _location = "/axios";
const _phantomChildren = {};
const _requested = {
  type: "version",
  registry: true,
  raw: "axios@0.21.4",
  name: "axios",
  escapedName: "axios",
  rawSpec: "0.21.4",
  saveSpec: null,
  fetchSpec: "0.21.4"
};
const _requiredBy = [
  "/@doist/todoist-api-typescript",
  "/roam-client",
  "/roamjs-components"
];
const _resolved = "https://registry.npmjs.org/axios/-/axios-0.21.4.tgz";
const _spec = "0.21.4";
const _where = "/Users/rj/Nextcloud/Source/personal/roamist";
const author = {
  name: "Matt Zabriskie"
};
const browser = {
  "./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
const bugs = {
  url: "https://github.com/axios/axios/issues"
};
const bundlesize = [
  {
    path: "./dist/axios.min.js",
    threshold: "5kB"
  }
];
const dependencies = {
  "follow-redirects": "^1.14.0"
};
const description = "Promise based HTTP client for the browser and node.js";
const devDependencies = {
  coveralls: "^3.0.0",
  "es6-promise": "^4.2.4",
  grunt: "^1.3.0",
  "grunt-banner": "^0.6.0",
  "grunt-cli": "^1.2.0",
  "grunt-contrib-clean": "^1.1.0",
  "grunt-contrib-watch": "^1.0.0",
  "grunt-eslint": "^23.0.0",
  "grunt-karma": "^4.0.0",
  "grunt-mocha-test": "^0.13.3",
  "grunt-ts": "^6.0.0-beta.19",
  "grunt-webpack": "^4.0.2",
  "istanbul-instrumenter-loader": "^1.0.0",
  "jasmine-core": "^2.4.1",
  karma: "^6.3.2",
  "karma-chrome-launcher": "^3.1.0",
  "karma-firefox-launcher": "^2.1.0",
  "karma-jasmine": "^1.1.1",
  "karma-jasmine-ajax": "^0.1.13",
  "karma-safari-launcher": "^1.0.0",
  "karma-sauce-launcher": "^4.3.6",
  "karma-sinon": "^1.0.5",
  "karma-sourcemap-loader": "^0.3.8",
  "karma-webpack": "^4.0.2",
  "load-grunt-tasks": "^3.5.2",
  minimist: "^1.2.0",
  mocha: "^8.2.1",
  sinon: "^4.5.0",
  "terser-webpack-plugin": "^4.2.3",
  typescript: "^4.0.5",
  "url-search-params": "^0.10.0",
  webpack: "^4.44.2",
  "webpack-dev-server": "^3.11.0"
};
const homepage = "https://axios-http.com";
const jsdelivr = "dist/axios.min.js";
const keywords = [
  "xhr",
  "http",
  "ajax",
  "promise",
  "node"
];
const license = "MIT";
const main = "index.js";
const name = "axios";
const repository = {
  type: "git",
  url: "git+https://github.com/axios/axios.git"
};
const scripts = {
  build: "NODE_ENV=production grunt build",
  coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  examples: "node ./examples/server.js",
  fix: "eslint --fix lib/**/*.js",
  postversion: "git push && git push --tags",
  preversion: "npm test",
  start: "node ./sandbox/server.js",
  test: "grunt test",
  version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
};
const typings = "./index.d.ts";
const unpkg = "dist/axios.min.js";
const version$1 = "0.21.4";
var require$$0$1 = {
  _args,
  _from,
  _id,
  _inBundle,
  _integrity,
  _location,
  _phantomChildren,
  _requested,
  _requiredBy,
  _resolved,
  _spec,
  _where,
  author,
  browser,
  bugs,
  bundlesize,
  dependencies,
  description,
  devDependencies,
  homepage,
  jsdelivr,
  keywords,
  license,
  main,
  name,
  repository,
  scripts,
  typings,
  unpkg,
  version: version$1
};
var pkg = require$$0$1;
var validators$2 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
  validators$2[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
var currentVerArr = pkg.version.split(".");
function isOlderVersion(version2, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split(".") : currentVerArr;
  var destVer = version2.split(".");
  for (var i2 = 0; i2 < 3; i2++) {
    if (pkgVersionArr[i2] > destVer[i2]) {
      return true;
    } else if (pkgVersionArr[i2] < destVer[i2]) {
      return false;
    }
  }
  return false;
}
validators$2.transitional = function transitional(validator2, version2, message) {
  var isDeprecated = version2 && isOlderVersion(version2);
  function formatMessage(opt, desc) {
    return "[Axios v" + pkg.version + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return function(value, opt, opts) {
    if (validator2 === false) {
      throw new Error(formatMessage(opt, " has been removed in " + version2));
    }
    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future"));
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new TypeError("options must be an object");
  }
  var keys2 = Object.keys(options);
  var i2 = keys2.length;
  while (i2-- > 0) {
    var opt = keys2[i2];
    var validator2 = schema[opt];
    if (validator2) {
      var value = options[opt];
      var result2 = value === void 0 || validator2(value, opt, options);
      if (result2 !== true) {
        throw new TypeError("option " + opt + " must be " + result2);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error("Unknown option " + opt);
    }
  }
}
var validator$1 = {
  isOlderVersion,
  assertOptions,
  validators: validators$2
};
var utils$2 = utils$e;
var buildURL = buildURL$2;
var InterceptorManager = InterceptorManager_1;
var dispatchRequest = dispatchRequest$1;
var mergeConfig$1 = mergeConfig$2;
var validator = validator$1;
var validators$1 = validator.validators;
function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios$1.prototype.request = function request2(config) {
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  config = mergeConfig$1(this.defaults, config);
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }
  var transitional2 = config.transitional;
  if (transitional2 !== void 0) {
    validator.assertOptions(transitional2, {
      silentJSONParsing: validators$1.transitional(validators$1.boolean, "1.0.0"),
      forcedJSONParsing: validators$1.transitional(validators$1.boolean, "1.0.0"),
      clarifyTimeoutError: validators$1.transitional(validators$1.boolean, "1.0.0")
    }, false);
  }
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
      return;
    }
    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;
  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, void 0];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }
  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }
  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }
  return promise;
};
Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig$1(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
utils$2.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$2.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  Axios$1.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data
    }));
  };
});
var Axios_1 = Axios$1;
function Cancel$1(message) {
  this.message = message;
}
Cancel$1.prototype.toString = function toString2() {
  return "Cancel" + (this.message ? ": " + this.message : "");
};
Cancel$1.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel$1;
var Cancel = Cancel_1;
function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }
  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token2 = this;
  executor(function cancel(message) {
    if (token2.reason) {
      return;
    }
    token2.reason = new Cancel(message);
    resolvePromise(token2.reason);
  });
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
CancelToken.source = function source() {
  var cancel;
  var token2 = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token2,
    cancel
  };
};
var CancelToken_1 = CancelToken;
var spread = function spread2(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};
var isAxiosError$1 = function isAxiosError2(payload) {
  return typeof payload === "object" && payload.isAxiosError === true;
};
var utils$1 = utils$e;
var bind = bind$2;
var Axios = Axios_1;
var mergeConfig = mergeConfig$2;
var defaults$1 = defaults_1;
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  utils$1.extend(instance, Axios.prototype, context);
  utils$1.extend(instance, context);
  return instance;
}
var axios$1 = createInstance(defaults$1);
axios$1.Axios = Axios;
axios$1.create = function create2(instanceConfig) {
  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
};
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel$1;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError$1;
axios$2.exports = axios$1;
axios$2.exports.default = axios$1;
var axios = axios$2.exports;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$8 = function() {
  __assign$8 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$8.apply(this, arguments);
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$7 = function() {
  __assign$7 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$7.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result2 = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result2.length;
  while (result2.charAt(start) === "\0")
    start++;
  while (result2.charAt(end - 1) === "\0")
    end--;
  return result2.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function pascalCaseTransform(input, index) {
  var firstChar = input.charAt(0);
  var lowerChars = input.substr(1).toLowerCase();
  if (index > 0 && firstChar >= "0" && firstChar <= "9") {
    return "_" + firstChar + lowerChars;
  }
  return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign$7({ delimiter: "", transform: pascalCaseTransform }, options));
}
function camelCaseTransform(input, index) {
  if (index === 0)
    return input.toLowerCase();
  return pascalCaseTransform(input, index);
}
function camelCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return pascalCase(input, __assign$8({ transform: camelCaseTransform }, options));
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$6 = function() {
  __assign$6 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$6.apply(this, arguments);
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$5 = function() {
  __assign$5 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$5.apply(this, arguments);
};
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign$5({ delimiter: "." }, options));
}
function snakeCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign$6({ delimiter: "_" }, options));
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$4 = function() {
  __assign$4 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$4.apply(this, arguments);
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign$3 = function() {
  __assign$3 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$3.apply(this, arguments);
};
function upperCaseFirst(input) {
  return input.charAt(0).toUpperCase() + input.substr(1);
}
function capitalCaseTransform(input) {
  return upperCaseFirst(input.toLowerCase());
}
function capitalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign$3({ delimiter: " ", transform: capitalCaseTransform }, options));
}
function headerCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return capitalCase(input, __assign$4({ delimiter: "-" }, options));
}
function ownKeys$3(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread$3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$3(Object(source2), true).forEach(function(key) {
        _defineProperty$2(target, key, source2[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$3(Object(source2)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
      });
    }
  }
  return target;
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var applyCaseOptions = function applyCaseOptions2(fn, defaultOptions) {
  return function(input, options) {
    return fn(input, _objectSpread$3(_objectSpread$3({}, defaultOptions), options));
  };
};
var preserveSpecificKeys = function preserveSpecificKeys2(fn, keys2) {
  var condition = typeof keys2 === "function" ? keys2 : function(input) {
    return keys2.includes(input);
  };
  return function(input, options) {
    return condition(input, options) ? input : fn(input, options);
  };
};
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof3(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof3(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
var isURLSearchParams = function isURLSearchParams2(value) {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
};
var isFormData = function isFormData2(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
};
var isPlainObject = function isPlainObject2(value) {
  return _typeof$1(value) === "object" && value !== null && Object.prototype.toString.call(value) === "[object Object]";
};
var isTransformable = function isTransformable2(value) {
  return Array.isArray(value) || isPlainObject(value) || isFormData(value) || isURLSearchParams(value);
};
function ownKeys$2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$2(Object(source2), true).forEach(function(key) {
        _defineProperty$1(target, key, source2[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$2(Object(source2)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
      });
    }
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray$1(arr, i2) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i2) || _unsupportedIterableToArray$1(arr, i2) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$1(arr, i2) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i2 = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i2 >= o.length)
          return { done: true };
        return { done: false, value: o[i2++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$1(arr);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
var caseFunctions = {
  snake: snakeCase,
  camel: camelCase,
  header: headerCase
};
var transformObjectUsingCallbackRecursive = function transformObjectUsingCallbackRecursive2(data, fn, overwrite) {
  if (!isTransformable(data)) {
    return data;
  }
  if ((isFormData(data) || isURLSearchParams(data)) && (!data.entries || overwrite && !data["delete"])) {
    var type = isFormData(data) ? "FormData" : "URLSearchParams";
    var polyfill = isFormData(data) ? "https://github.com/jimmywarting/FormData" : "https://github.com/jerrybendy/url-search-params-polyfill";
    if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      console.warn("Be careful that ".concat(type, " cannot be transformed on React Native. If you intentionally implemented, ignore this kind of warning: https://facebook.github.io/react-native/docs/debugging.html"));
    } else {
      if (!data.entries) {
        console.warn("You must use polyfill of ".concat(type, ".prototype.entries() on Internet Explorer or Safari: ").concat(polyfill));
      }
      if (overwrite && !data["delete"]) {
        console.warn("You must use polyfill of ".concat(type, ".prototype.delete() on Internet Explorer or Safari: ").concat(polyfill));
      }
    }
    return data;
  }
  var prototype = Object.getPrototypeOf(data);
  var store = overwrite ? data : !prototype ? /* @__PURE__ */ Object.create(null) : new prototype.constructor();
  var series;
  if (isFormData(data) || isURLSearchParams(data)) {
    series = data.entries();
    if (overwrite) {
      series = _toConsumableArray$1(series);
      var _iterator = _createForOfIteratorHelper(series), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray$1(_step.value, 1), key = _step$value[0];
          data["delete"](key);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  } else {
    series = Object.entries(data);
    if (overwrite && !Array.isArray(data)) {
      var _iterator2 = _createForOfIteratorHelper(series), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var _step2$value = _slicedToArray$1(_step2.value, 1), _key = _step2$value[0];
          delete data[_key];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
  var _iterator3 = _createForOfIteratorHelper(series), _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var _step3$value = _slicedToArray$1(_step3.value, 2), _key2 = _step3$value[0], value = _step3$value[1];
      if (isFormData(store) || isURLSearchParams(store)) {
        store.append(fn(_key2), value);
      } else if (_key2 !== "__proto__") {
        store[fn(typeof _key2 === "string" ? _key2 : "".concat(_key2))] = transformObjectUsingCallbackRecursive2(value, fn, overwrite);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return store;
};
var transformObjectUsingCallback = function transformObjectUsingCallback2(data, fn, options) {
  fn = applyCaseOptions(fn, _objectSpread$2({
    stripRegexp: /[^A-Z0-9[\]]+/gi
  }, options === null || options === void 0 ? void 0 : options.caseOptions));
  if (options !== null && options !== void 0 && options.preservedKeys) {
    fn = preserveSpecificKeys(fn, options.preservedKeys);
  }
  return transformObjectUsingCallbackRecursive(data, fn, (options === null || options === void 0 ? void 0 : options.overwrite) || false);
};
var createObjectTransformer = function createObjectTransformer2(fn) {
  return function(data, options) {
    return transformObjectUsingCallback(data, fn, options);
  };
};
var createObjectTransformerOf = function createObjectTransformerOf2(functionName, options) {
  return createObjectTransformer((options === null || options === void 0 ? void 0 : options[functionName]) || caseFunctions[functionName]);
};
var createObjectTransformers = function createObjectTransformers2(options) {
  var functionNames = Object.keys(caseFunctions);
  var objectTransformers = {};
  for (var _i2 = 0, _functionNames = functionNames; _i2 < _functionNames.length; _i2++) {
    var functionName = _functionNames[_i2];
    objectTransformers[functionName] = createObjectTransformerOf(functionName, options);
  }
  return objectTransformers;
};
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function ownKeys$1(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$1(Object(source2), true).forEach(function(key) {
        _defineProperty(target, key, source2[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$1(Object(source2)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _iterableToArrayLimit(arr, i2) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = void 0;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var createSnakeParamsInterceptor = function createSnakeParamsInterceptor2(options) {
  var _createObjectTransfor = createObjectTransformers(options === null || options === void 0 ? void 0 : options.caseFunctions), snake = _createObjectTransfor.snake;
  return function(config) {
    if (config.params) {
      config.params = snake(config.params, options);
    }
    return config;
  };
};
var createSnakeRequestTransformer = function createSnakeRequestTransformer2(options) {
  var _createObjectTransfor2 = createObjectTransformers(options === null || options === void 0 ? void 0 : options.caseFunctions), snake = _createObjectTransfor2.snake, header = _createObjectTransfor2.header;
  return function(data, headers) {
    if (!(options !== null && options !== void 0 && options.ignoreHeaders) && isPlainObject(headers)) {
      for (var _i = 0, _Object$entries = Object.entries(headers); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
        header(value, _objectSpread$1({
          overwrite: true
        }, options));
        if (!["common", "delete", "get", "head", "post", "put", "patch"].includes(key)) {
          delete headers[key];
          headers[Object.keys(header(_defineProperty({}, key, null), options))[0]] = value;
        }
      }
    }
    return snake(data, options);
  };
};
var createCamelResponseTransformer = function createCamelResponseTransformer2(options) {
  var _createObjectTransfor3 = createObjectTransformers(options === null || options === void 0 ? void 0 : options.caseFunctions), camel = _createObjectTransfor3.camel;
  return function(data, headers) {
    if (!(options !== null && options !== void 0 && options.ignoreHeaders)) {
      camel(headers, _objectSpread$1({
        overwrite: true
      }, options));
    }
    return camel(data, options);
  };
};
var applyCaseMiddleware = function applyCaseMiddleware2(axios2, options) {
  var _options$caseMiddlewa, _options$caseMiddlewa2, _options$caseMiddlewa3;
  axios2.defaults.transformRequest = [(options === null || options === void 0 ? void 0 : (_options$caseMiddlewa = options.caseMiddleware) === null || _options$caseMiddlewa === void 0 ? void 0 : _options$caseMiddlewa.requestTransformer) || createSnakeRequestTransformer(options)].concat(_toConsumableArray(Array.isArray(axios2.defaults.transformRequest) ? axios2.defaults.transformRequest : axios2.defaults.transformRequest !== void 0 ? [axios2.defaults.transformRequest] : []));
  axios2.defaults.transformResponse = [].concat(_toConsumableArray(Array.isArray(axios2.defaults.transformResponse) ? axios2.defaults.transformResponse : axios2.defaults.transformResponse !== void 0 ? [axios2.defaults.transformResponse] : []), [(options === null || options === void 0 ? void 0 : (_options$caseMiddlewa2 = options.caseMiddleware) === null || _options$caseMiddlewa2 === void 0 ? void 0 : _options$caseMiddlewa2.responseTransformer) || createCamelResponseTransformer(options)]);
  axios2.interceptors.request.use((options === null || options === void 0 ? void 0 : (_options$caseMiddlewa3 = options.caseMiddleware) === null || _options$caseMiddlewa3 === void 0 ? void 0 : _options$caseMiddlewa3.requestInterceptor) || createSnakeParamsInterceptor(options));
  return axios2;
};
var es = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": applyCaseMiddleware
});
var require$$1$1 = /* @__PURE__ */ getAugmentedNamespace(es);
var urlJoin = { exports: {} };
(function(module2) {
  (function(name2, context, definition) {
    if (module2.exports)
      module2.exports = definition();
    else
      context[name2] = definition();
  })("urljoin", commonjsGlobal, function() {
    function normalize(strArray) {
      var resultArray = [];
      if (strArray.length === 0) {
        return "";
      }
      if (typeof strArray[0] !== "string") {
        throw new TypeError("Url must be a string. Received " + strArray[0]);
      }
      if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
        var first = strArray.shift();
        strArray[0] = first + strArray[0];
      }
      if (strArray[0].match(/^file:\/\/\//)) {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1:///");
      } else {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1://");
      }
      for (var i2 = 0; i2 < strArray.length; i2++) {
        var component = strArray[i2];
        if (typeof component !== "string") {
          throw new TypeError("Url must be a string. Received " + component);
        }
        if (component === "") {
          continue;
        }
        if (i2 > 0) {
          component = component.replace(/^[\/]+/, "");
        }
        if (i2 < strArray.length - 1) {
          component = component.replace(/[\/]+$/, "");
        } else {
          component = component.replace(/[\/]+$/, "/");
        }
        resultArray.push(component);
      }
      var str = resultArray.join("/");
      str = str.replace(/\/(\?|&|#[^!])/g, "$1");
      var parts = str.split("?");
      str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");
      return str;
    }
    return function() {
      var input;
      if (typeof arguments[0] === "object") {
        input = arguments[0];
      } else {
        input = [].slice.call(arguments);
      }
      return normalize(input);
    };
  });
})(urlJoin);
var errors = {};
function fixProto(target, prototype) {
  var setPrototypeOf = Object.setPrototypeOf;
  setPrototypeOf ? setPrototypeOf(target, prototype) : target.__proto__ = prototype;
}
function fixStack(target, fn) {
  if (fn === void 0) {
    fn = target.constructor;
  }
  var captureStackTrace = Error.captureStackTrace;
  captureStackTrace && captureStackTrace(target, fn);
}
var __extends$1 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) {
        if (b2.hasOwnProperty(p)) {
          d2[p] = b2[p];
        }
      }
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var CustomError = function(_super) {
  __extends$1(CustomError2, _super);
  function CustomError2(message) {
    var _newTarget = this.constructor;
    var _this = _super.call(this, message) || this;
    Object.defineProperty(_this, "name", {
      value: _newTarget.name,
      enumerable: false,
      configurable: true
    });
    fixProto(_this, _newTarget.prototype);
    fixStack(_this);
    return _this;
  }
  return CustomError2;
}(Error);
var __spreadArrays = function() {
  var arguments$1 = arguments;
  for (var s = 0, i2 = 0, il = arguments.length; i2 < il; i2++) {
    s += arguments$1[i2].length;
  }
  for (var r = Array(s), k = 0, i2 = 0; i2 < il; i2++) {
    for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }
  return r;
};
function customErrorFactory(fn, parent) {
  if (parent === void 0) {
    parent = Error;
  }
  function CustomError2() {
    var arguments$1 = arguments;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments$1[_i];
    }
    if (!(this instanceof CustomError2)) {
      return new (CustomError2.bind.apply(CustomError2, __spreadArrays([void 0], args)))();
    }
    parent.apply(this, args);
    Object.defineProperty(this, "name", {
      value: fn.name || parent.name,
      enumerable: false,
      configurable: true
    });
    fn.apply(this, args);
    fixStack(this, CustomError2);
  }
  return Object.defineProperties(CustomError2, {
    prototype: {
      value: Object.create(parent.prototype, {
        constructor: {
          value: CustomError2,
          writable: true,
          configurable: true
        }
      })
    }
  });
}
var customError = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  CustomError,
  customErrorFactory
});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(customError);
var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(errors, "__esModule", { value: true });
errors.TodoistRequestError = void 0;
var ts_custom_error_1 = require$$0;
var authenticationErrorCodes = [401, 403];
var TodoistRequestError = function(_super) {
  __extends(TodoistRequestError2, _super);
  function TodoistRequestError2(message, httpStatusCode, responseData) {
    var _this = _super.call(this, message) || this;
    _this.message = message;
    _this.httpStatusCode = httpStatusCode;
    _this.responseData = responseData;
    _this.isAuthenticationError = function() {
      if (!_this.httpStatusCode) {
        return false;
      }
      return authenticationErrorCodes.includes(_this.httpStatusCode);
    };
    Object.defineProperty(_this, "name", { value: "TodoistRequestError" });
    return _this;
  }
  return TodoistRequestError2;
}(ts_custom_error_1.CustomError);
errors.TodoistRequestError = TodoistRequestError;
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var _nodeId;
var _clockseq;
var _lastMSecs = 0;
var _lastNSecs = 0;
function v1(options, buf, offset2) {
  var i2 = buf && offset2 || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i2++] = tl >>> 24 & 255;
  b[i2++] = tl >>> 16 & 255;
  b[i2++] = tl >>> 8 & 255;
  b[i2++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i2++] = tmh >>> 8 & 255;
  b[i2++] = tmh & 255;
  b[i2++] = tmh >>> 24 & 15 | 16;
  b[i2++] = tmh >>> 16 & 255;
  b[i2++] = clockseq >>> 8 | 128;
  b[i2++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i2 + n] = node[n];
  }
  return buf || stringify(b);
}
function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes = [];
  for (var i2 = 0; i2 < str.length; ++i2) {
    bytes.push(str.charCodeAt(i2));
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL$1 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(name2, version2, hashfunc) {
  function generateUUID(value, namespace2, buf, offset2) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace2 === "string") {
      namespace2 = parse(namespace2);
    }
    if (namespace2.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace2);
    bytes.set(value, namespace2.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset2 = offset2 || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset2 + i2] = bytes[i2];
      }
      return buf;
    }
    return stringify(bytes);
  }
  try {
    generateUUID.name = name2;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i2 = 0; i2 < msg.length; ++i2) {
      bytes[i2] = msg.charCodeAt(i2);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i2 = 0; i2 < length32; i2 += 8) {
    var x = input[i2 >> 5] >>> i2 % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i2 = 0; i2 < x.length; i2 += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i2], 7, -680876936);
    d = md5ff(d, a, b, c, x[i2 + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i2 + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i2 + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i2 + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i2 + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i2 + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i2 + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i2 + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i2 + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i2 + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i2 + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i2 + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i2 + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i2 + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i2 + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i2 + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i2 + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i2 + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i2], 20, -373897302);
    a = md5gg(a, b, c, d, x[i2 + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i2 + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i2 + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i2 + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i2 + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i2 + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i2 + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i2 + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i2 + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i2 + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i2 + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i2 + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i2 + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i2 + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i2 + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i2 + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i2 + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i2 + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i2 + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i2 + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i2 + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i2], 11, -358537222);
    c = md5hh(c, d, a, b, x[i2 + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i2 + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i2 + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i2 + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i2 + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i2 + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i2], 6, -198630844);
    d = md5ii(d, a, b, c, x[i2 + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i2 + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i2 + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i2 + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i2 + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i2 + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i2 + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i2 + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i2 + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i2 + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i2 + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i2 + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i2 + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i2 + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i2 + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));
  for (var i2 = 0; i2 < length8; i2 += 8) {
    output[i2 >> 5] |= (input[i2 / 8] & 255) << i2 % 32;
  }
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var v3 = v35("v3", 48, md5);
var v3$1 = v3;
function v4(options, buf, offset2) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset2 = offset2 || 0;
    for (var i2 = 0; i2 < 16; ++i2) {
      buf[offset2 + i2] = rnds[i2];
    }
    return buf;
  }
  return stringify(rnds);
}
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i2 = 0; i2 < msg.length; ++i2) {
      bytes.push(msg.charCodeAt(i2));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var v5 = v35("v5", 80, sha1);
var v5$1 = v5;
var nil = "00000000-0000-0000-0000-000000000000";
function version(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var esmBrowser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  v1,
  v3: v3$1,
  v4,
  v5: v5$1,
  NIL: nil,
  version,
  validate,
  stringify,
  parse
});
var require$$1 = /* @__PURE__ */ getAugmentedNamespace(esmBrowser);
var axiosRetry$2 = { exports: {} };
var cjs = {};
var interopRequireDefault = { exports: {} };
(function(module2) {
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  }
  module2.exports = _interopRequireDefault2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(interopRequireDefault);
var runtime = { exports: {} };
(function(module2) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self2, context);
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record2 = tryCatch(generator[method], generator, arg);
        if (record2.type === "throw") {
          reject(record2.arg);
        } else {
          var result2 = record2.arg;
          var value = result2.value;
          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result2.value = unwrapped;
            resolve(result2);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result2) {
        return result2.done ? result2.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self2, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record2 = tryCatch(innerFn, self2, context);
          if (record2.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record2.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record2.arg,
              done: context.done
            };
          } else if (record2.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record2.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record2 = tryCatch(method, delegate.iterator, context.arg);
      if (record2.type === "throw") {
        context.method = "throw";
        context.arg = record2.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record2.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record2 = entry.completion || {};
      record2.type = "normal";
      delete record2.arg;
      entry.completion = record2;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(object) {
      var keys2 = [];
      for (var key in object) {
        keys2.push(key);
      }
      keys2.reverse();
      return function next() {
        while (keys2.length) {
          var key2 = keys2.pop();
          if (key2 in object) {
            next.value = key2;
            next.done = false;
            return next;
          }
        }
        next.done = true;
        return next;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i2 = -1, next = function next2() {
            while (++i2 < iterable.length) {
              if (hasOwn.call(iterable, i2)) {
                next2.value = iterable[i2];
                next2.done = false;
                return next2;
              }
            }
            next2.value = undefined$1;
            next2.done = true;
            return next2;
          };
          return next.next = next;
        }
      }
      return { next: doneResult };
    }
    exports.values = values;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name2 in this) {
            if (name2.charAt(0) === "t" && hasOwn.call(this, name2) && !isNaN(+name2.slice(1))) {
              this[name2] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record2.type = "throw";
          record2.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          var record2 = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record2 = finallyEntry ? finallyEntry.completion : {};
        record2.type = type;
        record2.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record2);
      },
      complete: function(record2, afterLoc) {
        if (record2.type === "throw") {
          throw record2.arg;
        }
        if (record2.type === "break" || record2.type === "continue") {
          this.next = record2.arg;
        } else if (record2.type === "return") {
          this.rval = this.arg = record2.arg;
          this.method = "return";
          this.next = "end";
        } else if (record2.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc === tryLoc) {
            var record2 = entry.completion;
            if (record2.type === "throw") {
              var thrown = record2.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(module2.exports);
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
var regenerator = runtime.exports;
var _typeof = { exports: {} };
(function(module2) {
  function _typeof3(obj) {
    "@babel/helpers - typeof";
    return module2.exports = _typeof3 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _typeof3(obj);
  }
  module2.exports = _typeof3, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(_typeof);
var asyncToGenerator = { exports: {} };
(function(module2) {
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
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  module2.exports = _asyncToGenerator, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(asyncToGenerator);
var defineProperty = { exports: {} };
(function(module2) {
  function _defineProperty3(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  module2.exports = _defineProperty3, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(defineProperty);
const denyList = /* @__PURE__ */ new Set([
  "ENOTFOUND",
  "ENETUNREACH",
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_CRL",
  "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
  "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
  "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
  "CERT_SIGNATURE_FAILURE",
  "CRL_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CRL_NOT_YET_VALID",
  "CRL_HAS_EXPIRED",
  "ERROR_IN_CERT_NOT_BEFORE_FIELD",
  "ERROR_IN_CERT_NOT_AFTER_FIELD",
  "ERROR_IN_CRL_LAST_UPDATE_FIELD",
  "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
  "OUT_OF_MEM",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_CHAIN_TOO_LONG",
  "CERT_REVOKED",
  "INVALID_CA",
  "PATH_LENGTH_EXCEEDED",
  "INVALID_PURPOSE",
  "CERT_UNTRUSTED",
  "CERT_REJECTED",
  "HOSTNAME_MISMATCH"
]);
var isRetryAllowed = (error) => !denyList.has(error && error.code);
var _interopRequireDefault = interopRequireDefault.exports;
Object.defineProperty(cjs, "__esModule", {
  value: true
});
cjs.isNetworkError = isNetworkError$1;
cjs.isRetryableError = isRetryableError;
cjs.isSafeRequestError = isSafeRequestError;
cjs.isIdempotentRequestError = isIdempotentRequestError;
cjs.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
cjs.exponentialDelay = exponentialDelay;
cjs.default = axiosRetry$1;
var _regenerator = _interopRequireDefault(regenerator);
var _typeof2 = _interopRequireDefault(_typeof.exports);
var _asyncToGenerator2 = _interopRequireDefault(asyncToGenerator.exports);
var _defineProperty2 = _interopRequireDefault(defineProperty.exports);
var _isRetryAllowed = _interopRequireDefault(isRetryAllowed);
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys(Object(source2), true).forEach(function(key) {
        (0, _defineProperty2.default)(target, key, source2[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys(Object(source2)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source2, key));
      });
    }
  }
  return target;
}
var namespace = "axios-retry";
function isNetworkError$1(error) {
  return !error.response && Boolean(error.code) && error.code !== "ECONNABORTED" && (0, _isRetryAllowed.default)(error);
}
var SAFE_HTTP_METHODS = ["get", "head", "options"];
var IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(["put", "delete"]);
function isRetryableError(error) {
  return error.code !== "ECONNABORTED" && (!error.response || error.response.status >= 500 && error.response.status <= 599);
}
function isSafeRequestError(error) {
  if (!error.config) {
    return false;
  }
  return isRetryableError(error) && SAFE_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
function isIdempotentRequestError(error) {
  if (!error.config) {
    return false;
  }
  return isRetryableError(error) && IDEMPOTENT_HTTP_METHODS.indexOf(error.config.method) !== -1;
}
function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError$1(error) || isIdempotentRequestError(error);
}
function noDelay() {
  return 0;
}
function exponentialDelay() {
  var retryNumber = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
  var delay = Math.pow(2, retryNumber) * 100;
  var randomSum = delay * 0.2 * Math.random();
  return delay + randomSum;
}
function getCurrentState(config) {
  var currentState = config[namespace] || {};
  currentState.retryCount = currentState.retryCount || 0;
  config[namespace] = currentState;
  return currentState;
}
function getRequestOptions(config, defaultOptions) {
  return _objectSpread(_objectSpread({}, defaultOptions), config[namespace]);
}
function fixConfig(axios2, config) {
  if (axios2.defaults.agent === config.agent) {
    delete config.agent;
  }
  if (axios2.defaults.httpAgent === config.httpAgent) {
    delete config.httpAgent;
  }
  if (axios2.defaults.httpsAgent === config.httpsAgent) {
    delete config.httpsAgent;
  }
}
function shouldRetry(_x, _x2, _x3, _x4) {
  return _shouldRetry.apply(this, arguments);
}
function _shouldRetry() {
  _shouldRetry = (0, _asyncToGenerator2.default)(/* @__PURE__ */ _regenerator.default.mark(function _callee2(retries, retryCondition, currentState, error) {
    var shouldRetryOrPromise;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shouldRetryOrPromise = currentState.retryCount < retries && retryCondition(error);
            if (!((0, _typeof2.default)(shouldRetryOrPromise) === "object")) {
              _context2.next = 11;
              break;
            }
            _context2.prev = 2;
            _context2.next = 5;
            return shouldRetryOrPromise;
          case 5:
            return _context2.abrupt("return", true);
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", false);
          case 11:
            return _context2.abrupt("return", shouldRetryOrPromise);
          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));
  return _shouldRetry.apply(this, arguments);
}
function axiosRetry$1(axios2, defaultOptions) {
  axios2.interceptors.request.use(function(config) {
    var currentState = getCurrentState(config);
    currentState.lastRequestTime = Date.now();
    return config;
  });
  axios2.interceptors.response.use(null, /* @__PURE__ */ function() {
    var _ref = (0, _asyncToGenerator2.default)(/* @__PURE__ */ _regenerator.default.mark(function _callee(error) {
      var config, _getRequestOptions, _getRequestOptions$re, retries, _getRequestOptions$re2, retryCondition, _getRequestOptions$re3, retryDelay, _getRequestOptions$sh, shouldResetTimeout, currentState, delay, lastRequestDuration;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = error.config;
              if (config) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return", Promise.reject(error));
            case 3:
              _getRequestOptions = getRequestOptions(config, defaultOptions), _getRequestOptions$re = _getRequestOptions.retries, retries = _getRequestOptions$re === void 0 ? 3 : _getRequestOptions$re, _getRequestOptions$re2 = _getRequestOptions.retryCondition, retryCondition = _getRequestOptions$re2 === void 0 ? isNetworkOrIdempotentRequestError : _getRequestOptions$re2, _getRequestOptions$re3 = _getRequestOptions.retryDelay, retryDelay = _getRequestOptions$re3 === void 0 ? noDelay : _getRequestOptions$re3, _getRequestOptions$sh = _getRequestOptions.shouldResetTimeout, shouldResetTimeout = _getRequestOptions$sh === void 0 ? false : _getRequestOptions$sh;
              currentState = getCurrentState(config);
              _context.next = 7;
              return shouldRetry(retries, retryCondition, currentState, error);
            case 7:
              if (!_context.sent) {
                _context.next = 14;
                break;
              }
              currentState.retryCount += 1;
              delay = retryDelay(currentState.retryCount, error);
              fixConfig(axios2, config);
              if (!shouldResetTimeout && config.timeout && currentState.lastRequestTime) {
                lastRequestDuration = Date.now() - currentState.lastRequestTime;
                config.timeout = Math.max(config.timeout - lastRequestDuration - delay, 1);
              }
              config.transformRequest = [function(data) {
                return data;
              }];
              return _context.abrupt("return", new Promise(function(resolve) {
                return setTimeout(function() {
                  return resolve(axios2(config));
                }, delay);
              }));
            case 14:
              return _context.abrupt("return", Promise.reject(error));
            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function(_x5) {
      return _ref.apply(this, arguments);
    };
  }());
}
axiosRetry$1.isNetworkError = isNetworkError$1;
axiosRetry$1.isSafeRequestError = isSafeRequestError;
axiosRetry$1.isIdempotentRequestError = isIdempotentRequestError;
axiosRetry$1.isNetworkOrIdempotentRequestError = isNetworkOrIdempotentRequestError;
axiosRetry$1.exponentialDelay = exponentialDelay;
axiosRetry$1.isRetryableError = isRetryableError;
const axiosRetry = cjs.default;
axiosRetry$2.exports = axiosRetry;
axiosRetry$2.exports.default = axiosRetry;
var __assign$2 = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign$2 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$2.apply(this, arguments);
};
var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f2 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod2) {
  return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
};
Object.defineProperty(restClient, "__esModule", { value: true });
restClient.request = restClient.isSuccess = void 0;
var axios_1 = __importDefault$1(axios);
var axios_case_converter_1 = __importDefault$1(require$$1$1);
var url_join_1$1 = __importDefault$1(urlJoin.exports);
var errors_1 = errors;
var uuid_1$1 = require$$1;
var axios_retry_1 = __importDefault$1(axiosRetry$2.exports);
var defaultHeaders = {
  "Content-Type": "application/json"
};
function getAuthHeader(apiKey) {
  return "Bearer " + apiKey;
}
function isNetworkError(error) {
  return Boolean(!error.response && error.code !== "ECONNABORTED");
}
function getRetryDelay(retryCount) {
  return retryCount === 1 ? 0 : 500;
}
function isAxiosError(error) {
  var _a;
  return Boolean((_a = error) === null || _a === void 0 ? void 0 : _a.isAxiosError);
}
function getTodoistRequestError(error, originalStack) {
  var requestError = new errors_1.TodoistRequestError(error.message);
  requestError.stack = isAxiosError(error) && originalStack ? originalStack.stack : error.stack;
  if (isAxiosError(error) && error.response) {
    requestError.httpStatusCode = error.response.status;
    requestError.responseData = error.response.data;
  }
  return requestError;
}
function getRequestConfiguration(apiToken, requestId) {
  var authHeader = apiToken ? { Authorization: getAuthHeader(apiToken) } : void 0;
  var requestIdHeader = requestId ? { "X-Request-Id": requestId } : void 0;
  var headers = __assign$2(__assign$2(__assign$2({}, defaultHeaders), authHeader), requestIdHeader);
  return { headers };
}
function getAxiosClient(apiToken, requestId) {
  var configuration = getRequestConfiguration(apiToken, requestId);
  var client = (0, axios_case_converter_1.default)(axios_1.default.create(configuration));
  (0, axios_retry_1.default)(client, {
    retries: 3,
    retryCondition: isNetworkError,
    retryDelay: getRetryDelay
  });
  return client;
}
function isSuccess(response) {
  return response.status >= 200 && response.status < 300;
}
restClient.isSuccess = isSuccess;
function request(httpMethod, baseUri, relativePath, apiToken, payload, requestId) {
  return __awaiter$2(this, void 0, void 0, function() {
    var originalStack, axiosClient, _a, error_1;
    return __generator$2(this, function(_b) {
      switch (_b.label) {
        case 0:
          originalStack = new Error();
          _b.label = 1;
        case 1:
          _b.trys.push([1, 9, , 10]);
          if (httpMethod === "POST" && !requestId) {
            requestId = (0, uuid_1$1.v4)();
          }
          axiosClient = getAxiosClient(apiToken, requestId);
          _a = httpMethod;
          switch (_a) {
            case "GET":
              return [3, 2];
            case "POST":
              return [3, 4];
            case "DELETE":
              return [3, 6];
          }
          return [3, 8];
        case 2:
          return [4, axiosClient.get((0, url_join_1$1.default)(baseUri, relativePath), { params: payload })];
        case 3:
          return [2, _b.sent()];
        case 4:
          return [4, axiosClient.post((0, url_join_1$1.default)(baseUri, relativePath), payload)];
        case 5:
          return [2, _b.sent()];
        case 6:
          return [4, axiosClient.delete((0, url_join_1$1.default)(baseUri, relativePath))];
        case 7:
          return [2, _b.sent()];
        case 8:
          return [3, 10];
        case 9:
          error_1 = _b.sent();
          if (!isAxiosError(error_1) && !(error_1 instanceof Error)) {
            throw new Error("An unknown error occurred during the request");
          }
          throw getTodoistRequestError(error_1, originalStack);
        case 10:
          return [2];
      }
    });
  });
}
restClient.request = request;
var taskConverters = {};
var __assign$1 = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
Object.defineProperty(taskConverters, "__esModule", { value: true });
taskConverters.getTaskFromQuickAddResponse = void 0;
var showTaskEndpoint = "https://todoist.com/showTask";
function getTaskUrlFromQuickAddResponse(responseData) {
  return responseData.syncId ? showTaskEndpoint + "?id=" + responseData.id + "&sync_id=" + responseData.syncId : showTaskEndpoint + "?id=" + responseData.id;
}
function getTaskFromQuickAddResponse(responseData) {
  var _a;
  var due = responseData.due ? __assign$1(__assign$1({ recurring: responseData.due.isRecurring, string: responseData.due.string, date: responseData.due.date }, responseData.due.timezone !== null && { datetime: responseData.due.date }), responseData.due.timezone !== null && { timezone: responseData.due.timezone }) : void 0;
  var task = __assign$1(__assign$1(__assign$1({ id: responseData.id, order: responseData.childOrder, content: responseData.content, description: responseData.description, projectId: responseData.projectId, sectionId: (_a = responseData.sectionId) !== null && _a !== void 0 ? _a : 0, completed: responseData.checked === 1, labelIds: responseData.labels, priority: responseData.priority, commentCount: 0, created: responseData.dateAdded, url: getTaskUrlFromQuickAddResponse(responseData) }, due !== void 0 && { due }), responseData.parentId !== null && { parentId: responseData.parentId }), responseData.responsibleUid !== null && { assignee: responseData.responsibleUid });
  return task;
}
taskConverters.getTaskFromQuickAddResponse = getTaskFromQuickAddResponse;
var endpoints = {};
Object.defineProperty(endpoints, "__esModule", { value: true });
endpoints.ENDPOINT_REVOKE_TOKEN = endpoints.ENDPOINT_GET_TOKEN = endpoints.ENDPOINT_AUTHORIZATION = endpoints.ENDPOINT_SYNC_QUICK_ADD = endpoints.ENDPOINT_REST_PROJECT_COLLABORATORS = endpoints.ENDPOINT_REST_TASK_REOPEN = endpoints.ENDPOINT_REST_TASK_CLOSE = endpoints.ENDPOINT_REST_COMMENTS = endpoints.ENDPOINT_REST_LABELS = endpoints.ENDPOINT_REST_SECTIONS = endpoints.ENDPOINT_REST_PROJECTS = endpoints.ENDPOINT_REST_TASKS = endpoints.API_AUTHORIZATION_BASE_URI = endpoints.API_SYNC_BASE_URI = endpoints.API_REST_BASE_URI = void 0;
endpoints.API_REST_BASE_URI = "https://api.todoist.com/rest/v1/";
endpoints.API_SYNC_BASE_URI = "https://api.todoist.com/sync/v8/";
endpoints.API_AUTHORIZATION_BASE_URI = "https://todoist.com/oauth/";
endpoints.ENDPOINT_REST_TASKS = "tasks";
endpoints.ENDPOINT_REST_PROJECTS = "projects";
endpoints.ENDPOINT_REST_SECTIONS = "sections";
endpoints.ENDPOINT_REST_LABELS = "labels";
endpoints.ENDPOINT_REST_COMMENTS = "comments";
endpoints.ENDPOINT_REST_TASK_CLOSE = "close";
endpoints.ENDPOINT_REST_TASK_REOPEN = "reopen";
endpoints.ENDPOINT_REST_PROJECT_COLLABORATORS = "collaborators";
endpoints.ENDPOINT_SYNC_QUICK_ADD = "quick/add";
endpoints.ENDPOINT_AUTHORIZATION = "authorize";
endpoints.ENDPOINT_GET_TOKEN = "access_token";
endpoints.ENDPOINT_REVOKE_TOKEN = "access_tokens/revoke";
var validators = {};
var types = {};
var requests = {};
Object.defineProperty(requests, "__esModule", { value: true });
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(entities, exports);
  __exportStar(errors, exports);
  __exportStar(requests, exports);
})(types);
Object.defineProperty(validators, "__esModule", { value: true });
validators.validateUserArray = validators.validateUser = validators.validateCommentArray = validators.validateComment = validators.validateLabelArray = validators.validateLabel = validators.validateSectionArray = validators.validateSection = validators.validateProjectArray = validators.validateProject = validators.validateTaskArray = validators.validateTask = void 0;
var types_1$1 = types;
function validateTask(input) {
  return types_1$1.Task.check(input);
}
validators.validateTask = validateTask;
function validateTaskArray(input) {
  return input.map(validateTask);
}
validators.validateTaskArray = validateTaskArray;
function validateProject(input) {
  return types_1$1.Project.check(input);
}
validators.validateProject = validateProject;
function validateProjectArray(input) {
  return input.map(validateProject);
}
validators.validateProjectArray = validateProjectArray;
function validateSection(input) {
  return types_1$1.Section.check(input);
}
validators.validateSection = validateSection;
function validateSectionArray(input) {
  return input.map(validateSection);
}
validators.validateSectionArray = validateSectionArray;
function validateLabel(input) {
  return types_1$1.Label.check(input);
}
validators.validateLabel = validateLabel;
function validateLabelArray(input) {
  return input.map(validateLabel);
}
validators.validateLabelArray = validateLabelArray;
function validateComment(input) {
  return types_1$1.Comment.check(input);
}
validators.validateComment = validateComment;
function validateCommentArray(input) {
  return input.map(validateComment);
}
validators.validateCommentArray = validateCommentArray;
function validateUser(input) {
  return types_1$1.User.check(input);
}
validators.validateUser = validateUser;
function validateUserArray(input) {
  return input.map(validateUser);
}
validators.validateUserArray = validateUserArray;
var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator$1 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f2 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod2) {
  return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
};
Object.defineProperty(TodoistApi$1, "__esModule", { value: true });
TodoistApi$1.TodoistApi = void 0;
var entities_1 = entities;
var restClient_1$1 = restClient;
var taskConverters_1 = taskConverters;
var url_join_1 = __importDefault(urlJoin.exports);
var endpoints_1$1 = endpoints;
var validators_1 = validators;
var TodoistApi = function() {
  function TodoistApi2(authToken) {
    this.authToken = authToken;
  }
  TodoistApi2.prototype.getTask = function(id) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_TASKS, String(id)), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateTask)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getTasks = function(args) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_TASKS, this.authToken, args)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateTaskArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.addTask = function(args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_TASKS, this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateTask)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.quickAddTask = function(args) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response, task;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_SYNC_BASE_URI, endpoints_1$1.ENDPOINT_SYNC_QUICK_ADD, this.authToken, args)];
          case 1:
            response = _a.sent();
            task = (0, taskConverters_1.getTaskFromQuickAddResponse)(response.data);
            return [2, (0, validators_1.validateTask)(task)];
        }
      });
    });
  };
  TodoistApi2.prototype.updateTask = function(id, args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_TASKS, String(id)), this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.closeTask = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_TASKS, String(id), endpoints_1$1.ENDPOINT_REST_TASK_CLOSE), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.reopenTask = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_TASKS, String(id), endpoints_1$1.ENDPOINT_REST_TASK_REOPEN), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.deleteTask = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("DELETE", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_TASKS, String(id)), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.getProject = function(id) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_PROJECTS, String(id)), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateProject)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getProjects = function() {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_PROJECTS, this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateProjectArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.addProject = function(args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_PROJECTS, this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateProject)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.updateProject = function(id, args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_PROJECTS, String(id)), this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.deleteProject = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("DELETE", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_PROJECTS, String(id)), this.authToken, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.getProjectCollaborators = function(projectId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(projectId);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_PROJECTS, String(projectId), endpoints_1$1.ENDPOINT_REST_PROJECT_COLLABORATORS), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateUserArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getSections = function(projectId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_SECTIONS, this.authToken, projectId && { projectId })];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateSectionArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getSection = function(id) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_SECTIONS, String(id)), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateSection)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.addSection = function(args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_SECTIONS, this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateSection)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.updateSection = function(id, args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_SECTIONS, String(id)), this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.deleteSection = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("DELETE", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_SECTIONS, String(id)), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.getLabel = function(id) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_LABELS, String(id)), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateLabel)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getLabels = function() {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_LABELS, this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateLabelArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.addLabel = function(args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_LABELS, this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateLabel)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.updateLabel = function(id, args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_LABELS, String(id)), this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.deleteLabel = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("DELETE", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_LABELS, String(id)), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.getComments = function(args) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_COMMENTS, this.authToken, args)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateCommentArray)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.getComment = function(id) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("GET", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_COMMENTS, String(id)), this.authToken)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateComment)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.addComment = function(args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, endpoints_1$1.ENDPOINT_REST_COMMENTS, this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, validators_1.validateComment)(response.data)];
        }
      });
    });
  };
  TodoistApi2.prototype.updateComment = function(id, args, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("POST", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_COMMENTS, String(id)), this.authToken, args, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  TodoistApi2.prototype.deleteComment = function(id, requestId) {
    return __awaiter$1(this, void 0, void 0, function() {
      var response;
      return __generator$1(this, function(_a) {
        switch (_a.label) {
          case 0:
            entities_1.Int.check(id);
            return [4, (0, restClient_1$1.request)("DELETE", endpoints_1$1.API_REST_BASE_URI, (0, url_join_1.default)(endpoints_1$1.ENDPOINT_REST_COMMENTS, String(id)), this.authToken, void 0, requestId)];
          case 1:
            response = _a.sent();
            return [2, (0, restClient_1$1.isSuccess)(response)];
        }
      });
    });
  };
  return TodoistApi2;
}();
TodoistApi$1.TodoistApi = TodoistApi;
var authentication = {};
var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f2, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f2)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f2 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
Object.defineProperty(authentication, "__esModule", { value: true });
authentication.revokeAuthToken = authentication.getAuthToken = authentication.getAuthorizationUrl = authentication.getAuthStateParameter = void 0;
var restClient_1 = restClient;
var uuid_1 = require$$1;
var types_1 = types;
var endpoints_1 = endpoints;
function getAuthStateParameter() {
  return (0, uuid_1.v4)();
}
authentication.getAuthStateParameter = getAuthStateParameter;
function getAuthorizationUrl(clientId, permissions, state) {
  if (!(permissions === null || permissions === void 0 ? void 0 : permissions.length)) {
    throw new Error("At least one scope value should be passed for permissions.");
  }
  var scope = permissions.join(",");
  return "" + endpoints_1.API_AUTHORIZATION_BASE_URI + endpoints_1.ENDPOINT_AUTHORIZATION + "?client_id=" + clientId + "&scope=" + scope + "&state=" + state;
}
authentication.getAuthorizationUrl = getAuthorizationUrl;
function getAuthToken(args) {
  var _a;
  return __awaiter(this, void 0, void 0, function() {
    var response;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4, (0, restClient_1.request)("POST", endpoints_1.API_AUTHORIZATION_BASE_URI, endpoints_1.ENDPOINT_GET_TOKEN, void 0, args)];
        case 1:
          response = _b.sent();
          if (response.status !== 200 || !((_a = response.data) === null || _a === void 0 ? void 0 : _a.accessToken)) {
            throw new types_1.TodoistRequestError("Authentication token exchange failed.", response.status, response.data);
          }
          return [2, response.data];
      }
    });
  });
}
authentication.getAuthToken = getAuthToken;
function revokeAuthToken(args) {
  return __awaiter(this, void 0, void 0, function() {
    var response;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, (0, restClient_1.request)("POST", endpoints_1.API_SYNC_BASE_URI, endpoints_1.ENDPOINT_REVOKE_TOKEN, void 0, args)];
        case 1:
          response = _a.sent();
          return [2, (0, restClient_1.isSuccess)(response)];
      }
    });
  });
}
authentication.revokeAuthToken = revokeAuthToken;
var utils = {};
var colors = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getColor = exports.colors = exports.taupe = exports.gray = exports.charcoal = exports.salmon = exports.magenta = exports.lavender = exports.violet = exports.grape = exports.blue = exports.lightBlue = exports.skyBlue = exports.turquoise = exports.mintGreen = exports.green = exports.limeGreen = exports.oliveGreen = exports.yellow = exports.orange = exports.red = exports.berryRed = void 0;
  exports.berryRed = { name: "Berry Red", id: 30, value: "#b8255f" };
  exports.red = { name: "Red", id: 31, value: "#db4035" };
  exports.orange = { name: "Orange", id: 32, value: "#ff9933" };
  exports.yellow = { name: "Yellow", id: 33, value: "#fad000" };
  exports.oliveGreen = { name: "Olive Green", id: 34, value: "#afb83b" };
  exports.limeGreen = { name: "Lime Green", id: 35, value: "#7ecc49" };
  exports.green = { name: "Green", id: 36, value: "#299438" };
  exports.mintGreen = { name: "Mint Green", id: 37, value: "#6accbc" };
  exports.turquoise = { name: "Turquoise", id: 38, value: "#158fad" };
  exports.skyBlue = { name: "Sky Blue", id: 39, value: "#14aaf5" };
  exports.lightBlue = { name: "Light Blue", id: 40, value: "#96c3eb" };
  exports.blue = { name: "Blue", id: 41, value: "#4073ff" };
  exports.grape = { name: "Grape", id: 42, value: "#884dff" };
  exports.violet = { name: "Violet", id: 43, value: "#af38eb" };
  exports.lavender = { name: "Lavender", id: 44, value: "#eb96eb" };
  exports.magenta = { name: "Magenta", id: 45, value: "#e05194" };
  exports.salmon = { name: "Salmon", id: 46, value: "#ff8d85" };
  exports.charcoal = { name: "Charcoal", id: 47, value: "#808080" };
  exports.gray = { name: "Gray", id: 48, value: "#b8b8b8" };
  exports.taupe = { name: "Taupe", id: 49, value: "#ccac93" };
  exports.colors = [
    exports.berryRed,
    exports.red,
    exports.orange,
    exports.yellow,
    exports.oliveGreen,
    exports.limeGreen,
    exports.green,
    exports.mintGreen,
    exports.turquoise,
    exports.skyBlue,
    exports.lightBlue,
    exports.blue,
    exports.grape,
    exports.violet,
    exports.lavender,
    exports.magenta,
    exports.salmon,
    exports.charcoal,
    exports.gray,
    exports.taupe
  ];
  function getColor(colorId) {
    var color = exports.colors.find(function(color2) {
      return color2.id === colorId;
    });
    return color !== null && color !== void 0 ? color : exports.charcoal;
  }
  exports.getColor = getColor;
})(colors);
var sanitization = {};
var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(sanitization, "__esModule", { value: true });
sanitization.getSanitizedTasks = sanitization.getSanitizedContent = void 0;
var BOLD_FORMAT = /(^|[\s!?,;>:]+)(?:\*\*|__|!!)(.+?)(\*\*|__|!!)(?=$|[\s!?,;><:]+)/gi;
var ITALIC_FORMAT = /(^|[\s!?,;>:]+)(?:\*|_|!)(.+?)(\*|_|!)(?=$|[\s!?,;><:]+)/gi;
var BOLD_ITALIC_FORMAT = /(^|[\s!?,;>:]+)(?:\*\*\*|___|!!!)(.+?)(\*\*\*|___|!!!)(?=$|[\s!?,;><:]+)/gi;
var CODE_BLOCK_FORMAT = /```([\s\S]*?)```/gi;
var CODE_INLINE_FORMAT = /`([^`]+)`/gi;
var TODOIST_LINK = /((?:(?:onenote:)?[\w-]+):\/\/[^\s]+)\s+[[(]([^)]+)[\])]/gi;
var MARKDOWN_LINK = /\[(.+?)\]\((.+?)\)/gi;
var GMAIL_LINK = /\[\[gmail=(.+?),\s*(.+?)\]\]/gi;
var OUTLOOK_LINK = /\[\[outlook=(.+?),\s*(.+?)\]\]/gi;
var THUNDERBIRD_LINK = /\[\[thunderbird\n(.+)\n(.+)\n\s*\]\]/gi;
var FAKE_SECTION_PREFIX = "* ";
var FAKE_SECTION_SUFFIX = ":";
function removeStyleFormatting(input) {
  if (!input.includes("!") && !input.includes("*") && !input.includes("_")) {
    return input;
  }
  function removeMarkdown(match5, prefix, text) {
    return "" + prefix + text;
  }
  input = input.replace(BOLD_ITALIC_FORMAT, removeMarkdown);
  input = input.replace(BOLD_FORMAT, removeMarkdown);
  input = input.replace(ITALIC_FORMAT, removeMarkdown);
  return input;
}
function removeCodeFormatting(input) {
  function removeMarkdown(match5, text) {
    return text;
  }
  input = input.replace(CODE_BLOCK_FORMAT, removeMarkdown);
  input = input.replace(CODE_INLINE_FORMAT, removeMarkdown);
  return input;
}
function removeFakeSectionFormatting(input) {
  if (input.startsWith(FAKE_SECTION_PREFIX)) {
    input = input.slice(FAKE_SECTION_PREFIX.length);
  }
  if (input.endsWith(FAKE_SECTION_SUFFIX)) {
    input = input.slice(0, input.length - FAKE_SECTION_SUFFIX.length);
  }
  return input;
}
function removeMarkdownLinks(input) {
  if (!input.includes("[") || !input.includes("]")) {
    return input;
  }
  function removeMarkdown(match5, text) {
    return text;
  }
  return input.replace(MARKDOWN_LINK, removeMarkdown);
}
function removeTodoistLinks(input) {
  if (!input.includes("(") || !input.includes(")")) {
    return input;
  }
  function removeMarkdown(match5, url, text) {
    return text;
  }
  return input.replace(TODOIST_LINK, removeMarkdown);
}
function removeAppLinks(input) {
  if (input.includes("gmail")) {
    input = input.replace(GMAIL_LINK, function(match5, id, text) {
      return text;
    });
  }
  if (input.includes("outlook")) {
    input = input.replace(OUTLOOK_LINK, function(match5, id, text) {
      return text;
    });
  }
  if (input.includes("thunderbird")) {
    input = input.replace(THUNDERBIRD_LINK, function(match5, text) {
      return text;
    });
  }
  return input;
}
function getSanitizedContent(input) {
  input = removeStyleFormatting(input);
  input = removeCodeFormatting(input);
  input = removeFakeSectionFormatting(input);
  input = removeMarkdownLinks(input);
  input = removeTodoistLinks(input);
  input = removeAppLinks(input);
  return input;
}
sanitization.getSanitizedContent = getSanitizedContent;
function getSanitizedTasks(tasks) {
  return tasks.map(function(task) {
    return __assign(__assign({}, task), { sanitizedContent: getSanitizedContent(task.content) });
  });
}
sanitization.getSanitizedTasks = getSanitizedTasks;
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(colors, exports);
  __exportStar(sanitization, exports);
})(utils);
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() {
      return m[k];
    } });
  } : function(o, m, k, k2) {
    if (k2 === void 0)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(TodoistApi$1, exports);
  __exportStar(restClient, exports);
  __exportStar(authentication, exports);
  __exportStar(types, exports);
  __exportStar(utils, exports);
})(dist);
const api$2 = new dist.TodoistApi(window.TODOIST_TOKEN);
const logger = (log) => {
  console.log(`<<<<<<<<< [roamist] complete-task >>>>>>>>>: ${log}`);
};
const completeTask = async () => {
  const blockUid = roam42.common.currentActiveBlockUID();
  const blockInfo = await roam42.common.getBlockInfoByUID(blockUid);
  const block = blockInfo[0][0];
  const text = block == null ? void 0 : block.string;
  const todoistId = text.match(/\d{10}/);
  try {
    await api$2.closeTask(todoistId);
    const newContent = block.string.replace("{{[[TODO]]}}", "{{[[DONE]]}}");
    await roam42.common.updateBlock(blockUid, newContent);
    logger("succeeded.");
  } catch (e) {
    logger("failed.");
    logger(e);
  }
};
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var hookCallback;
function hooks() {
  return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
  hookCallback = callback;
}
function isArray(input) {
  return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
}
function isObject(input) {
  return input != null && Object.prototype.toString.call(input) === "[object Object]";
}
function hasOwnProp(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
function isObjectEmpty(obj) {
  if (Object.getOwnPropertyNames) {
    return Object.getOwnPropertyNames(obj).length === 0;
  } else {
    var k;
    for (k in obj) {
      if (hasOwnProp(obj, k)) {
        return false;
      }
    }
    return true;
  }
}
function isUndefined(input) {
  return input === void 0;
}
function isNumber(input) {
  return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
}
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
function map(arr, fn) {
  var res = [], i2;
  for (i2 = 0; i2 < arr.length; ++i2) {
    res.push(fn(arr[i2], i2));
  }
  return res;
}
function extend(a, b) {
  for (var i2 in b) {
    if (hasOwnProp(b, i2)) {
      a[i2] = b[i2];
    }
  }
  if (hasOwnProp(b, "toString")) {
    a.toString = b.toString;
  }
  if (hasOwnProp(b, "valueOf")) {
    a.valueOf = b.valueOf;
  }
  return a;
}
function createUTC(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, true).utc();
}
function defaultParsingFlags() {
  return {
    empty: false,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: false,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: false,
    userInvalidated: false,
    iso: false,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: false,
    weekdayMismatch: false
  };
}
function getParsingFlags(m) {
  if (m._pf == null) {
    m._pf = defaultParsingFlags();
  }
  return m._pf;
}
var some;
if (Array.prototype.some) {
  some = Array.prototype.some;
} else {
  some = function(fun) {
    var t = Object(this), len = t.length >>> 0, i2;
    for (i2 = 0; i2 < len; i2++) {
      if (i2 in t && fun.call(this, t[i2], i2, t)) {
        return true;
      }
    }
    return false;
  };
}
function isValid(m) {
  if (m._isValid == null) {
    var flags = getParsingFlags(m), parsedParts = some.call(flags.parsedDateParts, function(i2) {
      return i2 != null;
    }), isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
    if (m._strict) {
      isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === void 0;
    }
    if (Object.isFrozen == null || !Object.isFrozen(m)) {
      m._isValid = isNowValid;
    } else {
      return isNowValid;
    }
  }
  return m._isValid;
}
function createInvalid(flags) {
  var m = createUTC(NaN);
  if (flags != null) {
    extend(getParsingFlags(m), flags);
  } else {
    getParsingFlags(m).userInvalidated = true;
  }
  return m;
}
var momentProperties = hooks.momentProperties = [], updateInProgress = false;
function copyConfig(to2, from2) {
  var i2, prop, val;
  if (!isUndefined(from2._isAMomentObject)) {
    to2._isAMomentObject = from2._isAMomentObject;
  }
  if (!isUndefined(from2._i)) {
    to2._i = from2._i;
  }
  if (!isUndefined(from2._f)) {
    to2._f = from2._f;
  }
  if (!isUndefined(from2._l)) {
    to2._l = from2._l;
  }
  if (!isUndefined(from2._strict)) {
    to2._strict = from2._strict;
  }
  if (!isUndefined(from2._tzm)) {
    to2._tzm = from2._tzm;
  }
  if (!isUndefined(from2._isUTC)) {
    to2._isUTC = from2._isUTC;
  }
  if (!isUndefined(from2._offset)) {
    to2._offset = from2._offset;
  }
  if (!isUndefined(from2._pf)) {
    to2._pf = getParsingFlags(from2);
  }
  if (!isUndefined(from2._locale)) {
    to2._locale = from2._locale;
  }
  if (momentProperties.length > 0) {
    for (i2 = 0; i2 < momentProperties.length; i2++) {
      prop = momentProperties[i2];
      val = from2[prop];
      if (!isUndefined(val)) {
        to2[prop] = val;
      }
    }
  }
  return to2;
}
function Moment(config) {
  copyConfig(this, config);
  this._d = new Date(config._d != null ? config._d.getTime() : NaN);
  if (!this.isValid()) {
    this._d = new Date(NaN);
  }
  if (updateInProgress === false) {
    updateInProgress = true;
    hooks.updateOffset(this);
    updateInProgress = false;
  }
}
function isMoment(obj) {
  return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
function warn(msg) {
  if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
    console.warn("Deprecation warning: " + msg);
  }
}
function deprecate(msg, fn) {
  var firstTime = true;
  return extend(function() {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(null, msg);
    }
    if (firstTime) {
      var args = [], arg, i2, key;
      for (i2 = 0; i2 < arguments.length; i2++) {
        arg = "";
        if (typeof arguments[i2] === "object") {
          arg += "\n[" + i2 + "] ";
          for (key in arguments[0]) {
            if (hasOwnProp(arguments[0], key)) {
              arg += key + ": " + arguments[0][key] + ", ";
            }
          }
          arg = arg.slice(0, -2);
        } else {
          arg = arguments[i2];
        }
        args.push(arg);
      }
      warn(msg + "\nArguments: " + Array.prototype.slice.call(args).join("") + "\n" + new Error().stack);
      firstTime = false;
    }
    return fn.apply(this, arguments);
  }, fn);
}
var deprecations = {};
function deprecateSimple(name2, msg) {
  if (hooks.deprecationHandler != null) {
    hooks.deprecationHandler(name2, msg);
  }
  if (!deprecations[name2]) {
    warn(msg);
    deprecations[name2] = true;
  }
}
hooks.suppressDeprecationWarnings = false;
hooks.deprecationHandler = null;
function isFunction(input) {
  return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
}
function set(config) {
  var prop, i2;
  for (i2 in config) {
    if (hasOwnProp(config, i2)) {
      prop = config[i2];
      if (isFunction(prop)) {
        this[i2] = prop;
      } else {
        this["_" + i2] = prop;
      }
    }
  }
  this._config = config;
  this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
}
function mergeConfigs(parentConfig, childConfig) {
  var res = extend({}, parentConfig), prop;
  for (prop in childConfig) {
    if (hasOwnProp(childConfig, prop)) {
      if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
        res[prop] = {};
        extend(res[prop], parentConfig[prop]);
        extend(res[prop], childConfig[prop]);
      } else if (childConfig[prop] != null) {
        res[prop] = childConfig[prop];
      } else {
        delete res[prop];
      }
    }
  }
  for (prop in parentConfig) {
    if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
      res[prop] = extend({}, res[prop]);
    }
  }
  return res;
}
function Locale(config) {
  if (config != null) {
    this.set(config);
  }
}
var keys;
if (Object.keys) {
  keys = Object.keys;
} else {
  keys = function(obj) {
    var i2, res = [];
    for (i2 in obj) {
      if (hasOwnProp(obj, i2)) {
        res.push(i2);
      }
    }
    return res;
  };
}
var defaultCalendar = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L"
};
function calendar(key, mom, now2) {
  var output = this._calendar[key] || this._calendar["sameElse"];
  return isFunction(output) ? output.call(mom, now2) : output;
}
function zeroFill(number2, targetLength, forceSign) {
  var absNumber = "" + Math.abs(number2), zerosToFill = targetLength - absNumber.length, sign2 = number2 >= 0;
  return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(token2, padded, ordinal2, callback) {
  var func = callback;
  if (typeof callback === "string") {
    func = function() {
      return this[callback]();
    };
  }
  if (token2) {
    formatTokenFunctions[token2] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function() {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  if (ordinal2) {
    formatTokenFunctions[ordinal2] = function() {
      return this.localeData().ordinal(func.apply(this, arguments), token2);
    };
  }
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function makeFormatFunction(format2) {
  var array2 = format2.match(formattingTokens), i2, length;
  for (i2 = 0, length = array2.length; i2 < length; i2++) {
    if (formatTokenFunctions[array2[i2]]) {
      array2[i2] = formatTokenFunctions[array2[i2]];
    } else {
      array2[i2] = removeFormattingTokens(array2[i2]);
    }
  }
  return function(mom) {
    var output = "", i3;
    for (i3 = 0; i3 < length; i3++) {
      output += isFunction(array2[i3]) ? array2[i3].call(mom, format2) : array2[i3];
    }
    return output;
  };
}
function formatMoment(m, format2) {
  if (!m.isValid()) {
    return m.localeData().invalidDate();
  }
  format2 = expandFormat(format2, m.localeData());
  formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
  return formatFunctions[format2](m);
}
function expandFormat(format2, locale2) {
  var i2 = 5;
  function replaceLongDateFormatTokens(input) {
    return locale2.longDateFormat(input) || input;
  }
  localFormattingTokens.lastIndex = 0;
  while (i2 >= 0 && localFormattingTokens.test(format2)) {
    format2 = format2.replace(localFormattingTokens, replaceLongDateFormatTokens);
    localFormattingTokens.lastIndex = 0;
    i2 -= 1;
  }
  return format2;
}
var defaultLongDateFormat = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
function longDateFormat(key) {
  var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
  if (format2 || !formatUpper) {
    return format2;
  }
  this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
    if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
      return tok.slice(1);
    }
    return tok;
  }).join("");
  return this._longDateFormat[key];
}
var defaultInvalidDate = "Invalid date";
function invalidDate() {
  return this._invalidDate;
}
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(number2) {
  return this._ordinal.replace("%d", number2);
}
var defaultRelativeTime = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years"
};
function relativeTime(number2, withoutSuffix, string2, isFuture) {
  var output = this._relativeTime[string2];
  return isFunction(output) ? output(number2, withoutSuffix, string2, isFuture) : output.replace(/%d/i, number2);
}
function pastFuture(diff2, output) {
  var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
  return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
}
var aliases = {};
function addUnitAlias(unit, shorthand) {
  var lowerCase2 = unit.toLowerCase();
  aliases[lowerCase2] = aliases[lowerCase2 + "s"] = aliases[shorthand] = unit;
}
function normalizeUnits(units) {
  return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : void 0;
}
function normalizeObjectUnits(inputObject) {
  var normalizedInput = {}, normalizedProp, prop;
  for (prop in inputObject) {
    if (hasOwnProp(inputObject, prop)) {
      normalizedProp = normalizeUnits(prop);
      if (normalizedProp) {
        normalizedInput[normalizedProp] = inputObject[prop];
      }
    }
  }
  return normalizedInput;
}
var priorities = {};
function addUnitPriority(unit, priority) {
  priorities[unit] = priority;
}
function getPrioritizedUnits(unitsObj) {
  var units = [], u;
  for (u in unitsObj) {
    if (hasOwnProp(unitsObj, u)) {
      units.push({ unit: u, priority: priorities[u] });
    }
  }
  units.sort(function(a, b) {
    return a.priority - b.priority;
  });
  return units;
}
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function absFloor(number2) {
  if (number2 < 0) {
    return Math.ceil(number2) || 0;
  } else {
    return Math.floor(number2);
  }
}
function toInt(argumentForCoercion) {
  var coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
function makeGetSet(unit, keepTime) {
  return function(value) {
    if (value != null) {
      set$1(this, unit, value);
      hooks.updateOffset(this, keepTime);
      return this;
    } else {
      return get(this, unit);
    }
  };
}
function get(mom, unit) {
  return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]() : NaN;
}
function set$1(mom, unit, value) {
  if (mom.isValid() && !isNaN(value)) {
    if (unit === "FullYear" && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
      value = toInt(value);
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value, mom.month(), daysInMonth(value, mom.month()));
    } else {
      mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
    }
  }
}
function stringGet(units) {
  units = normalizeUnits(units);
  if (isFunction(this[units])) {
    return this[units]();
  }
  return this;
}
function stringSet(units, value) {
  if (typeof units === "object") {
    units = normalizeObjectUnits(units);
    var prioritized = getPrioritizedUnits(units), i2;
    for (i2 = 0; i2 < prioritized.length; i2++) {
      this[prioritized[i2].unit](units[prioritized[i2].unit]);
    }
  } else {
    units = normalizeUnits(units);
    if (isFunction(this[units])) {
      return this[units](value);
    }
  }
  return this;
}
var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, regexes;
regexes = {};
function addRegexToken(token2, regex, strictRegex) {
  regexes[token2] = isFunction(regex) ? regex : function(isStrict, localeData2) {
    return isStrict && strictRegex ? strictRegex : regex;
  };
}
function getParseRegexForToken(token2, config) {
  if (!hasOwnProp(regexes, token2)) {
    return new RegExp(unescapeFormat(token2));
  }
  return regexes[token2](config._strict, config._locale);
}
function unescapeFormat(s) {
  return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
    return p1 || p2 || p3 || p4;
  }));
}
function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var tokens = {};
function addParseToken(token2, callback) {
  var i2, func = callback;
  if (typeof token2 === "string") {
    token2 = [token2];
  }
  if (isNumber(callback)) {
    func = function(input, array2) {
      array2[callback] = toInt(input);
    };
  }
  for (i2 = 0; i2 < token2.length; i2++) {
    tokens[token2[i2]] = func;
  }
}
function addWeekParseToken(token2, callback) {
  addParseToken(token2, function(input, array2, config, token3) {
    config._w = config._w || {};
    callback(input, config._w, config, token3);
  });
}
function addTimeToArrayFromToken(token2, input, config) {
  if (input != null && hasOwnProp(tokens, token2)) {
    tokens[token2](input, config._a, config, token2);
  }
}
var YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(n, x) {
  return (n % x + x) % x;
}
var indexOf;
if (Array.prototype.indexOf) {
  indexOf = Array.prototype.indexOf;
} else {
  indexOf = function(o) {
    var i2;
    for (i2 = 0; i2 < this.length; ++i2) {
      if (this[i2] === o) {
        return i2;
      }
    }
    return -1;
  };
}
function daysInMonth(year, month) {
  if (isNaN(year) || isNaN(month)) {
    return NaN;
  }
  var modMonth = mod(month, 12);
  year += (month - modMonth) / 12;
  return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
}
addFormatToken("M", ["MM", 2], "Mo", function() {
  return this.month() + 1;
});
addFormatToken("MMM", 0, 0, function(format2) {
  return this.localeData().monthsShort(this, format2);
});
addFormatToken("MMMM", 0, 0, function(format2) {
  return this.localeData().months(this, format2);
});
addUnitAlias("month", "M");
addUnitPriority("month", 8);
addRegexToken("M", match1to2);
addRegexToken("MM", match1to2, match2);
addRegexToken("MMM", function(isStrict, locale2) {
  return locale2.monthsShortRegex(isStrict);
});
addRegexToken("MMMM", function(isStrict, locale2) {
  return locale2.monthsRegex(isStrict);
});
addParseToken(["M", "MM"], function(input, array2) {
  array2[MONTH] = toInt(input) - 1;
});
addParseToken(["MMM", "MMMM"], function(input, array2, config, token2) {
  var month = config._locale.monthsParse(input, token2, config._strict);
  if (month != null) {
    array2[MONTH] = month;
  } else {
    getParsingFlags(config).invalidMonth = input;
  }
});
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(m, format2) {
  if (!m) {
    return isArray(this._months) ? this._months : this._months["standalone"];
  }
  return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
}
function localeMonthsShort(m, format2) {
  if (!m) {
    return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
  }
  return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
}
function handleStrictParse(monthName, format2, strict) {
  var i2, ii, mom, llc = monthName.toLocaleLowerCase();
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
    for (i2 = 0; i2 < 12; ++i2) {
      mom = createUTC([2e3, i2]);
      this._shortMonthsParse[i2] = this.monthsShort(mom, "").toLocaleLowerCase();
      this._longMonthsParse[i2] = this.months(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "MMM") {
      ii = indexOf.call(this._shortMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._longMonthsParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._longMonthsParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortMonthsParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeMonthsParse(monthName, format2, strict) {
  var i2, mom, regex;
  if (this._monthsParseExact) {
    return handleStrictParse.call(this, monthName, format2, strict);
  }
  if (!this._monthsParse) {
    this._monthsParse = [];
    this._longMonthsParse = [];
    this._shortMonthsParse = [];
  }
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    if (strict && !this._longMonthsParse[i2]) {
      this._longMonthsParse[i2] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
      this._shortMonthsParse[i2] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
    }
    if (!strict && !this._monthsParse[i2]) {
      regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
      this._monthsParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "MMMM" && this._longMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (strict && format2 === "MMM" && this._shortMonthsParse[i2].test(monthName)) {
      return i2;
    } else if (!strict && this._monthsParse[i2].test(monthName)) {
      return i2;
    }
  }
}
function setMonth(mom, value) {
  var dayOfMonth;
  if (!mom.isValid()) {
    return mom;
  }
  if (typeof value === "string") {
    if (/^\d+$/.test(value)) {
      value = toInt(value);
    } else {
      value = mom.localeData().monthsParse(value);
      if (!isNumber(value)) {
        return mom;
      }
    }
  }
  dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
  mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
  return mom;
}
function getSetMonth(value) {
  if (value != null) {
    setMonth(this, value);
    hooks.updateOffset(this, true);
    return this;
  } else {
    return get(this, "Month");
  }
}
function getDaysInMonth() {
  return daysInMonth(this.year(), this.month());
}
function monthsShortRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsShortStrictRegex;
    } else {
      return this._monthsShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsShortRegex")) {
      this._monthsShortRegex = defaultMonthsShortRegex;
    }
    return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
  }
}
function monthsRegex(isStrict) {
  if (this._monthsParseExact) {
    if (!hasOwnProp(this, "_monthsRegex")) {
      computeMonthsParse.call(this);
    }
    if (isStrict) {
      return this._monthsStrictRegex;
    } else {
      return this._monthsRegex;
    }
  } else {
    if (!hasOwnProp(this, "_monthsRegex")) {
      this._monthsRegex = defaultMonthsRegex;
    }
    return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
  }
}
function computeMonthsParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var shortPieces = [], longPieces = [], mixedPieces = [], i2, mom;
  for (i2 = 0; i2 < 12; i2++) {
    mom = createUTC([2e3, i2]);
    shortPieces.push(this.monthsShort(mom, ""));
    longPieces.push(this.months(mom, ""));
    mixedPieces.push(this.months(mom, ""));
    mixedPieces.push(this.monthsShort(mom, ""));
  }
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  for (i2 = 0; i2 < 12; i2++) {
    shortPieces[i2] = regexEscape(shortPieces[i2]);
    longPieces[i2] = regexEscape(longPieces[i2]);
  }
  for (i2 = 0; i2 < 24; i2++) {
    mixedPieces[i2] = regexEscape(mixedPieces[i2]);
  }
  this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._monthsShortRegex = this._monthsRegex;
  this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
  this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
}
addFormatToken("Y", 0, 0, function() {
  var y = this.year();
  return y <= 9999 ? zeroFill(y, 4) : "+" + y;
});
addFormatToken(0, ["YY", 2], 0, function() {
  return this.year() % 100;
});
addFormatToken(0, ["YYYY", 4], 0, "year");
addFormatToken(0, ["YYYYY", 5], 0, "year");
addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
addUnitAlias("year", "y");
addUnitPriority("year", 1);
addRegexToken("Y", matchSigned);
addRegexToken("YY", match1to2, match2);
addRegexToken("YYYY", match1to4, match4);
addRegexToken("YYYYY", match1to6, match6);
addRegexToken("YYYYYY", match1to6, match6);
addParseToken(["YYYYY", "YYYYYY"], YEAR);
addParseToken("YYYY", function(input, array2) {
  array2[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
});
addParseToken("YY", function(input, array2) {
  array2[YEAR] = hooks.parseTwoDigitYear(input);
});
addParseToken("Y", function(input, array2) {
  array2[YEAR] = parseInt(input, 10);
});
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
hooks.parseTwoDigitYear = function(input) {
  return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
};
var getSetYear = makeGetSet("FullYear", true);
function getIsLeapYear() {
  return isLeapYear(this.year());
}
function createDate(y, m, d, h, M, s, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m, d, h, M, s, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m, d, h, M, s, ms);
  }
  return date;
}
function createUTCDate(y) {
  var date, args;
  if (y < 100 && y >= 0) {
    args = Array.prototype.slice.call(arguments);
    args[0] = y + 400;
    date = new Date(Date.UTC.apply(null, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(null, arguments));
  }
  return date;
}
function firstWeekOffset(year, dow, doy) {
  var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
  return -fwdlw + fwd - 1;
}
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
  var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
  if (dayOfYear <= 0) {
    resYear = year - 1;
    resDayOfYear = daysInYear(resYear) + dayOfYear;
  } else if (dayOfYear > daysInYear(year)) {
    resYear = year + 1;
    resDayOfYear = dayOfYear - daysInYear(year);
  } else {
    resYear = year;
    resDayOfYear = dayOfYear;
  }
  return {
    year: resYear,
    dayOfYear: resDayOfYear
  };
}
function weekOfYear(mom, dow, doy) {
  var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
  if (week < 1) {
    resYear = mom.year() - 1;
    resWeek = week + weeksInYear(resYear, dow, doy);
  } else if (week > weeksInYear(mom.year(), dow, doy)) {
    resWeek = week - weeksInYear(mom.year(), dow, doy);
    resYear = mom.year() + 1;
  } else {
    resYear = mom.year();
    resWeek = week;
  }
  return {
    week: resWeek,
    year: resYear
  };
}
function weeksInYear(year, dow, doy) {
  var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
  return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
}
addFormatToken("w", ["ww", 2], "wo", "week");
addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
addUnitAlias("week", "w");
addUnitAlias("isoWeek", "W");
addUnitPriority("week", 5);
addUnitPriority("isoWeek", 5);
addRegexToken("w", match1to2);
addRegexToken("ww", match1to2, match2);
addRegexToken("W", match1to2);
addRegexToken("WW", match1to2, match2);
addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
  week[token2.substr(0, 1)] = toInt(input);
});
function localeWeek(mom) {
  return weekOfYear(mom, this._week.dow, this._week.doy).week;
}
var defaultLocaleWeek = {
  dow: 0,
  doy: 6
};
function localeFirstDayOfWeek() {
  return this._week.dow;
}
function localeFirstDayOfYear() {
  return this._week.doy;
}
function getSetWeek(input) {
  var week = this.localeData().week(this);
  return input == null ? week : this.add((input - week) * 7, "d");
}
function getSetISOWeek(input) {
  var week = weekOfYear(this, 1, 4).week;
  return input == null ? week : this.add((input - week) * 7, "d");
}
addFormatToken("d", 0, "do", "day");
addFormatToken("dd", 0, 0, function(format2) {
  return this.localeData().weekdaysMin(this, format2);
});
addFormatToken("ddd", 0, 0, function(format2) {
  return this.localeData().weekdaysShort(this, format2);
});
addFormatToken("dddd", 0, 0, function(format2) {
  return this.localeData().weekdays(this, format2);
});
addFormatToken("e", 0, 0, "weekday");
addFormatToken("E", 0, 0, "isoWeekday");
addUnitAlias("day", "d");
addUnitAlias("weekday", "e");
addUnitAlias("isoWeekday", "E");
addUnitPriority("day", 11);
addUnitPriority("weekday", 11);
addUnitPriority("isoWeekday", 11);
addRegexToken("d", match1to2);
addRegexToken("e", match1to2);
addRegexToken("E", match1to2);
addRegexToken("dd", function(isStrict, locale2) {
  return locale2.weekdaysMinRegex(isStrict);
});
addRegexToken("ddd", function(isStrict, locale2) {
  return locale2.weekdaysShortRegex(isStrict);
});
addRegexToken("dddd", function(isStrict, locale2) {
  return locale2.weekdaysRegex(isStrict);
});
addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
  var weekday = config._locale.weekdaysParse(input, token2, config._strict);
  if (weekday != null) {
    week.d = weekday;
  } else {
    getParsingFlags(config).invalidWeekday = input;
  }
});
addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
  week[token2] = toInt(input);
});
function parseWeekday(input, locale2) {
  if (typeof input !== "string") {
    return input;
  }
  if (!isNaN(input)) {
    return parseInt(input, 10);
  }
  input = locale2.weekdaysParse(input);
  if (typeof input === "number") {
    return input;
  }
  return null;
}
function parseIsoWeekday(input, locale2) {
  if (typeof input === "string") {
    return locale2.weekdaysParse(input) % 7 || 7;
  }
  return isNaN(input) ? null : input;
}
function shiftWeekdays(ws, n) {
  return ws.slice(n, 7).concat(ws.slice(0, n));
}
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(m, format2) {
  var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
  return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
}
function localeWeekdaysShort(m) {
  return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}
function localeWeekdaysMin(m) {
  return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
}
function handleStrictParse$1(weekdayName, format2, strict) {
  var i2, ii, mom, llc = weekdayName.toLocaleLowerCase();
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._minWeekdaysParse = [];
    for (i2 = 0; i2 < 7; ++i2) {
      mom = createUTC([2e3, 1]).day(i2);
      this._minWeekdaysParse[i2] = this.weekdaysMin(mom, "").toLocaleLowerCase();
      this._shortWeekdaysParse[i2] = this.weekdaysShort(mom, "").toLocaleLowerCase();
      this._weekdaysParse[i2] = this.weekdays(mom, "").toLocaleLowerCase();
    }
  }
  if (strict) {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  } else {
    if (format2 === "dddd") {
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else if (format2 === "ddd") {
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._minWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    } else {
      ii = indexOf.call(this._minWeekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._weekdaysParse, llc);
      if (ii !== -1) {
        return ii;
      }
      ii = indexOf.call(this._shortWeekdaysParse, llc);
      return ii !== -1 ? ii : null;
    }
  }
}
function localeWeekdaysParse(weekdayName, format2, strict) {
  var i2, mom, regex;
  if (this._weekdaysParseExact) {
    return handleStrictParse$1.call(this, weekdayName, format2, strict);
  }
  if (!this._weekdaysParse) {
    this._weekdaysParse = [];
    this._minWeekdaysParse = [];
    this._shortWeekdaysParse = [];
    this._fullWeekdaysParse = [];
  }
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    if (strict && !this._fullWeekdaysParse[i2]) {
      this._fullWeekdaysParse[i2] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
      this._shortWeekdaysParse[i2] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
      this._minWeekdaysParse[i2] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
    }
    if (!this._weekdaysParse[i2]) {
      regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
      this._weekdaysParse[i2] = new RegExp(regex.replace(".", ""), "i");
    }
    if (strict && format2 === "dddd" && this._fullWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "ddd" && this._shortWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (strict && format2 === "dd" && this._minWeekdaysParse[i2].test(weekdayName)) {
      return i2;
    } else if (!strict && this._weekdaysParse[i2].test(weekdayName)) {
      return i2;
    }
  }
}
function getSetDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  if (input != null) {
    input = parseWeekday(input, this.localeData());
    return this.add(input - day, "d");
  } else {
    return day;
  }
}
function getSetLocaleDayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return input == null ? weekday : this.add(input - weekday, "d");
}
function getSetISODayOfWeek(input) {
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    var weekday = parseIsoWeekday(input, this.localeData());
    return this.day(this.day() % 7 ? weekday : weekday - 7);
  } else {
    return this.day() || 7;
  }
}
function weekdaysRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysStrictRegex;
    } else {
      return this._weekdaysRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      this._weekdaysRegex = defaultWeekdaysRegex;
    }
    return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
  }
}
function weekdaysShortRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysShortStrictRegex;
    } else {
      return this._weekdaysShortRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysShortRegex")) {
      this._weekdaysShortRegex = defaultWeekdaysShortRegex;
    }
    return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
  }
}
function weekdaysMinRegex(isStrict) {
  if (this._weekdaysParseExact) {
    if (!hasOwnProp(this, "_weekdaysRegex")) {
      computeWeekdaysParse.call(this);
    }
    if (isStrict) {
      return this._weekdaysMinStrictRegex;
    } else {
      return this._weekdaysMinRegex;
    }
  } else {
    if (!hasOwnProp(this, "_weekdaysMinRegex")) {
      this._weekdaysMinRegex = defaultWeekdaysMinRegex;
    }
    return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
  }
}
function computeWeekdaysParse() {
  function cmpLenRev(a, b) {
    return b.length - a.length;
  }
  var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i2, mom, minp, shortp, longp;
  for (i2 = 0; i2 < 7; i2++) {
    mom = createUTC([2e3, 1]).day(i2);
    minp = regexEscape(this.weekdaysMin(mom, ""));
    shortp = regexEscape(this.weekdaysShort(mom, ""));
    longp = regexEscape(this.weekdays(mom, ""));
    minPieces.push(minp);
    shortPieces.push(shortp);
    longPieces.push(longp);
    mixedPieces.push(minp);
    mixedPieces.push(shortp);
    mixedPieces.push(longp);
  }
  minPieces.sort(cmpLenRev);
  shortPieces.sort(cmpLenRev);
  longPieces.sort(cmpLenRev);
  mixedPieces.sort(cmpLenRev);
  this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._weekdaysShortRegex = this._weekdaysRegex;
  this._weekdaysMinRegex = this._weekdaysRegex;
  this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
  this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
  this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
}
function hFormat() {
  return this.hours() % 12 || 12;
}
function kFormat() {
  return this.hours() || 24;
}
addFormatToken("H", ["HH", 2], 0, "hour");
addFormatToken("h", ["hh", 2], 0, hFormat);
addFormatToken("k", ["kk", 2], 0, kFormat);
addFormatToken("hmm", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
});
addFormatToken("hmmss", 0, 0, function() {
  return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
addFormatToken("Hmm", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2);
});
addFormatToken("Hmmss", 0, 0, function() {
  return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
});
function meridiem(token2, lowercase) {
  addFormatToken(token2, 0, 0, function() {
    return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
  });
}
meridiem("a", true);
meridiem("A", false);
addUnitAlias("hour", "h");
addUnitPriority("hour", 13);
function matchMeridiem(isStrict, locale2) {
  return locale2._meridiemParse;
}
addRegexToken("a", matchMeridiem);
addRegexToken("A", matchMeridiem);
addRegexToken("H", match1to2);
addRegexToken("h", match1to2);
addRegexToken("k", match1to2);
addRegexToken("HH", match1to2, match2);
addRegexToken("hh", match1to2, match2);
addRegexToken("kk", match1to2, match2);
addRegexToken("hmm", match3to4);
addRegexToken("hmmss", match5to6);
addRegexToken("Hmm", match3to4);
addRegexToken("Hmmss", match5to6);
addParseToken(["H", "HH"], HOUR);
addParseToken(["k", "kk"], function(input, array2, config) {
  var kInput = toInt(input);
  array2[HOUR] = kInput === 24 ? 0 : kInput;
});
addParseToken(["a", "A"], function(input, array2, config) {
  config._isPm = config._locale.isPM(input);
  config._meridiem = input;
});
addParseToken(["h", "hh"], function(input, array2, config) {
  array2[HOUR] = toInt(input);
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmm", function(input, array2, config) {
  var pos = input.length - 2;
  array2[HOUR] = toInt(input.substr(0, pos));
  array2[MINUTE] = toInt(input.substr(pos));
  getParsingFlags(config).bigHour = true;
});
addParseToken("hmmss", function(input, array2, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array2[HOUR] = toInt(input.substr(0, pos1));
  array2[MINUTE] = toInt(input.substr(pos1, 2));
  array2[SECOND] = toInt(input.substr(pos2));
  getParsingFlags(config).bigHour = true;
});
addParseToken("Hmm", function(input, array2, config) {
  var pos = input.length - 2;
  array2[HOUR] = toInt(input.substr(0, pos));
  array2[MINUTE] = toInt(input.substr(pos));
});
addParseToken("Hmmss", function(input, array2, config) {
  var pos1 = input.length - 4, pos2 = input.length - 2;
  array2[HOUR] = toInt(input.substr(0, pos1));
  array2[MINUTE] = toInt(input.substr(pos1, 2));
  array2[SECOND] = toInt(input.substr(pos2));
});
function localeIsPM(input) {
  return (input + "").toLowerCase().charAt(0) === "p";
}
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
function localeMeridiem(hours2, minutes2, isLower) {
  if (hours2 > 11) {
    return isLower ? "pm" : "PM";
  } else {
    return isLower ? "am" : "AM";
  }
}
var baseConfig = {
  calendar: defaultCalendar,
  longDateFormat: defaultLongDateFormat,
  invalidDate: defaultInvalidDate,
  ordinal: defaultOrdinal,
  dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
  relativeTime: defaultRelativeTime,
  months: defaultLocaleMonths,
  monthsShort: defaultLocaleMonthsShort,
  week: defaultLocaleWeek,
  weekdays: defaultLocaleWeekdays,
  weekdaysMin: defaultLocaleWeekdaysMin,
  weekdaysShort: defaultLocaleWeekdaysShort,
  meridiemParse: defaultLocaleMeridiemParse
};
var locales = {}, localeFamilies = {}, globalLocale;
function commonPrefix(arr1, arr2) {
  var i2, minl = Math.min(arr1.length, arr2.length);
  for (i2 = 0; i2 < minl; i2 += 1) {
    if (arr1[i2] !== arr2[i2]) {
      return i2;
    }
  }
  return minl;
}
function normalizeLocale(key) {
  return key ? key.toLowerCase().replace("_", "-") : key;
}
function chooseLocale(names) {
  var i2 = 0, j, next, locale2, split;
  while (i2 < names.length) {
    split = normalizeLocale(names[i2]).split("-");
    j = split.length;
    next = normalizeLocale(names[i2 + 1]);
    next = next ? next.split("-") : null;
    while (j > 0) {
      locale2 = loadLocale(split.slice(0, j).join("-"));
      if (locale2) {
        return locale2;
      }
      if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
        break;
      }
      j--;
    }
    i2++;
  }
  return globalLocale;
}
function loadLocale(name2) {
  var oldLocale = null, aliasedRequire;
  if (locales[name2] === void 0 && typeof module !== "undefined" && module && module.exports) {
    try {
      oldLocale = globalLocale._abbr;
      aliasedRequire = require;
      aliasedRequire("./locale/" + name2);
      getSetGlobalLocale(oldLocale);
    } catch (e) {
      locales[name2] = null;
    }
  }
  return locales[name2];
}
function getSetGlobalLocale(key, values) {
  var data;
  if (key) {
    if (isUndefined(values)) {
      data = getLocale(key);
    } else {
      data = defineLocale(key, values);
    }
    if (data) {
      globalLocale = data;
    } else {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("Locale " + key + " not found. Did you forget to load it?");
      }
    }
  }
  return globalLocale._abbr;
}
function defineLocale(name2, config) {
  if (config !== null) {
    var locale2, parentConfig = baseConfig;
    config.abbr = name2;
    if (locales[name2] != null) {
      deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
      parentConfig = locales[name2]._config;
    } else if (config.parentLocale != null) {
      if (locales[config.parentLocale] != null) {
        parentConfig = locales[config.parentLocale]._config;
      } else {
        locale2 = loadLocale(config.parentLocale);
        if (locale2 != null) {
          parentConfig = locale2._config;
        } else {
          if (!localeFamilies[config.parentLocale]) {
            localeFamilies[config.parentLocale] = [];
          }
          localeFamilies[config.parentLocale].push({
            name: name2,
            config
          });
          return null;
        }
      }
    }
    locales[name2] = new Locale(mergeConfigs(parentConfig, config));
    if (localeFamilies[name2]) {
      localeFamilies[name2].forEach(function(x) {
        defineLocale(x.name, x.config);
      });
    }
    getSetGlobalLocale(name2);
    return locales[name2];
  } else {
    delete locales[name2];
    return null;
  }
}
function updateLocale(name2, config) {
  if (config != null) {
    var locale2, tmpLocale, parentConfig = baseConfig;
    if (locales[name2] != null && locales[name2].parentLocale != null) {
      locales[name2].set(mergeConfigs(locales[name2]._config, config));
    } else {
      tmpLocale = loadLocale(name2);
      if (tmpLocale != null) {
        parentConfig = tmpLocale._config;
      }
      config = mergeConfigs(parentConfig, config);
      if (tmpLocale == null) {
        config.abbr = name2;
      }
      locale2 = new Locale(config);
      locale2.parentLocale = locales[name2];
      locales[name2] = locale2;
    }
    getSetGlobalLocale(name2);
  } else {
    if (locales[name2] != null) {
      if (locales[name2].parentLocale != null) {
        locales[name2] = locales[name2].parentLocale;
        if (name2 === getSetGlobalLocale()) {
          getSetGlobalLocale(name2);
        }
      } else if (locales[name2] != null) {
        delete locales[name2];
      }
    }
  }
  return locales[name2];
}
function getLocale(key) {
  var locale2;
  if (key && key._locale && key._locale._abbr) {
    key = key._locale._abbr;
  }
  if (!key) {
    return globalLocale;
  }
  if (!isArray(key)) {
    locale2 = loadLocale(key);
    if (locale2) {
      return locale2;
    }
    key = [key];
  }
  return chooseLocale(key);
}
function listLocales() {
  return keys(locales);
}
function checkOverflow(m) {
  var overflow, a = m._a;
  if (a && getParsingFlags(m).overflow === -2) {
    overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
    if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
      overflow = DATE;
    }
    if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
      overflow = WEEK;
    }
    if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
      overflow = WEEKDAY;
    }
    getParsingFlags(m).overflow = overflow;
  }
  return m;
}
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
  ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
  ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
  ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
  ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
  ["YYYY-DDD", /\d{4}-\d{3}/],
  ["YYYY-MM", /\d{4}-\d\d/, false],
  ["YYYYYYMMDD", /[+-]\d{10}/],
  ["YYYYMMDD", /\d{8}/],
  ["GGGG[W]WWE", /\d{4}W\d{3}/],
  ["GGGG[W]WW", /\d{4}W\d{2}/, false],
  ["YYYYDDD", /\d{7}/],
  ["YYYYMM", /\d{6}/, false],
  ["YYYY", /\d{4}/, false]
], isoTimes = [
  ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
  ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
  ["HH:mm:ss", /\d\d:\d\d:\d\d/],
  ["HH:mm", /\d\d:\d\d/],
  ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
  ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
  ["HHmmss", /\d\d\d\d\d\d/],
  ["HHmm", /\d\d\d\d/],
  ["HH", /\d\d/]
], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
  UT: 0,
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function configFromISO(config) {
  var i2, l, string2 = config._i, match5 = extendedIsoRegex.exec(string2) || basicIsoRegex.exec(string2), allowTime, dateFormat, timeFormat, tzFormat;
  if (match5) {
    getParsingFlags(config).iso = true;
    for (i2 = 0, l = isoDates.length; i2 < l; i2++) {
      if (isoDates[i2][1].exec(match5[1])) {
        dateFormat = isoDates[i2][0];
        allowTime = isoDates[i2][2] !== false;
        break;
      }
    }
    if (dateFormat == null) {
      config._isValid = false;
      return;
    }
    if (match5[3]) {
      for (i2 = 0, l = isoTimes.length; i2 < l; i2++) {
        if (isoTimes[i2][1].exec(match5[3])) {
          timeFormat = (match5[2] || " ") + isoTimes[i2][0];
          break;
        }
      }
      if (timeFormat == null) {
        config._isValid = false;
        return;
      }
    }
    if (!allowTime && timeFormat != null) {
      config._isValid = false;
      return;
    }
    if (match5[4]) {
      if (tzRegex.exec(match5[4])) {
        tzFormat = "Z";
      } else {
        config._isValid = false;
        return;
      }
    }
    config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
    configFromStringAndFormat(config);
  } else {
    config._isValid = false;
  }
}
function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result2 = [
    untruncateYear(yearStr),
    defaultLocaleMonthsShort.indexOf(monthStr),
    parseInt(dayStr, 10),
    parseInt(hourStr, 10),
    parseInt(minuteStr, 10)
  ];
  if (secondStr) {
    result2.push(parseInt(secondStr, 10));
  }
  return result2;
}
function untruncateYear(yearStr) {
  var year = parseInt(yearStr, 10);
  if (year <= 49) {
    return 2e3 + year;
  } else if (year <= 999) {
    return 1900 + year;
  }
  return year;
}
function preprocessRFC2822(s) {
  return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function checkWeekday(weekdayStr, parsedInput, config) {
  if (weekdayStr) {
    var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
    if (weekdayProvided !== weekdayActual) {
      getParsingFlags(config).weekdayMismatch = true;
      config._isValid = false;
      return false;
    }
  }
  return true;
}
function calculateOffset(obsOffset, militaryOffset, numOffset) {
  if (obsOffset) {
    return obsOffsets[obsOffset];
  } else if (militaryOffset) {
    return 0;
  } else {
    var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
    return h * 60 + m;
  }
}
function configFromRFC2822(config) {
  var match5 = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
  if (match5) {
    parsedArray = extractFromRFC2822Strings(match5[4], match5[3], match5[2], match5[5], match5[6], match5[7]);
    if (!checkWeekday(match5[1], parsedArray, config)) {
      return;
    }
    config._a = parsedArray;
    config._tzm = calculateOffset(match5[8], match5[9], match5[10]);
    config._d = createUTCDate.apply(null, config._a);
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    getParsingFlags(config).rfc2822 = true;
  } else {
    config._isValid = false;
  }
}
function configFromString(config) {
  var matched = aspNetJsonRegex.exec(config._i);
  if (matched !== null) {
    config._d = new Date(+matched[1]);
    return;
  }
  configFromISO(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  configFromRFC2822(config);
  if (config._isValid === false) {
    delete config._isValid;
  } else {
    return;
  }
  if (config._strict) {
    config._isValid = false;
  } else {
    hooks.createFromInputFallback(config);
  }
}
hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
  config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
});
function defaults(a, b, c) {
  if (a != null) {
    return a;
  }
  if (b != null) {
    return b;
  }
  return c;
}
function currentDateArray(config) {
  var nowValue = new Date(hooks.now());
  if (config._useUTC) {
    return [
      nowValue.getUTCFullYear(),
      nowValue.getUTCMonth(),
      nowValue.getUTCDate()
    ];
  }
  return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
}
function configFromArray(config) {
  var i2, date, input = [], currentDate, expectedWeekday, yearToUse;
  if (config._d) {
    return;
  }
  currentDate = currentDateArray(config);
  if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
    dayOfYearFromWeekInfo(config);
  }
  if (config._dayOfYear != null) {
    yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
    if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
      getParsingFlags(config)._overflowDayOfYear = true;
    }
    date = createUTCDate(yearToUse, 0, config._dayOfYear);
    config._a[MONTH] = date.getUTCMonth();
    config._a[DATE] = date.getUTCDate();
  }
  for (i2 = 0; i2 < 3 && config._a[i2] == null; ++i2) {
    config._a[i2] = input[i2] = currentDate[i2];
  }
  for (; i2 < 7; i2++) {
    config._a[i2] = input[i2] = config._a[i2] == null ? i2 === 2 ? 1 : 0 : config._a[i2];
  }
  if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
    config._nextDay = true;
    config._a[HOUR] = 0;
  }
  config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
  expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
  if (config._tzm != null) {
    config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
  }
  if (config._nextDay) {
    config._a[HOUR] = 24;
  }
  if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
    getParsingFlags(config).weekdayMismatch = true;
  }
}
function dayOfYearFromWeekInfo(config) {
  var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
  w = config._w;
  if (w.GG != null || w.W != null || w.E != null) {
    dow = 1;
    doy = 4;
    weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
    week = defaults(w.W, 1);
    weekday = defaults(w.E, 1);
    if (weekday < 1 || weekday > 7) {
      weekdayOverflow = true;
    }
  } else {
    dow = config._locale._week.dow;
    doy = config._locale._week.doy;
    curWeek = weekOfYear(createLocal(), dow, doy);
    weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
    week = defaults(w.w, curWeek.week);
    if (w.d != null) {
      weekday = w.d;
      if (weekday < 0 || weekday > 6) {
        weekdayOverflow = true;
      }
    } else if (w.e != null) {
      weekday = w.e + dow;
      if (w.e < 0 || w.e > 6) {
        weekdayOverflow = true;
      }
    } else {
      weekday = dow;
    }
  }
  if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
    getParsingFlags(config)._overflowWeeks = true;
  } else if (weekdayOverflow != null) {
    getParsingFlags(config)._overflowWeekday = true;
  } else {
    temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
    config._a[YEAR] = temp.year;
    config._dayOfYear = temp.dayOfYear;
  }
}
hooks.ISO_8601 = function() {
};
hooks.RFC_2822 = function() {
};
function configFromStringAndFormat(config) {
  if (config._f === hooks.ISO_8601) {
    configFromISO(config);
    return;
  }
  if (config._f === hooks.RFC_2822) {
    configFromRFC2822(config);
    return;
  }
  config._a = [];
  getParsingFlags(config).empty = true;
  var string2 = "" + config._i, i2, parsedInput, tokens2, token2, skipped, stringLength = string2.length, totalParsedInputLength = 0, era;
  tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
  for (i2 = 0; i2 < tokens2.length; i2++) {
    token2 = tokens2[i2];
    parsedInput = (string2.match(getParseRegexForToken(token2, config)) || [])[0];
    if (parsedInput) {
      skipped = string2.substr(0, string2.indexOf(parsedInput));
      if (skipped.length > 0) {
        getParsingFlags(config).unusedInput.push(skipped);
      }
      string2 = string2.slice(string2.indexOf(parsedInput) + parsedInput.length);
      totalParsedInputLength += parsedInput.length;
    }
    if (formatTokenFunctions[token2]) {
      if (parsedInput) {
        getParsingFlags(config).empty = false;
      } else {
        getParsingFlags(config).unusedTokens.push(token2);
      }
      addTimeToArrayFromToken(token2, parsedInput, config);
    } else if (config._strict && !parsedInput) {
      getParsingFlags(config).unusedTokens.push(token2);
    }
  }
  getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
  if (string2.length > 0) {
    getParsingFlags(config).unusedInput.push(string2);
  }
  if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
    getParsingFlags(config).bigHour = void 0;
  }
  getParsingFlags(config).parsedDateParts = config._a.slice(0);
  getParsingFlags(config).meridiem = config._meridiem;
  config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
  era = getParsingFlags(config).era;
  if (era !== null) {
    config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
  }
  configFromArray(config);
  checkOverflow(config);
}
function meridiemFixWrap(locale2, hour, meridiem2) {
  var isPm;
  if (meridiem2 == null) {
    return hour;
  }
  if (locale2.meridiemHour != null) {
    return locale2.meridiemHour(hour, meridiem2);
  } else if (locale2.isPM != null) {
    isPm = locale2.isPM(meridiem2);
    if (isPm && hour < 12) {
      hour += 12;
    }
    if (!isPm && hour === 12) {
      hour = 0;
    }
    return hour;
  } else {
    return hour;
  }
}
function configFromStringAndArray(config) {
  var tempConfig, bestMoment, scoreToBeat, i2, currentScore, validFormatFound, bestFormatIsValid = false;
  if (config._f.length === 0) {
    getParsingFlags(config).invalidFormat = true;
    config._d = new Date(NaN);
    return;
  }
  for (i2 = 0; i2 < config._f.length; i2++) {
    currentScore = 0;
    validFormatFound = false;
    tempConfig = copyConfig({}, config);
    if (config._useUTC != null) {
      tempConfig._useUTC = config._useUTC;
    }
    tempConfig._f = config._f[i2];
    configFromStringAndFormat(tempConfig);
    if (isValid(tempConfig)) {
      validFormatFound = true;
    }
    currentScore += getParsingFlags(tempConfig).charsLeftOver;
    currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
    getParsingFlags(tempConfig).score = currentScore;
    if (!bestFormatIsValid) {
      if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
        if (validFormatFound) {
          bestFormatIsValid = true;
        }
      }
    } else {
      if (currentScore < scoreToBeat) {
        scoreToBeat = currentScore;
        bestMoment = tempConfig;
      }
    }
  }
  extend(config, bestMoment || tempConfig);
}
function configFromObject(config) {
  if (config._d) {
    return;
  }
  var i2 = normalizeObjectUnits(config._i), dayOrDate = i2.day === void 0 ? i2.date : i2.day;
  config._a = map([i2.year, i2.month, dayOrDate, i2.hour, i2.minute, i2.second, i2.millisecond], function(obj) {
    return obj && parseInt(obj, 10);
  });
  configFromArray(config);
}
function createFromConfig(config) {
  var res = new Moment(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    res.add(1, "d");
    res._nextDay = void 0;
  }
  return res;
}
function prepareConfig(config) {
  var input = config._i, format2 = config._f;
  config._locale = config._locale || getLocale(config._l);
  if (input === null || format2 === void 0 && input === "") {
    return createInvalid({ nullInput: true });
  }
  if (typeof input === "string") {
    config._i = input = config._locale.preparse(input);
  }
  if (isMoment(input)) {
    return new Moment(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format2)) {
    configFromStringAndArray(config);
  } else if (format2) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }
  if (!isValid(config)) {
    config._d = null;
  }
  return config;
}
function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === "string") {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function(obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}
function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
  var c = {};
  if (format2 === true || format2 === false) {
    strict = format2;
    format2 = void 0;
  }
  if (locale2 === true || locale2 === false) {
    strict = locale2;
    locale2 = void 0;
  }
  if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
    input = void 0;
  }
  c._isAMomentObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale2;
  c._i = input;
  c._f = format2;
  c._strict = strict;
  return createFromConfig(c);
}
function createLocal(input, format2, locale2, strict) {
  return createLocalOrUTC(input, format2, locale2, strict, false);
}
var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
  var other = createLocal.apply(null, arguments);
  if (this.isValid() && other.isValid()) {
    return other < this ? this : other;
  } else {
    return createInvalid();
  }
}), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
  var other = createLocal.apply(null, arguments);
  if (this.isValid() && other.isValid()) {
    return other > this ? this : other;
  } else {
    return createInvalid();
  }
});
function pickBy(fn, moments) {
  var res, i2;
  if (moments.length === 1 && isArray(moments[0])) {
    moments = moments[0];
  }
  if (!moments.length) {
    return createLocal();
  }
  res = moments[0];
  for (i2 = 1; i2 < moments.length; ++i2) {
    if (!moments[i2].isValid() || moments[i2][fn](res)) {
      res = moments[i2];
    }
  }
  return res;
}
function min() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isBefore", args);
}
function max() {
  var args = [].slice.call(arguments, 0);
  return pickBy("isAfter", args);
}
var now = function() {
  return Date.now ? Date.now() : +new Date();
};
var ordering = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function isDurationValid(m) {
  var key, unitHasDecimal = false, i2;
  for (key in m) {
    if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
      return false;
    }
  }
  for (i2 = 0; i2 < ordering.length; ++i2) {
    if (m[ordering[i2]]) {
      if (unitHasDecimal) {
        return false;
      }
      if (parseFloat(m[ordering[i2]]) !== toInt(m[ordering[i2]])) {
        unitHasDecimal = true;
      }
    }
  }
  return true;
}
function isValid$1() {
  return this._isValid;
}
function createInvalid$1() {
  return createDuration(NaN);
}
function Duration(duration) {
  var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
  this._isValid = isDurationValid(normalizedInput);
  this._milliseconds = +milliseconds2 + seconds2 * 1e3 + minutes2 * 6e4 + hours2 * 1e3 * 60 * 60;
  this._days = +days2 + weeks2 * 7;
  this._months = +months2 + quarters * 3 + years2 * 12;
  this._data = {};
  this._locale = getLocale();
  this._bubble();
}
function isDuration(obj) {
  return obj instanceof Duration;
}
function absRound(number2) {
  if (number2 < 0) {
    return Math.round(-1 * number2) * -1;
  } else {
    return Math.round(number2);
  }
}
function compareArrays(array1, array2, dontConvert) {
  var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i2;
  for (i2 = 0; i2 < len; i2++) {
    if (dontConvert && array1[i2] !== array2[i2] || !dontConvert && toInt(array1[i2]) !== toInt(array2[i2])) {
      diffs++;
    }
  }
  return diffs + lengthDiff;
}
function offset(token2, separator) {
  addFormatToken(token2, 0, 0, function() {
    var offset2 = this.utcOffset(), sign2 = "+";
    if (offset2 < 0) {
      offset2 = -offset2;
      sign2 = "-";
    }
    return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
  });
}
offset("Z", ":");
offset("ZZ", "");
addRegexToken("Z", matchShortOffset);
addRegexToken("ZZ", matchShortOffset);
addParseToken(["Z", "ZZ"], function(input, array2, config) {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string2) {
  var matches = (string2 || "").match(matcher), chunk, parts, minutes2;
  if (matches === null) {
    return null;
  }
  chunk = matches[matches.length - 1] || [];
  parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  minutes2 = +(parts[1] * 60) + toInt(parts[2]);
  return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
}
function cloneWithOffset(input, model) {
  var res, diff2;
  if (model._isUTC) {
    res = model.clone();
    diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    res._d.setTime(res._d.valueOf() + diff2);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}
function getDateOffset(m) {
  return -Math.round(m._d.getTimezoneOffset());
}
hooks.updateOffset = function() {
};
function getSetOffset(input, keepLocalTime, keepMinutes) {
  var offset2 = this._offset || 0, localAdjust;
  if (!this.isValid()) {
    return input != null ? this : NaN;
  }
  if (input != null) {
    if (typeof input === "string") {
      input = offsetFromString(matchShortOffset, input);
      if (input === null) {
        return this;
      }
    } else if (Math.abs(input) < 16 && !keepMinutes) {
      input = input * 60;
    }
    if (!this._isUTC && keepLocalTime) {
      localAdjust = getDateOffset(this);
    }
    this._offset = input;
    this._isUTC = true;
    if (localAdjust != null) {
      this.add(localAdjust, "m");
    }
    if (offset2 !== input) {
      if (!keepLocalTime || this._changeInProgress) {
        addSubtract(this, createDuration(input - offset2, "m"), 1, false);
      } else if (!this._changeInProgress) {
        this._changeInProgress = true;
        hooks.updateOffset(this, true);
        this._changeInProgress = null;
      }
    }
    return this;
  } else {
    return this._isUTC ? offset2 : getDateOffset(this);
  }
}
function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== "string") {
      input = -input;
    }
    this.utcOffset(input, keepLocalTime);
    return this;
  } else {
    return -this.utcOffset();
  }
}
function setOffsetToUTC(keepLocalTime) {
  return this.utcOffset(0, keepLocalTime);
}
function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;
    if (keepLocalTime) {
      this.subtract(getDateOffset(this), "m");
    }
  }
  return this;
}
function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === "string") {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    } else {
      this.utcOffset(0, true);
    }
  }
  return this;
}
function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;
  return (this.utcOffset() - input) % 60 === 0;
}
function isDaylightSavingTime() {
  return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }
  var c = {}, other;
  copyConfig(c, this);
  c = prepareConfig(c);
  if (c._a) {
    other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }
  return this._isDSTShifted;
}
function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}
function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}
function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
  var duration = input, match5 = null, sign2, ret, diffRes;
  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      duration[key] = +input;
    } else {
      duration.milliseconds = +input;
    }
  } else if (match5 = aspNetRegex.exec(input)) {
    sign2 = match5[1] === "-" ? -1 : 1;
    duration = {
      y: 0,
      d: toInt(match5[DATE]) * sign2,
      h: toInt(match5[HOUR]) * sign2,
      m: toInt(match5[MINUTE]) * sign2,
      s: toInt(match5[SECOND]) * sign2,
      ms: toInt(absRound(match5[MILLISECOND] * 1e3)) * sign2
    };
  } else if (match5 = isoRegex.exec(input)) {
    sign2 = match5[1] === "-" ? -1 : 1;
    duration = {
      y: parseIso(match5[2], sign2),
      M: parseIso(match5[3], sign2),
      w: parseIso(match5[4], sign2),
      d: parseIso(match5[5], sign2),
      h: parseIso(match5[6], sign2),
      m: parseIso(match5[7], sign2),
      s: parseIso(match5[8], sign2)
    };
  } else if (duration == null) {
    duration = {};
  } else if (typeof duration === "object" && ("from" in duration || "to" in duration)) {
    diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
    duration = {};
    duration.ms = diffRes.milliseconds;
    duration.M = diffRes.months;
  }
  ret = new Duration(duration);
  if (isDuration(input) && hasOwnProp(input, "_locale")) {
    ret._locale = input._locale;
  }
  if (isDuration(input) && hasOwnProp(input, "_isValid")) {
    ret._isValid = input._isValid;
  }
  return ret;
}
createDuration.fn = Duration.prototype;
createDuration.invalid = createInvalid$1;
function parseIso(inp, sign2) {
  var res = inp && parseFloat(inp.replace(",", "."));
  return (isNaN(res) ? 0 : res) * sign2;
}
function positiveMomentsDifference(base, other) {
  var res = {};
  res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
  if (base.clone().add(res.months, "M").isAfter(other)) {
    --res.months;
  }
  res.milliseconds = +other - +base.clone().add(res.months, "M");
  return res;
}
function momentsDifference(base, other) {
  var res;
  if (!(base.isValid() && other.isValid())) {
    return { milliseconds: 0, months: 0 };
  }
  other = cloneWithOffset(other, base);
  if (base.isBefore(other)) {
    res = positiveMomentsDifference(base, other);
  } else {
    res = positiveMomentsDifference(other, base);
    res.milliseconds = -res.milliseconds;
    res.months = -res.months;
  }
  return res;
}
function createAdder(direction, name2) {
  return function(val, period) {
    var dur, tmp;
    if (period !== null && !isNaN(+period)) {
      deprecateSimple(name2, "moment()." + name2 + "(period, number) is deprecated. Please use moment()." + name2 + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
      tmp = val;
      val = period;
      period = tmp;
    }
    dur = createDuration(val, period);
    addSubtract(this, dur, direction);
    return this;
  };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
  var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
  if (!mom.isValid()) {
    return;
  }
  updateOffset = updateOffset == null ? true : updateOffset;
  if (months2) {
    setMonth(mom, get(mom, "Month") + months2 * isAdding);
  }
  if (days2) {
    set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
  }
  if (milliseconds2) {
    mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
  }
  if (updateOffset) {
    hooks.updateOffset(mom, days2 || months2);
  }
}
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(input) {
  return typeof input === "string" || input instanceof String;
}
function isMomentInput(input) {
  return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === void 0;
}
function isMomentInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "years",
    "year",
    "y",
    "months",
    "month",
    "M",
    "days",
    "day",
    "d",
    "dates",
    "date",
    "D",
    "hours",
    "hour",
    "h",
    "minutes",
    "minute",
    "m",
    "seconds",
    "second",
    "s",
    "milliseconds",
    "millisecond",
    "ms"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function isNumberOrStringArray(input) {
  var arrayTest = isArray(input), dataTypeTest = false;
  if (arrayTest) {
    dataTypeTest = input.filter(function(item) {
      return !isNumber(item) && isString(input);
    }).length === 0;
  }
  return arrayTest && dataTypeTest;
}
function isCalendarSpec(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input), propertyTest = false, properties = [
    "sameDay",
    "nextDay",
    "lastDay",
    "nextWeek",
    "lastWeek",
    "sameElse"
  ], i2, property;
  for (i2 = 0; i2 < properties.length; i2 += 1) {
    property = properties[i2];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }
  return objectTest && propertyTest;
}
function getCalendarFormat(myMoment, now2) {
  var diff2 = myMoment.diff(now2, "days", true);
  return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
}
function calendar$1(time, formats) {
  if (arguments.length === 1) {
    if (!arguments[0]) {
      time = void 0;
      formats = void 0;
    } else if (isMomentInput(arguments[0])) {
      time = arguments[0];
      formats = void 0;
    } else if (isCalendarSpec(arguments[0])) {
      formats = arguments[0];
      time = void 0;
    }
  }
  var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
  return this.format(output || this.localeData().calendar(format2, this, createLocal(now2)));
}
function clone() {
  return new Moment(this);
}
function isAfter(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() > localInput.valueOf();
  } else {
    return localInput.valueOf() < this.clone().startOf(units).valueOf();
  }
}
function isBefore(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input);
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() < localInput.valueOf();
  } else {
    return this.clone().endOf(units).valueOf() < localInput.valueOf();
  }
}
function isBetween(from2, to2, units, inclusivity) {
  var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
  if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
    return false;
  }
  inclusivity = inclusivity || "()";
  return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
}
function isSame(input, units) {
  var localInput = isMoment(input) ? input : createLocal(input), inputMs;
  if (!(this.isValid() && localInput.isValid())) {
    return false;
  }
  units = normalizeUnits(units) || "millisecond";
  if (units === "millisecond") {
    return this.valueOf() === localInput.valueOf();
  } else {
    inputMs = localInput.valueOf();
    return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
  }
}
function isSameOrAfter(input, units) {
  return this.isSame(input, units) || this.isAfter(input, units);
}
function isSameOrBefore(input, units) {
  return this.isSame(input, units) || this.isBefore(input, units);
}
function diff(input, units, asFloat) {
  var that, zoneDelta, output;
  if (!this.isValid()) {
    return NaN;
  }
  that = cloneWithOffset(input, this);
  if (!that.isValid()) {
    return NaN;
  }
  zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
  units = normalizeUnits(units);
  switch (units) {
    case "year":
      output = monthDiff(this, that) / 12;
      break;
    case "month":
      output = monthDiff(this, that);
      break;
    case "quarter":
      output = monthDiff(this, that) / 3;
      break;
    case "second":
      output = (this - that) / 1e3;
      break;
    case "minute":
      output = (this - that) / 6e4;
      break;
    case "hour":
      output = (this - that) / 36e5;
      break;
    case "day":
      output = (this - that - zoneDelta) / 864e5;
      break;
    case "week":
      output = (this - that - zoneDelta) / 6048e5;
      break;
    default:
      output = this - that;
  }
  return asFloat ? output : absFloor(output);
}
function monthDiff(a, b) {
  if (a.date() < b.date()) {
    return -monthDiff(b, a);
  }
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
  if (b - anchor < 0) {
    anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
    adjust = (b - anchor) / (anchor - anchor2);
  } else {
    anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
    adjust = (b - anchor) / (anchor2 - anchor);
  }
  return -(wholeMonthDiff + adjust) || 0;
}
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function toString() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function toISOString(keepOffset) {
  if (!this.isValid()) {
    return null;
  }
  var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
  if (m.year() < 0 || m.year() > 9999) {
    return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }
  if (isFunction(Date.prototype.toISOString)) {
    if (utc) {
      return this.toDate().toISOString();
    } else {
      return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", formatMoment(m, "Z"));
    }
  }
  return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function inspect() {
  if (!this.isValid()) {
    return "moment.invalid(/* " + this._i + " */)";
  }
  var func = "moment", zone = "", prefix, year, datetime, suffix;
  if (!this.isLocal()) {
    func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
    zone = "Z";
  }
  prefix = "[" + func + '("]';
  year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
  datetime = "-MM-DD[T]HH:mm:ss.SSS";
  suffix = zone + '[")]';
  return this.format(prefix + year + datetime + suffix);
}
function format(inputString) {
  if (!inputString) {
    inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
  }
  var output = formatMoment(this, inputString);
  return this.localeData().postformat(output);
}
function from(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function fromNow(withoutSuffix) {
  return this.from(createLocal(), withoutSuffix);
}
function to(time, withoutSuffix) {
  if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
    return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
  } else {
    return this.localeData().invalidDate();
  }
}
function toNow(withoutSuffix) {
  return this.to(createLocal(), withoutSuffix);
}
function locale(key) {
  var newLocaleData;
  if (key === void 0) {
    return this._locale._abbr;
  } else {
    newLocaleData = getLocale(key);
    if (newLocaleData != null) {
      this._locale = newLocaleData;
    }
    return this;
  }
}
var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
  if (key === void 0) {
    return this.localeData();
  } else {
    return this.locale(key);
  }
});
function localeData() {
  return this._locale;
}
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
function mod$1(dividend, divisor) {
  return (dividend % divisor + divisor) % divisor;
}
function localStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return new Date(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return new Date(y, m, d).valueOf();
  }
}
function utcStartOfDate(y, m, d) {
  if (y < 100 && y >= 0) {
    return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
  } else {
    return Date.UTC(y, m, d);
  }
}
function startOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year(), 0, 1);
      break;
    case "quarter":
      time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
      break;
    case "month":
      time = startOfDate(this.year(), this.month(), 1);
      break;
    case "week":
      time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
      break;
    case "isoWeek":
      time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date());
      break;
    case "hour":
      time = this._d.valueOf();
      time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
      break;
    case "minute":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_MINUTE);
      break;
    case "second":
      time = this._d.valueOf();
      time -= mod$1(time, MS_PER_SECOND);
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function endOf(units) {
  var time, startOfDate;
  units = normalizeUnits(units);
  if (units === void 0 || units === "millisecond" || !this.isValid()) {
    return this;
  }
  startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
  switch (units) {
    case "year":
      time = startOfDate(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
      break;
    case "month":
      time = startOfDate(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
      break;
    case "isoWeek":
      time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
      break;
    case "day":
    case "date":
      time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      time = this._d.valueOf();
      time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
      break;
    case "minute":
      time = this._d.valueOf();
      time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
      break;
    case "second":
      time = this._d.valueOf();
      time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
      break;
  }
  this._d.setTime(time);
  hooks.updateOffset(this, true);
  return this;
}
function valueOf() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function unix() {
  return Math.floor(this.valueOf() / 1e3);
}
function toDate() {
  return new Date(this.valueOf());
}
function toArray() {
  var m = this;
  return [
    m.year(),
    m.month(),
    m.date(),
    m.hour(),
    m.minute(),
    m.second(),
    m.millisecond()
  ];
}
function toObject() {
  var m = this;
  return {
    years: m.year(),
    months: m.month(),
    date: m.date(),
    hours: m.hours(),
    minutes: m.minutes(),
    seconds: m.seconds(),
    milliseconds: m.milliseconds()
  };
}
function toJSON() {
  return this.isValid() ? this.toISOString() : null;
}
function isValid$2() {
  return isValid(this);
}
function parsingFlags() {
  return extend({}, getParsingFlags(this));
}
function invalidAt() {
  return getParsingFlags(this).overflow;
}
function creationData() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict
  };
}
addFormatToken("N", 0, 0, "eraAbbr");
addFormatToken("NN", 0, 0, "eraAbbr");
addFormatToken("NNN", 0, 0, "eraAbbr");
addFormatToken("NNNN", 0, 0, "eraName");
addFormatToken("NNNNN", 0, 0, "eraNarrow");
addFormatToken("y", ["y", 1], "yo", "eraYear");
addFormatToken("y", ["yy", 2], 0, "eraYear");
addFormatToken("y", ["yyy", 3], 0, "eraYear");
addFormatToken("y", ["yyyy", 4], 0, "eraYear");
addRegexToken("N", matchEraAbbr);
addRegexToken("NN", matchEraAbbr);
addRegexToken("NNN", matchEraAbbr);
addRegexToken("NNNN", matchEraName);
addRegexToken("NNNNN", matchEraNarrow);
addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array2, config, token2) {
  var era = config._locale.erasParse(input, token2, config._strict);
  if (era) {
    getParsingFlags(config).era = era;
  } else {
    getParsingFlags(config).invalidEra = input;
  }
});
addRegexToken("y", matchUnsigned);
addRegexToken("yy", matchUnsigned);
addRegexToken("yyy", matchUnsigned);
addRegexToken("yyyy", matchUnsigned);
addRegexToken("yo", matchEraYearOrdinal);
addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
addParseToken(["yo"], function(input, array2, config, token2) {
  var match5;
  if (config._locale._eraYearOrdinalRegex) {
    match5 = input.match(config._locale._eraYearOrdinalRegex);
  }
  if (config._locale.eraYearOrdinalParse) {
    array2[YEAR] = config._locale.eraYearOrdinalParse(input, match5);
  } else {
    array2[YEAR] = parseInt(input, 10);
  }
});
function localeEras(m, format2) {
  var i2, l, date, eras = this._eras || getLocale("en")._eras;
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    switch (typeof eras[i2].since) {
      case "string":
        date = hooks(eras[i2].since).startOf("day");
        eras[i2].since = date.valueOf();
        break;
    }
    switch (typeof eras[i2].until) {
      case "undefined":
        eras[i2].until = Infinity;
        break;
      case "string":
        date = hooks(eras[i2].until).startOf("day").valueOf();
        eras[i2].until = date.valueOf();
        break;
    }
  }
  return eras;
}
function localeErasParse(eraName, format2, strict) {
  var i2, l, eras = this.eras(), name2, abbr, narrow;
  eraName = eraName.toUpperCase();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    name2 = eras[i2].name.toUpperCase();
    abbr = eras[i2].abbr.toUpperCase();
    narrow = eras[i2].narrow.toUpperCase();
    if (strict) {
      switch (format2) {
        case "N":
        case "NN":
        case "NNN":
          if (abbr === eraName) {
            return eras[i2];
          }
          break;
        case "NNNN":
          if (name2 === eraName) {
            return eras[i2];
          }
          break;
        case "NNNNN":
          if (narrow === eraName) {
            return eras[i2];
          }
          break;
      }
    } else if ([name2, abbr, narrow].indexOf(eraName) >= 0) {
      return eras[i2];
    }
  }
}
function localeErasConvertYear(era, year) {
  var dir = era.since <= era.until ? 1 : -1;
  if (year === void 0) {
    return hooks(era.since).year();
  } else {
    return hooks(era.since).year() + (year - era.offset) * dir;
  }
}
function getEraName() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].name;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].name;
    }
  }
  return "";
}
function getEraNarrow() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].narrow;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].narrow;
    }
  }
  return "";
}
function getEraAbbr() {
  var i2, l, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until) {
      return eras[i2].abbr;
    }
    if (eras[i2].until <= val && val <= eras[i2].since) {
      return eras[i2].abbr;
    }
  }
  return "";
}
function getEraYear() {
  var i2, l, dir, val, eras = this.localeData().eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    dir = eras[i2].since <= eras[i2].until ? 1 : -1;
    val = this.clone().startOf("day").valueOf();
    if (eras[i2].since <= val && val <= eras[i2].until || eras[i2].until <= val && val <= eras[i2].since) {
      return (this.year() - hooks(eras[i2].since).year()) * dir + eras[i2].offset;
    }
  }
  return this.year();
}
function erasNameRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNameRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNameRegex : this._erasRegex;
}
function erasAbbrRegex(isStrict) {
  if (!hasOwnProp(this, "_erasAbbrRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasAbbrRegex : this._erasRegex;
}
function erasNarrowRegex(isStrict) {
  if (!hasOwnProp(this, "_erasNarrowRegex")) {
    computeErasParse.call(this);
  }
  return isStrict ? this._erasNarrowRegex : this._erasRegex;
}
function matchEraAbbr(isStrict, locale2) {
  return locale2.erasAbbrRegex(isStrict);
}
function matchEraName(isStrict, locale2) {
  return locale2.erasNameRegex(isStrict);
}
function matchEraNarrow(isStrict, locale2) {
  return locale2.erasNarrowRegex(isStrict);
}
function matchEraYearOrdinal(isStrict, locale2) {
  return locale2._eraYearOrdinalRegex || matchUnsigned;
}
function computeErasParse() {
  var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i2, l, eras = this.eras();
  for (i2 = 0, l = eras.length; i2 < l; ++i2) {
    namePieces.push(regexEscape(eras[i2].name));
    abbrPieces.push(regexEscape(eras[i2].abbr));
    narrowPieces.push(regexEscape(eras[i2].narrow));
    mixedPieces.push(regexEscape(eras[i2].name));
    mixedPieces.push(regexEscape(eras[i2].abbr));
    mixedPieces.push(regexEscape(eras[i2].narrow));
  }
  this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
  this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
  this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
  this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
}
addFormatToken(0, ["gg", 2], 0, function() {
  return this.weekYear() % 100;
});
addFormatToken(0, ["GG", 2], 0, function() {
  return this.isoWeekYear() % 100;
});
function addWeekYearFormatToken(token2, getter) {
  addFormatToken(0, [token2, token2.length], 0, getter);
}
addWeekYearFormatToken("gggg", "weekYear");
addWeekYearFormatToken("ggggg", "weekYear");
addWeekYearFormatToken("GGGG", "isoWeekYear");
addWeekYearFormatToken("GGGGG", "isoWeekYear");
addUnitAlias("weekYear", "gg");
addUnitAlias("isoWeekYear", "GG");
addUnitPriority("weekYear", 1);
addUnitPriority("isoWeekYear", 1);
addRegexToken("G", matchSigned);
addRegexToken("g", matchSigned);
addRegexToken("GG", match1to2, match2);
addRegexToken("gg", match1to2, match2);
addRegexToken("GGGG", match1to4, match4);
addRegexToken("gggg", match1to4, match4);
addRegexToken("GGGGG", match1to6, match6);
addRegexToken("ggggg", match1to6, match6);
addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
  week[token2.substr(0, 2)] = toInt(input);
});
addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
  week[token2] = hooks.parseTwoDigitYear(input);
});
function getSetWeekYear(input) {
  return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}
function getSetISOWeekYear(input) {
  return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function getISOWeeksInYear() {
  return weeksInYear(this.year(), 1, 4);
}
function getISOWeeksInISOWeekYear() {
  return weeksInYear(this.isoWeekYear(), 1, 4);
}
function getWeeksInYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
}
function getWeeksInWeekYear() {
  var weekInfo = this.localeData()._week;
  return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
}
function getSetWeekYearHelper(input, week, weekday, dow, doy) {
  var weeksTarget;
  if (input == null) {
    return weekOfYear(this, dow, doy).year;
  } else {
    weeksTarget = weeksInYear(input, dow, doy);
    if (week > weeksTarget) {
      week = weeksTarget;
    }
    return setWeekAll.call(this, input, week, weekday, dow, doy);
  }
}
function setWeekAll(weekYear, week, weekday, dow, doy) {
  var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
  this.year(date.getUTCFullYear());
  this.month(date.getUTCMonth());
  this.date(date.getUTCDate());
  return this;
}
addFormatToken("Q", 0, "Qo", "quarter");
addUnitAlias("quarter", "Q");
addUnitPriority("quarter", 7);
addRegexToken("Q", match1);
addParseToken("Q", function(input, array2) {
  array2[MONTH] = (toInt(input) - 1) * 3;
});
function getSetQuarter(input) {
  return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
addFormatToken("D", ["DD", 2], "Do", "date");
addUnitAlias("date", "D");
addUnitPriority("date", 9);
addRegexToken("D", match1to2);
addRegexToken("DD", match1to2, match2);
addRegexToken("Do", function(isStrict, locale2) {
  return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
});
addParseToken(["D", "DD"], DATE);
addParseToken("Do", function(input, array2) {
  array2[DATE] = toInt(input.match(match1to2)[0]);
});
var getSetDayOfMonth = makeGetSet("Date", true);
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
addUnitAlias("dayOfYear", "DDD");
addUnitPriority("dayOfYear", 4);
addRegexToken("DDD", match1to3);
addRegexToken("DDDD", match3);
addParseToken(["DDD", "DDDD"], function(input, array2, config) {
  config._dayOfYear = toInt(input);
});
function getSetDayOfYear(input) {
  var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
  return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
}
addFormatToken("m", ["mm", 2], 0, "minute");
addUnitAlias("minute", "m");
addUnitPriority("minute", 14);
addRegexToken("m", match1to2);
addRegexToken("mm", match1to2, match2);
addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", false);
addFormatToken("s", ["ss", 2], 0, "second");
addUnitAlias("second", "s");
addUnitPriority("second", 15);
addRegexToken("s", match1to2);
addRegexToken("ss", match1to2, match2);
addParseToken(["s", "ss"], SECOND);
var getSetSecond = makeGetSet("Seconds", false);
addFormatToken("S", 0, 0, function() {
  return ~~(this.millisecond() / 100);
});
addFormatToken(0, ["SS", 2], 0, function() {
  return ~~(this.millisecond() / 10);
});
addFormatToken(0, ["SSS", 3], 0, "millisecond");
addFormatToken(0, ["SSSS", 4], 0, function() {
  return this.millisecond() * 10;
});
addFormatToken(0, ["SSSSS", 5], 0, function() {
  return this.millisecond() * 100;
});
addFormatToken(0, ["SSSSSS", 6], 0, function() {
  return this.millisecond() * 1e3;
});
addFormatToken(0, ["SSSSSSS", 7], 0, function() {
  return this.millisecond() * 1e4;
});
addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
  return this.millisecond() * 1e5;
});
addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
  return this.millisecond() * 1e6;
});
addUnitAlias("millisecond", "ms");
addUnitPriority("millisecond", 16);
addRegexToken("S", match1to3, match1);
addRegexToken("SS", match1to3, match2);
addRegexToken("SSS", match1to3, match3);
var token, getSetMillisecond;
for (token = "SSSS"; token.length <= 9; token += "S") {
  addRegexToken(token, matchUnsigned);
}
function parseMs(input, array2) {
  array2[MILLISECOND] = toInt(("0." + input) * 1e3);
}
for (token = "S"; token.length <= 9; token += "S") {
  addParseToken(token, parseMs);
}
getSetMillisecond = makeGetSet("Milliseconds", false);
addFormatToken("z", 0, 0, "zoneAbbr");
addFormatToken("zz", 0, 0, "zoneName");
function getZoneAbbr() {
  return this._isUTC ? "UTC" : "";
}
function getZoneName() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var proto = Moment.prototype;
proto.add = add;
proto.calendar = calendar$1;
proto.clone = clone;
proto.diff = diff;
proto.endOf = endOf;
proto.format = format;
proto.from = from;
proto.fromNow = fromNow;
proto.to = to;
proto.toNow = toNow;
proto.get = stringGet;
proto.invalidAt = invalidAt;
proto.isAfter = isAfter;
proto.isBefore = isBefore;
proto.isBetween = isBetween;
proto.isSame = isSame;
proto.isSameOrAfter = isSameOrAfter;
proto.isSameOrBefore = isSameOrBefore;
proto.isValid = isValid$2;
proto.lang = lang;
proto.locale = locale;
proto.localeData = localeData;
proto.max = prototypeMax;
proto.min = prototypeMin;
proto.parsingFlags = parsingFlags;
proto.set = stringSet;
proto.startOf = startOf;
proto.subtract = subtract;
proto.toArray = toArray;
proto.toObject = toObject;
proto.toDate = toDate;
proto.toISOString = toISOString;
proto.inspect = inspect;
if (typeof Symbol !== "undefined" && Symbol.for != null) {
  proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
    return "Moment<" + this.format() + ">";
  };
}
proto.toJSON = toJSON;
proto.toString = toString;
proto.unix = unix;
proto.valueOf = valueOf;
proto.creationData = creationData;
proto.eraName = getEraName;
proto.eraNarrow = getEraNarrow;
proto.eraAbbr = getEraAbbr;
proto.eraYear = getEraYear;
proto.year = getSetYear;
proto.isLeapYear = getIsLeapYear;
proto.weekYear = getSetWeekYear;
proto.isoWeekYear = getSetISOWeekYear;
proto.quarter = proto.quarters = getSetQuarter;
proto.month = getSetMonth;
proto.daysInMonth = getDaysInMonth;
proto.week = proto.weeks = getSetWeek;
proto.isoWeek = proto.isoWeeks = getSetISOWeek;
proto.weeksInYear = getWeeksInYear;
proto.weeksInWeekYear = getWeeksInWeekYear;
proto.isoWeeksInYear = getISOWeeksInYear;
proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
proto.date = getSetDayOfMonth;
proto.day = proto.days = getSetDayOfWeek;
proto.weekday = getSetLocaleDayOfWeek;
proto.isoWeekday = getSetISODayOfWeek;
proto.dayOfYear = getSetDayOfYear;
proto.hour = proto.hours = getSetHour;
proto.minute = proto.minutes = getSetMinute;
proto.second = proto.seconds = getSetSecond;
proto.millisecond = proto.milliseconds = getSetMillisecond;
proto.utcOffset = getSetOffset;
proto.utc = setOffsetToUTC;
proto.local = setOffsetToLocal;
proto.parseZone = setOffsetToParsedOffset;
proto.hasAlignedHourOffset = hasAlignedHourOffset;
proto.isDST = isDaylightSavingTime;
proto.isLocal = isLocal;
proto.isUtcOffset = isUtcOffset;
proto.isUtc = isUtc;
proto.isUTC = isUtc;
proto.zoneAbbr = getZoneAbbr;
proto.zoneName = getZoneName;
proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
function createUnix(input) {
  return createLocal(input * 1e3);
}
function createInZone() {
  return createLocal.apply(null, arguments).parseZone();
}
function preParsePostFormat(string2) {
  return string2;
}
var proto$1 = Locale.prototype;
proto$1.calendar = calendar;
proto$1.longDateFormat = longDateFormat;
proto$1.invalidDate = invalidDate;
proto$1.ordinal = ordinal;
proto$1.preparse = preParsePostFormat;
proto$1.postformat = preParsePostFormat;
proto$1.relativeTime = relativeTime;
proto$1.pastFuture = pastFuture;
proto$1.set = set;
proto$1.eras = localeEras;
proto$1.erasParse = localeErasParse;
proto$1.erasConvertYear = localeErasConvertYear;
proto$1.erasAbbrRegex = erasAbbrRegex;
proto$1.erasNameRegex = erasNameRegex;
proto$1.erasNarrowRegex = erasNarrowRegex;
proto$1.months = localeMonths;
proto$1.monthsShort = localeMonthsShort;
proto$1.monthsParse = localeMonthsParse;
proto$1.monthsRegex = monthsRegex;
proto$1.monthsShortRegex = monthsShortRegex;
proto$1.week = localeWeek;
proto$1.firstDayOfYear = localeFirstDayOfYear;
proto$1.firstDayOfWeek = localeFirstDayOfWeek;
proto$1.weekdays = localeWeekdays;
proto$1.weekdaysMin = localeWeekdaysMin;
proto$1.weekdaysShort = localeWeekdaysShort;
proto$1.weekdaysParse = localeWeekdaysParse;
proto$1.weekdaysRegex = weekdaysRegex;
proto$1.weekdaysShortRegex = weekdaysShortRegex;
proto$1.weekdaysMinRegex = weekdaysMinRegex;
proto$1.isPM = localeIsPM;
proto$1.meridiem = localeMeridiem;
function get$1(format2, index, field, setter) {
  var locale2 = getLocale(), utc = createUTC().set(setter, index);
  return locale2[field](utc, format2);
}
function listMonthsImpl(format2, index, field) {
  if (isNumber(format2)) {
    index = format2;
    format2 = void 0;
  }
  format2 = format2 || "";
  if (index != null) {
    return get$1(format2, index, field, "month");
  }
  var i2, out = [];
  for (i2 = 0; i2 < 12; i2++) {
    out[i2] = get$1(format2, i2, field, "month");
  }
  return out;
}
function listWeekdaysImpl(localeSorted, format2, index, field) {
  if (typeof localeSorted === "boolean") {
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  } else {
    format2 = localeSorted;
    index = format2;
    localeSorted = false;
    if (isNumber(format2)) {
      index = format2;
      format2 = void 0;
    }
    format2 = format2 || "";
  }
  var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i2, out = [];
  if (index != null) {
    return get$1(format2, (index + shift) % 7, field, "day");
  }
  for (i2 = 0; i2 < 7; i2++) {
    out[i2] = get$1(format2, (i2 + shift) % 7, field, "day");
  }
  return out;
}
function listMonths(format2, index) {
  return listMonthsImpl(format2, index, "months");
}
function listMonthsShort(format2, index) {
  return listMonthsImpl(format2, index, "monthsShort");
}
function listWeekdays(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
}
function listWeekdaysShort(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
}
function listWeekdaysMin(localeSorted, format2, index) {
  return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
}
getSetGlobalLocale("en", {
  eras: [
    {
      since: "0001-01-01",
      until: Infinity,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD"
    },
    {
      since: "0000-12-31",
      until: -Infinity,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC"
    }
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function(number2) {
    var b = number2 % 10, output = toInt(number2 % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
    return number2 + output;
  }
});
hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
var mathAbs = Math.abs;
function abs() {
  var data = this._data;
  this._milliseconds = mathAbs(this._milliseconds);
  this._days = mathAbs(this._days);
  this._months = mathAbs(this._months);
  data.milliseconds = mathAbs(data.milliseconds);
  data.seconds = mathAbs(data.seconds);
  data.minutes = mathAbs(data.minutes);
  data.hours = mathAbs(data.hours);
  data.months = mathAbs(data.months);
  data.years = mathAbs(data.years);
  return this;
}
function addSubtract$1(duration, input, value, direction) {
  var other = createDuration(input, value);
  duration._milliseconds += direction * other._milliseconds;
  duration._days += direction * other._days;
  duration._months += direction * other._months;
  return duration._bubble();
}
function add$1(input, value) {
  return addSubtract$1(this, input, value, 1);
}
function subtract$1(input, value) {
  return addSubtract$1(this, input, value, -1);
}
function absCeil(number2) {
  if (number2 < 0) {
    return Math.floor(number2);
  } else {
    return Math.ceil(number2);
  }
}
function bubble() {
  var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
  if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
    milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
    days2 = 0;
    months2 = 0;
  }
  data.milliseconds = milliseconds2 % 1e3;
  seconds2 = absFloor(milliseconds2 / 1e3);
  data.seconds = seconds2 % 60;
  minutes2 = absFloor(seconds2 / 60);
  data.minutes = minutes2 % 60;
  hours2 = absFloor(minutes2 / 60);
  data.hours = hours2 % 24;
  days2 += absFloor(hours2 / 24);
  monthsFromDays = absFloor(daysToMonths(days2));
  months2 += monthsFromDays;
  days2 -= absCeil(monthsToDays(monthsFromDays));
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  data.days = days2;
  data.months = months2;
  data.years = years2;
  return this;
}
function daysToMonths(days2) {
  return days2 * 4800 / 146097;
}
function monthsToDays(months2) {
  return months2 * 146097 / 4800;
}
function as(units) {
  if (!this.isValid()) {
    return NaN;
  }
  var days2, months2, milliseconds2 = this._milliseconds;
  units = normalizeUnits(units);
  if (units === "month" || units === "quarter" || units === "year") {
    days2 = this._days + milliseconds2 / 864e5;
    months2 = this._months + daysToMonths(days2);
    switch (units) {
      case "month":
        return months2;
      case "quarter":
        return months2 / 3;
      case "year":
        return months2 / 12;
    }
  } else {
    days2 = this._days + Math.round(monthsToDays(this._months));
    switch (units) {
      case "week":
        return days2 / 7 + milliseconds2 / 6048e5;
      case "day":
        return days2 + milliseconds2 / 864e5;
      case "hour":
        return days2 * 24 + milliseconds2 / 36e5;
      case "minute":
        return days2 * 1440 + milliseconds2 / 6e4;
      case "second":
        return days2 * 86400 + milliseconds2 / 1e3;
      case "millisecond":
        return Math.floor(days2 * 864e5) + milliseconds2;
      default:
        throw new Error("Unknown unit " + units);
    }
  }
}
function valueOf$1() {
  if (!this.isValid()) {
    return NaN;
  }
  return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
}
function makeAs(alias) {
  return function() {
    return this.as(alias);
  };
}
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() {
  return createDuration(this);
}
function get$2(units) {
  units = normalizeUnits(units);
  return this.isValid() ? this[units + "s"]() : NaN;
}
function makeGetter(name2) {
  return function() {
    return this.isValid() ? this._data[name2] : NaN;
  };
}
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() {
  return absFloor(this.days() / 7);
}
var round = Math.round, thresholds = {
  ss: 44,
  s: 45,
  m: 45,
  h: 22,
  d: 26,
  w: null,
  M: 11
};
function substituteTimeAgo(string2, number2, withoutSuffix, isFuture, locale2) {
  return locale2.relativeTime(number2 || 1, !!withoutSuffix, string2, isFuture);
}
function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
  var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
  if (thresholds2.w != null) {
    a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
  }
  a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
  a[2] = withoutSuffix;
  a[3] = +posNegDuration > 0;
  a[4] = locale2;
  return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeRounding(roundingFunction) {
  if (roundingFunction === void 0) {
    return round;
  }
  if (typeof roundingFunction === "function") {
    round = roundingFunction;
    return true;
  }
  return false;
}
function getSetRelativeTimeThreshold(threshold, limit) {
  if (thresholds[threshold] === void 0) {
    return false;
  }
  if (limit === void 0) {
    return thresholds[threshold];
  }
  thresholds[threshold] = limit;
  if (threshold === "s") {
    thresholds.ss = limit - 1;
  }
  return true;
}
function humanize(argWithSuffix, argThresholds) {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var withSuffix = false, th = thresholds, locale2, output;
  if (typeof argWithSuffix === "object") {
    argThresholds = argWithSuffix;
    argWithSuffix = false;
  }
  if (typeof argWithSuffix === "boolean") {
    withSuffix = argWithSuffix;
  }
  if (typeof argThresholds === "object") {
    th = Object.assign({}, thresholds, argThresholds);
    if (argThresholds.s != null && argThresholds.ss == null) {
      th.ss = argThresholds.s - 1;
    }
  }
  locale2 = this.localeData();
  output = relativeTime$1(this, !withSuffix, th, locale2);
  if (withSuffix) {
    output = locale2.pastFuture(+this, output);
  }
  return locale2.postformat(output);
}
var abs$1 = Math.abs;
function sign(x) {
  return (x > 0) - (x < 0) || +x;
}
function toISOString$1() {
  if (!this.isValid()) {
    return this.localeData().invalidDate();
  }
  var seconds2 = abs$1(this._milliseconds) / 1e3, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
  if (!total) {
    return "P0D";
  }
  minutes2 = absFloor(seconds2 / 60);
  hours2 = absFloor(minutes2 / 60);
  seconds2 %= 60;
  minutes2 %= 60;
  years2 = absFloor(months2 / 12);
  months2 %= 12;
  s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
  totalSign = total < 0 ? "-" : "";
  ymSign = sign(this._months) !== sign(total) ? "-" : "";
  daysSign = sign(this._days) !== sign(total) ? "-" : "";
  hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
  return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
}
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1;
proto$2.abs = abs;
proto$2.add = add$1;
proto$2.subtract = subtract$1;
proto$2.as = as;
proto$2.asMilliseconds = asMilliseconds;
proto$2.asSeconds = asSeconds;
proto$2.asMinutes = asMinutes;
proto$2.asHours = asHours;
proto$2.asDays = asDays;
proto$2.asWeeks = asWeeks;
proto$2.asMonths = asMonths;
proto$2.asQuarters = asQuarters;
proto$2.asYears = asYears;
proto$2.valueOf = valueOf$1;
proto$2._bubble = bubble;
proto$2.clone = clone$1;
proto$2.get = get$2;
proto$2.milliseconds = milliseconds;
proto$2.seconds = seconds;
proto$2.minutes = minutes;
proto$2.hours = hours;
proto$2.days = days;
proto$2.weeks = weeks;
proto$2.months = months;
proto$2.years = years;
proto$2.humanize = humanize;
proto$2.toISOString = toISOString$1;
proto$2.toString = toISOString$1;
proto$2.toJSON = toISOString$1;
proto$2.locale = locale;
proto$2.localeData = localeData;
proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
proto$2.lang = lang;
addFormatToken("X", 0, 0, "unix");
addFormatToken("x", 0, 0, "valueOf");
addRegexToken("x", matchSigned);
addRegexToken("X", matchTimestamp);
addParseToken("X", function(input, array2, config) {
  config._d = new Date(parseFloat(input) * 1e3);
});
addParseToken("x", function(input, array2, config) {
  config._d = new Date(toInt(input));
});
//! moment.js
hooks.version = "2.29.1";
setHookCallback(createLocal);
hooks.fn = proto;
hooks.min = min;
hooks.max = max;
hooks.now = now;
hooks.utc = createUTC;
hooks.unix = createUnix;
hooks.months = listMonths;
hooks.isDate = isDate;
hooks.locale = getSetGlobalLocale;
hooks.invalid = createInvalid;
hooks.duration = createDuration;
hooks.isMoment = isMoment;
hooks.weekdays = listWeekdays;
hooks.parseZone = createInZone;
hooks.localeData = getLocale;
hooks.isDuration = isDuration;
hooks.monthsShort = listMonthsShort;
hooks.weekdaysMin = listWeekdaysMin;
hooks.defineLocale = defineLocale;
hooks.updateLocale = updateLocale;
hooks.locales = listLocales;
hooks.weekdaysShort = listWeekdaysShort;
hooks.normalizeUnits = normalizeUnits;
hooks.relativeTimeRounding = getSetRelativeTimeRounding;
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
hooks.calendarFormat = getCalendarFormat;
hooks.prototype = proto;
hooks.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM"
};
new dist.TodoistApi(window.TODOIST_TOKEN);
window.Roamist = window.Roamist || {};
window.Roamist.TODOIST_TAG_NAME = window.Roamist.TODOIST_TAG_NAME || "42Todoist";
const getTodoistId = (url) => {
  try {
    const todoistId = url.match(/\d{10}/)[0];
    return todoistId;
  } catch (e) {
    console.warn(e);
    return "";
  }
};
const createTodoistTaskString = ({
  task
}) => {
  function getParsedContent(content) {
    const matchedLink = content.match(/\[(.*)\]\((.*)\)/);
    if (!matchedLink) {
      return content;
    } else {
      const [matchedString, title, urlString] = matchedLink;
      const getDiff = (diffMe, diffBy) => diffMe.split(diffBy).join("");
      const diff2 = getDiff(content, matchedString);
      const url = new URL(urlString);
      const matchedTags = [...title.matchAll(/\[(.[^\]\[]*)\]/g)];
      if (matchedTags.length > 0) {
        let newTitle = title;
        let tagString = "";
        matchedTags.forEach(([origin, content2]) => {
          newTitle = newTitle.replace(origin, "");
          tagString = `${tagString} #[[${content2}]]`;
        });
        if (!urlString.includes("bts")) {
          return `${diff2}[${newTitle}](${urlString}) ${tagString}`;
        }
        return `${diff2}[${newTitle}](${url.origin}${url.pathname}) ${tagString}`;
      } else {
        if (!urlString.includes("bts")) {
          return `${diff2}[${title}](${urlString})`;
        }
        return `${diff2}[${title}](${url.origin}${url.pathname})`;
      }
    }
  }
  let taskString = `${getParsedContent(task.content)}`;
  const colonIndex = taskString.indexOf(": ");
  let intent;
  intent = "inbox";
  if (colonIndex > -1) {
    intent = taskString.substring(0, colonIndex);
    taskString = taskString.substring(colonIndex + 2);
  }
  const whitelistMap = window.WHITELIST_MAP || {};
  const formattedIntent = whitelistMap[intent.toLowerCase()] || whitelistMap["inbox"];
  const createdString = hooks(task.created).format("MMMM Do, YYYY");
  const createdTime = hooks(task.created).format("HH:mm");
  return {
    formattedIntent,
    taskString: `${createdTime} ${taskString}`,
    createdString
  };
};
const getAllTodoistBlocksFromPageTitle = async (pageTitle) => {
  const rule = "[[(ancestor ?b ?a)[?a :block/children ?b]][(ancestor ?b ?a)[?parent :block/children ?b ](ancestor ?parent ?a) ]]";
  const query = `[:find  (pull ?block [:block/uid :block/string])
                                  :in $ ?page_title %
                                  :where
                                  [?page :node/title ?page_title]
                                  [?block :block/string ?contents]
                                  [(clojure.string/includes? ?contents "#${window.Roamist.TODOIST_TAG_NAME}")]
                                  (ancestor ?block ?page)]`;
  const results = await window.roamAlphaAPI.q(query, pageTitle, rule);
  return results;
};
const dedupTaskList = async (taskList) => {
  const currentPageUid = await roam42.common.currentPageUID();
  console.log(`[util.js:79] currentPageUid: `, currentPageUid);
  const currentpageTitle = await roam42.common.getBlockInfoByUID(currentPageUid);
  const existingBlocks = await getAllTodoistBlocksFromPageTitle(currentpageTitle[0][0].title);
  const existingTodoistIds = existingBlocks.map((item) => {
    const block = item[0];
    const todoistId = getTodoistId(block.string);
    return todoistId;
  });
  const newTaskList = taskList.filter((task) => {
    const taskId = getTodoistId(task.url);
    return !existingTodoistIds.includes(taskId);
  });
  return newTaskList;
};
const api$1 = new dist.TodoistApi(window.TODOIST_TOKEN);
const pullTasks = async ({
  todoistFilter,
  onlyDiff
}) => {
  const createDescriptionBlock = async ({
    description: description2,
    currentBlockUid: currentBlockUid2,
    currentIndent
  }) => {
    let descBlockUid;
    const descList = description2.split(/\r?\n/);
    for (const [descIndex, desc] of descList.entries()) {
      if (descIndex === 0) {
        descBlockUid = await roam42.common.createBlock(currentBlockUid2, currentIndent + 1, desc);
      } else {
        descBlockUid = await roam42.common.createSiblingBlock(descBlockUid, desc);
      }
    }
  };
  const tasks = await api$1.getTasks({ filter: todoistFilter });
  let taskList = tasks.filter((task) => !task.parent_id);
  if (onlyDiff) {
    taskList = await dedupTaskList(taskList);
  }
  taskList.sort((a, b) => {
    return b.priority - a.priority;
  });
  const cursorBlockUid = roam42.common.currentActiveBlockUID();
  let currentBlockUid = cursorBlockUid;
  const taskCollection = {};
  for (const [taskIndex, task] of taskList.entries()) {
    console.log(taskIndex);
    const {
      formattedIntent,
      taskString,
      createdString
    } = createTodoistTaskString({ task });
    if (!taskCollection[createdString]) {
      taskCollection[createdString] = {};
    }
    if (!taskCollection[createdString][formattedIntent]) {
      taskCollection[createdString][formattedIntent] = [];
    }
    taskCollection[createdString][formattedIntent].push({
      task,
      taskString
    });
  }
  for (const createdString of Object.keys(taskCollection)) {
    currentBlockUid = await roam42.common.createSiblingBlock(currentBlockUid, createdString, true);
    let firstBlock = true;
    let intentBlockUid;
    for (const taskIntent of Object.keys(taskCollection[createdString])) {
      if (firstBlock) {
        firstBlock = false;
        intentBlockUid = await roam42.common.createBlock(currentBlockUid, 2, taskIntent);
      } else {
        intentBlockUid = await roam42.common.createSiblingBlock(intentBlockUid, taskIntent, true);
      }
      let taskBlockUid;
      for (const [taskIndex, taskData] of taskCollection[taskIntent].entries()) {
        const { taskString, task } = taskData;
        if (taskIndex === 0) {
          taskBlockUid = await roam42.common.createBlock(intentBlockUid, 3, taskString);
        } else {
          taskBlockUid = await roam42.common.createSiblingBlock(taskBlockUid, taskString);
        }
        if (task.description) {
          await createDescriptionBlock({
            description: task.description,
            currentBlockUid: taskBlockUid,
            currentIndent: 4
          });
        }
        await api$1.closeTask(task.id);
      }
    }
  }
  return "";
};
const api = new dist.TodoistApi(window.TODOIST_TOKEN);
const syncCompleted = async () => {
  const getTodoBlocksReferringToThisPage = async (title) => {
    try {
      return await window.roamAlphaAPI.q(`
        [:find (pull ?refs [:block/string :block/uid {:block/children ...}])
          :where [?refs :block/refs ?title][?refs :block/refs ?todoTitle][?todoTitle :node/title "TODO"][?title :node/title "${title}"]]`);
    } catch (e) {
      console.log("error in getTodoBlocksReferringToThisPage: ", e);
      return [];
    }
  };
  const getTodoBlocksWithTodoistId = async () => {
    const roamTodoBlocks = await getTodoBlocksReferringToThisPage(window.Roamist.TODOIST_TAG_NAME);
    return roamTodoBlocks.map((item) => {
      const block = item[0];
      const { string: string2 } = block;
      const todoistId = string2.match(/\d{10}/)[0];
      return __spreadProps(__spreadValues({}, block), {
        todoistId
      });
    });
  };
  const getCompletedBlockUIds = (activeTodoistIds2, roamTodoist2) => {
    const completedBlocks2 = roamTodoist2.filter(({ todoistId }) => {
      return !activeTodoistIds2.includes(Number(todoistId));
    });
    return completedBlocks2;
  };
  const tasks = await api.getTasks();
  const activeTodoistIds = tasks.map((task) => task.id);
  const roamTodoist = await getTodoBlocksWithTodoistId();
  const completedBlocks = getCompletedBlockUIds(activeTodoistIds, roamTodoist);
  for (const block of completedBlocks) {
    const newContent = block.string.replace("{{[[TODO]]}}", "{{[[DONE]]}}");
    await roam42.common.updateBlock(block.uid, newContent);
  }
  return "";
};
window.Roamist = __spreadProps(__spreadValues(__spreadValues({}, window.RTI), window.Roamist), {
  completeTask,
  pullTasks,
  syncCompleted
});
window.RTI = {
  completeTask,
  pullTasks,
  syncCompleted
};
console.log("<<< roamist >>> window.Roamist: ", window.Roamist);
console.log("<<< roamist >>> setup compoleted.");
