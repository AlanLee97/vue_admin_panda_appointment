<template>
    <div>
        <head-top></head-top>

        <div class="box-shadow-raduis p-20px m-20px">
            <el-row>
                <el-col :span="2"><pre> </pre></el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="12" class="p-10px" v-for="(item, index) in images" :key="index">
                            <div class="block">
<!--                                <span class="demonstration">默认</span>-->
                                <el-image :src="item" :preview-src-list="images"></el-image>
                            </div>
                        </el-col>
<!--                        <el-col :span="12" class="p-10px">-->
<!--                            <div class="block">-->
<!--                                <span class="demonstration">自定义</span>-->
<!--                                <el-image :src="src">-->
<!--                                    <div slot="placeholder" class="image-slot">-->
<!--                                        加载中<span class="dot">...</span>-->
<!--                                    </div>-->
<!--                                </el-image>-->
<!--                            </div>-->
<!--                        </el-col>-->
                    </el-row>
                </el-col>
                <el-col :span="2"><pre> </pre></el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    // import elImage from 'element-ui'


    import {request} from "../../util/network/request";

    export default {
        name: "carouselManage",
        components:{
            headTop,
            // elImage

        },
        data:function () {
            return {
                src: 'https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/nvJCYdnohVOK9caMhNLJjAH1FYEi8khhG9DHctsOUHt.jpg',
                images:[
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/BioLWLH8ttBH9S6vMFl6ZpR86jWsKpOWpa6XhrVOYAP.jpg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/DTb3l563tdj4oLwmdj6soz0oUN0WiIi6HTayN4oa8B3.jpg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/QlOpWqTDznuWIOABg5djTreijHQs6WzUzsVu0rBHghN.jpg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/UlS5cEY2AksTMvw9EWUDEx5p6yqFrhnj6oYrkpBcglk.jpg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/VVCmQ2CrXWhP8QyGND5lps2nD6BSLXBcNXhUA3HANRt.jpg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/f57Y2wEryDwjWmTr2BypYaCA6CgSKjknAJtGRIR4FcR.jpeg",
                    "https://alanlee-panda-appointment.oss-cn-shenzhen.aliyuncs.com/images/isux/ghAEUxYupCDqTcwSGd6wPmtrH1j3S9zaKlVuP4oA2CP.jpg"
                ]
            }
        }
    }
</script>

<style>
    .page{
        background-color: #00e5ff;
    }

</style>
