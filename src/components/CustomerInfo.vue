<template>
  <div class="container">
		<div class="row">
			<div align="center"><h1>TCS</h1></div>
      <!-- loading area -->
      <div class="loading" :style="{'display':loading, 'cursor':'wait'}">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <!-- Employee Modify Area -->
      <table style="width:100%;">
        <tbody>
          <tr>
            <td colspan="2" style="width:100%;"><div class="panel-heading" style="font-family:consolas;text-align:left;">
              <span style="font-size:25px;cursor:pointer;" @click="modifyEmpArea = !modifyEmpArea">
                <strong>員工異動 
                <i class="fa fa-chevron-down" v-if="!modifyEmpArea"></i>
                <i class="fa fa-chevron-up" v-if="modifyEmpArea"></i></strong></span></div>
            </td>
          </tr>
          <tr>
            <td style="width:50%">
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:left;"  v-show="modifyEmpArea">
                <span style="font-size:18px;">新增
                <input type="radio" name="r" value="1" v-model="addEmpType" />設計師
                <input type="radio" name="r" value="2" v-model="addEmpType" />助理
                <input class="form-controll" type="text" placeholder="請輸入名字" v-model="addEmpName" />
                <div class="btn btn-info" @click="addEmp()"><i class="fa fa-user"></i> 確認新增</div>
                </span>
                </div>
              </transition>
            </td>
            <td style="width:50%">
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:right;"  v-show="modifyEmpArea">
                  <span style="font-size:18px;">刪除
                    設計師:<select v-model="delDesignerName">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
                    </select>
                    助理:<select v-model="delAssistantName">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                    </select>
                    <button class="btn btn-danger" @click="deleteEmp()"><i class="fa fa-times"></i> 確認刪除</button>
                  </span>
                </div>
              </transition>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 顧客消費區域 -->
      <table border="0" style="text-align:left;width:100%;font-size:20px;">
        <tbody>
          <tr>
            <td style="height:50px; width:23%"><i class="far fa-calendar-alt"></i>日期&nbsp;
              <select v-model="designYear" @change="changeDay()"><option v-for="year in allYears">{{year}}</option></select>/
              <select v-model="designMonth" @change="changeDay()"><option v-for="month in allMonths">{{month}}</option></select>/
              <select v-model="designDate"><option v-for="date in allDates">{{date}}</option></select>
            </td>
            <td style="width:23%;"><i class="fa fa-dollar"></i>總金額:&nbsp;&nbsp;{{totalCost}}</td>
            <td style="width:23%;"><i class="fa fa-scissors"></i>設計師&nbsp;&nbsp;
            <select v-model="workDesignerName">
              <option value="none">請選擇</option>
              <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
            </select></td>
            <td style="width:23%;"><i class="fa fa-bars"></i>助理&nbsp;&nbsp;
            <select v-model="workAssistantName">
              <option value="none">請選擇</option>
              <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
            </select></td>
            <td rowspan="2"><div class="btn btn-success" @click="addCustomerData();"><i class="fa fa-save"></i> 新增資料</div></td>
          </tr>
          <tr>
            <td style="height:50px;">
            剪&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="cut"/></td>
            <td style="height:50px;">
            染&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="dye"/></td>
            <td style="height:50px;">
            燙&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="burn"/></td>
            <td style="height:50px;">
            洗&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="wash"/></td>
					</tr>
			  </tbody>
			</table>
      <!-- 顧客消費紀錄 -->
      <table border="1" style="text-align:center;width:80%;font-size:20px;" align="center">
        <tbody>
          <tr>
            <td style="text-align: center;">編號</td>
            <td style="text-align: center;">設計日期</td>
            <td style="text-align: center;">消費金額</td>
            <td style="text-align: center;">設計師</td>
            <td style="text-align: center;">助理</td>
            <td style="text-align: center;">設計內容</td>
            <td style="text-align: center;">刪除紀錄</td>
          </tr>
          <tr v-for="(info, index) in reverseInfo">
            <td>{{index}}</td>
            <td>{{info.date}}</td>
            <td>{{info.totalCost}}</td>
            <td>{{info.designer}}</td>
            <td>{{info.assistant === 'none' ? '' : info.assistant}}</td>
            <td>{{info.detail}}</td>
            <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(info.id)"></i></td>
          </tr>
        </tbody>
      </table>

		</div>
    <!-- Message Modal -->
    <div v-show="messageModal" class="madal">
      <div class="modal__container">
        <header class="modal__header">
          <h2 class="view-title">Info Message</h2>
        </header>
        <div class="modal__body">
          <h3 style="text-align:center;">{{infoMsg}}</h3>
        </div>
        <footer class="modal__footer"></footer>
      </div>
    </div>
  </div>
</template>

<script>
const empRef = firebase.database().ref('/employees/');
const customerRef = firebase.database().ref('/customers/');
export default {
  name: 'HelloWorld',
  data () {
    return {
      mobile: '0987808488',
      loading: 'none', // loading畫面
      addEmpType: '1', // 預設新增員工職業
      addEmpName: '', // 新增員工姓名
      empObjList: [], // 員工資訊
      consumeInfo: [], //顧客消費資訊
      delDesignerName: 'none', // 刪除設計師
      delAssistantName: 'none',// 刪除助理
      workDesignerName: 'none',
      workAssistantName: 'none',
      messageModal: false,
      infoMsg: '',
      modifyEmpArea: false, // 員工異動區域
      designYear: new Date().getFullYear(),
      designMonth: new Date().getMonth()+1,
      designDate: new Date().getDate(),
      allYears: [],
      allMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
      monthDates: [31,28,31,30,31,30,31,31,30,31,30,31],
      allDates: [],
      cut: '',
      dye: '',
      burn: '',
      wash: ''
    }
  },
  methods: {
    /** 新增員工 */
    addEmp() {
      const vm = this;
      console.log({'emp name':vm.addEmpName});
      vm.loading = true;
      empRef.push({
        empName: vm.addEmpName,
        empType: vm.addEmpType,
        timeStamp: vm.getTime()
      });
      vm.loading = false;
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
            vm.loading = true;
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
            vm.loading = true;
            var id = vm.empObjList[i].id;
            const delRef = firebase.database().ref('/employees/' + id);
            delRef.set({});
            // 重置
            vm.delAssistantName = 'none';
          }
        }
      }
      vm.loading = false;
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
        alert('Are you kidding me?!');
        return false;
      }
      if(vm.checkValueIsNumber()) {
        vm.loading = true;
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
        vm.loading = false;
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
        alert(msg + '欄位輸入有誤');
        return false;
      }else if(Number(vm.totalCost) === 0)  {
        alert('for free?? sober up ok?');
        return false;
      }else {
        return true;
      }
    },
    /** 刪除紀錄 */
    delRecord(id) {
      const vm = this;
      vm.loading = true;
      console.log(id);
      const delRef = firebase.database().ref('/customers/' + id);
      delRef.set({});
      vm.loading = false;
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
      return this.consumeInfo.reverse();
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
    // init year, month, date
    const now = new Date();
    for(var i = 1911; i <= now.getFullYear(); i++) {
      vm.allYears.push(i);
    }
    for(var i = 1; i<= 31; i++) {
      vm.allDates.push(i);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* modal */
.modal {
  z-index: 3;
  padding: 50px 0px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  animation: opac 0.8s;
  letter-spacing: 2px;
  text-align: unset;
}
.modal__container {
  margin: auto;
  position: relative;
  padding: 10px;
  outline: 0;
  max-width: 300px;
}
.modal__header {
  color: #fff;
  background-color: #2B364B;
  padding: 10px;
  text-align: center;
  border-radius: 5px 5px 0px 0px;
}
.modal__body {
  background-color: #fff;
  padding: 20px 50px;
  text-align: center;
}
.modal__body p {
  text-align: left;
  line-height: 24px;
}
.modal__img {
  max-width: 100%;
}
.modal__footer {
  color: #fff;
  background-color: #2B364B;
  height: 8px;
  border-radius: 0px 0px 5px 5px;
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
</style>
