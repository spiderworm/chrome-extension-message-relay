/* Version 2.1.0 chrome-extension-message-relay (https://github.com/ecaroth/chrome-extension-message-relay), Authored by Evan Carothers */

(()=>{"use strict";window.chrome_extension_message_relay=function(e,t,n,i){i||(i="*");const s=n||!1,o=Object.freeze({extension:"extension",content:"content",page:"page",iframe:"iframe",iframe_shim:"iframe_shim",test:"test"}),r=Object.freeze({extension:4,content:3,page:2,iframe_shim:1,iframe:0,test:-1}),a=t;let l={},m=null,c=e,f=null,g=null,d={},u={},p=null;function _(e){let t=e.split(".");return{type:t.splice(0,1)[0],namespace:t.length>0?t.join("."):null}}function h(e,t){if(e in d)for(let n=d[e].length-1;n>=0;n--)d[e][n].ns===t&&d[e].splice(n,1)}function y(e,t,n,i,s){s||(s={});let o="msg_id"in s?s.msg_id:`${t}:${e}:${(new Date).getTime()}`;s.msg_id=o;let r={msg_type:e,msg_from:a,source_level:n,msg_destination:t,msg_up:i,msg_namespace:c,msg_data:s,msg_id:o,msg_tab_id:null},l=b(t);return l.tab_id&&(r.msg_destination=l.level,r.msg_tab_id=l.tab_id),r}function $(e){!function(e,t){if(e===o.extension)if(t.msg_tab_id)u[t.msg_tab_id]=u[t.msg_tab_id]||[],u[t.msg_tab_id].push(t);else for(var n in u)u[n].push(t);else if(e===o.content&&t.msg_destination===o.extension||e===o.extension)p.postMessage(t);else if(e===o.iframe||e===o.iframe_shim)window.parent.postMessage(t,i);else if(e!==o.page&&e!==o.content||![o.iframe,o.iframe_shim].includes(t.msg_destination))window.postMessage(t,"*");else{if(e===o.page)return;let n=document.getElementsByTagName("iframe");for(let e=0;e<n.length;e++){let i="chrome-extension://"+chrome.runtime.id;n[e].src.startsWith(i)&&n[e].contentWindow.postMessage(t,i)}}}(a,e)}function v(e,t){let{msg_data:n,msg_from:i,source_level:s,msg_up:o,msg_destination:m,msg_type:c,msg_id:u}=JSON.parse(JSON.stringify(e));t&&(f=t),g=c;let p=`${u}:${m}`;if(i===a||p in l)return!1;m===a?(E(`Msg (${c}) received from ${i} to ${m} - ${JSON.stringify(n)}`),l[p]=0,function(e,t,n){e in d&&d[e].forEach(e=>{let i=e.limit_from_levels;i&&!i.includes(n)||e.fn.call(e,t)})}(c,n,s)):(e.msg_from=a,o&&r[a]>r[i]?($(e),E(`Msg (${c}) relaying UP from ${i} to ${m} - ${JSON.stringify(n)}`)):!o&&r[a]<r[i]&&($(e),E(`Msg (${c}) relaying DOWN ${i} to ${m} - ${JSON.stringify(n)}`)))}function b(e){let t=e.split("@");return{level:t[0],tab_id:t.length>0?parseInt(t[1],10):null}}function E(e){s&&console.log(`::MSG-RELAY (${a}):: ${e}`)}function M(e,t){let n=y(e,a,a,!0,t);n.msg_from="mock",v(n,{tabId:999})}function O(){for(let e in l)0===l[e]?l[e]=1:delete l[e]}function x(){clearInterval(m)}function w(e){this.name="ChromeExtensionMessageRelayError",this.message=e||"Error in chrome extension message relay",this.stack=(new Error).stack}if(m=setInterval(O,12e4),w.prototype=Object.create(Error.prototype),w.prototype.constructor=w,!(a!==o.content&&a!==o.extension||chrome&&chrome.runtime&&chrome.runtime.id))throw new w(`ERROR - invalid context detected for ${a}, aborting.`);return a!==o.test&&([o.page,o.content,o.iframe,o.iframe_shim].includes(a)&&window.addEventListener("message",e=>{"object"==typeof e.data&&"msg_namespace"in e.data&&e.data.msg_namespace===c&&v(e.data)}),a===o.content&&(E("Alerting extension of ready"),(p=chrome.runtime.connect({name:e})).onMessage.addListener(e=>{v(e)})),a===o.extension&&chrome.runtime.onConnect.addListener(t=>{t.name===e&&t.sender.id===chrome.runtime.id&&function(e){let t=e.sender.tab.id,n=Array.isArray(u[t])?u[t].slice():[];e.onDisconnect.addListener(e=>{delete u[e.sender.tab.id],x()}),e.onMessage.addListener(t=>{e.sender.id===chrome.runtime.id&&v(t,e.sender)}),u[t]={push:t=>{e.postMessage(t)}},n.forEach(e=>u[t].push(e))}(t)})),{levels:o,on:function(e,t,n=null){"string"==typeof e&&(e=[e]),n&&!Array.isArray(n)&&(n=[n]),e.forEach(e=>{let i=_(e);i.type in d||(d[i.type]=[]),d[i.type].push({fn:t,ns:i.namespace,limit_from_levels:n})})},off:function(e){"string"==typeof e&&(e=[e]),e.forEach(e=>{let t=_(e);t.type in d&&(t.namespace?h(t.type,t.namespace):delete d[t.type])})},offAll:function(e){if(e)for(let t in d)h(t,e);else d={}},send:function(e,t,n){var i;"string"==typeof t&&(t=[t]),t.forEach(t=>{if(!((t=t)&&b(t).level in o))return E(`NOTICE - invalid level specified as destination (${t})`);let i=b(t).level;r[i]<r[a]?function(e,t,n){let i=y(e,t,a,!1,n);E(`Send msg DOWN from ${a} to ${t} : ${e} - ${JSON.stringify(n)}`),$(i)}(e,t,n):function(e,t,n){let i=y(e,t,a,!0,n);E(`Send msg UP from ${a} to ${t} : ${e} - ${JSON.stringify(n)}`),$(i)}(e,t,n)})},levelViaTabId:function(e,t){return`${e}@${t}`},getLastMsgSenderInfo:()=>f,getLastMsgType:()=>g,mockSend:M,localSend:M,clearTMO:x}}})();