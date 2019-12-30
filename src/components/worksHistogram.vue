<template>
    <div class="box">
        <div id="worksHistogram" class="" style="width: 100%;height:600px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';

    export default {
        mounted() {
            this.myChart = echarts.init(document.getElementById('worksHistogram'), "light");
            this.initData();
        },
        props: ['sevenDate', 'sevenDay'],
        data(){
            return{

            }
        },
        methods: {
            initData(){
                console.log(this.sevenDate);
                const colors = ['#00ffae'];
                const option = {
                    color: colors,
                    title: {
                        text: '走势图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['作品']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量',
                            min: 0,
                            max: 20,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: '#999'
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'作品',
                            type:'line',
                            data:this.sevenDate,
                            yAxisIndex: 0,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function (){
                this.initData()
            },
            sevenDay: function (){
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
