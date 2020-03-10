<template>
    <div>
        <head-top></head-top>


        <div class="al-box-shadow-radius al-p-20px al-m-20px">
            <works-histogram :sevenDate='sevenDate' :sevenDay='sevenDay'></works-histogram>
        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop';
    import dtime from 'time-formater';
    import worksHistogram from "../../components/worksHistogram";

    import {request} from '../../util/network/request'


    export default {
        data() {
            return {
                sevenDay: [],
                sevenDate: [],
            }
        },
        components: {
            headTop,
            worksHistogram
        },
        mounted() {
            this.getSevenDayWorksCount();

            for (let i = 6; i > -1; i--) {
                const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
                this.sevenDay.push(date)
            }
        },
        methods: {
            //获取七天作品数量
            getSevenDayWorksCount: function () {
                let date = new Date();
                let startDate = dtime(date.getTime() - 86400000 * 6).format('YYYY-MM-DD');
                let endDate = this.formatDate(date);

                console.log(startDate);
                console.log(endDate);

                request({
                    method: 'get',
                    url: '/works/count/many' + "?startDate=" + startDate + "&endDate=" + endDate,
                }).then(res => {
                    // console.log(res);
                    res = res.data.data;
                    this.sevenDate = res;
                    // console.log(res);

                }).catch(err => {
                    console.log(err);
                })
            },

        }
    }
</script>

<style lang="less">
    @import '../../style/mixin';

</style>
