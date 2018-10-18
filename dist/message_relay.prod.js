/* Version 1.1.3 chrome-extension-message-relay (https://github.com/ecaroth/chrome-extension-message-relay), Authored by Evan Carothers */

(()=>{"use strict";const e=function(e,t,n){let i=n||!1,s=Object.freeze({extension:"extension",content:"content",page:"page",iframe:"iframe",iframe_shim:"iframe_shim",test:"test"}),o=Object.freeze({extension:4,content:3,page:2,iframe_shim:1,iframe:0,test:-1}),a=t,f={},m=null,r=e,l=null,c=null,g={};function d(e){let t=e.split(".");return{type:t.splice(0,1)[0],namespace:t.length>0?t.join("."):null}}function u(e,t){if(e in g)for(let n=g[e].length-1;n>=0;n--)g[e][n].ns===t&&g[e].splice(n,1)}function p(e,t,n,i){i||(i={});let s="msg_id"in i?i.msg_id:`${t}:${e}:${(new Date).getTime()}`;i.msg_id=s;let o={msg_type:e,msg_from:a,msg_destination:t,msg_up:n,msg_namespace:r,msg_data:i,msg_id:s,msg_tab_id:null},f=$(t);return f.tab_id&&(o.msg_destination=f.level,o.msg_tab_id=f.tab_id),o}function _(e,t){!function(e,t,n){if(e===s.extension&&o[t.msg_destination]<o.extension)chrome.tabs.query({},e=>{e.forEach(e=>{t.msg_tab_id&&e.id!==t.msg_tab_id||chrome.tabs.sendMessage(e.id,t,e=>{n&&n(e)})})});else if(e===s.content&&t.msg_destination===s.extension||e===s.extension)chrome.runtime.sendMessage(t,e=>{n&&"function"==typeof n&&n(e)});else if(e===s.iframe||e===s.iframe_shim)window.parent.postMessage(t,"*");else if(e!==s.page&&e!==s.content||t.msg_destination!==s.iframe)window.postMessage(t,"*");else{let e=document.getElementsByTagName("iframe");for(let n=0;n<e.length;n++)try{e[n].contentWindow.postMessage(t,"*")}catch(e){}}}(a,e,t)}function y(e,t,n){let{msg_data:i,msg_from:s,msg_up:m,msg_destination:r,msg_type:d,msg_id:u}=JSON.parse(JSON.stringify(e));n&&(l=n),c=d;let p=`${u}:${r}`;return!(s===a||p in f)&&(r===a?(h(`Msg (${d}) received from ${s} to ${r} - ${JSON.stringify(i)}`),f[p]=0,function(e,t,n){if(!(e in g))return;g[e].forEach(e=>{"function"==typeof n?e.fn.call(e,t,n):e.fn.call(e,t)})}(d,i,t)):(e.msg_from=a,m&&o[a]>o[s]?(_(e),h(`Msg (${d}) relaying UP from ${s} to ${r} - ${JSON.stringify(i)}`)):!m&&o[a]<o[s]&&(_(e),h(`Msg (${d}) relaying DOWN ${s} to ${r} - ${JSON.stringify(i)}`))),!0)}function $(e){let t=e.split("@");return{level:t[0],tab_id:t.length>0?parseInt(t[1],10):null}}function h(e){i&&console.log(`::MSG-RELAY (${a}):: ${e}`)}function b(e,t){let n=p(e,a,!0,t);n.msg_from="mock",y(n,null,{tabId:999})}if(m=setInterval(function(){for(let e in f)0===f[e]?f[e]=1:delete f[e]},1e3*120),a!==s.test&&(-1!==[s.page,s.content,s.iframe,s.iframe_shim].indexOf(a)&&window.addEventListener("message",function(e){"object"==typeof e.data&&"msg_namespace"in e.data&&e.data.msg_namespace===r&&y(e.data)}),-1!==[s.content,s.extension].indexOf(a)))try{chrome.runtime.onMessage.addListener(function(e,t,n){"object"==typeof e&&"msg_namespace"in e&&e.msg_namespace===r&&y(e,n,t)})}catch(e){}return{levels:s,on:function(e,t){"string"==typeof e&&(e=[e]),e.forEach(e=>{let n=d(e);n.type in g||(g[n.type]=[]),g[n.type].push({fn:t,ns:n.namespace})})},off:function(e){"string"==typeof e&&(e=[e]),e.forEach(e=>{let t=d(e);t.type in g&&(t.namespace?u(t.type,t.namespace):delete g[t.type])})},offAll:function(e){if(e)for(let t in g)u(t,e);else g={}},send:function(e,t,n,i){"string"==typeof t&&(t=[t]),t.forEach(t=>{if(!((t=t)&&$(t).level in s))return h(`NOTICE - invalid level specified as destination (${t})`);let f=$(t).level;o[f]<o[a]?function(e,t,n,i){let s=p(e,t,!1,n);h(`Send msg DOWN from ${a} to ${t} : ${e} - ${JSON.stringify(n)}`),_(s,i)}(e,t,n,i):function(e,t,n,i){let s=p(e,t,!0,n);h(`Send msg UP from ${a} to ${t} : ${e} - ${JSON.stringify(n)}`),_(s,i)}(e,t,n,i)});var f},levelViaTabId:function(e,t){return`${e}@${t}`},getLastMsgSenderInfo:()=>l,getLastMsgType:()=>c,mockSend:b,localSend:b}};"undefined"!=typeof module&&module.exports?module.exports=e:window.chrome_extension_message_relay=e})();