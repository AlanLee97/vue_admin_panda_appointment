<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="ID">
                          <span>{{ props.row.id }}</span>
                      </el-form-item>
                        <el-form-item label="发布时间">
                            <span>{{ props.row.datetime }}</span>
                        </el-form-item>
                      <el-form-item label="内容">
                        <span>{{ props.row.introduction }}</span>
                      </el-form-item>
                      <el-form-item label="发布者">
                        <span>{{ props.row.tuser.nickname }}</span>
                      </el-form-item>

                      <el-form-item label="图片" class="width-100">
                        <span v-for="(img_url, img_index) in props.row.images" :key="img_index">
                            <img :src="img_url" alt="" class="icon-size-150px d-il-blk">
                        </span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                    width="100"
                  label="ID"
                  prop="id">
                </el-table-column>
                <el-table-column
                    width="120"
                  label="发布者"
                  prop="tuser.nickname">
                </el-table-column>
                <el-table-column
                  label="内容"
                  prop="introduction">
                </el-table-column>
                <el-table-column
                    width="200"
                    label="发布时间"
                    prop="datetime">
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
            <el-dialog title="作品列表" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px" >
                        <el-input v-model="selectTable.id" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="发布者" label-width="100px" >
                        <el-input v-model="selectTable.tuser" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" label-width="100px">
                        <el-input v-model="selectTable.datetime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="内容" label-width="100px">
                        <el-input v-model="selectTable.introduction"></el-input>
                    </el-form-item>


                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateWorksInfo()">确 定</el-button>
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

            this.getWorksList();
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

            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
            },

            handleDelete(index, row) {
                console.log(row.id);
                let data = {
                    worksId:row.id
                };
                request({
                    method: 'post',
                    url:'/works/delete',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data:this.qsParam(data)
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: '删除作品成功'
                        });
                        this.getWorksList();
                    }else {
                        this.$message({
                            type: 'error',
                            message: '删除作品失败'
                        });
                        console.log('删除作品失败')
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除作品失败')
                });
            },




            //获取作品信息
            getWorksList:function () {
                request({
                    method:'get',
                    url:'/works/get/all-user'
                }).then(res => {
                    console.log(res);
                    const worksList = res.data.data;
                    this.count = worksList.length;

                    this.tableData = [];
                    worksList.forEach(item => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.userId = item.tuser.id;
                        tableData.datetime = item.datetime;
                        tableData.images = item.images;
                        tableData.introduction = item.introduction;
                        tableData.tuser = item.tuser;

                        this.tableData.push(tableData);
                    });

                    console.log(worksList);
                }).catch(err => {
                    console.log(err);

                })
            },

            //更新作品信息
            updateWorksInfo:function () {
                let data = {
                    worksId: this.selectTable.id,
                    userId:this.selectTable.userId,
                    introduction:this.selectTable.introduction,
                };
                console.log(data);
                request({
                    method:'post',
                    url:'/works/update',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },

                    data:this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.$message({
                            type: 'success',
                            message: '修改作品成功'
                        });
                        this.getWorksList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '修改作品失败'
                        });
                        this.getWorksList();
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '修改作品失败'
                    });
                    console.log(err);
                })
            }
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
