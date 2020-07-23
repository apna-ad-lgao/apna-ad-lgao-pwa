(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e492902c"],{"3d44":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"auth-page bg-white h-screen"},[n("div",{staticClass:"flex flex-wrap h-screen items-center"},[n("form",{staticClass:"max-w-xs mt-auto mx-auto p-6 w-full",attrs:{method:"post",name:"validation",role:"form"},on:{submit:function(t){t.preventDefault(),e.partnerCompanyEditable?e.updateCompany(Object.assign({},e.partnerCompanyDetail,{addressId:e.partnerAddress.id,industryId:e.partnerCompanyDetail.industryId})):e.addCompany(Object.assign({},e.partnerCompanyDetail,{addressId:e.partnerAddress.id,industryId:e.partnerCompanyDetail.industryId}))}}},[n("div",{staticClass:"mt-12 my-5 relative"},[n("label",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase",attrs:{for:"name"}},[e._v(" Name ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.partnerCompanyDetail.name,expression:"partnerCompanyDetail.name"}],staticClass:"\n            appearance-none\n            bg-gray-100\n            block\n            border\n            focus:bg-white\n            focus:border-gray-400\n            focus:outline-none\n            leading-tight\n            px-4\n            py-2\n            rounded\n            text-gray-600\n            w-full\n          ",attrs:{id:"name",disabled:e.partnerCompanyEditable,type:"name",placeholder:"Company Name"},domProps:{value:e.partnerCompanyDetail.name},on:{input:function(t){t.target.composing||e.$set(e.partnerCompanyDetail,"name",t.target.value)}}})]),n("div",{staticClass:"my-5"},[n("label",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase",attrs:{for:"description"}},[e._v(" Description ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.partnerCompanyDetail.description,expression:"partnerCompanyDetail.description"}],staticClass:"\n            appearance-none\n            bg-gray-100\n            block\n            border\n            focus:bg-white\n            focus:border-gray-400\n            focus:outline-none\n            leading-tight\n            px-4\n            py-2\n            rounded\n            text-gray-600\n            w-full\n          ",attrs:{id:"description",disabled:e.partnerCompanyEditable,type:"text",placeholder:"About Company"},domProps:{value:e.partnerCompanyDetail.description},on:{input:function(t){t.target.composing||e.$set(e.partnerCompanyDetail,"description",t.target.value)}}})]),n("div",{staticClass:"my-5 relative"},[n("label",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase",attrs:{for:"user-role-select"}},[e._v(" Address ")]),e.partnerAddress?n("div",{staticClass:"relative"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.partnerAddress.name,expression:"partnerAddress.name"}],staticClass:"\n            appearance-none\n            bg-gray-100\n            block\n            border\n            focus:bg-white\n            focus:border-gray-400\n            focus:outline-none\n            leading-tight\n            px-4\n            py-2\n            rounded\n            text-gray-600\n            w-full\n          ",attrs:{id:"address",disabled:!0,type:"text",placeholder:"Address"},domProps:{value:e.partnerAddress.name},on:{input:function(t){t.target.composing||e.$set(e.partnerAddress,"name",t.target.value)}}})]):e._e()]),e.industries?n("div",{staticClass:"my-5"},[n("label",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase",attrs:{for:"industry"}},[e._v(" Industry ")]),n("select",{directives:[{name:"model",rawName:"v-model.number",value:e.partnerCompanyDetail.industryId,expression:"partnerCompanyDetail.industryId",modifiers:{number:!0}}],ref:"industry-select",staticClass:"appearance-none\n            bg-gray-100\n            block\n            border\n            focus:bg-white\n            focus:border-gray-400\n            focus:outline-none\n            leading-tight\n            px-4\n            py-2\n            rounded\n            text-gray-600\n            w-full",attrs:{id:"industry-select",disabled:e.partnerCompanyEditable},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var n="_value"in t?t._value:t.value;return e._n(n)}));e.$set(e.partnerCompanyDetail,"industryId",t.target.multiple?n:n[0])}}},e._l(e.industries,(function(t){return n("option",{key:t.id,domProps:{value:t.id}},[e._v(" "+e._s(t.name)+" ")])})),0),n("div",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase text-gray-600"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])]):e._e(),n("div",{staticClass:"my-5"},[n("label",{staticClass:"block font-bold letter-spacing-05 mb-1 ml-1 text-gray-600 text-gray-800 text-xs uppercase",attrs:{for:"gst"}},[e._v(" GST ")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.partnerCompanyDetail.gst,expression:"partnerCompanyDetail.gst",modifiers:{number:!0}}],staticClass:"\n            appearance-none\n            bg-gray-100\n            block\n            border\n            focus:bg-white\n            focus:border-gray-400\n            focus:outline-none\n            leading-tight\n            px-4\n            py-2\n            rounded\n            text-gray-600\n            w-full\n          ",attrs:{id:"gst",disabled:e.partnerCompanyEditable,type:"text",placeholder:"GST"},domProps:{value:e.partnerCompanyDetail.gst},on:{input:function(t){t.target.composing||e.$set(e.partnerCompanyDetail,"gst",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),n("button",{directives:[{name:"show",rawName:"v-show",value:!e.partnerCompanyEditable,expression:"!partnerCompanyEditable"}],staticClass:"bg-green-800 button font-bold hover:bg-green-600 leading-normal letter-spacing-1 mb-12 mt-2 py-3 rounded text-white uppercase w-full",class:{loading:"login"===e.request.key&&e.request.inProgress},attrs:{disabled:"login"===e.request.key&&e.request.inProgress}},[e._v(" Save Company "),n("ring-loader")],1),n("button",{directives:[{name:"show",rawName:"v-show",value:e.partnerCompanyEditable,expression:"partnerCompanyEditable"}],staticClass:"bg-gray-800 button font-bold hover:bg-gray-600 leading-normal letter-spacing-1 mb-12 mt-2 py-3 rounded text-white uppercase w-full",class:{loading:"login"===e.request.key&&e.request.inProgress},attrs:{disabled:"login"===e.request.key&&e.request.inProgress}},[e._v(" Edit Company "),n("ring-loader")],1)]),n("div",{staticClass:"mb-3 mt-auto mx-auto w-full"},[n("p",{staticClass:"py-3 w-4/5 text-center rounded text-gray-500 text-sm flex justify-center align-center mx-auto"},[e.isApp?e._e():n("span",[e._v(" (C) 2020 TechNawabs")])])])])])},r=[],s=(n("b0c0"),n("5530")),i=n("2f62"),o={name:"CompanyDetail",data:function(){return{disabled:!1,isApp:!1,partnerCompanyDetail:{addressId:0,name:"",description:"",image:"",industryId:0,gst:null}}},computed:Object(s["a"])({},Object(i["c"])(["industries","partnerAddress","request","version","partnerCompany","partnerCompanyEditable"])),methods:Object(s["a"])({},Object(i["b"])(["addCompany","getIndustries","getPartnerAddress","updateCompany","getPartnerCompany"]),{enableEditMode:function(){this.disabled=!this.disabled},scrollFunction:function(){this.showBtn=window.scrollY>200},topFunction:function(){window.scrollTo({top:0,behavior:"smooth"})}}),mounted:function(){this.getIndustries(),this.getPartnerAddress(),this.getPartnerCompany(),this.partnerCompany&&this.partnerAddress.id>0&&(this.disabled=!0,this.partnerCompanyDetail=this.partnerCompany)},beforeMount:function(){window.addEventListener("scroll",this.scrollFunction)},beforeDestroy:function(){window.removeEventListener("scroll",this.scrollFunction)},watch:{$route:function(e,t){"Dashboard.CompanyDetail"===e.name&&(this.industries(),this.getPartnerAddress(),this.getPartnerCompany(),this.partnerCompany&&this.partnerAddress.id>0&&(this.disabled=!0,this.partnerCompanyDetail=this.partnerCompany))}}},l=o,d=(n("ce4d"),n("2877")),p=Object(d["a"])(l,a,r,!1,null,null,null);t["default"]=p.exports},"68ac":function(e,t,n){},ce4d:function(e,t,n){"use strict";var a=n("68ac"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-e492902c.f2e08535.js.map