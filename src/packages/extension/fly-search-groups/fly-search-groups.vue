<!--
@author huangHe
-->
<template>
    <div class="fly-search-groups">
        <div class="search-groups-wrapper">
            <ul>
                <template v-for="(item, index) of searchItems">
                    <li :key="index">
                        <label class="search-item-label">{{item.label}}：</label>
                        <span class="search-item-value">
                            <!--普通文本-->
                            <template v-if="item.type === 'text'">
                                <fly-input v-model="searchData[item.dataIndex]" @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                            <!--下拉选择-->
                            <template v-if="item.type === 'list'">
                                <fly-select v-model="searchData[item.dataIndex]" @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                        </span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="search-button-wrapper">
            <div class="search-button">
                <span class="search-trigger" @click="searchTrigger">展开<i class="fa fa-angle-down fa-lg"></i></span>
                <fly-button class="search" @click="search" label="查询" primary/>
                <fly-button class="reset" @click="reset" label="重置"/>
                <span class="search-setting" @click="searchSetting"><i class="fa fa-cog"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    import FlyInput from '@/packages/base/fly-input/fly-input'
    import FlySelect from '@/packages/base/fly-select/fly-select'
    import FlyButton from '@/packages/base/fly-button/fly-button'
    export default {
        name: 'fly-search-groups',
        props: {
            searchItems: {
                type: Array
            },
            searchData: {
                type: Object
            }
        },
        components: {FlyInput, FlySelect, FlyButton},
        data() {
            return {
                resetSearchData: {} // 记录原始数据
            };
        },
        created() {
        },
        methods: {
            // 展开折叠
            searchTrigger() {

            },
            // 查询
            search() {
                console.log(this.searchData);
            },
            // 重置
            reset() {
            },
            // 设置
            searchSetting() {

            },
            // 单项变化事件
            searchItemChange(item, value) {

            }
        },
        mounted() {
        },
        watch: {
            searchData: {
                handler(val) {
                    if (JSON.stringify(this.resetSearchData) === {}) {
                        this.resetSearchData = JSON.parse(JSON.stringify(val));
                    }
                },
                deep: true
            }
        }
    };
</script>

<style scoped></style>
