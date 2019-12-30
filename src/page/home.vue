<template>
    <div>
        <head-top></head-top>
        <section class="data_section">
            <header class="section_title al-p-top-10px">数据统计</header>
            <div class="al-box-shadow-radius al-p-20px al-m-20px">
                <!-- 当天数据 -->
                <el-row :gutter="20" style="margin-bottom: 10px;">
                    <el-col :span="4">
                        <div class="data_list today_head"><span class="data_num head">当日数据：</span></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{current.user}}</span> 新增用户</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{current.appointment}}</span> 新增约拍</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{current.works}}</span> 新增作品</div>
                    </el-col>
                </el-row>

                <!-- 总数据 -->
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{all.user}}</span> 用户</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{all.appointment}}</span> 约拍</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="data_list"><span class="data_num">{{all.works}}</span> 作品</div>
                    </el-col>
                </el-row>
            </div>

        </section>

        <section>
            <div class="al-box-shadow-radius al-m-20px al-p-20px">
                <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'/>
            </div>
        </section>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import tendency from '../components/tendency'
    import dtime from 'time-formater'
    import {request} from "../util/network/request";

    export default {
        data() {
            return {

                sevenDay: [],
                sevenDate: [[], [], []],

                current: {
                    appointment: 0,
                    user: 0,
                    works: 0
                },

                all: {
                    appointment: 0,
                    user: 0,
                    works: 0
                }
            }
        },
        components: {
            headTop,
            tendency,
        },
        mounted() {
            this.getCurrentAppointmentCount();
            this.getCurrentUserCount();
            this.getCurrentWorksCount();


            this.getAppointmentCount();
            this.getWorksCount();
            this.getUserCount();

            this.getSevenDayUserCount();
            this.getSevenDayAppointmentCount();
            this.getSevenDayWorksCount();

            for (let i = 6; i > -1; i--) {
                const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
                this.sevenDay.push(date)
            }
        },
        computed: {},
        methods: {
            //获取当天约拍数量
            getCurrentAppointmentCount: function () {
                let date = new Date();
                date = this.formatDate(date);

                request({
                    method: 'get',
                    url: '/appointment/count/date' + '?date=' + date,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.current.appointment = res.rs;
                    // console.log(this.current.appointment);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取当天用户注册数量
            getCurrentUserCount: function () {
                let date = new Date();
                date = this.formatDate(date);

                request({
                    method: 'get',
                    url: '/user/count/date' + '?date=' + date,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.current.user = res.rs;
                    // console.log(this.current.user);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取当天作品发布数量
            getCurrentWorksCount: function () {
                let date = new Date();
                date = this.formatDate(date);

                request({
                    method: 'get',
                    url: '/works/count/date' + '?date=' + date,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.current.works = res.rs;
                    // console.log(this.current.works);
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有约拍数量
            getAppointmentCount: function () {
                request({
                    method: 'get',
                    url: '/appointment/count/date',
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.all.appointment = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有作品数量
            getWorksCount: function () {
                request({
                    method: 'get',
                    url: '/works/count/date',
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.all.works = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取所有用户数量
            getUserCount: function () {
                request({
                    method: 'get',
                    url: '/user/count/date',
                }).then(res => {
                    console.log(res);
                    res = res.data.data;
                    this.all.user = res.rs;
                }).catch(err => {
                    console.log(err);
                })
            },

            //获取七天用户数量
            getSevenDayUserCount: function () {
                let date = new Date();
                let startDate = dtime(date.getTime() - 86400000 * 6).format('YYYY-MM-DD');
                let endDate = this.formatDate(date);
                request({
                    method: 'get',
                    url: '/user/count/many' + "?startDate=" + startDate + "&endDate=" + endDate,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.sevenDate[0] = res;
                    // console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            },

            //获取七天约拍数量
            getSevenDayAppointmentCount: function () {
                let date = new Date();
                let startDate = dtime(date.getTime() - 86400000 * 6).format('YYYY-MM-DD');
                let endDate = this.formatDate(date);

                request({
                    method: 'get',
                    url: '/appointment/count/many' + "?startDate=" + startDate + "&endDate=" + endDate,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.sevenDate[1] = res;
                    // console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            },

            //获取七天作品数量
            getSevenDayWorksCount: function () {
                let date = new Date();
                let startDate = dtime(date.getTime() - 86400000 * 6).format('YYYY-MM-DD');
                let endDate = this.formatDate(date);

                request({
                    method: 'get',
                    url: '/works/count/many' + "?startDate=" + startDate + "&endDate=" + endDate,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.sevenDate[2] = res;
                    // console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            },


            //格式化日期
            formatDate: function (time) {
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

    .data_section {
        .section_title {
            text-align: center;
            font-size: 30px;
            margin-bottom: 10px;
        }

        .data_list {
            text-align: center;
            font-size: 14px;
            color: #666;
            border-radius: 6px;
            background: #E5E9F2;

            .data_num {
                color: #333;
                font-size: 26px;

            }

            .head {
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }

        .today_head {
            background: #FF9800;
        }

        .all_head {
            background: #20A0FF;
        }
    }

    .wan {
        .sc(16px, #333)
    }
</style>
