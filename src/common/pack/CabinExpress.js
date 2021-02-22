var w=Object.create,a=Object.defineProperty,T=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty,B=Object.getOwnPropertyNames,D=Object.getOwnPropertyDescriptor;var d=l=>a(l,"__esModule",{value:!0});var O=(l,e)=>{d(l);for(var t in e)a(l,t,{get:e[t],enumerable:!0})},j=(l,e,t)=>{if(d(l),e&&typeof e=="object"||typeof e=="function")for(let i of B(e))!y.call(l,i)&&i!=="default"&&a(l,i,{get:()=>e[i],enumerable:!(t=D(e,i))||t.enumerable});return l},s=l=>l&&l.__esModule?l:j(a(l!=null?w(T(l)):{},"default",{value:l,enumerable:!0}),l);O(exports,{default:()=>P});var f=s(require("mongodb")),o=class{constructor(e){this.DBAddress="";this.DBOrigin=null;this.DBAddress=e}start(){return new Promise((e,t)=>{f.MongoClient.connect(this.DBAddress,{useUnifiedTopology:!0},(i,r)=>{i?t(i):(this.DBOrigin=r.db(this.DBAddress.split("/").reverse()[0]),e(!0))})})}getTableCaller(e){return new Promise((t,i)=>{this.DBOrigin.collection(e,{strict:!0},(r,n)=>{r?r.message===`Collection ${e} does not exist. Currently in strict mode.`?this.DBOrigin.createCollection(e,{},(m,C)=>{if(m){i(`\u521B\u5EFA\u96C6\u5408${e}\u5931\u8D25: ${m.message}`);return}t(C)}):i(r):t(n)})})}},g=o;var p=s(require("mongodb")),c=class{constructor(e){this.TableName=null;this.TableStruct=null;this.TableCaller=null;this.TableCaller=e}async init(e,t){this.TableName=e,this.TableStruct=t;let i=await this.getOldStruct();if(!i)return!0;for(let r in t)if(r!=="_id"&&r!=="timeCreate"&&r!=="timeUpdate"&&i[r]===void 0){let n={};n[r]=null,await this.TableCaller.updateMany({},{$set:n})}for(let r in i)if(r!=="_id"&&r!=="timeCreate"&&r!=="timeUpdate"&&t[r]===void 0){let n={};n[r]=null,await this.TableCaller.updateMany({},{$unset:n})}}async create(e){e=this.model2TableStruct(e);let t=Date.now();return e=Object.assign(e,{_id:String(new p.ObjectId),timeCreate:t,timeUpdate:t}),(await this.TableCaller.insertOne(e,{forceServerObjectId:!0})).ops[0]}get(e){return new Promise((t,i)=>{this.TableCaller.find(e).toArray((r,n)=>{r?i(r.message):t(n[0]||null)})})}query(e){return new Promise((t,i)=>{this.TableCaller.find(e).toArray((r,n)=>{r?i(r.message):t(n)})})}async update(e,t){let i=this.getStruct();for(let n in t)n==="_id"||n==="timeCreate"||n==="timeUpdate"||i[n]===void 0&&delete t[n];return t=Object.assign(t,{timeUpdate:Date.now()}),await this.TableCaller.updateMany(e,{$set:t})}async delete(e){if((await this.TableCaller.deleteOne({_id:e})).deletedCount!==1)throw new Error(`${e} \u4E0D\u5B58\u5728`);return!0}async getOldStruct(){return await this.get({})}getStruct(){return Object.assign({},this.TableStruct)}model2TableStruct(e){let t=this.getStruct();for(let i in t)e[i]!==void 0&&(t[i]=e[i]);return t}},h=c;var u=s(require("express")),b=class{constructor(){this.cabinDB=null;this.cabinInfo=null;this.cabinHandler=null;this.OriginMap=new Map}async dbLink(e){this.cabinDB=new g(e),await this.cabinDB.start()}async dbTabler(e){if(global.$db||(global.$db={}),!this.cabinDB)throw new Error("\u6570\u636E\u5E93\u670D\u52A1\u4E0D\u5B58\u5728");for(let t in e){let i=e[t].name,r=await this.cabinDB.getTableCaller(i);global.$db[i]=new h(r),await global.$db[i].init(i,e[t].struct)}}expressRoute(e,t,i){this.cabinInfo.SOCKET_NUMBER&&(e==="GET"&&this.cabinHandler.get(t,(r,n)=>i(r,n)),e==="POST"&&this.cabinHandler.post(t,require("body-parser").json(),(r,n)=>i(r,n)))}expressHtml(e,t,i){this.cabinInfo.SOCKET_NUMBER&&(this.cabinHandler.use(u.default.static(t)),this.cabinHandler.get(e,(r,n)=>n.sendFile(i)))}express(e){this.cabinInfo={SOCKET_NUMBER:e,CabinHandler:"express",IPv4:global.$common.getIPv4()},e&&(this.cabinHandler=u.default(),this.cabinHandler.all("*",(t,i,r)=>{i.header("Access-Control-Allow-Origin","*"),i.header("Access-Control-Allow-Headers","*"),i.header("Access-Control-Allow-Methods","*"),r()}),this.cabinHandler.listen(e,"0.0.0.0"))}},P=b;
