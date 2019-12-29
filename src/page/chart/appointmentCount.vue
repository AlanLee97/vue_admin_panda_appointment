<template>
    <div>
        <head-top></head-top>
        <appointment-histogram :appointmentHistogram="appointmentHistogram"></appointment-histogram>
    </div>
</template>

<script>
	import headTop from '../../components/headTop'
    import appointmentHistogram from "../../components/appointmentHistogram";

    import {request} from '../../util/network/request'


    export default {
    	data(){
    		return {
                appointmentHistogram: {},
    		}
    	},
    	components: {
    		headTop,
            appointmentHistogram,
    	},
    	mounted(){
    		//this.getHomeworkCount();
    		console.log(this.appointmentHistogram);
    	},
    	methods: {
    		getHomeworkCount:function () {
                request({
                    method:'get',
                    url:'/user/get/count/city'
                }).then(res => {
                    console.log(res);
                    this.appointmentHistogram = res.data.data;
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
