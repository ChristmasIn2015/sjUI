var Y = Object.create,
    h = Object.defineProperty,
    F = Object.getPrototypeOf,
    G = Object.prototype.hasOwnProperty,
    X = Object.getOwnPropertyNames,
    z = Object.getOwnPropertyDescriptor
var V = (s) => h(s, '__esModule', { value: !0 })
var Z = (s, e, t) => {
        if ((e && typeof e == 'object') || typeof e == 'function')
            for (let n of X(e)) !G.call(s, n) && n !== 'default' && h(s, n, { get: () => e[n], enumerable: !(t = z(e, n)) || t.enumerable })
        return s
    },
    p = (s) => (s && s.__esModule ? s : Z(V(h(s != null ? Y(F(s)) : {}, 'default', { value: s, enumerable: !0 })), s))
var f = class {
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
    B = f
var w = p(require('axios')),
    A
;(function (s) {
    ;(s.GET = 'GET'), (s.POST = 'POST')
})(A || (A = {}))
var M = class {
        constructor(e, t) {
            this.BASE_URL = e
            this.COMPLETE = t
            this.DEFAULT_HEADER = {}
            ;(this.BASE_URL = e), (this.COMPLETE = t)
        }
        async request(e, t, n, r) {
            try {
                let i = await w.default({ method: e, url: this.BASE_URL + (t || ''), data: n, headers: r || this.DEFAULT_HEADER || {} })
                return await this.COMPLETE(i.data)
            } catch (i) {
                throw i
            }
        }
    },
    D = class {
        constructor() {}
        getRequester(e, t) {
            return new M(e, t)
        }
        async fetch(e, t, n, r) {
            return (await w.default({ method: t, url: e, data: n, headers: r })).data
        }
    },
    k = D
var T = class {
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
                    .forEach((n) => (t += Number(n) < 10 ? `/0${n}` : `/${n}`)),
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
                n = new Date(e)
            return (
                (t = this.getTimeDTO()),
                (t.hour = n.getHours() < 10 ? `0${n.getHours()}` : n.getHours().toString()),
                (t.min = n.getMinutes() < 10 ? `0${n.getMinutes()}` : n.getMinutes().toString()),
                (t.sec = n.getSeconds() < 10 ? `0${n.getSeconds()}` : n.getSeconds().toString()),
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
                n = e - Date.now()
            if (n > 0) {
                t = this.getTimeDTO()
                let r = ~~(n / 1e3 / 60 / 60) % 24
                t.hour = r < 10 ? `0${r}` : r.toString()
                let i = ~~(n / 1e3 / 60) % 60
                t.min = i < 10 ? `0${i}` : i.toString()
                let o = ~~(n / 1e3) % 60
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
    v = T
var y = class {
        constructor() {}
        isValidMobile(e) {
            return /^[1][0-9]{10}$/.test(e)
        }
        isValidEmail(e) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)
        }
    },
    _ = y
var E = class {
        constructor() {}
        getLatLngDistance(e, t, n, r) {
            let i = (e * Math.PI) / 180,
                o = (n * Math.PI) / 180,
                a = i - o,
                l = (t * Math.PI) / 180 - (r * Math.PI) / 180,
                c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(l / 2), 2)))
            return (c = c * 6378.137), (c = Math.round(c * 1e4) / 1e4), c.toFixed(2)
        }
        wannaObject(e, t) {
            return e
        }
    },
    R = E
var O = class {
    constructor() {
        this.BinderMap = new Map()
        this.bindClass(this, 'Log', B),
            this.bindClass(this, 'Requester', k),
            this.bindClass(this, 'UtilsTime', v),
            this.bindClass(this, 'UtilsVaild', _),
            this.bindClass(this, 'UtilsCalculation', R)
    }
    bindClass(e, t, n) {
        n instanceof Function &&
            (e.BinderMap.set(t, new n()),
            Object.getOwnPropertyNames(n.prototype).forEach((r) => {
                r !== 'constructor' &&
                    (e[r] = (...i) => {
                        let o = e.BinderMap.get(t)
                        return o[r].apply(o, i)
                    })
            }))
    }
}
var C = class {
        constructor() {
            this.IPv4 = null
            this.IPv4 = this.getIPv4()
        }
        AlfredLogin() {
            let e = this.IPv4
            return (t, n, r) => {
                let i = r.value
                r.value = async function (...o) {
                    let a = o[0],
                        l = o[1]
                    try {
                        let c = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, { authorization: a.header('authorization') })
                        if (c.code !== 200) throw new Error(`${c.message}(code:${c.code})`)
                        await i.apply(this, o)
                    } catch (c) {
                        l.send({ code: null, data: null, message: `\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${c.message}` })
                    }
                }
            }
        }
        AlfredLoginWS() {
            let e = this.IPv4
            return (t, n, r) => {
                let i = r.value
                r.value = async function (...o) {
                    let a = o[0]
                    try {
                        let l = await global.$common.fetch(`http://${e}:80/alfred/user/info`, 'POST', null, {})
                        if (l.code !== 200) throw new Error(`${l.message}(code:${l.code})`)
                        await i.apply(this, o)
                    } catch (l) {
                        global.$common.log(l.message), console.log(l.message)
                    }
                }
            }
        }
        Response(e = '') {
            return (t, n, r) => {
                let i = r.value
                r.value = async function (...o) {
                    let a = { code: null, data: null, message: '' }
                    try {
                        let l = await i.apply(this, o)
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
                for (let n in t)
                    if (n === '\u4EE5\u592A\u7F51' || n === 'WLAN') {
                        for (let r in t[n]) {
                            let i = t[n][r]
                            if (i.family === 'IPv4') {
                                e = i.address
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
    j = C
var I = class extends O {
    constructor() {
        super()
        this.bindClass(this, 'UtilsReactNode', j)
    }
}
global.$common = new I()
var H = p(require('mongodb')),
    $ = class {
        constructor(e) {
            this.DBAddress = ''
            this.DBOrigin = null
            this.DBAddress = e
        }
        start() {
            return new Promise((e, t) => {
                H.MongoClient.connect(this.DBAddress, { useUnifiedTopology: !0 }, (n, r) => {
                    n ? t(n) : ((this.DBOrigin = r.db(this.DBAddress.split('/').reverse()[0])), e(!0))
                })
            })
        }
        getTableCaller(e) {
            return new Promise((t, n) => {
                this.DBOrigin.collection(e, { strict: !0 }, (r, i) => {
                    r
                        ? r.message === `Collection ${e} does not exist. Currently in strict mode.`
                            ? this.DBOrigin.createCollection(e, {}, (o, a) => {
                                  if (o) {
                                      n(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${o.message}`)
                                      return
                                  }
                                  t(a)
                              })
                            : n(r)
                        : t(i)
                })
            })
        }
    },
    N = $
var U = p(require('mongodb')),
    P = class {
        constructor(e) {
            this.TableName = null
            this.TableStruct = null
            this.TableCaller = null
            this.TableCaller = e
        }
        async init(e, t) {
            ;(this.TableName = e), (this.TableStruct = Object.assign({}, t))
            for (let r in this.TableStruct) this.TableStruct[r] = null
            let n = await this.getOldStruct()
            for (let r in t) {
                if (r === 'id' || r === '_id' || r === 'timeCreate' || r === 'timeUpdate' || n[r]) continue
                let i = {}
                ;(i[r] = null), await this.TableCaller.updateMany({}, { $set: i })
            }
            for (let r in n) {
                if (r === 'id' || r === '_id' || r === 'timeCreate' || r === 'timeUpdate' || t[r]) continue
                let i = {}
                ;(i[r] = null), await this.TableCaller.updateMany({}, { $unset: i })
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
            return new Promise((t, n) => {
                this.TableCaller.find(e).toArray((r, i) => {
                    r ? n(r.message) : t(i[0] || null)
                })
            })
        }
        query(e) {
            return new Promise((t, n) => {
                this.TableCaller.find(e).toArray((r, i) => {
                    r ? n(r.message) : t(i)
                })
            })
        }
        async update(e, t) {
            let n = this.getStruct()
            for (let i in t) i === '_id' || i === 'timeCreate' || i === 'timeUpdate' || (n[i] === void 0 && delete t[i])
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
            for (let n in t) e[n] && (t[n] = e[n])
            return t
        }
    },
    W = P
var S = class {
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
            ;(this.cabinDB = new N(e)), await this.cabinDB.start()
        }
        async dbTabler(e) {
            if ((global.$db || (global.$db = {}), !this.cabinDB)) throw new Error('\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728')
            for (let t in e) {
                let n = e[t].name,
                    r = await this.cabinDB.getTableCaller(n)
                ;(global.$db[n] = new W(r)), await global.$db[n].init(n, e[t].struct)
            }
        }
        express(e, t) {
            ;(this.cabinInfo = { CabinHandler: 'express', APP_NAME: t, IPv4: global.$common.getIPv4(), SOCKET_NUMBER: e }),
                e &&
                    ((this.cabinHandler = this.EXPRESS()),
                    this.cabinHandler.all('*', (n, r, i) => {
                        r.header('Access-Control-Allow-Origin', '*'),
                            r.header('Access-Control-Allow-Headers', '*'),
                            r.header('Access-Control-Allow-Methods', '*'),
                            i()
                    }),
                    this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),
                    this.cabinHandler.listen(e, '0.0.0.0'))
        }
        expressProxy(e, t, n) {
            let r = { target: t, changeOrigin: !0, ws: n }
            this.cabinHandler.use(e, this.EXPRESS_PROXY(r))
        }
        expressHtml(e, t) {
            !this.cabinInfo.SOCKET_NUMBER || this.cabinHandler.get(e, (n, r) => r.sendFile(t))
        }
        expressRoute(e, t, n) {
            if (!!this.cabinInfo.SOCKET_NUMBER)
                switch (e) {
                    case 'GET':
                        this.cabinHandler.get(t, (r, i) => n(r, i))
                        break
                    case 'POST':
                        this.cabinHandler.post(t, this.BODY_PARSE.json(), (r, i) => n(r, i))
                        break
                }
        }
        websocket(e, t) {
            return (
                (this.cabinInfo = { CabinHandler: 'websocket', APP_NAME: t, IPv4: global.$common.getIPv4(), SOCKET_NUMBER: e }),
                new Promise((n, r) => {
                    if (!e) {
                        r(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${e}`)
                        return
                    }
                    ;(this.cabinHandler = this.NODE_WEBSOCKET.createServer((i) => {
                        let o = i.key
                        ;(this.NODE_WEBSOCKET_ConnectionMAP[o] = i),
                            i.on('text', async (a) => {
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
                            i.on('close', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[o]
                            }),
                            i.on('error', (a) => {
                                delete this.NODE_WEBSOCKET_ConnectionMAP[o]
                            })
                    })),
                        this.cabinHandler.listen(e),
                        n(!0)
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
    q = S
var u
;(function (s) {
    ;(s.WHITE = 'white'), (s.GREEN = 'green'), (s.YELLOW = 'yellow'), (s.RED = 'red')
})(u || (u = {}))
function L(s, e) {
    if (((s = s.replace(/\n/g, ' ')), Q(s))) {
        let a = global.$common.getFullTime().full
        e({ pid: null, text: `@Node(${process.pid}) Danger Cmd: ${s}`, html: g(u.RED, `@Node(${process.pid}) Danger Cmd: ${s}`, a) })
        return
    }
    let t = require('child_process').exec(s, { maxBuffer: 1024 * 1024 * 1024 }, (a, l, c) => {
            let d = `@Node(${process.pid}) Cmd(${t.pid})`,
                b = global.$common.getFullTime().full,
                m = { pid: null, text: `${d} Task end`, html: g(u.GREEN, d, '', b) }
            a
                ? ((m.text = `${d} Command error:${a.message}`), (m.html = g(u.RED, d, m.text, b)))
                : c && ((m.text = `${d} Task error:${c.message}`), (m.html = g(u.RED, d, m.text, b))),
                e(m)
        }),
        n = 'latin1'
    t.stdout.setEncoding(t.stdout.readableEncoding)
    let r = 'utf8',
        i = `@Node(${process.pid}) Cmd(${t.pid}) Start\uFF1A${n}=>${r}`,
        o = require('iconv-lite')
    return (
        e({ pid: t.pid, text: i, html: g(u.GREEN, i) }),
        t.stdout.on('data', (a) => {
            let l = o.decode(Buffer.from(`@Log(${t.pid}) ${a}`, n), r)
            e({ pid: t.pid, text: l, html: g(u.WHITE, l) }), a.includes('Merge conflict') && J(t.pid)
        }),
        t.pid
    )
}
function J(s) {
    require('tree-kill')(s)
}
function Q(s) {
    s = s.trim().toUpperCase()
    let e = !1
    return s.length === 0 && (e = !0), s.indexOf('SSH') >= 0 && (e = !0), e
}
function g(s, ...e) {
    let t = ''
    return e.forEach((n) => (t += `<span style="color:${s}">${n}</sapn><br>`)), t
}
var Pe = global.$common.AlfredLoginWS,
    x = class {
        constructor() {}
        async getRemoteCmdList(e) {
            let t = await global.$db.Command.query({})
            ;(e.DTO = t), global.Cabin.websocketAnswer(e)
        }
        async createRemoteCmd(e) {
            let t = e.DTO.name,
                n = e.DTO.command
            if (!t) throw new Error(`No empty name: ${t}`)
            if (!n) throw new Error(`No empty command: ${n}`)
            await global.$db.Command.create({ name: t, command: n }), (e.DTO = `db Command create ${t} success`), global.Cabin.websocketAnswer(e)
        }
        async excuteRemoteCmd(e) {
            let t = e.DTO._id,
                n = await global.$db.Command.get({ _id: t })
            if (!n) throw new Error(`can not find '${e.DTO.name}'`)
            L(n.command, (r) => global.Cabin.websocketAnswer({ connectionKey: e.connectionKey, orderName: '/excuteRemoteCmd', DTO: r }))
        }
    },
    K = x
async function ee() {
    try {
        let s = parseInt(process.argv[2])
        if (!s) throw new Error(`Please chose your socket number, now is ${s}`)
        let e = new q()
        await e.dbLink('mongodb://127.0.0.1:27017/DevOps'),
            await e.dbTabler([{ name: 'Command', struct: { name: 'string', command: 'string' } }]),
            global.$common.bindClass(e, 'DevOps_Cmd', K),
            await e.websocket(s, 'DevOps'),
            (global.Cabin = e),
            e.websocketRoute('/createRemoteCmd', global.Cabin.createRemoteCmd),
            e.websocketRoute('/getRemoteCmdList', global.Cabin.getRemoteCmdList),
            e.websocketRoute('/excuteRemoteCmd', global.Cabin.excuteRemoteCmd),
            console.log(e.cabinInfo)
    } catch (s) {
        console.log(s.message), process.exit()
    }
}
ee()
