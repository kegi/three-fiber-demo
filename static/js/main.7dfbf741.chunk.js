(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var i,o=n(0),r=n.n(o),c=n(31),a=n.n(c),s=n(11),u=n(49),h=n(14),f=n(32),d=n.n(f);!function(e){e[e.x=0]="x",e[e.y=2]="y",e[e.z=1]="z"}(i||(i={}));var j=n(7),b=n(5),l=n(50),m=n(47),v=n(8),O=function(e){var t=e.distance,n=void 0===t?4e3:t,i=e.timeAnimation,r=void 0===i||i,c=e.time,a=void 0===c?"12h00":c,u=e.sun,h=void 0===u?{azimuth:0,turbidity:1,rayleigh:1,mieCoefficient:.035,mieDirectionalG:.73}:u,f=e.stars,d=void 0===f?{enabled:!0,depth:50,count:100,factor:30,saturation:0,fade:!0}:f,O=.995,p=.55,g=Object(o.useState)(function(e){var t=e.split(/[:|h]/i).map((function(e){return parseInt(e)||0})),n=Object(j.a)(t,2),i=n[0],o=n[1],r=(60*i+(void 0===o?0:o))/1440-.25;return r<0?1+r:r}(a)),y=Object(j.a)(g,2),x=y[0],w=y[1];Object(s.b)((function(){if(r){var e=x+C;w(e>=1?0:e)}}));var M=Object(o.useMemo)((function(){return x>=O||x<=p}),[x]),S=Object(o.useMemo)((function(){return x>=.6&&x<=.9}),[x]),A=Object(o.useMemo)((function(){return x>=O||x<=.055}),[x]),L=Object(o.useMemo)((function(){return x>=.44&&x<=p}),[x]),C=Object(o.useMemo)((function(){return A||L?5e-5:.001}),[M,A,L]),E=Object(o.useMemo)((function(){var e=x*(2*Math.PI)+1.5*Math.PI,t=n*Math.cos(e),i=n*Math.sin(e);return[h.azimuth||0,t,i]}),[h.azimuth,n,x]),z=Object(o.useMemo)((function(){var e=function(e){return Math.max(Math.min(e,.5),.015)};if(A)return e(((x>=O?x:x+1)-O)/(1.055-O));if(L){return e((p-x)/.11000000000000004)}return e(M?1:0)}),[x,M,A,L]);return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("hemisphereLight",{args:["#fff","#fff"],intensity:z,color:new b.Color("#808020"),groundColor:new b.Color("#804A40"),position:E}),Object(v.jsx)("directionalLight",{intensity:z,color:new b.Color("#fff"),position:E,castShadow:!0}),Object(v.jsx)("ambientLight",{intensity:z}),Object(v.jsx)(l.a,{turbidity:h.turbidity,rayleigh:h.rayleigh,mieCoefficient:h.mieCoefficient,mieDirectionalG:h.mieDirectionalG,distance:n,sunPosition:E}),d.enabled&&S&&Object(v.jsx)(m.a,{radius:n,depth:d.depth,count:d.count,factor:d.factor,saturation:d.saturation,fade:d.fade})]})},p=n(48),g=function(e){var t=e.width,n=e.length,r=e.heights,c=e.unitSize,a=void 0===c?1:c,s=Object(o.useRef)(),u=Object(o.useMemo)((function(){for(var e=[],i=0;i<n+1;i++){for(var o=[],c=0;c<t+1;c++){var a=c*(t+1)+i;o.push(r[a])}e.push(o.reverse())}return e}),[r,n,t]);return Object(h.b)((function(){return{position:[-t/2,0,n/2],mass:0,rotation:[1.5*Math.PI,0,0],args:[u,{elementSize:1}]}})),Object(o.useEffect)((function(){var e,t,n,o;if((null===(e=s.current)||void 0===e?void 0:e.setAttribute)&&(null===(t=s.current)||void 0===t?void 0:t.getAttribute)&&(null===(n=s.current)||void 0===n||null===(o=n.attributes)||void 0===o?void 0:o.normal))try{!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.y;if(e.length!==3*t.length)throw console.log(e.length,t.length),new Error("heights doesn't match the geometry size");t.forEach((function(t,i){e[3*i+n]=t}))}(s.current.getAttribute("position").array,r),s.current.getAttribute("position").needsUpdate=!0}catch(c){console.error(c)}}),[r]),Object(v.jsxs)(p.a,{"rotation-x":1.5*Math.PI,receiveShadow:!0,castShadow:!0,children:[Object(v.jsx)("planeBufferGeometry",{ref:s,args:[t*a,n*a,t,n],attach:"geometry"}),Object(v.jsx)("meshPhongMaterial",{attach:"material",wireframe:!0})]})},y=new b.Vector3,x=new b.Vector3,w=new b.Vector3,M=function(e){var t=e.height,n=void 0===t?5:t,i=e.position,r=void 0===i?[0,10,0]:i,c=e.speed,a=void 0===c?8:c,u=e.mass,f=void 0===u?5:u,d=function(e){var t=Object(o.useState)(new Set),n=Object(j.a)(t,2),i=n[0],r=n[1];return Object(o.useEffect)((function(){var t=function(e){r((function(t){return new Set(t).add(e.code)}))},n=function(t){r((function(e){var n=new Set(e);return n.delete(t.code),n})),e&&e(t.code)};return document.addEventListener("keydown",t),document.addEventListener("keyup",n),function(){document.removeEventListener("keydown",t),document.removeEventListener("keyup",n)}}),[e]),i}(),b=d.has("KeyW")||d.has("ArrowUp"),l=d.has("KeyS")||d.has("ArrowDown"),m=d.has("KeyA")||d.has("ArrowLeft"),O=d.has("KeyD")||d.has("ArrowRight"),p=d.has("Space"),g=Object(o.useState)(!1),M=Object(j.a)(g,2),S=M[0],A=M[1],L=Object(h.c)((function(){return{mass:f,type:"Dynamic",position:r,onCollide:k}})),C=Object(j.a)(L,2),E=C[0],z=C[1],P=Object(s.c)().camera,D=Object(o.useRef)([0,0,0]),k=function(){A(!0)};return Object(o.useEffect)((function(){z.velocity.subscribe((function(e){D.current=e}))}),[z]),Object(s.b)((function(){if(E.current){var e=(l?1:0)-(b?1:0),t=(m?1:0)-(O?1:0);P.position.copy(E.current.position),P.position.setY(P.position.y+n);var i=0;S&&p&&(A(!1),i=10),y.set(0,0,e),x.set(t,0,0),w.subVectors(y,x).normalize().multiplyScalar(a).applyEuler(P.rotation),z.velocity.set(w.x,D.current[1]+i,w.z)}})),Object(v.jsx)("mesh",{ref:E})},S=n(6),A=function(e){var t=e.position,n=e.radius,i=void 0===n?1:n,r=e.segments,c=void 0===r?15:r,a=Object(o.useMemo)((function(){return{position:t,args:[i,c,c]}}),[t,i,c]),s=Object(h.c)((function(){return{mass:1,position:t,args:i}})),u=Object(j.a)(s,1)[0];return Object(v.jsxs)("mesh",{ref:u,receiveShadow:!0,castShadow:!0,children:[Object(v.jsx)("sphereGeometry",Object(S.a)({attach:"geometry"},a)),Object(v.jsx)("meshPhongMaterial",{attach:"material",color:"hotpink"})]})},L=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=n.smoothness,o=void 0===i?2:i,r=n.elevation,c=void 0===r?10:r,a=new d.a,s=(e+1)*(t+1),u=Array(s).fill(void 0).map((function(n,i){var r=Math.floor(i/(e+1)),s=i-r*(e+1);return a.noise2D(s/e*o,r/t*o)*c}));return new Float32Array(u)}(100,100,{smoothness:4,elevation:3}),C=function(){return Object(v.jsx)("div",{className:"canvas-fullscreen-container",children:Object(v.jsxs)(s.a,{colorManagement:!0,shadowMap:!0,camera:{position:[-1,2,5],fov:50},children:[Object(v.jsx)("hemisphereLight",{intensity:.35}),Object(v.jsx)("spotLight",{position:[10,10,10],angle:.3,penumbra:1,intensity:2,castShadow:!0}),Object(v.jsxs)(h.a,{gravity:[0,-20,0],children:[Object(v.jsx)(O,{timeAnimation:!1,time:"5h55"}),Object(v.jsx)(g,{width:100,length:100,heights:L}),Object(v.jsx)(M,{}),Object(v.jsx)(A,{position:[12,10,-12]}),Object(v.jsx)(A,{position:[-12,10,-12]}),Object(v.jsx)(A,{position:[12,10,12]}),Object(v.jsx)(A,{position:[-12,10,12]})]}),Object(v.jsx)(u.a,{})]})})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),i(e),o(e),r(e),c(e)}))};n(45);a.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(C,{})}),document.getElementById("root")),E()}},[[46,1,2]]]);
//# sourceMappingURL=main.7dfbf741.chunk.js.map