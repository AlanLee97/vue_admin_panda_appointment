<template>
    <div>
        <head-top></head-top>
        <user-city-geo-map :userCityCount="userCityCount"></user-city-geo-map>
    </div>
</template>

<script>
	import headTop from '../../components/headTop'
    import userCityGeoMap from "../../components/userCityPie";

    import {request} from '../../util/network/request'


    export default {
    	data:function(){
    		return {

    			userCityCount: [

                ],
    		}
    	},
    	components: {
    		headTop,
            userCityGeoMap,
    	},
    	mounted(){
    		this.getUserCityCount();

    	},
    	methods: {
    		getUserCityCount:function () {
    		    let that = this;
                request({
                    method:'get',
                    url:'/user/get/count/city'
                }).then(res => {
                    console.log(res);
                    this.userCityCount = res.data.data;
                    setTimeout(function () {
                        that.userCityCount = res.data.data;

                        console.log(that.userCityCount);
                    }, 1000);



                }).catch((err) => {
                    console.log(err);
                });

            }
    	}
    }
</script>

<style lang="less">
	@import '../../style/mixin';

</style>
