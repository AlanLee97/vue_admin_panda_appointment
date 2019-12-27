<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="用户ID" prop="username">
                        <el-input v-model="formData.uid"></el-input>
                    </el-form-item>


                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">添加管理员</el-button>
                    </el-form-item>
                </el-form>


                <el-form :model="formData2" :rules="rules" ref="formData2" label-width="110px" class="demo-formData">
                    <el-form-item label="用户ID" prop="username">
                        <el-input v-model="formData2.uid"></el-input>
                    </el-form-item>


                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData2')">取消管理员</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import {request} from "../../util/network/request";

    export default {
        data(){
            return {
                city: {},
                formData: {
                    uid: '', //用户userID
                },
                formData2: {
                    uid: '', //用户userID
                },
                rules: {
                    userID: [
                        { required: true, message: '请输入用户ID', trigger: 'blur' },
                    ],


                },

            }
        },
        components: {
            headTop,
        },
        mounted(){

        },
        methods: {
            //设置管理员
            setAdmin:function(){
                let data = {
                    uid:this.formData.uid,
                    identity:0
                };

                request({
                    method:'post',
                    url:'/user/set/admin',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data:this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    const code = res.data.code;
                    if (code === 200){
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
            cancelAdmin:function(){
                let data = {
                    uid:this.formData2.uid,
                    identity:3
                };
                request({
                    method:'post',
                    url:'/user/set/admin',
                    headers:{
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data:this.qsParam(data)

                }).then(res => {
                    console.log(res);
                    const code = res.data.code;
                    if (code === 200){
                        this.$message({
                            type: 'success',
                            message: '取消成功',

                        });
                        this.formData2.uid = '';
                    }

                }).catch(err => {
                    console.log(err);
                })
            },

            //提交表单
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        if (formName === "formData"){
                            this.setAdmin();
                        }else if (formName === "formData2"){
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
    .button_submit{
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
