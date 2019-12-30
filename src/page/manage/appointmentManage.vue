<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">

            <div class="al-box-shadow-radius al-p-20px al-m-bottom-20px ">
                <el-radio-group v-model="type">
                    <el-radio :label=0>全部约拍</el-radio>
                    <el-radio :label=1>普通拍照</el-radio>
                    <el-radio :label=2>毕业照</el-radio>
                    <el-radio :label=3>婚纱照</el-radio>
                    <el-radio :label=4>电商模特</el-radio>
                </el-radio-group>

                <span class="al-box-size-1px al-m-left-30px"></span>


                <el-button
                    class=""
                    type="primary"
                    size="mini"
                    @click="getAppointmentList()">查询</el-button>

            </div>


            <el-table
                :data="tableData"
                class="al-box-shadow-radius al-p-20px"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="ID">
                          <span>{{ props.row.id }}</span>
                      </el-form-item>
                        <el-form-item label="发布时间">
                            <span>{{ props.row.date }}</span>
                        </el-form-item>
                      <el-form-item label="地址">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                      <el-form-item label="标题">
                        <span>{{ props.row.title }}</span>
                      </el-form-item>
                      <el-form-item label="内容">
                        <span>{{ props.row.ask }}</span>
                      </el-form-item>
                      <el-form-item label="发布者">
                        <span>{{ props.row.userId }}</span>
                      </el-form-item>
                      <el-form-item label="约拍时间">
                        <span>{{ props.row.startDatetime }}</span>
                      </el-form-item>

                      <el-form-item label="约拍类型">
                        <span>{{ props.row.aptTypeId }}</span>
                      </el-form-item>
                        <el-form-item label="约拍费用">
                            <span>{{ props.row.fee }}</span>
                        </el-form-item>
                      <el-form-item label="封面">
                        <span>
                            <img class="al-width-50" :src="props.row.image" alt="">
                        </span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="ID"
                  prop="id">
                </el-table-column>
                <el-table-column
                  label="标题"
                  prop="title">
                </el-table-column>
                <el-table-column
                  label="内容"
                  prop="ask">
                </el-table-column>

                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>


            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
            <el-dialog title="约拍列表" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px">
                        <el-input v-model="selectTable.id" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" label-width="100px" >
                        <el-input v-model="selectTable.date" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="标题" label-width="100px">
                        <el-input v-model="selectTable.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" label-width="100px">
                        <el-input v-model="selectTable.ask"></el-input>
                    </el-form-item>

                    <el-form-item label="时间" label-width="100px">
                        <div class="block">
                            <el-date-picker
                                v-model="selectTable.startDatetime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="地址" label-width="100px">
                        <el-input v-model="selectTable.address"></el-input>
                    </el-form-item>
                    <el-form-item label="费用" label-width="100px">
                        <el-input v-model="selectTable.fee"></el-input>
                    </el-form-item>

                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAppointmentInfo()">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {request} from "../../util/network/request";

    export default {
        data(){
            return {
                type: 0,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
            }
        },
        created(){

            this.getAppointmentList();
            console.log(11111)
        },
    	components: {
    		headTop,
    	},
        methods: {

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getAppointmentList()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;

            },

            //删除约拍
            handleDelete(index, row) {
                console.log(row.id);
                let data = {
                    worksId:row.id
                };
                request({
                    method: 'post',
                    url:'/appointment/delete',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data:this.qsParam(data)
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除约拍成功'
                        });
                        this.getAppointmentList();
                    }else {
                        this.$message({
                            type: 'error',
                            message: '删除约拍失败'
                        });
                        console.log('删除约拍失败')
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除约拍失败')
                });
            },


            //更新约拍
            updateAppointmentInfo:function () {
                this.selectTable.startDatetime = this.formatDate(this.selectTable.startDatetime);

                let data = this.selectTable;
                console.log(data);
                request({
                    method:'post',
                    url:'/appointment/update',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },

                    data:this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: '修改约拍成功'
                        });
                        this.getAppointmentList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '修改约拍失败'
                        });
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '修改约拍失败'
                    });
                    console.log(err);
                })
            },


            //获取约拍
            getAppointmentList:function () {

                console.log(this.type);

                request({
                    method:'get',
                    url:'/appointment/get/type' + "?type=" + this.type
                }).then(res => {
                    console.log(res);
                    const appointmentList = res.data.data;
                    this.count = appointmentList.length;

                    this.tableData = [];
                    appointmentList.forEach(item => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.userId = item.userId;
                        tableData.aptTypeId = item.aptTypeId;
                        tableData.title = item.title;
                        tableData.ask = item.ask;
                        tableData.address = item.address;
                        // tableData.content = item.content;
                        tableData.startDatetime = item.startDatetime;
                        tableData.date = item.date;
                        tableData.fee = item.fee;
                        tableData.image = item.image;
                        this.tableData.push(tableData);
                    })
                }).catch(err => {
                    console.log(err);

                })
            },


            formatDate:function (time) {
                let date = new Date(time);
                let str = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate();
                return str
            },
        },
    }
</script>

<style lang="less">
	@import '../../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
