(function(e){function t(t){for(var o,c,s=t[0],a=t[1],l=t[2],p=0,f=[];p<s.length;p++)c=s[p],Object.prototype.hasOwnProperty.call(i,c)&&i[c]&&f.push(i[c][0]),i[c]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);u&&u(t);while(f.length)f.shift()();return n.push.apply(n,l||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],o=!0,s=1;s<r.length;s++){var a=r[s];0!==i[a]&&(o=!1)}o&&(n.splice(t--,1),e=c(c.s=r[0]))}return e}var o={},i={app:0},n=[];function c(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=o,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(r,o,function(t){return e[t]}.bind(null,o));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],a=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=a;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"5c0b":function(e,t,r){"use strict";var o=r("9c0c"),i=r.n(o);i.a},"9c0c":function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var o=r("a026"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("HelloWorld"),e._v(" "+e._s(e.$t("compress.selectText"))+" ")],1)},n=[],c=r("9f12"),s=r("8b83"),a=r("c65a"),l=r("c03e"),u=r("9ab4"),p=r("60a3"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"switch",staticClass:"re-switch",class:e._isActive,on:{click:e.switchToggle}},[r("i",{staticClass:"re-switch-circle"})])},h=[],d=(r("b0c0"),r("53fe")),b=function(e){function t(){var e;return Object(c["a"])(this,t),e=Object(s["a"])(this,Object(a["a"])(t).apply(this,arguments)),e.name="re-switch",e.isSwitch=!1,e}return Object(l["a"])(t,e),Object(d["a"])(t,[{key:"switchToggle",value:function(){!this.isDisabled&&(this.isSwitch=!this.isSwitch),!this.isDisabled&&this.change(this.isSwitch),this.setBackgroundColor()}},{key:"setBackgroundColor",value:function(){var e=this.isSwitch?this.activeColor:this.inactiveColor;this.$refs.switch.style.borderColor=e,this.$refs.switch.style.backgroundColor=e}},{key:"setWidth",value:function(){this.$refs.switch.style.width=this.width+"px"}},{key:"change",value:function(e){return e}},{key:"mounted",value:function(){this.setBackgroundColor(),this.setWidth()}},{key:"_isActive",get:function(){return this.isDisabled?"re-switch-disabled":this.isSwitch?"re-switch-active":""}}]),t}(p["d"]);u["a"]([Object(p["c"])({default:function(){return!1}})],b.prototype,"isDisabled",void 0),u["a"]([Object(p["c"])({default:"$color-success"})],b.prototype,"activeColor",void 0),u["a"]([Object(p["c"])({default:"$color-danger"})],b.prototype,"inactiveColor",void 0),u["a"]([Object(p["c"])({default:40})],b.prototype,"width",void 0),u["a"]([Object(p["b"])()],b.prototype,"change",null),b=u["a"]([p["a"]],b);var v=b,w=v,y=(r("f764"),r("2877")),g=Object(y["a"])(w,f,h,!1,null,"31238d0c",null),j=g.exports,O=function(e){function t(){return Object(c["a"])(this,t),Object(s["a"])(this,Object(a["a"])(t).apply(this,arguments))}return Object(l["a"])(t,e),t}(p["d"]);O=u["a"]([Object(p["a"])({components:{HelloWorld:j}})],O);var x=O,S=x,T=(r("5c0b"),Object(y["a"])(S,i,n,!1,null,null,null)),k=T.exports,m=(r("4160"),r("ac1f"),r("1276"),r("159b"),r("bf2d")),C={compress:{tip:"Drag or Click",selectText:"Selected picture is",sizeText:"Size is",oldPicSizeText:"The size of original picture is",newPicSizeText:"The size of new picture is",success:"Compressed success",download:"Download"},upload:{tip:"Drag or Click",alert:"Only can upload jpg and png, no more than 500kb"},screenshots:{screenshots:"Screenshots",alert:"Screen shot failed"}},z=C,$={compress:{tip:"拖拽或点击上传",selectText:"已选择图片",sizeText:"大小为",oldPicSizeText:"图片原尺寸是",newPicSizeText:"新图片尺寸为",success:"图片压缩成功",download:"点击下载"},upload:{tip:"拖拽或点击上传",alert:"只能上传jpg/png文件，且不超过500kb"},screenshots:{screenshots:"截图",alert:"截图失败"}},_=$,P={compress:{tip:"拖拽或點擊上傳",selectText:"已選擇圖片",sizeText:"大小為",oldPicSizeText:"圖片原尺寸是",newPicSizeText:"新圖片尺寸是",success:"圖片壓縮成功",download:"點擊下載"},upload:{tip:"拖拽或點擊上傳",alert:"只能上傳jpg/png文件，且不超過500kb"},screenshots:{screenshots:"截圖",alert:"截圖失敗"}},D=P,W={en:z,zhCN:_,zhTW:D},M=W["zhCN"],N=function(){},B=function(e){o["a"].prototype.$alert?o["a"].prototype.$alert(e,"error"):console.error(e)};N.prototype={use:function(e){return e?W[e]?void(M=W[e]):(B("该语言暂不支持"),void(M=W["zhCN"])):(B("语言不能为空"),void(M=W["zhCN"]))},ils8:function(e){var t=e.split("."),r=M,o="";return t.forEach((function(e){for(var t in r)e===t&&("object"===Object(m["a"])(r[t])?r=r[t]:o=r[t])})),o}};var E=N,A=new E;o["a"].prototype.$alert=function(e){console.log(e)},o["a"].prototype.$t=A.ils8,o["a"].prototype.$ils8=A.use,new o["a"]({render:function(e){return e(k)}}).$mount("#app")},f764:function(e,t,r){"use strict";var o=r("f7fc"),i=r.n(o);i.a},f7fc:function(e,t,r){}});
//# sourceMappingURL=app.cd860860.js.map