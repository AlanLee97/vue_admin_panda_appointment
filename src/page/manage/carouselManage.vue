<template>
    <div>
        <head-top></head-top>

        <div :v-loading="loadingDisabled">
            <el-row>
                <el-col :span="2"><pre> </pre></el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="12" class="al-p-10px" v-for="(item, index) in formData" :key="index">
                            <div class="al-box-shadow-radius al-p-20px al-m-10px">
<!--                                <span class="demonstration">默认</span>-->
                                <el-image :src="item.imgUrl" :preview-src-list="images"></el-image>

                                <div class="al-font-weight-100 al-fontsize-20px al-text-color-light-black al-p-top-10px">
                                    <span>标题：</span>
                                    {{item.title}}
                                </div>
                                <div class="al-font-weight-100 al-fontsize-10px al-text-color-light-black al-p-top-10px">
                                    <span>链接：</span>
                                    {{item.link}}
                                </div>

                                <el-divider>
                                    <el-button type="primary" icon="el-icon-edit" circle @click="editImageInfo(item)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle @click="confirmDelete(item.id)"></el-button>
                                </el-divider>
                            </div>
                        </el-col>

                    </el-row>
                </el-col>
                <el-col :span="2">
                    <pre> </pre>

                    <el-button type="primary"
                               circle
                               class="el-icon-plus al-position-fixed al-bottom-40px"
                               @click="showDialog()"></el-button>

                </el-col>
            </el-row>
        </div>


        <!-- 编辑图片信息 -->
        <el-dialog :title="dialogTitle" :visible.sync="editDialogVisible" >

            <!-- 图片上传 -->

            <div>

                <div class="al-box-bg-fcfcfc al-m-20px al-p-20px al-box-radius">
                    <el-upload
                        ref="uploadImg"
                        :data="uploadData"
                        :action="uploadImgUrl"
                        :on-success="uploadSuccess"
                        :on-error="uploadFail"
                        list-type="picture-card"
                        multiple
                        :auto-upload="false">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                    <span
                                        class="el-upload-list__item-preview"
                                        @click="handlePictureCardPreview(file)"
                                    >
                                      <i class="el-icon-zoom-in"></i>
                                    </span>

                                    <span
                                        v-if="!disabled"
                                        class="el-upload-list__item-delete"
                                        @click="handleRemove(file)"
                                    >
                                      <i class="el-icon-delete"></i>
                                    </span>
                            </span>
                        </div>
                    </el-upload>

                </div>

            </div>

            <!-- 表单 -->
            <el-form >
                <el-form-item label="标题" label-width="100">
                    <el-input v-model="editFormData.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="链接地址" label-width="100">
                    <el-input v-model="editFormData.link" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm(dialogTitle)">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 删除图片提示 -->
        <el-dialog
            title="删除图片"
            :visible.sync="deleteDialogVisible"
            width="30%"

        >

            <span>
                <span class="el-icon-warning"></span>
                确认要删除图片？
            </span>

            <span slot="footer" >
                <el-button @click="deleteDialogVisible = false">取消</el-button>
                <el-button @click="deleteImage()" type="primary">确定</el-button>
            </span>
        </el-dialog>


        <!-- 图片预览 -->
        <el-dialog :visible.sync="imgPreviewDialogVisible">
            <img width="100%" :src="previewImageUrl" alt="">
        </el-dialog>



    </div>
</template>

<script>
    import headTop from '../../components/headTop'


    import {request} from "../../util/network/request";

    export default {
        name: "carouselManage",
        components:{
            headTop,

        },
        mounted() {
            this.getAllCarousel();
        },
        data:function () {
            return {
                formData:{},
                editFormData:{
                    id:'',
                    title:'',
                    link:'',
                    imgUrl:''
                },
                flag:true,
                imgFit:'scale-down',
                editDialogVisible:false,
                deleteDialogVisible:false,
                imgPreviewDialogVisible:false,
                previewImageUrl:'',
                images:[],
                dialogTitle:'',
                uploadData:{//上传图片时需要用户id
                    uid:1
                },
                uploadImgUrl:this.createUrl('/upload/return-url'),  //图片上传的地址
                disabled:false,
                loadingDisabled:true,

                loading:null,
                confirmDeleteId:'',


            }
        },

        methods:{
            getAllCarousel:function(){
                request({
                    url:'/carousel/get/all'
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.formData = res;
                    for (let i = 0; i < res.length; i++) {
                        this.images.push(res[i].imgUrl);
                    }
                    console.log(this.images);
                }).catch(err => {
                    console.log(err);
                })
            },

            //显示对话框
            showDialog:function(){
                this.editFormData = {};
                this.dialogTitle = "添加轮播图";
                this.editDialogVisible = true;
            },

            //提交表单
            submitForm:function(title){
                console.log(title);
                this.startUpload();
                this.openFullScreen();

            },

            //添加轮播图
            addImage:function(){
                let data = {
                    title:this.editFormData.title,
                    link:this.editFormData.link,
                    imgUrl:this.editFormData.imgUrl
                };

                console.log(data);
                request({
                    url:'/carousel/add',
                    method:'post',
                    data:this.qsParam(data),
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.editDialogVisible = false;
                        this.loading.close();
                        this.$message.success('添加成功');
                        this.getAllCarousel();
                    }else {
                        this.$message.error("添加失败");
                    }
                }).catch(err => {
                    console.log(err);
                    this.$message.error("添加失败");
                });

            },

            //编辑图片信息
            editImageInfo:function (item) {
                this.editDialogVisible = true;
                this.dialogTitle = "编辑轮播图";
                console.log(item);
                this.editFormData = item;

                console.log(this.editFormData);

            },

            //更新轮播图信息
            updateImageInfo:function(){

                this.startUpload();


                let data = {
                    id:this.editFormData.id,
                    title:this.editFormData.title,
                    link:this.editFormData.link,
                    imgUrl:this.editFormData.imgUrl
                };
                request({
                    url:'/carousel/update',
                    method:'post',
                    data:this.qsParam(data),
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.editDialogVisible = false;
                        this.loading.close();
                        this.$message.success('更新成功');
                        this.getAllCarousel();
                    }else {
                        this.$message.error("更新失败");
                        this.loading.close();
                    }
                }).catch(err => {
                    console.log(err);
                    this.$message.error("更新失败");
                    this.loading.close();
                });
            },


            //确认删除弹窗
            confirmDelete:function(id){
                this.deleteDialogVisible = true;
                this.confirmDeleteId = id;
            },


            //删除图片信息
            deleteImage:function () {

                let data = {
                    id:this.confirmDeleteId
                };

                request({
                    url:'/carousel/delete',
                    method:'post',
                    data:this.qsParam(data),
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 200){
                        this.deleteDialogVisible = false;
                        this.$message.success('删除成功');
                        this.getAllCarousel();
                    }else {
                        this.$message.error("删除失败");
                    }
                }).catch(err => {
                    console.log(err);
                    this.$message.error("删除失败");
                });

                this.deleteDialogVisible = true;
            },


            uploadImg:function(){

            },



            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.previewImageUrl = file.url;
                this.imgPreviewDialogVisible = true;
            },

            //开始图片上传
            startUpload:function () {
                console.log('开始图片上传');
                this.$refs.uploadImg.submit();
            },


            //图片上传成功后的回调函数
            uploadSuccess:function(res, file, fileList){
                console.log(res);
                this.editFormData.imgUrl = res;

                console.log("图片上传成功");

                if (this.dialogTitle === "编辑轮播图"){
                    this.updateImageInfo();

                }else if (this.dialogTitle === "添加轮播图"){
                    this.addImage();

                }

            },

            //上传失败
            uploadFail:function (err) {
                console.log('上传图片失败');
                console.log(err);
            },


            //打开加载动画
            openFullScreen() {
                this.loading = this.$loading({
                    lock: true,
                    text: '发送请求中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(227,227,227,0.17)'
                });

            }
        }
    }
</script>

<style>



</style>
