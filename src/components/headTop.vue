<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }"><span style="font-weight: 400">首页</span></el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="" menu-align='start'>
			<img :src="userinfo.headPortraitImg" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click="goPage('/manage')">首页</el-dropdown-item>
				<el-dropdown-item @click="goPage('/login')">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath,
                userinfo:{}
    		}
    	},
    	created(){
            this.getAdminInfo();
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			getAdminInfo:function () {
                this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
                console.log(this.userinfo);
            },

            goPage:function (path) {
                this.gotoPage(path);
            }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
