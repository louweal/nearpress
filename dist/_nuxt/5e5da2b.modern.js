(window.webpackJsonp=window.webpackJsonp||[]).push([[10,2,3,4,5,6],Array(237).concat([function(t,e,o){var map={"./1.jpg":240,"./2.jpg":241,"./3.jpg":242,"./4.jpg":243,"./chess/1.jpg":244,"./chess/10.jpg":245,"./chess/11.jpg":246,"./chess/12.jpg":247,"./chess/13.jpg":248,"./chess/14.jpg":249,"./chess/15.jpg":250,"./chess/16.jpg":251,"./chess/17.jpg":252,"./chess/18.jpg":253,"./chess/2.jpg":254,"./chess/3.jpg":255,"./chess/4.jpg":256,"./chess/5.jpg":257,"./chess/6.jpg":258,"./chess/7.jpg":259,"./chess/8.jpg":260,"./chess/9.jpg":261,"./dogs/1.jpg":262,"./dogs/10.jpg":263,"./dogs/11.jpg":264,"./dogs/12.jpg":265,"./dogs/13.jpg":266,"./dogs/14.jpg":267,"./dogs/15.jpg":268,"./dogs/16.jpg":269,"./dogs/17.jpg":270,"./dogs/18.jpg":271,"./dogs/19.jpg":272,"./dogs/2.jpg":273,"./dogs/20.jpg":274,"./dogs/21.jpg":275,"./dogs/22.jpg":276,"./dogs/23.jpg":277,"./dogs/24.jpg":278,"./dogs/25.jpg":279,"./dogs/26.jpg":280,"./dogs/27.jpg":281,"./dogs/28.jpg":282,"./dogs/29.jpg":283,"./dogs/3.jpg":284,"./dogs/30.jpg":285,"./dogs/31.jpg":286,"./dogs/32.jpg":287,"./dogs/33.jpg":288,"./dogs/4.jpg":289,"./dogs/5.jpg":290,"./dogs/6.jpg":291,"./dogs/7.jpg":292,"./dogs/8.jpg":293,"./dogs/9.jpg":294,"./hiking/1.jpg":295,"./hiking/10.jpg":296,"./hiking/11.jpg":297,"./hiking/12.jpg":298,"./hiking/13.jpg":299,"./hiking/14.jpg":300,"./hiking/15.jpg":301,"./hiking/16.jpg":302,"./hiking/17.jpg":303,"./hiking/18.jpg":304,"./hiking/19.jpg":305,"./hiking/2.jpg":306,"./hiking/20.jpg":307,"./hiking/21.jpg":308,"./hiking/22.jpg":309,"./hiking/23.jpg":310,"./hiking/24.jpg":311,"./hiking/25.jpg":312,"./hiking/26.jpg":313,"./hiking/27.jpg":314,"./hiking/28.jpg":315,"./hiking/29.jpg":316,"./hiking/3.jpg":317,"./hiking/30.jpg":318,"./hiking/31.jpg":319,"./hiking/32.jpg":320,"./hiking/4.jpg":321,"./hiking/5.jpg":322,"./hiking/6.jpg":323,"./hiking/7.jpg":324,"./hiking/8.jpg":325,"./hiking/9.jpg":326,"./soccer/1.jpg":327,"./soccer/10.jpg":328,"./soccer/11.jpg":329,"./soccer/12.jpg":330,"./soccer/13.jpg":331,"./soccer/14.jpg":332,"./soccer/15.jpg":333,"./soccer/16.jpg":334,"./soccer/17.jpg":335,"./soccer/18.jpg":336,"./soccer/19.jpg":337,"./soccer/2.jpg":338,"./soccer/20.jpg":339,"./soccer/21.jpg":340,"./soccer/22.jpg":341,"./soccer/23.jpg":342,"./soccer/3.jpg":343,"./soccer/4.jpg":344,"./soccer/5.jpg":345,"./soccer/6.jpg":346,"./soccer/7.jpg":347,"./soccer/8.jpg":348,"./soccer/9.jpg":349,"./ux-design/1.jpg":350,"./ux-design/10.jpg":351,"./ux-design/11.jpg":352,"./ux-design/12.jpg":353,"./ux-design/13.jpg":354,"./ux-design/14.jpg":355,"./ux-design/15.jpg":356,"./ux-design/16.jpg":357,"./ux-design/17.jpg":358,"./ux-design/18.jpg":359,"./ux-design/19.jpg":360,"./ux-design/2.jpg":361,"./ux-design/20.jpg":362,"./ux-design/21.jpg":363,"./ux-design/22.jpg":364,"./ux-design/3.jpg":365,"./ux-design/4.jpg":366,"./ux-design/5.jpg":367,"./ux-design/6.jpg":368,"./ux-design/7.jpg":369,"./ux-design/8.jpg":370,"./ux-design/9.jpg":371};function n(t){var e=c(t);return o(e)}function c(t){if(!o.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=c,t.exports=n,n.id=237},function(t,e,o){var content=o(373);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(26).default)("1380b9f4",content,!0,{sourceMap:!1})},function(t,e,o){"use strict";o.r(e);var n={props:{data:{type:[Array,Object],default:()=>[]},showIntro:{type:Boolean,default:!0},flex:{type:Boolean,default:!0},borderTop:{type:Boolean,default:!0}},computed:{visual(){try{return"url(".concat(o(237)("./"+this.data.channel+"/"+this.data.visual+".jpg"),")")}catch(t){return"none"}}},methods:{paywall(){this.$store.commit("toggleModal"),this.$store.commit("setClickedArticle","/a/"+this.data.slug),document.getElementById("page").classList.toggle("is-blurred")}}},c=(o(372),o(11)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("nuxt-link",{staticClass:"card",attrs:{to:"/a/"+t.data.slug,event:""},nativeOn:{click:function(e){t.$store.state.user?t.$router.push("/a/"+t.data.slug):t.paywall()}}},[t.borderTop?e("div",{staticClass:"w-100 border-top d-md-none"}):t._e(),t._v(" "),e("div",{staticClass:"row g-0 w-100 my-3",class:t.flex?"gx-2 gx-sm-0":"gx-0"},[e("div",{staticClass:"col-md-12",class:t.flex?"col-4 col-sm-3 col-md-2":"col-12"},[e("div",{staticClass:"position-relative xxmt-2 mt-md-0"},[e("div",{staticClass:"card-img ratio ratio-4x3 rounded mb-md-1 mb-xl-2 w-100 bg-light",style:{backgroundImage:t.visual}}),t._v(" "),t.data.progress?e("span",{staticClass:"badge bg-secondary position-absolute m-1 top-0 end-0"},[t._v("\n          "+t._s(t.data.progress)+" %\n        ")]):t._e()])]),t._v(" "),e("div",{staticClass:"col-8 col-md-12 d-none d-md-block"},[e("h2",{staticClass:"card-title"},[t._v(t._s(t.data.title))]),t._v(" "),t.showIntro?e("p",{staticClass:"d-none d-md-block"},[t._v(t._s(t.data.intro))]):t._e()]),t._v(" "),e("div",{staticClass:"d-md-none align-self-center",class:t.flex?"col-8 col-sm-9":"col-12"},[e("h2",{staticClass:"card-title",class:!!t.flex&&"fw-light"},[t._v("\n        "+t._s(t.data.title)+"\n      ")])])])])}),[],!1,null,"b9808a30",null);e.default=component.exports},function(t,e,o){t.exports=o.p+"img/1.6702374.jpg"},function(t,e,o){t.exports=o.p+"img/2.a3da612.jpg"},function(t,e,o){t.exports=o.p+"img/3.9bf6e47.jpg"},function(t,e,o){t.exports=o.p+"img/4.f348fc9.jpg"},function(t,e,o){t.exports=o.p+"img/1.e07e61a.jpg"},function(t,e,o){t.exports=o.p+"img/10.8d54fda.jpg"},function(t,e,o){t.exports=o.p+"img/11.b5ededf.jpg"},function(t,e,o){t.exports=o.p+"img/12.ca96f61.jpg"},function(t,e,o){t.exports=o.p+"img/13.a944f87.jpg"},function(t,e,o){t.exports=o.p+"img/14.b504687.jpg"},function(t,e,o){t.exports=o.p+"img/15.ca18a0e.jpg"},function(t,e,o){t.exports=o.p+"img/16.a16c303.jpg"},function(t,e,o){t.exports=o.p+"img/17.95ef19c.jpg"},function(t,e,o){t.exports=o.p+"img/18.a3df360.jpg"},function(t,e,o){t.exports=o.p+"img/2.50c7ed4.jpg"},function(t,e,o){t.exports=o.p+"img/3.997a821.jpg"},function(t,e,o){t.exports=o.p+"img/4.b5ff483.jpg"},function(t,e,o){t.exports=o.p+"img/5.e4d0e25.jpg"},function(t,e,o){t.exports=o.p+"img/6.cf7e769.jpg"},function(t,e,o){t.exports=o.p+"img/7.51d0204.jpg"},function(t,e,o){t.exports=o.p+"img/8.e0f4a71.jpg"},function(t,e,o){t.exports=o.p+"img/9.c24d298.jpg"},function(t,e,o){t.exports=o.p+"img/1.1a297a7.jpg"},function(t,e,o){t.exports=o.p+"img/10.446c649.jpg"},function(t,e,o){t.exports=o.p+"img/11.d5632d0.jpg"},function(t,e,o){t.exports=o.p+"img/12.37fb8fc.jpg"},function(t,e,o){t.exports=o.p+"img/13.a590247.jpg"},function(t,e,o){t.exports=o.p+"img/14.1aaacd7.jpg"},function(t,e,o){t.exports=o.p+"img/15.4753ccd.jpg"},function(t,e,o){t.exports=o.p+"img/16.53863b6.jpg"},function(t,e,o){t.exports=o.p+"img/17.9f4694b.jpg"},function(t,e,o){t.exports=o.p+"img/18.6025e83.jpg"},function(t,e,o){t.exports=o.p+"img/19.5d09585.jpg"},function(t,e,o){t.exports=o.p+"img/2.ebf5325.jpg"},function(t,e,o){t.exports=o.p+"img/20.1a297a7.jpg"},function(t,e,o){t.exports=o.p+"img/21.57d9aee.jpg"},function(t,e,o){t.exports=o.p+"img/22.d1234d1.jpg"},function(t,e,o){t.exports=o.p+"img/23.673625b.jpg"},function(t,e,o){t.exports=o.p+"img/24.7d8333e.jpg"},function(t,e,o){t.exports=o.p+"img/25.4a2c179.jpg"},function(t,e,o){t.exports=o.p+"img/26.4e4947b.jpg"},function(t,e,o){t.exports=o.p+"img/27.58c0b8e.jpg"},function(t,e,o){t.exports=o.p+"img/28.2b92bfb.jpg"},function(t,e,o){t.exports=o.p+"img/29.669ba42.jpg"},function(t,e,o){t.exports=o.p+"img/3.bbbcb45.jpg"},function(t,e,o){t.exports=o.p+"img/30.2914c52.jpg"},function(t,e,o){t.exports=o.p+"img/31.bcab611.jpg"},function(t,e,o){t.exports=o.p+"img/32.8663ebe.jpg"},function(t,e,o){t.exports=o.p+"img/33.a26dc65.jpg"},function(t,e,o){t.exports=o.p+"img/4.e34bfdb.jpg"},function(t,e,o){t.exports=o.p+"img/5.ace7a24.jpg"},function(t,e,o){t.exports=o.p+"img/6.460887b.jpg"},function(t,e,o){t.exports=o.p+"img/7.2cd9a66.jpg"},function(t,e,o){t.exports=o.p+"img/8.f9f236c.jpg"},function(t,e,o){t.exports=o.p+"img/9.a66da31.jpg"},function(t,e,o){t.exports=o.p+"img/1.d91b273.jpg"},function(t,e,o){t.exports=o.p+"img/10.f125cc5.jpg"},function(t,e,o){t.exports=o.p+"img/11.ab6d2d1.jpg"},function(t,e,o){t.exports=o.p+"img/12.413f826.jpg"},function(t,e,o){t.exports=o.p+"img/13.60ce37e.jpg"},function(t,e,o){t.exports=o.p+"img/14.7caa49f.jpg"},function(t,e,o){t.exports=o.p+"img/15.a42b114.jpg"},function(t,e,o){t.exports=o.p+"img/16.d904029.jpg"},function(t,e,o){t.exports=o.p+"img/17.52c75bd.jpg"},function(t,e,o){t.exports=o.p+"img/18.e9ab319.jpg"},function(t,e,o){t.exports=o.p+"img/19.a472f31.jpg"},function(t,e,o){t.exports=o.p+"img/2.6ca5b14.jpg"},function(t,e,o){t.exports=o.p+"img/20.1a30606.jpg"},function(t,e,o){t.exports=o.p+"img/21.a1bfb9c.jpg"},function(t,e,o){t.exports=o.p+"img/22.309177a.jpg"},function(t,e,o){t.exports=o.p+"img/23.1cf607f.jpg"},function(t,e,o){t.exports=o.p+"img/24.d7a48b3.jpg"},function(t,e,o){t.exports=o.p+"img/25.66d24d8.jpg"},function(t,e,o){t.exports=o.p+"img/26.fadc49a.jpg"},function(t,e,o){t.exports=o.p+"img/27.d4e1dcb.jpg"},function(t,e,o){t.exports=o.p+"img/28.0647ff9.jpg"},function(t,e,o){t.exports=o.p+"img/29.5fd6cd0.jpg"},function(t,e,o){t.exports=o.p+"img/3.5c72cc6.jpg"},function(t,e,o){t.exports=o.p+"img/30.1557713.jpg"},function(t,e,o){t.exports=o.p+"img/31.ba8ed34.jpg"},function(t,e,o){t.exports=o.p+"img/32.3260e8d.jpg"},function(t,e,o){t.exports=o.p+"img/4.9e8603a.jpg"},function(t,e,o){t.exports=o.p+"img/5.c688d2f.jpg"},function(t,e,o){t.exports=o.p+"img/6.f4a54a1.jpg"},function(t,e,o){t.exports=o.p+"img/7.be696f2.jpg"},function(t,e,o){t.exports=o.p+"img/8.6f0a4f8.jpg"},function(t,e,o){t.exports=o.p+"img/9.38171bd.jpg"},function(t,e,o){t.exports=o.p+"img/1.de0dfd7.jpg"},function(t,e,o){t.exports=o.p+"img/10.e2b61ab.jpg"},function(t,e,o){t.exports=o.p+"img/11.61ae0da.jpg"},function(t,e,o){t.exports=o.p+"img/12.8290e79.jpg"},function(t,e,o){t.exports=o.p+"img/13.dc9966e.jpg"},function(t,e,o){t.exports=o.p+"img/14.df52a9a.jpg"},function(t,e,o){t.exports=o.p+"img/15.66c4796.jpg"},function(t,e,o){t.exports=o.p+"img/16.577650f.jpg"},function(t,e,o){t.exports=o.p+"img/17.f2b9f4a.jpg"},function(t,e,o){t.exports=o.p+"img/18.623a624.jpg"},function(t,e,o){t.exports=o.p+"img/19.2032026.jpg"},function(t,e,o){t.exports=o.p+"img/2.10b7ac9.jpg"},function(t,e,o){t.exports=o.p+"img/20.7317dbb.jpg"},function(t,e,o){t.exports=o.p+"img/21.dc05d37.jpg"},function(t,e,o){t.exports=o.p+"img/22.9b042a9.jpg"},function(t,e,o){t.exports=o.p+"img/23.82cc1fd.jpg"},function(t,e,o){t.exports=o.p+"img/3.2b4b30f.jpg"},function(t,e,o){t.exports=o.p+"img/4.2e78aaf.jpg"},function(t,e,o){t.exports=o.p+"img/5.3058589.jpg"},function(t,e,o){t.exports=o.p+"img/6.59d642c.jpg"},function(t,e,o){t.exports=o.p+"img/7.3fd4075.jpg"},function(t,e,o){t.exports=o.p+"img/8.d01f7b1.jpg"},function(t,e,o){t.exports=o.p+"img/9.c6411e8.jpg"},function(t,e,o){t.exports=o.p+"img/1.7747b1d.jpg"},function(t,e,o){t.exports=o.p+"img/10.2c92675.jpg"},function(t,e,o){t.exports=o.p+"img/11.04123d1.jpg"},function(t,e,o){t.exports=o.p+"img/12.95e0e9b.jpg"},function(t,e,o){t.exports=o.p+"img/13.7c676d9.jpg"},function(t,e,o){t.exports=o.p+"img/14.356af53.jpg"},function(t,e,o){t.exports=o.p+"img/15.2866277.jpg"},function(t,e,o){t.exports=o.p+"img/16.45e66c8.jpg"},function(t,e,o){t.exports=o.p+"img/17.94f8cdf.jpg"},function(t,e,o){t.exports=o.p+"img/18.ec2e5ff.jpg"},function(t,e,o){t.exports=o.p+"img/19.788f58d.jpg"},function(t,e,o){t.exports=o.p+"img/2.7e9e5dc.jpg"},function(t,e,o){t.exports=o.p+"img/20.30312ed.jpg"},function(t,e,o){t.exports=o.p+"img/21.a74485c.jpg"},function(t,e,o){t.exports=o.p+"img/22.61a70bb.jpg"},function(t,e,o){t.exports=o.p+"img/3.e26959a.jpg"},function(t,e,o){t.exports=o.p+"img/4.9e786fc.jpg"},function(t,e,o){t.exports=o.p+"img/5.e736149.jpg"},function(t,e,o){t.exports=o.p+"img/6.8e6946f.jpg"},function(t,e,o){t.exports=o.p+"img/7.1997f78.jpg"},function(t,e,o){t.exports=o.p+"img/8.9beff53.jpg"},function(t,e,o){t.exports=o.p+"img/9.19dcfbd.jpg"},function(t,e,o){"use strict";o(238)},function(t,e,o){var n=o(25)(!1);n.push([t.i,".card[data-v-b9808a30]{display:block;position:relative;width:100%;height:100%;overflow:hidden}.card:hover .card-img[data-v-b9808a30]{background-size:120%}.card:hover .card-title[data-v-b9808a30]{color:var(--bs-secondary)}.card-title[data-v-b9808a30]{transition:color .5s linear}.card-img[data-v-b9808a30]{height:auto;overflow:hidden;background-repeat:no-repeat;background-position:50%;transition:background-size .3s cubic-bezier(.2,0,.1,1) .15s;background-size:115%}",""]),t.exports=n},function(t,e,o){var content=o(376);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(26).default)("0e728ef8",content,!0,{sourceMap:!1})},function(t,e,o){"use strict";o(374)},function(t,e,o){var n=o(25)(!1);n.push([t.i,".card[data-v-58ac9b98]{position:relative}.card:hover .card-img[data-v-58ac9b98]{background-size:120%}.card-img[data-v-58ac9b98]{height:100%;overflow:hidden;background-position:50%;transition:background-size .4s cubic-bezier(.2,0,.1,1) .15s;background-size:115%}.card-img-overlay[data-v-58ac9b98]{top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:flex;align-items:flex-end;background:#000;background:linear-gradient(0deg,#000,transparent 59%);z-index:3}",""]),t.exports=n},function(t,e,o){"use strict";o.r(e);var n={props:{data:{type:[Array,Object],default:()=>[]}},computed:{visual(){try{return"url(".concat(o(237)("./"+this.data.channel+"/"+this.data.visual+".jpg"),")")}catch(t){return"none"}}},methods:{paywall(){this.$store.commit("toggleModal"),this.$store.commit("setClickedArticle","/a/"+this.data.slug),document.getElementById("page").classList.toggle("is-blurred")}}},c=(o(375),o(11)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("nuxt-link",{staticClass:"card position-relative",attrs:{to:"/a/"+t.data.slug,event:""},nativeOn:{click:function(e){t.$store.state.user?t.$router.push("/a/"+t.data.slug):t.paywall()}}},[e("div",{staticClass:"ratio ratio-4x3"},[e("div",{staticClass:"card-img position-absolute rounded bg-light",style:{backgroundImage:t.visual}}),t._v(" "),e("div",{staticClass:"card-img-overlay rounded pb-1 px-3 px-lg-4 pb-lg-2"},[e("h2",{staticClass:"text-white fs-3"},[t._v(t._s(t.data.title))])])]),t._v(" "),t.data.progress?e("span",{staticClass:"badge bg-secondary position-absolute m-1 top-0 end-0 lh-1"},[t._v("\n    "+t._s(t.data.progress)+" %\n    ")]):t._e()])}),[],!1,null,"58ac9b98",null);e.default=component.exports},function(t,e,o){"use strict";o.r(e);var n={props:{articles:{type:[Object,Array],default:()=>{}}}},c=o(11),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"row gx-3 gx-lg-5"},[e("div",{staticClass:"col-12 col-md-6"},[e("display-card",{attrs:{data:t.articles[0]}})],1),t._v(" "),e("div",{staticClass:"col-12 col-md-6"},[e("display-card",{staticClass:"d-none d-md-block",attrs:{data:t.articles[1]}})],1)]),t._v(" "),e("div",{staticClass:"row gy-0 gx-3 d-sm-none mt-2"},t._l(t.articles.slice(1,3),(function(article,i){return e("div",{key:i,staticClass:"col-6"},[e("card",{attrs:{data:article,flex:!1,borderTop:!1}})],1)})),0)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DisplayCard:o(377).default,Card:o(239).default})},function(t,e,o){"use strict";o.r(e);var n={props:{articles:{type:[Object,Array],default:()=>{}}}},c=o(11),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"col-12 col-md-9"},[e("div",{staticClass:"row g-0 gx-lg-4 gy-lg-2"},t._l(t.articles,(function(article,i){return e("div",{key:i,staticClass:"col-12 col-md-4"},[e("card",{class:0===i&&"d-none d-sm-block",attrs:{data:article,borderTop:1!==i}})],1)})),0)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Card:o(239).default})},function(t,e,o){"use strict";o.r(e);o(150);var n={props:{articles:{type:[Object,Array],default:()=>{}}},methods:{formatDate:t=>t.toLocaleDateString("us-EN",{day:"numeric",month:"long"})+", "+t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),paywall(article){this.$store.commit("toggleModal"),this.$store.commit("setClickedArticle","/a/"+article.slug),document.getElementById("page").classList.toggle("is-blurred")}}},c=o(11),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"col-md-3 d-none d-md-block"},[e("div",{staticClass:"border bg-white shadow-sm rounded py-3 px-3"},[e("h2",{staticClass:"fs-4"},[t._v("Recently published")]),t._v(" "),t._l(t.articles.sort(((a,b)=>a.date>b.date?-1:1)),(function(article,i){return e("div",{key:i},[e("nuxt-link",{staticClass:"d-block w-100 m-1",class:9!==i&&"border-bottom",attrs:{to:"/a/"+article.slug,event:""},nativeOn:{click:function(e){t.$store.state.user?t.$router.push("/a/"+article.slug):t.paywall(article)}}},[e("small",{staticClass:"text-muted fw-bold"},[t._v("\n          "+t._s(t.formatDate(article.date))+"\n        ")]),t._v(" "),e("h3",{staticClass:"fs-6 fw-light"},[t._v("\n          "+t._s(article.title)+"\n          "),article.progress?e("span",{staticClass:"badge bg-secondary"},[t._v("\n            "+t._s(article.progress)+" %\n          ")]):t._e()])])],1)}))],2)])}),[],!1,null,null,null);e.default=component.exports},,,,,,,,,,,function(t,e,o){"use strict";o.r(e);o(150),o(18),o(27);var n=o(10),c={transition:"page",channels:o(32),mounted(){var t=this;return Object(n.a)((function*(){yield t.validatePage()}))()},computed:{articles(){return this.$store.state.articles},channelArticles(){return this.$store.state.articles.filter((a=>a.channel===this.$route.params.slug))},channel(){return this.$options.channels.find((t=>t.slug===this.$route.params.slug))}},methods:{validatePage(){this.channel||this.$nuxt.error({statusCode:404,message:"Channel not found"})}}},r=o(11),component=Object(r.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-lg"},[e("div",{staticClass:"d-flex justify-content-between"},[e("nav",{attrs:{"aria-label":"breadcrumb"}},[e("ol",{staticClass:"breadcrumb"},[e("li",{staticClass:"breadcrumb-item"},[e("nuxt-link",{attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),e("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[t._v("\n          "+t._s(t.channel.title)+"\n        ")])])]),t._v(" "),e("i",{staticClass:"bi bi-bookmark-heart-fill fs-4 color-secondary cursor-pointer bi--active"})]),t._v(" "),e("hero",{attrs:{articles:t.channelArticles.slice(0,3)}}),t._v(" "),e("div",{staticClass:"row g-0 gx-lg-4 gy-lg-2"},[e("news-grid",{attrs:{articles:t.channelArticles.slice(2,14)}}),t._v(" "),e("sidebar",{attrs:{articles:t.channelArticles.sort(((a,b)=>a.date>b.date?-1:1)).slice(2,12)}})],1),t._v(" "),e("h2",{staticClass:"fs-5"},[t._v("Recently published")]),t._v(" "),e("div",{staticClass:"row gy-0 gx-3 pt-1"},t._l([...t.articles].sort(((a,b)=>a.date>b.date?-1:1)).slice(0,5),(function(article,i){return e("div",{key:i,staticClass:"col-12 col-md"},[e("card",{attrs:{data:article,showIntro:!1}})],1)})),0),t._v(" "),e("h2",{staticClass:"fs-5"},[t._v("Most read")]),t._v(" "),e("div",{staticClass:"row gy-0 gx-3 pt-1"},t._l(t.articles.slice(0,5),(function(article,i){return e("div",{key:i,staticClass:"col-12 col-md"},[e("card",{attrs:{data:article,showIntro:!1}})],1)})),0)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Hero:o(378).default,NewsGrid:o(379).default,Sidebar:o(380).default,Card:o(239).default})}])]);