webpackJsonp([1],{"8bGk":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},s,!1,function(e){a("gsu9")},null,null).exports,o=a("/ocq"),r=a("Dd8w"),l=a.n(r),d=a("fZjL"),m=a.n(d),c=firebase.database().ref("/employees/"),u=firebase.database().ref("/customers/"),v={name:"HelloWorld",data:function(){return{mobile:"",loginModal:!0,confirmLogIn:!1,loading:"none",addEmpType:"1",addEmpName:"",empObjList:[],consumeInfo:[],delDesignerName:"none",delAssistantName:"none",workDesignerName:"none",workAssistantName:"none",messageModal:!1,infoMsg:"",modifyEmpArea:!1,designYear:(new Date).getFullYear(),designMonth:(new Date).getMonth()+1,designDate:(new Date).getDate(),allYears:[],allMonths:[1,2,3,4,5,6,7,8,9,10,11,12],monthDates:[31,28,31,30,31,30,31,31,30,31,30,31],allDates:[],cut:"",dye:"",burn:"",wash:"",addEmpBtnDisabled:!0,commonCancel:!1,commonCheck:!1,delRecordBtn:!1,delRecordID:"",sortByDate:!0,sortFromBigToSmall:!0}},methods:{addEmp:function(){var e=this;console.log({"emp name":e.addEmpName}),e.loading=!0,c.push({empName:e.addEmpName,empType:e.addEmpType,timeStamp:e.getTime()}),e.loading=!1,e.messageModal=!0,e.infoMsg="新增成功"},getTime:function(){var e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},deleteEmp:function(){var e=this;if("none"!==e.delDesignerName)for(var t=0;t<e.empObjList.length;t++)if(e.empObjList[t].empName===e.delDesignerName){e.loading=!0;var a=e.empObjList[t].id;firebase.database().ref("/employees/"+a).set({}),e.delDesignerName="none"}if("none"!==e.delAssistantName)for(t=0;t<e.empObjList.length;t++)if(e.empObjList[t].empName===e.delAssistantName){e.loading=!0;a=e.empObjList[t].id;firebase.database().ref("/employees/"+a).set({}),e.delAssistantName="none"}e.loading=!1,e.messageModal=!0,e.infoMsg="刪除成功"},changeDay:function(){var e=this,t=e.designYear,a=e.designMonth;"2"===a&&(e.monthDates[1]=e.checkLeapYear(t)),e.allDates=[];for(var n=1;n<=e.monthDates[a-1];n++)e.allDates.push(n)},checkLeapYear:function(e){return e%4==0&&e%100!=0||e%400==0?29:28},addCustomerData:function(){var e=this,t=(this.totalCost,this.workDesignerName);this.workAssistantName;if("none"===t)return e.messageModal=!0,e.infoMsg="Please choose a designer!",!1;if(e.checkValueIsNumber()){e.loading=!0;var a=e.designYear+"/"+e.designMonth+"/"+e.designDate,n=e.cut>0?"剪: "+e.cut:"",s=e.dye>0?"染: "+e.dye:"",i=e.burn>0?"燙: "+e.burn:"",o=e.wash>0?"洗: "+e.wash:"",r=n+s+i+o;console.log(a),u.push({mobile:e.mobile,date:a,totalCost:e.totalCost,designer:e.workDesignerName,assistant:e.workAssistantName,cut:n,dye:s,burn:i,wash:o,detail:r}),e.loading=!1}},checkValueIsNumber:function(){var e=this,t="";return t+=isNaN(e.cut)?"剪 ":"",t+=isNaN(e.dye)?"染 ":"",t+=isNaN(e.burn)?"燙 ":"",(t+=isNaN(e.wash)?"洗 ":"").length>0?(e.messageModal=!0,e.infoMsg=t+"欄位輸入有誤",!1):0!==Number(e.totalCost)||(e.messageModal=!0,e.infoMsg="Free?!!",!1)},delRecord:function(e,t,a){var n=this;(n.loading=!0,console.log(e),!1===n.delRecordBtn)?(n.delRecordID=e,n.callModal(2,"刪除資料："+t+"，消費金額：$"+a)):(firebase.database().ref("/customers/"+e).set({}),n.loading=!1,n.callModal(1,"資料已刪除"),n.delRecordID="")},callModal:function(e,t){var a=this;a.resetModal(),a.messageModal=!0,a.infoMsg="",1===e?(a.commonCancel=!0,a.commonCheck=!0,a.infoMsg=t):2===e&&(a.commonCancel=!0,a.infoMsg=t,a.delRecordBtn=!0)},resetModal:function(){var e=this;e.messageModal=!1,e.loginModal=!1,e.infoMsg="",e.commonCancel=!1,e.commonCheck=!1,e.delRecordBtn=!1},login:function(){this.resetModal(),this.confirmLogIn=!0},changeMember:function(){this.mobile="",this.loginModal=!0,this.confirmLogIn=!1,this.resetAllInput()},resetAllInput:function(){var e=this;e.cut="",e.dye="",e.burn="",e.wash="",e.workDesignerName="none",e.workAssistantName="none",e.designYear=(new Date).getFullYear(),e.designMonth=(new Date).getMonth()+1,e.designDate=(new Date).getDate(),e.addEmpName="",e.addEmpType="1",e.modifyEmpArea=!1,e.delDesignerName="none",e.delAssistantName="none"}},computed:{totalCost:function(){var e=this,t=0;return!isNaN(e.cut)&&Number(e.cut)>0&&(t+=Number(e.cut)),!isNaN(e.dye)&&Number(e.dye)>0&&(t+=Number(e.dye)),!isNaN(e.burn)&&Number(e.burn)>0&&(t+=Number(e.burn)),!isNaN(e.wash)&&Number(e.wash)>0&&(t+=Number(e.wash)),t},reverseInfo:function(){var e=this,t=e.consumeInfo;return null!==t&&t.length>0&&t.sort(function(t,a){return e.sortByDate?e.sortFromBigToSmall?new Date(a.date)-new Date(t.date):new Date(t.date)-new Date(a.date):e.sortFromBigToSmall?a.mobile-t.mobile:t.mobile-a.mobile}),t},delEmpBtnDisabled:function(){return"none"===this.delDesignerName&&"none"===this.delAssistantName}},mounted:function(){var e=this;c.on("value",function(t){var a=t.val(),n=a?m()(a).map(function(e){return l()({id:e},a[e])}):null;e.empObjList=n}),u.on("value",function(t){var a=t.val(),n=a?m()(a).map(function(e){return l()({id:e},a[e])}):null;e.consumeInfo=n});for(var t=new Date,a=1911;a<=t.getFullYear();a++)e.allYears.push(a);for(a=1;a<=31;a++)e.allDates.push(a)},watch:{addEmpName:function(e){this.addEmpBtnDisabled=""===e}},directives:{focus:{update:function(e){e.focus()}}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[a("div",{attrs:{align:"right"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.confirmLogIn,expression:"confirmLogIn"}]},[e._v("目前會員電話："+e._s(e.mobile))]),e._v(" "),a("button",{staticClass:"btn btn-default btn-sm",on:{click:function(t){return e.changeMember()}}},[e._v("切換會員")])]),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"loading",style:{display:e.loading,cursor:"wait"}},[e._m(1)]),e._v(" "),a("table",{staticStyle:{width:"100%"}},[a("tbody",[a("tr",[a("td",{staticStyle:{width:"100%"},attrs:{colspan:"2"}},[a("div",{staticClass:"panel-heading",staticStyle:{"font-family":"consolas","text-align":"left"}},[a("span",{staticStyle:{cursor:"pointer"},on:{click:function(t){e.modifyEmpArea=!e.modifyEmpArea}}},[a("strong",[a("i",{staticClass:"fa fa-user"}),e._v(" 員工異動 \n                "),e.modifyEmpArea?e._e():a("i",{staticClass:"fa fa-chevron-down"}),e._v(" "),e.modifyEmpArea?a("i",{staticClass:"fa fa-chevron-up"}):e._e()])])])])]),e._v(" "),a("tr",[a("td",{staticStyle:{width:"50%"}},[a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.modifyEmpArea,expression:"modifyEmpArea"}],staticClass:"panel-heading",staticStyle:{"font-family":"consolas","text-align":"left"}},[a("span",[e._v("新增\n                "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addEmpType,expression:"addEmpType"}],attrs:{type:"radio",name:"r",value:"1"},domProps:{checked:e._q(e.addEmpType,"1")},on:{change:function(t){e.addEmpType="1"}}}),e._v("設計師\n                "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addEmpType,expression:"addEmpType"}],attrs:{type:"radio",name:"r",value:"2"},domProps:{checked:e._q(e.addEmpType,"2")},on:{change:function(t){e.addEmpType="2"}}}),e._v("助理\n                "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.addEmpName,expression:"addEmpName"}],staticClass:"form-controll",attrs:{type:"text",placeholder:"請輸入名字"},domProps:{value:e.addEmpName},on:{input:function(t){t.target.composing||(e.addEmpName=t.target.value)}}}),e._v(" "),a("div",{staticClass:"btn btn-info btn-sm",attrs:{disabled:e.addEmpBtnDisabled},on:{click:function(t){return e.addEmp()}}},[a("i",{staticClass:"fa fa-user"}),e._v(" 確認新增")])])])])],1),e._v(" "),a("td",{staticStyle:{width:"50%"}},[a("transition",{attrs:{name:"fade"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.modifyEmpArea,expression:"modifyEmpArea"}],staticClass:"panel-heading",staticStyle:{"font-family":"consolas","text-align":"right"}},[a("span",[e._v("刪除\n                    設計師:"),a("select",{directives:[{name:"model",rawName:"v-model",value:e.delDesignerName,expression:"delDesignerName"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.delDesignerName=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"none"}},[e._v("請選擇")]),e._v(" "),e._l(e.empObjList,function(t){return a("option",{directives:[{name:"show",rawName:"v-show",value:"1"==t.empType,expression:"emp.empType == '1'"}],key:t.id,domProps:{value:t.empName}},[e._v(e._s(t.empName))])})],2),e._v("\n                    助理:"),a("select",{directives:[{name:"model",rawName:"v-model",value:e.delAssistantName,expression:"delAssistantName"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.delAssistantName=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"none"}},[e._v("請選擇")]),e._v(" "),e._l(e.empObjList,function(t){return a("option",{directives:[{name:"show",rawName:"v-show",value:"2"==t.empType,expression:"emp.empType == '2'"}],key:t.id,domProps:{value:t.empName}},[e._v(e._s(t.empName))])})],2),e._v(" "),a("button",{staticClass:"btn btn-danger btn-sm",attrs:{disabled:e.delEmpBtnDisabled},on:{click:function(t){return e.deleteEmp()}}},[a("i",{staticClass:"fa fa-times"}),e._v(" 確認刪除")])])])])],1)])])]),e._v(" "),a("table",{staticStyle:{"text-align":"left",width:"100%"},attrs:{border:"0"}},[a("tbody",[a("tr",[a("td",{staticStyle:{height:"50px",width:"23%"}},[a("i",{staticClass:"far fa-calendar-alt"}),e._v("日期 \n              "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.designYear,expression:"designYear"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.designYear=t.target.multiple?a:a[0]},function(t){return e.changeDay()}]}},e._l(e.allYears,function(t){return a("option",[e._v(e._s(t))])}),0),e._v("/\n              "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.designMonth,expression:"designMonth"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.designMonth=t.target.multiple?a:a[0]},function(t){return e.changeDay()}]}},e._l(e.allMonths,function(t){return a("option",[e._v(e._s(t))])}),0),e._v("/\n              "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.designDate,expression:"designDate"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.designDate=t.target.multiple?a:a[0]}}},e._l(e.allDates,function(t){return a("option",[e._v(e._s(t))])}),0)]),e._v(" "),a("td",{staticStyle:{width:"23%"}},[a("i",{staticClass:"fa fa-dollar"}),e._v("總金額:  "+e._s(e.totalCost))]),e._v(" "),a("td",{staticStyle:{width:"23%"}},[a("i",{staticClass:"fa fa-scissors"}),e._v("設計師  \n            "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.workDesignerName,expression:"workDesignerName"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.workDesignerName=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"none"}},[e._v("請選擇")]),e._v(" "),e._l(e.empObjList,function(t){return a("option",{directives:[{name:"show",rawName:"v-show",value:"1"==t.empType,expression:"emp.empType == '1'"}],key:t.id,domProps:{value:t.empName}},[e._v(e._s(t.empName))])})],2)]),e._v(" "),a("td",{staticStyle:{width:"23%"}},[a("i",{staticClass:"fa fa-book"}),e._v("助理  \n            "),a("select",{directives:[{name:"model",rawName:"v-model",value:e.workAssistantName,expression:"workAssistantName"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.workAssistantName=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"none"}},[e._v("請選擇")]),e._v(" "),e._l(e.empObjList,function(t){return a("option",{directives:[{name:"show",rawName:"v-show",value:"2"==t.empType,expression:"emp.empType == '2'"}],key:t.id,domProps:{value:t.empName}},[e._v(e._s(t.empName))])})],2)]),e._v(" "),a("td",{attrs:{rowspan:"2"}},[a("div",{staticClass:"btn btn-success btn-sm",on:{click:function(t){return e.addCustomerData()}}},[a("i",{staticClass:"fa fa-save"}),e._v(" 新增資料")])])]),e._v(" "),a("tr",[a("td",{staticStyle:{height:"50px"}},[e._v("\n            剪  "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cut,expression:"cut",modifiers:{number:!0}}],staticStyle:{width:"75px"},attrs:{type:"text"},domProps:{value:e.cut},on:{input:function(t){t.target.composing||(e.cut=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),a("td",{staticStyle:{height:"50px"}},[e._v("\n            染  "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.dye,expression:"dye",modifiers:{number:!0}}],staticStyle:{width:"75px"},attrs:{type:"text"},domProps:{value:e.dye},on:{input:function(t){t.target.composing||(e.dye=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),a("td",{staticStyle:{height:"50px"}},[e._v("\n            燙  "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.burn,expression:"burn",modifiers:{number:!0}}],staticStyle:{width:"75px"},attrs:{type:"text"},domProps:{value:e.burn},on:{input:function(t){t.target.composing||(e.burn=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})]),e._v(" "),a("td",{staticStyle:{height:"50px"}},[e._v("\n            洗  "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.wash,expression:"wash",modifiers:{number:!0}}],staticStyle:{width:"75px"},attrs:{type:"text"},domProps:{value:e.wash},on:{input:function(t){t.target.composing||(e.wash=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])])])]),e._v(" "),a("table",{directives:[{name:"show",rawName:"v-show",value:e.confirmLogIn&&"boss"!==e.mobile,expression:"confirmLogIn && mobile !== 'boss'"}],staticClass:"table table-striped table-bordered table-hover",attrs:{border:"1"}},[a("tbody",[e._m(2),e._v(" "),e._l(e.reverseInfo,function(t,n){return a("tr",[t.mobile===e.mobile?[a("td",[e._v(e._s(t.date))]),e._v(" "),a("td",[e._v(e._s(t.totalCost))]),e._v(" "),a("td",[e._v(e._s(t.designer))]),e._v(" "),a("td",[e._v(e._s("none"===t.assistant?"":t.assistant))]),e._v(" "),a("td",[e._v(e._s(t.detail))]),e._v(" "),a("td",[a("i",{staticClass:"fa fa-times",staticStyle:{cursor:"pointer",color:"red"},on:{click:function(a){return e.delRecord(t.id,t.date,t.totalCost)}}})])]:e._e()],2)})],2)]),e._v(" "),a("table",{directives:[{name:"show",rawName:"v-show",value:"boss"===e.mobile&&e.confirmLogIn,expression:"mobile === 'boss' && confirmLogIn"}],staticClass:"table table-striped table-bordered table-hover",attrs:{border:"1"}},[a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("會員電話 \n            "),a("i",{staticClass:"fa fa-sort",staticStyle:{cursor:"pointer"},on:{click:function(t){e.sortByDate=!1,e.sortFromBigToSmall=!e.sortFromBigToSmall}}})]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("設計日期 \n            "),a("i",{staticClass:"fa fa-sort",staticStyle:{cursor:"pointer"},on:{click:function(t){e.sortByDate=!0,e.sortFromBigToSmall=!e.sortFromBigToSmall}}})]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("消費金額")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("設計師")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("助理")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("設計內容")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("刪除紀錄")])]),e._v(" "),e._l(e.reverseInfo,function(t,n){return a("tr",[[a("td",[e._v(e._s(t.mobile))]),e._v(" "),a("td",[e._v(e._s(t.date))]),e._v(" "),a("td",[e._v(e._s(t.totalCost))]),e._v(" "),a("td",[e._v(e._s(t.designer))]),e._v(" "),a("td",[e._v(e._s("none"===t.assistant?"":t.assistant))]),e._v(" "),a("td",[e._v(e._s(t.detail))]),e._v(" "),a("td",[a("i",{staticClass:"fa fa-times",staticStyle:{cursor:"pointer",color:"red"},on:{click:function(a){return e.delRecord(t.id,t.date,t.totalCost)}}})])]],2)})],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.messageModal,expression:"messageModal"}]},[a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-content",staticStyle:{width:"30%"}},[a("div",{staticClass:"modal-header"},[a("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(t){return e.resetModal()}}},[a("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])]),e._v(" "),a("h2",{staticClass:"modal-title",staticStyle:{"font-family":"consolas"}},[e._v("Infomation")])]),e._v(" "),a("div",{staticClass:"modal-body"},[e._v("\n                    "+e._s(e.infoMsg)+"\n                  ")]),e._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{directives:[{name:"show",rawName:"v-show",value:e.commonCancel,expression:"commonCancel"}],staticClass:"btn btn-default btn-sm",on:{click:function(t){return e.resetModal()}}},[e._v("取消")]),e._v(" "),a("button",{directives:[{name:"show",rawName:"v-show",value:e.commonCheck,expression:"commonCheck"}],staticClass:"btn btn-primary btn-sm",on:{click:function(t){return e.resetModal()}}},[e._v("確認")]),e._v(" "),a("button",{directives:[{name:"show",rawName:"v-show",value:e.delRecordBtn,expression:"delRecordBtn"}],staticClass:"btn btn-primary btn-sm",on:{click:function(t){return e.delRecord(e.delRecordID,null,null)}}},[e._v("確認刪除")])])])])])])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.loginModal,expression:"loginModal"}]},[a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-content",staticStyle:{width:"30%"}},[a("div",{staticClass:"modal-header"},[a("h2",{staticClass:"modal-title",staticStyle:{"font-family":"consolas"}},[e._v("Log in")])]),e._v(" "),a("div",{staticClass:"modal-body"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"},{name:"focus",rawName:"v-focus"}],attrs:{type:"text",placeholder:"請輸入電話號碼"},domProps:{value:e.mobile},on:{keyup:function(t){return t.type.indexOf("key")||13===t.keyCode?e.login():null},input:function(t){t.target.composing||(e.mobile=t.target.value)}}})]),e._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-primary btn-sm",attrs:{disabled:""===e.mobile},on:{click:function(t){return e.login()}}},[e._v("登入")])])])])])])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{align:"center"}},[t("h1",[this._v("TCS")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"spinner"},[t("div",{staticClass:"double-bounce1"}),this._v(" "),t("div",{staticClass:"double-bounce2"})])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("tr",[a("td",{staticStyle:{"text-align":"center"}},[e._v("設計日期")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("消費金額")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("設計師")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("助理")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("設計內容")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("刪除紀錄")])])}]};var f=a("VU/8")(v,p,!1,function(e){a("8bGk")},"data-v-0b190a41",null).exports;n.a.use(o.a);var g=new o.a({routes:[{path:"/",name:"CustomerInfo",component:f}]}),_=a("oPmM"),h=a.n(_);n.a.use(h.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:g,components:{App:i},template:"<App/>"})},gsu9:function(e,t){},oPmM:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e0e75e8238d71ba8853b.js.map