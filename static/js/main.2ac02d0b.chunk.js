(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{32:function(t,e,a){t.exports=a(65)},63:function(t,e,a){},64:function(t,e,a){},65:function(t,e,a){"use strict";a.r(e);for(var n=a(0),r=a.n(n),c=a(10),o=a.n(c),i=a(13),s=a(1),l=a.n(s),u=a(3),h=a(6),f=a(7),p=a(8),d=a(9),v=a(4),m=a.n(v),b=a(11),g=a.n(b),w=a(12),y=a.n(w),E=m.a.create({baseURL:"https://covid19.mathdro.id/api/confirmed"}),O=["Algeria","Kuwait","Bahrain","Egypt","Iraq","Jordan","Lebanon","Libya","Morocco","Oman","Qatar","Saudi Arabia","Syria","Tunisia","United Arab Emirates","Sudan"],k=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={selector:"confirmed",data:null},t.fetchCountriesDataSummary=Object(u.a)(l.a.mark((function e(){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.get("");case 3:a=e.sent,n=a.data,t.setState({data:n}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),t.componentDidMount=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.fetchCountriesDataSummary();case 1:case"end":return e.stop()}}),e)}))),t.getCountry=function(){var e=t.state.data;if(e)return e.filter((function(t){return O.includes(t.countryRegion)}))},t.setUpChart=function(t,e){var a=[],n=[];for(var r in t)a.push(t[r][e]),n.push(t[r].countryRegion);return[a,n]},t.handleOnClick=function(e){t.setState({selector:e})},t}return Object(f.a)(a,[{key:"render",value:function(){var t=this,e=this.setUpChart(this.getCountry(),this.state.selector),a=["confirmed","deaths","recovered"].map((function(e){return r.a.createElement("button",{className:t.state.selector===e?"btn btn-outline-light active":"btn btn-outline-light",onClick:function(){return t.handleOnClick(e)}},e)})),n=[{values:e[0],labels:e[1],type:"pie",textinfo:"label+value",titlefont:{size:24,bold:!0},title:"confirmed"===this.state.selector?"Total Cases":"deaths"===this.state.selector?"Total Deaths":"Total Recoveries"}],c=y()({colormap:"jet",nshades:O.length,format:"hex",alpha:1});return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("br",null),a,r.a.createElement("br",null),r.a.createElement(g.a,{data:n,layout:{font:{color:"white",size:14},showlegend:!1,height:670,width:670,colorway:c.reverse(),plot_bgcolor:"#161616",paper_bgcolor:"#161616"}}))}}]),a}(n.Component),S=m.a.create({baseURL:"https://covid19.mathdro.id/api/countries/"}),x=["DZA","KWT","BHR","EGY","IRQ","JOR","LBN","LBY","MAR","OMN","QAT","SAU","SYR","TUN","ARE","SDN"],C=["Algeria","Kuwait","Bahrain","Egypt","Iraq","Jordan","Lebanon","Libya","Morocco","Oman","Qatar","Saudi Arabia","Syria","Tunisia","UAE","Sudan"],j={},D=0;D<x.length;D++)j[x[D]]=C[D];var N=m.a.create({baseURL:"https://covidapi.info/api/v1/"}),A=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={data:null,selector:"confirmed",logarithmic:!1},t.fetchCountriesData=function(){var e=Object(u.a)(l.a.mark((function e(a){var n,r,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,n={},r=0;case 3:if(!(r<a.length)){e.next=12;break}return e.next=6,N.get("country/".concat(a[r]));case 6:c=e.sent,o=c.data.result,n[a[r]]=o;case 9:r++,e.next=3;break;case 12:t.setState({data:n}),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}}(),t.capitalizeFirstLetter=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},t.componentDidMount=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.fetchCountriesData(x);case 1:case"end":return e.stop()}}),e)}))),t.getCountries=function(){var e=t.state.data;if(e)return e},t.formatDate=function(t){if(0==t)return 0;var e=t.substring(5,7),a=t.substring(8,11);return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(e)-1]+" "+a},t.setupTicks=function(e,a,n){var r=e.length;a=Math.floor(r/a);for(var c=[],o=0;o<e.length;o+=a)n?c.push(t.formatDate(e[o])):c.push(e[o]);return c},t.handleOnClick=function(e){t.setState({selector:e})},t.handleSwitch=function(){t.setState({logarithmic:!t.state.logarithmic})},t}return Object(f.a)(a,[{key:"render",value:function(){var t=this,e=["confirmed","deaths","recovered"].map((function(e){return r.a.createElement("button",{className:t.state.selector===e?"btn btn-outline-light active":"btn btn-outline-light",onClick:function(){return t.handleOnClick(e)}},e)})),a=this.getCountries(),n=[[[]],[[]],[[]]],c=[];for(var o in a){var i=a[o],s=[],l=[],u=[],h=[],f=0,p=[];for(var d in i){var v=i[d].confirmed,m=i[d].deaths,b=i[d].recovered;s.push(v),l.push(m),u.push(b),h.push(f),p.push(d),f++}c.push(h),n[0].push(s),n[1].push(l),n[2].push(u)}for(var w=[],E="confirmed"===this.state.selector?0:"deaths"===this.state.selector?1:2,O=1;O<c.length+1;O++){var k={x:p,y:n[E][O],type:"scatter",name:C[O-1]};w.push(k)}console.log("test");c.length>1&&p.length>1&&(this.setupTicks(c[1],25,!1),this.setupTicks(p,25,!0));var S=this.state.logarithmic?"log":"null",j=y()({colormap:"jet",nshades:x.length,format:"hex",alpha:1});return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("br",null),e,r.a.createElement("div",{class:"custom-control custom-switch"},r.a.createElement("input",{type:"checkbox",class:"custom-control-input",onClick:function(){return t.handleSwitch()},id:"switch"}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("label",{class:"custom-control-label",for:"switch"},"Logarithmic")),r.a.createElement(g.a,{data:w,layout:{title:"".concat(this.capitalizeFirstLetter(this.state.selector)),height:600,width:800,font:{color:"white",size:12},xaxis:{title:"Date",nticks:15},yaxis:{title:"Number",type:S},colorway:j,plot_bgcolor:"#161616",paper_bgcolor:"#161616"}}))}}]),a}(n.Component),R=(a(63),a(64),["DZA","KWT","BHR","EGY","IRQ","JOR","LBN","LBY","MAR","OMN","QAT","SAU","SYR","TUN","ARE","YEM","SDN"]),T=m.a.create({baseURL:"https://covidapi.info/api/v1/"}),L=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(){var t;Object(h.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={countriesData:[]},t.fetchCountriesData=function(){var e=Object(u.a)(l.a.mark((function e(a){var n,r,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,n={},r=0;case 3:if(!(r<a.length)){e.next=12;break}return e.next=6,T.get("country/".concat(a[r]));case 6:c=e.sent,o=c.data.result,n[a[r]]=o;case 9:r++,e.next=3;break;case 12:t.setState({countriesData:n}),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.error(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}}(),t.componentDidMount=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.fetchCountriesData(R);case 1:case"end":return e.stop()}}),e)}))),t}return Object(f.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid text-center"},r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-6"},r.a.createElement("div",{className:"card-transparent border"},r.a.createElement(k,null))),r.a.createElement("div",{className:"col-6"},r.a.createElement("div",{className:"card-transparent border"}," ",r.a.createElement(A,null))))))}}]),a}(n.Component),U=Object(i.b)((function(t){return{countryData:t.dataState.countryData}}),(function(t){return{fetchCountryData:function(e){return t(function(t){return function(){var e=Object(u.a)(l.a.mark((function e(a){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.get("".concat(t));case 3:n=e.sent,r=n.data,a({type:"SET_COUNTRY",payload:r}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}(e))}}}))(L),M=a(5),_=a(30),B=a(31),J={countryData:null},Y=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_COUNTRY":return Object(B.a)({},t,{countryData:e.payload});default:return t}},I=Object(M.c)({dataState:Y}),Q=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||M.d,W=Object(M.e)(I,Q(Object(M.a)(_.a))),z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function K(t){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var e=t.installing;e.onstatechange=function(){"installed"===e.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(t){console.error("Error during service worker registration:",t)}))}o.a.render(r.a.createElement(i.a,{store:W},r.a.createElement(U,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/covid19",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/covid19","/service-worker.js");z?(!function(t){fetch(t).then((function(e){404===e.status||-1===e.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):K(t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):K(t)}))}}()}},[[32,1,2]]]);
//# sourceMappingURL=main.2ac02d0b.chunk.js.map