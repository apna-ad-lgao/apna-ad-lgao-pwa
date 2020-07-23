(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff32afe0"],{"1bf3":function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"fetchCompany"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"fetchCompany"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"verticalId"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isHidden"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:139}};n.loc.source={body:"query fetchCompany($id: Int!){\n    fetchCompany (id: $id){\n        id\n        name\n        type\n        verticalId\n        isHidden\n    }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};function r(e,t){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==t)return a}}function s(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=i[t]||new Set,s=new Set,o=new Set;a.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!s.has(e)){s.add(e);var t=i[e]||new Set;t.forEach((function(e){o.add(e)}))}}))}return s.forEach((function(t){var a=r(e,t);a&&n.definitions.push(a)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n,e.exports["fetchCompany"]=s(n,"fetchCompany")},"21ac":function(e,t){var n=function(e,t){e.dispatch("addToastNotifications",{text:t,timer:4e3,type:"error"})},a=function(e,t){e.dispatch("addToastNotifications",{text:t,timer:4e3,type:"success"})};e.exports={showErrorMessage:n,showSuccessMessage:a}},"2acd":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"dashboard-user-edit-page h-min-screen bg-white p-5 mt-12"},[n("h1",{staticClass:"text-xl font-bold text-gray-700 mb-4"},[e._v(" Edit Company ")]),n("form",[n("div",{staticClass:"relative"},[n("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase"},[e._v("Company Name")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.companyName,expression:"companyName"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400\n      hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none",attrs:{id:"company",type:"text",disabled:e.isEditMode},domProps:{value:e.companyName},on:{input:function(t){t.target.composing||(e.companyName=t.target.value)}}}),n("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase"},[e._v(" Type ")]),n("div",{staticClass:"relative"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400\n                  hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none",attrs:{disabled:e.isEditMode},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.type=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:""}},[e._v(" --- ")]),n("option",{attrs:{value:"Champion"}},[e._v(" Champion ")]),n("option",{attrs:{value:"Accelerator"}},[e._v(" Accelerator ")]),n("option",{attrs:{value:"Trailblazer"}},[e._v(" Trailblazer ")])]),n("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])]),n("div",{staticClass:"relative"},[n("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs\n        uppercase",attrs:{for:"user-role-select"}},[e._v(" Company Vertical ")]),n("div",{staticClass:"relative"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.vertical,expression:"vertical"}],ref:"user-role-select",staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400\n                  hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none",attrs:{id:"user-role-select",disabled:e.isEditMode},on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.vertical=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:""}},[e._v(" --- ")]),e._l(e.verticalData,(function(t){return n("option",{key:t.id,domProps:{value:t.id}},[e._v(" "+e._s(t.name)+" ")])}))],2),n("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])])]),e.enableActivateButton?n("div",{staticClass:"cta-cont text-right mt-8"},[n("button",{staticClass:"bg-green-500 border-2 border-green-500 mx-1 px-4 py-1 rounded text-white w-24 w-50",on:{click:function(t){e.modalActivateCompany=!0}}},[n("span",[e._v("Activate")])])]):e._e(),e.enableActivateButton?e._e():n("div",{staticClass:"cta-cont text-right mt-8"},[n("button",{staticClass:"bg-red-500 border-2 border-red-500 mx-1 px-4 py-1 rounded text-white w-24 w-50",on:{click:function(t){e.modalDisableCompany=!0}}},[n("span",[e._v("Delete")])]),e.enableSaveButton?n("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:e.saveButtonDisable?"border-gray-400 text-gray-500":"border-green-400 text-green-500 w-24",attrs:{disabled:e.saveButtonDisable},on:{click:e.updateCompany}},[n("span",[e._v("Save")])]):e._e(),n("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:e.enableSaveButton?"border-gray-400 text-gray-500":"border-red-400 text-red-500 w-24",attrs:{disabled:e.enableSaveButton},on:{click:e.updateEditMode}},[n("span",[e._v("Edit")])])])]),n("p",{staticClass:"bg-gray-200 flex items-center justify-center my-3 px-5 py-3 text-gray-700 text-sm"},[e._v(" Showing accounts: "),n("span",{staticClass:"font-bold"},[e._v(e._s(e.allUsers?e.allUsers.length:0))])]),n("div",[[n("transition",{attrs:{name:"bounce"}},[e.modalIf?n("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[n("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),n("div",{staticClass:"modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[n("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-white text-center"},[n("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),n("h3",{staticClass:"font-bold text-black px-2 py-6 text-center"},[e._v(' Are you sure that you want to "DISABLE" this User. ')]),n("div",{staticClass:"flex justify-around py-2 rounded-lg"},[n("button",{staticClass:"border-2 border-red-500 font-bold px-3 rounded text-red-500 text-sm",on:{click:e.changeUserCompanyS}},[e._v(" Disable ")]),n("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm",on:{click:function(t){return e.leave()}}},[e._v(" Cancel ")])])])]):e._e()])],[n("transition",{attrs:{name:"bounce"}},[e.modalDisableCompany?n("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[n("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),n("div",{staticClass:"modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[n("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-white text-center"},[n("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),n("h3",{staticClass:"font-bold text-black px-2 py-6 text-center"},[e._v(' Are you sure that you want to "DELETE" this Company. ')]),n("div",{staticClass:"flex justify-around py-2 rounded-lg"},[n("button",{staticClass:"border-2 border-red-500 font-bold px-3 rounded text-red-500 text-sm",on:{click:e.DeleteCompany}},[e._v(" Delete ")]),n("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm",on:{click:e.leaveConfirmBox}},[e._v(" Cancel ")])])])]):e._e()])],[n("transition",{attrs:{name:"bounce"}},[e.modalActivateCompany?n("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[n("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),n("div",{staticClass:"modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[n("div",{staticClass:"bg-green-500 font-bold px-5 py-1 rounded text-white text-center"},[n("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),n("h3",{staticClass:"font-bold text-black px-2 py-6 text-center"},[e._v(' Are you sure that you want to "ACTIVATE" this Company. ')]),n("div",{staticClass:"flex justify-around py-2 rounded-lg"},[n("button",{staticClass:"border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm",on:{click:e.ActivateCompany}},[e._v(" Enable ")]),n("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm",on:{click:e.leaveConfirmBox}},[e._v(" Cancel ")])])])]):e._e()])],[n("transition",{attrs:{name:"bounce"}},[e.modalIfUserDisable?n("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[n("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),n("div",{staticClass:"modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[n("div",{staticClass:"bg-green-500 font-bold px-5 py-1 rounded text-white text-center"},[n("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),n("h3",{staticClass:"font-bold text-black px-2 py-6 text-center"},[e._v(' Are you sure that you want to "ENABLE" this User. ')]),n("div",{staticClass:"flex justify-around py-2 rounded-lg"},[n("button",{staticClass:"border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm",on:{click:e.changeUserCompanyS}},[e._v(" Enable ")]),n("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-sm",on:{click:function(t){return e.leave()}}},[e._v(" Cancel ")])])])]):e._e()])],n("PopupElse",{model:{value:e.modalElse,callback:function(t){e.modalElse=t},expression:"modalElse"}})],2),n("section",{staticClass:"bg-white"},[e._m(0),e._l(e.allUsers,(function(t){return n("div",{key:t.id,staticClass:"\n        border-b\n        border-gray-200\n        py-3\n        w-full\n\n        block\n        flex\n        text-left\n        justify-between\n        pointer\n      "},[n("div",{staticClass:"flex-2 leading-snug"},[n("p",[e._v(e._s(t.firstName)+" "+e._s(t.lastName))]),t.userHidden?n("p",{staticClass:"text-red-700 text-xs"},[e._v(" User Disabled ")]):e._e()]),n("div",{staticClass:"no-text-wrap flex items-center justify-center flex-1"},[t.isVOC?n("i",{staticClass:"far fa-check-circle text-green-500 text-lg"}):n("i",{staticClass:"far fa-times-circle text-red-500 text-lg"})]),n("div",{staticClass:"no-text-wrap flex items-center justify-center flex-1"},[t.isVOD?n("i",{staticClass:"far fa-check-circle text-green-500 text-lg"}):n("i",{staticClass:"far fa-times-circle text-red-500 text-lg"})]),n("div",{staticClass:"no-text-wrap flex items-center justify-center flex-1"},[t.isAdmin?n("i",{staticClass:"far fa-check-circle text-green-500 text-lg"}):n("i",{staticClass:"far fa-times-circle text-red-500 text-lg"})]),n("div",{staticClass:"no-text-wrap flex items-center justify-end flex-1"},[t.userHidden||e.enableActivateButton?e._e():n("label",{staticClass:"switch"},[n("input",{attrs:{id:"checkbox",type:"checkbox"},domProps:{value:t.isHidden,checked:!t.isHidden},on:{change:function(n){return e.changeUsercompanyStatusN(t,n)}}}),n("span",{staticClass:"slider round"})])])])}))],2)])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"\n      border-b\n      border-t\n      border-gray-200\n      py-2\n      block\n      flex\n      leading-normal\n      text-gray-600\n      text-sm\n      font-black\n      uppercase\n      justify-between"},[n("p",{staticClass:"flex-2"},[e._v(" User ")]),n("p",{staticClass:"flex-1 text-center"},[e._v(" VOS ")]),n("p",{staticClass:"flex-1 text-center"},[e._v(" VOD ")]),n("p",{staticClass:"flex-1 text-center"},[e._v(" Admin ")]),n("p",{staticClass:"flex-1 text-right"},[e._v(" Status ")])])}],r=(n("4de4"),n("c740"),n("b0c0"),n("96cf"),n("1da1")),s=n("1bf3"),o=n.n(s),l=(n("b3ed"),n("e57c")),d=n.n(l),c=n("a721"),u=n.n(c),m=n("a6d6"),v=n.n(m),f=n("c883"),p=n.n(f),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"bounce"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[n("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),n("div",{staticClass:"modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[n("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-white text-center"},[n("p",{staticClass:"title"},[e._v(" Attention! ")])]),n("h2",{staticClass:"font-bold text-black px-2 pt-6 pb-0 text-center text-lg"}),n("h3",{staticClass:"font-bold text-black px-2 pb-6 pt-0 text-center text-sm"},[e._v(" Company should have atleast One VOC/VOD active User. ")]),n("div",{staticClass:"flex justify-around py-2 rounded-lg"},[n("button",{staticClass:"border-2 border-green-500 font-bold px-3 rounded text-green-500 text-sm",on:{click:function(t){return t.preventDefault(),e.goToAddUser(t)}}},[n("router-link",{attrs:{to:"/dashboard/admin/user/addNewUser"}},[e._v(" Add User ")])],1),n("button",{staticClass:"border-2 border-gray-600 font-bold px-3 rounded text-gray-600 text-sm",on:{click:function(t){return t.preventDefault(),e.leave(t)}}},[e._v(" Leave ")])])])])])},b=[],k={name:"PopupElse",props:{value:{required:!0}},methods:{leave:function(){this.$emit("input",!this.value)},goToAddUser:function(){this.$emit("input",!this.value)}}},h=k,g=n("2877"),x=Object(g["a"])(h,y,b,!1,null,null,null),C=x.exports,w=n("21ac"),N={allUsers:[],name:"CompanyEdit",components:{PopupElse:C},data:function(){return{query:"",typeFilter:"",type:"",verticalFilter:"",isFilled:!1,checkUser:[],check:"",companyVerticalId:0,enableSaveButton:!1,enableActivateButton:!1,companyName:"",companyType:"",companyId:0,allUsers:[],isEditMode:!0,validationErrors:[],verticalData:[],vertical:"",modalIf:!1,modalElse:!1,modalIfUserDisable:!1,activateMode:!1,modalDisableCompany:!1,modalActivateCompany:!1,compUserCheck:[]}},computed:{saveButtonDisable:function(){return""===this.companyName||(""===this.type||""===this.vertical)}},watch:{$route:function(e,t){"Dashboard.Companies"===t.name&&"Dashboard.Company.Edit"===e.name&&(this.renderReady=!1,this.getCompanyDetails(),this.enableSaveButton=!1,this.isEditMode=!0)}},mounted:function(){this.onAccountSelect(),this.getCompanyDetails()},methods:{leave:function(){this.modalIf=!1,this.modalIfUserDisable=!1,this.check.checked=!this.check.checked},leaveConfirmBox:function(){this.modalDisableCompany=!1,this.modalActivateCompany=!1},searchQueryUpdated:function(e){this.query=e},updateEditMode:function(){this.enableSaveButton=!0,this.isEditMode=!1},DeleteCompany:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n={id:0,isHidden:1},n.id=parseInt(e.companyId,10),t.next=5,e.$apollo.mutate({mutation:p.a,variables:n});case 5:a=t.sent,i=a.data,console.log("updateUser",i),e.$store.dispatch("addToastNotifications",{text:"Company Updated Successfully !",timer:4e3,type:"success"}),e.enableActivateButton=!0,t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 15:e.modalDisableCompany=!1;case 16:case"end":return t.stop()}}),t,null,[[0,12]])})))()},ActivateCompany:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n={id:0,isHidden:0},n.id=parseInt(e.companyId,10),t.next=5,e.$apollo.mutate({mutation:p.a,variables:n});case 5:e.$store.dispatch("addToastNotifications",{text:"Company Activated Successfully !",timer:4e3,type:"success"}),e.enableActivateButton=!1,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 12:e.modalActivateCompany=!1;case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},changeUsercompanyStatusN:function(e,t){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:n.check=t.target,!1===t.target.checked?(i=e.isVOC?"isVOC":"isVOD",n.checkUser="isVOC"===i?n.allUsers.filter((function(e){return 0===e.isHidden&&1===e.isVOC})):n.allUsers.filter((function(e){return 0===e.isHidden&&1===e.isVOD})),console.log(n.checkUser),console.log(n.checkUser.length),n.checkUser.length>1?(n.compUserCheck=e,n.check=t.target,n.modalIf=!0):(console.log("else"),n.modalElse=!0,n.check=t.target,t.target.checked=!t.target.checked)):(console.log("else"),n.compUserCheck=e,n.modalIfUserDisable=!0);case 2:case"end":return a.stop()}}),a)})))()},changeUserCompanyS:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={id:0,userId:0,isHidden:0},t.prev=1,n.id=parseInt(e.companyVerticalId,10),n.userId=parseInt(e.compUserCheck.id,10),n.isHidden=parseInt(e.compUserCheck.isHidden?0:1,10),t.next=7,e.$apollo.mutate({mutation:v.a,variables:n});case 7:a=e.allUsers.findIndex((function(t){return t.id===e.compUserCheck.id})),e.allUsers[a].isHidden=n.isHidden,Object(w["showSuccessMessage"])(e.$store,"User Status change Successfully !"),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](1),Object(w["showErrorMessage"])(e.$store,t.t0.message);case 15:e.modalIf=!1,e.modalIfUserDisable=!1;case 17:case"end":return t.stop()}}),t,null,[[1,12]])})))()},updateCompany:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.enableSaveButton=!1,e.isReadOnlyFeild=!0,n={id:0,name:"",type:"",verticalId:0},e.companyName&&(n.name=e.companyName),e.type&&(n.type=e.type),e.vertical&&(n.verticalId=e.vertical),n.id=parseInt(e.companyId,10),t.next=10,e.$apollo.mutate({mutation:u.a,variables:n});case 10:e.$store.dispatch("addToastNotifications",{text:"Company Updated Successfully !",timer:4e3,type:"success"}),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},onAccountSelect:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$apollo.query({query:d.a,variables:{}});case 3:n=t.sent,a=n.data,e.verticalData=a.fetchAllVerticals,console.log("TCL: onAccountSelect -> this.verticalData",e.verticalData),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log("vertical error -> ",t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},getCompanyDetails:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n,a,i,r,s,l,d,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.$route.params.companyId,e.companyId=e.$route.params.companyId,t.next=4,e.$apollo.query({fetchPolicy:"network-only",query:o.a,variables:{id:parseInt(n,10)}});case 4:a=t.sent,i=a.data,r=i.fetchCompany[0],s=r.name,l=r.type,d=r.verticalId,c=r.isHidden,s&&(e.companyName=s),l&&(e.type=l),d&&(e.vertical=d),e.enableActivateButton=!!c;case 11:case"end":return t.stop()}}),t)})))()}}},S=N,D=(n("a7bb"),Object(g["a"])(S,a,i,!1,null,"10d71420",null));t["default"]=D.exports},a6d6:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"updateUserCompanyByVerticalFlag"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"isHidden"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updateUserCompanyByVerticalFlag"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"userId"},value:{kind:"Variable",name:{kind:"Name",value:"userId"}}},{kind:"Argument",name:{kind:"Name",value:"isHidden"},value:{kind:"Variable",name:{kind:"Name",value:"isHidden"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:179}};n.loc.source={body:"mutation updateUserCompanyByVerticalFlag($id: Int!,$userId: Int! ,$isHidden: Int!) {\n  updateUserCompanyByVerticalFlag( id: $id,userId:$userId,isHidden: $isHidden ) {\n    id\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};function r(e,t){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==t)return a}}function s(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=i[t]||new Set,s=new Set,o=new Set;a.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!s.has(e)){s.add(e);var t=i[e]||new Set;t.forEach((function(e){o.add(e)}))}}))}return s.forEach((function(t){var a=r(e,t);a&&n.definitions.push(a)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n,e.exports["updateUserCompanyByVerticalFlag"]=s(n,"updateUserCompanyByVerticalFlag")},a721:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"updateCompanyDetails"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"verticalId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updateCompanyDetails"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}},{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}},{kind:"Argument",name:{kind:"Name",value:"verticalId"},value:{kind:"Variable",name:{kind:"Name",value:"verticalId"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:190}};n.loc.source={body:"mutation updateCompanyDetails($id: Int!, $name: String!, $type: String!,$verticalId: Int!) {\n  updateCompanyDetails(id: $id, name: $name, type: $type, verticalId: $verticalId) {\n    id\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};function r(e,t){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==t)return a}}function s(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=i[t]||new Set,s=new Set,o=new Set;a.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!s.has(e)){s.add(e);var t=i[e]||new Set;t.forEach((function(e){o.add(e)}))}}))}return s.forEach((function(t){var a=r(e,t);a&&n.definitions.push(a)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n,e.exports["updateCompanyDetails"]=s(n,"updateCompanyDetails")},a7bb:function(e,t,n){"use strict";var a=n("ee4b"),i=n.n(a);i.a},b3ed:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getAllUsersByCompanyVertical"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"getAllUsersByCompanyVertical"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"firstName"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lastName"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isVOC"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isVOD"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isAdmin"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isReviewer"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"verticalId"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"isHidden"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"userHidden"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:262}};n.loc.source={body:"query getAllUsersByCompanyVertical($id: Int!){\n    getAllUsersByCompanyVertical (id: $id){\n        id\n        firstName\n        lastName\n        isVOC\n        isVOD\n        isAdmin\n        isReviewer\n        verticalId\n        isHidden\n        userHidden\n    }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};function r(e,t){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==t)return a}}function s(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=i[t]||new Set,s=new Set,o=new Set;a.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!s.has(e)){s.add(e);var t=i[e]||new Set;t.forEach((function(e){o.add(e)}))}}))}return s.forEach((function(t){var a=r(e,t);a&&n.definitions.push(a)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n,e.exports["getAllUsersByCompanyVertical"]=s(n,"getAllUsersByCompanyVertical")},c740:function(e,t,n){"use strict";var a=n("23e7"),i=n("b727").findIndex,r=n("44d2"),s=n("ae40"),o="findIndex",l=!0,d=s(o);o in[]&&Array(1)[o]((function(){l=!1})),a({target:"Array",proto:!0,forced:l||!d},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r(o)},c883:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"updateCompanyFlag"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"isHidden"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updateCompanyFlag"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"isHidden"},value:{kind:"Variable",name:{kind:"Name",value:"isHidden"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:121}};n.loc.source={body:"mutation updateCompanyFlag($id: Int!, $isHidden: Int!) {\n  updateCompanyFlag(id: $id, isHidden: $isHidden) {\n    id\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};function r(e,t){for(var n=0;n<e.definitions.length;n++){var a=e.definitions[n];if(a.name&&a.name.value==t)return a}}function s(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var a=i[t]||new Set,s=new Set,o=new Set;a.forEach((function(e){o.add(e)}));while(o.size>0){var l=o;o=new Set,l.forEach((function(e){if(!s.has(e)){s.add(e);var t=i[e]||new Set;t.forEach((function(e){o.add(e)}))}}))}return s.forEach((function(t){var a=r(e,t);a&&n.definitions.push(a)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n,e.exports["updateCompanyFlag"]=s(n,"updateCompanyFlag")},e57c:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"fetchAllVerticals"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:51}};n.loc.source={body:"query {\n  fetchAllVerticals {\n    id\n    name\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&t.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,t)})),e.definitions&&e.definitions.forEach((function(e){a(e,t)}))}var i={};(function(){n.definitions.forEach((function(e){if(e.name){var t=new Set;a(e,t),i[e.name.value]=t}}))})(),e.exports=n},ee4b:function(e,t,n){}}]);
//# sourceMappingURL=chunk-ff32afe0.e0254635.js.map