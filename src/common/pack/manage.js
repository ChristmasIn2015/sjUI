var sr = Object.create,
    pt = Object.defineProperty,
    or = Object.getPrototypeOf,
    cr = Object.prototype.hasOwnProperty,
    ur = Object.getOwnPropertyNames,
    hr = Object.getOwnPropertyDescriptor
var lr = (t) => pt(t, '__esModule', { value: !0 })
var S = (t, e) => () => (e || ((e = { exports: {} }), t(e.exports, e)), e.exports)
var fr = (t, e, r) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let i of ur(e)) !cr.call(t, i) && i !== 'default' && pt(t, i, { get: () => e[i], enumerable: !(r = hr(e, i)) || r.enumerable })
        return t
    },
    pr = (t) => (t && t.__esModule ? t : fr(lr(pt(t != null ? sr(or(t)) : {}, 'default', { value: t, enumerable: !0 })), t))
var ce = S((Ot) => {
    var N = require('path'),
        C = process.platform === 'win32',
        q = require('fs'),
        dr = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG)
    function gr() {
        var t
        if (dr) {
            var e = new Error()
            t = r
        } else t = i
        return t
        function r(n) {
            n && ((e.message = n.message), (n = e), i(n))
        }
        function i(n) {
            if (n) {
                if (process.throwDeprecation) throw n
                if (!process.noDeprecation) {
                    var a = 'fs: missing callback ' + (n.stack || n.message)
                    process.traceDeprecation ? console.trace(a) : console.error(a)
                }
            }
        }
    }
    function yr(t) {
        return typeof t == 'function' ? t : gr()
    }
    var Ci = N.normalize
    C ? (j = /(.*?)(?:[\/\\]+|$)/g) : (j = /(.*?)(?:[\/]+|$)/g)
    var j
    C ? (W = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/) : (W = /^[\/]*/)
    var W
    Ot.realpathSync = function(e, r) {
        if (((e = N.resolve(e)), r && Object.prototype.hasOwnProperty.call(r, e))) return r[e]
        var i = e,
            n = {},
            a = {},
            s,
            c,
            o,
            u
        f()
        function f() {
            var d = W.exec(e)
            ;(s = d[0].length), (c = d[0]), (o = d[0]), (u = ''), C && !a[o] && (q.lstatSync(o), (a[o] = !0))
        }
        for (; s < e.length; ) {
            j.lastIndex = s
            var v = j.exec(e)
            if (((u = c), (c += v[0]), (o = u + v[1]), (s = j.lastIndex), !(a[o] || (r && r[o] === o)))) {
                var h
                if (r && Object.prototype.hasOwnProperty.call(r, o)) h = r[o]
                else {
                    var l = q.lstatSync(o)
                    if (!l.isSymbolicLink()) {
                        ;(a[o] = !0), r && (r[o] = o)
                        continue
                    }
                    var p = null
                    if (!C) {
                        var m = l.dev.toString(32) + ':' + l.ino.toString(32)
                        n.hasOwnProperty(m) && (p = n[m])
                    }
                    p === null && (q.statSync(o), (p = q.readlinkSync(o))), (h = N.resolve(u, p)), r && (r[o] = h), C || (n[m] = p)
                }
                ;(e = N.resolve(h, e.slice(s))), f()
            }
        }
        return r && (r[i] = e), e
    }
    Ot.realpath = function(e, r, i) {
        if ((typeof i != 'function' && ((i = yr(r)), (r = null)), (e = N.resolve(e)), r && Object.prototype.hasOwnProperty.call(r, e)))
            return process.nextTick(i.bind(null, null, r[e]))
        var n = e,
            a = {},
            s = {},
            c,
            o,
            u,
            f
        v()
        function v() {
            var d = W.exec(e)
            ;(c = d[0].length),
                (o = d[0]),
                (u = d[0]),
                (f = ''),
                C && !s[u]
                    ? q.lstat(u, function(y) {
                          if (y) return i(y)
                          ;(s[u] = !0), h()
                      })
                    : process.nextTick(h)
        }
        function h() {
            if (c >= e.length) return r && (r[n] = e), i(null, e)
            j.lastIndex = c
            var d = j.exec(e)
            return (
                (f = o),
                (o += d[0]),
                (u = f + d[1]),
                (c = j.lastIndex),
                s[u] || (r && r[u] === u) ? process.nextTick(h) : r && Object.prototype.hasOwnProperty.call(r, u) ? m(r[u]) : q.lstat(u, l)
            )
        }
        function l(d, y) {
            if (d) return i(d)
            if (!y.isSymbolicLink()) return (s[u] = !0), r && (r[u] = u), process.nextTick(h)
            if (!C) {
                var b = y.dev.toString(32) + ':' + y.ino.toString(32)
                if (a.hasOwnProperty(b)) return p(null, a[b], u)
            }
            q.stat(u, function(O) {
                if (O) return i(O)
                q.readlink(u, function(E, A) {
                    C || (a[b] = A), p(E, A)
                })
            })
        }
        function p(d, y, b) {
            if (d) return i(d)
            var O = N.resolve(f, y)
            r && (r[b] = O), m(O)
        }
        function m(d) {
            ;(e = N.resolve(d, e.slice(c))), v()
        }
    }
})
var Dt = S((xi, ue) => {
    ue.exports = x
    x.realpath = x
    x.sync = St
    x.realpathSync = St
    x.monkeypatch = br
    x.unmonkeypatch = wr
    var B = require('fs'),
        kt = B.realpath,
        At = B.realpathSync,
        Er = process.version,
        he = /^v[0-5]\./.test(Er),
        le = ce()
    function fe(t) {
        return t && t.syscall === 'realpath' && (t.code === 'ELOOP' || t.code === 'ENOMEM' || t.code === 'ENAMETOOLONG')
    }
    function x(t, e, r) {
        if (he) return kt(t, e, r)
        typeof e == 'function' && ((r = e), (e = null)),
            kt(t, e, function(i, n) {
                fe(i) ? le.realpath(t, e, r) : r(i, n)
            })
    }
    function St(t, e) {
        if (he) return At(t, e)
        try {
            return At(t, e)
        } catch (r) {
            if (fe(r)) return le.realpathSync(t, e)
            throw r
        }
    }
    function br() {
        ;(B.realpath = x), (B.realpathSync = St)
    }
    function wr() {
        ;(B.realpath = kt), (B.realpathSync = At)
    }
})
var ve = S((Li, pe) => {
    pe.exports = function(t, e) {
        for (var r = [], i = 0; i < t.length; i++) {
            var n = e(t[i], i)
            _r(n) ? r.push.apply(r, n) : r.push(n)
        }
        return r
    }
    var _r =
        Array.isArray ||
        function(t) {
            return Object.prototype.toString.call(t) === '[object Array]'
        }
})
var be = S((Ni, me) => {
    'use strict'
    me.exports = de
    function de(t, e, r) {
        t instanceof RegExp && (t = ge(t, r)), e instanceof RegExp && (e = ge(e, r))
        var i = ye(t, e, r)
        return i && { start: i[0], end: i[1], pre: r.slice(0, i[0]), body: r.slice(i[0] + t.length, i[1]), post: r.slice(i[1] + e.length) }
    }
    function ge(t, e) {
        var r = e.match(t)
        return r ? r[0] : null
    }
    de.range = ye
    function ye(t, e, r) {
        var i,
            n,
            a,
            s,
            c,
            o = r.indexOf(t),
            u = r.indexOf(e, o + 1),
            f = o
        if (o >= 0 && u > 0) {
            for (i = [], a = r.length; f >= 0 && !c; )
                f == o
                    ? (i.push(f), (o = r.indexOf(t, f + 1)))
                    : i.length == 1
                    ? (c = [i.pop(), u])
                    : ((n = i.pop()), n < a && ((a = n), (s = u)), (u = r.indexOf(e, f + 1))),
                    (f = o < u && o >= 0 ? o : u)
            i.length && (c = [a, s])
        }
        return c
    }
})
var De = S((Ri, we) => {
    var Or = ve(),
        Ee = be()
    we.exports = Sr
    var _e = '\0SLASH' + Math.random() + '\0',
        Oe = '\0OPEN' + Math.random() + '\0',
        Tt = '\0CLOSE' + Math.random() + '\0',
        Se = '\0COMMA' + Math.random() + '\0',
        ke = '\0PERIOD' + Math.random() + '\0'
    function jt(t) {
        return parseInt(t, 10) == t ? parseInt(t, 10) : t.charCodeAt(0)
    }
    function kr(t) {
        return t
            .split('\\\\')
            .join(_e)
            .split('\\{')
            .join(Oe)
            .split('\\}')
            .join(Tt)
            .split('\\,')
            .join(Se)
            .split('\\.')
            .join(ke)
    }
    function Ar(t) {
        return t
            .split(_e)
            .join('\\')
            .split(Oe)
            .join('{')
            .split(Tt)
            .join('}')
            .split(Se)
            .join(',')
            .split(ke)
            .join('.')
    }
    function Ae(t) {
        if (!t) return ['']
        var e = [],
            r = Ee('{', '}', t)
        if (!r) return t.split(',')
        var i = r.pre,
            n = r.body,
            a = r.post,
            s = i.split(',')
        s[s.length - 1] += '{' + n + '}'
        var c = Ae(a)
        return a.length && ((s[s.length - 1] += c.shift()), s.push.apply(s, c)), e.push.apply(e, s), e
    }
    function Sr(t) {
        return t ? (t.substr(0, 2) === '{}' && (t = '\\{\\}' + t.substr(2)), U(kr(t), !0).map(Ar)) : []
    }
    function Dr(t) {
        return '{' + t + '}'
    }
    function Tr(t) {
        return /^-?0\d/.test(t)
    }
    function jr(t, e) {
        return t <= e
    }
    function $r(t, e) {
        return t >= e
    }
    function U(t, e) {
        var r = [],
            i = Ee('{', '}', t)
        if (!i || /\$$/.test(i.pre)) return [t]
        var n = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),
            a = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),
            s = n || a,
            c = i.body.indexOf(',') >= 0
        if (!s && !c) return i.post.match(/,.*\}/) ? ((t = i.pre + '{' + i.body + Tt + i.post), U(t)) : [t]
        var o
        if (s) o = i.body.split(/\.\./)
        else if (((o = Ae(i.body)), o.length === 1 && ((o = U(o[0], !1).map(Dr)), o.length === 1))) {
            var f = i.post.length ? U(i.post, !1) : ['']
            return f.map(function(ut) {
                return i.pre + o[0] + ut
            })
        }
        var u = i.pre,
            f = i.post.length ? U(i.post, !1) : [''],
            v
        if (s) {
            var h = jt(o[0]),
                l = jt(o[1]),
                p = Math.max(o[0].length, o[1].length),
                m = o.length == 3 ? Math.abs(jt(o[2])) : 1,
                d = jr,
                y = l < h
            y && ((m *= -1), (d = $r))
            var b = o.some(Tr)
            v = []
            for (var O = h; d(O, l); O += m) {
                var E
                if (a) (E = String.fromCharCode(O)), E === '\\' && (E = '')
                else if (((E = String(O)), b)) {
                    var A = p - E.length
                    if (A > 0) {
                        var J = new Array(A + 1).join('0')
                        O < 0 ? (E = '-' + J + E.slice(1)) : (E = J + E)
                    }
                }
                v.push(E)
            }
        } else
            v = Or(o, function(X) {
                return U(X, !1)
            })
        for (var P = 0; P < v.length; P++)
            for (var L = 0; L < f.length; L++) {
                var T = u + v[P] + f[L]
                ;(!e || s || T) && r.push(T)
            }
        return r
    }
})
var et = S((Pi, Te) => {
    Te.exports = k
    k.Minimatch = _
    var Q = { sep: '/' }
    try {
        Q = require('path')
    } catch (t) {}
    var $t = (k.GLOBSTAR = _.GLOBSTAR = {}),
        Mr = De(),
        je = {
            '!': { open: '(?:(?!(?:', close: '))[^/]*?)' },
            '?': { open: '(?:', close: ')?' },
            '+': { open: '(?:', close: ')+' },
            '*': { open: '(?:', close: ')*' },
            '@': { open: '(?:', close: ')' },
        },
        Mt = '[^/]',
        It = Mt + '*?',
        Ir = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
        Cr = '(?:(?!(?:\\/|^)\\.).)*?',
        $e = qr('().*{}+?[]^$\\!')
    function qr(t) {
        return t.split('').reduce(function(e, r) {
            return (e[r] = !0), e
        }, {})
    }
    var Me = /\/+/
    k.filter = xr
    function xr(t, e) {
        return (
            (e = e || {}),
            function(r, i, n) {
                return k(r, t, e)
            }
        )
    }
    function Ie(t, e) {
        ;(t = t || {}), (e = e || {})
        var r = {}
        return (
            Object.keys(e).forEach(function(i) {
                r[i] = e[i]
            }),
            Object.keys(t).forEach(function(i) {
                r[i] = t[i]
            }),
            r
        )
    }
    k.defaults = function(t) {
        if (!t || !Object.keys(t).length) return k
        var e = k,
            r = function(n, a, s) {
                return e.minimatch(n, a, Ie(t, s))
            }
        return (
            (r.Minimatch = function(n, a) {
                return new e.Minimatch(n, Ie(t, a))
            }),
            r
        )
    }
    _.defaults = function(t) {
        return !t || !Object.keys(t).length ? _ : k.defaults(t).Minimatch
    }
    function k(t, e, r) {
        if (typeof e != 'string') throw new TypeError('glob pattern string required')
        return r || (r = {}), !r.nocomment && e.charAt(0) === '#' ? !1 : e.trim() === '' ? t === '' : new _(e, r).match(t)
    }
    function _(t, e) {
        if (!(this instanceof _)) return new _(t, e)
        if (typeof t != 'string') throw new TypeError('glob pattern string required')
        e || (e = {}),
            (t = t.trim()),
            Q.sep !== '/' && (t = t.split(Q.sep).join('/')),
            (this.options = e),
            (this.set = []),
            (this.pattern = t),
            (this.regexp = null),
            (this.negate = !1),
            (this.comment = !1),
            (this.empty = !1),
            this.make()
    }
    _.prototype.debug = function() {}
    _.prototype.make = Lr
    function Lr() {
        if (!this._made) {
            var t = this.pattern,
                e = this.options
            if (!e.nocomment && t.charAt(0) === '#') {
                this.comment = !0
                return
            }
            if (!t) {
                this.empty = !0
                return
            }
            this.parseNegate()
            var r = (this.globSet = this.braceExpand())
            e.debug && (this.debug = console.error),
                this.debug(this.pattern, r),
                (r = this.globParts = r.map(function(i) {
                    return i.split(Me)
                })),
                this.debug(this.pattern, r),
                (r = r.map(function(i, n, a) {
                    return i.map(this.parse, this)
                }, this)),
                this.debug(this.pattern, r),
                (r = r.filter(function(i) {
                    return i.indexOf(!1) === -1
                })),
                this.debug(this.pattern, r),
                (this.set = r)
        }
    }
    _.prototype.parseNegate = Nr
    function Nr() {
        var t = this.pattern,
            e = !1,
            r = this.options,
            i = 0
        if (!r.nonegate) {
            for (var n = 0, a = t.length; n < a && t.charAt(n) === '!'; n++) (e = !e), i++
            i && (this.pattern = t.substr(i)), (this.negate = e)
        }
    }
    k.braceExpand = function(t, e) {
        return Ce(t, e)
    }
    _.prototype.braceExpand = Ce
    function Ce(t, e) {
        if ((e || (this instanceof _ ? (e = this.options) : (e = {})), (t = typeof t == 'undefined' ? this.pattern : t), typeof t == 'undefined'))
            throw new TypeError('undefined pattern')
        return e.nobrace || !t.match(/\{.*\}/) ? [t] : Mr(t)
    }
    _.prototype.parse = Rr
    var tt = {}
    function Rr(t, e) {
        if (t.length > 1024 * 64) throw new TypeError('pattern is too long')
        var r = this.options
        if (!r.noglobstar && t === '**') return $t
        if (t === '') return ''
        var i = '',
            n = !!r.nocase,
            a = !1,
            s = [],
            c = [],
            o,
            u = !1,
            f = -1,
            v = -1,
            h = t.charAt(0) === '.' ? '' : r.dot ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))' : '(?!\\.)',
            l = this
        function p() {
            if (o) {
                switch (o) {
                    case '*':
                        ;(i += It), (n = !0)
                        break
                    case '?':
                        ;(i += Mt), (n = !0)
                        break
                    default:
                        i += '\\' + o
                        break
                }
                l.debug('clearStateChar %j %j', o, i), (o = !1)
            }
        }
        for (var m = 0, d = t.length, y; m < d && (y = t.charAt(m)); m++) {
            if ((this.debug('%s	%s %s %j', t, m, i, y), a && $e[y])) {
                ;(i += '\\' + y), (a = !1)
                continue
            }
            switch (y) {
                case '/':
                    return !1
                case '\\':
                    p(), (a = !0)
                    continue
                case '?':
                case '*':
                case '+':
                case '@':
                case '!':
                    if ((this.debug('%s	%s %s %j <-- stateChar', t, m, i, y), u)) {
                        this.debug('  in class'), y === '!' && m === v + 1 && (y = '^'), (i += y)
                        continue
                    }
                    l.debug('call clearStateChar %j', o), p(), (o = y), r.noext && p()
                    continue
                case '(':
                    if (u) {
                        i += '('
                        continue
                    }
                    if (!o) {
                        i += '\\('
                        continue
                    }
                    s.push({ type: o, start: m - 1, reStart: i.length, open: je[o].open, close: je[o].close }),
                        (i += o === '!' ? '(?:(?!(?:' : '(?:'),
                        this.debug('plType %j %j', o, i),
                        (o = !1)
                    continue
                case ')':
                    if (u || !s.length) {
                        i += '\\)'
                        continue
                    }
                    p(), (n = !0)
                    var b = s.pop()
                    ;(i += b.close), b.type === '!' && c.push(b), (b.reEnd = i.length)
                    continue
                case '|':
                    if (u || !s.length || a) {
                        ;(i += '\\|'), (a = !1)
                        continue
                    }
                    p(), (i += '|')
                    continue
                case '[':
                    if ((p(), u)) {
                        i += '\\' + y
                        continue
                    }
                    ;(u = !0), (v = m), (f = i.length), (i += y)
                    continue
                case ']':
                    if (m === v + 1 || !u) {
                        ;(i += '\\' + y), (a = !1)
                        continue
                    }
                    if (u) {
                        var O = t.substring(v + 1, m)
                        try {
                            RegExp('[' + O + ']')
                        } catch (Vt) {
                            var E = this.parse(O, tt)
                            ;(i = i.substr(0, f) + '\\[' + E[0] + '\\]'), (n = n || E[1]), (u = !1)
                            continue
                        }
                    }
                    ;(n = !0), (u = !1), (i += y)
                    continue
                default:
                    p(), a ? (a = !1) : $e[y] && !(y === '^' && u) && (i += '\\'), (i += y)
            }
        }
        for (u && ((O = t.substr(v + 1)), (E = this.parse(O, tt)), (i = i.substr(0, f) + '\\[' + E[0]), (n = n || E[1])), b = s.pop(); b; b = s.pop()) {
            var A = i.slice(b.reStart + b.open.length)
            this.debug('setting tail', i, b),
                (A = A.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(Vt, Jt, ft) {
                    return ft || (ft = '\\'), Jt + Jt + ft + '|'
                })),
                this.debug(
                    `tail=%j
   %s`,
                    A,
                    A,
                    b,
                    i
                )
            var J = b.type === '*' ? It : b.type === '?' ? Mt : '\\' + b.type
            ;(n = !0), (i = i.slice(0, b.reStart) + J + '\\(' + A)
        }
        p(), a && (i += '\\\\')
        var P = !1
        switch (i.charAt(0)) {
            case '.':
            case '[':
            case '(':
                P = !0
        }
        for (var L = c.length - 1; L > -1; L--) {
            var T = c[L],
                X = i.slice(0, T.reStart),
                ut = i.slice(T.reStart, T.reEnd - 8),
                Zt = i.slice(T.reEnd - 8, T.reEnd),
                H = i.slice(T.reEnd)
            Zt += H
            var ir = X.split('(').length - 1,
                ht = H
            for (m = 0; m < ir; m++) ht = ht.replace(/\)[+*?]?/, '')
            H = ht
            var Kt = ''
            H === '' && e !== tt && (Kt = '$')
            var nr = X + ut + H + Kt + Zt
            i = nr
        }
        if ((i !== '' && n && (i = '(?=.)' + i), P && (i = h + i), e === tt)) return [i, n]
        if (!n) return Pr(t)
        var ar = r.nocase ? 'i' : ''
        try {
            var lt = new RegExp('^' + i + '$', ar)
        } catch (Vt) {
            return new RegExp('$.')
        }
        return (lt._glob = t), (lt._src = i), lt
    }
    k.makeRe = function(t, e) {
        return new _(t, e || {}).makeRe()
    }
    _.prototype.makeRe = Gr
    function Gr() {
        if (this.regexp || this.regexp === !1) return this.regexp
        var t = this.set
        if (!t.length) return (this.regexp = !1), this.regexp
        var e = this.options,
            r = e.noglobstar ? It : e.dot ? Ir : Cr,
            i = e.nocase ? 'i' : '',
            n = t
                .map(function(a) {
                    return a
                        .map(function(s) {
                            return s === $t ? r : typeof s == 'string' ? Br(s) : s._src
                        })
                        .join('\\/')
                })
                .join('|')
        ;(n = '^(?:' + n + ')$'), this.negate && (n = '^(?!' + n + ').*$')
        try {
            this.regexp = new RegExp(n, i)
        } catch (a) {
            this.regexp = !1
        }
        return this.regexp
    }
    k.match = function(t, e, r) {
        r = r || {}
        var i = new _(e, r)
        return (
            (t = t.filter(function(n) {
                return i.match(n)
            })),
            i.options.nonull && !t.length && t.push(e),
            t
        )
    }
    _.prototype.match = Ur
    function Ur(t, e) {
        if ((this.debug('match', t, this.pattern), this.comment)) return !1
        if (this.empty) return t === ''
        if (t === '/' && e) return !0
        var r = this.options
        Q.sep !== '/' && (t = t.split(Q.sep).join('/')), (t = t.split(Me)), this.debug(this.pattern, 'split', t)
        var i = this.set
        this.debug(this.pattern, 'set', i)
        var n, a
        for (a = t.length - 1; a >= 0 && ((n = t[a]), !n); a--);
        for (a = 0; a < i.length; a++) {
            var s = i[a],
                c = t
            r.matchBase && s.length === 1 && (c = [n])
            var o = this.matchOne(c, s, e)
            if (o) return r.flipNegate ? !0 : !this.negate
        }
        return r.flipNegate ? !1 : this.negate
    }
    _.prototype.matchOne = function(t, e, r) {
        var i = this.options
        this.debug('matchOne', { this: this, file: t, pattern: e }), this.debug('matchOne', t.length, e.length)
        for (var n = 0, a = 0, s = t.length, c = e.length; n < s && a < c; n++, a++) {
            this.debug('matchOne loop')
            var o = e[a],
                u = t[n]
            if ((this.debug(e, o, u), o === !1)) return !1
            if (o === $t) {
                this.debug('GLOBSTAR', [e, o, u])
                var f = n,
                    v = a + 1
                if (v === c) {
                    for (this.debug('** at the end'); n < s; n++) if (t[n] === '.' || t[n] === '..' || (!i.dot && t[n].charAt(0) === '.')) return !1
                    return !0
                }
                for (; f < s; ) {
                    var h = t[f]
                    if (
                        (this.debug(
                            `
globstar while`,
                            t,
                            f,
                            e,
                            v,
                            h
                        ),
                        this.matchOne(t.slice(f), e.slice(v), r))
                    )
                        return this.debug('globstar found match!', f, s, h), !0
                    if (h === '.' || h === '..' || (!i.dot && h.charAt(0) === '.')) {
                        this.debug('dot detected!', t, f, e, v)
                        break
                    }
                    this.debug('globstar swallow a segment, and continue'), f++
                }
                return !!(
                    r &&
                    (this.debug(
                        `
>>> no match, partial?`,
                        t,
                        f,
                        e,
                        v
                    ),
                    f === s)
                )
            }
            var l
            if (
                (typeof o == 'string'
                    ? (i.nocase ? (l = u.toLowerCase() === o.toLowerCase()) : (l = u === o), this.debug('string match', o, u, l))
                    : ((l = u.match(o)), this.debug('pattern match', o, u, l)),
                !l)
            )
                return !1
        }
        if (n === s && a === c) return !0
        if (n === s) return r
        if (a === c) {
            var p = n === s - 1 && t[n] === ''
            return p
        }
        throw new Error('wtf?')
    }
    function Pr(t) {
        return t.replace(/\\(.)/g, '$1')
    }
    function Br(t) {
        return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
})
var qe = S((Gi, Ct) => {
    typeof Object.create == 'function'
        ? (Ct.exports = function(e, r) {
              ;(e.super_ = r), (e.prototype = Object.create(r.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }))
          })
        : (Ct.exports = function(e, r) {
              e.super_ = r
              var i = function() {}
              ;(i.prototype = r.prototype), (e.prototype = new i()), (e.prototype.constructor = e)
          })
})
var xe = S((Bi, qt) => {
    try {
        if (((xt = require('util')), typeof xt.inherits != 'function')) throw ''
        qt.exports = xt.inherits
    } catch (t) {
        qt.exports = qe()
    }
    var xt
})
var it = S((Ui, rt) => {
    'use strict'
    function Le(t) {
        return t.charAt(0) === '/'
    }
    function Ne(t) {
        var e = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,
            r = e.exec(t),
            i = r[1] || '',
            n = Boolean(i && i.charAt(1) !== ':')
        return Boolean(r[2] || n)
    }
    rt.exports = process.platform === 'win32' ? Ne : Le
    rt.exports.posix = Le
    rt.exports.win32 = Ne
})
var Nt = S((D) => {
    D.alphasort = Re
    D.alphasorti = Pe
    D.setopts = Fr
    D.ownProp = Ge
    D.makeAbs = z
    D.finish = Hr
    D.mark = Wr
    D.isIgnored = Be
    D.childrenIgnored = Qr
    function Ge(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    var F = require('path'),
        zr = et(),
        Ue = it(),
        Lt = zr.Minimatch
    function Pe(t, e) {
        return t.toLowerCase().localeCompare(e.toLowerCase())
    }
    function Re(t, e) {
        return t.localeCompare(e)
    }
    function Zr(t, e) {
        ;(t.ignore = e.ignore || []), Array.isArray(t.ignore) || (t.ignore = [t.ignore]), t.ignore.length && (t.ignore = t.ignore.map(Yr))
    }
    function Yr(t) {
        var e = null
        if (t.slice(-3) === '/**') {
            var r = t.replace(/(\/\*\*)+$/, '')
            e = new Lt(r, { dot: !0 })
        }
        return { matcher: new Lt(t, { dot: !0 }), gmatcher: e }
    }
    function Fr(t, e, r) {
        if ((r || (r = {}), r.matchBase && e.indexOf('/') === -1)) {
            if (r.noglobstar) throw new Error('base matching requires globstar')
            e = '**/' + e
        }
        ;(t.silent = !!r.silent),
            (t.pattern = e),
            (t.strict = r.strict !== !1),
            (t.realpath = !!r.realpath),
            (t.realpathCache = r.realpathCache || Object.create(null)),
            (t.follow = !!r.follow),
            (t.dot = !!r.dot),
            (t.mark = !!r.mark),
            (t.nodir = !!r.nodir),
            t.nodir && (t.mark = !0),
            (t.sync = !!r.sync),
            (t.nounique = !!r.nounique),
            (t.nonull = !!r.nonull),
            (t.nosort = !!r.nosort),
            (t.nocase = !!r.nocase),
            (t.stat = !!r.stat),
            (t.noprocess = !!r.noprocess),
            (t.absolute = !!r.absolute),
            (t.maxLength = r.maxLength || Infinity),
            (t.cache = r.cache || Object.create(null)),
            (t.statCache = r.statCache || Object.create(null)),
            (t.symlinks = r.symlinks || Object.create(null)),
            Zr(t, r),
            (t.changedCwd = !1)
        var i = process.cwd()
        Ge(r, 'cwd') ? ((t.cwd = F.resolve(r.cwd)), (t.changedCwd = t.cwd !== i)) : (t.cwd = i),
            (t.root = r.root || F.resolve(t.cwd, '/')),
            (t.root = F.resolve(t.root)),
            process.platform === 'win32' && (t.root = t.root.replace(/\\/g, '/')),
            (t.cwdAbs = Ue(t.cwd) ? t.cwd : z(t, t.cwd)),
            process.platform === 'win32' && (t.cwdAbs = t.cwdAbs.replace(/\\/g, '/')),
            (t.nomount = !!r.nomount),
            (r.nonegate = !0),
            (r.nocomment = !0),
            (t.minimatch = new Lt(e, r)),
            (t.options = t.minimatch.options)
    }
    function Hr(t) {
        for (var e = t.nounique, r = e ? [] : Object.create(null), i = 0, n = t.matches.length; i < n; i++) {
            var a = t.matches[i]
            if (!a || Object.keys(a).length === 0) {
                if (t.nonull) {
                    var s = t.minimatch.globSet[i]
                    e ? r.push(s) : (r[s] = !0)
                }
            } else {
                var c = Object.keys(a)
                e
                    ? r.push.apply(r, c)
                    : c.forEach(function(o) {
                          r[o] = !0
                      })
            }
        }
        if ((e || (r = Object.keys(r)), t.nosort || (r = r.sort(t.nocase ? Pe : Re)), t.mark)) {
            for (var i = 0; i < r.length; i++) r[i] = t._mark(r[i])
            t.nodir &&
                (r = r.filter(function(o) {
                    var u = !/\/$/.test(o),
                        f = t.cache[o] || t.cache[z(t, o)]
                    return u && f && (u = f !== 'DIR' && !Array.isArray(f)), u
                }))
        }
        t.ignore.length &&
            (r = r.filter(function(o) {
                return !Be(t, o)
            })),
            (t.found = r)
    }
    function Wr(t, e) {
        var r = z(t, e),
            i = t.cache[r],
            n = e
        if (i) {
            var a = i === 'DIR' || Array.isArray(i),
                s = e.slice(-1) === '/'
            if ((a && !s ? (n += '/') : !a && s && (n = n.slice(0, -1)), n !== e)) {
                var c = z(t, n)
                ;(t.statCache[c] = t.statCache[r]), (t.cache[c] = t.cache[r])
            }
        }
        return n
    }
    function z(t, e) {
        var r = e
        return (
            e.charAt(0) === '/' ? (r = F.join(t.root, e)) : Ue(e) || e === '' ? (r = e) : t.changedCwd ? (r = F.resolve(t.cwd, e)) : (r = F.resolve(e)),
            process.platform === 'win32' && (r = r.replace(/\\/g, '/')),
            r
        )
    }
    function Be(t, e) {
        return t.ignore.length
            ? t.ignore.some(function(r) {
                  return r.matcher.match(e) || !!(r.gmatcher && r.gmatcher.match(e))
              })
            : !1
    }
    function Qr(t, e) {
        return t.ignore.length
            ? t.ignore.some(function(r) {
                  return !!(r.gmatcher && r.gmatcher.match(e))
              })
            : !1
    }
})
var ze = S((Zi, Fe) => {
    Fe.exports = He
    He.GlobSync = w
    var nt = require('fs'),
        Kr = Dt(),
        We = et(),
        Hi = We.Minimatch,
        Wi = Rt().Glob,
        Qi = require('util'),
        Pt = require('path'),
        Qe = require('assert'),
        at = it(),
        $ = Nt(),
        zi = $.alphasort,
        Yi = $.alphasorti,
        Vr = $.setopts,
        Gt = $.ownProp,
        Jr = $.childrenIgnored,
        Xr = $.isIgnored
    function He(t, e) {
        if (typeof e == 'function' || arguments.length === 3)
            throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`)
        return new w(t, e).found
    }
    function w(t, e) {
        if (!t) throw new Error('must provide pattern')
        if (typeof e == 'function' || arguments.length === 3)
            throw new TypeError(`callback provided to sync glob
See: https://github.com/isaacs/node-glob/issues/167`)
        if (!(this instanceof w)) return new w(t, e)
        if ((Vr(this, t, e), this.noprocess)) return this
        var r = this.minimatch.set.length
        this.matches = new Array(r)
        for (var i = 0; i < r; i++) this._process(this.minimatch.set[i], i, !1)
        this._finish()
    }
    w.prototype._finish = function() {
        if ((Qe(this instanceof w), this.realpath)) {
            var t = this
            this.matches.forEach(function(e, r) {
                var i = (t.matches[r] = Object.create(null))
                for (var n in e)
                    try {
                        n = t._makeAbs(n)
                        var a = Kr.realpathSync(n, t.realpathCache)
                        i[a] = !0
                    } catch (s) {
                        if (s.syscall === 'stat') i[t._makeAbs(n)] = !0
                        else throw s
                    }
            })
        }
        $.finish(this)
    }
    w.prototype._process = function(t, e, r) {
        Qe(this instanceof w)
        for (var i = 0; typeof t[i] == 'string'; ) i++
        var n
        switch (i) {
            case t.length:
                this._processSimple(t.join('/'), e)
                return
            case 0:
                n = null
                break
            default:
                n = t.slice(0, i).join('/')
                break
        }
        var a = t.slice(i),
            s
        n === null ? (s = '.') : ((at(n) || at(t.join('/'))) && (!n || !at(n)) && (n = '/' + n), (s = n))
        var c = this._makeAbs(s)
        if (!Jr(this, s)) {
            var o = a[0] === We.GLOBSTAR
            o ? this._processGlobStar(n, s, c, a, e, r) : this._processReaddir(n, s, c, a, e, r)
        }
    }
    w.prototype._processReaddir = function(t, e, r, i, n, a) {
        var s = this._readdir(r, a)
        if (!!s) {
            for (var c = i[0], o = !!this.minimatch.negate, u = c._glob, f = this.dot || u.charAt(0) === '.', v = [], h = 0; h < s.length; h++) {
                var l = s[h]
                if (l.charAt(0) !== '.' || f) {
                    var p
                    o && !t ? (p = !l.match(c)) : (p = l.match(c)), p && v.push(l)
                }
            }
            var m = v.length
            if (m !== 0) {
                if (i.length === 1 && !this.mark && !this.stat) {
                    this.matches[n] || (this.matches[n] = Object.create(null))
                    for (var h = 0; h < m; h++) {
                        var l = v[h]
                        t && (t.slice(-1) !== '/' ? (l = t + '/' + l) : (l = t + l)),
                            l.charAt(0) === '/' && !this.nomount && (l = Pt.join(this.root, l)),
                            this._emitMatch(n, l)
                    }
                    return
                }
                i.shift()
                for (var h = 0; h < m; h++) {
                    var l = v[h],
                        d
                    t ? (d = [t, l]) : (d = [l]), this._process(d.concat(i), n, a)
                }
            }
        }
    }
    w.prototype._emitMatch = function(t, e) {
        if (!Xr(this, e)) {
            var r = this._makeAbs(e)
            if ((this.mark && (e = this._mark(e)), this.absolute && (e = r), !this.matches[t][e])) {
                if (this.nodir) {
                    var i = this.cache[r]
                    if (i === 'DIR' || Array.isArray(i)) return
                }
                ;(this.matches[t][e] = !0), this.stat && this._stat(e)
            }
        }
    }
    w.prototype._readdirInGlobStar = function(t) {
        if (this.follow) return this._readdir(t, !1)
        var e, r, i
        try {
            r = nt.lstatSync(t)
        } catch (a) {
            if (a.code === 'ENOENT') return null
        }
        var n = r && r.isSymbolicLink()
        return (this.symlinks[t] = n), !n && r && !r.isDirectory() ? (this.cache[t] = 'FILE') : (e = this._readdir(t, !1)), e
    }
    w.prototype._readdir = function(t, e) {
        var r
        if (e && !Gt(this.symlinks, t)) return this._readdirInGlobStar(t)
        if (Gt(this.cache, t)) {
            var i = this.cache[t]
            if (!i || i === 'FILE') return null
            if (Array.isArray(i)) return i
        }
        try {
            return this._readdirEntries(t, nt.readdirSync(t))
        } catch (n) {
            return this._readdirError(t, n), null
        }
    }
    w.prototype._readdirEntries = function(t, e) {
        if (!this.mark && !this.stat)
            for (var r = 0; r < e.length; r++) {
                var i = e[r]
                t === '/' ? (i = t + i) : (i = t + '/' + i), (this.cache[i] = !0)
            }
        return (this.cache[t] = e), e
    }
    w.prototype._readdirError = function(t, e) {
        switch (e.code) {
            case 'ENOTSUP':
            case 'ENOTDIR':
                var r = this._makeAbs(t)
                if (((this.cache[r] = 'FILE'), r === this.cwdAbs)) {
                    var i = new Error(e.code + ' invalid cwd ' + this.cwd)
                    throw ((i.path = this.cwd), (i.code = e.code), i)
                }
                break
            case 'ENOENT':
            case 'ELOOP':
            case 'ENAMETOOLONG':
            case 'UNKNOWN':
                this.cache[this._makeAbs(t)] = !1
                break
            default:
                if (((this.cache[this._makeAbs(t)] = !1), this.strict)) throw e
                this.silent || console.error('glob error', e)
                break
        }
    }
    w.prototype._processGlobStar = function(t, e, r, i, n, a) {
        var s = this._readdir(r, a)
        if (!!s) {
            var c = i.slice(1),
                o = t ? [t] : [],
                u = o.concat(c)
            this._process(u, n, !1)
            var f = s.length,
                v = this.symlinks[r]
            if (!(v && a))
                for (var h = 0; h < f; h++) {
                    var l = s[h]
                    if (!(l.charAt(0) === '.' && !this.dot)) {
                        var p = o.concat(s[h], c)
                        this._process(p, n, !0)
                        var m = o.concat(s[h], i)
                        this._process(m, n, !0)
                    }
                }
        }
    }
    w.prototype._processSimple = function(t, e) {
        var r = this._stat(t)
        if ((this.matches[e] || (this.matches[e] = Object.create(null)), !!r)) {
            if (t && at(t) && !this.nomount) {
                var i = /[\/\\]$/.test(t)
                t.charAt(0) === '/' ? (t = Pt.join(this.root, t)) : ((t = Pt.resolve(this.root, t)), i && (t += '/'))
            }
            process.platform === 'win32' && (t = t.replace(/\\/g, '/')), this._emitMatch(e, t)
        }
    }
    w.prototype._stat = function(t) {
        var e = this._makeAbs(t),
            r = t.slice(-1) === '/'
        if (t.length > this.maxLength) return !1
        if (!this.stat && Gt(this.cache, e)) {
            var s = this.cache[e]
            if ((Array.isArray(s) && (s = 'DIR'), !r || s === 'DIR')) return s
            if (r && s === 'FILE') return !1
        }
        var i,
            n = this.statCache[e]
        if (!n) {
            var a
            try {
                a = nt.lstatSync(e)
            } catch (c) {
                if (c && (c.code === 'ENOENT' || c.code === 'ENOTDIR')) return (this.statCache[e] = !1), !1
            }
            if (a && a.isSymbolicLink())
                try {
                    n = nt.statSync(e)
                } catch (c) {
                    n = a
                }
            else n = a
        }
        this.statCache[e] = n
        var s = !0
        return n && (s = n.isDirectory() ? 'DIR' : 'FILE'), (this.cache[e] = this.cache[e] || s), r && s === 'FILE' ? !1 : s
    }
    w.prototype._mark = function(t) {
        return $.mark(this, t)
    }
    w.prototype._makeAbs = function(t) {
        return $.makeAbs(this, t)
    }
})
var Bt = S((Ki, Ye) => {
    Ye.exports = Ze
    function Ze(t, e) {
        if (t && e) return Ze(t)(e)
        if (typeof t != 'function') throw new TypeError('need wrapper function')
        return (
            Object.keys(t).forEach(function(i) {
                r[i] = t[i]
            }),
            r
        )
        function r() {
            for (var i = new Array(arguments.length), n = 0; n < i.length; n++) i[n] = arguments[n]
            var a = t.apply(this, i),
                s = i[i.length - 1]
            return (
                typeof a == 'function' &&
                    a !== s &&
                    Object.keys(s).forEach(function(c) {
                        a[c] = s[c]
                    }),
                a
            )
        }
    }
})
var Ft = S((Vi, Ut) => {
    var Ke = Bt()
    Ut.exports = Ke(st)
    Ut.exports.strict = Ke(Ve)
    st.proto = st(function() {
        Object.defineProperty(Function.prototype, 'once', {
            value: function() {
                return st(this)
            },
            configurable: !0,
        }),
            Object.defineProperty(Function.prototype, 'onceStrict', {
                value: function() {
                    return Ve(this)
                },
                configurable: !0,
            })
    })
    function st(t) {
        var e = function() {
            return e.called ? e.value : ((e.called = !0), (e.value = t.apply(this, arguments)))
        }
        return (e.called = !1), e
    }
    function Ve(t) {
        var e = function() {
                if (e.called) throw new Error(e.onceError)
                return (e.called = !0), (e.value = t.apply(this, arguments))
            },
            r = t.name || 'Function wrapped with `once`'
        return (e.onceError = r + " shouldn't be called more than once"), (e.called = !1), e
    }
})
var Xe = S((Ji, Je) => {
    var ti = Bt(),
        Y = Object.create(null),
        ei = Ft()
    Je.exports = ti(ri)
    function ri(t, e) {
        return Y[t] ? (Y[t].push(e), null) : ((Y[t] = [e]), ii(t))
    }
    function ii(t) {
        return ei(function e() {
            var r = Y[t],
                i = r.length,
                n = ni(arguments)
            try {
                for (var a = 0; a < i; a++) r[a].apply(null, n)
            } finally {
                r.length > i
                    ? (r.splice(0, i),
                      process.nextTick(function() {
                          e.apply(null, n)
                      }))
                    : delete Y[t]
            }
        })
    }
    function ni(t) {
        for (var e = t.length, r = [], i = 0; i < e; i++) r[i] = t[i]
        return r
    }
})
var Rt = S((nn, tr) => {
    tr.exports = R
    var ot = require('fs'),
        ai = Dt(),
        er = et(),
        Xi = er.Minimatch,
        si = xe(),
        oi = require('events').EventEmitter,
        Ht = require('path'),
        Wt = require('assert'),
        Z = it(),
        Qt = ze(),
        M = Nt(),
        tn = M.alphasort,
        en = M.alphasorti,
        ci = M.setopts,
        zt = M.ownProp,
        Yt = Xe(),
        rn = require('util'),
        ui = M.childrenIgnored,
        hi = M.isIgnored,
        li = Ft()
    function R(t, e, r) {
        if ((typeof e == 'function' && ((r = e), (e = {})), e || (e = {}), e.sync)) {
            if (r) throw new TypeError('callback provided to sync glob')
            return Qt(t, e)
        }
        return new g(t, e, r)
    }
    R.sync = Qt
    var fi = (R.GlobSync = Qt.GlobSync)
    R.glob = R
    function pi(t, e) {
        if (e === null || typeof e != 'object') return t
        for (var r = Object.keys(e), i = r.length; i--; ) t[r[i]] = e[r[i]]
        return t
    }
    R.hasMagic = function(t, e) {
        var r = pi({}, e)
        r.noprocess = !0
        var i = new g(t, r),
            n = i.minimatch.set
        if (!t) return !1
        if (n.length > 1) return !0
        for (var a = 0; a < n[0].length; a++) if (typeof n[0][a] != 'string') return !0
        return !1
    }
    R.Glob = g
    si(g, oi)
    function g(t, e, r) {
        if ((typeof e == 'function' && ((r = e), (e = null)), e && e.sync)) {
            if (r) throw new TypeError('callback provided to sync glob')
            return new fi(t, e)
        }
        if (!(this instanceof g)) return new g(t, e, r)
        ci(this, t, e), (this._didRealPath = !1)
        var i = this.minimatch.set.length
        ;(this.matches = new Array(i)),
            typeof r == 'function' &&
                ((r = li(r)),
                this.on('error', r),
                this.on('end', function(o) {
                    r(null, o)
                }))
        var n = this
        if (((this._processing = 0), (this._emitQueue = []), (this._processQueue = []), (this.paused = !1), this.noprocess)) return this
        if (i === 0) return c()
        for (var a = !0, s = 0; s < i; s++) this._process(this.minimatch.set[s], s, !1, c)
        a = !1
        function c() {
            --n._processing,
                n._processing <= 0 &&
                    (a
                        ? process.nextTick(function() {
                              n._finish()
                          })
                        : n._finish())
        }
    }
    g.prototype._finish = function() {
        if ((Wt(this instanceof g), !this.aborted)) {
            if (this.realpath && !this._didRealpath) return this._realpath()
            M.finish(this), this.emit('end', this.found)
        }
    }
    g.prototype._realpath = function() {
        if (this._didRealpath) return
        this._didRealpath = !0
        var t = this.matches.length
        if (t === 0) return this._finish()
        for (var e = this, r = 0; r < this.matches.length; r++) this._realpathSet(r, i)
        function i() {
            --t == 0 && e._finish()
        }
    }
    g.prototype._realpathSet = function(t, e) {
        var r = this.matches[t]
        if (!r) return e()
        var i = Object.keys(r),
            n = this,
            a = i.length
        if (a === 0) return e()
        var s = (this.matches[t] = Object.create(null))
        i.forEach(function(c, o) {
            ;(c = n._makeAbs(c)),
                ai.realpath(c, n.realpathCache, function(u, f) {
                    u ? (u.syscall === 'stat' ? (s[c] = !0) : n.emit('error', u)) : (s[f] = !0), --a == 0 && ((n.matches[t] = s), e())
                })
        })
    }
    g.prototype._mark = function(t) {
        return M.mark(this, t)
    }
    g.prototype._makeAbs = function(t) {
        return M.makeAbs(this, t)
    }
    g.prototype.abort = function() {
        ;(this.aborted = !0), this.emit('abort')
    }
    g.prototype.pause = function() {
        this.paused || ((this.paused = !0), this.emit('pause'))
    }
    g.prototype.resume = function() {
        if (this.paused) {
            if ((this.emit('resume'), (this.paused = !1), this._emitQueue.length)) {
                var t = this._emitQueue.slice(0)
                this._emitQueue.length = 0
                for (var e = 0; e < t.length; e++) {
                    var r = t[e]
                    this._emitMatch(r[0], r[1])
                }
            }
            if (this._processQueue.length) {
                var i = this._processQueue.slice(0)
                this._processQueue.length = 0
                for (var e = 0; e < i.length; e++) {
                    var n = i[e]
                    this._processing--, this._process(n[0], n[1], n[2], n[3])
                }
            }
        }
    }
    g.prototype._process = function(t, e, r, i) {
        if ((Wt(this instanceof g), Wt(typeof i == 'function'), !this.aborted)) {
            if ((this._processing++, this.paused)) {
                this._processQueue.push([t, e, r, i])
                return
            }
            for (var n = 0; typeof t[n] == 'string'; ) n++
            var a
            switch (n) {
                case t.length:
                    this._processSimple(t.join('/'), e, i)
                    return
                case 0:
                    a = null
                    break
                default:
                    a = t.slice(0, n).join('/')
                    break
            }
            var s = t.slice(n),
                c
            a === null ? (c = '.') : ((Z(a) || Z(t.join('/'))) && (!a || !Z(a)) && (a = '/' + a), (c = a))
            var o = this._makeAbs(c)
            if (ui(this, c)) return i()
            var u = s[0] === er.GLOBSTAR
            u ? this._processGlobStar(a, c, o, s, e, r, i) : this._processReaddir(a, c, o, s, e, r, i)
        }
    }
    g.prototype._processReaddir = function(t, e, r, i, n, a, s) {
        var c = this
        this._readdir(r, a, function(o, u) {
            return c._processReaddir2(t, e, r, i, n, a, u, s)
        })
    }
    g.prototype._processReaddir2 = function(t, e, r, i, n, a, s, c) {
        if (!s) return c()
        for (var o = i[0], u = !!this.minimatch.negate, f = o._glob, v = this.dot || f.charAt(0) === '.', h = [], l = 0; l < s.length; l++) {
            var p = s[l]
            if (p.charAt(0) !== '.' || v) {
                var m
                u && !t ? (m = !p.match(o)) : (m = p.match(o)), m && h.push(p)
            }
        }
        var d = h.length
        if (d === 0) return c()
        if (i.length === 1 && !this.mark && !this.stat) {
            this.matches[n] || (this.matches[n] = Object.create(null))
            for (var l = 0; l < d; l++) {
                var p = h[l]
                t && (t !== '/' ? (p = t + '/' + p) : (p = t + p)), p.charAt(0) === '/' && !this.nomount && (p = Ht.join(this.root, p)), this._emitMatch(n, p)
            }
            return c()
        }
        i.shift()
        for (var l = 0; l < d; l++) {
            var p = h[l],
                y
            t && (t !== '/' ? (p = t + '/' + p) : (p = t + p)), this._process([p].concat(i), n, a, c)
        }
        c()
    }
    g.prototype._emitMatch = function(t, e) {
        if (!this.aborted && !hi(this, e)) {
            if (this.paused) {
                this._emitQueue.push([t, e])
                return
            }
            var r = Z(e) ? e : this._makeAbs(e)
            if ((this.mark && (e = this._mark(e)), this.absolute && (e = r), !this.matches[t][e])) {
                if (this.nodir) {
                    var i = this.cache[r]
                    if (i === 'DIR' || Array.isArray(i)) return
                }
                this.matches[t][e] = !0
                var n = this.statCache[r]
                n && this.emit('stat', e, n), this.emit('match', e)
            }
        }
    }
    g.prototype._readdirInGlobStar = function(t, e) {
        if (this.aborted) return
        if (this.follow) return this._readdir(t, !1, e)
        var r = 'lstat\0' + t,
            i = this,
            n = Yt(r, a)
        n && ot.lstat(t, n)
        function a(s, c) {
            if (s && s.code === 'ENOENT') return e()
            var o = c && c.isSymbolicLink()
            ;(i.symlinks[t] = o), !o && c && !c.isDirectory() ? ((i.cache[t] = 'FILE'), e()) : i._readdir(t, !1, e)
        }
    }
    g.prototype._readdir = function(t, e, r) {
        if (!this.aborted && ((r = Yt('readdir\0' + t + '\0' + e, r)), !!r)) {
            if (e && !zt(this.symlinks, t)) return this._readdirInGlobStar(t, r)
            if (zt(this.cache, t)) {
                var i = this.cache[t]
                if (!i || i === 'FILE') return r()
                if (Array.isArray(i)) return r(null, i)
            }
            var n = this
            ot.readdir(t, vi(this, t, r))
        }
    }
    function vi(t, e, r) {
        return function(i, n) {
            i ? t._readdirError(e, i, r) : t._readdirEntries(e, n, r)
        }
    }
    g.prototype._readdirEntries = function(t, e, r) {
        if (!this.aborted) {
            if (!this.mark && !this.stat)
                for (var i = 0; i < e.length; i++) {
                    var n = e[i]
                    t === '/' ? (n = t + n) : (n = t + '/' + n), (this.cache[n] = !0)
                }
            return (this.cache[t] = e), r(null, e)
        }
    }
    g.prototype._readdirError = function(t, e, r) {
        if (!this.aborted) {
            switch (e.code) {
                case 'ENOTSUP':
                case 'ENOTDIR':
                    var i = this._makeAbs(t)
                    if (((this.cache[i] = 'FILE'), i === this.cwdAbs)) {
                        var n = new Error(e.code + ' invalid cwd ' + this.cwd)
                        ;(n.path = this.cwd), (n.code = e.code), this.emit('error', n), this.abort()
                    }
                    break
                case 'ENOENT':
                case 'ELOOP':
                case 'ENAMETOOLONG':
                case 'UNKNOWN':
                    this.cache[this._makeAbs(t)] = !1
                    break
                default:
                    ;(this.cache[this._makeAbs(t)] = !1), this.strict && (this.emit('error', e), this.abort()), this.silent || console.error('glob error', e)
                    break
            }
            return r()
        }
    }
    g.prototype._processGlobStar = function(t, e, r, i, n, a, s) {
        var c = this
        this._readdir(r, a, function(o, u) {
            c._processGlobStar2(t, e, r, i, n, a, u, s)
        })
    }
    g.prototype._processGlobStar2 = function(t, e, r, i, n, a, s, c) {
        if (!s) return c()
        var o = i.slice(1),
            u = t ? [t] : [],
            f = u.concat(o)
        this._process(f, n, !1, c)
        var v = this.symlinks[r],
            h = s.length
        if (v && a) return c()
        for (var l = 0; l < h; l++) {
            var p = s[l]
            if (!(p.charAt(0) === '.' && !this.dot)) {
                var m = u.concat(s[l], o)
                this._process(m, n, !0, c)
                var d = u.concat(s[l], i)
                this._process(d, n, !0, c)
            }
        }
        c()
    }
    g.prototype._processSimple = function(t, e, r) {
        var i = this
        this._stat(t, function(n, a) {
            i._processSimple2(t, e, n, a, r)
        })
    }
    g.prototype._processSimple2 = function(t, e, r, i, n) {
        if ((this.matches[e] || (this.matches[e] = Object.create(null)), !i)) return n()
        if (t && Z(t) && !this.nomount) {
            var a = /[\/\\]$/.test(t)
            t.charAt(0) === '/' ? (t = Ht.join(this.root, t)) : ((t = Ht.resolve(this.root, t)), a && (t += '/'))
        }
        process.platform === 'win32' && (t = t.replace(/\\/g, '/')), this._emitMatch(e, t), n()
    }
    g.prototype._stat = function(t, e) {
        var r = this._makeAbs(t),
            i = t.slice(-1) === '/'
        if (t.length > this.maxLength) return e()
        if (!this.stat && zt(this.cache, r)) {
            var n = this.cache[r]
            if ((Array.isArray(n) && (n = 'DIR'), !i || n === 'DIR')) return e(null, n)
            if (i && n === 'FILE') return e()
        }
        var a,
            s = this.statCache[r]
        if (s !== void 0) {
            if (s === !1) return e(null, s)
            var c = s.isDirectory() ? 'DIR' : 'FILE'
            return i && c === 'FILE' ? e() : e(null, c, s)
        }
        var o = this,
            u = Yt('stat\0' + r, f)
        u && ot.lstat(r, u)
        function f(v, h) {
            if (h && h.isSymbolicLink())
                return ot.stat(r, function(l, p) {
                    l ? o._stat2(t, r, null, h, e) : o._stat2(t, r, l, p, e)
                })
            o._stat2(t, r, v, h, e)
        }
    }
    g.prototype._stat2 = function(t, e, r, i, n) {
        if (r && (r.code === 'ENOENT' || r.code === 'ENOTDIR')) return (this.statCache[e] = !1), n()
        var a = t.slice(-1) === '/'
        if (((this.statCache[e] = i), e.slice(-1) === '/' && i && !i.isDirectory())) return n(null, !1, i)
        var s = !0
        return i && (s = i.isDirectory() ? 'DIR' : 'FILE'), (this.cache[e] = this.cache[e] || s), a && s === 'FILE' ? n() : n(null, s, i)
    }
})
var vt = class {
        constructor() {
            this.isDebug = !1
        }
        toggleDebug() {
            this.isDebug = !this.isDebug
        }
        async log(e) {
            try {
                this.isDebug && (await $common.fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message: e }))
            } catch (r) {
                console.log(r)
            }
        }
    },
    Xt = vt
var mt = pr(require('axios')),
    dt
;(function(t) {
    ;(t.GET = 'GET'), (t.POST = 'POST')
})(dt || (dt = {}))
var te = class {
        constructor(e, r) {
            this.BASE_URL = e
            this.COMPLETE = r
            this.DEFAULT_HEADER = {}
            ;(this.BASE_URL = e), (this.COMPLETE = r)
        }
        async request(e, r, i, n) {
            try {
                let a = await mt.default({ method: e, url: this.BASE_URL + (r || ''), data: i, headers: n || this.DEFAULT_HEADER || {} })
                return await this.COMPLETE(a.data)
            } catch (a) {
                throw a
            }
        }
    },
    gt = class {
        constructor() {}
        getRequester(e, r) {
            return new te(e, r)
        }
        async fetch(e, r = dt.GET, i = {}, n = {}) {
            return (await mt.default({ method: r, url: e, data: i, headers: n })).data
        }
    },
    ee = gt
var yt = class {
        constructor() {}
        getTimeDTO() {
            return { year: '', day: '', hour: '', min: '', sec: '', full: '', week: '' }
        }
        getYYMMDD(e = Date.now()) {
            let r = ''
            return (
                new Date(e)
                    .toLocaleDateString()
                    .split('/')
                    .forEach((i) => (r += Number(i) < 10 ? `/0${i}` : `/${i}`)),
                r.replace('/', '')
            )
        }
        getYY(e = Date.now()) {
            return new Date(e).getFullYear().toString()
        }
        getMM(e = Date.now()) {
            let r = new Date(e).getMonth() + 1
            return (r < 10 ? `0${r}` : r).toString()
        }
        getDD(e = Date.now()) {
            let r = new Date(e).getDate()
            return (r < 10 ? `0${r}` : r).toString()
        }
        getHHMMSS(e = Date.now()) {
            let r = null,
                i = new Date(e)
            return (
                (r = this.getTimeDTO()),
                (r.hour = i.getHours() < 10 ? `0${i.getHours()}` : i.getHours().toString()),
                (r.min = i.getMinutes() < 10 ? `0${i.getMinutes()}` : i.getMinutes().toString()),
                (r.sec = i.getSeconds() < 10 ? `0${i.getSeconds()}` : i.getSeconds().toString()),
                (r.full = `${r.hour}:${r.min}:${r.sec}`),
                r
            )
        }
        getFullTime(e = Date.now()) {
            let r = this.getHHMMSS()
            return (r.year = new Date(e).getFullYear().toString()), (r.full = `${r.year} ${r.full}`), r
        }
        getTimeGap(e = Date.now() + 864e5) {
            let r = null,
                i = e - Date.now()
            if (i > 0) {
                r = this.getTimeDTO()
                let n = ~~(i / 1e3 / 60 / 60) % 24
                r.hour = n < 10 ? `0${n}` : n.toString()
                let a = ~~(i / 1e3 / 60) % 60
                r.min = a < 10 ? `0${a}` : a.toString()
                let s = ~~(i / 1e3) % 60
                ;(r.sec = s < 10 ? `0${s}` : s.toString()), (r.full = `${r.hour}:${r.min}:${r.sec}`)
            }
            return r
        }
        getChineseWeek(e = Date.now()) {
            let r = ''
            switch (new Date(e).getDay()) {
                case 1:
                    r = '\u5468\u4E00'
                    break
                case 2:
                    r = '\u5468\u4E8C'
                    break
                case 3:
                    r = '\u5468\u4E09'
                    break
                case 4:
                    r = '\u5468\u56DB'
                    break
                case 5:
                    r = '\u5468\u4E94'
                    break
                case 6:
                    r = '\u5468\u516D'
                    break
                case 0:
                    r = '\u5468\u65E5'
                    break
            }
            return r
        }
    },
    re = yt
var bt = class {
        constructor() {}
        isValidMobile(e) {
            return /^[1][0-9]{10}$/.test(e)
        }
        isValidEmail(e) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
        }
    },
    ie = bt
var wt = class {
        constructor() {}
        getLatLngDistance(e, r, i, n) {
            let a = (e * Math.PI) / 180,
                s = (i * Math.PI) / 180,
                c = a - s,
                o = (r * Math.PI) / 180 - (n * Math.PI) / 180,
                u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(c / 2), 2) + Math.cos(a) * Math.cos(s) * Math.pow(Math.sin(o / 2), 2)))
            return (u = u * 6378.137), (u = Math.round(u * 1e4) / 1e4), u.toFixed(2)
        }
        wannaObject(e, r) {
            return e
        }
    },
    ne = wt
var Et = class {
    constructor() {
        this.BinderMap = new Map()
        this.bindClass(this, 'Log', Xt),
            this.bindClass(this, 'Requester', ee),
            this.bindClass(this, 'UtilsTime', re),
            this.bindClass(this, 'UtilsVaild', ie),
            this.bindClass(this, 'UtilsCalculation', ne)
    }
    bindClass(e, r, i) {
        i instanceof Function &&
            (e.BinderMap.set(r, new i()),
            Object.getOwnPropertyNames(i.prototype).forEach((n) => {
                n !== 'constructor' &&
                    (e[n] = (...a) => {
                        let s = e.BinderMap.get(r)
                        return s[n].apply(s, a)
                    })
            }))
    }
}
var _t = class {
        constructor() {}
        Response(e = null) {
            return (r, i, n) => {
                let a = n.value
                n.value = async function(...s) {
                    let c = { code: null, data: null, message: '' },
                        o = s[1]
                    try {
                        let u = await a.apply(this, s)
                        ;(c.code = 200), (c.data = u || e)
                    } catch (u) {
                        c.message = u.message || u
                    } finally {
                        o.send(c)
                    }
                }
            }
        }
        getIPv4() {
            let e = null
            if (global.process.platform === 'win32') {
                let r = require('os').networkInterfaces()
                for (let i in r)
                    if (i === '\u4EE5\u592A\u7F51' || i === 'WLAN') {
                        for (let n in r[i]) {
                            let a = r[i][n]
                            if (a.family === 'IPv4') {
                                e = a.address
                                break
                            }
                        }
                        break
                    }
            }
            return e
        }
        printRed(e) {
            console.log(`[41m[30m${e}[0m`)
        }
        printYellow(e) {
            console.log(`[43m[30m${e}[0m`)
        }
        printBlue(e) {
            console.log(`[44m[37m${e}[0m`)
        }
        printGreen(e) {
            console.log(`[42m[30m${e}[0m`)
        }
        printLink(e) {
            console.log(`[34m${e}[0m`)
        }
        printText(e) {
            console.log(`[33m${e}[0m`)
        }
    },
    ae = _t
var se = class extends Et {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', ae)
    }
}
global.$common = new se()
var I
;(function(t) {
    ;(t.WHITE = 'white'), (t.GREEN = 'green'), (t.YELLOW = 'yellow'), (t.RED = 'red')
})(I || (I = {}))
function oe(t, e) {
    if (((t = t.replace(/\n/g, ' ')), mr(t))) {
        let c = global.$common.getFullTime().full
        e({ pid: null, text: `@Node(${process.pid}) Danger Cmd: ${t}`, html: G(I.RED, `@Node(${process.pid}) Danger Cmd: ${t}`, c) })
        return
    }
    let r = require('child_process').exec(t, { maxBuffer: 1024 * 1024 * 1024 }, (c, o, u) => {
            let f = `@Node(${process.pid}) Cmd(${r.pid})`,
                v = global.$common.getFullTime().full,
                h = { pid: null, text: `${f} \u4EFB\u52A1\u7ED3\u675F`, html: G(I.GREEN, f, '', v) }
            c
                ? ((h.text = `${f} \u8FDB\u7A0B\u5F02\u5E38:${c.message}`), (h.html = G(I.RED, f, h.text, v)))
                : u && ((h.text = `${f} \u4EFB\u52A1\u5F02\u5E38:${u.message}`), (h.html = G(I.RED, f, h.text, v))),
                e(h)
        }),
        i = 'latin1'
    r.stdout.setEncoding(r.stdout.readableEncoding)
    let n = 'utf8',
        a = `@Node(${process.pid}) Cmd(${r.pid}) ${i}=>${n}:Start`,
        s = require('iconv-lite')
    return (
        e({ pid: r.pid, text: a, html: G(I.GREEN, a) }),
        r.stdout.on('data', (c) => {
            let o = s.decode(Buffer.from(`@Log(${r.pid}) ${c}`, i), n)
            e({ pid: r.pid, text: o, html: G(I.WHITE, o) }), c.includes('Merge conflict') && vr(r.pid)
        }),
        r.pid
    )
}
function vr(t) {
    require('tree-kill')(t)
}
function mr(t) {
    t = t.trim().toUpperCase()
    let e = !1
    return t.length === 0 && (e = !0), t.indexOf('SSH') >= 0 && (e = !0), e
}
function G(t, ...e) {
    let r = ''
    return e.forEach((i) => (r += `<span style="color:${t}">${i}</sapn><br>`)), r
}
var mi = { web: !0, node: !0, electron: !0 },
    K = process.argv[2]
mi[K] ||
    (global.$common.printText(`\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5E94\u7528\u7C7B\u578B npm run dev (${K}) (name) 
`),
    process.exit())
var ct = null,
    di = Rt().sync(`./src/${K}/apps/*/*.js`)
di.forEach((t) => (t.split('/').reverse()[1] === process.argv[3] ? (ct = process.argv[3]) : ''))
ct ||
    (global.$common.printText(`\u627E\u4E0D\u5230\u5E94\u7528 npm run dev ${K} (${process.argv[3]}) 
`),
    process.exit())
var rr = require('path'),
    V = ''
switch (K) {
    case 'web': {
        V += `vue-cli-service serve ${rr.join(__dirname, `./web/apps/${ct}/main.js`)}`
        break
    }
    case 'node': {
        let t = rr.join(process.cwd(), `./src/node/apps/${ct}/main.js`)
        ;(V += 'node ./src/node/esbuild.config.js'), (V += ` && node ${t} ${process.argv[4]}`)
        break
    }
}
V && oe(V, (t) => console.log(t.text))
