<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{current.user}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{current.appointment}}</span> 新增约拍</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{current.works}}</span> 新增作品</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{all.user}}</span> 用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{all.appointment}}</span> 约拍</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{all.works}}</span> 作品</div></el-col>
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
    export default {
    	data(){
    		return {

    			sevenDay: [],
    			sevenDate: [[],[],[]],

                current:{
    			    appointment:0,
                    user:0,
                    works:0
                },

                all:{
                    appointment:0,
                    user:0,
                    works:0
                }
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
            this.getCurrentAppointmentCount();
            this.getCurrentUserCount();
            this.getCurrentWorksCount();


            this.getAppointmentCount();
            this.getWorksCount();
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
    	    //获取当天约拍数量
            getCurrentAppointmentCount:function(){
                let date = new Date();
                date = this.formatDate(date);


                // date = '2019-12-27';

                request({
                    method:'get',
                    url:'/appointment/count/date' + '?date=' + date,
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.current.appointment = res.rs;
                    console.log(this.current.appointment);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取当天用户注册数量
            getCurrentUserCount:function(){
                let date = new Date();
                date = this.formatDate(date);


                // date = '2019-12-27';

                request({
                    method:'get',
                    url:'/user/count/date' + '?date=' + date,
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.current.user = res.rs;
                    console.log(this.current.user);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取当天作品发布数量
            getCurrentWorksCount:function(){
                let date = new Date();
                date = this.formatDate(date);


                date = '2019-12-24';

                request({
                    method:'get',
                    url:'/works/count/date' + '?date=' + date,
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.current.works = res.rs;
                    console.log(this.current.works);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有约拍数量
            getAppointmentCount:function(){
                request({
                    method:'get',
                    url:'/appointment/count/date',
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.all.appointment = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有作品数量
            getWorksCount:function(){
                request({
                    method:'get',
                    url:'/works/count/date',
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.all.works = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有用户数量
            getUserCount:function(){
                request({
                    method:'get',
                    url:'/user/count/date',
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.all.user = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },



            dateFormat:function (fmt, date) {
                let ret;
                let opt = {
                    "y+": date.getFullYear().toString(),        // 年
                    "M+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "m+": date.getMinutes().toString(),         // 分
                    "s+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                }
                return fmt;
            },



            formatDate:function (time) {
                let date = new Date(time);
                let str = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate();
                return str
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
