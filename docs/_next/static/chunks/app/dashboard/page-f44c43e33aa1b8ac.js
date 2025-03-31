(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[105],{2982:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var o=s(4752),n=s.n(o);let a=function(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a="Retry";switch(s){case"non200":t="Upload ".concat(e," failed ").concat(o,".");break;case"nonauth":t="Authentication failed ".concat(o,". Please Login again."),a="Close";break;case"logout":t="Attempt to logout failed ".concat(o,".");break;default:t="Error uploading the ".concat(e,": ").concat(o)}n().mixin({toast:!0,position:"center",showConfirmButton:!0,timer:5e3,timerProgressBar:!0,didOpen:e=>{e.onmouseenter=n().stopTimer,e.onmouseleave=n().resumeTimer}}).fire({icon:"error",title:t,showConfirmButton:!0,confirmButtonText:a,confirmButtonColor:"red"})}},3531:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>I});var o=s(5155),n=s(2115);let a=async(e,t)=>new Promise((s,o)=>{let n=window.indexedDB.open("imageStore",1);n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains("images")||t.createObjectStore("images",{keyPath:"id"})},n.onsuccess=a=>{let r=a.target.result.transaction("images","readwrite").objectStore("images");if("clear-all"===t){let e=r.getAllKeys();e.onsuccess=()=>{let t=e.result;if(0===t.length){s({status:200,message:"No images found in IndexedDB"});return}t.forEach(e=>{let t=r.delete(e);t.onsuccess=()=>"",t.onerror=()=>""}),s({status:200,message:"Deleted ".concat(t.length," images from IndexedDB")})},e.onerror=()=>{o({status:500,message:"Error retrieving images from IndexedDB"})}}else{let t=r.delete(e);t.onsuccess=()=>"",s({status:200,message:"Image deleted from IndexedDB: ".concat(e)}),t.onerror=()=>o({status:205,message:"Error deleting image from the IndexedDB"}),n.onerror=e=>{o({status:205,message:"Error deleting image to the IndexedDB ".concat(e)})}}}}),r=(e,t,s)=>{if("Enter"===e.key&&1===t)(null==s?void 0:s.current)&&s.current[1]&&s.current[1].focus();else if(("Backspace"===e.key||"Delete"===e.key)&&window.getSelection){let t=window.getSelection();if(t&&t.rangeCount>0&&(null==t?void 0:t.rangeCount)){let s=t.getRangeAt(0).startContainer;if("IMG"!==s.nodeName&&(s=s.parentElement),s&&"IMG"===s.tagName){var o;e.preventDefault();let n=null==t?void 0:t.toString().trim(),r=s.dataset.refId;r&&a(n);let l=document.querySelector("p[data-ref-id='".concat(r,"']"));l&&l.remove(),null===(o=s.parentNode)||void 0===o||o.removeChild(s)}}}else if("Enter"===e.key||"ArrowDown"===e.key){e.preventDefault();let o=t+1;s.current[o]&&s.current[o].focus()}else if("ArrowUp"===e.key){e.preventDefault();let o=t-1;s.current[o]&&s.current[o].focus()}};var l=s(4540),i=s(5028);let c=(e,t,s)=>{e(""),t(""),console.log("called handleClear"),sessionStorage.removeItem("tempTitle"),sessionStorage.removeItem("tempBody"),s.current.forEach(e=>{e&&(e.innerText="")}),a(void 0,"clear-all").then(e=>{})},d=e=>{console.log("called handleSave"),e.flush()};var u=s(6766),m=s(7496),g=s(5695),f=s(2982);let p=()=>{let[e,t]=(0,n.useState)(!1),s=(0,g.useRouter)(),a=async()=>{let e=await (0,m.A)("logout");sessionStorage.removeItem("tempTitle"),sessionStorage.removeItem("tempBody"),200==e.status?s.push("".concat("http://localhost:8000","/")):(0,f.A)("Logout","logout",e.message)};return(0,o.jsxs)(o.Fragment,{children:["  ",(0,o.jsxs)("button",{className:"md:mt-auto md:mb-14",onClick:()=>{a(),t(!0)},children:[(0,o.jsx)(u.default,{src:"/window_exit.png",className:"block md:hidden cursor-pointer",width:50,height:60,alt:"logout-button"}),(0,o.jsx)(u.default,{src:"/door_exit.png",className:"hidden md:block cursor-pointer",width:70,height:80,alt:"logout-button"})]}),(0,o.jsx)("span",{className:"hidden md:inline",children:e?"Bye!":"Logout"}),(0,o.jsx)("span",{className:"md:hidden",children:e?"Bye!":""})]})};var h=s(5964);let y=s.n(h)()((e,t)=>{let s=e.split(" ").slice(0,2).join("-"),o=new Date().getDay(),n=new Date().getMonth()+1,a=new Date().getFullYear(),r="".concat(o,"-").concat(n,"-").concat(a),l="".concat(s,"-").concat(r),i=JSON.parse(sessionStorage.getItem("articleContent")||"[]");""!==e&&((i=i.filter(e=>"title"!==e.type&&"id"!==e.type)).push({type:"title",content:e}),i.push({type:"id",content:l})),""!==t&&(i=i.filter(e=>"body"!==e.type)).push({type:"body",content:t}),sessionStorage.setItem("articleContent",JSON.stringify(i))},500),x=e=>e.replace(/<img [^>]*src="data:image[^"]+"[^>]*>/g,'<img src="{image_url_placeholder}">'),b=(e,t,s,o,n)=>{if(console.log("handleContentChange content",t),0===e)s(!1),sessionStorage.setItem("tempTitle",t),n(t,sessionStorage.getItem("tempBody")||"");else{o(!1);let e=x(t);console.log("htmlCleaned",e),sessionStorage.setItem("tempBody",e),n(sessionStorage.getItem("tempTitle")||"",e)}},w=(0,i.default)(()=>s.e(360).then(s.bind(s,5360)),{loadableGenerated:{webpack:()=>[5360]},ssr:!1}),v=(0,i.default)(()=>s.e(962).then(s.bind(s,5962)),{loadableGenerated:{webpack:()=>[5962]},ssr:!1}),S=(0,i.default)(()=>Promise.all([s.e(128),s.e(100)]).then(s.bind(s,2100)),{loadableGenerated:{webpack:()=>[2100]},ssr:!1}),j=(0,i.default)(()=>s.e(549).then(s.bind(s,3549)),{loadableGenerated:{webpack:()=>[3549]},ssr:!1}),I=()=>{let[e,t]=(0,n.useState)(!0),[s,a]=(0,n.useState)(!0),[i,u]=(0,n.useState)(""),[m,g]=(0,n.useState)(""),[f,h]=(0,n.useState)(!0),[x,I]=(0,n.useState)(!0),N=(0,n.useRef)([]);(0,l.wA)();let k=(0,n.useRef)(null),B="",D="";return(0,n.useEffect)(()=>{console.log("useEffect 1is running...");let e=sessionStorage.getItem("articleContent");if(null!==e||void 0!==e)try{var t,s;let o=JSON.parse(e);console.log("article",o),console.log("Article already created"),D=null===(t=o[0])||void 0===t?void 0:t.content,B=null===(s=o[2])||void 0===s?void 0:s.content,console.log("savedTitle",D),console.log("savedBody",B),sessionStorage.removeItem("tempTitle"),sessionStorage.removeItem("tempBody")}catch(e){console.log(e)}},[]),(0,n.useEffect)(()=>()=>{y.cancel()},[y]),(0,n.useEffect)(()=>{console.log("useEffect2is running..."),D&&(u(D),t(!D),h(!1),B&&(g(B),a(!B),I(!1)))},[D,B]),(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{ref:k,className:"flex flex-col md:flex-row h-screen bg-black",children:[(0,o.jsxs)("aside",{className:"hidden w-[25%] h-full bg-gray-800 text-white md:flex items-center flex-col",children:[(0,o.jsx)(w,{editorRefs:N,index:1}),(0,o.jsx)(v,{editorRefs:N,index:1}),(0,o.jsx)(S,{}),(0,o.jsx)(j,{type:"post",onClick:()=>d(y)}),(0,o.jsx)(j,{type:"clear",onClick:()=>c(u,g,N)}),(0,o.jsx)(p,{})]}),(0,o.jsxs)("nav",{className:"md:hidden w-full h-20vh bg-gray-800 text-white flex justify-around p-2 flex-row fixed",children:[(0,o.jsxs)("div",{className:"flex items-center flex-col",children:[(0,o.jsxs)("div",{className:"flex flex-row space-x-2",children:[(0,o.jsx)(w,{editorRefs:N,index:1}),(0,o.jsx)(v,{editorRefs:N,index:1})]}),(0,o.jsx)(j,{type:"clear",onClick:()=>c(u,g,N)})]}),(0,o.jsx)(S,{}),(0,o.jsx)(j,{type:"post",onClick:()=>d(y)}),(0,o.jsx)(p,{})]}),(0,o.jsx)("main",{className:"flex-1 p-4 pt-[20vh] md:pt-2 md:w-[75%] overflow-y-auto min-h-screen",children:(0,o.jsx)("div",{className:"border border-gray-600 border-1px",children:["Title","Article"].map((e,s)=>(0,o.jsx)("div",{style:{userSelect:"text",cursor:"text"},ref:e=>{e&&!N.current[s]&&(N.current[s]=e)},className:"".concat("Title"===e?"h-[10%]":"h-[100vh]"," ").concat("Title"===e?"font-bold":"font-normal"," p-4 border rounded-g shadow-sm focus:outline-none cursor-pointer text-white"),contentEditable:!0,onKeyDown:e=>r(e,s,N),suppressContentEditableWarning:!0,onFocus:()=>0===s?h(!1):I(!1),onInput:e=>{b(s,e.target.innerHTML,t,a,y)},children:0===s?i||f&&(0,o.jsx)("span",{className:"text-gray-400",children:"".concat(e," here...")}):m||x&&(0,o.jsx)("span",{className:"text-gray-400",children:"Write your ".concat(e," here...")})},s))})})]})})}},5064:(e,t,s)=>{Promise.resolve().then(s.bind(s,3531))},7496:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});var o=s(7383);let n=async e=>new Promise((t,s)=>{let o=window.indexedDB.open("imageStore",1);try{o.onsuccess=o=>{let n=o.target.result;if(window.indexedDB||console.error("IndexedDB is not supported by your browser."),!n.objectStoreNames.contains("images")){s({status:205,message:"Object store 'images' not found",file:null});return}let a=n.transaction("images","readonly").objectStore("images").get(e),r=null;a.onsuccess=e=>{e.target.result?(r=e.target.result.data,t({status:200,message:"Image read from the IndexedDB",file:r})):(r=null,s({status:205,message:"Failed to open IndexedDB",file:null}))},a.onerror=()=>({status:205,message:"Error retrieving image",file:null})}}catch(e){return console.error(e),{status:500,message:e}}}),a=async(e,t)=>{let s=new FormData,o=JSON.stringify(t.find(e=>"title"===e.type)),a=JSON.stringify(t.find(e=>"id"===e.type)),r=JSON.stringify(t.find(e=>"body"===e.type)),l=JSON.stringify(t.find(e=>"italic"===e.type)),i=JSON.stringify(t.find(e=>"bold"===e.type));s.append("title",o),s.append("id",a),s.append("article",r),s.append("type",e),s.append("italic",l),s.append("bold",i);let c=t.filter(e=>"image"===e.type).map(async e=>{try{let t=await n(e.fileName);t.file instanceof File&&s.append("image",t.file)}catch(e){}});return await Promise.all(c),s},r=async(e,t)=>{let s=new FormData,n={},r="omit";switch(console.log("callHub called"),e){case"clean-image":s.append("file",t),s.append("type",e);break;case"post":let l=await a(e,t),i=sessionStorage.getItem("sessionId");console.log("sessionId",i),console.log("case Post"),n={...n,Authorization:"Bearer ".concat(i)},s=l,r="include";break;case"logout":s=JSON.stringify({data:"",type:e});let c=sessionStorage.getItem("sessionId");sessionStorage.removeItem("sessionId"),o.A.remove("sessionId"),console.log("sessionIdForLougout",c),n["Content-Type"]="application/json",n={...n,Authorization:"Bearer ".concat(c)};break;default:s=JSON.stringify({data:t,type:e}),n["Content-Type"]="application/json"}try{let e=await fetch("api/hub",{method:"POST",body:s,headers:n,credentials:r}),t=await e.json();if("User authenticated"===t.message){let e=t.sessionId;return{status:t.status,message:"User authenticated",sessionId:e}}if("Data saved successfully"!==t.message)return{status:t.status,message:t.message};{let e=t.body;return{status:t.status,message:"Data saved successfully",body:e}}}catch(e){return{status:500,message:e}}}}},e=>{var t=t=>e(e.s=t);e.O(0,[320,708,540,577,441,684,358],()=>t(5064)),_N_E=e.O()}]);