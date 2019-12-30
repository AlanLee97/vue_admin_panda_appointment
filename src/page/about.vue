<template>
    <div class="fillcontain">
        <head-top></head-top>

        <el-row>
            <el-col :span="12" :offset="6">
                <div class="al-box-shadow-radius al-p-20px al-m-20px">

                    <h3 class="al-font-weight-100 al-text-center al-m-10px">小组成员信息</h3>

                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                        <el-table-column
                            prop="id"
                            label="学号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="identity"
                            label="身份">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        data() {
            return {
                tableData: [{
                    id: '17053007',
                    name: '李步官',
                    identity: '组长',
                }, {
                    id: '17053061',
                    name: '蔡杰远',
                    identity: '组员'
                }, {
                    id: '17053096',
                    name: '林劲文',
                    identity: '组员'
                }, {
                    id: '17053173',
                    name: '李赟',
                    identity: '组员'
                }]

            }
        },
        components: {
            headTop,
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'success-row';
                }
                return '';
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
