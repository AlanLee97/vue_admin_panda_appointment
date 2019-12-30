<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
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
                            <el-form-item label="约拍类型">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="type">
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            class="el-icon-edit"
                            type="primary"
                            circle></el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            class="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                            circle></el-button>
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
            <el-dialog title="修改约拍类型" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="ID" label-width="100px">
                        <el-input v-model="selectTable.id" auto-complete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="类型名称" label-width="100px">
                        <el-input v-model="selectTable.type" auto-complete="off"></el-input>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAppointmentType()">确 定</el-button>
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
        created() {

            this.getAppointmentTypeList();
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
                this.offset = (val - 1) * this.limit;
                this.getAppointmentTypeList()
            },
            handleEdit(index, row) {
                this.selectTable = row;
                this.dialogFormVisible = true;
            },

            //删除约拍类型
            handleDelete(index, row) {
                console.log(row.id);
                let data = {
                    id: row.id
                };
                request({
                    method: 'post',
                    url: '/apt-type/delete',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: this.qsParam(data)
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除约拍类型成功'
                        });
                        this.getAppointmentTypeList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除约拍类型失败'
                        });
                        console.log('删除约拍类型失败')
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除约拍类型失败')
                });
            },


            //更新约拍类型
            updateAppointmentType: function () {
                let data = {
                    type: this.selectTable.type,
                    id: this.selectTable.id
                };
                console.log(data);
                request({
                    method: 'post',
                    url: '/apt-type/update',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },

                    data: this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改约拍类型成功'
                        });
                        this.getAppointmentTypeList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改约拍类型失败'
                        });
                    }

                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '修改约拍类型失败'
                    });
                    console.log(err);
                })
            },


            //获取约拍类型
            getAppointmentTypeList: function () {
                request({
                    method: 'get',
                    url: '/apt-type/get-all'
                }).then(res => {
                    console.log(res);
                    const appointmentList = res.data.data;
                    this.count = appointmentList.length;

                    this.tableData = [];
                    appointmentList.forEach(item => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.type = item.type;

                        this.tableData.push(tableData);
                    })
                }).catch(err => {
                    console.log(err);

                })
            },


            formatDate: function (time) {
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
