!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}(self,(function(){return(()=>{var e={739:(e,t,n)=>{const i=n(9),o=n(756);n.g.DAF_DEBUG=!1;e.exports=class{constructor(e){this.setting={form:null,fields:[],asterisk:"●",debug:!1,callback:null},Object.keys(this.setting).forEach((t=>{void 0!==e[t]&&(this.setting[t]=e[t])}))}init(){o("info","DisableAutoFill.js is initialized."),Array.prototype.insert=function(e,t){this.splice(e,0,t)};let e=this.setting.form,t=this.setting.fields,n=this.setting.asterisk,r=this.setting.callback;this.setting.debug&&(DAF_DEBUG=!0),i(e,t,n,r)}}},756:e=>{"use strict";e.exports=function(e,t,n){let i,o,r,s,l=!1;switch("undefined"!=typeof DAF_DEBUG&&(l=DAF_DEBUG),e){case"error":i="color: #e60012",o="color: #c55f67";break;case"info":i="color: #00a0e9",o="color: #458ca2";break;case"warning":i="color: #eb6100",o="color: #c09374";break;case"debug":i="color: #920783",o="color: #8957a1";break;default:return null}r="color: #333333",s="%c["+e+"] %cDAF: %c"+t,l&&(setTimeout(console.log.bind(console,s,i,o,"color: #333333")),null!=n&&setTimeout(console.log(n)))}},996:(e,t,n)=>{"use strict";const i=n(83),o=n(756);var r=[],s=[],l=[];e.exports=function(e,t,n,a){e.id||(e.id=Math.random().toString(36).substring(5)),r.hasOwnProperty(e.id)||(r[e.id]=[]);let u=r[e.id];s[e.id]=e.value;let c=s[e.id];l[e.id]=c.length;let d=l[e.id],f=e.selectionStart;for(let e=0;e<d;e++)c[e]!==n&&(u[e]=c[e]);if(d<u.length){var g=u.length-d,b=t.keyCode||t.charCode;8==b||46==b?u.splice(f,g):(u.splice(f-1,g+1),u.insert(f-1,c[f-1]))}e.value=c.replace(/./g,n);let p=i(e,u);"randomize"===a?p.randomize():"restore"===a&&p.restore(),o("debug","Current keyup position: "+f),o("debug","Password length: "+d),o("debug","Password: ",u)}},327:(e,t,n)=>{var i,o;i=jQuery,o=n(739),i.fn.disableAutoFill=function(e){var t=i.extend({},i.fn.disableAutoFill.defaults,e);t.form="#"+this.attr("id"),new o(t).init()},i.fn.disableAutoFill.defaults={fields:[],asterisk:"●",debug:!1,callback:null}},9:(e,t,n)=>{"use strict";const i=n(756),o=n(996);e.exports=function(e,t,n,r){let s=null,l=e=>0==e.indexOf(".")?document.getElementsByClassName(e.substring(1))[0]:0==e.indexOf("#")?document.getElementById(e.substring(1)):void 0;return s=l(e),null!==s?(s.addEventListener("keyup",(e=>{t.forEach(((t,r)=>{let s={};s[r]=l(t),void 0!==s[r]?(i("info","Keyup event "+r+" is triggered!"),o(s[r],e,n,"randomize")):i("warning",'The field called "'+t+'" is not found.')}))})),s.addEventListener("submit",(e=>{e.preventDefault();let a=new Promise(((r,s)=>{t.forEach(((t,a)=>{let u={};return u[a]=l(t),void 0!==u[a]?(o(u[a],e,n,"restore"),r()):(i("warning",'The field called "'+t+'" is not found.'),s())}))}));"function"==typeof r?a.then((()=>{r(s)?s.submit():i("warning","Callback returned false.")})):a.then((()=>{s.submit()}))}))):i("warning",'Form element "'+e+'" not found.'),null}},83:e=>{"use strict";var t={},n={};e.exports=function(e,i){let o={},r=e,s=i;return o.randomize=function(){let e=r.id,i=Math.random().toString(36).replace(/[^a-z]+/g,"");t[e]||(t[e]=r.name),n[t[e]]?r.name=n[t[e]]:(r.name=i,n[t[e]]=i)},o.restore=function(){r.name=t[r.id],r.value=s.join("")},o}}},t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();return n(327),{}})()}));
//# sourceMappingURL=jquery.disableautofill.min.js.map