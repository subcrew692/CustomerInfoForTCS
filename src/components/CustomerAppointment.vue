<template>
<div>
  <div class="container">
    <div style="text-align:right"><h4><router-link to="/">回首頁 <i class="fa fa-home"></i></router-link></h4></div>
    <h2>顧客預約</h2>
    <div class="panel">
        <table width="100%">
            <tr>
                <td style="width:25%;text-align:left"><div class="panel-heading">
                <span style="cursor:pointer;" @click="addAppointmentArea = !addAppointmentArea"> 新增預約 <i class="fa fa-plus"></i></span>
                
                </div></td>
            </tr>
            <tr>
                <td><transition name="fade"><div class="panel-heading" v-show="addAppointmentArea">
                <table width="100%"><tr>
                <td style="width:25%;text-align:left">
                    請輸入顧客電話: <br/><input type="tel" class="form-control selectionAuto" />
                </td>
                <td style="width:25%;text-align:left">
                    請選擇設計時段: <br/>
                    <select class="form-control selectionAuto">
                        <option v-for="time in aptTimeArr" value="time">{{time}}:00</option>
                    </select>
                </td>
                <td style="width:25%;text-align:left">
                    請輸入設計時長: <br/><input type="tel" class="form-control selectionAuto" />
                </td>
                <td style="width:25%;text-align:right">
                    <button class="btn btn-success" @click="addAppointment()">確認</button>
                </td>
                </tr></table>
                </div></transition></td>
            </tr>
            <tr>
                <td style="width:25%;text-align:left"><div class="panel-heading">
                <span style="cursor:pointer;" @click="queryAppointmentArea = !queryAppointmentArea">查詢預約 <i class="fa fa-search"></i></span>
                
                </div></td>
            </tr>
            <tr>
                <transition name="fade"><div class="panel-heading" v-show="queryAppointmentArea">
                    <table width="100%"><tr>
                <td style="width:25%;text-align:left">
                    請選擇欲檢視的日期： <input type="date" class="form-control dateStyle" v-model="selectedDate" />
                </td>
                </tr></table>
                </div>
                </transition>
            </tr>
        </table>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <table width="100%">
                <tr>
                    <td style="width:50%;text-align:left;">查詢時段：{{selectedDate}}</td>
                    <td style="width:50%;text-align:right;"></td>
                </tr>
            </table>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li v-for="emp in empObjList">
                <a :href="'#'+emp.empName" data-toggle="tab" aria-expanded="false">{{emp.empName}}</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div v-for="emp in empObjList" class="tab-pane fade" :id="emp.empName">

                </div>
            </div>
        </div>
        <!-- /.panel-body -->
    </div>
  </div>
</div>
</template>

<script>
Date.prototype.yyyymmddByDash = function() {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd);
};
const empRef = firebase.database().ref('/employees');
export default {
    name: 'appointment',
    data() {
        return {
            selectedDate: new Date().yyyymmddByDash(),
            allYears: [],
            allMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
            empObjList: [],
            addAppointmentArea: false,
            queryAppointmentArea: false,
            aptPhone: '',
            aptTime: 12,
            aptLong: ''
        }
    },
    methods: {
        addAppointment() {

        },
        checkValidInput() {
            const vm = this;
        }
    },
    computed: {
        selectedYear: function() {
            return this.selectedDate ? new Date(this.selectedDate).getFullYear() : '';
        },
        selectedMonth: function() {
            return this.selectedDate ? new Date(this.selectedDate).getMonth() + 1 : '';
        },
        aptTimeArr: function() {
            let timeArr = [];
            for(var i = 12; i <= 22; i++) {
                timeArr.push(i);
            }
            return timeArr;
        }
    },
    mounted() {
        const vm = this;
        empRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const empData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            // 只帶出助理
            // vm.empObjList = empData.filter(emp => emp.empType === '2');
            vm.empObjList = empData;
        });
        for(var i = 2015; i <= new Date().getFullYear(); i++) {
            vm.allYears.push(i);
        }
        vm.allYears.sort((a, b) => b - a);
    }
}
</script>

<style>
.selectionAuto {
    width: auto;
    display: inline;
    height: auto;
    padding: 1px 1px;
}

[type="date"] {
  background:#fff url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png)  97% 50% no-repeat ;
}
[type="date"]::-webkit-inner-spin-button {
  display: none;
}
[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
}
.dateStyle {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
  width: 190px;
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
</style>