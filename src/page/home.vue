<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{homeworkCount}}</span> 新增约拍</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allHomeworkCount}}</span> 约拍</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
            </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
    import {request} from "../util/network/request";
    import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: 0,
    			homeworkCount: 0,
                adminCount: 0,
                allUserCount: 0,
                allHomeworkCount: 0,
                allAdminCount: 0,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
            this.getHomeworkCount();
            this.getAdminCount();
            this.getUserCount();

            this.sevenDate = [[5],[16],[3]];
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    	},
        computed: {

        },
    	methods: {
    	    getHomeworkCount:function(){
                request({
                    method:'get',
                    url:'/index.php/index/homework/countHomework'
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.allHomeworkCount = res.total;
                }).catch(err => {
                    console.log(err);
                })
            },
            getAdminCount:function(){
                request({
                    method:'get',
                    url:'/index.php/index/admin/countAdmin'
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.allAdminCount = res;
                }).catch(err => {
                    console.log(err);
                })
            },
            getUserCount:function(){
                request({
                    method:'get',
                    url:'/index.php/index/user/countUser'
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.allUserCount = res;
                }).catch(err => {
                    console.log(err);
                })
            },


    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
