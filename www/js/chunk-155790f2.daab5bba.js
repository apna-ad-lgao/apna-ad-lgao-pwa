(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-155790f2"],{8448:function(e,t,a){},a63a:function(e,t,a){"use strict";var r=a("8448"),s=a.n(r);s.a},d415:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"dashboard-user-edit-page h-min-screen bg-white p-5 mt-12"},[a("h1",{staticClass:"text-xl font-bold text-gray-700 mb-4"},[e._v(" "+e._s(e.$route.params.userId?"Edit user":"Add user")+" ")]),a("form",[a("div",{staticClass:"md:flex flex-wrap lg:justify-between  justify-around relative"},[a("div",{staticClass:"xl:w-1/6 mx-3 w-1/3 lg:w-1/4"},[a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase",attrs:{for:"ohrid"}},[e._v("OHR Id")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userOhrid,expression:"userOhrid"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400 text-lg\n          hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none",attrs:{id:"ohrid",type:"number",placeholder:"Ex: 30000000",minlength:"7",maxlength:"9",readonly:!e.isReadOnly},domProps:{value:e.userOhrid},on:{input:function(t){t.target.composing||(e.userOhrid=t.target.value)}}})]),a("div",{staticClass:"xl:w-1/6 mx-3 w-1/3 lg:w-1/4"},[a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase",attrs:{for:"ohrid"}},[e._v("First Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userFirstName,expression:"userFirstName"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500\n          px-4 py-2 rounded leading-tight focus:outline-none text-lg",attrs:{id:"ohrid",type:"text",placeholder:"Ex: Rahul",readonly:!e.isReadOnly},domProps:{value:e.userFirstName},on:{input:function(t){t.target.composing||(e.userFirstName=t.target.value)}}})]),a("div",{staticClass:"xl:w-1/6 mx-3 w-1/3 lg:w-1/4"},[a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-xs uppercase",attrs:{for:"ohrid"}},[e._v("Last Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.userLastName,expression:"userLastName"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400\n          hover:border-gray-500 px-4 py-2 rounded leading-tight focus:outline-none text-lg",attrs:{id:"ohrid",type:"text",placeholder:"Ex: Jain",readonly:!e.isReadOnly},domProps:{value:e.userLastName},on:{input:function(t){t.target.composing||(e.userLastName=t.target.value)}}})]),a("div",{staticClass:"xl:w-1/6 mx-3 w-1/3 lg:w-1/3"},[a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase",attrs:{for:"user-role-select"}},[e._v("User role")]),a("div",{staticClass:"relative"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.userRole,expression:"userRole"}],ref:"user-role-select",staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400\n          hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none text-lg",attrs:{id:"user-role-select",disabled:e.isReadOnlyFeild},on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.userRole=t.target.multiple?a:a[0]},e.checkOnchangeVocVod]}},[a("option",{attrs:{value:""}},[e._v(" --- ")]),a("option",{attrs:{value:"voc"}},[e._v(" VOS ")]),a("option",{attrs:{value:"vod"}},[e._v(" VOD ")])]),a("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"},[a("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[a("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])])]),e.enableActivateButton?a("div",{staticClass:"cta-cont text-left my-6"},[a("button",{staticClass:"bg-green-500 border-2 border-green-500 mx-1 px-4 py-1 rounded text-white w-24 w-50",on:{click:function(t){e.modalActivateUser=!0}}},[a("span",[e._v("Activate")])])]):e._e(),e.enableActivateButton?e._e():a("div",{staticClass:"cta-cont text-left my-6"},[a("button",{staticClass:"bg-red-500 border-2 border-red-500 mx-1 px-4 py-1 rounded text-white w-24 w-50",on:{click:e.modalDisableUserFunc}},[a("span",[e._v("Delete")])]),e.enableSaveButton?a("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:e.saveButtonDisable?"border-gray-400 text-gray-500":"border-green-400 text-green-500 w-24",attrs:{disabled:e.saveButtonDisable},on:{click:e.updateUser}},[a("span",[e._v("Save")])]):e._e(),a("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:e.enableSaveButton?"border-gray-400 text-gray-500":"border-red-400 text-red-500 w-24",attrs:{disabled:e.enableSaveButton},on:{click:e.updateEditMode}},[a("span",[e._v("Edit")])])]),!e.userRole||"voc"!==e.userRole&&"vod"!==e.userRole?e._e():a("h1",{staticClass:"text-xl font-bold text-gray-700 mb-4 mt-4"},[e._v(" "+e._s("Assigned Accounts")+" ")]),a("div",{staticClass:"bg-gray-200 flex items-center justify-center rounded my-3 py-2"},[a("p",{staticClass:"text-gray-700"},[e._v(" Showing accounts "),a("span",{staticClass:"font-bold"},[e._v(e._s((e.filteredResults.length,""))+": "+e._s(e.filteredResults.length))])]),e.statusFilter?a("button",{staticClass:"bg-red-500 mx-5 px-3 py-2 rounded text-bold text-white",on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.resetFilters(t)}}},[e._v(" Reset Filter ")]):e._e(),a("div",{staticClass:"mx-5 flex text-gray-600 justify-center"},[a("div",{staticClass:"w-auto relative"},[e._m(0),a("select",{directives:[{name:"model",rawName:"v-model",value:e.statusFilter,expression:"statusFilter"}],staticClass:"\n              block\n              appearance-none\n              w-full\n              bg-gray-100\n              border\n              border-gray-400\n              hover:border-gray-500\n              px-6\n              py-2\n              rounded\n              leading-tight\n              focus:outline-none\n            ",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.statusFilter=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:""}},[e._v(" Filter by Status ")]),a("option",{attrs:{value:"0"}},[e._v(" Active ")]),a("option",{attrs:{value:"1"}},[e._v(" In-Active ")])]),a("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"},[a("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[a("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])]),e.statusFilter?a("div",{staticClass:"mx-5 text-gray-600"},[a("div",{staticClass:"flex items-center"},[a("p",{staticClass:"font-bold"},[e._v(" Filtered by : ")]),e.statusFilter?a("span",{staticClass:"text-gray-600"},[a("label",{staticClass:"border border-gray-400 bg-gray-300 inline-block px-3 py-2 mx-5 pointer rounded"},[e._v(" Status: "),a("b",[e._v(e._s(1===parseInt(this.statusFilter)?"In-Active":"Active"))])])]):e._e()])]):e._e()]),e.filteredResults?a("section",{staticClass:"flex flex-wrap justify-between items-center"},[e._l(e.filteredResults,(function(t,r){return a("div",{key:r,staticClass:"userCard w-2/35 border border-gray-400 my-6 p-1 p-2 rounded-lg"},[!e.userRole||"voc"!==e.userRole&&"vod"!==e.userRole?e._e():a("div",[e.publicUserCompanyList?a("div",{staticClass:"relative"},[t.userCompanyStatus?a("div",{staticClass:"text-red-500 font-bold letter-spacing-1 underline rounded text-center text-xs"},[e._v(" NOTE : Company access revoked !! ")]):e._e(),t.isHidden?a("div",{staticClass:"text-red-500 font-bold letter-spacing-1 underline rounded text-center text-xs"},[e._v(" NOTE : company is already disabled !! ")]):e._e(),a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase",attrs:{for:"user-account-select"}},[e._v("Account to be aligned")]),a("div",{staticClass:"relative"},[e.publicUserCompanyList?a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedAccount,expression:"companyVerticalRow.selectedAccount"}],ref:"user-account-select",refInFor:!0,staticClass:"block appearance-none w-full bg-gray-100\n                border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none",attrs:{id:"user-account-select",disabled:!t.isEditingCompanyVertical},on:{change:[function(a){var r=Array.prototype.filter.call(a.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"selectedAccount",a.target.multiple?r:r[0])},function(a){return e.onAccountSelect(t,a)}]}},e._l(e.accountData,(function(t){return a("option",{key:t.id,attrs:{"data-id":t.id},domProps:{value:t.id}},[e._v(" "+e._s(t.name)+" "),a("br")])})),0):e._e(),a("div",{staticClass:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"},[a("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[a("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])]):e._e(),a("div",{staticClass:"relative"},[a("label",{staticClass:"block font-bold letter-spacing-05 mt-3 mb-1 ml-1 text-gray-600 text-grey-darkest text-xs uppercase",attrs:{for:"user-vertical-select"}},[e._v(" Vertical ")]),a("div",{staticClass:"relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedVertical,expression:"companyVerticalRow.selectedVertical"}],staticClass:"block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4\n                 py-2 rounded leading-tight focus:outline-none",attrs:{id:"",type:"text",placeholder:"Ex: Jain",readonly:!0},domProps:{value:t.selectedVertical},on:{input:function(a){a.target.composing||e.$set(t,"selectedVertical",a.target.value)}}})])]),a("div",{staticClass:"cta-cont text-right my-4"},[t.isEditingCompanyVertical&&!e.enableActivateButton?a("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:e.enableAddCompanyButton?"border-green-400 text-green-500":"border-gray-400 text-gray-500 w-24",attrs:{disabled:!e.enableAddCompanyButton},on:{click:function(a){return e.makeCompanyVerticalEditable(t)}}},[t.isEditingCompanyVertical?a("span",[e._v("Save")]):a("span",[e._v("Edit")])]):e._e(),e.enableActivateButton||t.userCompanyStatus||t.isHidden?e._e():a("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:t.isEditingCompanyVertical?"border-gray-400 text-gray-500":"border-red-400 text-red-500",on:{click:function(t){return e.softDeleteUserCompany(r)}}},[e._v(" Delete ")]),!e.enableActivateButton&&t.userCompanyStatus?a("button",{staticClass:"border-2 rounded px-4 py-1 w-24 mx-1",class:t.isEditingCompanyVertical?"border-gray-400 text-gray-500":"border-green-400 text-green-500",on:{click:function(t){return e.ActivateUserCompany(r)}}},[e._v(" Activate ")]):e._e()])])])})),!e.userRole||"voc"!==e.userRole&&"vod"!==e.userRole||e.enableActivateButton?e._e():a("div",{staticClass:"cta-cont w-full mx-auto mb-5"},[a("button",{staticClass:"border-2 border-gray-300 rounded px-4 py-1 text-gray-700 w-64 mx-auto border-green-400 text-green-500 block",on:{click:function(t){return t.preventDefault(),e.addNewRowForCompanyVertical()}}},[e._v(" Assign To Company Vertical ")])])],2):e._e()]),[a("transition",{attrs:{name:"bounce"}},[e.modalDisableUser?a("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[a("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),a("div",{staticClass:"bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto"},[a("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white"},[a("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),a("h3",{staticClass:"font-bold mx-auto my-6 px-2 py-6 text-black text-xl"},[e._v(' Are you sure that you want to "DELETE" this User. ')]),a("div",{staticClass:"flex justify-around"},[a("button",{staticClass:"border-2 border-red-500 font-bold px-3 rounded text-red-500 text-lg",on:{click:e.DeleteUser}},[e._v(" Delete ")]),a("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg",on:{click:e.leaveConfirmBox}},[e._v(" Cancel ")])])])]):e._e()])],[a("transition",{attrs:{name:"bounce"}},[e.modalActivateUser?a("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[a("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),a("div",{staticClass:"bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto"},[a("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white"},[a("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),a("h3",{staticClass:"font-bold mx-auto my-6 px-2 py-6 text-black text-xl"},[e._v(' Are you sure that you want to "ACTIVATE" this User. ')]),a("div",{staticClass:"flex justify-around"},[a("button",{staticClass:"border-2 border-green-500 font-bold px-3 rounded text-green-500 text-lg",on:{click:e.ActivateUser}},[e._v(" Enable ")]),a("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg",on:{click:e.leaveConfirmBox}},[e._v(" Cancel ")])])])]):e._e()])],[a("transition",{attrs:{name:"bounce"}},[e.popupUserActionDisable?a("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[a("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),a("div",{staticClass:"bg-white flex flex-col justify-between modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 h-64 lg:w-1/3 overflow-y-auto"},[a("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white"},[a("p",{staticClass:"title"},[e._v(" Attention! ")])]),a("h2",{staticClass:"font-bold mx-auto px-2 text-black text-xl"},[e._v(" "+e._s(e.popupRole)+", ")]),a("h3",{staticClass:"font-bold text-black px-2 text-center text-lg"},[e._v(" "+e._s(e.popupText)+" ")]),a("div",{staticClass:"flex justify-center pb-5"},[a("button",{staticClass:"border-2 border-gray-600 font-bold px-3 rounded text-gray-600 text-lg",on:{click:e.leave}},[e._v(" Cancel ")])])])]):e._e()])],[a("transition",{attrs:{name:"bounce"}},[e.modalDisableCompany?a("div",{staticClass:"modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10"},[a("div",{staticClass:"modal-overlay absolute w-full h-full bg-gray-900 opacity-50"}),a("div",{staticClass:"bg-white flex flex-col modal-container w-5/6 bg-white mx-4 rounded shadow-lg z-10 overflow-y-auto"},[a("div",{staticClass:"bg-red-500 font-bold px-5 py-1 rounded text-2xl text-center text-white"},[a("p",{staticClass:"title"},[e._v(" Choose an Option! ")])]),a("h3",{staticClass:"font-bold mx-auto my-6 px-2 py-6 text-black text-xl"},[e._v(" You can not Delete this Company, Because this User is last VOC/VOD in this Company. ")]),a("div",{staticClass:"flex justify-center"},[a("button",{staticClass:"border-2 border-gray-500 font-bold px-3 rounded text-gray-500 text-lg",on:{click:e.leaveConfirmBox}},[e._v(" Cancel ")])])])]):e._e()])]],2)},s=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 pr-4 text-gray-600"},[a("i",{staticClass:"fas fa-filter text-sm"})])}],n=(a("99af"),a("4de4"),a("4160"),a("a434"),a("b0c0"),a("159b"),a("53ca")),o=a("3835"),i=(a("96cf"),a("1da1")),l=a("2909"),c=a("fb66"),u=a.n(c),d=a("e130"),p=a.n(d),m=a("59b9"),v=a.n(m),b=a("66ba"),y=a.n(b),x=a("4a1a"),f=a.n(x),h=a("a6d6"),g=a.n(h),C=a("b5ae"),w=a.n(C),R=a("17c6"),V=a.n(R),A=a("9c7f"),k=a.n(A),U=a("98c2"),_=a.n(U),I=a("e8eb"),O=a.n(I),D=a("762e"),N=a.n(D),$=a("5dca"),E=a.n($),F=a("b425"),j=a.n(F),T=a("3d37"),B=a.n(T),S=a("8647"),L=a.n(S),q={name:"UserEdit",data:function(){return{userId:"",userOhrid:"",saveButtonStatus:!0,enableSaveButton:!1,userFirstName:"",isHidden:"",userLastName:"",userRole:"",adminRole:"",enableActivateButton:!1,enableAddCompanyButton:!0,isEditMode:!1,selectedAccount:"",languages:[1],statusFilter:"",accountData:[],verticalData:[],modalDisableUser:!1,modalActivateUser:!1,selectedVertical:"",validationErrors:[],isReadOnly:!0,isReadOnlyFeild:!0,editSaveToggle:[],isEditingCompanyVertical:!1,popupUserActionDisable:!1,currentRoleUser:!1,modalDisableCompany:!1,popupText:"",popupRole:"",editableCompanyVerticals:[],publicUserCompanyList:[]}},computed:{saveButtonDisable:function(){return 1!==this.adminRole&&""===this.userRole},filteredResults:function(){var e=parseInt(this.statusFilter,10);try{var t=this.editableCompanyVerticals?Object(l["a"])(this.editableCompanyVerticals):[];return this.statusFilter&&(t=0===e?t.filter((function(t){return t.isHidden===e&&t.userCompanyStatus===e})):t.filter((function(t){return t.isHidden===e||t.userCompanyStatus===e}))),t}catch(a){return console.warn(a.message,a),[]}}},watch:{$route:function(e,t){"Dashboard.Admin"===t.name&&"Dashboard.User.Edit"===e.name&&(this.renderReady=!1,this.getUserDetails(),this.onUserRoleChanged(),this.getUserCompanyVerticals(),this.getAllCompanyVerticals())}},deactivated:function(){this.userOhrid="",this.userFirstName="",this.userLastName="",this.userRole="",this.adminRole="",this.selectedAccount="",this.selectedVertical="",this.accountData=[],this.verticalData=[],this.validationErrors=[]},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getUserDetails();case 2:return t.next=4,e.onUserRoleChanged();case 4:return t.next=6,e.getUserCompanyVerticals();case 6:return t.next=8,e.getAllCompanyVerticals();case 8:case"end":return t.stop()}}),t)})))()},methods:{leaveConfirmBox:function(){this.modalDisableUser=!1,this.modalActivateUser=!1},resetFilters:function(){this.statusFilter=""},addUser:function(e,t,a,r,s,n,o,l,c){var d=this;return Object(i["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,d.$apollo.mutate({mutation:u.a,variables:{firstName:e,lastName:t,ohrid:a,isVOC:r,isVOD:s,isReviewer:n,isAdmin:o,companyId:l,verticalId:c}});case 3:i.next=7;break;case 5:i.prev=5,i.t0=i["catch"](0);case 7:case"end":return i.stop()}}),i,null,[[0,5]])})))()},checkOnchangeVocVod:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,s,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=parseInt(e.$route.params.userId,10),t.next=3,e.$apollo.query({query:E.a,variables:{id:a}});case 3:r=t.sent,s=r.data,n=0;case 6:if(!(n<s.fetchCompanyVocAndVod.length)){t.next=25;break}if("voc"!==e.currentRoleUser){t.next=16;break}if(!(parseInt(s.fetchCompanyVocAndVod[n].voc,10)<=1)){t.next=14;break}return e.popupUserActionDisable=!0,e.popupRole="You are not allowed to change user role to ".concat(e.userRole),e.userRole=e.currentRoleUser,e.popupText="As you were last aligned As ".concat(e.currentRoleUser," with company  ' ").concat(s.fetchCompanyVocAndVod[n].name," '"),t.abrupt("return");case 14:t.next=22;break;case 16:if(e.popupRole="You are not allowed to change user role to ".concat(e.userRole),e.userRole=e.currentRoleUser,e.popupText="As you were last aligned As ".concat(e.currentRoleUser," with company ' ").concat(s.fetchCompanyVocAndVod[n].name," '"),!(parseInt(s.fetchCompanyVocAndVod[n].vod,10)<=1)){t.next=22;break}return e.popupUserActionDisable=!0,t.abrupt("return");case 22:n+=1,t.next=6;break;case 25:case"end":return t.stop()}}),t)})))()},modalDisableUserFunc:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,s,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=parseInt(e.$route.params.userId,10),t.next=3,e.$apollo.query({query:E.a,variables:{id:a}});case 3:r=t.sent,s=r.data,n=!1,o=0;case 7:if(!(o<s.fetchCompanyVocAndVod.length)){t.next=21;break}if("voc"!==e.currentRoleUser){t.next=17;break}if(!(parseInt(s.fetchCompanyVocAndVod[o].voc,10)<=1)){t.next=15;break}return e.popupUserActionDisable=!0,e.popupRole="You are not allowed to delete this User",e.popupText="As you were last aligned As ".concat(e.currentRoleUser," with company  ' ").concat(s.fetchCompanyVocAndVod[o].name," '"),n=!0,t.abrupt("break",21);case 15:t.next=18;break;case 17:parseInt(s.fetchCompanyVocAndVod[o].vod,10)<=1&&(e.popupRole="You are not allowed to delete this User",e.popupText="As you were last aligned As ".concat(e.currentRoleUser," with company  ' ").concat(s.fetchCompanyVocAndVod[o].name," '"),e.popupUserActionDisable=!0,n=!0);case 18:o+=1,t.next=7;break;case 21:!1===n&&(e.modalDisableUser=!0);case 22:case"end":return t.stop()}}),t)})))()},leave:function(){this.popupUserActionDisable=!1,this.enableSaveButton=!1,this.isReadOnlyFeild=!0},updateUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{e.enableSaveButton=!1,e.isReadOnlyFeild=!0,a={userId:0,isVoc:0,isVod:0,isAdmin:0,isHidden:0},"voc"===e.userRole?a.isVoc=1:"vod"===e.userRole&&(a.isVod=1),a.isHidden=e.isHidden,a.userId=e.userId,e.$store.dispatch("addToastNotifications",{text:"User Updated Successfully !",timer:4e3,type:"success"})}catch(r){e.$store.dispatch("addToastNotifications",{text:r.message,timer:4e3,type:"error"})}case 1:case"end":return t.stop()}}),t)})))()},updateEditMode:function(){this.enableSaveButton=!0,this.isReadOnlyFeild=!1},addUserToCompanyVertical:function(e,t,a){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,r.$apollo.mutate({mutation:w.a,variables:{userId:e,companyId:t,verticalId:a}});case 3:s.next=7;break;case 5:s.prev=5,s.t0=s["catch"](0);case 7:case"end":return s.stop()}}),s,null,[[0,5]])})))()},addUserToCompanyVerticalS:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,a.$apollo.mutate({mutation:V.a,variables:{companyvId:t,userId:e}});case 3:a.$store.dispatch("addToastNotifications",{text:"Company aligned to User   Successfully !",timer:4e3,type:"success"}),a.$router.go(a.$router.currentRoute),r.next=11;break;case 7:r.prev=7,r.t0=r["catch"](0),a.$store.dispatch("addToastNotifications",{text:r.t0.message,timer:4e3,type:"error"}),a.enableAddCompanyButton=!a.enableAddCompanyButton;case 11:case"end":return r.stop()}}),r,null,[[0,7]])})))()},hiddenUserCompany:function(e,t,a){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,r.$apollo.mutate({mutation:g.a,variables:{id:e,userId:t,isHidden:a}});case 3:r.$store.dispatch("addToastNotifications",{text:"Company Deleted Successfully !",timer:4e3,type:"success"}),s.next=9;break;case 6:s.prev=6,s.t0=s["catch"](0),r.$store.dispatch("addToastNotifications",{text:s.t0.message,timer:4e3,type:"error"});case 9:case"end":return s.stop()}}),s,null,[[0,6]])})))()},enableUserCompany:function(e,t,a){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,r.$apollo.mutate({mutation:g.a,variables:{id:e,userId:t,isHidden:a}});case 3:r.$store.dispatch("addToastNotifications",{text:"Company Activated Successfully !",timer:4e3,type:"success"}),s.next=9;break;case 6:s.prev=6,s.t0=s["catch"](0),r.$store.dispatch("addToastNotifications",{text:s.t0.message,timer:4e3,type:"error"});case 9:case"end":return s.stop()}}),s,null,[[0,6]])})))()},updateCompanyVertical:function(e,t,a,r,s){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,n.$apollo.mutate({mutation:k.a,variables:{companyVerticalId:e,companyId:t,verticalId:a,userCompanyId:r,userId:s}});case 3:o.next=7;break;case 5:o.prev=5,o.t0=o["catch"](0);case 7:case"end":return o.stop()}}),o,null,[[0,5]])})))()},addUserCompany:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,a.$apollo.mutate({mutation:_.a,variables:{companyVerticalId:e,userId:t}});case 3:r.next=7;break;case 5:r.prev=5,r.t0=r["catch"](0);case 7:case"end":return r.stop()}}),r,null,[[0,5]])})))()},updateUserCompany:function(e,t,a,r){var s=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.$apollo.mutate({mutation:O.a,variables:{userCompanyId:e,companyVerticalId:t,userId:a,isDeleted:r}});case 3:n.next=7;break;case 5:n.prev=5,n.t0=n["catch"](0);case 7:case"end":return n.stop()}}),n,null,[[0,5]])})))()},onAccountSelect:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s,n,i,l,c;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,s=parseInt(t.target.value,10),r.next=4,a.$apollo.query({query:y.a,variables:{id:s}});case 4:n=r.sent,i=n.data,i=i.getVerticalByCompany,l=i,c=Object(o["a"])(l,1),i=c[0],e.selectedVertical=i.name,e.companyId=s,r.next=16;break;case 14:r.prev=14,r.t0=r["catch"](0);case 16:case"end":return r.stop()}}),r,null,[[0,14]])})))()},onUserRoleChanged:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$apollo.query({query:p.a});case 3:a=t.sent,r=a.data,e.accountData=r.fetchAllCompanies,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 11:return t.abrupt("return",e.accountData);case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getAllVerticalByCompany:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,t.$apollo.query({query:N.a,variables:{companyId:e}});case 3:a.next=8;break;case 5:a.prev=5,a.t0=a["catch"](0),t.$store.dispatch("addToastNotifications",{text:a.t0.message,timer:4e3,type:"error"});case 8:case"end":return a.stop()}}),a,null,[[0,5]])})))()},checkUserInput:function(e,t,a){var r=/\d/;(a.length<7||a.length>9)&&this.validationErrors.push("OHRID length should be between 7 - 9!"),""===e&&this.validationErrors.push("First Name is Required!"),""===t&&this.validationErrors.push("Last Name is Required!"),r.test(e)&&this.validationErrors.push("Enter valid characters in first name!"),r.test(t)&&this.validationErrors.push("Enter valid characters in last name!")},saveUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,s,n,o,i,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.userFirstName,r=e.userLastName,s=e.userOhrid,e.checkUserInput(a,r,s),!(e.validationErrors.length>0)){t.next=6;break}return e.validationErrors.forEach((function(t){e.$store.dispatch("addToastNotifications",{text:t,timer:4e3,type:"error"})})),e.validationErrors=[],t.abrupt("return");case 6:return n=e.selectedAccount.id,o=e.selectedVertical.id,i={firstName:a,lastName:r,ohrid:parseInt(s,10),isVOC:0,isVOD:0,isReviewer:0,isAdmin:0,companyId:n,verticalId:o},e.adminRole&&(i.isAdmin=1),"voc"===e.userRole?i.isVOC=1:"vod"===e.userRole?i.isVOD=1:(i.companyId=0,i.verticalId=0),t.prev=11,t.next=14,e.$apollo.mutate({mutation:u.a,variables:i});case 14:if(l=t.sent,l.data.addUser){t.next=17;break}throw new Error("User with OHRID ".concat(s," already exists"));case 17:e.$store.dispatch("addToastNotifications",{text:"User added succesfully!",timer:4e3,type:"success"}),e.$router.go(-1),t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](11),e.$store.dispatch("addToastNotifications",{text:"".concat(t.t0.message),timer:4e3,type:"error"});case 24:case"end":return t.stop()}}),t,null,[[11,21]])})))()},DeleteUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={userId:0,isHidden:1},r=e.$route.params.userId,a.userId=parseInt(r,10),t.next=6,e.$apollo.mutate({mutation:f.a,variables:a});case 6:e.$store.dispatch("addToastNotifications",{text:"User Updated Successfully !",timer:4e3,type:"success"}),e.enableActivateButton=!0,e.modalDisableUser=!1,t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()},ActivateUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,a={userId:0,isHidden:0},r=e.$route.params.userId,a.userId=parseInt(r,10),t.next=6,e.$apollo.mutate({mutation:f.a,variables:a});case 6:e.$store.dispatch("addToastNotifications",{text:"User Activated Successfully !",timer:4e3,type:"success"}),e.enableActivateButton=!1,e.modalActivateUser=!1,t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),e.$store.dispatch("addToastNotifications",{text:t.t0.message,timer:4e3,type:"error"});case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()},getUserDetails:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r,s,n,o,i,l,c,u,d,p,m;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.$route.query.isEditMode,r=e.$route.params.userId,t.next=4,e.$apollo.query({query:v.a,variables:{id:parseInt(r,10)}});case 4:s=t.sent,n=s.data,o=n.getUser[0],i=o.firstName,l=o.lastName,c=o.ohrid,u=o.isVOC,d=o.isVOD,p=o.isAdmin,m=o.isHidden,a?(e.isEditMode=a,i&&(e.userFirstName=i),l&&(e.userLastName=l),c&&(e.userOhrid=c),r&&(e.userId=parseInt(r,10)),1===u&&(e.userRole="voc",e.currentRoleUser="voc"),1===d&&(e.userRole="vod",e.currentRoleUser="vod"),p&&(e.adminRole=1),1===m&&(e.enableActivateButton=!0),e.isHidden=m,e.isReadOnly=!1):e.isReadOnly=!0,console.log("is read only is: ".concat(e.isReadOnly));case 9:case"end":return t.stop()}}),t)})))()},makeCompanyVerticalEditable:function(e){e.isEditingCompanyVertical?(this.enableAddCompanyButton=!this.enableAddCompanyButton,this.addUserToCompanyVerticalS(this.userId,e.companyId)):(e.selectedAccount&&e.selectedAccount.id&&e.selectedAccount.name&&console.log("selectedAccount: ".concat(e.selectedAccount.id,",  name:  ").concat(e.selectedAccount.name)),e.selectedVertical&&e.selectedVertical.id&&e.selectedVertical.name&&console.log("selected vertical: ".concat(e.selectedVertical.id,",   name:  ").concat(e.selectedVertical.name)),e.selectedVertical.id&&e.selectedAccount.id&&(console.log("user is: ".concat(this.userId," type: ").concat(Object(n["a"])(this.userId))),this.addUserToCompanyVertical(this.userId,e.selectedAccount.id,e.selectedVertical.id)))},softDeleteUserCompany:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s,n,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=parseInt(t.$route.params.userId,10),s=t.editableCompanyVerticals[e].id,console.log(t.editableCompanyVerticals[e].id),a.next=5,t.$apollo.query({query:j.a,variables:{id:r,companyVertical:s}});case 5:if(n=a.sent,o=n.data,console.log(o.fetchCompanyVocAndVodFromCompVertical),!1,"voc"!==t.currentRoleUser){a.next=18;break}if(!(parseInt(o.fetchCompanyVocAndVodFromCompVertical[0].voc,10)<=1)){a.next=16;break}return t.popupRole="You are not allowed to disable this Company ",t.popupText="As you were last aligned As ".concat(t.currentRoleUser," with company  ' ").concat(o.fetchCompanyVocAndVodFromCompVertical[0].name," '"),t.popupUserActionDisable=!0,!0,a.abrupt("return");case 16:a.next=24;break;case 18:if(!(parseInt(o.fetchCompanyVocAndVodFromCompVertical[0].vod,10)<=1)){a.next=24;break}return t.popupRole="You are not allowed to disable this Company ",t.popupText="As you were last aligned As ".concat(t.currentRoleUser," with company  ' ").concat(o.fetchCompanyVocAndVodFromCompVertical[0].name," '"),t.popupUserActionDisable=!0,!0,a.abrupt("return");case 24:t.editableCompanyVerticals&&(t.editableCompanyVerticals[e]&&t.editableCompanyVerticals[e].softDeleteRequired&&(t.hiddenUserCompany(t.editableCompanyVerticals[e].id,t.userId,1),console.log("TCL: softDeleteUserCompany -> index",e)),t.editableCompanyVerticals[e].userCompanyStatus=1,console.log("TCL: softDeleteUserCompany -> this.editableCompanyVerticals[index]",t.editableCompanyVerticals[e]));case 26:case"end":return a.stop()}}),a)})))()},ActivateUserCompany:function(e){this.editableCompanyVerticals&&(this.editableCompanyVerticals[e]&&this.editableCompanyVerticals[e].softDeleteRequired&&(this.enableUserCompany(this.editableCompanyVerticals[e].id,this.userId,0),console.log("TCL: softDeleteUserCompany -> index",e)),this.editableCompanyVerticals[e].userCompanyStatus=0,console.log("TCL: softDeleteUserCompany -> this.editableCompanyVerticals[index]",this.editableCompanyVerticals[e]))},addNewRowForCompanyVertical:function(){var e={id:"",companyId:"",verticalId:"",isEditingCompanyVertical:!0,selectedAccount:"",selectedVertical:"",softDeleteRequired:!1,userCompanyStatus:""};this.editableCompanyVerticals.push(e)},addNewRowForCompanyVerticalValues:function(e,t,a,r,s,n,o){var i={id:e,companyId:t,verticalId:a,isEditingCompanyVertical:!1,selectedAccount:r,selectedVertical:s,softDeleteRequired:!0,isHidden:n,userCompanyStatus:o};this.editableCompanyVerticals.push(i)},getUserCompanyVerticals:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.editableCompanyVerticals=[],t.prev=1,t.next=4,e.$apollo.query({query:B.a,variables:{id:parseInt(e.$route.params.userId,10)}});case 4:a=t.sent,r=a.data,r.publicUserCompanyList&&r.publicUserCompanyList.length>0&&(e.publicUserCompanyList=r.publicUserCompanyList,e.editableCompanyVerticals.splice(0,1),r.publicUserCompanyList.forEach((function(t){var a=t.companyId,r=t.verticalId,s=t.companyVerticalId,n=t.isHidden,o=t.companyId,i=t.isUserCompany,l=t.vertical;e.addNewRowForCompanyVerticalValues(s,a,r,o,l,n,i)}))),t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](1);case 11:case"end":return t.stop()}}),t,null,[[1,9]])})))()},getAllCompanyVerticals:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$apollo.query({query:L.a});case 3:a=t.sent,r=a.data,r.publicUserCompanyVerticalList&&r.publicUserCompanyVerticalList.length,t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](0);case 10:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getCompanyVerticalByCompanyName:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.publicUserCompanyList&&t.publicUserCompanyList.length,e.abrupt("return",null);case 2:case"end":return e.stop()}}),e)})))()}}},H=q,z=(a("a63a"),a("2877")),M=Object(z["a"])(H,r,s,!1,null,"7655ae96",null);t["default"]=M.exports}}]);
//# sourceMappingURL=chunk-155790f2.daab5bba.js.map