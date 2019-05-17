<template>
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="login-panel panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title" style="font-family:courier new;"><strong>TCS</strong></h3>
                </div>
                <div class="panel-body" style="text-align:center;">
                    <table width="100%">
                        <tr>
                            <td style="width:50%"><router-link to="/customerInfo">顧客消費 <i class="fa fa-edit"></i></router-link></td>
                            <td style="width:50%"><router-link to="/assistantSalary">員工薪資 <i class="fa fa-money"></i></router-link></td>
                        </tr>
                        <tr>
                            <!-- TODO
                            <td style="width:50%"><router-link to="/customerAppointment">顧客預約 <i class="fa fa-book"></i></router-link></td>
                            -->
                            <td style="width:50%"> </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
</script>

<style>
</style>