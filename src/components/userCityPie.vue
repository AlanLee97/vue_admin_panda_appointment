<template>
    <div class="box">
        <div id="userCityCount" class="" style="width: 100%;height:600px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/map/js/china';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted() {
            this.myChart = echarts.init(document.getElementById('userCityCount'), "light");

            this.getData();

            this.initData();
        },
        props: ['userCityCount'],
        data(){
            return{
                cityObj:{

                },
                name:[],
                value:[],
                seriesData:[],
                cityList:[],
            }
        },
        methods: {
            getData:function(){
                //console.log(this.userCityCount);


                for (let i = 0; i < this.userCityCount.length; i++) {
                    let cityObj = {};
                    cityObj.name = this.userCityCount[i].city;
                    cityObj.value = this.userCityCount[i].cityCount;
                    this.seriesData.push(cityObj);
                    this.cityList.push(this.userCityCount[i].city);
                }
                console.log(this.seriesData);


                // console.log(this.value);
                // console.log(this.cityList);

            },
            initData() {
                this.getData();


                const option = {

                    title: {
                        text: '用户城市统计',
                        subtext: '城市分布',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: this.cityList,


                    },
                    series: [
                        {
                            name: '城市',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            userCityCount: function () {
                this.initData()
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .box {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
