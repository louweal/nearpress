(window.webpackJsonp=window.webpackJsonp||[]).push([[9,2,7],Array(237).concat([function(e,t,o){"use strict";function n(path,e){try{return"url(".concat(o(240)("./"+path+"/"+e+".webp"),")")}catch(t){try{return"url(".concat(o(368)("./"+path+"/"+e+".jpg"),")")}catch(e){return"none"}}}o.d(t,"a",(function(){return n}))},function(e,t,o){var content=o(370);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(26).default)("2ac70c3c",content,!0,{sourceMap:!1})},function(e,t,o){"use strict";o.r(t);var n=o(237),c={props:{data:{type:[Array,Object],default:()=>[]},showIntro:{type:Boolean,default:!0},flex:{type:Boolean,default:!0},borderTop:{type:Boolean,default:!0}},computed:{visual(){return Object(n.a)(this.data.channel,this.data.visual)}},methods:{paywall(){this.$store.commit("toggleModal"),this.$store.commit("setClickedArticle","/a/"+this.data.slug),document.getElementById("page").classList.toggle("is-blurred")}}},r=(o(369),o(11)),component=Object(r.a)(c,(function(){var e=this,t=e._self._c;return t("nuxt-link",{staticClass:"card",attrs:{to:"/a/"+e.data.slug,event:""},nativeOn:{click:function(t){e.$store.state.user?e.$router.push("/a/"+e.data.slug):e.paywall()}}},[e.borderTop?t("div",{staticClass:"w-100 border-top d-md-none"}):e._e(),e._v(" "),t("div",{staticClass:"row g-0 w-100 my-3 my-md-0",class:e.flex?"gx-2 gx-sm-0":"gx-0"},[t("div",{staticClass:"col-md-12",class:e.flex?"col-4 col-sm-3 col-md-2":"col-12"},[t("div",{staticClass:"position-relative xxmt-2 mt-md-0"},[t("div",{staticClass:"card-img ratio ratio-4x3 rounded mb-md-1 mb-xl-2 w-100 bg-light",style:{backgroundImage:e.visual}}),e._v(" "),e.data.progress?t("span",{staticClass:"badge bg-secondary position-absolute m-1 top-0 end-0"},[e._v("\n          "+e._s(e.data.progress)+" %\n        ")]):e._e()])]),e._v(" "),t("div",{staticClass:"col-8 col-md-12 d-none d-md-block"},[t("h2",{staticClass:"card-title"},[e._v(e._s(e.data.title))]),e._v(" "),e.showIntro?t("p",{staticClass:"d-none d-md-block"},[e._v(e._s(e.data.intro))]):e._e()]),e._v(" "),t("div",{staticClass:"d-md-none align-self-center",class:e.flex?"col-8 col-sm-9":"col-12"},[t("h2",{staticClass:"card-title",class:!!e.flex&&"fw-light"},[e._v("\n        "+e._s(e.data.title)+"\n      ")])])])])}),[],!1,null,"0dc1745a",null);t.default=component.exports},function(e,t,o){var map={"./chess/1.webp":241,"./chess/10.webp":242,"./chess/11.webp":243,"./chess/12.webp":244,"./chess/13.webp":245,"./chess/14.webp":246,"./chess/15.webp":247,"./chess/16.webp":248,"./chess/17.webp":249,"./chess/18.webp":250,"./chess/2.webp":251,"./chess/3.webp":252,"./chess/4.webp":253,"./chess/5.webp":254,"./chess/6.webp":255,"./chess/7.webp":256,"./chess/8.webp":257,"./chess/9.webp":258,"./dogs/1.webp":259,"./dogs/10.webp":260,"./dogs/11.webp":261,"./dogs/12.webp":262,"./dogs/13.webp":263,"./dogs/14.webp":264,"./dogs/15.webp":265,"./dogs/16.webp":266,"./dogs/17.webp":267,"./dogs/18.webp":268,"./dogs/19.webp":269,"./dogs/2.webp":270,"./dogs/20.webp":271,"./dogs/21.webp":272,"./dogs/22.webp":273,"./dogs/23.webp":274,"./dogs/24.webp":275,"./dogs/25.webp":276,"./dogs/26.webp":277,"./dogs/27.webp":278,"./dogs/28.webp":279,"./dogs/29.webp":280,"./dogs/3.webp":281,"./dogs/30.webp":282,"./dogs/31.webp":283,"./dogs/32.webp":284,"./dogs/33.webp":285,"./dogs/4.webp":286,"./dogs/5.webp":287,"./dogs/6.webp":288,"./dogs/7.webp":289,"./dogs/8.webp":290,"./dogs/9.webp":291,"./hiking/1.webp":292,"./hiking/10.webp":293,"./hiking/11.webp":294,"./hiking/12.webp":295,"./hiking/13.webp":296,"./hiking/14.webp":297,"./hiking/15.webp":298,"./hiking/16.webp":299,"./hiking/17.webp":300,"./hiking/18.webp":301,"./hiking/19.webp":302,"./hiking/2.webp":303,"./hiking/20.webp":304,"./hiking/21.webp":305,"./hiking/22.webp":306,"./hiking/23.webp":307,"./hiking/24.webp":308,"./hiking/25.webp":309,"./hiking/26.webp":310,"./hiking/27.webp":311,"./hiking/28.webp":312,"./hiking/29.webp":313,"./hiking/3.webp":314,"./hiking/30.webp":315,"./hiking/31.webp":316,"./hiking/32.webp":317,"./hiking/4.webp":318,"./hiking/5.webp":319,"./hiking/6.webp":320,"./hiking/7.webp":321,"./hiking/8.webp":322,"./hiking/9.webp":323,"./soccer/1.webp":324,"./soccer/10.webp":325,"./soccer/11.webp":326,"./soccer/12.webp":327,"./soccer/13.webp":328,"./soccer/14.webp":329,"./soccer/15.webp":330,"./soccer/16.webp":331,"./soccer/17.webp":332,"./soccer/18.webp":333,"./soccer/19.webp":334,"./soccer/2.webp":335,"./soccer/20.webp":336,"./soccer/21.webp":337,"./soccer/22.webp":338,"./soccer/23.webp":339,"./soccer/3.webp":340,"./soccer/4.webp":341,"./soccer/5.webp":342,"./soccer/6.webp":343,"./soccer/7.webp":344,"./soccer/8.webp":345,"./soccer/9.webp":346,"./ux-design/1.webp":347,"./ux-design/10.webp":348,"./ux-design/11.webp":349,"./ux-design/12.webp":350,"./ux-design/13.webp":351,"./ux-design/14.webp":352,"./ux-design/15.webp":353,"./ux-design/16.webp":354,"./ux-design/17.webp":355,"./ux-design/18.webp":356,"./ux-design/19.webp":357,"./ux-design/2.webp":358,"./ux-design/20.webp":359,"./ux-design/21.webp":360,"./ux-design/3.webp":361,"./ux-design/4.webp":362,"./ux-design/5.webp":363,"./ux-design/6.webp":364,"./ux-design/7.webp":365,"./ux-design/8.webp":366,"./ux-design/9.webp":367};function n(e){var t=c(e);return o(t)}function c(e){if(!o.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}n.keys=function(){return Object.keys(map)},n.resolve=c,e.exports=n,n.id=240},function(e,t,o){e.exports=o.p+"img/1.3178f3c.webp"},function(e,t,o){e.exports=o.p+"img/10.df54e75.webp"},function(e,t,o){e.exports=o.p+"img/11.8e6faa5.webp"},function(e,t,o){e.exports=o.p+"img/12.77b373f.webp"},function(e,t,o){e.exports=o.p+"img/13.a509096.webp"},function(e,t,o){e.exports=o.p+"img/14.a6a6f0e.webp"},function(e,t,o){e.exports=o.p+"img/15.bd60c47.webp"},function(e,t,o){e.exports=o.p+"img/16.4dd3e5b.webp"},function(e,t,o){e.exports=o.p+"img/17.bbc84e0.webp"},function(e,t,o){e.exports=o.p+"img/18.1b76f71.webp"},function(e,t,o){e.exports=o.p+"img/2.d54b2de.webp"},function(e,t,o){e.exports=o.p+"img/3.958a3c8.webp"},function(e,t,o){e.exports=o.p+"img/4.351d4d4.webp"},function(e,t,o){e.exports=o.p+"img/5.22327d7.webp"},function(e,t,o){e.exports=o.p+"img/6.786121d.webp"},function(e,t,o){e.exports=o.p+"img/7.2cbb454.webp"},function(e,t,o){e.exports=o.p+"img/8.e80553c.webp"},function(e,t,o){e.exports=o.p+"img/9.d3e2179.webp"},function(e,t,o){e.exports=o.p+"img/1.9b01e53.webp"},function(e,t,o){e.exports=o.p+"img/10.9543392.webp"},function(e,t,o){e.exports=o.p+"img/11.fc5f0d4.webp"},function(e,t,o){e.exports=o.p+"img/12.03e4e86.webp"},function(e,t,o){e.exports=o.p+"img/13.f973e23.webp"},function(e,t,o){e.exports=o.p+"img/14.4cf6374.webp"},function(e,t,o){e.exports=o.p+"img/15.c0cade7.webp"},function(e,t,o){e.exports=o.p+"img/16.ad65f7b.webp"},function(e,t,o){e.exports=o.p+"img/17.feeff0e.webp"},function(e,t,o){e.exports=o.p+"img/18.dcb4db3.webp"},function(e,t,o){e.exports=o.p+"img/19.cd1fe95.webp"},function(e,t,o){e.exports=o.p+"img/2.5bb6796.webp"},function(e,t,o){e.exports=o.p+"img/20.9b01e53.webp"},function(e,t,o){e.exports=o.p+"img/21.fbbe7ab.webp"},function(e,t,o){e.exports=o.p+"img/22.4e8c9cd.webp"},function(e,t,o){e.exports=o.p+"img/23.663d7fa.webp"},function(e,t,o){e.exports=o.p+"img/24.f3d0d8e.webp"},function(e,t,o){e.exports=o.p+"img/25.4c6629f.webp"},function(e,t,o){e.exports=o.p+"img/26.ebed046.webp"},function(e,t,o){e.exports=o.p+"img/27.990e399.webp"},function(e,t,o){e.exports=o.p+"img/28.bdcf729.webp"},function(e,t,o){e.exports=o.p+"img/29.b9663e7.webp"},function(e,t,o){e.exports=o.p+"img/3.e5af5a9.webp"},function(e,t,o){e.exports=o.p+"img/30.ac5f28c.webp"},function(e,t,o){e.exports=o.p+"img/31.6e848da.webp"},function(e,t,o){e.exports=o.p+"img/32.4e7b326.webp"},function(e,t,o){e.exports=o.p+"img/33.7918ea2.webp"},function(e,t,o){e.exports=o.p+"img/4.437c834.webp"},function(e,t,o){e.exports=o.p+"img/5.ab25656.webp"},function(e,t,o){e.exports=o.p+"img/6.562b766.webp"},function(e,t,o){e.exports=o.p+"img/7.6fe8f5a.webp"},function(e,t,o){e.exports=o.p+"img/8.05b7462.webp"},function(e,t,o){e.exports=o.p+"img/9.3cebd7d.webp"},function(e,t,o){e.exports=o.p+"img/1.c6d452d.webp"},function(e,t,o){e.exports=o.p+"img/10.1195332.webp"},function(e,t,o){e.exports=o.p+"img/11.77c48fc.webp"},function(e,t,o){e.exports=o.p+"img/12.40b7933.webp"},function(e,t,o){e.exports=o.p+"img/13.5d7c50b.webp"},function(e,t,o){e.exports=o.p+"img/14.d7510bb.webp"},function(e,t,o){e.exports=o.p+"img/15.3a7f48c.webp"},function(e,t,o){e.exports=o.p+"img/16.02c8972.webp"},function(e,t,o){e.exports=o.p+"img/17.c1b8ff7.webp"},function(e,t,o){e.exports=o.p+"img/18.d726af6.webp"},function(e,t,o){e.exports=o.p+"img/19.d4747f9.webp"},function(e,t,o){e.exports=o.p+"img/2.3266988.webp"},function(e,t,o){e.exports=o.p+"img/20.ac88a0d.webp"},function(e,t,o){e.exports=o.p+"img/21.c7b9ea7.webp"},function(e,t,o){e.exports=o.p+"img/22.44046d1.webp"},function(e,t,o){e.exports=o.p+"img/23.d8f6db0.webp"},function(e,t,o){e.exports=o.p+"img/24.a2365b0.webp"},function(e,t,o){e.exports=o.p+"img/25.1fb1079.webp"},function(e,t,o){e.exports=o.p+"img/26.7602d10.webp"},function(e,t,o){e.exports=o.p+"img/27.a452d38.webp"},function(e,t,o){e.exports=o.p+"img/28.70e17a5.webp"},function(e,t,o){e.exports=o.p+"img/29.0b2ca00.webp"},function(e,t,o){e.exports=o.p+"img/3.c79ab46.webp"},function(e,t,o){e.exports=o.p+"img/30.4ac58f7.webp"},function(e,t,o){e.exports=o.p+"img/31.a60af2f.webp"},function(e,t,o){e.exports=o.p+"img/32.1dd80a0.webp"},function(e,t,o){e.exports=o.p+"img/4.42dbc25.webp"},function(e,t,o){e.exports=o.p+"img/5.ad53200.webp"},function(e,t,o){e.exports=o.p+"img/6.9e0478f.webp"},function(e,t,o){e.exports=o.p+"img/7.9dae03e.webp"},function(e,t,o){e.exports=o.p+"img/8.35c38d5.webp"},function(e,t,o){e.exports=o.p+"img/9.b163c95.webp"},function(e,t,o){e.exports=o.p+"img/1.e958d65.webp"},function(e,t,o){e.exports=o.p+"img/10.ad00d0e.webp"},function(e,t,o){e.exports=o.p+"img/11.a9a82ce.webp"},function(e,t,o){e.exports=o.p+"img/12.c3f3970.webp"},function(e,t,o){e.exports=o.p+"img/13.909f2e5.webp"},function(e,t,o){e.exports=o.p+"img/14.14e0fe5.webp"},function(e,t,o){e.exports=o.p+"img/15.085800a.webp"},function(e,t,o){e.exports=o.p+"img/16.464ba93.webp"},function(e,t,o){e.exports=o.p+"img/17.e6272ff.webp"},function(e,t,o){e.exports=o.p+"img/18.24ed532.webp"},function(e,t,o){e.exports=o.p+"img/19.2537964.webp"},function(e,t,o){e.exports=o.p+"img/2.43e14f7.webp"},function(e,t,o){e.exports=o.p+"img/20.9b0b2fb.webp"},function(e,t,o){e.exports=o.p+"img/21.df00f12.webp"},function(e,t,o){e.exports=o.p+"img/22.4f81d19.webp"},function(e,t,o){e.exports=o.p+"img/23.9eafeca.webp"},function(e,t,o){e.exports=o.p+"img/3.bca5a8d.webp"},function(e,t,o){e.exports=o.p+"img/4.78cf2b7.webp"},function(e,t,o){e.exports=o.p+"img/5.9cf4fcb.webp"},function(e,t,o){e.exports=o.p+"img/6.7621cbb.webp"},function(e,t,o){e.exports=o.p+"img/7.d84f60f.webp"},function(e,t,o){e.exports=o.p+"img/8.283f718.webp"},function(e,t,o){e.exports=o.p+"img/9.4e9a4c4.webp"},function(e,t,o){e.exports=o.p+"img/1.46a25e3.webp"},function(e,t,o){e.exports=o.p+"img/10.9cac814.webp"},function(e,t,o){e.exports=o.p+"img/11.2333993.webp"},function(e,t,o){e.exports=o.p+"img/12.9d6f801.webp"},function(e,t,o){e.exports=o.p+"img/13.534c864.webp"},function(e,t,o){e.exports=o.p+"img/14.d8ecbda.webp"},function(e,t,o){e.exports=o.p+"img/15.c0d6420.webp"},function(e,t,o){e.exports=o.p+"img/16.3c1a10c.webp"},function(e,t,o){e.exports=o.p+"img/17.ec49de1.webp"},function(e,t,o){e.exports=o.p+"img/18.fcc2f95.webp"},function(e,t,o){e.exports=o.p+"img/19.3abe1c1.webp"},function(e,t,o){e.exports=o.p+"img/2.ae512cf.webp"},function(e,t,o){e.exports=o.p+"img/20.35b4d5a.webp"},function(e,t,o){e.exports=o.p+"img/21.8942d2b.webp"},function(e,t,o){e.exports=o.p+"img/3.2fcaab3.webp"},function(e,t,o){e.exports=o.p+"img/4.7d15220.webp"},function(e,t,o){e.exports=o.p+"img/5.f156583.webp"},function(e,t,o){e.exports=o.p+"img/6.fc3b3db.webp"},function(e,t,o){e.exports=o.p+"img/7.4341959.webp"},function(e,t,o){e.exports=o.p+"img/8.2d9c722.webp"},function(e,t,o){e.exports=o.p+"img/9.b2006a9.webp"},function(e,t){function o(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}o.keys=function(){return[]},o.resolve=o,e.exports=o,o.id=368},function(e,t,o){"use strict";o(238)},function(e,t,o){var n=o(25)(!1);n.push([e.i,".card[data-v-0dc1745a]{display:block;position:relative;width:100%;height:100%;overflow:hidden}.card:hover .card-img[data-v-0dc1745a]{background-size:120%}.card:hover .card-title[data-v-0dc1745a]{color:var(--bs-secondary)}.card-title[data-v-0dc1745a]{transition:color .5s linear}.card-img[data-v-0dc1745a]{height:auto;overflow:hidden;background-repeat:no-repeat;background-position:50%;transition:background-size .3s cubic-bezier(.2,0,.1,1) .15s;background-size:115%}",""]),e.exports=n},,,,,,,,function(e,t,o){var content=o(382);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(26).default)("32aa3991",content,!0,{sourceMap:!1})},,function(e,t,o){"use strict";o.r(t);var n={props:{title:{type:String,default:"",required:!0}},computed:{domain:()=>"https://nearpress.codesparks.nl"}},c=o(11),component=Object(c.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"my-3 my-xl-4 fade-in",attrs:{"data-aos":"68"}},[t("div",{staticClass:"hstack gap-3"},[t("span",{staticClass:"align-middle me-1"},[e._v("Share:")]),e._v(" "),t("a",{staticClass:"align-middle",attrs:{href:"https://www.linkedin.com/sharing/share-offsite/?url=".concat(e.domain).concat(e.$route.path),target:"_blank"}},[t("i",{staticClass:"bi bi-linkedin fs-5 color-secondary"})]),e._v(" "),t("a",{attrs:{href:"https://twitter.com/intent/tweet?url=".concat(e.domain).concat(e.$route.path,"&text=").concat(e.title),target:"_blank"}},[t("i",{staticClass:"bi bi-twitter fs-5 color-secondary"})]),e._v(" "),t("a",{attrs:{href:"https://www.facebook.com/sharer/sharer.php?u=".concat(e.domain).concat(e.$route.path,"&quote=").concat(e.title),target:"_blank"}},[t("i",{staticClass:"bi bi-facebook fs-5 color-secondary"})])])])}),[],!1,null,"f4693f2a",null);t.default=component.exports},function(e,t,o){"use strict";o(378)},function(e,t,o){var n=o(25)(!1);n.push([e.i,".article-img[data-v-1172aac2]{width:100%;height:auto;overflow:hidden;background-repeat:no-repeat;background-position:50%;transition:background-size .3s cubic-bezier(.2,0,.1,1) .15s;background-size:115%}.progress[data-v-1172aac2]{position:fixed;bottom:0;left:0;right:0;height:1.4vh;background-color:var(--bs-gray-400)}.progress .bar[data-v-1172aac2]{position:absolute;left:0;top:0;bottom:0;width:0;transition:width .3s ease-out}.progress .progress-label[data-v-1172aac2]{position:absolute;top:calc(50% - 4px);padding-left:3px;font-size:8px;line-height:1;font-weight:700;z-index:3;transition:left .3s ease-out}",""]),e.exports=n},,,,,function(e,t,o){"use strict";o.r(t);var n=o(10),c=(o(151),o(237)),r={transition:"page",data:()=>({scrollHeight:0,scrollY:0,prevPosY:0,charactersVisible:0,progress:0,articles:()=>{},article:()=>{}}),created(){this.articles=this.$store.state.articles,this.article=this.articles.find((a=>a.slug===this.$route.params.slug))},mounted(){var e=this;return Object(n.a)((function*(){yield e.validatePage(),e.scrollHeight=document.body.scrollHeight,window.addEventListener("scroll",e.aos),e.article.progress||(e.article.progress=0);var t=e.$refs.bar,label=e.$refs.label,p=100*e.article.progress/e.article.count;t&&label&&(t.style.width=p+"%",label.style.left=p+"%")}))()},beforeDestroy(){this.article&&this.$store.commit("setProgress",{id:this.article.id,progress:this.charactersVisible}),window.removeEventListener("scroll",this.aos)},computed:{visual(){return Object(c.a)(this.article.channel,this.article.visual)}},methods:{validatePage(){this.article||this.$nuxt.error({statusCode:404,message:"Article not found"})},formatDate:e=>e.toLocaleDateString("us-EN",{day:"numeric",month:"long",year:"numeric"}),aos(){var e=document.querySelectorAll("[data-aos]");[].forEach.call(e,(e=>{var t=parseInt(e.dataset.aos),o=e.getBoundingClientRect().top;if(e.style.opacity="0",o<window.innerHeight*(t/100)&&o>0&&!e.classList.contains("start-animation")&&(e.classList.add("start-animation"),e.dataset.chars)){this.charactersVisible+=parseInt(e.dataset.chars);var p=100*this.charactersVisible/this.article.count,n=this.$refs.bar,label=this.$refs.label;n&&label&&(n.style.width=p+"%",label.style.left=p+"%"),this.charactersVisible>this.article.progress&&console.log("PAY!")}}))}}},d=(o(381),o(11)),component=Object(d.a)(r,(function(){var e=this,t=e._self._c;return t("main",[t("div",{staticClass:"container-lg"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2"},[t("nav",{attrs:{"aria-label":"breadcrumb"}},[t("ol",{staticClass:"breadcrumb"},[t("li",{staticClass:"breadcrumb-item"},[t("nuxt-link",{attrs:{to:"/"}},[e._v("Home")])],1),e._v(" "),t("li",{staticClass:"breadcrumb-item"},[t("nuxt-link",{attrs:{to:"/c/"+e.article.channel}},[e._v(e._s(e.article.channel))])],1),e._v(" "),t("li",{staticClass:"breadcrumb-item active",attrs:{"aria-current":"page"}},[e._v("\n              "+e._s(e.article.title)+"\n            ")])])])]),e._v(" "),t("div",{staticClass:"col-12 col-md-10 offset-md-1"},[t("div",{staticClass:"article-img ratio ratio-16x9 rounded mb-2 bg-light",style:{backgroundImage:e.visual}},[e._v("\n          "+e._s("none"===e.visual?e.article.visual:"")+"\n        ")])]),e._v(" "),t("div",{staticClass:"col-12 col-sm-10 col-lg-8 offset-sm-1 offset-lg-2"},[t("ul",{staticClass:"list-inline"},[t("li",[e._v(e._s(e.article.author))]),e._v(" "),t("li",[e._v("\n            "+e._s(e.formatDate(e.article.date))+"\n          ")]),e._v(" "),t("li",[e._v(e._s(e.article.count)+" t"),t("del",[e._v("n")])])]),e._v(" "),t("h1",[e._v(e._s(e.article.title))]),e._v(" "),e._l(e.article.content,(function(p,i){return[p.title?t("h2",{key:"title"+i,staticClass:"fs-2 fade-in-up",attrs:{"data-aos":"70","data-chars":p.title.length}},[e._v("\n            "+e._s(p.title)+"\n          ")]):e._e(),e._v(" "),t("p",{key:i,staticClass:"fade-in-up",attrs:{"data-aos":"70","data-chars":p.count}},[e._v("\n            "+e._s(p.content)+"\n          ")])]})),e._v(" "),t("p",{staticClass:"text-secondary fade-in",attrs:{"data-aos":"68"}},[e._v("\n          Thank you for reading this article and supporting\n          "),t("b",[e._v(e._s(e.article.author))]),e._v("!\n        ")]),e._v(" "),t("social-share",{attrs:{title:e.article.title}})],2)]),e._v(" "),t("h2",{staticClass:"fs-5"},[e._v("Related")]),e._v(" "),t("div",{staticClass:"row g-3 pt-1"},e._l(e.articles.filter((a=>a.channel===e.article.channel&&a.id!==e.article.id)).slice(0,5),(function(a,i){return t("div",{key:i,staticClass:"col-12 col-md"},[t("card",{attrs:{data:a,showIntro:!1}})],1)})),0),e._v(" "),t("div",{staticClass:"progress"},[t("div",{ref:"bar",staticClass:"bar bg-secondary"}),e._v(" "),t("div",{ref:"label",staticClass:"progress-label"},[e._v(e._s(e.article.progress))])])])])}),[],!1,null,"1172aac2",null);t.default=component.exports;installComponents(component,{SocialShare:o(380).default,Card:o(239).default})}])]);