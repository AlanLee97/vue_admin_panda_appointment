<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="6">

                <div class="al-box-shadow-radius al-p-20px al-m-20px">
                    <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                        <el-form-item label="类型名" prop="type">
                            <el-input v-model="formData.type"></el-input>
                        </el-form-item>


                        <el-form-item class="button_submit">
                            <el-button type="primary" @click="submitForm('formData')">添加</el-button>
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
                city: {},
                formData: {
                    type: '', //类型名

                },
                rules: {
                    type: [
                        {required: true, message: '请输入类型名', trigger: 'blur'},
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

            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        let data = {
                            type: this.formData.type
                        };


                        request({
                            method: 'post',
                            url: '/apt-type/add',
                            headers: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            data: this.qsParam(data)
                        }).then(res => {
                            console.log(res);
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.formData.type = '';
                        }).catch(err => {
                            console.log(err);
                            this.$message({
                                type: 'error',
                                message: '添加失败'
                            });
                        })

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
