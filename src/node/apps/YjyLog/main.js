var N = Object.create,
    g = Object.defineProperty,
    K = Object.getPrototypeOf,
    W = Object.prototype.hasOwnProperty,
    Y = Object.getOwnPropertyNames,
    S = Object.getOwnPropertyDescriptor
var F = (o) => g(o, '__esModule', { value: !0 })
var G = (o, e, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let r of Y(e)) !W.call(o, r) && r !== 'default' && g(o, r, { get: () => e[r], enumerable: !(t = S(e, r)) || t.enumerable })
        return o
    },
    m = (o) => (o && o.__esModule ? o : G(F(g(o != null ? N(K(o)) : {}, 'default', { value: o, enumerable: !0 })), o)),
    b = (o, e, t, r) => {
        for (var n = r > 1 ? void 0 : r ? S(e, t) : e, s = o.length - 1, i; s >= 0; s--) (i = o[s]) && (n = (r ? i(e, t, n) : i(n)) || n)
        return r && n && g(e, t, n), n
    }
var d = class {
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
    C = d
var h = m(require('axios')),
    B
;(function (o) {
    ;(o.GET = 'GET'), (o.POST = 'POST')
})(B || (B = {}))
var $ = class {
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
            return new $(e, t)
        }
        async fetch(e, t, r, n) {
            return (await h.default({ method: t, url: e, data: r, headers: n })).data
        }
    },
    M = p
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
                let i = ~~(r / 1e3) % 60
                ;(t.sec = i < 10 ? `0${i}` : i.toString()), (t.full = `${t.hour}:${t.min}:${t.sec}`)
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
    x = f
var y = class {
        constructor() {}
        isValidMobile(e) {
            return /^[1][0-9]{10}$/.test(e)
        }
        isValidEmail(e) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
        }
    },
    A = y
var w = class {
        constructor() {}
        getLatLngDistance(e, t, r, n) {
            let s = (e * Math.PI) / 180,
                i = (r * Math.PI) / 180,
                a = s - i,
                l = (t * Math.PI) / 180 - (n * Math.PI) / 180,
                c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(s) * Math.cos(i) * Math.pow(Math.sin(l / 2), 2)))
            return (c = c * 6378.137), (c = Math.round(c * 1e4) / 1e4), c.toFixed(2)
        }
        wannaObject(e, t) {
            return e
        }
    },
    j = w
var D = class {
    constructor() {
        this.BinderMap = new Map()
        this.bindClass(this, 'Log', C),
            this.bindClass(this, 'Requester', M),
            this.bindClass(this, 'UtilsTime', x),
            this.bindClass(this, 'UtilsVaild', A),
            this.bindClass(this, 'UtilsCalculation', j)
    }
    bindClass(e, t, r) {
        r instanceof Function &&
            (e.BinderMap.set(t, new r()),
            Object.getOwnPropertyNames(r.prototype).forEach((n) => {
                n !== 'constructor' &&
                    (e[n] = (...s) => {
                        let i = e.BinderMap.get(t)
                        return i[n].apply(i, s)
                    })
            }))
    }
}
var T = class {
        constructor() {
            this.IPv4 = null
            this.IPv4 = this.getIPv4()
        }
        AlfredLogin() {
            let e = this.IPv4
            return (t, r, n) => {
                let s = n.value
                n.value = async function (...i) {
                    let a = i[0],
                        l = i[1]
                    try {
                        let c = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, { authorization: a.header('authorization') })
                        if (c.code !== 200) throw new Error(`${c.message}(code:${c.code})`)
                        await s.apply(this, i)
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
                n.value = async function (...i) {
                    let a = i[0]
                    try {
                        let l = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, {})
                        if (l.code !== 200) throw new Error(`${l.message}(code:${l.code})`)
                        await s.apply(this, i)
                    } catch (l) {
                        global.$common.log(l.message), console.log(l.message)
                    }
                }
            }
        }
        Response(e = '') {
            return (t, r, n) => {
                let s = n.value
                n.value = async function (...i) {
                    let a = { code: null, data: null, message: '' }
                    try {
                        let l = await s.apply(this, i)
                        ;(a.code = 200), (a.data = l || e)
                    } catch (l) {
                        a.message = l.message || l
                    } finally {
                        i[1].send(a)
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
    v = T
var k = class extends D {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', v)
    }
}
global.$common = new k()
var _ = m(require('mongodb')),
    O = class {
        constructor(e) {
            this.DBAddress = ''
            this.DBOrigin = null
            this.DBAddress = e
        }
        start() {
            return new Promise((e, t) => {
                _.MongoClient.connect(this.DBAddress, { useUnifiedTopology: !0 }, (r, n) => {
                    r ? t(r) : ((this.DBOrigin = n.db(this.DBAddress.split('/').reverse()[0])), e(!0))
                })
            })
        }
        getTableCaller(e) {
            return new Promise((t, r) => {
                this.DBOrigin.collection(e, { strict: !0 }, (n, s) => {
                    n
                        ? n.message === `Collection ${e} does not exist. Currently in strict mode.`
                            ? this.DBOrigin.createCollection(e, {}, (i, a) => {
                                  if (i) {
                                      r(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${i.message}`)
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
    L = O
var I = m(require('mongodb')),
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
                (e = Object.assign(e, { _id: String(new I.ObjectId()), timeCreate: t, timeUpdate: t })),
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
var E = class {
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
            ;(this.cabinDB = new L(e)), await this.cabinDB.start()
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
                        let i = s.key
                        ;(this.NODE_WEBSOCKET_ConnectionMAP[i] = s),
                            s.on('text', async (a) => {
                                try {
                                    if (typeof a != 'string') return
                                    ;(a = JSON.parse(a)), (a.connectionKey = i)
                                    let l = this.NODE_WEBSOCKET_OrderMAP[a.orderName]
                                    if (!a.orderName || !l) return
                                    await l(a)
                                } catch (l) {
                                    this.websocketAnswer({ connectionKey: i, orderName: `${a.orderName}/error`, DTO: l.message })
                                }
                            }),
                            s.on('close', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[i]
                            }),
                            s.on('error', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[i]
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
    R = E
var U = global.$common.Response,
    X = global.$common.AlfredLogin,
    u = class {
        constructor() {}
        async createLog(e, t) {
            await global.$db.Log.create({ ip: e.ip, message: e.body.message })
        }
        async getLogs(e, t) {
            let r = await global.$db.Log.query({})
            return (
                (r = r.reverse().slice(0, 50)),
                r.forEach((n) => {
                    ;(n.timeCreateChinese = new Date(n.timeCreate).toLocaleString()), (n.timeUpdateChinese = new Date(n.timeUpdate).toLocaleString())
                }),
                r
            )
        }
    }
b([U('\u6DFB\u52A0\u65E5\u5FD7\u6210\u529F')], u.prototype, 'createLog', 1), b([X(), U()], u.prototype, 'getLogs', 1)
var q = u
async function z() {
    try {
        let o = parseInt(process.argv[2])
        if (!o) throw new Error(`Please chose your socket number, now is ${o}`)
        let e = new R()
        await e.dbLink('mongodb://127.0.0.1:27017/YjyLog'),
            await e.dbTabler([{ name: 'Log', struct: { ip: 'string', message: 'object' } }]),
            global.$common.bindClass(e, 'Yjy_Log', q),
            e.express(o, 'YjyLog'),
            (global.Cabin = e),
            e.expressRoute('POST', '/yjy-log/create', global.Cabin.createLog),
            e.expressRoute('GET', '/yjy-log/list', global.Cabin.getLogs),
            console.log(e.cabinInfo)
    } catch (o) {
        console.log(o.message), process.exit()
    }
}
z()
