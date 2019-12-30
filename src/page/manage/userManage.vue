<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <div class="al-box-shadow-radius al-p-20px al-m-bottom-20px ">
                <el-radio-group v-model="role">
                    <el-radio :label=4>全部用户</el-radio>
                    <el-radio :label=0>管理员</el-radio>
                    <el-radio :label=1>摄影师</el-radio>
                    <el-radio :label=2>模特</el-radio>
                    <el-radio :label=3>普通用户</el-radio>
                </el-radio-group>

                <span class="al-box-size-1px al-m-left-30px"></span>


                <el-button
                    class=""
                    type="primary"
                    size="mini"
                    @click="getAllUsers()">查询</el-button>

            </div>

            <el-table
                :data="tableData"
                style="width: 100%"
                class="al-box-shadow-radius al-p-20px"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>

                            <el-form-item label="用户名">
                                <span>{{ props.row.username }}</span>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <span>{{ props.row.nickname }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span v-if="props.row.gender === 1">男</span>
                                <span v-else-if="props.row.gender === 0">女</span>
                                <span v-else>未知</span>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <span>{{ props.row.age }}</span>
                            </el-form-item>
                            <el-form-item label="城市">
                                <span>{{ props.row.city }}</span>
                            </el-form-item>
                            <el-form-item label="身份">
                                <span v-if="props.row.identity === 0 ">管理员</span>
                                <span v-else-if="props.row.identity === 1 ">摄影师</span>
                                <span v-else-if="props.row.identity === 2 ">模特</span>
                                <span v-else>普通用户</span>
                            </el-form-item>
                            <el-form-item label="手机">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="认证">
                                <span v-if="props.row.isAuthenticated === 1">已认证</span>
                                <span v-else>未认证</span>
                            </el-form-item>

                            <el-form-item label="注册时间">
                                <span>{{props.row.createTime}}</span>
                            </el-form-item>



                            <el-form-item label="头像" class="width-100">
                                <span>
                                    <img :src="props.row.headPortraitImg" alt="" class="al-icon-size-150px al-d-il-blk">
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
                    label="用户名"
                    prop="username">
                </el-table-column>

                <el-table-column
                    label="手机"
                    prop="phone">
                </el-table-column>

                <el-table-column
                    label="注册时间"
                    prop="createTime">
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            class="el-icon-edit"
                            circle>
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            class="el-icon-delete"
                            circle>
                        </el-button>
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
            <el-dialog title="修改用户信息"  :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="id" label-width="100px">
                        <el-input v-model="selectTable.id" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" label-width="100px">
                        <el-input v-model="selectTable.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" label-width="100px">
                        <el-input v-model="selectTable.nickname" ></el-input>
                    </el-form-item>

                    <el-form-item label="年龄" label-width="100px">
                        <el-input v-model="selectTable.age"></el-input>
                    </el-form-item>
                    <el-form-item label="城市" label-width="100px">
                        <el-input v-model="selectTable.city"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-radio-group v-model="selectTable.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="身份" label-width="100px">
                        <el-radio-group v-model="selectTable.identity">
                            <el-radio :label="0">管理员</el-radio>
                            <el-radio :label="1">摄影师</el-radio>
                            <el-radio :label="2">模特</el-radio>
                            <el-radio :label="3">普通用户</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="认证" label-width="100px">
                        <el-radio-group v-model="selectTable.isAuthenticated">
                            <el-radio :label="0">未认证</el-radio>
                            <el-radio :label="1">已认证</el-radio>
                        </el-radio-group>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateUserInfo()">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {request} from "../../util/network/request";

    export default {
        data() {
            return {
                role: 4,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                dialogFormVisible: false,

            }
        },
        created() {

            this.getAllUsers();
        },
        components: {
            headTop,
        },
        methods: {

            //弹窗确认
            confirmDelete:function(row){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((res) => {
                    console.log(res);
                    this.deleteUser(row);

                }).catch((err) => {
                    console.log(err);

                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //删除用户
            deleteUser: function(row){
                request({
                    method: 'get',
                    url: '/user/delete?uid=' + row.id,
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },

                }).then(res => {
                    console.log(res);
                    if (res.data.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除用户成功'
                        });
                        this.getAllUsers();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除用户失败'
                        });
                        console.log('删除用户失败')
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除用户失败')
                });
            },


            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;

            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
                //this.getAllUsers();
            },


            //处理删除
            handleDelete(index, row) {
                console.log(row.id);
                this.confirmDelete(row);

            },


            //更新用户信息
            updateUserInfo: function () {
                let data = {
                    uid: this.selectTable.id,
                    isAuthenticated:this.selectTable.isAuthenticated,
                    age:this.selectTable.age,
                    gender:this.selectTable.gender,
                    city:this.selectTable.city,
                    identity:this.selectTable.identity,
                    nickname:this.selectTable.nickname,
                };
                console.log(data);
                request({
                    method: 'post',
                    url: '/user/update',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },

                    data: this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改用户成功'
                        });
                        this.getAllUsers();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改用户失败'
                        });
                        this.getWorksList();
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '修改用户失败'
                    });
                    console.log(err);
                })
            },

            //获取所有用户
            getAllUsers: function () {
                console.log(this.role);

                let data = {
                    identity: this.role
                };


                request({
                    method: 'post',
                    url: '/user/get/all',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    const userinfos = res.data.data;
                    this.count = userinfos.length;

                    this.tableData = [];
                    userinfos.forEach(item => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.username = item.username;
                        tableData.nickname = item.nickname;
                        tableData.gender = item.gender;
                        tableData.age = item.age;
                        tableData.identity = item.identity;
                        tableData.isAuthenticated = item.isAuthenticated;
                        tableData.phone = item.phone;
                        tableData.city = item.city;
                        tableData.headPortraitImg = item.headPortraitImg;
                        tableData.createTime = item.createTime;

                        this.tableData.push(tableData);
                    })

                }).catch(err => {
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

    .table_container {
        padding: 20px;
    }

    .Pagination {
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
