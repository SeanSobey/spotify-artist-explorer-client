(function(t){function e(e){for(var i,r,o=e[0],l=e[1],c=e[2],d=0,h=[];d<o.length;d++)r=o[d],a[r]&&h.push(a[r][0]),a[r]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(h.length)h.shift()();return n.push.apply(n,c||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],i=!0,o=1;o<s.length;o++){var l=s[o];0!==a[l]&&(i=!1)}i&&(n.splice(e--,1),t=r(r.s=s[0]))}return t}var i={},a={app:0},n=[];function r(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=i,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(s,i,function(e){return t[e]}.bind(null,i));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/spotify-artist-explorer-client/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("cd49")},"01b4":function(t,e,s){"use strict";var i=s("71a9"),a=s.n(i);a.a},"28c7":function(t,e,s){},6843:function(t,e,s){t.exports=s.p+"img/Spotify_logo_without_text_white.e9f47894.svg"},"71a9":function(t,e,s){},cd49:function(t,e,s){"use strict";s.r(e);var i=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("Navigation"),s("router-view")],1)},n=[],r=s("9ab4"),o=s("60a3"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-navbar",{staticClass:"mb-2",attrs:{type:"dark",variant:"primary"}},[i("b-navbar-brand",[i("img",{staticClass:"d-inline-block align-top",attrs:{src:s("6843"),width:"32",height:"32"}}),t._v("\n\t\tSpotify Artist Explorer\n\t")]),i("b-navbar-nav",{staticClass:"ml-auto"},[t._l(t.getRoutes(),function(e){return i("b-nav-item",{key:e.path,attrs:{active:t.isActive(e),to:e.path}},[t._v(t._s(e.name)+"\n\t\t")])}),i("b-nav-item",{attrs:{href:"https://github.com/SeanSobey/Spotify-Artist-Explorer"}},[i("font-awesome-icon",{attrs:{icon:["fab","github"],size:"lg"}})],1)],2)],1)},c=[],u=s("8c4f"),d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("b-container",{attrs:{fluid:""}},[i("b-row",{staticClass:"justify-content-center mt-5"},[i("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.loginOnClick()}}},[i("img",{staticClass:"mr-1 mb-1",attrs:{src:s("6843"),width:"16",height:"16"}}),t._v("Login to Spotify\n\t\t")])],1)],1)},h=[];const p={redirectURI:"https://seansobey.github.io/spotify-artist-explorer-client/auth.html",clientId:"841f9ceea5bb44a6845c38eec868bf6e"},m="https://europe-west1-spotify-artist-explorer.cloudfunctions.net/Server";let f=class extends o["b"]{constructor(){super(),this.authWindow=null,window.addEventListener("message",this.messageEventListener.bind(this),!1),this.spotify.setRedirectURI(p.redirectURI),this.spotify.setClientId(p.clientId)}loginOnClick(){const t=440,e=660,s=void 0!==window.screenLeft?window.screenLeft:window.screenX,i=void 0!==window.screenTop?window.screenTop:window.screenY,a=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,n=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,r=t/window.screen.availWidth,o=t/r,l=e/r,c=(n-e)/2/r+i,u=(a-t)/2/r+s,d=["user-follow-read"];this.authWindow=window.open(this.spotify.createAuthorizeURL(d),"_blank",`menubar=no,location=no,resizable=no,scrollbars=no,status=no,titlebar=no,width=${o},height=${l},top=${c},left=${u}`)}messageEventListener(t){if(t.origin!==window.origin)return;if(!this.authWindow)return;this.authWindow.close(),this.authWindow=null;const e=t.data,s=new URL(m);s.searchParams.append("code",e),fetch(s.href,{method:"GET"}).then(t=>t.json()).then(t=>{const e={accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token,tokenType:t.token_type,scope:t.scope};this.spotify.setAccessToken(e.accessToken),this.spotify.setRefreshToken(e.refreshToken),this.$store.commit("authenticate",e),this.$router.push($.home)}).catch(t=>{console.error("fetch failed",t)})}};f=r["a"]([Object(o["a"])({})],f);var b=f,g=b,y=s("2877"),w=Object(y["a"])(g,d,h,!1,null,null,null),v=w.exports,_=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div")},x=[];let k=class extends o["b"]{created(){this.$store.commit("unauthenticate"),this.$router.push($.login)}};k=r["a"]([Object(o["a"])({})],k);var A,L=k,T=L,C=Object(y["a"])(T,_,x,!1,null,null,null),O=C.exports,j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{fluid:""}},[s("b-nav",{attrs:{align:"right"}},[s("b-nav-form",[s("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Artist"},model:{value:t.artistFilter,callback:function(e){t.artistFilter=e},expression:"artistFilter"}}),s("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",placeholder:"Year"},model:{value:t.yearFilter,callback:function(e){t.yearFilter=e},expression:"yearFilter"}})],1),t._l(t.displays,function(e){return s("b-nav-item",{key:e.displayType,attrs:{active:e.isActive},on:{click:function(s){return t.setDisplay(e.displayType)}}},[s("font-awesome-icon",{attrs:{icon:e.icon,size:"lg"}})],1)})],2),t.isLoading?s("b-row",{staticClass:"justify-content-center"},[s("span",{staticClass:"h1"},[s("font-awesome-icon",{staticClass:"spin mr-2",attrs:{icon:"spinner"}}),t._v("Loading Artists\n\t\t")],1)]):t._e(),t.isLoadingProgress?s("b-row",{staticClass:"justify-content-center"},[s("b-col",[s("b-progress",{staticClass:"my-2",attrs:{max:t.progressMax,height:"1.6em"}},[s("b-progress-bar",{attrs:{value:t.progress}},[s("span",{staticClass:"mx-auto"},[s("strong",[t._v(t._s(t.progress)+" / "+t._s(t.progressMax))])])])],1)],1)],1):t._e(),t.isViewActive("grid")?s("b-row",t._l(t.albums,function(e,i){return s("b-col",{key:i,staticClass:"col-sm-5 col-md-4 col-lg-3 col-xl-2",attrs:{"align-content":"center"}},[s("b-card",{staticClass:"my-2",attrs:{"img-src":e.images[1],"img-alt":e.name,"img-top":""}},[s("b-card-text",[t._v(t._s(e.artist)+" - "+t._s(t.formatReleaseDate(e.releaseDate))+" - "+t._s(e.name))])],1)],1)}),1):t._e(),t.isViewActive("list")?s("b-row",[s("b-table",{attrs:{striped:"",hover:"",items:t.getTableItems(),fields:t.getTableFields()},scopedSlots:t._u([{key:"images",fn:function(t){return[s("b-img",{attrs:{thumbnail:"",fluid:"",src:t.item.images[2],alt:t.item.name}})]}}],null,!1,4031086644)})],1):t._e()],1)},D=[];(function(t){t["Grid"]="grid",t["List"]="list"})(A||(A={}));const E=3;let F=class extends o["b"]{constructor(){super(...arguments),this.isLoading=!1,this.isLoadingProgress=!1,this.progress=0,this.progressMax=0,this.afterId=null,this.artistFilter="",this.yearFilter="",this.albums=[],this.displays=[{icon:"th",displayType:A.Grid,isActive:!1},{icon:"list",displayType:A.List,isActive:!0}]}created(){this.isLoading=!0,this.isLoadingProgress=!1,this.albums=[],(async()=>{this.progress=0;for await(const[t,e]of this.getAllFollowedArtists()){this.progressMax=t,this.isLoadingProgress=!0;for await(const[t,s]of this.batchGetArtistAlbums(e))this.progress++,this.albums.push(s),this.albums.sort((t,e)=>t.artist.localeCompare(e.artist))}})().catch(t=>{console.error("loading artists albums failed",t)}).finally(()=>{this.isLoading=!1,this.isLoadingProgress=!1,this.progress=0,this.progressMax=0})}setDisplay(t){this.displays.forEach(e=>e.isActive=e.displayType===t)}isViewActive(t){const e=this.displays.find(e=>e.displayType===t);if(!e)throw new Error(`Un-handled displayType: ${t}`);return e.isActive}getTableFields(){return[{key:"artist",label:"Artist",sortable:!0},{key:"name",label:"Name",sortable:!0},{key:"releaseDate",label:"Release Date",sortable:!0,formatter:t=>this.formatReleaseDate(t)},{key:"images",label:"Cover",sortable:!1}]}getTableItems(){return this.albums.filter(t=>{return""===this.artistFilter||t.artist.toLowerCase().includes(this.artistFilter.toLowerCase())}).filter(t=>{return""===this.yearFilter||t.releaseDate.getFullYear().toString().includes(this.yearFilter.toLowerCase())})}formatReleaseDate(t){return t.toLocaleDateString()}async*getAllFollowedArtists(){let t,e=!0;while(e){const s=await this.spotify.getFollowedArtists({type:"artist",limit:50,after:t});e=!!s.body.artists.next,t=s.body.artists.items[s.body.artists.items.length-1].id,yield[s.body.artists.total,s.body.artists.items]}}async*batchGetArtistAlbums(t){const e=[...t];while(e.length>0){const t=e.splice(0,E),s=t.map(t=>this.spotify.getArtistAlbums(t.id,{limit:1,include_groups:"album"}).then(e=>({artist:t,albumData:e}))),i=await Promise.all(s);for(const{artist:e,albumData:a}of i){if(0===a.body.items.length)continue;const t=a.body.items.map(t=>this.createAlbum(t));t.sort((t,e)=>t.releaseDate.valueOf()-e.releaseDate.valueOf());const s=t[0];yield[e,s]}}}createAlbum(t){const e=this.parseReleaseDate(t.release_date,t.release_date_precision);return{name:t.name,artist:t.artists[0].name,images:[t.images[0].url,t.images[1].url,t.images[2].url],releaseDate:e}}parseReleaseDate(t,e){switch(e){case"year":return new Date(t);case"month":return new Date(t);case"day":return new Date(t);default:throw new Error(`Un-hanlded releaseDatePrecision: ${e}`)}}};F=r["a"]([Object(o["a"])({})],F);var $,R=F,S=R,P=(s("01b4"),Object(y["a"])(S,j,D,!1,null,"05b33734",null)),I=P.exports;i["default"].use(u["a"]),function(t){t["login"]="Login",t["logout"]="Logout",t["home"]="Home"}($||($={}));const W=[{path:"/home",name:$.home,component:I},{path:"/login",name:$.login,component:v},{path:"/logout",name:$.logout,component:O}];var M=class extends u["a"]{constructor(t){super({routes:W}),this.beforeEach((e,s,i)=>{if(e.name===$.login){if(t.state.authentication)return i({name:$.home})}else if(!t.state.authentication)return i({name:$.login});return i()})}};let U=class extends o["b"]{getRoutes(){const t=!!this.$store.state.authentication;return W.filter(e=>{return(e.name!==$.login||!t)&&((e.name!==$.login||!t)&&!(e.name===$.logout&&!t))})}isActive(t){return this.$router.currentRoute.name===t.name}};U=r["a"]([Object(o["a"])({})],U);var z=U,G=z,H=Object(y["a"])(G,l,c,!1,null,null,null),N=H.exports;let V=class extends o["b"]{};V=r["a"]([Object(o["a"])({components:{Navigation:N}})],V);var Y=V,J=Y,X=Object(y["a"])(J,a,n,!1,null,null,null),q=X.exports,B=s("2f62");i["default"].use(B["a"]);var K=class extends B["a"].Store{constructor(){super({state:{authentication:null},mutations:{authenticate(t,e){t.authentication=e},unauthenticate(t){t.authentication=null}},actions:{}})}},Q=s("9f7b"),Z=s.n(Q),tt=(s("28c7"),s("ecee")),et=s("c074"),st=s("f2d1"),it=s("ad3d"),at=s("d9ca"),nt=s.n(at),rt=s("a255"),ot=s.n(rt);i["default"].use(ot.a,new nt.a),i["default"].config.productionTip=!1,i["default"].use(Z.a),tt["c"].add(et["b"],et["c"],et["a"]),tt["c"].add(st["a"]),i["default"].component("font-awesome-icon",it["a"]),i["default"].component("font-awesome-layers",it["b"]),i["default"].component("font-awesome-layers-text",it["c"]);const lt=new K,ct=new M(lt);new i["default"]({router:ct,store:lt,render:t=>t(q)}).$mount("#app")}});
//# sourceMappingURL=app.78265e3f.js.map