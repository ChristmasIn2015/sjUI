var L = Object.create,
    d = Object.defineProperty,
    N = Object.getPrototypeOf,
    Y = Object.prototype.hasOwnProperty,
    q = Object.getOwnPropertyNames,
    S = Object.getOwnPropertyDescriptor
var z = (i) => d(i, '__esModule', { value: !0 })
var F = (i, e, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let r of q(e)) !Y.call(i, r) && r !== 'default' && d(i, r, { get: () => e[r], enumerable: !(t = S(e, r)) || t.enumerable })
        return i
    },
    g = (i) => (i && i.__esModule ? i : F(z(d(i != null ? L(N(i)) : {}, 'default', { value: i, enumerable: !0 })), i)),
    m = (i, e, t, r) => {
        for (var n = r > 1 ? void 0 : r ? S(e, t) : e, s = i.length - 1, o; s >= 0; s--) (o = i[s]) && (n = (r ? o(e, t, n) : o(n)) || n)
        return r && n && d(e, t, n), n
    }
var b = class {
        constructor() {
            this.isDebug = !0
        }
        toggleDebug() {
            this.isDebug = !this.isDebug
        }
        async log(e) {
            try {
                this.isDebug && (await global.$common.fetch('http://wqao.top:7001/yjy-log/create', 'POST', { message: e }))
            } catch (t) {
                console.log(t)
            }
        }
    },
    C = b
var h = g(require('axios')),
    $
;(function (i) {
    ;(i.GET = 'GET'), (i.POST = 'POST')
})($ || ($ = {}))
var B = class {
        constructor(e, t) {
            this.BASE_URL = e
            this.COMPLETE = t
            this.DEFAULT_HEADER = {}
            ;(this.BASE_URL = e), (this.COMPLETE = t)
        }
        async request(e, t, r, n) {
            try {
                let s = await h.default({ method: e, url: this.BASE_URL + (t || ''), data: r, headers: n || this.DEFAULT_HEADER || {} })
                return await this.COMPLETE(s.data)
            } catch (s) {
                throw s
            }
        }
    },
    p = class {
        constructor() {}
        getRequester(e, t) {
            return new B(e, t)
        }
        async fetch(e, t, r, n) {
            return (await h.default({ method: t, url: e, data: r, headers: n })).data
        }
    },
    x = p
var f = class {
        constructor() {}
        getTimeDTO() {
            return { year: '', day: '', hour: '', min: '', sec: '', full: '', week: '' }
        }
        getYYMMDD(e = Date.now()) {
            let t = ''
            return (
                new Date(e)
                    .toLocaleDateString()
                    .split('/')
                    .forEach((r) => (t += Number(r) < 10 ? `/0${r}` : `/${r}`)),
                t.replace('/', '')
            )
        }
        getYY(e = Date.now()) {
            return new Date(e).getFullYear().toString()
        }
        getMM(e = Date.now()) {
            let t = new Date(e).getMonth() + 1
            return (t < 10 ? `0${t}` : t).toString()
        }
        getDD(e = Date.now()) {
            let t = new Date(e).getDate()
            return (t < 10 ? `0${t}` : t).toString()
        }
        getHHMMSS(e = Date.now()) {
            let t = null,
                r = new Date(e)
            return (
                (t = this.getTimeDTO()),
                (t.hour = r.getHours() < 10 ? `0${r.getHours()}` : r.getHours().toString()),
                (t.min = r.getMinutes() < 10 ? `0${r.getMinutes()}` : r.getMinutes().toString()),
                (t.sec = r.getSeconds() < 10 ? `0${r.getSeconds()}` : r.getSeconds().toString()),
                (t.full = `${t.hour}:${t.min}:${t.sec}`),
                t
            )
        }
        getFullTime(e = Date.now()) {
            let t = this.getHHMMSS()
            return (t.year = new Date(e).getFullYear().toString()), (t.full = `${t.year} ${t.full}`), t
        }
        getTimeGap(e = Date.now() + 864e5) {
            let t = null,
                r = e - Date.now()
            if (r > 0) {
                t = this.getTimeDTO()
                let n = ~~(r / 1e3 / 60 / 60) % 24
                t.hour = n < 10 ? `0${n}` : n.toString()
                let s = ~~(r / 1e3 / 60) % 60
                t.min = s < 10 ? `0${s}` : s.toString()
                let o = ~~(r / 1e3) % 60
                ;(t.sec = o < 10 ? `0${o}` : o.toString()), (t.full = `${t.hour}:${t.min}:${t.sec}`)
            }
            return t
        }
        getChineseWeek(e = Date.now()) {
            let t = ''
            switch (new Date(e).getDay()) {
                case 1:
                    t = '\u5468\u4E00'
                    break
                case 2:
                    t = '\u5468\u4E8C'
                    break
                case 3:
                    t = '\u5468\u4E09'
                    break
                case 4:
                    t = '\u5468\u56DB'
                    break
                case 5:
                    t = '\u5468\u4E94'
                    break
                case 6:
                    t = '\u5468\u516D'
                    break
                case 0:
                    t = '\u5468\u65E5'
                    break
            }
            return t
        }
    },
    M = f
var w = class {
        constructor() {}
        isValidMobile(e) {
            return /^[1][0-9]{10}$/.test(e)
        }
        isValidEmail(e) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
        }
    },
    A = w
var y = class {
        constructor() {}
        getLatLngDistance(e, t, r, n) {
            let s = (e * Math.PI) / 180,
                o = (r * Math.PI) / 180,
                a = s - o,
                l = (t * Math.PI) / 180 - (n * Math.PI) / 180,
                c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(s) * Math.cos(o) * Math.pow(Math.sin(l / 2), 2)))
            return (c = c * 6378.137), (c = Math.round(c * 1e4) / 1e4), c.toFixed(2)
        }
        wannaObject(e, t) {
            return e
        }
    },
    k = y
var T = class {
    constructor() {
        this.BinderMap = new Map()
        this.bindClass(this, 'Log', C),
            this.bindClass(this, 'Requester', x),
            this.bindClass(this, 'UtilsTime', M),
            this.bindClass(this, 'UtilsVaild', A),
            this.bindClass(this, 'UtilsCalculation', k)
    }
    bindClass(e, t, r) {
        r instanceof Function &&
            (e.BinderMap.set(t, new r()),
            Object.getOwnPropertyNames(r.prototype).forEach((n) => {
                n !== 'constructor' &&
                    (e[n] = (...s) => {
                        let o = e.BinderMap.get(t)
                        return o[n].apply(o, s)
                    })
            }))
    }
}
var D = class {
        constructor() {
            this.IPv4 = null
            this.IPv4 = this.getIPv4()
        }
        AlfredLogin() {
            let e = this.IPv4
            return (t, r, n) => {
                let s = n.value
                n.value = async function (...o) {
                    let a = o[0],
                        l = o[1]
                    try {
                        let c = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, { authorization: a.header('authorization') })
                        if (c.code !== 200) throw new Error(`${c.message}(code:${c.code})`)
                        await s.apply(this, o)
                    } catch (c) {
                        l.send({ code: null, data: null, message: `\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${c.message}` })
                    }
                }
            }
        }
        AlfredLoginWS() {
            let e = this.IPv4
            return (t, r, n) => {
                let s = n.value
                n.value = async function (...o) {
                    let a = o[0]
                    try {
                        let l = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, {})
                        if (l.code !== 200) throw new Error(`${l.message}(code:${l.code})`)
                        await s.apply(this, o)
                    } catch (l) {
                        global.$common.log(l.message), console.log(l.message)
                    }
                }
            }
        }
        Response(e = '') {
            return (t, r, n) => {
                let s = n.value
                n.value = async function (...o) {
                    let a = { code: null, data: null, message: '' }
                    try {
                        let l = await s.apply(this, o)
                        ;(a.code = 200), (a.data = l || e)
                    } catch (l) {
                        a.message = l.message || l
                    } finally {
                        o[1].send(a)
                    }
                }
            }
        }
        getIPv4() {
            let e = null
            if (global.process.platform === 'win32') {
                let t = require('os').networkInterfaces()
                for (let r in t)
                    if (r === '\u4EE5\u592A\u7F51' || r === 'WLAN') {
                        for (let n in t[r]) {
                            let s = t[r][n]
                            if (s.family === 'IPv4') {
                                e = s.address
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
    v = D
var _ = class extends T {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', v)
    }
}
global.$common = new _()
var j = g(require('mongodb')),
    E = class {
        constructor(e) {
            this.DBAddress = ''
            this.DBOrigin = null
            this.DBAddress = e
        }
        start() {
            return new Promise((e, t) => {
                j.MongoClient.connect(this.DBAddress, { useUnifiedTopology: !0 }, (r, n) => {
                    r ? t(r) : ((this.DBOrigin = n.db(this.DBAddress.split('/').reverse()[0])), e(!0))
                })
            })
        }
        getTableCaller(e) {
            return new Promise((t, r) => {
                this.DBOrigin.collection(e, { strict: !0 }, (n, s) => {
                    n
                        ? n.message === `Collection ${e} does not exist. Currently in strict mode.`
                            ? this.DBOrigin.createCollection(e, {}, (o, a) => {
                                  if (o) {
                                      r(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${o.message}`)
                                      return
                                  }
                                  t(a)
                              })
                            : r(n)
                        : t(s)
                })
            })
        }
    },
    I = E
var U = g(require('mongodb')),
    P = class {
        constructor(e) {
            this.TableName = null
            this.TableStruct = null
            this.TableCaller = null
            this.TableCaller = e
        }
        async init(e, t) {
            ;(this.TableName = e), (this.TableStruct = Object.assign({}, t))
            for (let n in this.TableStruct) this.TableStruct[n] = null
            let r = await this.getOldStruct()
            for (let n in t) {
                if (n === 'id' || n === '_id' || n === 'timeCreate' || n === 'timeUpdate' || r[n]) continue
                let s = {}
                ;(s[n] = null), await this.TableCaller.updateMany({}, { $set: s })
            }
            for (let n in r) {
                if (n === 'id' || n === '_id' || n === 'timeCreate' || n === 'timeUpdate' || t[n]) continue
                let s = {}
                ;(s[n] = null), await this.TableCaller.updateMany({}, { $unset: s })
            }
        }
        async create(e) {
            e = this.model2TableStruct(e)
            let t = Date.now()
            return (
                (e = Object.assign(e, { _id: String(new U.ObjectId()), timeCreate: t, timeUpdate: t })),
                (await this.TableCaller.insertOne(e, { forceServerObjectId: !0 })).ops[0]
            )
        }
        get(e) {
            return new Promise((t, r) => {
                this.TableCaller.find(e).toArray((n, s) => {
                    n ? r(n.message) : t(s[0] || null)
                })
            })
        }
        query(e) {
            return new Promise((t, r) => {
                this.TableCaller.find(e).toArray((n, s) => {
                    n ? r(n.message) : t(s)
                })
            })
        }
        async update(e, t) {
            let r = this.getStruct()
            for (let s in t) s === '_id' || s === 'timeCreate' || s === 'timeUpdate' || (r[s] === void 0 && delete t[s])
            return (t = Object.assign(t, { timeUpdate: Date.now() })), await this.TableCaller.updateMany(e, { $set: t })
        }
        async delete(e) {
            if ((await this.TableCaller.deleteOne({ _id: e })).deletedCount !== 1) throw new Error(`${e} \u4E0D\u5B58\u5728`)
            return !0
        }
        async getOldStruct() {
            let e = await this.get({})
            for (let t in e) e[t] = !0
            return e || {}
        }
        getStruct() {
            return Object.assign({}, this.TableStruct)
        }
        model2TableStruct(e) {
            let t = this.getStruct() || {}
            for (let r in t) e[r] && (t[r] = e[r])
            return t
        }
    },
    H = P
var O = class {
        constructor() {
            this.VUE_PATH = require('path').join(process.cwd(), './src/web/dist')
            this.BinderMap = new Map()
            this.cabinDB = null
            this.cabinHandler = null
            this.cabinInfo = null
            this.BODY_PARSE = require('body-parser')
            this.EXPRESS = require('express')
            this.EXPRESS_PROXY = require('http-proxy-middleware').createProxyMiddleware
            this.NODE_WEBSOCKET = require('nodejs-websocket')
            this.NODE_WEBSOCKET_ConnectionMAP = {}
            this.NODE_WEBSOCKET_OrderMAP = {}
        }
        async dbLink(e) {
            ;(this.cabinDB = new I(e)), await this.cabinDB.start()
        }
        async dbTabler(e) {
            if ((global.$db || (global.$db = {}), !this.cabinDB)) throw new Error('\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728')
            for (let t in e) {
                let r = e[t].name,
                    n = await this.cabinDB.getTableCaller(r)
                ;(global.$db[r] = new H(n)), await global.$db[r].init(r, e[t].struct)
            }
        }
        express(e, t) {
            ;(this.cabinInfo = { CabinHandler: 'express', APP_NAME: t, IPv4: global.$common.getIPv4(), SOCKET_NUMBER: e }),
                e &&
                    ((this.cabinHandler = this.EXPRESS()),
                    this.cabinHandler.all('*', (r, n, s) => {
                        n.header('Access-Control-Allow-Origin', '*'),
                            n.header('Access-Control-Allow-Headers', '*'),
                            n.header('Access-Control-Allow-Methods', '*'),
                            s()
                    }),
                    this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),
                    this.cabinHandler.listen(e, '0.0.0.0'))
        }
        expressProxy(e, t, r) {
            let n = { target: t, changeOrigin: !0, ws: r }
            this.cabinHandler.use(e, this.EXPRESS_PROXY(n))
        }
        expressHtml(e, t) {
            !this.cabinInfo.SOCKET_NUMBER || this.cabinHandler.get(e, (r, n) => n.sendFile(t))
        }
        expressRoute(e, t, r) {
            if (!!this.cabinInfo.SOCKET_NUMBER)
                switch (e) {
                    case 'GET':
                        this.cabinHandler.get(t, (n, s) => r(n, s))
                        break
                    case 'POST':
                        this.cabinHandler.post(t, this.BODY_PARSE.json(), (n, s) => r(n, s))
                        break
                }
        }
        websocket(e, t) {
            return (
                (this.cabinInfo = { CabinHandler: 'websocket', APP_NAME: t, IPv4: global.$common.getIPv4(), SOCKET_NUMBER: e }),
                new Promise((r, n) => {
                    if (!e) {
                        n(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${e}`)
                        return
                    }
                    ;(this.cabinHandler = this.NODE_WEBSOCKET.createServer((s) => {
                        let o = s.key
                        ;(this.NODE_WEBSOCKET_ConnectionMAP[o] = s),
                            s.on('text', async (a) => {
                                try {
                                    if (typeof a != 'string') return
                                    ;(a = JSON.parse(a)), (a.connectionKey = o)
                                    let l = this.NODE_WEBSOCKET_OrderMAP[a.orderName]
                                    if (!a.orderName || !l) return
                                    await l(a)
                                } catch (l) {
                                    this.websocketAnswer({ connectionKey: o, orderName: `${a.orderName}/error`, DTO: l.message })
                                }
                            }),
                            s.on('close', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[o]
                            }),
                            s.on('error', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[o]
                            })
                    })),
                        this.cabinHandler.listen(e),
                        r(!0)
                })
            )
        }
        websocketRoute(e, t) {
            !e || (this.NODE_WEBSOCKET_OrderMAP[e] = t)
        }
        websocketAnswer(e) {
            let t = this.NODE_WEBSOCKET_ConnectionMAP[e.connectionKey]
            !t || t.sendText(JSON.stringify(e))
        }
        websocketBoardCast(e) {}
    },
    R = O
var W = global.$common.Response,
    u = class {
        constructor() {
            this.JWT = null
            this.JWT_KEY = 'wqao'
            this.MD5 = null
            ;(this.JWT = require('jsonwebtoken')), (this.MD5 = require('js-md5'))
        }
        async login(e, t) {
            if (!e.body.account || e.body.account.length < 5) throw new Error('\u8D26\u53F7\u81F3\u5C11\u4E3A5\u4F4D')
            if (!e.body.password || e.body.password.length < 5) throw new Error('\u5BC6\u7801\u81F3\u5C11\u4E3A5\u4F4D')
            let r = String(e.body.account),
                n = this.MD5(e.body.password).toUpperCase(),
                s = { account: r },
                o = await global.$db.User.get(s)
            if (!o) o = await global.$db.User.create({ nickname: e.body.nickname, account: r, password: n })
            else if (n !== o.password) throw new Error('\u60A8\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u6B63\u786E')
            let a = { nickname: e.body.nickname, account: r, authoTime: Date.now() }
            return (
                await global.$db.User.update(s, { authorization: this.JWT.sign(a, this.JWT_KEY) }),
                (o = await global.$db.User.get(s)),
                { _id: o._id, nickname: o.nickname, account: o.account, authorization: o.authorization }
            )
        }
        async getUserInfo(e, t) {
            let r = e.header('authorization')
            if (!r) throw new Error('\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25, \u8BF7\u91CD\u65B0\u767B\u5F55')
            let n = this.JWT.verify(r, this.JWT_KEY).account,
                s = await global.$db.User.get({ account: n })
            if (!s) throw new Error(`\u7528\u6237\u4E0D\u5B58\u5728:${n}`)
            return { _id: s._id, nickname: s.nickname, account: s.account }
        }
    }
m([W('\u767B\u5F55\u6210\u529F')], u.prototype, 'login', 1), m([W('\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u6210\u529F')], u.prototype, 'getUserInfo', 1)
var K = u
async function J() {
    try {
        let i = parseInt(process.argv[2])
        if (!i) throw new Error(`please chose a socket number, now is ${i}`)
        let e = new R()
        await e.dbLink('mongodb://127.0.0.1:27017/Alfred'),
            await e.dbTabler([
                { name: 'User', struct: { nickname: 'string', account: 'string', password: 'string', authorization: 'string', authoTime: 'number' } },
            ]),
            global.$common.bindClass(e, 'Alfred_User', K),
            e.express(i, 'alfred'),
            (global.Cabin = e),
            e.expressRoute('POST', '/alfred/user/login', global.Cabin.login),
            e.expressRoute('POST', '/alfred/user/info', global.Cabin.getUserInfo)
        let t = `http://${e.cabinInfo.IPv4}:7000`
        e.expressProxy('/dev-ops', t, !0)
        let r = `http://${e.cabinInfo.IPv4}:7001`
        e.expressProxy('/yjy-log/list', r),
            e.expressProxy('/yjy-log/create', r),
            e.expressHtml('/alfred', require('path').join(process.cwd(), './src/web/dist/Alfred.html')),
            e.expressHtml('/solomon', require('path').join(process.cwd(), './src/web/dist/Solomon.html')),
            console.log(e.cabinInfo)
    } catch (i) {
        console.log('Alfred Error:', i.message), process.exit()
    }
}
J()
