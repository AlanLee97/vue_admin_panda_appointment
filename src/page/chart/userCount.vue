<template>
    <div>
        <head-top></head-top>
        <homework-pie :pieData="pieData"></homework-pie>
    </div>
</template>

<script>
	import headTop from '../../components/headTop'
    import homeworkPie from '../../components/homeworkPie'

    import {request} from '../../util/network/request'


    export default {
    	data(){
    		return {
    			pieData: {},
    		}
    	},
    	components: {
    		headTop,
            homeworkPie,
    	},
    	mounted(){
    		this.getHomeworkCount();
    	},
    	methods: {
    		getHomeworkCount:function () {
                request({
                    method:'get',
                    url:'/index.php/index/homework/countHomework'
                }).then(res => {
                    console.log(res);
                    this.pieData = res.data.data;
                }).catch(err => {
                    console.log(err);
                })
            }
    	}
    }
</script>

<style lang="less">
	@import '../../style/mixin';

</style>
