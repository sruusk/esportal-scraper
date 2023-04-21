'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var debug = require('debug');
var DefaultHero = require('@ulixee/hero');
var PQueue = require('p-queue');
var require$$1$1 = require('path');
var require$$0 = require('url');
var require$$1 = require('fs');
var require$$0$2 = require('events');
var require$$0$1 = require('net');
var require$$0$3 = require('util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var debug__default = /*#__PURE__*/_interopDefaultLegacy(debug);
var DefaultHero__default = /*#__PURE__*/_interopDefaultLegacy(DefaultHero);
var PQueue__default = /*#__PURE__*/_interopDefaultLegacy(PQueue);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$1);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);

const esportalCountries = {
    "0": "AF", "1": "AX", "2": "AL", "3": "DZ", "4": "AS", "5": "AD", "6": "AO", "7": "AI", "8": "AG", "9": "AR",
    "10": "AM", "11": "AW", "12": "AU", "13": "AT", "14": "AZ", "15": "BS", "16": "BH", "17": "BD", "18": "BB", "19": "BY",
    "20": "BE", "21": "BZ", "22": "BJ", "23": "BM", "24": "BT", "25": "BO", "26": "BA", "27": "BW", "28": "BV", "29": "BR",
    "30": "IO", "31": "BN", "32": "BG", "33": "BF", "34": "BI", "35": "KH", "36": "CM", "37": "CA", "38": "CV", "39": "KY",
    "40": "CF", "41": "TD", "42": "CL", "43": "CN", "44": "CX", "45": "CC", "46": "CO", "47": "KM", "48": "CG", "49": "CD",
    "50": "CK", "51": "CR", "52": "CI", "53": "HR", "54": "CU", "55": "CY", "56": "CZ", "57": "DK", "58": "DJ", "59": "DM",
    "60": "DO", "61": "EC", "62": "EG", "63": "SV", "64": "GQ", "65": "ER", "66": "EE", "67": "ET", "68": "FK", "69": "FO",
    "70": "FJ", "71": "FI", "72": "FR", "73": "GF", "74": "PF", "75": "TF", "76": "GA", "77": "GM", "78": "GE", "79": "DE",
    "80": "GH", "81": "GI", "82": "GR", "83": "GL", "84": "GD", "85": "GP", "86": "GU", "87": "GT", "88": "GG", "89": "GN",
    "90": "GW", "91": "GY", "92": "HT", "93": "HM", "94": "VA", "95": "HN", "96": "HK", "97": "HU", "98": "IS", "99": "IN",
    "100": "ID", "101": "IR", "102": "IQ", "103": "IE", "104": "IM", "105": "IL", "106": "IT", "107": "JM", "108": "JP", "109": "JE",
    "110": "JO", "111": "KZ", "112": "KE", "113": "KI", "114": "KR", "115": "KW", "116": "KG", "117": "LA", "118": "LV", "119": "LB",
    "120": "LS", "121": "LR", "122": "LY", "123": "LI", "124": "LT", "125": "LU", "126": "MO", "127": "MK", "128": "MG", "129": "MW",
    "130": "MY", "131": "MV", "132": "ML", "133": "MT", "134": "MH", "135": "MQ", "136": "MR", "137": "MU", "138": "YT", "139": "MX",
    "140": "FM", "141": "MD", "142": "MC", "143": "MN", "144": "ME", "145": "MS", "146": "MA", "147": "MZ", "148": "MM", "149": "NA",
    "150": "NR", "151": "NP", "152": "NL", "153": "AN", "154": "NC", "155": "NZ", "156": "NI", "157": "NE", "158": "NG", "159": "NU",
    "160": "NF", "161": "MP", "162": "NO", "163": "OM", "164": "PK", "165": "PW", "166": "PS", "167": "PA", "168": "PG", "169": "PY",
    "170": "PE", "171": "PH", "172": "PN", "173": "PL", "174": "PT", "175": "PR", "176": "QA", "177": "RE", "178": "RO", "179": "RU",
    "180": "RW", "181": "BL", "182": "SH", "183": "KN", "184": "LC", "185": "MF", "186": "PM", "187": "VC", "188": "WS", "189": "SM",
    "190": "ST", "191": "SA", "192": "SN", "193": "RS", "194": "SC", "195": "SL", "196": "SG", "197": "SK", "198": "SI", "199": "SB",
    "200": "SO", "201": "ZA", "202": "GS", "203": "SS", "204": "ES", "205": "LK", "206": "SD", "207": "SR", "208": "SJ", "209": "SZ",
    "210": "SE", "211": "CH", "212": "SY", "213": "TW", "214": "TJ", "215": "TZ", "216": "TH", "217": "TL", "218": "TG", "219": "TK",
    "220": "TO", "221": "TT", "222": "TN", "223": "TR", "224": "TM", "225": "TC", "226": "TV", "227": "UG", "228": "UA", "229": "AE",
    "230": "GB", "231": "US", "232": "UM", "233": "UY", "234": "UZ", "235": "VU", "236": "VE", "237": "VN", "238": "VG", "239": "VI",
    "240": "WF", "241": "EH", "242": "YE", "243": "ZM", "244": "ZW"
};

async function fetch(hero, url) {
    const fetchResponse = await hero.fetch(url);
    // Check for page error
    const statusCode = await fetchResponse.status;
    if (statusCode !== 200) {
        throw new Error(`${url} returned a non-200 response: ${statusCode}`);
    }
    return fetchResponse.json();
}
const matchSteamID64 = (id) => {
    return /^7656119\d{10}$/.test(id);
};
const steamID64toSteamID3 = (steamID64) => {
    return (BigInt(steamID64) - BigInt(76561197960265728n)).toString();
};
async function getPlayer(steamID) {
    const hero = await this.createHero();
    try {
        if (matchSteamID64(steamID.toString()))
            steamID = steamID64toSteamID3(steamID.toString());
        let origin = 'https://esportal.com';
        let userUrl = `${origin}/api/user_profile/get?_=${Date.now()}&id=${steamID}&bans=1`;
        let latestMatchUrl = `${origin}/api/user_profile/get_latest_matches?_=${Date.now()}&id=${steamID}&page=1&v=2`;
        this.debug(`Going to ${origin}`);
        const originResponse = await hero.goto(origin, { timeoutMs: this.timeout });
        const statusCode = originResponse.response.statusCode;
        if (statusCode !== 200) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(`${origin} returned a non-200 response: ${statusCode}`);
        }
        this.debug(`Fetching ${userUrl}`);
        const user = await fetch(hero, userUrl);
        this.debug(`Fetching ${latestMatchUrl}`);
        const latestMatch = await fetch(hero, latestMatchUrl);
        await hero.close();
        return {
            username: user.username,
            banReason: user.ban?.reason,
            banExpires: user.ban?.expires ? new Date(user.ban.expires * 1000) : undefined,
            latestMatch: latestMatch ? new Date(latestMatch[0].inserted * 1000) : undefined,
            stats: {
                elo: user.elo,
                matches: user.wins + user.losses,
                wins: user.wins,
                losses: user.losses,
                winRate: Math.round((user.wins / (user.wins + user.losses)) * 100),
                kd: parseFloat((user.kills / user.deaths).toFixed(2)),
                hs: Math.round((user.headshots / user.kills) * 100),
            },
            country: user.country_id ? esportalCountries[user.country_id.toString()] : undefined,
        };
    }
    catch (err) {
        await hero.close();
        throw err;
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var TransportBridge$1 = {};

var TypeSerializer$1 = {};

Object.defineProperty(TypeSerializer$1, "__esModule", { value: true });
TypeSerializer$1.stringifiedTypeSerializerClass = TypeSerializer$1.registerSerializableErrorType = void 0;
const Types = {
    number: 'number',
    string: 'string',
    boolean: 'boolean',
    object: 'object',
    bigint: 'bigint',
    NaN: 'NaN',
    Infinity: 'Infinity',
    NegativeInfinity: '-Infinity',
    DateIso: 'DateIso',
    Buffer64: 'Buffer64',
    ArrayBuffer64: 'ArrayBuffer64',
    RegExp: 'RegExp',
    Map: 'Map',
    Set: 'Set',
    Error: 'Error',
};
class TypeSerializer {
    static parse(stringified, stackMarker = 'SERIALIZER') {
        return JSON.parse(stringified, this.reviver.bind(this, stackMarker));
    }
    static revive(object, objectKey) {
        if (!object)
            return object;
        const marker = 'SERIALIZER';
        const revived = this.reviver(marker, objectKey, object);
        if (revived !== object) {
            if (revived instanceof Map) {
                return new Map([...revived].map(([key, value]) => this.reviver(marker, key, value)));
            }
            if (revived instanceof Set) {
                return new Set([...revived].map(value => this.reviver(marker, '', value)));
            }
            return revived;
        }
        if (object && typeof object === Types.object) {
            if (Array.isArray(object)) {
                object = object.map(x => this.revive(x));
            }
            const response = {};
            for (const [key, value] of Object.entries(object)) {
                response[key] = this.revive(value, key);
            }
            object = response;
        }
        return object;
    }
    static stringify(object, options) {
        const final = TypeSerializer.replace(object, options);
        return JSON.stringify(final, null, options?.format ? 2 : null);
    }
    static replace(object, options) {
        if (object === undefined || object === null)
            return object;
        const replaced = this.typeReplacer(null, object, { sortKeys: options?.sortKeys });
        if (replaced !== object || (typeof replaced === 'object' && '__type' in replaced)) {
            return replaced;
        }
        if (object && typeof object === Types.object) {
            if (Array.isArray(object)) {
                return object.map(x => this.replace(x, options));
            }
            const keys = Object.keys(object);
            if (options?.sortKeys)
                keys.sort();
            const response = {};
            for (const key of keys) {
                if (options?.ignoreProperties) {
                    if (options.ignoreProperties.includes(key))
                        continue;
                }
                response[key] = this.replace(object[key], options);
            }
            return response;
        }
        return object;
    }
    static typeReplacer(_, value, options) {
        if (value === null || value === undefined)
            return value;
        if (value === true || value === false)
            return value;
        if (Number.isNaN(value)) {
            return { __type: Types.NaN };
        }
        if (value === Number.POSITIVE_INFINITY) {
            return { __type: Types.Infinity };
        }
        if (value === Number.NEGATIVE_INFINITY) {
            return { __type: Types.NegativeInfinity };
        }
        const type = typeof value;
        if (type === Types.boolean || type === Types.string || type === Types.number)
            return value;
        if (type === Types.bigint || value instanceof BigInt) {
            return { __type: Types.bigint, value: value.toString() };
        }
        if (value instanceof Date) {
            return { __type: Types.DateIso, value: value.toISOString() };
        }
        if (value instanceof RegExp) {
            return { __type: Types.RegExp, value: [value.source, value.flags] };
        }
        if (value instanceof Error ||
            (type === 'object' &&
                'stack' in value &&
                'name' in value &&
                value.name?.endsWith?.('Error'))) {
            const { name, message, stack, ...data } = value;
            const extras = this.replace(data, options);
            return { __type: Types.Error, value: { name, message, stack, ...extras } };
        }
        if (value instanceof Map) {
            return {
                __type: Types.Map,
                value: [...value.entries()].map(x => this.replace(x, options)),
            };
        }
        if (value instanceof Set) {
            return { __type: Types.Set, value: [...value].map(x => this.replace(x, options)) };
        }
        if (this.isNodejs) {
            if (value instanceof Buffer || Buffer.isBuffer(value)) {
                return { __type: Types.Buffer64, value: value.toString('base64') };
            }
        }
        else {
            // @ts-ignore
            if (value instanceof DOMRect) {
                return value.toJSON();
            }
            // @ts-ignore
            if (value instanceof CSSStyleDeclaration) {
                const isNumber = /^\d+$/;
                const result = {};
                for (const key of Object.keys(value)) {
                    if (isNumber.test(key))
                        continue;
                    result[key] = value[key];
                }
                return result;
            }
            if (ArrayBuffer.isView(value)) {
                // @ts-ignore
                const binary = new TextDecoder('utf8').decode(value.buffer);
                return {
                    __type: Types.ArrayBuffer64,
                    value: globalThis.btoa(binary),
                    args: {
                        arrayType: value[Symbol.toStringTag],
                        byteOffset: value.byteOffset,
                        byteLength: value.byteLength,
                    },
                };
            }
            if (value instanceof ArrayBuffer) {
                // @ts-ignore
                const binary = new TextDecoder('utf8').decode(value);
                return {
                    __type: Types.ArrayBuffer64,
                    value: globalThis.btoa(binary),
                };
            }
        }
        if (type === 'object' && 'toJSON' in value) {
            return value.toJSON();
        }
        return value;
    }
    static reviver(stackMarker, key, entry) {
        if (!entry || !entry.__type)
            return entry;
        const { value, __type: type } = entry;
        if (type === Types.number || type === Types.string || type === Types.boolean)
            return value;
        if (type === Types.bigint)
            return BigInt(value);
        if (type === Types.NaN)
            return Number.NaN;
        if (type === Types.Infinity)
            return Number.POSITIVE_INFINITY;
        if (type === Types.NegativeInfinity)
            return Number.NEGATIVE_INFINITY;
        if (type === Types.DateIso)
            return new Date(value);
        if (type === Types.Buffer64 || type === Types.ArrayBuffer64) {
            if (this.isNodejs) {
                return Buffer.from(value, 'base64');
            }
            const decoded = globalThis.atob(value);
            // @ts-ignore
            const uint8Array = new TextEncoder().encode(decoded);
            if (!entry.args)
                return uint8Array;
            const { arrayType, byteOffset, byteLength } = entry.args;
            return new globalThis[arrayType](uint8Array.buffer, byteOffset, byteLength);
        }
        if (type === Types.RegExp)
            return new RegExp(value[0], value[1]);
        if (type === Types.Map) {
            return new Map(value);
        }
        if (type === Types.Set) {
            return new Set(value);
        }
        if (type === Types.Error) {
            const { name, message, stack, ...data } = value;
            const extras = this.revive(data);
            let Constructor = this.errorTypes && this.errorTypes.get(name);
            if (!Constructor) {
                if (this.isNodejs) {
                    Constructor = commonjsGlobal[name] || Error;
                }
                else {
                    Constructor = globalThis[name] || Error;
                }
            }
            const startStack = new Error('').stack.slice(8); // "Error: \n" is 8 chars
            const e = new Constructor();
            e.message = message;
            e.name = name;
            Object.assign(e, extras);
            if (stack) {
                e.stack = `${stack}\n${`------${stackMarker}`.padEnd(50, '-')}\n${startStack}`;
            }
            return e;
        }
        return entry;
    }
}
TypeSerializer$1.default = TypeSerializer;
TypeSerializer.errorTypes = new Map();
TypeSerializer.isNodejs = 
// prettier-ignore
// @ts-ignore
typeof process !== 'undefined' && ('release' in process) && process.release?.name === 'node';
function registerSerializableErrorType(errorConstructor) {
    TypeSerializer.errorTypes.set(errorConstructor.name, errorConstructor);
}
TypeSerializer$1.registerSerializableErrorType = registerSerializableErrorType;
TypeSerializer$1.stringifiedTypeSerializerClass = `const Types = ${JSON.stringify(Types)};\n${TypeSerializer.toString()}`;

var EmittingTransportToCore$1 = {};

var SourceMapSupport = {};

var sourceMap = {};

var sourceMapGenerator = {};

var base64Vlq = {};

var base64$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
base64$1.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
base64$1.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = base64$1;

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
base64Vlq.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var util$5 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port;
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;

	var MAX_CACHED_INPUTS = 32;

	/**
	 * Takes some function `f(input) -> result` and returns a memoized version of
	 * `f`.
	 *
	 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	 * memoization is a dumb-simple, linear least-recently-used cache.
	 */
	function lruMemoize(f) {
	  var cache = [];

	  return function(input) {
	    for (var i = 0; i < cache.length; i++) {
	      if (cache[i].input === input) {
	        var temp = cache[0];
	        cache[0] = cache[i];
	        cache[i] = temp;
	        return cache[0].result;
	      }
	    }

	    var result = f(input);

	    cache.unshift({
	      input,
	      result,
	    });

	    if (cache.length > MAX_CACHED_INPUTS) {
	      cache.pop();
	    }

	    return result;
	  };
	}

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	var normalize = lruMemoize(function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);
	  // Split the path into parts between `/` characters. This is much faster than
	  // using `.split(/\/+/g)`.
	  var parts = [];
	  var start = 0;
	  var i = 0;
	  while (true) {
	    start = i;
	    i = path.indexOf("/", start);
	    if (i === -1) {
	      parts.push(path.slice(start));
	      break;
	    } else {
	      parts.push(path.slice(start, i));
	      while (i < path.length && path[i] === "/") {
	        i++;
	      }
	    }
	  }

	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	});
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }

	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());

	function identity (s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }

	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  var length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }

	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp;

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
	}
	exports.parseSourceMapInput = parseSourceMapInput;

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';

	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }

	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    var parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error("sourceMapURL could not be parsed");
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      var index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }

	  return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
} (util$5));

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$4 = util$5;
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$2() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$2();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$2.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util$4.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$2.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util$4.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util$4.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$2.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

arraySet.ArraySet = ArraySet$2;

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$3 = util$5;

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util$3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList$1.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util$3.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

mappingList.MappingList = MappingList$1;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ$1 = base64Vlq;
var util$2 = util$5;
var ArraySet$1 = arraySet.ArraySet;
var MappingList = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator$1(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util$2.getArg(aArgs, 'file', null);
  this._sourceRoot = util$2.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util$2.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator$1.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator$1.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator$1({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util$2.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util$2.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator$1.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util$2.getArg(aArgs, 'generated');
    var original = util$2.getArg(aArgs, 'original', null);
    var source = util$2.getArg(aArgs, 'source', null);
    var name = util$2.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator$1.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util$2.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util$2.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util$2.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator$1.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util$2.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet$1();
    var newNames = new ArraySet$1();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util$2.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util$2.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util$2.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util$2.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator$1.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator$1.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util$2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ$1.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ$1.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ$1.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ$1.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ$1.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator$1.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util$2.relative(aSourceRoot, source);
      }
      var key = util$2.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator$1.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator$1.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$1;

var sourceMapConsumer = {};

var binarySearch$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid;
	  }
	  else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1;
	    } else {
	      return mid;
	    }
	  }
	  else {
	    // Our needle is less than aHaystack[mid].
	    if (mid - aLow > 1) {
	      // The element is in the lower half.
	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return mid;
	    } else {
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	}

	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1;
	  }

	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	  if (index < 0) {
	    return -1;
	  }

	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break;
	    }
	    --index;
	  }

	  return index;
	};
} (binarySearch$1));

var quickSort$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

function SortTemplate(comparator) {

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot, false) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

  return doQuickSort;
}

function cloneSort(comparator) {
  let template = SortTemplate.toString();
  let templateFn = new Function(`return ${template}`)();
  return templateFn(comparator);
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */

let sortCache = new WeakMap();
quickSort$1.quickSort = function (ary, comparator, start = 0) {
  let doQuickSort = sortCache.get(comparator);
  if (doQuickSort === void 0) {
    doQuickSort = cloneSort(comparator);
    sortCache.set(comparator, doQuickSort);
  }
  doQuickSort(ary, comparator, start, ary.length - 1);
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$1 = util$5;
var binarySearch = binarySearch$1;
var ArraySet = arraySet.ArraySet;
var base64VLQ = base64Vlq;
var quickSort = quickSort$1.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    var boundCallback = aCallback.bind(context);
    var names = this._names;
    var sources = this._sources;
    var sourceMapURL = this._sourceMapURL;

    for (var i = 0, n = mappings.length; i < n; i++) {
      var mapping = mappings[i];
      var source = mapping.source === null ? null : sources.at(mapping.source);
      source = util$1.computeSourceURL(sourceRoot, source, sourceMapURL);
      boundCallback({
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : names.at(mapping.name)
      });
    }
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util$1.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util$1.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util$1.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util$1.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sources = util$1.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util$1.getArg(sourceMap, 'names', []);
  var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util$1.getArg(sourceMap, 'mappings');
  var file = util$1.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util$1.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util$1.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
        ? util$1.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$1.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util$1.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */

const compareGenerated = util$1.compareByGeneratedPositionsDeflatedNoLine;
function sortGenerated(array, start) {
  let l = array.length;
  let n = array.length - start;
  if (n <= 1) {
    return;
  } else if (n == 2) {
    let a = array[start];
    let b = array[start + 1];
    if (compareGenerated(a, b) > 0) {
      array[start] = b;
      array[start + 1] = a;
    }
  } else if (n < 20) {
    for (let i = start; i < l; i++) {
      for (let j = i; j > start; j--) {
        let a = array[j - 1];
        let b = array[j];
        if (compareGenerated(a, b) <= 0) {
          break;
        }
        array[j - 1] = b;
        array[j] = a;
      }
    }
  } else {
    quickSort(array, compareGenerated, start);
  }
}
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, segment, end, value;

    let subarrayStart = 0;
    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;

        sortGenerated(generatedMappings, subarrayStart);
        subarrayStart = generatedMappings.length;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        aStr.slice(index, end);

        segment = [];
        while (index < end) {
          base64VLQ.decode(aStr, index, temp);
          value = temp.value;
          index = temp.rest;
          segment.push(value);
        }

        if (segment.length === 2) {
          throw new Error('Found a source, but no line and column');
        }

        if (segment.length === 3) {
          throw new Error('Found a source and line, but no column');
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          let currentSource = mapping.source;
          while (originalMappings.length <= currentSource) {
            originalMappings.push(null);
          }
          if (originalMappings[currentSource] === null) {
            originalMappings[currentSource] = [];
          }
          originalMappings[currentSource].push(mapping);
        }
      }
    }

    sortGenerated(generatedMappings, subarrayStart);
    this.__generatedMappings = generatedMappings;

    for (var i = 0; i < originalMappings.length; i++) {
      if (originalMappings[i] != null) {
        quickSort(originalMappings[i], util$1.compareByOriginalPositionsNoSource);
      }
    }
    this.__originalMappings = [].concat(...originalMappings);
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util$1.compareByGeneratedPositionsDeflated,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util$1.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util$1.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util$1.getArg(mapping, 'originalLine', null),
          column: util$1.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util$1.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util$1.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util$1.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util$1.getArg(aArgs, 'line'),
      originalColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util$1.compareByOriginalPositions,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util$1.getArg(mapping, 'generatedLine', null),
          column: util$1.getArg(mapping, 'generatedColumn', null),
          lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sections = util$1.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util$1.getArg(s, 'offset');
    var offsetLine = util$1.getArg(offset, 'line');
    var offsetColumn = util$1.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util$1.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util$1.compareByOriginalPositions);
  };

sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

var sourceNode = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
var util = util$5;

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

sourceNode.SourceNode = SourceNode;

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

sourceMap.SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
sourceMap.SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;
sourceMap.SourceNode = sourceNode.SourceNode;

var SourceLoader = {};

var hasRequiredSourceLoader;

function requireSourceLoader () {
	if (hasRequiredSourceLoader) return SourceLoader;
	hasRequiredSourceLoader = 1;
	Object.defineProperty(SourceLoader, "__esModule", { value: true });
	const url_1 = require$$0__default["default"];
	const fs = require$$1__default["default"];
	const SourceMapSupport_1 = requireSourceMapSupport();
	class SourceLoader$1 {
	    static resetCache() {
	        this.sourceLines = {};
	        this.fileContentsCache = {};
	    }
	    static clearFileCache(filepath) {
	        delete this.fileContentsCache[filepath];
	    }
	    static getSource(codeLocation) {
	        if (!codeLocation)
	            return null;
	        const sourcePosition = SourceMapSupport_1.SourceMapSupport.getOriginalSourcePosition(codeLocation, true);
	        const code = sourcePosition.content;
	        if (!this.sourceLines[sourcePosition.filename]) {
	            const file = code || this.getFileContents(sourcePosition.filename);
	            if (!file)
	                return null;
	            this.sourceLines[sourcePosition.filename] = file.split(/\r?\n/);
	        }
	        sourcePosition.code = this.sourceLines[sourcePosition.filename][sourcePosition.line - 1];
	        return sourcePosition;
	    }
	    static getFileContents(filepath, cache = true) {
	        if (cache && this.fileContentsCache[filepath])
	            return this.fileContentsCache[filepath];
	        const originalFilepath = filepath;
	        // Trim the path to make sure there is no extra whitespace.
	        let lookupFilepath = filepath.trim();
	        if (filepath.startsWith('file://')) {
	            lookupFilepath = new url_1.URL(filepath);
	        }
	        let data = null;
	        try {
	            data = fs.readFileSync(lookupFilepath, 'utf8');
	        }
	        catch (err) {
	            // couldn't read
	        }
	        if (cache) {
	            this.fileContentsCache[filepath] = data;
	            this.fileContentsCache[originalFilepath] = data;
	        }
	        return data;
	    }
	}
	SourceLoader.default = SourceLoader$1;
	SourceLoader$1.sourceLines = {};
	SourceLoader$1.fileContentsCache = {};
	
	return SourceLoader;
}

var hasRequiredSourceMapSupport;

function requireSourceMapSupport () {
	if (hasRequiredSourceMapSupport) return SourceMapSupport;
	hasRequiredSourceMapSupport = 1;
	Object.defineProperty(SourceMapSupport, "__esModule", { value: true });
	SourceMapSupport.SourceMapSupport = void 0;
	const source_map_js_1 = sourceMap;
	const path = require$$1__default$1["default"];
	const SourceLoader_1 = requireSourceLoader();
	// ATTRIBUTION: forked from https://github.com/evanw/node-source-map-support
	const sourceMapDataUrlRegex = /^data:application\/json[^,]+base64,/;
	const sourceMapUrlRegex = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm;
	const fileUrlPrefix = 'file://';
	class SourceMapSupport$1 {
	    static clearStackPath(stackPath) {
	        this.stackPathsToClear.add(stackPath);
	    }
	    static resetCache() {
	        this.sourceMapCache = {};
	        this.resolvedPathCache = {};
	    }
	    static clearCache(filepath) {
	        this.sourceMapCache[filepath] = null;
	    }
	    static install() {
	        // ts-node does it's own translations
	        if (process.execArgv?.includes('ts-node'))
	            return;
	        if (!Error[Symbol.for('source-map-support')]) {
	            Error[Symbol.for('source-map-support')] = true;
	            Error.prepareStackTrace = this.prepareStackTrace.bind(this);
	        }
	    }
	    static getSourceFile(filename) {
	        var _a;
	        (_a = this.sourceMapCache)[filename] ?? (_a[filename] = this.retrieveSourceMap(filename));
	        if (!this.sourceMapCache[filename].map)
	            return {
	                path: filename,
	            };
	        let source = filename;
	        let content;
	        const sourceMap = this.sourceMapCache[filename];
	        sourceMap.map.eachMapping(mapping => {
	            if (source === filename) {
	                source = this.resolvePath(sourceMap.url, mapping.source);
	                content = sourceMap.map.sourceContentFor(mapping.source, true);
	            }
	        });
	        return { path: source, content };
	    }
	    static getSourceFilePaths(filename) {
	        var _a;
	        (_a = this.sourceMapCache)[filename] ?? (_a[filename] = this.retrieveSourceMap(filename));
	        if (!this.sourceMapCache[filename].map)
	            return [filename];
	        const sourcesByMappingSource = new Map();
	        const sourceMap = this.sourceMapCache[filename];
	        sourceMap.map.eachMapping(mapping => {
	            if (!sourcesByMappingSource.has(mapping.source)) {
	                const resolvedPath = this.resolvePath(sourceMap.url, mapping.source);
	                sourcesByMappingSource.set(mapping.source, resolvedPath);
	            }
	        });
	        return [...sourcesByMappingSource.values()];
	    }
	    static getOriginalSourcePosition(position, includeContent = false) {
	        var _a, _b;
	        (_a = this.sourceMapCache)[_b = position.filename] ?? (_a[_b] = this.retrieveSourceMap(position.filename));
	        const sourceMap = this.sourceMapCache[position.filename];
	        if (sourceMap?.map) {
	            const originalPosition = sourceMap.map.originalPositionFor(position);
	            // Only return the original position if a matching line was found
	            if (originalPosition.source) {
	                let content = null;
	                const filename = this.resolvePath(sourceMap.url, originalPosition.source);
	                if (includeContent) {
	                    content = sourceMap.map.sourceContentFor(originalPosition.source, true);
	                }
	                return {
	                    source: originalPosition.source,
	                    filename,
	                    column: originalPosition.column,
	                    line: originalPosition.line,
	                    name: originalPosition.name,
	                    content,
	                };
	            }
	        }
	        return position;
	    }
	    static retrieveSourceMap(source) {
	        const fileData = SourceLoader_1.default.getFileContents(source, false);
	        // Find the *last* sourceMappingURL to avoid picking up sourceMappingURLs from comments, strings, etc.
	        let sourceMappingURL;
	        let sourceMapData;
	        let match;
	        // eslint-disable-next-line no-cond-assign
	        while ((match = sourceMapUrlRegex.exec(fileData))) {
	            sourceMappingURL = match[1];
	        }
	        if (sourceMappingURL) {
	            if (sourceMapDataUrlRegex.test(sourceMappingURL)) {
	                const rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(',') + 1);
	                sourceMapData = Buffer.from(rawData, 'base64').toString();
	                sourceMappingURL = source;
	            }
	            else {
	                sourceMappingURL = this.resolvePath(source, sourceMappingURL);
	                sourceMapData = SourceLoader_1.default.getFileContents(sourceMappingURL);
	            }
	        }
	        if (!sourceMapData) {
	            return {
	                url: null,
	                map: null,
	            };
	        }
	        const rawData = JSON.parse(sourceMapData);
	        return {
	            url: sourceMappingURL,
	            map: new source_map_js_1.SourceMapConsumer(rawData),
	            rawMap: rawData,
	        };
	    }
	    static prepareStackTrace(error, stack) {
	        const name = error.name ?? error[Symbol.toStringTag] ?? error.constructor?.name ?? 'Error';
	        const message = error.message ?? '';
	        const errorString = `${name}: ${message}`;
	        // track fn name as we go backwards through stack
	        const processedStack = [];
	        let containingFnName = null;
	        for (let i = stack.length - 1; i >= 0; i--) {
	            let frame = stack[i];
	            if (frame.isNative()) {
	                containingFnName = null;
	            }
	            else {
	                const filename = frame.getFileName() || frame.getScriptNameOrSourceURL();
	                if (filename && !filename.endsWith('.ts')) {
	                    const position = this.getOriginalSourcePosition({
	                        filename,
	                        line: frame.getLineNumber(),
	                        column: frame.getColumnNumber() - 1,
	                    });
	                    if (position.filename !== filename) {
	                        const fnName = containingFnName ?? frame.getFunctionName();
	                        for (const toReplace of this.stackPathsToClear) {
	                            if (position.filename.startsWith(toReplace)) {
	                                position.filename = position.filename.replace(toReplace, '');
	                            }
	                        }
	                        containingFnName = position.name;
	                        frame = new Proxy(frame, {
	                            get(target, p) {
	                                if (p === 'getFunctionName')
	                                    return () => fnName;
	                                if (p === 'getFileName')
	                                    return () => position.filename;
	                                if (p === 'getScriptNameOrSourceURL')
	                                    return () => position.filename;
	                                if (p === 'getLineNumber')
	                                    return () => position.line;
	                                if (p === 'getColumnNumber')
	                                    return () => position.column + 1;
	                                if (p === 'toString')
	                                    return CallSiteToString.bind(frame);
	                                return target[p]?.bind(target);
	                            },
	                        });
	                    }
	                }
	            }
	            processedStack.unshift(`\n    at ${frame.toString()}`);
	        }
	        return errorString + processedStack.join('');
	    }
	    static resolvePath(base, relative) {
	        if (!base)
	            return relative;
	        const key = `${base}__${relative}`;
	        if (!this.resolvedPathCache[key]) {
	            let protocol = base.startsWith(fileUrlPrefix) ? fileUrlPrefix : '';
	            let basePath = path.dirname(base).slice(protocol.length);
	            // handle file:///C:/ paths
	            if (protocol && /^\/\w:/.test(basePath)) {
	                protocol += '/';
	                basePath = basePath.slice(1);
	            }
	            this.resolvedPathCache[key] = protocol + path.resolve(basePath, relative);
	        }
	        return this.resolvedPathCache[key];
	    }
	}
	SourceMapSupport.SourceMapSupport = SourceMapSupport$1;
	SourceMapSupport$1.sourceMapCache = {};
	SourceMapSupport$1.resolvedPathCache = {};
	SourceMapSupport$1.stackPathsToClear = new Set();
	SourceMapSupport$1.install();
	// Converted from the V8 source code at:
	// https://github.com/v8/v8/blob/dc712da548c7fb433caed56af9a021d964952728/src/objects/stack-frame-info.cc#L344-L393
	function CallSiteToString() {
	    let fileName;
	    let fileLocation = '';
	    if (this.isNative()) {
	        fileLocation = 'native';
	    }
	    else {
	        fileName = this.getScriptNameOrSourceURL();
	        if (!fileName && this.isEval()) {
	            fileLocation = this.getEvalOrigin();
	            fileLocation += ', '; // Expecting source position to follow.
	        }
	        if (fileName) {
	            fileLocation += fileName;
	        }
	        else {
	            // Source code does not originate from a file and is not native, but we
	            // can still get the source position inside the source string, e.g. in
	            // an eval string.
	            fileLocation += '<anonymous>';
	        }
	        const lineNumber = this.getLineNumber();
	        if (lineNumber != null) {
	            fileLocation += `:${lineNumber}`;
	            const columnNumber = this.getColumnNumber();
	            if (columnNumber) {
	                fileLocation += `:${columnNumber}`;
	            }
	        }
	    }
	    let line = '';
	    const isAsync = this.isAsync ? this.isAsync() : false;
	    if (isAsync) {
	        line += 'async ';
	        const isPromiseAll = this.isPromiseAll ? this.isPromiseAll() : false;
	        const isPromiseAny = this.isPromiseAny ? this.isPromiseAny() : false;
	        if (isPromiseAny || isPromiseAll) {
	            line += isPromiseAll ? 'Promise.all (index ' : 'Promise.any (index ';
	            const promiseIndex = this.getPromiseIndex();
	            line += `${promiseIndex})`;
	        }
	    }
	    const functionName = this.getFunctionName();
	    let addSuffix = true;
	    const isConstructor = this.isConstructor();
	    const isMethodCall = !(this.isToplevel() || isConstructor);
	    if (isMethodCall) {
	        const typeName = this.getTypeName();
	        const methodName = this.getMethodName();
	        if (functionName) {
	            if (typeName && functionName.indexOf(typeName) !== 0) {
	                line += `${typeName}.`;
	            }
	            line += functionName;
	            if (methodName &&
	                functionName.indexOf(`.${methodName}`) !== functionName.length - methodName.length - 1) {
	                line += ` [as ${methodName}]`;
	            }
	        }
	        else {
	            line += `${typeName}.${methodName || '<anonymous>'}`;
	        }
	    }
	    else if (isConstructor) {
	        line += `new ${functionName || '<anonymous>'}`;
	    }
	    else if (functionName) {
	        line += functionName;
	    }
	    else {
	        line += fileLocation;
	        addSuffix = false;
	    }
	    if (addSuffix) {
	        line += ` (${fileLocation})`;
	    }
	    return line;
	}
	
	return SourceMapSupport;
}

var eventUtils = {};

var TypedEventEmitter$1 = {};

var IPendingWaitEvent = {};

var addGlobalInstance$1 = {};

Object.defineProperty(addGlobalInstance$1, "__esModule", { value: true });
function addGlobalInstance(...constructors) {
    for (const constructor of constructors) {
        if (!constructor.prototype)
            continue;
        const instanceSymbol = Symbol.for(`@ulixee/${constructor.name}`);
        if (constructor.prototype[instanceSymbol] === true)
            continue;
        constructor.prototype[instanceSymbol] = true;
        Object.defineProperty(constructor, Symbol.hasInstance, {
            value: function hasInstance(candidate) {
                return this === constructor && !!candidate?.[instanceSymbol];
            },
        });
    }
}
addGlobalInstance$1.default = addGlobalInstance;

Object.defineProperty(IPendingWaitEvent, "__esModule", { value: true });
IPendingWaitEvent.CanceledPromiseError = void 0;
const addGlobalInstance_1$1 = addGlobalInstance$1;
const TypeSerializer_1$2 = TypeSerializer$1;
class CanceledPromiseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CanceledPromiseError';
    }
}
IPendingWaitEvent.CanceledPromiseError = CanceledPromiseError;
(0, addGlobalInstance_1$1.default)(CanceledPromiseError);
(0, TypeSerializer_1$2.registerSerializableErrorType)(CanceledPromiseError);

var utils = {};

var Resolvable$1 = {};

var TimeoutError$1 = {};

Object.defineProperty(TimeoutError$1, "__esModule", { value: true });
const TypeSerializer_1$1 = TypeSerializer$1;
const addGlobalInstance_1 = addGlobalInstance$1;
class TimeoutError extends Error {
    constructor(message) {
        super(message ?? 'Timeout waiting for promise');
        this.name = 'TimeoutError';
    }
}
TimeoutError$1.default = TimeoutError;
(0, addGlobalInstance_1.default)(TimeoutError);
(0, TypeSerializer_1$1.registerSerializableErrorType)(TimeoutError);

Object.defineProperty(Resolvable$1, "__esModule", { value: true });
const TimeoutError_1 = TimeoutError$1;
let idCounter$1 = 0;
class Resolvable {
    constructor(timeoutMillis, timeoutMessage) {
        // eslint-disable-next-line no-multi-assign
        this.id = (idCounter$1 += 1);
        this.isResolved = false;
        // get parent stack
        this.stack = new Error('').stack.slice(8);
        this.promise = new Promise((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
        if (timeoutMillis !== undefined && timeoutMillis !== null) {
            this.timeout = setTimeout(this.rejectWithTimeout.bind(this, timeoutMessage), timeoutMillis).unref();
        }
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }
    resolve(value) {
        if (this.isResolved)
            return;
        clearTimeout(this.timeout);
        this.resolveFn(value);
        this.isResolved = true;
        this.clean();
        if (value && typeof value === 'object' && 'then' in value && typeof value.then === 'function') {
            void Promise.resolve(value)
                // eslint-disable-next-line promise/always-return
                .then(x => {
                this.resolved = x;
            })
                .catch(this.reject);
        }
        else {
            this.resolved = value;
        }
    }
    reject(error, noUnhandledRejections = false) {
        if (this.isResolved)
            return;
        this.isResolved = true;
        if (noUnhandledRejections) {
            // eslint-disable-next-line promise/no-promise-in-callback
            this.promise.catch(() => null);
        }
        this.rejectFn(error);
        this.clean();
    }
    toJSON() {
        return {
            isResolved: this.isResolved,
            resolved: this.resolved,
        };
    }
    then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.promise.catch(onrejected);
    }
    finally(onfinally) {
        return this.promise.finally(onfinally);
    }
    clean() {
        clearTimeout(this.timeout);
        this.resolveFn = null;
        this.rejectFn = null;
    }
    rejectWithTimeout(message) {
        const error = new TimeoutError_1.default(message);
        error.stack = `TimeoutError: ${message}\n${this.stack}`;
        this.reject(error, true);
    }
}
Resolvable$1.default = Resolvable;

Object.defineProperty(utils, "__esModule", { value: true });
utils.createPromise = utils.bindFunctions = utils.getPrototypeHierarchy = utils.getObjectFunctionProperties = utils.pickRandom = utils.escapeUnescapedChar = utils.isPortInUse = utils.assert = void 0;
const net = require$$0__default$1["default"];
const Resolvable_1 = Resolvable$1;
function assert(value, message, reject) {
    if (value)
        return;
    const error = new Error(message);
    if (reject) {
        reject(error);
    }
    else {
        throw error;
    }
}
utils.assert = assert;
function isPortInUse(port) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        let isInUse = true;
        client.once('error', err => {
            if (err.code === 'ECONNREFUSED') {
                isInUse = false;
                resolve(isInUse);
            }
            else {
                reject(err);
            }
            client.removeAllListeners().end().destroy().unref();
        });
        client.connect(Number(port), () => {
            resolve(isInUse);
            client.removeAllListeners().end().destroy().unref();
        });
    });
}
utils.isPortInUse = isPortInUse;
function escapeUnescapedChar(str, char) {
    let i = str.indexOf(char);
    while (i !== -1) {
        if (str[i - 1] !== '\\') {
            str = `${str.substr(0, i)}\\${str.substr(i)}`;
        }
        i = str.indexOf(char, i + 2);
    }
    return str;
}
utils.escapeUnescapedChar = escapeUnescapedChar;
function isClass(func) {
    // Class constructor is also a function
    if (!(func && func.constructor === Function) || func.prototype === undefined)
        return false;
    // This is a class that extends other class
    if (Function.prototype !== Object.getPrototypeOf(func))
        return true;
    // Usually a function will only have 'constructor' in the prototype
    return Object.getOwnPropertyNames(func.prototype).length > 1;
}
function pickRandom(array) {
    if (array.length === 1)
        return array[0];
    if (!array.length)
        throw new Error('Empty array provided to "pickRandom"');
    return array[Math.floor(Math.random() * array.length)];
}
utils.pickRandom = pickRandom;
const prototypeFunctionMap = new WeakMap();
function getObjectFunctionProperties(object) {
    if (prototypeFunctionMap.has(object))
        return prototypeFunctionMap.get(object);
    const functionKeys = new Set();
    for (const key of Reflect.ownKeys(object)) {
        if (key === 'constructor') {
            continue;
        }
        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor &&
            typeof descriptor.value === 'function' &&
            !descriptor.get &&
            !descriptor.set &&
            descriptor.writable &&
            !Object.prototype[key] &&
            !Object[key] &&
            !isClass(descriptor.value)) {
            functionKeys.add(key);
        }
    }
    prototypeFunctionMap.set(object, functionKeys);
    return functionKeys;
}
utils.getObjectFunctionProperties = getObjectFunctionProperties;
const prototypeHierarchyCache = new WeakMap();
function getPrototypeHierarchy(self) {
    const hierarchy = [];
    let object = self;
    do {
        hierarchy.unshift(object);
        if (prototypeHierarchyCache.has(object)) {
            return prototypeHierarchyCache.get(object).concat(hierarchy);
        }
        object = Reflect.getPrototypeOf(object);
    } while (object && object !== Object.prototype);
    // don't put in the last item
    for (let i = 0; i < hierarchy.length - 1; i += 1) {
        const entry = hierarchy[i];
        const ancestors = i > 0 ? hierarchy.slice(0, i) : [];
        prototypeHierarchyCache.set(entry, ancestors);
    }
    return hierarchy;
}
utils.getPrototypeHierarchy = getPrototypeHierarchy;
function bindFunctions(self) {
    const hierarchy = getPrototypeHierarchy(self);
    for (const tier of hierarchy) {
        const keys = getObjectFunctionProperties(tier);
        for (const key of keys) {
            self[key] = self[key].bind(self);
        }
    }
}
utils.bindFunctions = bindFunctions;
function createPromise(timeoutMillis, timeoutMessage) {
    return new Resolvable_1.default(timeoutMillis, timeoutMessage);
}
utils.createPromise = createPromise;

var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TypedEventEmitter_logger;
Object.defineProperty(TypedEventEmitter$1, "__esModule", { value: true });
const events_1 = require$$0__default$2["default"];
const IPendingWaitEvent_1 = IPendingWaitEvent;
const utils_1 = utils;
class TypedEventEmitter extends events_1.EventEmitter {
    constructor() {
        super();
        this.storeEventsWithoutListeners = false;
        _TypedEventEmitter_logger.set(this, void 0);
        this.pendingIdCounter = 0;
        this.pendingWaitEventsById = new Map();
        this.eventsToLog = new Set();
        this.storedEventsByType = new Map();
        this.reemitterCountByEventType = {};
        this.defaultErrorLogger = this.defaultErrorLogger.bind(this);
        if ('captureRejections' in this)
            this.captureRejections = true;
        // add an error logger as a backup
        super.on('error', this.defaultErrorLogger);
    }
    cancelPendingEvents(message, excludeEvents) {
        this.storedEventsByType.clear();
        const events = [...this.pendingWaitEventsById.values()];
        this.pendingWaitEventsById.clear();
        while (events.length) {
            const event = events.shift();
            if (excludeEvents && excludeEvents.includes(event.event)) {
                this.pendingWaitEventsById.set(event.id, event);
                continue;
            }
            if (message)
                event.error.message = message;
            // catch unhandled rejections here: eslint-disable-next-line promise/no-promise-in-callback
            event.resolvable.promise.catch(() => null);
            event.resolvable.reject(event.error);
        }
    }
    setEventsToLog(logger, events) {
        __classPrivateFieldSet(this, _TypedEventEmitter_logger, logger, "f");
        this.eventsToLog = new Set(events);
    }
    waitOn(eventType, listenerFn, timeoutMillis = 30e3) {
        const promise = (0, utils_1.createPromise)(timeoutMillis ?? 30e3, `Timeout waiting for ${String(eventType)}`);
        this.pendingIdCounter += 1;
        const id = this.pendingIdCounter;
        this.pendingWaitEventsById.set(id, {
            id,
            event: eventType,
            resolvable: promise,
            error: new IPendingWaitEvent_1.CanceledPromiseError(`Event (${String(eventType)}) canceled`),
        });
        const messageId = __classPrivateFieldGet(this, _TypedEventEmitter_logger, "f")?.stats?.(`waitOn:${String(eventType)}`, {
            timeoutMillis,
        });
        const callbackFn = (result) => {
            // give the listeners a second to register
            if (!listenerFn || listenerFn.call(this, result)) {
                __classPrivateFieldGet(this, _TypedEventEmitter_logger, "f")?.stats?.(`waitOn.resolve:${String(eventType)}`, {
                    parentLogId: messageId,
                });
                promise.resolve(result);
            }
        };
        this.on(eventType, callbackFn);
        return promise.promise.finally(() => {
            this.off(eventType, callbackFn);
            this.pendingWaitEventsById.delete(id);
        });
    }
    addEventEmitter(emitter, eventTypes) {
        var _a, _b;
        const listeners = [];
        for (const eventName of eventTypes) {
            const handler = emitter.emit.bind(emitter, eventName);
            listeners.push({ handler, eventName, emitter: this });
            super.on(eventName, handler);
            (_a = this.reemitterCountByEventType)[_b = eventName] ?? (_a[_b] = 0);
            this.reemitterCountByEventType[eventName] += 1;
        }
        return listeners;
    }
    on(eventType, listenerFn, includeUnhandledEvents = false) {
        super.on(eventType, listenerFn);
        // if we're adding an error logger, we can remove the default logger
        if (eventType === 'error' && listenerFn !== this.defaultErrorLogger) {
            super.off('error', this.defaultErrorLogger);
        }
        this.onEventListenerAdded?.(eventType);
        return this.replayOrClearMissedEvents(includeUnhandledEvents, eventType);
    }
    off(eventType, listenerFn) {
        // if we're adding an error logger, we can remove the default logger
        if (eventType === 'error' && listenerFn !== this.defaultErrorLogger) {
            super.on('error', this.defaultErrorLogger);
        }
        return super.off(eventType, listenerFn);
    }
    once(eventType, listenerFn, includeUnhandledEvents = false) {
        super.once(eventType, listenerFn);
        this.onEventListenerAdded?.(eventType);
        return this.replayOrClearMissedEvents(includeUnhandledEvents, eventType);
    }
    emit(eventType, event, sendInitiator) {
        const listeners = super.listenerCount(eventType);
        if (this.storeEventsWithoutListeners && !listeners) {
            if (!this.storedEventsByType.has(eventType))
                this.storedEventsByType.set(eventType, []);
            this.storedEventsByType.get(eventType).push(event);
            return false;
        }
        this.logEvent(eventType, event);
        if (sendInitiator)
            return super.emit(eventType, event, sendInitiator);
        return super.emit(eventType, event);
    }
    addListener(eventType, listenerFn, includeUnhandledEvents = false) {
        return this.on(eventType, listenerFn, includeUnhandledEvents);
    }
    removeListener(eventType, listenerFn) {
        return super.removeListener(eventType, listenerFn);
    }
    prependListener(eventType, listenerFn, includeUnhandledEvents = false) {
        super.prependListener(eventType, listenerFn);
        return this.replayOrClearMissedEvents(includeUnhandledEvents, eventType);
    }
    prependOnceListener(eventType, listenerFn, includeUnhandledEvents = false) {
        super.prependOnceListener(eventType, listenerFn);
        return this.replayOrClearMissedEvents(includeUnhandledEvents, eventType);
    }
    defaultErrorLogger(error) {
        if (__classPrivateFieldGet(this, _TypedEventEmitter_logger, "f"))
            __classPrivateFieldGet(this, _TypedEventEmitter_logger, "f").error('EventListenerError', error);
        else
            console.warn('EventListenerError', error);
    }
    replayOrClearMissedEvents(shouldReplay, eventType) {
        const events = this.storedEventsByType.get(eventType);
        if (!events || !events.length)
            return this;
        this.storedEventsByType.delete(eventType);
        if (shouldReplay) {
            for (const event of events) {
                this.logEvent(eventType, event);
                super.emit(eventType, event);
            }
        }
        return this;
    }
    logEvent(eventType, event) {
        if (this.eventsToLog.has(eventType)) {
            let data = event;
            if (eventType) {
                if (typeof event === 'object') {
                    if (event.toJSON) {
                        data = event.toJSON();
                    }
                    else {
                        data = { ...event };
                        for (const [key, val] of Object.entries(data)) {
                            if (!val)
                                continue;
                            if (val.toJSON) {
                                data[key] = val.toJSON();
                            }
                        }
                    }
                }
            }
            __classPrivateFieldGet(this, _TypedEventEmitter_logger, "f")?.stats?.(`emit:${String(eventType)}`, data);
        }
    }
}
TypedEventEmitter$1.default = TypedEventEmitter;
_TypedEventEmitter_logger = new WeakMap();

Object.defineProperty(eventUtils, "__esModule", { value: true });
eventUtils.TypedEventEmitter = void 0;
const TypedEventEmitter_1 = TypedEventEmitter$1;
eventUtils.TypedEventEmitter = TypedEventEmitter_1.default;

Object.defineProperty(EmittingTransportToCore$1, "__esModule", { value: true });
requireSourceMapSupport();
const eventUtils_1$1 = eventUtils;
class EmittingTransportToCore extends eventUtils_1$1.TypedEventEmitter {
    constructor() {
        super(...arguments);
        this.host = 'direct';
        this.isConnected = true;
    }
    send(message) {
        this.emit('outbound', message);
        return Promise.resolve();
    }
}
EmittingTransportToCore$1.default = EmittingTransportToCore;

var EmittingTransportToClient$1 = {};

Object.defineProperty(EmittingTransportToClient$1, "__esModule", { value: true });
requireSourceMapSupport();
const eventUtils_1 = eventUtils;
let counter = 0;
class EmittingTransportToClient extends eventUtils_1.TypedEventEmitter {
    constructor() {
        super(...arguments);
        this.remoteId = String((counter += 1));
    }
    send(message) {
        this.emit('outbound', message);
        return Promise.resolve();
    }
}
EmittingTransportToClient$1.default = EmittingTransportToClient;

Object.defineProperty(TransportBridge$1, "__esModule", { value: true });
const TypeSerializer_1 = TypeSerializer$1;
const EmittingTransportToCore_1 = EmittingTransportToCore$1;
const EmittingTransportToClient_1 = EmittingTransportToClient$1;
class TransportBridge {
    constructor(shouldSerialize = false, serializationMarker = 'DIRECT') {
        this.shouldSerialize = shouldSerialize;
        this.serializationMarker = serializationMarker;
        this.transportToClient = new EmittingTransportToClient_1.default();
        this.transportToCore = new EmittingTransportToCore_1.default();
        this.transportToClient.on('outbound', (msg) => this.sendToTransport(msg, this.transportToCore));
        this.transportToCore.on('outbound', (msg) => this.sendToTransport(msg, this.transportToClient));
    }
    async sendToTransport(message, transport) {
        await new Promise(process.nextTick);
        if (this.shouldSerialize) {
            message = TypeSerializer_1.default.parse(TypeSerializer_1.default.stringify(message), this.serializationMarker);
        }
        transport.emit('message', message);
    }
}
var _default = TransportBridge$1.default = TransportBridge;

var ShutdownHandler$1 = {exports: {}};

var Logger = {};

Object.defineProperty(Logger, "__esModule", { value: true });
Logger.registerNamespaceMapping = Logger.injectLogger = Logger.hasBeenLoggedSymbol = Logger.loggerSessionIdNames = Logger.LogEvents = Logger.Log = Logger.translateToPrintable = void 0;
// eslint-disable-next-line max-classes-per-file
const util_1 = require$$0__default$3["default"];
const hasBeenLoggedSymbol = Symbol.for('hasBeenLogged');
Logger.hasBeenLoggedSymbol = hasBeenLoggedSymbol;
const logFilters = {
    envValue: null,
    active: [],
    skip: [],
    namespaces: { active: new Set(), inactive: new Set() },
    enabledNamesCache: {},
};
let logId = 0;
class Log {
    constructor(module, boundContext) {
        this.useColors = process.env.NODE_DISABLE_COLORS !== 'true' && process.env.NODE_DISABLE_COLORS !== '1';
        this.boundContext = {};
        this.module = module ? extractPathFromModule(module) : '';
        if (boundContext)
            this.boundContext = boundContext;
        this.level = isEnabled(this.module) ? 'stats' : 'error';
    }
    stats(action, data) {
        return this.log('stats', action, data);
    }
    info(action, data) {
        return this.log('info', action, data);
    }
    warn(action, data) {
        return this.log('warn', action, data);
    }
    error(action, data) {
        return this.log('error', action, data);
    }
    createChild(module, boundContext) {
        const Constructor = this.constructor;
        // @ts-ignore
        return new Constructor(module, {
            ...this.boundContext,
            ...boundContext,
        });
    }
    flush() {
        // no-op
    }
    logToConsole(level, entry) {
        const printablePath = entry.module.replace('.js', '').replace('.ts', '').replace('build/', '');
        const { error, printData } = translateToPrintable(entry.data);
        if (level === 'warn' || level === 'error') {
            printData.sessionId = entry.sessionId;
            printData.sessionName = loggerSessionIdNames.get(entry.sessionId) ?? undefined;
        }
        const params = Object.keys(printData).length ? [printData] : [];
        if (error)
            params.push(error);
        // eslint-disable-next-line no-console
        console.log(`${entry.timestamp.toISOString()} ${entry.level.toUpperCase()} [${printablePath}] ${entry.action}`, ...params.map(x => (0, util_1.inspect)(x, false, null, this.useColors)));
    }
    log(level, action, data) {
        let logData;
        let sessionId = this.boundContext.sessionId;
        let parentId;
        const mergedData = { ...data, context: this.boundContext };
        if (mergedData) {
            for (const [key, val] of Object.entries(mergedData)) {
                if (key === 'parentLogId')
                    parentId = val;
                else if (key === 'sessionId')
                    sessionId = val;
                else {
                    if (!logData)
                        logData = {};
                    logData[key] = val;
                }
            }
        }
        logId += 1;
        const id = logId;
        const entry = {
            id,
            sessionId,
            parentId,
            timestamp: new Date(),
            action,
            data: logData,
            level,
            module: this.module,
        };
        if (logLevels[level] >= logLevels[this.level]) {
            this.logToConsole(level, entry);
        }
        LogEvents.broadcast(entry);
        return id;
    }
}
Logger.Log = Log;
function translateValueToPrintable(value, depth = 0) {
    if (value === undefined || value === null)
        return;
    if (value instanceof Error) {
        return value.toString();
    }
    if (value instanceof RegExp) {
        return `/${value.source}/${value.flags}`;
    }
    if (value instanceof BigInt || typeof value === 'bigint') {
        return `${value.toString()}n`;
    }
    if (Buffer.isBuffer(value)) {
        if (value.length <= 256)
            return `0x${value.toString('hex')}`;
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    if (depth > 2)
        return value;
    if (value.toJSON) {
        return value.toJSON();
    }
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(x => translateValueToPrintable(x, depth + 1));
        }
        const result = {};
        for (const [key, subValue] of Object.entries(value)) {
            result[key] = translateValueToPrintable(subValue, depth + 1);
        }
        return result;
    }
}
function translateToPrintable(data, result) {
    result ?? (result = { printData: {} });
    const { printData } = result;
    for (const [key, value] of Object.entries(data)) {
        if (value instanceof Error) {
            Object.defineProperty(value, hasBeenLoggedSymbol, {
                enumerable: false,
                value: true,
            });
            result.error = value;
            continue;
        }
        if (key === 'error') {
            if (typeof value === 'object') {
                const { message, ...rest } = value;
                result.error = new Error(message);
                if ('stack' in value)
                    result.error.stack = value.stack;
                if ('name' in value)
                    result.error.name = value.name;
                Object.assign(result.error, rest);
            }
            else if (typeof value === 'string') {
                result.error = new Error(value);
            }
            continue;
        }
        const printable = translateValueToPrintable(value);
        if (printable === null || printable === undefined)
            continue;
        printData[key] = printable;
    }
    return result;
}
Logger.translateToPrintable = translateToPrintable;
const logLevels = { stats: 0, info: 1, warn: 2, error: 3 };
commonjsGlobal.UlixeeLogCreator = (module) => {
    const log = new Log(module);
    return {
        log,
    };
};
function logger(module) {
    return commonjsGlobal.UlixeeLogCreator(module);
}
Logger.default = logger;
let idCounter = 0;
const loggerSessionIdNames = new Map();
Logger.loggerSessionIdNames = loggerSessionIdNames;
class LogEvents {
    static unsubscribe(subscriptionId) {
        delete LogEvents.subscriptions[subscriptionId];
    }
    static subscribe(onLogFn) {
        idCounter += 1;
        const id = idCounter;
        LogEvents.subscriptions[id] = onLogFn;
        return id;
    }
    static broadcast(entry) {
        Object.values(LogEvents.subscriptions).forEach(x => x(entry));
    }
}
Logger.LogEvents = LogEvents;
LogEvents.subscriptions = {};
function injectLogger(builder) {
    commonjsGlobal.UlixeeLogCreator = builder;
}
Logger.injectLogger = injectLogger;
function extractPathFromModule(module) {
    const fullPath = typeof module === 'string' ? module : module.filename || module.id || '';
    return fullPath
        .replace(/^(.*)[/\\]unblocked[/\\](.+)$/, '$2')
        .replace(/^(.*)[/\\]ulixee[/\\](.+)$/, '$2')
        .replace(/^(.*)[/\\]payments[/\\](.+)$/, '$2')
        .replace(/^(.*)[/\\]@ulixee[/\\](.+)$/, '$2')
        .replace(/^(.*)[/\\]commons[/\\](.+)$/, '$2')
        .replace(/^.*[/\\]packages[/\\](.+)$/, '$1');
}
/// LOG FILTERING //////////////////////////////////////////////////////////////////////////////////////////////////////
function registerNamespaceMapping(onNamespaceFn) {
    loadNamespaces(process.env.DEBUG);
    for (const ns of logFilters.namespaces.active) {
        onNamespaceFn(ns, logFilters.active, logFilters.skip);
    }
}
Logger.registerNamespaceMapping = registerNamespaceMapping;
function isEnabled(modulePath) {
    if (process.env.ULX_DEBUG === '1' || process.env.ULX_DEBUG === 'true')
        return true;
    if (modulePath in logFilters.enabledNamesCache)
        return logFilters.enabledNamesCache[modulePath];
    if (modulePath[modulePath.length - 1] === '*') {
        return true;
    }
    if (logFilters.namespaces.active.has('*'))
        return true;
    for (const ns of logFilters.skip) {
        if (ns.test(modulePath)) {
            logFilters.enabledNamesCache[modulePath] = false;
            return false;
        }
    }
    for (const ns of logFilters.active) {
        if (ns.test(modulePath)) {
            logFilters.enabledNamesCache[modulePath] = true;
            return true;
        }
    }
    logFilters.enabledNamesCache[modulePath] = false;
    return false;
}
function loadNamespaces(namespaces) {
    if (logFilters.envValue === namespaces)
        return;
    namespaces ?? (namespaces = '');
    logFilters.envValue = namespaces;
    const split = namespaces.split(/[\s,]+/).map(x => x.trim());
    for (const part of split) {
        if (!part)
            continue;
        if (part[0] === '-') {
            logFilters.namespaces.inactive.add(part.slice(1));
        }
        else {
            logFilters.namespaces.active.add(part);
        }
    }
}
registerNamespaceMapping((ns, active, skip) => {
    if (ns.includes('ulx:*') || ns.includes('ulx*') || ns === '*') {
        active.push(/desktop[/-]?.*/, /hero[/-].*/, /agent\/.*/, /plugins\/.*/, /net\/.*/, /cloud\/.*/, /datastore[/-].*/, /mainchain[/-].*/, /sidechain[/-].*/, /ramps[/-].*/, /DevtoolsSessionLogger/);
    }
    else if (ns === 'ulx') {
        active.push(/hero[/-].*/, /agent\/.*/, /plugins\/.*/, /net\/.*/, /cloud\/.*/, /datastore[/-].*/, /mainchain[/-].*/, /sidechain[/-].*/, /ramps[/-].*/);
        skip.push(/desktop[/-]?.*/, /DevtoolsSessionLogger/);
    }
    else if (ns.includes('ulx:desktop')) {
        active.push(/desktop[/-]?.*/);
    }
    else if (ns === 'ulx:mitm') {
        active.push(/agent[/-]mitm.*/);
    }
    else if (ns.includes('ulx:devtools') || ns === '*') {
        active.push(/DevtoolsSessionLogger/);
    }
    else if (ns.includes('hero')) {
        active.push(/^hero[/-].*/, /net\/.*/);
    }
    else if (ns.includes('datastore')) {
        active.push(/^datastore[/-].*/, /net\/.*/);
    }
});

(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const Logger_1 = Logger;
	const IPendingWaitEvent_1 = IPendingWaitEvent;
	const { log } = (0, Logger_1.default)(module);
	class ShutdownHandler {
	    static register(onShutdownFn) {
	        this.registerSignals();
	        const callsite = new Error().stack.split(/\r?\n/).slice(2, 3).shift().trim();
	        this.onShutdownFns.push({ fn: onShutdownFn, callsite });
	    }
	    static unregister(onShutdownFn) {
	        const match = this.onShutdownFns.findIndex(x => x.fn === onShutdownFn);
	        if (match >= 0)
	            this.onShutdownFns.splice(match, 1);
	    }
	    static run() {
	        return this.onSignal('exit', null, true);
	    }
	    static registerSignals() {
	        if (!this.isRegistered) {
	            this.isRegistered = true;
	            process.once('beforeExit', code => ShutdownHandler.onSignal('beforeExit', code));
	            process.once('exit', code => ShutdownHandler.onSignal('exit', code));
	            process.once('SIGTERM', ShutdownHandler.onSignal.bind(this));
	            process.once('SIGINT', ShutdownHandler.onSignal.bind(this));
	            process.once('SIGQUIT', ShutdownHandler.onSignal.bind(this));
	        }
	    }
	    static async onSignal(signal, code, isManual = false) {
	        if (this.disableSignals && !isManual)
	            return;
	        if (this.hasRunHandlers)
	            return;
	        this.hasRunHandlers = true;
	        const parentLogId = log.stats('ShutdownHandler.onSignal', {
	            signal,
	            sessionId: null,
	        });
	        while (this.onShutdownFns.length) {
	            const entry = this.onShutdownFns.shift();
	            log.stats('ShutdownHandler.execute', {
	                signal,
	                fn: entry.fn.toString(),
	                callsite: entry.callsite,
	                sessionId: null,
	            });
	            try {
	                await entry.fn(signal);
	            }
	            catch (error) {
	                if (error instanceof IPendingWaitEvent_1.CanceledPromiseError)
	                    continue;
	                log.warn('ShutdownHandler.errorShuttingDown', {
	                    error,
	                    sessionId: null,
	                });
	            }
	        }
	        log.stats('ShutdownHandler.shutdownComplete', {
	            signal,
	            exiting: this.exitOnSignal,
	            sessionId: null,
	            parentLogId,
	        });
	        if (this.exitOnSignal) {
	            process.exit(code ?? 1);
	        }
	    }
	}
	exports.default = ShutdownHandler;
	ShutdownHandler.exitOnSignal = false;
	ShutdownHandler.disableSignals = false;
	ShutdownHandler.isRegistered = false;
	ShutdownHandler.hasRunHandlers = false;
	ShutdownHandler.onShutdownFns = [];
	
} (ShutdownHandler$1, ShutdownHandler$1.exports));

var ShutdownHandler = /*@__PURE__*/getDefaultExportFromCjs(ShutdownHandler$1.exports);

async function createConnectionToCore(options) {
    const Core = (await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@ulixee/hero-core')); })).default;
    const bridge = new _default();
    Core.addConnection(bridge.transportToClient);
    const connection = new DefaultHero.ConnectionToHeroCore(bridge.transportToCore, { ...options });
    ShutdownHandler.register(() => connection.disconnect());
    return { connection, Core };
}
class LocalHero extends DefaultHero__default["default"] {
    static async create(createOptions = {}) {
        const localCreateOptions = createOptions;
        let connectionOptions;
        if (localCreateOptions.connectionToCore instanceof DefaultHero.ConnectionToHeroCore) {
            connectionOptions = localCreateOptions.connectionToCore.options;
        }
        else {
            connectionOptions = localCreateOptions.connectionToCore;
        }
        const createConnectionResp = await createConnectionToCore(connectionOptions);
        localCreateOptions.connectionToCore = createConnectionResp.connection;
        this.Core = createConnectionResp.Core;
        return new LocalHero(localCreateOptions);
    }
    constructor(createOptions = {}) {
        super(createOptions);
    }
}

class EsportalScraper {
    constructor(options) {
        this.debug = debug__default["default"]('esportal-scraper');
        this.timeout = 2 * 60 * 1000;
        this.useLocalHero = true;
        this.heroOptions = {
            blockedResourceTypes: [],
            ...options?.heroOverrides,
        };
        this.timeout = options?.timeout ?? this.timeout;
        this.debug = options?.logger ?? this.debug;
        this.queue = new PQueue__default["default"]({ concurrency: options?.concurrency ?? 10 });
        this.useLocalHero = options?.useLocalHero ?? this.useLocalHero;
        this.queue.on('add', () => {
            if (this.queue.size) {
                this.debug(`${this.queue.size} requests are currently waiting`);
            }
        });
    }
    async shutdown() {
        if (this.Core) {
            this.debug('Shutting down core');
            await this.Core.shutdown();
            this.Core = undefined;
        }
    }
    async createHero() {
        try {
            this.heroCore = this.heroCore ?? (await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@ulixee/hero-core')); })); // If this doesn't throw, we can create a local Hero
            if (this.heroCore && this.useLocalHero) {
                const localHero = LocalHero.create(this.heroOptions);
                this.Core = LocalHero.Core;
                return localHero;
            }
        }
        catch {
            // continue
        }
        return new DefaultHero__default["default"](this.heroOptions);
    }
    getPlayer(...args) {
        return this.queue.add(() => getPlayer.bind(this)(...args));
    }
}

exports.EsportalScraper = EsportalScraper;
//# sourceMappingURL=index.cjs.js.map
