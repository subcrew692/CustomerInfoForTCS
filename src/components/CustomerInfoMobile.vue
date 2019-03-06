<template>
  <div class="container">
      <!-- blockModal Area -->
      <div class="icard-list" v-show="confirmLogIn">
        <p class="closeWisdom" v-show="mobile !== bossMobile">會員：{{mobile}}</p>
        <p class="closeWisdom" v-show="mobile === bossMobile">老闆您好!</p>
        <transition name="fade">
          <h4 class="closeWisdom" v-show="blockModal">{{blockModalMsg}}</h4>
        </transition>
      </div>
      <!-- change member area -->
      <div class="col-xs-12">
        <table width="100%">
          <tr>
            <td style="width:50%;text-align:left"><button class="btn btn-default btn-sm" @click="changeMember()">切換會員</button></td>
            <td style="width:50%;text-align:right">{{today | dateFormat}}</td>
          </tr>
        </table>
      </div>
      

	    <div align="center"><h1>TCS</h1></div>

      <!-- loading area -->
      <div class="loading" :style="{'display':loading, 'cursor':'wait'}">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <!-- Employee Modify Area -->
      <table class="col-xs-12">
        <tbody>
          <tr>
            <td colspan="2" style="width:100%;"><div class="panel-heading" style="font-family:consolas;text-align:left;">
              <span style="cursor:pointer;" @click="modifyEmpArea = !modifyEmpArea">
                <strong><i class="fa fa-user"></i> 員工異動 
                <i class="fa fa-chevron-down" v-if="!modifyEmpArea"></i>
                <i class="fa fa-chevron-up" v-if="modifyEmpArea"></i></strong></span></div>
            </td>
          </tr>
          <tr>
            <td>
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:left;"  v-show="modifyEmpArea">
                <span>新增
                <input type="radio" name="r" value="1" v-model="addEmpType" />設計師
                <input type="radio" name="r" value="2" v-model="addEmpType" />助理
                <input class="form-controll" type="text" placeholder="請輸入名字" v-model="addEmpName" />
                <div class="btn btn-info btn-sm" @click="addEmp()" v-show="addEmpBtn"><i class="fa fa-user"></i> 確認新增</div>
                </span>
                </div>
              </transition>
            </td>
          </tr>
          <tr>
            <td>
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:left;"  v-show="modifyEmpArea">
                  <span>刪除
                    設計師:<select v-model="delDesignerName">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
                    </select>
                    助理:<select v-model="delAssistantName">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                    </select>
                    <button class="btn btn-danger btn-sm" @click="deleteEmp()" v-show="delEmpBtn"><i class="fa fa-times"></i> 確認刪除</button>
                  </span>
                </div>
              </transition>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 顧客消費區域 -->
      <div class="col-xs-12">
        <table border="0" style="text-align:left;">
          <tbody>
            <tr>
              <td style="height:50px; width:23%" colspan="2"><i class="far fa-calendar-alt"></i>日期&nbsp;
                <select v-model="designYear" @change="changeDay()"><option v-for="year in allYears">{{year}}</option></select>/
                <select v-model="designMonth" @change="changeDay()"><option v-for="month in allMonths">{{month}}</option></select>/
                <select v-model="designDate"><option v-for="date in allDates">{{date}}</option></select>
              </td>
            </tr>
            <tr>
              <td style="width:23%;"><i class="fa fa-dollar"></i>總金額:&nbsp;&nbsp;{{totalCost}}</td>
              <td><div class="btn btn-success btn-sm" @click="addCustomerData();"><i class="fa fa-save"></i> 新增資料</div></td>
            </tr>
            <tr>
              <td style="width:23%;"><i class="fa fa-scissors"></i>設計師&nbsp;&nbsp;
              <select v-model="workDesignerName">
                <option value="none">請選擇</option>
                <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
              </select></td>
              <td style="width:23%;"><i class="fa fa-book"></i>助理&nbsp;&nbsp;
              <select v-model="workAssistantName">
                <option value="none">請選擇</option>
                <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
              </select></td>
            </tr>
            <tr>
              <td style="height:50px;">
              剪&nbsp;&nbsp;<input type="tel" style="width:75px;" v-model.number="cut"/></td>
              <td style="height:50px;">
              染&nbsp;&nbsp;<input type="tel" style="width:75px;" v-model.number="dye"/></td>
            </tr>
            <tr>
              <td style="height:50px;">
              燙&nbsp;&nbsp;<input type="tel" style="width:75px;" v-model.number="burn"/></td>
              <td style="height:50px;">
              洗&nbsp;&nbsp;<input type="tel" style="width:75px;" v-model.number="wash"/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 顧客消費紀錄 -->
      <div class="col-xs-12">
        <table border="1" class="table table-striped table-bordered table-hover col-xs-12" v-show="confirmLogIn && mobile !== bossMobile">
          <tbody>
            <tr>
              <td style="text-align: center;">設計日期</td>
              <td style="text-align: center;">消費金額</td>
              <td style="text-align: center;">設計師</td>
              <td style="text-align: center;">助理</td>
              <td style="text-align: center;">設計內容</td>
              <td style="text-align: center;">刪除紀錄</td>
            </tr>
            <tr v-for="(info, index) in reverseInfo">
              <template v-if="info.mobile === mobile">
                <td>{{info.date}}</td>
                <td>{{info.totalCost}}</td>
                <td>{{info.designer}}</td>
                <td>{{info.assistant === 'none' ? '' : info.assistant}}</td>
                <td>{{info.detail}}</td>
                <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(info.id, info.date, info.totalCost)"></i></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 老闆瀏覽所有紀錄 -->
      <div class="col-xs-12">
        <table border="1" class="table table-striped table-bordered table-hover col-xs-12" v-show="mobile === bossMobile && confirmLogIn">
          <tbody>
            <tr>
              <td style="text-align: center;"><span  @click="sortByDate=false;sortFromBigToSmall=!sortFromBigToSmall" style="cursor:pointer">
              會員電話 <i class="fa fa-sort"></i></span></td>
              <td style="text-align: center;"><span @click="sortByDate=true;sortFromBigToSmall=!sortFromBigToSmall" style="cursor:pointer">
              日期 <i class="fa fa-sort"></i></span></td>
              <td style="text-align: center;">消費金額</td>
              <td style="text-align: center;">設計師</td>
              <td style="text-align: center;">助理</td>
              <td style="text-align: center;">設計內容</td>
              <td style="text-align: center;">刪除紀錄</td>
            </tr>
            <tr v-for="(info, index) in reverseInfo">
              <template>
                <td>{{info.mobile}}</td>
                <td>{{info.date}}</td>
                <td>{{info.totalCost}}</td>
                <td>{{info.designer}}</td>
                <td>{{info.assistant === 'none' ? '' : info.assistant}}</td>
                <td>{{info.detail}}</td>
                <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(info.id, info.date, info.totalCost)"></i></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Message Modal -->
      <div v-show="messageModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" @click="resetModal()">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 class="modal-title" style="font-family:consolas">Infomation</h2>
                  </div>
                  <div class="modal-body">
                    {{infoMsg}}
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-default btn-sm" v-show="commonCancel" @click="resetModal()">取消</button>
                    <button class="btn btn-primary btn-sm" v-show="commonCheck" @click="resetModal()">確認</button>
                    <button class="btn btn-primary btn-sm" v-show="delRecordBtn" @click="delRecord(delRecordID,null,null)">確認刪除</button>
                  </div>
                </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- Log in -->
      <div v-show="loginModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content">
                  <div class="modal-header">
                    <h2 class="modal-title" style="font-family:consolas">Log in</h2>
                  </div>
                  <div class="modal-body">
                    <input size="14" type="tel" v-model="mobile" placeholder="請輸入電話號碼" v-on:keyup.13="login()" v-focus/>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary btn-sm" @click="login()" :disabled="mobile===''">登入</button>
                  </div>
                </div>
            </div>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
var timer;
const empRef = firebase.database().ref('/employees/');
const customerRef = firebase.database().ref('/customers/');
const bossRef = firebase.database().ref('/boss/');
export default {
  name: 'HelloWorld',
  data () {
    return {
      mobile: '',
      loginModal: true, // 登入畫面
      confirmLogIn: false, // 確認登入後再show消費紀錄
      loading: 'none', // loading畫面
      addEmpType: '1', // 預設新增員工職業
      addEmpName: '', // 新增員工姓名
      empObjList: [], // 員工資訊
      consumeInfo: [], //顧客消費資訊
      delDesignerName: 'none',  // 刪除設計師
      delAssistantName: 'none', // 刪除助理
      workDesignerName: 'none',
      workAssistantName: 'none',
      messageModal: false, // 開啟modal
      infoMsg: '', // modal訊息
      modifyEmpArea: false, // 員工異動區域
      designYear: new Date().getFullYear(), // 預設年
      designMonth: new Date().getMonth()+1, // 預設月
      designDate: new Date().getDate(), // 預設日
      allYears: [],
      allMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
      monthDates: [31,28,31,30,31,30,31,31,30,31,30,31],
      allDates: [],
      cut: '',
      dye: '',
      burn: '',
      wash: '',
      addEmpBtn: false, // 新增員工按鍵
      commonCancel: false, // modal取消button
      commonCheck: false, // modal確認button
      delRecordBtn: false, // modal刪除紀錄button
      delRecordID: '', // 刪除紀錄的ID
      sortByDate: true, // 預設以日期排序
      sortFromBigToSmall: true, // 預設排序由大到小
      blockModal: false,
      blockModalMsg: '',
      bossMobile: '',
      today: new Date()
    }
  },
  methods: {
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
    /** 新增員工 */
    addEmp() {
      const vm = this;
      console.log({'emp name':vm.addEmpName});
      vm.loading = 'block';
      empRef.push({
        empName: vm.addEmpName,
        empType: vm.addEmpType,
        timeStamp: vm.getTime()
      });
      vm.loading = 'none';
      vm.setBlockModal('新增成功');
    },
    getTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth()+1;
      const date = now.getDate();
      return year+'-'+month+'-'+date;
    },
    /** 刪除員工 */
    deleteEmp() {
      const vm = this;
      // Designer
      if(vm.delDesignerName !== 'none') {
        for(var i = 0; i < vm.empObjList.length; i++) {
          if(vm.empObjList[i].empName === vm.delDesignerName) {
            vm.loading = 'block';
            var id = vm.empObjList[i].id;
            const delRef = firebase.database().ref('/employees/' + id);
            delRef.set({});
            // 重置
            vm.delDesignerName = 'none';
            // vm.messageModal = true;
            // vm.infoMsg = '刪除成功';
          }
        }
      }
      // Assistant
      if(vm.delAssistantName !== 'none') {
        for(var i = 0; i < vm.empObjList.length; i++) {
          if(vm.empObjList[i].empName === vm.delAssistantName) {
            vm.loading = 'block';
            var id = vm.empObjList[i].id;
            const delRef = firebase.database().ref('/employees/' + id);
            delRef.set({});
            // 重置
            vm.delAssistantName = 'none';
          }
        }
      }
      vm.loading = 'none';
      vm.setBlockModal('刪除成功');
    },
    /** 日期調整 */
    changeDay() {
      const vm = this;
      const curYear = vm.designYear;
      const curMonth = vm.designMonth;
      if(curMonth === '2') {
        vm.monthDates[1] = vm.checkLeapYear(curYear);
      }
      // 先重置天數
      vm.allDates = [];
      for(var i = 1; i <= vm.monthDates[curMonth-1]; i++) {
        vm.allDates.push(i);
      }
    },
    /** 檢查閏月 */
    checkLeapYear(year) {
      return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28;
    },
    /** 新增顧客消費資訊 */
    addCustomerData() {
      const vm = this;
      const cost = this.totalCost;
      const des = this.workDesignerName;
      const ast = this.workAssistantName;
      if(des === 'none') {
        vm.setBlockModal('請選擇設計師');
        return false;
      }
      if(vm.checkValueIsNumber()) {
        vm.loading = 'block';
        var date = vm.designYear + '/' + vm.designMonth + '/' + vm.designDate;
        var cut = vm.cut > 0 ? '剪: ' + vm.cut : '';
        var dye = vm.dye > 0 ? '染: ' + vm.dye : '';
        var burn = vm.burn > 0 ? '燙: ' + vm.burn : '';
        var wash = vm.wash > 0 ? '洗: ' + vm.wash : '';
        var detail = cut + dye + burn + wash;
        console.log(date);
        customerRef.push({
          mobile: vm.mobile,
          date: date,
          totalCost: vm.totalCost,
          designer: vm.workDesignerName,
          assistant: vm.workAssistantName,
          cut: cut,
          dye: dye,
          burn: burn,
          wash: wash,
          detail: detail
        });
        vm.loading = 'none';
        vm.setBlockModal('紀錄新增成功');
      }
    },
    /** 先檢查消費欄位是否皆為數字 */
    checkValueIsNumber() {
      const vm = this;
      let msg = '';
      msg += isNaN(vm.cut) ? '剪 ' : '';
      msg += isNaN(vm.dye) ? '染 ' : '';
      msg += isNaN(vm.burn) ? '燙 ' : '';
      msg += isNaN(vm.wash) ? '洗 ' : '';
      if(msg.length > 0) {
        vm.setBlockModal(msg + '欄位輸入有誤');
        return false;
      }else if(Number(vm.totalCost) === 0)  {
        vm.setBlockModal('免費嗎??');
        return false;
      }else {
        return true;
      }
    },
    /** 刪除紀錄 */
    delRecord(id, dat, money) {
      const vm = this;
      vm.loading = 'block';
      console.log(id);
      if(vm.delRecordBtn === false) {
        vm.delRecordID = id;
        vm.callModal(2, '刪除資料：' + dat + '，消費金額：$' + money);
      }else {
        const delRef = firebase.database().ref('/customers/' + id);
        delRef.set({});
        vm.loading = 'none';
        vm.resetModal(); // 關閉message modal
        vm.setBlockModal('紀錄刪除成功');
        vm.delRecordID = '';
      }
    },
    /** 呼叫Modal */
    callModal(type, msg) {
      const vm = this;
      vm.resetModal(); // 先重置Modal
      vm.messageModal = true;
      vm.infoMsg = '';
      if(type === 1) { // 一般訊息
        vm.commonCancel = true;
        vm.commonCheck = true;
        vm.infoMsg = msg;
      }else if(type === 2) { // 刪除紀錄
        vm.commonCancel = true;
        vm.infoMsg = msg;
        vm.delRecordBtn = true;
      }
    },
    resetModal() {
      const vm = this;
      vm.messageModal = false;
      vm.loginModal = false;
      vm.infoMsg = '';
      // 關閉所有button
      vm.commonCancel = false;
      vm.commonCheck = false;
      vm.delRecordBtn = false;
    },
    login() {
      this.resetModal();
      this.confirmLogIn = true;
    },
    /** 切換會員 */
    changeMember() {
      const vm = this;
      vm.mobile='';
      vm.loginModal=true;
      vm.confirmLogIn=false;
      vm.resetAllInput();
    },
    /** 重置所有 */
    resetAllInput() {
      const vm = this;
      vm.cut = '';
      vm.dye = '';
      vm.burn = '';
      vm.wash = '';
      vm.workDesignerName = 'none';
      vm.workAssistantName = 'none';
      vm.designYear = new Date().getFullYear(); // 預設年
      vm.designMonth = new Date().getMonth()+1; // 預設月
      vm.designDate = new Date().getDate(); // 預設日
      vm.addEmpName = '';
      vm.addEmpType = '1';
      vm.modifyEmpArea = false;
      vm.delDesignerName = 'none';
      vm.delAssistantName = 'none';
    }
  },
  computed: {
    totalCost: function() {
      const vm = this;
      var cost = 0;
      if(!isNaN(vm.cut) && Number(vm.cut) > 0) {
        cost += Number(vm.cut);
      }
      if(!isNaN(vm.dye) && Number(vm.dye) > 0) {
        cost += Number(vm.dye);
      }
      if(!isNaN(vm.burn) && Number(vm.burn) > 0) {
        cost += Number(vm.burn);
      }
      if(!isNaN(vm.wash) && Number(vm.wash) > 0) {
        cost += Number(vm.wash);
      }
      return cost;
    },
    reverseInfo: function() {
      const vm = this;
      var sortInfo = vm.consumeInfo;
      if(sortInfo !== null && sortInfo.length > 0) {
        sortInfo.sort(function(a, b) {
          if(vm.sortByDate) {
            if(vm.sortFromBigToSmall) {
              // 由大到小
              return new Date(b.date) - new Date(a.date);
            }else {
              // 由小到大
              return new Date(a.date) - new Date(b.date);
            }
          }else {
            if(vm.sortFromBigToSmall) {
              return b.mobile - a.mobile;
            }else {
              return a.mobile - b.mobile;
            }
          }
        });
      }
      return sortInfo;
    },
    delEmpBtn: function() {
      return (this.delDesignerName !== 'none' || this.delAssistantName !== 'none') ? true : false;
    }
  },
  beforeMount() {
    this.loading = 'block';
    console.log('beforeMount');
  },
  updated() {
    if(this.empObjList.length > 0 && this.bossMobile !== '') {
      this.loading = 'none';
    }else {
      this.loading = 'block';
    }
  },
  mounted() {
    const vm = this;
    empRef.on('value', function(snapshot) {
      const val = snapshot.val();
      const empData = val
        ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
        : null
      vm.empObjList = empData;
    });
    customerRef.on('value', function(snapshot) {
      const val = snapshot.val();
      const costInfo = val
        ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
        : null
      vm.consumeInfo = costInfo;
    });
    bossRef.on('value', function(snapshot) {
      const val = snapshot.val();
      console.log(val);
      vm.bossMobile = val;
    });
    // init year, month, date
    const now = new Date();
    for(var i = 1911; i <= now.getFullYear(); i++) {
      vm.allYears.push(i);
    }
    for(var i = 1; i<= 31; i++) {
      vm.allDates.push(i);
    }
    timer = setInterval(() => {
      vm.today = new Date();
    }, 1000);
  },
  watch: {
    addEmpName: function(val) {
      this.addEmpBtn = val !== '' ? true : false;
    }
  },
  directives: {
    focus: {
      update: function (el) {
        el.focus();
      }
    }
  },
  filters: {
    dateFormat: function(el) {
      return moment(el).format("HH:mm:ss");
    }
  },
  beforeDestroy() {
    clearInterval(timer);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
/**  loading */
.loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ccc;
    opacity: 0.5;
}
.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
}
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}
.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
.table_record {
  padding: 10px;
}

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
