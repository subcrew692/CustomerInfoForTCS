<template>
  <div class="container">
    <!-- 變更密碼 -->
    <div style="text-align:right;">
        <button class="btn btn-outline btn-danger btn-xs" @click="openChangePwdModal()">
            變更密碼 <i class="fa fa-lock"></i></button>
    </div>

    <div class="icard-list" v-show="blockModal">
        <transition name="fade">
          <h4 class="closeWisdom" v-show="blockModal">{{blockModalMsg}}</h4>
        </transition>
    </div>

    <!-- 檢視日期 -->
    <div class="panel">
        <table width="100%">
            <tr>
                <td style="width:50%;text-align:left">
                    請選擇欲檢視的日期：
                    西元<select v-model="selectedYear"　class="form-control selectionAuto"><option v-for="year in allYears" :value="year">{{year}}</option></select>年
                    <select v-model="selectedMonth"　class="form-control selectionAuto"><option v-for="month in allMonths" :value="month">{{month}}</option></select>月
                </td>
                <td style="width:50%;text-align:right">
                    <h3><router-link to="/">回首頁 <i class="fa fa-home"></i></router-link></h3>
                </td>
            </tr>
        </table>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <table width="100%">
                <tr>
                    <td style="width:50%;text-align:left;">員工薪資列表</td>
                    <td style="width:50%;text-align:right;">日期區間: {{salaryAmountDate}}</td>
                </tr>
            </table>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="" v-for="emp in empObjList">
                <a :href="'#'+emp.empName" data-toggle="tab" aria-expanded="false">{{emp.empName}}</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div v-for="emp in empObjList" class="tab-pane fade" :id="emp.empName">
                    <!-- 助理月薪 -->
                    <div v-for="per in astEveryMonthSalary" style="text-align:right;">
                        <h3 v-if="emp.empName === per.name">{{emp.empName}}薪水{{selectedMonth}}月份：{{per.totalSalary}}</h3>
                    </div>
                    <!-- 設計師月付 -->
                    <div v-for="per in desEveryMonthSalary" style="text-align:right;">
                        <h3 v-if="emp.empName === per.name">{{emp.empName}}&nbsp;&nbsp;{{selectedMonth}}月份需支付：{{per.designerPay}}</h3>
                    </div>
                    <table width="100%" class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info" style="width: 100%;">
                        <thead>
                            <tr role="row">
                            <th class="sorting_asc" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" style="width: 205px;" 
                            aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending">日期</th>

                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Browser: activate to sort column ascending" style="width: 248px;">助理</th>

                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Platform(s): activate to sort column ascending" style="width: 227px;">內容</th>
                            
                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Engine version: activate to sort column ascending" style="width: 179px;">金額</th>
                            
                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="CSS grade: activate to sort column ascending" style="width: 135px;">由誰給付</th></tr>
                        </thead>
                        <tbody>
                        <!-- 設計師內容 -->
                        <tr v-for="(salary, index) in arrangedDBData" v-if="salary.designer === emp.empName"
                        v-bind:class="{'gradeA odd': (index + 1) % 2 === 0, 'gradeA even': (index + 1) % 2 !== 0}">
                            <td class="center">{{salary.date}}</td>
                            <td class="center">{{salary.assistant}}</td>
                            <td class="center">{{salary.detail}}</td>
                            <td class="center">{{salary.totalMoney}}</td>
                            <td class="center">{{salary.designer}}</td>
                        </tr>
                        <!-- 助理內容 -->
                        <tr v-for="(salary, index) in arrangedDBData" v-if="salary.assistant === emp.empName"
                        v-bind:class="{'gradeA odd': (index + 1) % 2 === 0, 'gradeA even': (index + 1) % 2 !== 0}">
                            <td class="center">{{salary.date}}</td>
                            <td class="center">{{salary.assistant}}</td>
                            <td class="center">{{salary.detail}}</td>
                            <td class="center">{{salary.totalMoney}}</td>
                            <td class="center">{{salary.designer}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- /.panel-body -->
    </div>

      <!-- Login Modal -->
      <div v-show="loginModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content" style="width:30%;">
                  <div class="modal-header">
                    <h3>{{modalHeadMsg}}</h3>
                    <span style="color:red;">{{loginFailMsg}}</span>
                  </div>
                  <div class="modal-body">
                    <div class="form-group input-group">
                        <input type="password" id="accountInput" v-model="loginAccount" placeholder="請輸入密碼" class="form-control"
                         v-on:keyup.13="login()" v-focus>
                        <span class="input-group-btn">
                        <button class="btn btn-default" type="button" @mouseover="hoverPwdEye=true;" 
                        @mouseleave="hoverPwdEye=false;"><i class="fa fa-eye"></i></button></span>
                    </div>
                  </div>
                  <div class="modal-footer" v-if="!isChangePassword">
                    <router-link to="/" class="btn btn-default btn-sm">回上層 <i class="fa fa-reply"></i></router-link>
                    <button class="btn btn-primary btn-sm" @click="login()" 
                    :style="{'display': loginAccount==='' ? 'none' : 'inline-block'}">
                    確認登入 <i class="fa fa-share-square"></i></button>
                  </div>
                  <div class="modal-footer" v-if="isChangePassword">
                    <button class="btn btn-default btn-sm" @click="closeModal()">取消 <i class="fa fa-times"></i></button>
                    <button class="btn btn-primary btn-sm" @click="changePassword()" 
                    :style="{'display': loginAccount==='' ? 'none' : 'inline-block'}">
                    確認更改 <i class="fa fa-check"></i></button>
                  </div>
                </div>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
const bossRef = firebase.database().ref('/bossPassword/');
const empRef = firebase.database().ref('/employees');
const salaryRef = firebase.database().ref('/salary/');
Date.prototype.yyyymmddBySlash = function() {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	return "".concat(yyyy).concat('/').concat(mm).concat('/').concat(dd);
};
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};
export default {
    name: 'salary',
    data() {
        return {
            loginModal: true, // 登入Modal
            modalHeadMsg: '身分驗證', // 登入Modal的header
            loginAccount: '', // 登入帳號
            bossAccount: '', // 老闆帳號
            empObjList: [], // 員工陣列
            selectedYear: new Date().getFullYear(), // 檢視年
            allYears: [],
            selectedMonth: new Date().getMonth() + 1, // 檢視月
            allMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
            allSalaryData: [], // 助理在DB的所有資料
            loginPermit: false,
            hoverPwdEye: false,
            loginFailMsg: '',
            isChangePassword: false, // 是否為變更密碼modal
            blockModal: false, 
            blockModalMsg: ''
        }
    },
    methods: {
        login() {
            const vm = this;
            if(!vm.isChangePassword) {
                if(vm.loginAccount === vm.bossAccount) {
                    vm.loginPermit = true;
                    vm.closeModal();
                }else {
                    vm.loginFailMsg = '非老闆禁止進入哦';
                }
            }
        },
        showPwd() {
            let password = document.getElementById('accountInput');
            const attr = password.getAttribute('type');
            password.setAttribute('type', this.hoverPwdEye ? 'text' : 'password');
            password.focus();
        },
        isString(obj) {
            return (Object.prototype.toString.call(obj) === 'String' ||
            Object.prototype.toString.call(obj) === 'string' || 
            typeof(obj) === 'string') ? true : false;
        },
        openChangePwdModal() {
            const vm = this;
            vm.isChangePassword = true;
            vm.loginModal = true;
            vm.modalHeadMsg = '變更密碼';
        },
        changePassword() {
            const vm = this;
            if(vm.loginAccount === vm.bossAccount) {
                vm.loginFailMsg = '密碼相同!';
            }else {
                bossRef.set(vm.loginAccount);
                vm.closeModal();
                vm.setBlockModal('變更成功');
            }
        },
        setBlockModal(msg) {
            const vm = this;
            this.blockModal = true;
            this.blockModalMsg = msg;
            /**因為function() {}這裡的獨立作用域指向全局(也就是window)
             * 而window裡沒有blockModal這個變數，所以必須先使用const vm = this;
             * 然後在setTimeout裡使用vm.blockModal
             */
            setTimeout(function() {
                this.blockModal = false;
                // 若不用vm.blockModal，可以用.bind(this)告訴程式是針對這個Vue
            }.bind(this), 3000);
        },
        closeModal() {
            const vm = this;
            vm.loginModal = false;
            vm.loginAccount = '';
            vm.loginFailMsg = '';
            vm.isChangePassword = '';
        }
    },
    computed: {
        salaryAmountDate: function() {
            const vm = this;
            const startDate = new Date(vm.selectedYear, vm.selectedMonth - 1);
            const endDate = new Date(vm.selectedYear, vm.selectedMonth).addDays(-1);
            return startDate.yyyymmddBySlash() + ' 至 ' + endDate.yyyymmddBySlash();
        },
        /** 整理每月份助理資料並帶入table */
        arrangedDBData: function() {
            const vm = this;
            const rtnArr = [];
            if(vm.loginPermit) {
                vm.allSalaryData.forEach(item => {
                    Object.keys(item).forEach(key => {
                        // 若key為id則跳過，只塞object
                        if(!vm.isString(item[key])) {
                            const year = new Date(item[key].date).getFullYear();
                            const month = new Date(item[key].date).getMonth() + 1;
                            if(month === vm.selectedMonth && year === vm.selectedYear) {
                                rtnArr.push(item[key]);
                            }
                        }
                    });
                });
            }
            return rtnArr;
        },
        /** 整理每月份助理薪水並帶入table */
        astEveryMonthSalary: function() {
            const vm = this;
            const allSalaryData = vm.allSalaryData;
            let rtnArr = [];
            if(vm.loginPermit) {
                if(allSalaryData !== null && allSalaryData.length > 0) {
                    allSalaryData.forEach(item => {
                        const name = item.id;
                        let totalSalary = 0;
                        Object.keys(item).forEach(key => {
                            if(!vm.isString(item[key])) {
                                const year = new Date(item[key].date).getFullYear();
                                const month = new Date(item[key].date).getMonth() + 1;
                                if(month === vm.selectedMonth && year === vm.selectedYear) {
                                    totalSalary += item[key].totalMoney;
                                }
                            }
                        });
                        rtnArr.push({name: name, totalSalary: totalSalary});
                    });
                }
            }
            return rtnArr;
        },
        desEveryMonthSalary: function() {
            const vm = this;
            let rtnArr = [];
            if(vm.loginPermit) {
                if(vm.arrangedDBData) {
                    vm.empObjList.filter(obj => obj.empType == 1).forEach(emp => {
                        let designerPay = 0;
                        vm.arrangedDBData.filter(arranged => arranged.designer === emp.empName).forEach(item => {
                            designerPay += item.totalMoney;
                        });
                        rtnArr.push({name: emp.empName, designerPay: designerPay});
                    });
                }
            }
            return rtnArr;
        }
    },
    mounted() {
        const vm = this;
        bossRef.on('value', function(snapshot) {
            const val = snapshot.val();
            vm.bossAccount = val;
        });
        empRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const empData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            // 只帶出助理
            // vm.empObjList = empData.filter(emp => emp.empType === '2');
            vm.empObjList = empData;
        });
        salaryRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const salaryData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null;
            vm.allSalaryData = salaryData;
        });
        for(var i = 2015; i <= new Date().getFullYear(); i++) {
            vm.allYears.push(i);
        }
        vm.allYears.sort((a, b) => b - a);
    },
    directives: {
        focus: {
            update: function (el) {
                el.focus();
            }
        }
    },
    watch: {
        hoverPwdEye: function(val) {
            let password = document.getElementById('accountInput');
            password.setAttribute('type', val ? 'text' : 'password');
            password.focus();
        }
    }
}
</script>

<style scoped>
/** Modal */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-content {
  width:50%;
  margin: 0px auto;
}
.selectionAuto {
    width: auto;
    display: inline;
    height: auto;
    padding: 1px 1px;
}
.btn-outline {
  color: inherit;
  background-color: transparent;
  transition: all .5s;
}
.btn-primary.btn-outline {
  color: #428bca;
}
.btn-success.btn-outline {
  color: #5cb85c;
}
.btn-info.btn-outline {
  color: #5bc0de;
}
.btn-warning.btn-outline {
  color: #f0ad4e;
}
.btn-danger.btn-outline {
  color: #d9534f;
}
.btn-primary.btn-outline:hover,
.btn-success.btn-outline:hover,
.btn-info.btn-outline:hover,
.btn-warning.btn-outline:hover,
.btn-danger.btn-outline:hover {
  color: white;
  background-color: #d9534f;
}

/** black modal */
.icard-list {
    position: fixed;
    top: 80px;
    right: 0;
    border-radius: 10px 0px 0px 10px;
    padding: 11px 4px 0px 4px;
    box-sizing: border-box;
    background: rgba(18, 18, 18, 0.83);
    width: 180px;
    height: auto;
}
.closeWisdom {
    color: #fff;
    text-align: center;
    margin: 4px 0px 4px 0px;
}
</style>
