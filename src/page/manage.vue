<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%; ">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive"
                         style="min-height: 100%;"
                         text-color="#ececec"
                         background-color="#324057"
                         router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item index="userManage">用户管理</el-menu-item>
                        <el-menu-item index="appointmentManage">约拍管理</el-menu-item>
                        <el-menu-item index="appointmentTypeManage">约拍类型管理</el-menu-item>
                        <el-menu-item index="worksManage">作品管理</el-menu-item>
                        <el-menu-item index="carouselManage">轮播图管理</el-menu-item>

                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>

                        <el-menu-item index="addAdmin">添加管理员</el-menu-item>
                        <el-menu-item index="addAppointmentType">添加约拍类型</el-menu-item>
                        <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                        <!--                        <el-menu-item index="addHomework">添加作业</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                        <!--						<el-menu-item index="visitor">用户分布</el-menu-item>-->
                        <el-menu-item index="userCount">用户统计</el-menu-item>
                        <el-menu-item index="appointmentCount">约拍统计</el-menu-item>
                        <el-menu-item index="worksCount">作品统计</el-menu-item>
                    </el-submenu>
                    <!--					<el-submenu index="5">-->
                    <!--						<template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
                    <!--						 <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                    <!--						<el-menu-item index="vueEdit">文本编辑</el-menu-item>-->
                    <!--					</el-submenu>-->
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>关于</template>
                        <el-menu-item index="about">关于</el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {

    }
</style>
