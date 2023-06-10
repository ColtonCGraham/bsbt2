import React, { useRef, useDebugValue, createElement, useContext } from 'react';

/******************************************************************************
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
/* global Reflect, Promise */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {string} value
 * @param {number} length
 * @param {object[]} children
 * @return {string}
 */
function prefix (value, length, children) {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return WEBKIT + 'print-' + value + value
		// animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
		case 5737: case 4201: case 3177: case 3433: case 1641: case 4457: case 2921:
		// text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
		case 5572: case 6356: case 5844: case 3191: case 6645: case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391: case 5879: case 5623: case 6135: case 4599: case 4855:
		// background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
		case 4215: case 6389: case 5109: case 5365: case 5621: case 3829:
			return WEBKIT + value + value
		// tab-size
		case 4789:
			return MOZ + value + value
		// appearance, user-select, transform, hyphens, text-size-adjust
		case 5349: case 4246: case 4810: case 6968: case 2756:
			return WEBKIT + value + MOZ + value + MS + value + value
		// writing-mode
		case 5936:
			switch (charat(value, length + 11)) {
				// vertical-l(r)
				case 114:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value
				// vertical-r(l)
				case 108:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value
				// horizontal(-)tb
				case 45:
					return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value
				// default: fallthrough to below
			}
		// flex, flex-direction, scroll-snap-type, writing-mode
		case 6828: case 4268: case 2903:
			return WEBKIT + value + MS + value + value
		// order
		case 6165:
			return WEBKIT + value + MS + 'flex-' + value + value
		// align-items
		case 5187:
			return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value
		// align-self
		case 5443:
			return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/g, '') + (!match(value, /flex-|baseline/) ? MS + 'grid-row-' + replace(value, /flex-|-self/g, '') : '') + value
		// align-content
		case 4675:
			return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/g, '') + value
		// flex-shrink
		case 5548:
			return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value
		// flex-basis
		case 5292:
			return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value
		// flex-grow
		case 6060:
			return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value
		// transition
		case 4554:
			return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value
		// cursor
		case 6187:
			return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value
		// background, background-image
		case 5495: case 3959:
			return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1')
		// justify-content
		case 4968:
			return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value
		// justify-self
		case 4200:
			if (!match(value, /flex-|baseline/)) return MS + 'grid-column-align' + substr(value, length) + value
			break
		// grid-template-(columns|rows)
		case 2592: case 3360:
			return MS + replace(value, 'template-', '') + value
		// grid-(row|column)-start
		case 4384: case 3616:
			if (children && children.some(function (element, index) { return length = index, match(element.props, /grid-\w+-end/) })) {
				return ~indexof(value + (children = children[length].value), 'span') ? value : (MS + replace(value, '-start', '') + value + MS + 'grid-row-span:' + (~indexof(children, 'span') ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ';')
			}
			return MS + replace(value, '-start', '') + value
		// grid-(row|column)-end
		case 4896: case 4128:
			return (children && children.some(function (element) { return match(element.props, /grid-\w+-start/) })) ? value : MS + replace(replace(value, '-end', '-span'), 'span ', '') + value
		// (margin|padding)-inline-(start|end)
		case 4095: case 3583: case 4068: case 2532:
			return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value
		// (min|max)?(width|height|inline-size|block-size)
		case 8116: case 7059: case 5753: case 5535:
		case 5445: case 5701: case 4933: case 4677:
		case 5533: case 5789: case 5021: case 4765:
			// stretch, max-content, min-content, fill-available
			if (strlen(value) - 1 - length > 6)
				switch (charat(value, length + 1)) {
					// (m)ax-content, (m)in-content
					case 109:
						// -
						if (charat(value, length + 4) !== 45)
							break
					// (f)ill-available, (f)it-content
					case 102:
						return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value
					// (s)tretch
					case 115:
						return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length, children) + value : value
				}
			break
		// grid-(column|row)
		case 5152: case 5920:
			return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function (_, a, b, c, d, e, f) { return (MS + a + ':' + b + f) + (c ? (MS + a + '-span:' + (d ? e : +e - +b)) + f : '') + value })
		// position: sticky
		case 4949:
			// stick(y)?
			if (charat(value, length + 6) === 121)
				return replace(value, ':', ':' + WEBKIT) + value
			break
		// display: (flex|inline-flex|grid|inline-grid)
		case 6444:
			switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
				// (inline-)?fle(x)
				case 120:
					return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value
				// (inline-)?gri(d)
				case 100:
					return replace(value, ':', ':' + MS) + value
			}
			break
		// scroll-margin, scroll-margin-(top|right|bottom|left)
		case 5719: case 2647: case 2135: case 3927: case 2391:
			return replace(value, 'scroll-', 'scroll-snap-') + value
	}

	return value
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 */
function prefixer (element, index, children, callback) {
	if (element.length > -1)
		if (!element.return)
			switch (element.type) {
				case DECLARATION: element.return = prefix(element.value, element.length, children);
					return
				case KEYFRAMES:
					return serialize([copy(element, {value: replace(element.value, '@', '@' + WEBKIT)})], callback)
				case RULESET:
					if (element.length)
						return combine(element.props, function (value) {
							switch (match(value, /(::plac\w+|:read-\w+)/)) {
								// :read-(only|write)
								case ':read-only': case ':read-write':
									return serialize([copy(element, {props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]})], callback)
								// :placeholder
								case '::placeholder':
									return serialize([
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]}),
										copy(element, {props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]})
									], callback)
							}

							return ''
						})
			}
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var h="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",m=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!==process.env.NODE_ENV),v=/invalid hook call/i,g=new Set,S=function(t,n){if("production"!==process.env.NODE_ENV){var o=n?' with the id of "'.concat(n,'"'):"",s="The component ".concat(t).concat(o," has been created dynamically.\n")+"You may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",i=console.error;try{var a=!0;console.error=function(t){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];v.test(t)?(a=!1,g.delete(s)):i.apply(void 0,__spreadArray([t],n,!1));},useRef(),a&&!g.has(s)&&(console.warn(s),g.add(s));}catch(e){v.test(e.message)&&g.delete(s);}finally{console.error=i;}}},w=Object.freeze([]),b=Object.freeze({});function E(e,t,n){return void 0===n&&(n=b),e.theme!==n.theme&&e.theme||t||n.theme}var N=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),P=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,_=/(^-|-$)/g;function C(e){return e.replace(P,"-").replace(_,"")}var I=/(a)(d)/gi,A=function(e){return String.fromCharCode(e+(e>25?39:97))};function O(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=A(t%52)+n;return (A(t%52)+n).replace(I,"$1-$2")}var R,D=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},T=function(e){return D(5381,e)};function j(e){return O(T(e)>>>0)}function x(e){return "production"!==process.env.NODE_ENV&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function k(e){return "string"==typeof e&&("production"===process.env.NODE_ENV||e.charAt(0)===e.charAt(0).toLowerCase())}var V="function"==typeof Symbol&&Symbol.for,F=V?Symbol.for("react.memo"):60115,M=V?Symbol.for("react.forward_ref"):60112,$={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},z={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},B={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},G=((R={})[M]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},R[F]=B,R);function L(e){return ("type"in(t=e)&&t.type.$$typeof)===F?B:"$$typeof"in e?G[e.$$typeof]:$;var t;}var Y=Object.defineProperty,W=Object.getOwnPropertyNames,q=Object.getOwnPropertySymbols,H=Object.getOwnPropertyDescriptor,U=Object.getPrototypeOf,J=Object.prototype;function X(e,t,n){if("string"!=typeof t){if(J){var r=U(t);r&&r!==J&&X(e,r,n);}var o=W(t);q&&(o=o.concat(q(t)));for(var s=L(e),i=L(t),a=0;a<o.length;++a){var c=o[a];if(!(c in z||n&&n[c]||i&&c in i||s&&c in s)){var l=H(t,c);try{Y(e,c,l);}catch(e){}}}}return e}function Z(e){return "function"==typeof e}function K(e){return "object"==typeof e&&"styledComponentId"in e}function Q(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ee(e,t){if(0===e.length)return "";for(var n=e[0],r=1;r<e.length;r++)n+=t?t+e[r]:e[r];return n}function te(e){return null!==e&&"object"==typeof e&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function ne(e,t,n){if(void 0===n&&(n=!1),!n&&!te(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=ne(e[r],t[r]);else if(te(t))for(var r in t)e[r]=ne(e[r],t[r]);return e}var re="production"!==process.env.NODE_ENV?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:{};function oe(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n=e[0],r=[],o=1,s=e.length;o<s;o+=1)r.push(e[o]);return r.forEach(function(e){n=n.replace(/%[a-z]/,e);}),n}function se(t){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return "production"===process.env.NODE_ENV?new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(n.length>0?" Args: ".concat(n.join(", ")):"")):new Error(oe.apply(void 0,__spreadArray([re[t]],n,!1)).trim())}var ie=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e;}return e.prototype.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)if((o<<=1)<0)throw se(16,"".concat(e));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0;}for(var i=this.indexOfGroup(e+1),a=(s=0,t.length);s<a;s++)this.tag.insertRule(i,t[s])&&(this.groupSizes[e]++,i++);},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n);}},e.prototype.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+="".concat(this.tag.getRule(s)).concat("/*!sc*/\n");return t},e}(),ae=new Map,ce=new Map,le=1,ue=function(e){if(ae.has(e))return ae.get(e);for(;ce.has(le);)le++;var t=le++;if("production"!==process.env.NODE_ENV&&((0|t)<0||t>1073741824))throw se(16,"".concat(t));return ae.set(e,t),ce.set(t,e),t},pe=(function(e){for(var t=e.getTag(),n=t.length,r="",o=function(n){var o=function(e){return ce.get(e)}(n);if(void 0===o)return "continue";var s=e.names.get(o),i=t.getGroup(n);if(void 0===s||0===i.length)return "continue";var a="".concat(h,".g").concat(n,'[id="').concat(o,'"]'),c="";void 0!==s&&s.forEach(function(e){e.length>0&&(c+="".concat(e,","));}),r+="".concat(i).concat(a,'{content:"').concat(c,'"}').concat("/*!sc*/\n");},s=0;s<n;s++)o(s);return r});function de(){return "undefined"!=typeof __webpack_nonce__?__webpack_nonce__:null}var he=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(h))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(h,"active"),r.setAttribute("data-styled-version","6.0.0-rc.3");var i=de();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},fe=function(){function e(e){this.element=he(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}throw se(17)}(this.element),this.length=0;}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return !1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--;},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:""},e}(),me=function(){function e(e){this.element=he(e),this.nodes=this.element.childNodes,this.length=0;}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return !1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),ye=function(){function e(e){this.rules=[],this.length=0;}return e.prototype.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--;},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),ve={isServer:!0,useCSSOMInjection:!m},ge=function(){function e(e,n,r){void 0===e&&(e=b),void 0===n&&(n={}),this.options=__assign(__assign({},ve),e),this.gs=n,this.names=new Map(r),this.server=!!e.isServer;}return e.registerId=function(e){return ue(e)},e.prototype.reconstructWithOptions=function(n,r){return void 0===r&&(r=!0),new e(__assign(__assign({},this.options),n),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new ye(n):t?new fe(n):new me(n)}(this.options),new ie(e)));var e;},e.prototype.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},e.prototype.registerName=function(e,t){if(ue(e),this.names.has(e))this.names.get(e).add(t);else {var n=new Set;n.add(t),this.names.set(e,n);}},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(ue(e),n);},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear();},e.prototype.clearRules=function(e){this.getTag().clearGroup(ue(e)),this.clearNames(e);},e.prototype.clearTag=function(){this.tag=void 0;},e.prototype.toString=function(){return pe(this)},e}(),Se=/&/g,we=/^\s*\/\/.*$/gm;function be(e,t){return e.map(function(e){return "rule"===e.type&&(e.value="".concat(t," ").concat(e.value),e.value=e.value.replaceAll(",",",".concat(t," ")),e.props=e.props.map(function(e){return "".concat(t," ").concat(e)})),Array.isArray(e.children)&&"@keyframes"!==e.type&&(e.children=be(e.children,t)),e})}function Ee(e){var t,n,r,o=void 0===e?b:e,s=o.options,i=void 0===s?b:s,a=o.plugins,c=void 0===a?w:a,l=function(e,r,o){return o===n||o.startsWith(n)&&o.endsWith(n)&&o.replaceAll(n,"").length>0?".".concat(t):e},u=c.slice();u.push(function(e){e.type===RULESET&&e.value.includes("&")&&(e.props[0]=e.props[0].replace(Se,n).replace(r,l));}),i.prefix&&u.push(prefixer),u.push(stringify);var d=function(e,o,s,a){void 0===o&&(o=""),void 0===s&&(s=""),void 0===a&&(a="&"),t=a,n=o,r=new RegExp("\\".concat(n,"\\b"),"g");var c=e.replace(we,""),l=compile(s||o?"".concat(s," ").concat(o," { ").concat(c," }"):c);i.namespace&&(l=be(l,i.namespace));var d=[];return serialize(l,middleware(u.concat(rulesheet(function(e){return d.push(e)})))),d};return d.hash=c.length?c.reduce(function(e,t){return t.name||se(15),D(e,t.name)},5381).toString():"",d}var Ne=new ge,Pe=Ee(),_e=React.createContext({shouldForwardProp:void 0,styleSheet:Ne,stylis:Pe});_e.Consumer;React.createContext(void 0);function Ae(){return useContext(_e)}var Re=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=Pe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"));},this.toString=function(){throw se(12,String(n.name))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=t;}return e.prototype.getName=function(e){return void 0===e&&(e=Pe),this.name+e.hash},e}(),De=function(e){return e>="A"&&e<="Z"};function Te(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(1===n&&"-"===r&&"-"===e[0])return e;De(r)?t+="-"+r.toLowerCase():t+=r;}return t.startsWith("ms-")?"-"+t:t}var je=function(e){return null==e||!1===e||""===e},xe=function(t){var n,r,o=[];for(var s in t){var i=t[s];t.hasOwnProperty(s)&&!je(i)&&(Array.isArray(i)&&i.isCss||Z(i)?o.push("".concat(Te(s),":"),i,";"):te(i)?o.push.apply(o,__spreadArray(__spreadArray(["".concat(s," {")],xe(i),!1),["}"],!1)):o.push("".concat(Te(s),": ").concat((n=s,null==(r=i)||"boolean"==typeof r||""===r?"":"number"!=typeof r||0===r||n in unitlessKeys||n.startsWith("--")?String(r).trim():"".concat(r,"px")),";")));}return o};function ke(e,t,n,r){if(je(e))return [];if(K(e))return [".".concat(e.styledComponentId)];if(Z(e)){if(!Z(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return [e];var o=e(t);return "production"===process.env.NODE_ENV||"object"!=typeof o||Array.isArray(o)||o instanceof Re||te(o)||null===o||console.error("".concat(x(e)," is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")),ke(o,t,n,r)}var s;return e instanceof Re?n?(e.inject(n,r),[e.getName(r)]):[e]:te(e)?xe(e):Array.isArray(e)?e.flatMap(function(e){return ke(e,t,n,r)}):[e.toString()]}function Ve(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Z(n)&&!K(n))return !1}return !0}var Fe=T("6.0.0-rc.3"),Me=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic="production"===process.env.NODE_ENV&&(void 0===n||n.isStatic)&&Ve(e),this.componentId=t,this.baseHash=D(Fe,t),this.baseStyle=n,ge.registerId(t);}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Q(r,this.staticRulesId);else {var o=ee(ke(this.rules,e,t,n)),s=O(D(this.baseHash,o)>>>0);if(!t.hasNameForId(this.componentId,s)){var i=n(o,".".concat(s),void 0,this.componentId);t.insertRules(this.componentId,s,i);}r=Q(r,s),this.staticRulesId=s;}else {for(var a=D(this.baseHash,n.hash),c="",l=0;l<this.rules.length;l++){var u=this.rules[l];if("string"==typeof u)c+=u,"production"!==process.env.NODE_ENV&&(a=D(a,u));else if(u){var p=ee(ke(u,e,t,n));a=D(a,p),c+=p;}}if(c){var d=O(a>>>0);t.hasNameForId(this.componentId,d)||t.insertRules(this.componentId,d,n(c,".".concat(d),void 0,this.componentId)),r=Q(r,d);}}return r},e}(),$e=React.createContext(void 0);$e.Consumer;function Be(){return useContext($e)}var Le={};function Ye(e,r,o){var s,i=K(e),a=e,u=!k(e),p=r.componentId,d=void 0===p?function(e,t){var n="string"!=typeof e?"sc":C(e);Le[n]=(Le[n]||0)+1;var r="".concat(n,"-").concat(j("6.0.0-rc.3"+n+Le[n]));return t?"".concat(t,"-").concat(r):r}(r.displayName,r.parentComponentId):p,h=r.displayName,f=void 0===h?function(e){return k(e)?"styled.".concat(e):"Styled(".concat(x(e),")")}(e):h,m=null!==(s=r.attrs)&&void 0!==s?s:[],y=r.displayName&&r.componentId?"".concat(C(r.displayName),"-").concat(r.componentId):r.componentId||d,v=i&&a.attrs?a.attrs.concat(m).filter(Boolean):m,g=r.shouldForwardProp;if(i&&a.shouldForwardProp){var w=a.shouldForwardProp;if(r.shouldForwardProp){var P=r.shouldForwardProp;g=function(e,t){return w(e,t)&&P(e,t)};}else g=w;}var _=new Me(o,y,i?a.componentStyle:void 0),I=_.isStatic&&0===m.length;function A(e,n){return function(e,n,r,o){var s=e.attrs,i=e.componentStyle,a=e.defaultProps,u=e.foldedComponentIds,p=e.styledComponentId,d=e.target,h=Be(),f=Ae(),m=e.shouldForwardProp||f.shouldForwardProp;"production"!==process.env.NODE_ENV&&useDebugValue(p);var y=function(e,n,r){for(var o,s=__assign(__assign({},n),{className:void 0,theme:r}),i=0;i<e.length;i+=1){var a=Z(o=e[i])?o(s):o;for(var c in a)s[c]="className"===c?Q(s[c],a[c]):"style"===c?__assign(__assign({},s[c]),a[c]):a[c];}return n.className&&(s.className=Q(s.className,n.className)),s}(s,n,E(n,h,a)||b),v=y.as||d,g={};for(var S in y)void 0===y[S]||"$"===S[0]||"as"===S||"theme"===S||("forwardedAs"===S?g.as=y.forwardedAs:m&&!m(S,v)||(g[S]=y[S]));var w=function(e,t,n){var r=Ae(),o=e.generateAndInjectStyles(t?b:n,r.styleSheet,r.stylis);return "production"!==process.env.NODE_ENV&&useDebugValue(o),o}(i,o,y);"production"!==process.env.NODE_ENV&&!o&&e.warnTooManyClasses&&e.warnTooManyClasses(w);var P=Q(u,p);return w&&(P+=" "+w),y.className&&(P+=" "+y.className),g[k(v)&&!N.has(v)?"class":"className"]=P,g.ref=r,createElement(v,g)}(O,e,n,I)}A.displayName=f;var O=React.forwardRef(A);return O.attrs=v,O.componentStyle=_,O.displayName=f,O.shouldForwardProp=g,O.foldedComponentIds=i?Q(a.foldedComponentIds,a.styledComponentId):"",O.styledComponentId=y,O.target=i?a.target:e,Object.defineProperty(O,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=i?function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];for(var r=0,o=t;r<o.length;r++)ne(e,o[r],!0);return e}({},a.defaultProps,e):e;}}),"production"!==process.env.NODE_ENV&&(S(f,y),O.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'.concat(t,'"'):"";console.warn("Over ".concat(200," classes were generated for component ").concat(e).concat(s,".\n")+"Consider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={};}}}(f,y)),Object.defineProperty(O,"toString",{value:function(){return ".".concat(O.styledComponentId)}}),u&&X(O,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),O}function We(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var qe=function(e){return Object.assign(e,{isCss:!0})};function He(t){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];if(Z(t)||te(t)){var o=t;return qe(ke(We(w,__spreadArray([o],n,!0))))}var s=t;return 0===n.length&&1===s.length&&"string"==typeof s[0]?ke(s):qe(ke(We(s,n)))}function Ue(n,r,o){if(void 0===o&&(o=b),!r)throw se(1,r);var s=function(t){for(var s=[],i=1;i<arguments.length;i++)s[i-1]=arguments[i];return n(r,o,He.apply(void 0,__spreadArray([t],s,!1)))};return s.attrs=function(e){return Ue(n,r,__assign(__assign({},o),{attrs:Array.prototype.concat(o.attrs,e).filter(Boolean)}))},s.withConfig=function(e){return Ue(n,r,__assign(__assign({},o),e))},s}function Je(e){return Ue(Ye,e)}var Xe=Je;N.forEach(function(e){Xe[e]=Je(e);});"production"!==process.env.NODE_ENV&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"),"production"!==process.env.NODE_ENV&&process;

var StyledButton = Xe.button(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n  border: 0;\n  line-height: 1;\n  font-size: 15px;\n  cursor: pointer;\n  font-weight: 700;\n  font-weight: bold;\n  border-radius: 3px;\n  display: inline-block;\n\n  padding: ", ";\n  color: ", ";\n  background-color: ", ";\n  opacity: ", ";\n  cursor: ", ";\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    border: solid 2px #1b116e;\n    padding: ", ";\n  }\n"], ["\n  border: 0;\n  line-height: 1;\n  font-size: 15px;\n  cursor: pointer;\n  font-weight: 700;\n  font-weight: bold;\n  border-radius: 3px;\n  display: inline-block;\n\n  padding: ", ";\n  color: ", ";\n  background-color: ", ";\n  opacity: ", ";\n  cursor: ", ";\n  &:hover {\n    background-color: ", ";\n  }\n  &:active {\n    border: solid 2px #1b116e;\n    padding: ", ";\n  }\n"])), function (props) {
    return props.size === "small"
        ? "7px 25px 8px"
        : props.size === "medium"
            ? "9px 30px 11px"
            : "14px 30px 16px";
}, function (props) { return (props.primary ? "#1b116e" : "#ffffff"); }, function (props) { return (props.primary ? "#6bedb5" : "#1b116e"); }, function (props) { return (props.disabled ? 0.5 : 1); }, function (props) { return (props.disabled ? "not-allowed" : "default"); }, function (props) { return (props.disabled ? "" : "#6bedb5"); }, function (props) {
    return props.size === "small"
        ? "5px 23px 6px"
        : props.size === "medium"
            ? "7px 28px 9px"
            : "12px 28px 14px";
});
var Button = function (_a) {
    var size = _a.size, primary = _a.primary, disabled = _a.disabled, text = _a.text, onClick = _a.onClick, props = __rest(_a, ["size", "primary", "disabled", "text", "onClick"]);
    return (React.createElement(StyledButton, __assign({ type: "button", onClick: onClick, primary: primary, disabled: disabled, size: size }, props), text));
};
var templateObject_1$5;

Xe.input(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  height: 40px;\n  width: 300px;\n  border-radius: 3px;\n  border: solid 2px\n    ", ";\n  background-color: #fff;\n  &:focus {\n    border: solid 2px #1b116e;\n  }\n"], ["\n  height: 40px;\n  width: 300px;\n  border-radius: 3px;\n  border: solid 2px\n    ", ";\n  background-color: #fff;\n  &:focus {\n    border: solid 2px #1b116e;\n  }\n"])), function (props) {
    return props.disabled
        ? "#e4e3ea"
        : props.error
            ? "#a9150b"
            : props.success
                ? "#067d68"
                : "#353637";
});
Xe.div(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  font-size: 14px;\n  color: ", ";\n  padding-bottom: 6px;\n"], ["\n  font-size: 14px;\n  color: ", ";\n  padding-bottom: 6px;\n"])), function (props) { return (props.disabled ? "#e4e3ea" : "#080808"); });
Xe.div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  font-size: 14px;\n  color: #a9150b8;\n  padding-top: 4px;\n"], ["\n  font-size: 14px;\n  color: #a9150b8;\n  padding-top: 4px;\n"])));
Xe.p(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n  margin: 0px;\n  color: ", ";\n"], ["\n  margin: 0px;\n  color: ", ";\n"])), function (props) {
    return props.disabled ? "#e4e3ea" : props.error ? "#a9150b" : "#080808";
});
var templateObject_1$4, templateObject_2$3, templateObject_3$3, templateObject_4$2;

Xe.div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  font-size: 16px;\n  color: ", ";\n  cursor: ", ";\n"], ["\n  font-size: 16px;\n  color: ", ";\n  cursor: ", ";\n"])), function (props) { return (props.disabled ? "#a7a7d4" : "#080808"); }, function (props) { return (props.disabled ? "not-allowed" : "default"); });
var templateObject_1$3;

Xe.table(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  height: 100px;\n  width: 600px;\n  color: #333;\n  border: 1px solid;\n  cursor: ", ";\n"], ["\n  height: 100px;\n  width: 600px;\n  color: #333;\n  border: 1px solid;\n  cursor: ", ";\n"])), function (props) { return (props.disabled ? "not-allowed" : "default"); });
Xe.tr(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  font-size: 14px;\n  padding-bottom: 6px;\n"], ["\n  font-size: 14px;\n  padding-bottom: 6px;\n"])));
Xe.th(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  font-size: 14px;\n  border: 1px solid;\n  color: ", ";\n  padding-top: 4px;\n"], ["\n  font-size: 14px;\n  border: 1px solid;\n  color: ", ";\n  padding-top: 4px;\n"])), function (props) { return (props.disabled ? "#e4e3ea" : "#0328fc"); });
Xe.td(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\nborder: 1px solid;\ncolor: ", ";\n"], ["\nborder: 1px solid;\ncolor: ", ";\n"])), function (props) { return (props.disabled ? "#e4e3ea" : "#30cfa9"); });
var templateObject_1$2, templateObject_2$2, templateObject_3$2, templateObject_4$1;

Xe.ul(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  list-style-type: none;\n  width: 160px;\n  overflow: hidden;\n  background-color: ", ";\n  cursor: ", ";\n  padding:0px;\n"], ["\n  list-style-type: none;\n  width: 160px;\n  overflow: hidden;\n  background-color: ", ";\n  cursor: ", ";\n  padding:0px;\n"])), function (props) { return (props.disabled ? "#777" : "#333"); }, function (props) { return (props.disabled ? "not-allowed" : "default"); });
var StyledLi = Xe.li(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  float: left;\n"], ["\n  float: left;\n"])));
Xe.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  display: inline-block;\n  color: white;\n  text-align: left;\n  min-width: 160px;\n  padding: 14px 16px;\n  text-decoration: none;\n"], ["\n  display: inline-block;\n  color: white;\n  text-align: left;\n  min-width: 160px;\n  padding: 14px 16px;\n  text-decoration: none;\n"])));
var DropDownContent = Xe.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: none;\n  position: absolute;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n"], ["\n  display: none;\n  position: absolute;\n  min-width: 160px;\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n"])));
Xe(StyledLi)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: inline-block;\n  &:hover {\n    background-color: ", ";\n  }\n  &:hover ", " {\n    display: ", ";\n  }\n"], ["\n  display: inline-block;\n  &:hover {\n    background-color: ", ";\n  }\n  &:hover ", " {\n    display: ", ";\n  }\n"])), function (props) { return (props.disabled ? "" : "red"); }, DropDownContent, function (props) { return (props.disabled ? "" : "block"); });
Xe.a(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  text-align: left;\n  &:hover {\n    background-color: #f1f1f1;\n  }\n"], ["\n  color: black;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  text-align: left;\n  &:hover {\n    background-color: #f1f1f1;\n  }\n"])));
var templateObject_1$1, templateObject_2$1, templateObject_3$1, templateObject_4, templateObject_5, templateObject_6;

var L1 = Xe.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n   font-size: 1rem;\n   font-weight: 600;\n   color: ", ";\n   font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont,\n       \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n       \"Helvetica Neue\", sans-serif;\n"], ["\n   font-size: 1rem;\n   font-weight: 600;\n   color: ", ";\n   font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont,\n       \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n       \"Helvetica Neue\", sans-serif;\n"])), function (props) { return props.disabled ? "#777" : "#333"; });
Xe.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n   :disabled {\n    cursor: not-allowed;\n    border: 2px solid \"333\";\n    background-color: \"333\";\n    :hover {\n      cursor: not-allowed;\n       ::after {\n          background-color: \"333\";\n       }\n    }\n"], ["\n   display: flex;\n   gap: 0.5rem;\n   align-items: center;\n   :disabled {\n    cursor: not-allowed;\n    border: 2px solid \"333\";\n    background-color: \"333\";\n    :hover {\n      cursor: not-allowed;\n       ::after {\n          background-color: \"333\";\n       }\n    }\n"])));
var Radio = Xe.input(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n   -webkit-appearance: none;\n   appearance: none;\n   margin: 0;\n   width: 1.5em;\n   height: 1.5em;\n   border: 2px solid ;\n   border-radius: 50%;\n   ::after {\n      content: \"\";\n      display: block;\n      border-radius: 50%;\n      width: 0.75em;\n      height: 0.75em;\n      margin: 3px;\n   }\n\n   :hover {\n    ::after {\n       background-color: \"333\"\n    }\n }\n :focus {\n    outline: 2px solid \"333\";\n }\n :checked {\n    ::after {\n       background-color: \"333\";\n    }\n    :hover {\n       background-color: \"333\";\n       border: 2px solid \"333\";\n       ::after {\n          background-color: \"333\"\n       }\n    }\n }\n :disabled {\n  cursor: not-allowed;\n  border: 2px solid \"333\";\n  background-color: \"333\";\n  :hover {\n     ::after {\n        background-color: \"333\";\n     }\n  }\n  :checked {\n     ::after {\n        background-color: \"333\";\n     }\n     :hover {\n        background-color: \"333\";\n        ::after {\n           background-color: \"333\";\n        }\n     }\n  }\n}\n"], ["\n   -webkit-appearance: none;\n   appearance: none;\n   margin: 0;\n   width: 1.5em;\n   height: 1.5em;\n   border: 2px solid ;\n   border-radius: 50%;\n   ::after {\n      content: \"\";\n      display: block;\n      border-radius: 50%;\n      width: 0.75em;\n      height: 0.75em;\n      margin: 3px;\n   }\n\n   :hover {\n    ::after {\n       background-color: \"333\"\n    }\n }\n :focus {\n    outline: 2px solid \"333\";\n }\n :checked {\n    ::after {\n       background-color: \"333\";\n    }\n    :hover {\n       background-color: \"333\";\n       border: 2px solid \"333\";\n       ::after {\n          background-color: \"333\"\n       }\n    }\n }\n :disabled {\n  cursor: not-allowed;\n  border: 2px solid \"333\";\n  background-color: \"333\";\n  :hover {\n     ::after {\n        background-color: \"333\";\n     }\n  }\n  :checked {\n     ::after {\n        background-color: \"333\";\n     }\n     :hover {\n        background-color: \"333\";\n        ::after {\n           background-color: \"333\";\n        }\n     }\n  }\n}\n"])));
var templateObject_1, templateObject_2, templateObject_3;

export { Button, L1, Radio };
//# sourceMappingURL=index.js.map
