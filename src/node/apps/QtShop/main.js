var V=Object.create,g=Object.defineProperty,Z=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty,Q=Object.getOwnPropertyNames,x=Object.getOwnPropertyDescriptor;var ee=a=>g(a,"__esModule",{value:!0});var te=(a,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Q(e))!J.call(a,o)&&o!=="default"&&g(a,o,{get:()=>e[o],enumerable:!(t=x(e,o))||t.enumerable});return a},p=a=>a&&a.__esModule?a:te(ee(g(a!=null?V(Z(a)):{},"default",{value:a,enumerable:!0})),a),u=(a,e,t,o)=>{for(var r=o>1?void 0:o?x(e,t):e,s=a.length-1,n;s>=0;s--)(n=a[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&g(e,t,r),r};var f=class{constructor(){this.isDebug=!0}toggleDebug(){this.isDebug=!this.isDebug}async log(e){try{this.isDebug&&await global.$common.fetch("http://wqao.top/yjy-log/create","POST",{message:e})}catch(t){console.log(t)}}},A=f;var y=p(require("axios")),M;(function(a){a.GET="GET",a.POST="POST"})(M||(M={}));var _=class{constructor(e,t){this.BASE_URL=e;this.COMPLETE=t;this.DEFAULT_HEADER={};this.BASE_URL=e,this.COMPLETE=t}async request(e,t,o,r){try{let s=await y.default({method:e,url:this.BASE_URL+(t||""),data:o,headers:r||this.DEFAULT_HEADER||{}});return await this.COMPLETE(s.data)}catch(s){throw s}}},w=class{constructor(){}getRequester(e,t){return new _(e,t)}async fetch(e,t,o,r){return(await y.default({method:t,url:e,data:o,headers:r})).data}},v=w;var S=class{constructor(){}getTimeDTO(){return{year:"",month:"",day:"",hour:"",min:"",sec:"",full:"",week:""}}getYYMMDD(e=Date.now()){let t="";return new Date(e).toLocaleDateString().split("/").forEach(o=>t+=Number(o)<10?`/0${o}`:`/${o}`),t.replace("/","")}getYY(e=Date.now()){return new Date(e).getFullYear().toString()}getMM(e=Date.now()){let t=new Date(e).getMonth()+1;return(t<10?`0${t}`:t).toString()}getDD(e=Date.now()){let t=new Date(e).getDate();return(t<10?`0${t}`:t).toString()}getHHMMSS(e=Date.now()){let t=null,o=new Date(e);return t=this.getTimeDTO(),t.hour=o.getHours()<10?`0${o.getHours()}`:o.getHours().toString(),t.min=o.getMinutes()<10?`0${o.getMinutes()}`:o.getMinutes().toString(),t.sec=o.getSeconds()<10?`0${o.getSeconds()}`:o.getSeconds().toString(),t.full=`${t.hour}:${t.min}:${t.sec}`,t}getFullTime(e=Date.now()){let t=this.getHHMMSS(e);return t.year=new Date(e).getFullYear().toString(),t.full=`${this.getYYMMDD(e)} ${t.full}`,t}getTimeGap(e=Date.now()+864e5){let t=null,o=e-Date.now();if(o>0){t=this.getTimeDTO();let r=~~(o/1e3/60/60)%24;t.hour=r<10?`0${r}`:r.toString();let s=~~(o/1e3/60)%60;t.min=s<10?`0${s}`:s.toString();let n=~~(o/1e3)%60;t.sec=n<10?`0${n}`:n.toString(),t.full=`${t.hour}:${t.min}:${t.sec}`}return t}getChineseWeek(e=Date.now()){let t="";switch(new Date(e).getDay()){case 1:t="\u5468\u4E00";break;case 2:t="\u5468\u4E8C";break;case 3:t="\u5468\u4E09";break;case 4:t="\u5468\u56DB";break;case 5:t="\u5468\u4E94";break;case 6:t="\u5468\u516D";break;case 0:t="\u5468\u65E5";break}return t}},k=S;var D=class{constructor(){}isValidMobile(e){return/^[1][0-9]{10}$/.test(e)}isValidEmail(e){return/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]+$/.test(e)}},H=D;var T=class{constructor(){}getLatLngDistance(e,t,o,r){let s=e*Math.PI/180,n=o*Math.PI/180,i=s-n,l=t*Math.PI/180-r*Math.PI/180,c=2*Math.asin(Math.sqrt(Math.pow(Math.sin(i/2),2)+Math.cos(s)*Math.cos(n)*Math.pow(Math.sin(l/2),2)));return c=c*6378.137,c=Math.round(c*1e4)/1e4,c.toFixed(2)}wannaObject(e,t){return e}},R=T;var O=class{constructor(){this.BinderMap=new Map;this.bindClass(this,"Log",A),this.bindClass(this,"Requester",v),this.bindClass(this,"UtilsTime",k),this.bindClass(this,"UtilsVaild",H),this.bindClass(this,"UtilsCalculation",R)}bindClass(e,t,o){o instanceof Function&&(e.BinderMap.set(t,new o),Object.getOwnPropertyNames(o.prototype).forEach(r=>{r!=="constructor"&&(e[r]=(...s)=>{let n=e.BinderMap.get(t);return n[r].apply(n,s)})}))}};var E=class{constructor(){this.IPv4=null;this.IPv4=this.getIPv4()}AlfredLogin(){let e=this.IPv4;return(t,o,r)=>{let s=r.value;r.value=async function(...n){let i=n[0],l=n[1];try{let c=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:i.header("authorization")});if(c.code!==200)throw new Error(`${c.message}(code:${c.code})`);n.push(c.data),await s.apply(this,n)}catch(c){l.send({code:null,data:null,message:`\u767B\u5F55\u4FE1\u606F\u5F02\u5E38: ${c.message}`})}}}}Response(e=""){return(t,o,r)=>{let s=r.value;r.value=async function(...n){let i={code:null,data:null,message:""},l=Date.now();try{let c=await s.apply(this,n);i.code=200,i.data=c||e}catch(c){i.message=c.message||c}finally{n[1].send(i)}}}}WsAlfredLogin(){let e=this.IPv4;return(t,o,r)=>{let s=r.value;r.value=async function(...n){let i=n[0];try{let l=await global.$common.fetch(`http://${e}:80/alfred/user/info`,"POST",null,{authorization:i.DTO.authorization});if(l.code!==200)throw new Error(`${l.message}`);if(l.data._id!=="603e28cd6b57e016b0bbb9b5")throw new Error("\u60A8\u4E0D\u662F\u7BA1\u7406\u5458");await s.apply(this,n)}catch(l){i.orderName="/request/authorization",i.DTO=l.message||l||"\u60A8\u7684\u6743\u9650\u4E0D\u8DB3",global.Cabin.websocketAnswer(i)}}}}WsResponse(e="",t=!1){return(o,r,s)=>{let n=s.value;s.value=async function(...i){let l=i[0];try{let c=await n.apply(this,i);l.DTO=c||e||null}catch(c){l.orderName="/request/fail",l.DTO=c.message||c}finally{t?global.Cabin.websocketBoardCast(l):global.Cabin.websocketAnswer(l)}}}}ElectronResponse(e=""){return(t,o,r)=>{let s=r.value;r.value=async function(...n){let i={code:null,data:null,message:""};try{let l=await s.apply(this,n);i.code=200,i.data=l||e}catch(l){i.message=l.message||l}finally{return i}}}}getIPv4(){if(this.IPv4)return this.IPv4;let e=null;if(global.process.platform==="win32"){let t=require("os").networkInterfaces();for(let o in t)if(o==="\u4EE5\u592A\u7F51"||o==="WLAN"){for(let r in t[o]){let s=t[o][r];if(s.family==="IPv4"){e=s.address;break}}break}}return e}printRed(e){console.log(`[41m[30m${e}[0m`)}printYellow(e){console.log(`[43m[30m${e}[0m`)}printBlue(e){console.log(`[44m[37m${e}[0m`)}printGreen(e){console.log(`[42m[30m${e}[0m`)}printLink(e){console.log(`[34m${e}[0m`)}printText(e){console.log(`[33m${e}[0m`)}},j=E;var L=class extends O{constructor(){super();this.bindClass(this,"UtilsReactNode",j)}};global.$common=new L;var U=p(require("mongodb")),P=class{constructor(e){this.DBAddress="";this.DBOrigin=null;this.DBAddress=e}start(){return new Promise((e,t)=>{U.MongoClient.connect(this.DBAddress,{useUnifiedTopology:!0},(o,r)=>{o?t(o):(this.DBOrigin=r.db(this.DBAddress.split("/").reverse()[0]),e(!0))})})}getTableCaller(e){return new Promise((t,o)=>{this.DBOrigin.collection(e,{strict:!0},(r,s)=>{r?r.message===`Collection ${e} does not exist. Currently in strict mode.`?this.DBOrigin.createCollection(e,{},(n,i)=>{if(n){o(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${n.message}`);return}t(i)}):o(r):t(s)})})}},N=P;var q=p(require("mongodb")),C=class{constructor(e){this.TableName=null;this.TableStruct=null;this.TableCaller=null;this.TableCaller=e}async init(e,t){this.TableName=e,this.TableStruct=Object.assign({},t);for(let r in this.TableStruct)this.TableStruct[r]=null;let o=await this.getOldStruct();for(let r in t){if(r==="_id"||r==="timeCreate"||r==="timeUpdate"||o[r])continue;let s={};s[r]=null,await this.TableCaller.updateMany({},{$set:s})}for(let r in o){if(r==="_id"||r==="timeCreate"||r==="timeUpdate"||t[r])continue;let s={};s[r]=null,await this.TableCaller.updateMany({},{$unset:s})}}async create(e){e=this.model2TableStruct(e);let t=Date.now();return e=Object.assign(e,{_id:String(new q.ObjectId),timeCreate:t,timeUpdate:t}),(await this.TableCaller.insertOne(e,{forceServerObjectId:!0})).ops[0]}get(e){return new Promise((t,o)=>{this.TableCaller.find(e).toArray((r,s)=>{r?o(r.message):t(s[0]||null)})})}query(e){return new Promise((t,o)=>{this.TableCaller.find(e).toArray((r,s)=>{r?o(r.message):t(s)})})}async update(e,t){let o=this.getStruct();for(let s in t)s==="_id"||s==="timeCreate"||s==="timeUpdate"||o[s]===void 0&&delete t[s];return t=Object.assign(t,{timeUpdate:Date.now()}),await this.TableCaller.updateMany(e,{$set:t})}async delete(e){if((await this.TableCaller.deleteOne({_id:e})).deletedCount!==1)throw new Error(`${e} \u4E0D\u5B58\u5728`);return!0}async getOldStruct(){let e=await this.get({});for(let t in e)e[t]=!0;return e||{}}getStruct(){return Object.assign({},this.TableStruct)}model2TableStruct(e){let t=this.getStruct()||{};for(let o in t)e[o]!==void 0&&(t[o]=e[o]);return t}},K=C;var $=class{constructor(){this.VUE_PATH=require("path").join(process.cwd(),"./src/web/dist");this.BinderMap=new Map;this.cabinDB=null;this.cabinHandler=null;this.cabinInfo=null;this.BODY_PARSE=require("body-parser");this.EXPRESS=require("express");this.EXPRESS_PROXY=require("http-proxy-middleware").createProxyMiddleware;this.NODE_WEBSOCKET=require("nodejs-websocket");this.NODE_WEBSOCKET_ConnectionMAP={};this.NODE_WEBSOCKET_OrderMAP={}}async dbLink(e){this.cabinDB=new N(e),await this.cabinDB.start()}async dbTabler(e){if(global.$db||(global.$db={}),!this.cabinDB)throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");for(let t in e){let o=e[t].name,r=await this.cabinDB.getTableCaller(o);global.$db[o]=new K(r),await global.$db[o].init(o,e[t].struct)}}express(e,t){this.cabinInfo={CabinHandler:"express",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},e&&(this.cabinHandler=this.EXPRESS(),this.cabinHandler.all("*",(o,r,s)=>{r.header("Access-Control-Allow-Origin","*"),r.header("Access-Control-Allow-Headers","*"),r.header("Access-Control-Allow-Methods","*"),s()}),this.cabinHandler.use(this.EXPRESS.static(this.VUE_PATH)),this.cabinHandler.listen(e,"0.0.0.0"))}expressProxy(e,t,o){o=!!o;let r={target:t,changeOrigin:!0,ws:o};this.cabinHandler.use(e,this.EXPRESS_PROXY(r))}expressHtml(e,t){!this.cabinInfo.SOCKET_NUMBER||this.cabinHandler.get(e,(o,r)=>r.sendFile(t))}expressRoute(e,t,o){if(!!this.cabinInfo.SOCKET_NUMBER)switch(e){case"GET":this.cabinHandler.get(t,(r,s)=>o(r,s));break;case"POST":this.cabinHandler.post(t,this.BODY_PARSE.json(),(r,s)=>o(r,s));break}}websocket(e,t){return this.cabinInfo={CabinHandler:"websocket",APP_NAME:t,IPv4:global.$common.getIPv4(),SOCKET_NUMBER:e},new Promise((o,r)=>{if(!e){r(`\u8BF7\u9009\u62E9\u7AEF\u53E3\u53F7:${e}`);return}this.cabinHandler=this.NODE_WEBSOCKET.createServer(s=>{let n=s.key;this.NODE_WEBSOCKET_ConnectionMAP[n]=s,s.on("text",async i=>{try{if(typeof i!="string")return;i=JSON.parse(i),i.connectionKey=n;let l=this.NODE_WEBSOCKET_OrderMAP[i.orderName];if(!i.orderName||!l)return;await l(i)}catch(l){this.websocketAnswer({connectionKey:n,orderName:`${i.orderName}/error`,DTO:l.message})}}),s.on("close",i=>{delete this.NODE_WEBSOCKET_ConnectionMAP[n],this.websocketAnswer({connectionKey:n,orderName:"/connection/close",DTO:"\u670D\u52A1\u5DF2\u5173\u95ED"})}),s.on("error",i=>{delete this.NODE_WEBSOCKET_ConnectionMAP[n]}),this.websocketAnswer({connectionKey:n,orderName:"/connection/success",DTO:null})}),this.cabinHandler.listen(e),o(!0)})}websocketRoute(e,t){!e||(this.NODE_WEBSOCKET_OrderMAP[e]=t)}websocketAnswer(e){let t=this.NODE_WEBSOCKET_ConnectionMAP[e.connectionKey];!t||t.sendText(JSON.stringify(e))}websocketBoardCast(e){for(let t in this.NODE_WEBSOCKET_ConnectionMAP){let o=this.NODE_WEBSOCKET_ConnectionMAP[t];!o||o.sendText(JSON.stringify(e))}}},W=$;var B=global.$common.Response,I=global.$common.AlfredLogin,d=class{constructor(){}async createShop(e,t,o){if(!e.body.name)throw new Error("\u8BF7\u8F93\u5165\u5E97\u94FA\u540D\u79F0");if(!e.body._id){let r=await global.$db.Shop.create({name:e.body.name});await global.$db.ShopByUser.create({shopId:r._id,userId:o._id,role:0})}}async getShopList(e,t,o){let r={userId:o._id},s=await global.$db.ShopByUser.query(r),n=[];for(let c in s){let m=await global.$db.Shop.get({_id:s[c].shopId});m.role=s[c].role,m&&n.push(m)}let i=n.filter(c=>c.role===0),l=n.filter(c=>c.role===1);return{shopList:i,officeList:l}}async deleteShop(e,t,o){let r={shopId:e.body.shopId,userId:o._id,role:0},s=await global.$db.ShopByUser.get(r);if(!s)throw new Error("\u672A\u627E\u5230\u60A8\u7684\u5E97\u94FA, \u6216\u60A8\u4E0D\u662F\u5E97\u957F");return await global.$db.Shop.delete({_id:s.shopId}),await global.$db.ShopByUser.delete({_id:s._id}),"\u5220\u9664\u5E97\u94FA\u6210\u529F"}};u([I(),B("\u6DFB\u52A0\u5E97\u94FA\u6210\u529F")],d.prototype,"createShop",1),u([I(),B("\u83B7\u53D6\u5E97\u94FA\u6210\u529F")],d.prototype,"getShopList",1),u([I(),B()],d.prototype,"deleteShop",1);var Y=d;var G=global.$common.Response,z=global.$common.AlfredLogin,b=class{constructor(){}async createHouse(e,t,o){if(!e.body.shopId)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");if(!e.body.name)throw new Error("\u8BF7\u8F93\u5165\u4ED3\u5E93\u540D\u79F0");let r={shopId:e.body.shopId,userId:o._id,role:0};if(!await global.$db.ShopByUser.get(r))throw new Error("\u60A8\u9009\u62E9\u7684\u5E97\u94FA\u4E0D\u5B58\u5728, \u8BF7\u91CD\u65B0\u9009\u62E9\u5E97\u94FA");if(!e.body._id){let n=await global.$db.House.create({name:e.body.name});await global.$db.HouseByShop.create({houseId:n._id,shopId:e.body.shopId})}}async getHouseList(e,t,o){if(!e.body.shopId)throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA");let r=await global.$db.HouseByShop.query({shopId:e.body.shopId}),s=[];for(let n in r){let i=await global.$db.House.get({_id:r[n].houseId});i&&s.push(i)}return s}};u([z(),G("\u521B\u5EFA\u4ED3\u5E93\u6210\u529F")],b.prototype,"createHouse",1),u([z(),G("\u83B7\u53D6\u4ED3\u5E93\u6210\u529F")],b.prototype,"getHouseList",1);var F=b;var oe=global.$common.Response,re=global.$common.AlfredLogin,h=class{constructor(){}async getEmployeeList(e,t){let o=e.body.shopId;if(!await global.$db.Shop.get({_id:o}))throw new Error("\u8BF7\u9009\u62E9\u5E97\u94FA, \u6216\u8BE5\u5E97\u94FA\u4E0D\u5B58\u5728");let s=await global.$db.ShopByUser.query({shopId:o});s.forEach(l=>l._id=l.userId);let n=global.$common.getIPv4(),i=await global.$common.fetch(`http://${n}:80/alfred/user/listById`,"POST",{ids:s},{authorization:e.header("authorization")});if(i.code!==200)throw new Error(i.message);return i.data}};u([re(),oe("\u83B7\u53D6\u96C7\u5458\u5217\u8868\u6210\u529F")],h.prototype,"getEmployeeList",1);var X=h;async function se(){try{let a=parseInt(process.argv[2]);if(!a)throw new Error(`Please chose your socket number, now is ${a}`);let e=new W;await e.dbLink("mongodb://127.0.0.1:27017/QtShop"),await e.dbTabler([{name:"Shop",struct:{name:"string"}},{name:"ShopByUser",struct:{shopId:"string",userId:"string",role:"number"}},{name:"House",struct:{name:"string"}},{name:"HouseByShop",struct:{houseId:"string",shopId:"string"}},{name:"Good",struct:{name:"string",norm:"string"}},{name:"InventoryByHouse",struct:{goodId:"string",houseId:"string",count:"number",countName:"string",remark:"string"}}]),global.$common.bindClass(e,"QtShop_Shop",Y),global.$common.bindClass(e,"QtShop_House",F),global.$common.bindClass(e,"QtShop_Employee",X),e.express(a,"QtShop"),global.Cabin=e,e.expressRoute("POST","/qt-shop/shop/create",global.Cabin.createShop),e.expressRoute("GET","/qt-shop/shop/list",global.Cabin.getShopList),e.expressRoute("POST","/qt-shop/shop/delete",global.Cabin.deleteShop),e.expressRoute("POST","/qt-shop/house/create",global.Cabin.createHouse),e.expressRoute("POST","/qt-shop/house/list",global.Cabin.getHouseList),e.expressRoute("POST","/qt-shop/employee/list",global.Cabin.getEmployeeList),e.expressRoute("POST","/qt-shop/good/create",global.Cabin.createGoodInHouse),e.expressRoute("POST","/qt-shop/good/list",global.Cabin.getGoodListInHouse),console.log(e.cabinInfo)}catch(a){console.log(a.message),process.exit()}}se();
