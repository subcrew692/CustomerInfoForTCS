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
            <td style="width:30%;text-align:left"><button class="btn btn-default btn-sm" @click="changeMember()">切換會員</button></td>
            <td style="width:40%;text-align:center"><img src="../assets/TCS_logo.jpg" class="logoStyle" /></td>
            <td style="width:30%;text-align:right">{{today | dateFormat}}
              <router-link to="/">回首頁 <i class="fa fa-home"></i></router-link>
            </td>
          </tr>
        </table>
      </div>

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
            <td colspan="2" style="width:100%;">
            <div class="panel-heading" :style="{'font-family':'consolas','text-align':'left','display':(bossMobile === mobile && confirmLogIn ? 'block' : 'none')}">
              <span style="cursor:pointer;" @click="modifyEmpArea = !modifyEmpArea">
                <strong><i class="fa fa-user"></i> 員工異動 
                <i class="fa fa-chevron-down" v-if="modifyEmpArea"></i>
                <i class="fa fa-chevron-up" v-if="!modifyEmpArea"></i></strong></span></div>
            </td>
          </tr>
          <tr>
            <td style="width:50%">
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:left;"  v-show="modifyEmpArea">
                <span>新增
                <input type="radio" name="r" value="1" v-model="addEmpType" />設計師
                <input type="radio" name="r" value="2" v-model="addEmpType" />助理
                <input class="form-control selectionAuto" type="text" placeholder="請輸入名字" v-model="addEmpName" />
                <div class="btn btn-info btn-sm" @click="modifyEmp(1)" v-show="addEmpBtn"><i class="fa fa-user"></i> 確認新增</div>
                </span>
                </div>
              </transition>
            </td>
            <td style="width:50%">
              <transition name="fade">
                <div class="panel-heading" style="font-family:consolas;text-align:right;"  v-show="modifyEmpArea">
                  <span>刪除
                    設計師:<select v-model="delDesignerName" class="form-control selectionAuto">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1' && emp.empName !== 'Sunny'">
                        {{emp.empName}}</option>
                    </select>
                    助理:<select v-model="delAssistantName" class="form-control selectionAuto">
                      <option value="none">請選擇</option>
                      <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                    </select>
                    <button class="btn btn-danger btn-sm" @click="modifyEmp(2)" v-show="delEmpBtn"><i class="fa fa-times"></i> 確認刪除</button>
                  </span>
                </div>
              </transition>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 顧客消費區域 -->
      <table border="0" style="text-align:left;width:100%;">
        <tbody>
          <tr>
            <td style="height:50px; width:23%"><i class="far fa-calendar-alt"></i>日期&nbsp;
              <select v-model="designYear" @change="changeDay()" class="form-control selectionAuto"><option v-for="year in allYears">{{year}}</option></select>/
              <select v-model="designMonth" @change="changeDay()" class="form-control selectionAuto"><option v-for="month in allMonths">{{month}}</option></select>/
              <select v-model="designDate" class="form-control selectionAuto"><option v-for="date in allDates">{{date}}</option></select>
            </td>
            <td style="width:23%;"><i class="fa fa-dollar"></i>總金額:&nbsp;&nbsp;{{totalCost}}</td>
            <td style="width:23%;"><i class="fa fa-scissors"></i>設計師&nbsp;&nbsp;
            <select v-model="workDesignerName" class="form-control selectionAuto">
              <option value="none">請選擇</option>
              <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
            </select></td>
            <td style="width:23%;"><i class="fa fa-book"></i>助理&nbsp;&nbsp;
            <select v-model="workAssistantName" class="form-control selectionAuto">
              <option value="none">請選擇</option>
              <option v-for="emp in empObjList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
            </select></td>
            <td rowspan="2"><div class="btn btn-success btn-sm" @click="addCustomerData();"><i class="fa fa-save"></i> 新增資料</div></td>
          </tr>
          <tr>
            <!-- 設計內容 -->
            <td style="height:50px;">
            剪&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="cut" class="form-control selectionAuto"/>
            <input type="checkbox" name="1" value="cutAssistant" id="cutAssistant" v-model="assistantHelps">
            <label for="cutAssistant"><span></span>助理</label></td>
            <td style="height:50px;">
            染&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="dye" class="form-control selectionAuto"/>
            <input type="checkbox" name="1" value="dyeAssistant" id="dyeAssistant" v-model="assistantHelps">
            <label for="dyeAssistant"><span></span>助理</label></td>
            <td style="height:50px;">
            燙&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="burn" class="form-control selectionAuto"/>
            <input type="checkbox" name="1" value="burnAssistant" id="burnAssistant" v-model="assistantHelps">
            <label for="burnAssistant"><span></span>助理</label></td>
            <td style="height:50px;">
            洗&nbsp;&nbsp;<input type="text" style="width:75px;" v-model.number="wash" class="form-control selectionAuto"/>
            <input type="checkbox" name="1" value="washAssistant" id="washAssistant" v-model="assistantHelps">
            <label for="washAssistant"><span></span>助理</label></td>
					</tr>
			  </tbody>
			</table>
      <!-- 顧客消費紀錄 -->
      <div class="panel panel-default">
      <div class="panel-heading customerRecord">
      <div class="row">
        <div class="col-sm-6" style="text-align:left;">
          <div :style="{'display':(bossMobile === mobile && confirmLogIn ? 'inline' : 'none')}">
          <i class="fa fa-phone"></i>以電話號碼搜尋
          <input type="text" class="form-control selectionAuto circle" placeholder="Search by mobile..." v-model="filterByMobile" />
          </div>
        </div>
        <div class="col-sm-6" style="text-align:right;">
          <input type="checkbox" name="2" value="viewConsumeDate" id="viewConsumeDate" v-model="viewConsumeDate">
          <label for="viewConsumeDate"><span></span>使用日期搜尋</label>
          <select v-model="customerViewYear" class="form-control selectionAuto" :disabled="viewConsumeDate.length === 0"><option v-for="year in allYears">{{year}}</option></select>年
          <select v-model="customerViewMonth" class="form-control selectionAuto" :disabled="viewConsumeDate.length === 0"><option v-for="month in allMonths">{{month}}</option></select>月
        </div>
      </div>
      </div>
      
      <table border="1" class="table table-striped table-bordered table-hover" v-show="confirmLogIn && mobile !== bossMobile">
        <tbody>
          <tr>
            <td style="text-align: center;">設計日期</td>
            <td style="text-align: center;">消費金額</td>
            <td style="text-align: center;">設計師</td>
            <td style="text-align: center;">助理</td>
            <td style="text-align: center;">設計內容</td>
            <td style="text-align: center;">刪除紀錄</td>
          </tr>
          <tr v-for="(info, index) in customerPersonData">
            <template v-if="info.mobile === mobile">
              <td>{{info.date}}</td>
              <td>{{info.totalCost}}</td>
              <td>{{info.designer}}</td>
              <td>{{info.assistant === 'none' ? '' : info.assistant}}</td>
              <td>{{info.detail}}</td>
              <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(info.id, info.date, info.totalCost, info.assistant)"></i></td>
            </template>
          </tr>
        </tbody>
      </table>
      </div>
      <!-- 老闆瀏覽所有紀錄 -->
      <table border="1" class="table table-striped table-bordered table-hover" v-show="mobile === bossMobile && confirmLogIn">
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
              <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(info.id, info.date, info.totalCost, info.assistant)"></i></td>
            </template>
          </tr>
        </tbody>
      </table>
      <!-- Message Modal -->
      <div v-show="messageModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content" style="width:30%;">
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
                    <button class="btn btn-primary btn-sm" v-show="delRecordBtn" @click="delRecord(delRecordID,null,null,delRecordAst)">確認刪除</button>
                    <button class="btn btn-primary btn-sm" v-show="confirmAddEmpBtn" @click="modifyEmp(1)">確認</button>
                    <button class="btn btn-primary btn-sm" v-show="confirmDelEmpBtn" @click="modifyEmp(2)">確認</button>
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
                <div class="modal-content" style="width:30%;">
                  <div class="modal-header">
                    <h2 class="modal-title" style="font-family:consolas">Log in</h2>
                  </div>
                  <div class="modal-body">
                    <input type="tel" class="form-control" v-model="mobile" placeholder="請輸入電話號碼" v-on:keyup.13="login()" v-focus/>
                  </div>
                  <div class="modal-footer">
                    <router-link to="/" class="btn btn-default btn-sm">回上層 <i class="fa fa-reply"></i></router-link>
                    <button class="btn btn-primary btn-sm" @click="login()" :style="{'display': mobile==='' ? 'none' : 'inline-block'}">
                    登入 <i class="fa fa-share-square"></i></button>
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
const bossRef = firebase.database().ref('/bossMobile/');
const salaryRef = firebase.database().ref('/salary/');
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
      confirmAddEmpBtn: false, // 確認新增員工
      confirmDelEmpBtn: false, // 確認刪除員工
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
      assistantHelps: [], // 助理協助項目
      addEmpBtn: false, // 新增員工按鍵
      commonCancel: false, // modal取消button
      commonCheck: false, // modal確認button
      delRecordBtn: false, // modal刪除紀錄button
      delRecordID: '', // 刪除紀錄的ID
      delRecordAst: '', // 刪除紀錄的助理
      sortByDate: true, // 預設以日期排序
      sortFromBigToSmall: true, // 預設排序由大到小
      blockModal: false,
      blockModalMsg: '',
      bossMobile: '',
      today: new Date(),
      salaryDataForDeleteUse: [],
      customerViewYear: new Date().getFullYear(), // 顧客瀏覽消費日期年
      customerViewMonth:  new Date().getMonth() + 1, // 顧客瀏覽消費日期月
      viewConsumeDate: [], // 是否使用日期瀏覽消費紀錄
      filterByMobile: '' // 以電話號碼過濾搜尋
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
    modifyEmp(type) {
      const vm = this;
      console.log({'emp name':vm.addEmpName});
      vm.loading = 'block';
      if(type === 1) { // 新增員工
        if(vm.confirmAddEmpBtn === false) {
          vm.callModal(3, '確定新增員工 ' + vm.addEmpName + ' 嗎？');
        }else {
          empRef.push({
            empName: vm.addEmpName,
            empType: vm.addEmpType,
            timeStamp: vm.getTime()
          });
          vm.loading = 'none';
          vm.resetModal();
          vm.setBlockModal('新增成功');
          vm.resetAllInput();
        }
      }else if(type === 2) { // 刪除員工
        // init delete employee object
        var delEmpObj = {
          designer: '',
          assistant: '',
          desId: '',
          assId: '',
          msg: '確定刪除'
        };
        // Designer
        if(vm.delDesignerName !== 'none') {
          for(var i = 0; i < vm.empObjList.length; i++) {
            if(vm.empObjList[i].empName === vm.delDesignerName) {
              vm.loading = 'block';
              var id = vm.empObjList[i].id;
              delEmpObj.designer = vm.delDesignerName;
              delEmpObj.desId = id;
            }
          }
        }
        // Assistant
        if(vm.delAssistantName !== 'none') {
          for(var i = 0; i < vm.empObjList.length; i++) {
            if(vm.empObjList[i].empName === vm.delAssistantName) {
              vm.loading = 'block';
              var id = vm.empObjList[i].id;
              delEmpObj.assistant = vm.delAssistantName;
              delEmpObj.assId = id;
            }
          }
        }
        console.log(delEmpObj);
        if(vm.confirmDelEmpBtn === false) {
          delEmpObj.msg += delEmpObj.designer;
          delEmpObj.msg += delEmpObj.designer === '' ? delEmpObj.assistant : 
          delEmpObj.assistant === '' ? delEmpObj.assistant : '和' + delEmpObj.assistant;
          vm.callModal(4, delEmpObj.msg + '嗎？');
        }else {
          if(delEmpObj.desId !== '') {
            const desRef = firebase.database().ref('/employees/' + delEmpObj.desId);
            desRef.set({});
          }
          if(delEmpObj.assId !== '') {
            const assRef = firebase.database().ref('/employees/' + delEmpObj.assId);
            assRef.set({});
          }
          // 重置
          vm.loading = 'none';
          vm.resetModal();
          vm.setBlockModal('刪除成功');
          vm.resetAllInput();
        }
      }
    },
    getTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth()+1;
      const date = now.getDate();
      return year+'-'+month+'-'+date;
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
        vm.callModal(1, '請選擇設計師');
        return false;
      }
      if(vm.checkValueIsNumber()) {
        if(vm.checkAssistantCheckbox()) {
          vm.loading = 'block';
          var date = vm.designYear + '/' + vm.designMonth + '/' + vm.designDate;
          var cut = vm.cut > 0 ? '剪: ' + vm.cut : '';
          var dye = vm.dye > 0 ? '染: ' + vm.dye : '';
          var burn = vm.burn > 0 ? '燙: ' + vm.burn : '';
          var wash = vm.wash > 0 ? '洗: ' + vm.wash : '';
          var detail = cut + dye + burn + wash;
          var firebaseKey = customerRef.push({
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
          }).getKey();
          vm.calculateAssistantHelps(firebaseKey);
          vm.loading = 'none';
          vm.setBlockModal('紀錄新增成功');
        }
      }
    },
    /** 計算助理費用 */
    calculateAssistantHelps(firebaseKey) {
      const vm = this;
      const assistantHelps = vm.assistantHelps;
      var date = vm.designYear + '/' + vm.designMonth + '/' + vm.designDate;
      var detailStr = '';
      var totalMoney = 0;
      let itemDetail = {};
      if(assistantHelps.length > 0) {
        assistantHelps.forEach(item => {
          switch(item) {
            case 'cutAssistant':
              itemDetail.cut = Math.floor(Number(vm.cut) / 10);
              detailStr += '剪: ' + itemDetail.cut;
              totalMoney += itemDetail.cut;
              break;
            case 'dyeAssistant':
              itemDetail.dye = Math.floor(Number(vm.dye) / 10);
              detailStr += '染: ' + itemDetail.dye;
              totalMoney += itemDetail.dye;
              break;
            case 'burnAssistant':
              itemDetail.burn = Math.floor(Number(vm.burn) / 10);
              detailStr += '燙: ' + itemDetail.burn;
              totalMoney += itemDetail.burn;
              break;
            case 'washAssistant':
              itemDetail.wash = 30;
              detailStr += '洗: ' + itemDetail.wash;
              totalMoney += itemDetail.wash;
              break;
          }
        });
        itemDetail.date = date;
        itemDetail.assistant = vm.workAssistantName;
        itemDetail.recordKey = firebaseKey;
        itemDetail.detail = detailStr;
        itemDetail.totalMoney = totalMoney;
        itemDetail.designer = vm.workDesignerName;
        salaryRef.child(itemDetail.assistant).push(itemDetail);
      }
    },
    /** 檢查助理checkbox打勾是否有填金額 */
    checkAssistantCheckbox() {
      const vm = this;
      const assistantHelps = vm.assistantHelps;
      var inputCurrect = true;
      
      if(assistantHelps.length > 0) {
        // 檢查助理checkbox有打勾且有選擇助理
        if(vm.workAssistantName !== 'none') {
          assistantHelps.forEach(item => {
            // 前面已經檢查過是否為數字，所以這裡只需判斷是否為空值
            if((item === 'cutAssistant' && vm.cut === '') || 
            (item === 'dyeAssistant' && vm.dye === '') ||
            (item === 'burnAssistant' && vm.burn === '') ||
            (item === 'washAssistant' && vm.wash === '')) {
              inputCurrect = false;
              vm.callModal(1, '金額有誤');
            }else {
              inputCurrect = true;
            }
          });
        }else {
          inputCurrect = false;
          vm.callModal(1, '請選擇助理');
        }        
      }
      return inputCurrect;
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
        vm.callModal(1, msg + '欄位輸入有誤');
        return false;
      }else if(Number(vm.totalCost) === 0)  {
        vm.callModal(1, '免費嗎??');
        return false;
      }else {
        return true;
      }
    },
    /** 刪除紀錄 */
    delRecord(id, dat, money, ast) {
      const vm = this;
      vm.loading = 'block';
      if(vm.delRecordBtn === false) {
        vm.delRecordID = id;
        vm.delRecordAst = ast;
        vm.callModal(2, '刪除資料：' + dat + '，消費金額：$' + money);
      }else {
        // 刪除紀錄
        const delRef = firebase.database().ref('/customers/' + id);
        delRef.set({});
        /** json格式如下
         * salary: {
         *  Eason: [{key: {rec: }, {key: {rec: }}],
         *  Amber: [{key: {rec: }, {key: {rec: }}]
         * }
         */
        // 先filter找出該筆刪除資料的助理的所有紀錄
        const deleteDataAst = vm.salaryDataForDeleteUse.filter(item => {
          console.log(`${item.id} === ${ast} : ${item.id === ast}`);
          return item.id === ast;
        });
        // 找出當初新增資料塞的對應key
        const delKey = Object.keys(deleteDataAst[0]).find(key =>  {
          // console.log(deleteDataAst[0][key]);
          return deleteDataAst[0][key].recordKey === id;
        });
        // console.log(delKey);
        const salaryDelRef = firebase.database().ref('/salary/' + ast + '/' + delKey);
        salaryDelRef.set({});

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
      vm.infoMsg = msg;
      if(type === 1) { // 一般訊息
        // vm.commonCancel = true;
        vm.commonCheck = true;
      }else if(type === 2) { // 刪除紀錄
        vm.commonCancel = true;
        vm.delRecordBtn = true;
      }else if(type === 3) { // 新增員工
        vm.commonCancel = true;
        vm.confirmAddEmpBtn = true;
      }else if(type === 4) { // 刪除員工
        vm.commonCancel = true;
        vm.confirmDelEmpBtn = true;
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
      vm.confirmDelEmpBtn = false;
      vm.confirmAddEmpBtn = false;
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
      vm.viewConsumeDate = [];
      vm.customerViewYear = new Date().getFullYear();
      vm.customerViewMonth = new Date().getMonth() + 1;
    },
    genUuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    },
    filterViewDate(date) {
      const sameYear = new Date(date).getFullYear() === Number(this.customerViewYear);
      const sameMonth = new Date(date).getMonth() + 1 === Number(this.customerViewMonth);
      return sameYear && sameMonth;
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
    /** 老闆瀏覽區 */
    reverseInfo: function() {
      const vm = this;
      var sortInfo = vm.consumeInfo;
      if(sortInfo !== null && sortInfo.length > 0) {
        // 指定日期搜尋
        if(vm.viewConsumeDate.length > 0) {
          sortInfo = sortInfo.filter(consume => vm.filterViewDate(consume.date));
        }
        // 電話過濾搜尋
        if(vm.filterByMobile !== '') {
          const searchMobile = vm.filterByMobile;
          sortInfo = sortInfo.filter(consume => consume.mobile.indexOf(searchMobile) >= 0);
        }
        sortInfo.sort(function(a, b) {
          // 依照日期排序
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
    },
    /** 顧客消費紀錄資料 */
    customerPersonData: function() {
      const vm = this;
      const consumeArr = vm.consumeInfo;
      let rtnInfo = [];
      if(consumeArr !== null && consumeArr.length > 0) {
        // 先以門號找出該會員的所有資料
        rtnInfo = consumeArr.filter(consume => consume.mobile === vm.mobile);
        // 若使用日期搜尋
        if(vm.viewConsumeDate.length > 0) {
          rtnInfo = consumeArr.filter(consume => vm.filterViewDate(consume.date));
        }
      }
      return rtnInfo;
    }
  },
  beforeMount() {
    this.loading = 'block';
    // console.log('beforeMount');
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
      vm.bossMobile = val;
    });
    salaryRef.on('value', function(snapshot) {
      const val = snapshot.val();
      const data = val
        ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
        : null
      vm.salaryDataForDeleteUse = data;
    })
    // init year, month, date
    const now = new Date();
    for(var i = 2015; i <= now.getFullYear(); i++) {
      vm.allYears.push(i);
    }
    vm.allYears.sort((a, b) => b - a);
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
/** selection */
.selectionAuto {
  width: auto;
  display: inline;
  height: auto;
  padding: 1px 1px;
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

.customerRecord {
  background-color:azure;
}

/** fade */
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

/** Checkbox */
input[type="checkbox"] {
    display:none;
}

input[type="checkbox"] + label {
    color:#000000;
}

input[type="checkbox"] + label span {
    display:inline-block;
    width:19px;
    height:19px;
    margin:-2px 0 0 0;
    vertical-align:middle;
    background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/check_radio_sheet.png) left top no-repeat;
    cursor:pointer;
}

input[type="checkbox"]:checked + label span {
    background:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/check_radio_sheet.png) -19px top no-repeat;
}

/** 搜尋電話text */
.circle {
  border-radius: 20px;
  padding: 2px 5px 2px 8px; /* 上 右 下 左*/
}

.logoStyle {
  width: 100px;
  height: 100px;
}
</style>
