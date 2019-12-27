<template>
    <div class="box">
        <div id="homeworkPie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('homeworkPie'), "light");
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
                const option = {
                    title : {
                        text: '作业统计',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['全部作业','未完成','已完成']
                    },
                    series : [
                        {
                            name: '作业统计',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.pieData.total, name:'全部作业'},
                                {value:this.pieData.done, name:'未完成'},
                                {value:this.pieData.undo, name:'已完成'}
                            ],
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
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .box{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
