<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="6">

                <!-- 添加管理员 -->
                <div class="al-box-shadow-radius al-p-20px al-m-20px">
                    <el-form
                        :model="formData"
                        :rules="rules"
                        ref="formData"
                        label-width="100px"
                        class="demo-formData">
                        <el-form-item label="用户ID" prop="userID">
                            <div class="al-width-90">
                                <el-input v-model="formData.uid"></el-input>
                            </div>
                        </el-form-item>


                        <el-form-item class=" ">
                            <div class="al-m-left-60px">
                                <el-button type="primary"
                                           @click="submitForm('formData', 'setAdmin')">
                                    添加管理员
                                </el-button>


                                <el-button type="warning"
                                           @click="submitForm('formData', 'cancelAdmin')">
                                    取消管理员
                                </el-button>
                            </div>

                        </el-form-item>
                    </el-form>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {request} from "../../util/network/request";

    export default {
        data() {
            return {
                action: '',//setAdmin,cancelAdmin
                city: {},
                formData: {
                    uid: '', //用户userID
                },
                rules: {
                    userID: [
                        {required: true, message: '请输入用户ID', trigger: 'blur'},
                    ],


                },

            }
        },
        components: {
            headTop,
        },
        mounted() {

        },
        methods: {
            //设置管理员
            setAdmin: function () {
                let data = {
                    uid: this.formData.uid,
                    identity: 0
                };

                request({
                    method: 'post',
                    url: '/user/set/admin',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    const code = res.data.code;
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功',

                        });
                        this.formData.uid = '';
                    }

                }).catch(err => {
                    console.log(err);
                })
            },

            //取消管理员
            cancelAdmin: function () {
                let data = {
                    uid: this.formData.uid,
                    identity: 3
                };
                request({
                    method: 'post',
                    url: '/user/set/admin',
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    const code = res.data.code;
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: '取消成功',

                        });
                        this.formData.uid = '';
                    }

                }).catch(err => {
                    console.log(err);
                })
            },

            //提交表单
            submitForm(formName, action) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (action === "setAdmin") {
                            this.setAdmin();
                        } else if (action === "cancelAdmin") {
                            this.cancelAdmin();
                        }

                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },


        }
    }
</script>

<style lang="less">
    @import '../../style/mixin';

    .button_submit {
        text-align: center;
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

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
