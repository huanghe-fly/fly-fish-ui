<!--
@author huangHe
-->
<template>
    <div class="fly-search-groups">
        <div class="search-groups-wrapper" :class="triggerStatus">
            <ul>
                <template v-for="(item, index) of searchItems">
                    <li :key="index">
                        <label class="search-item-label">{{item.label}}：</label>
                        <span class="search-item-value">
                            <!--普通文本-->
                            <template v-if="item.type === 'text'">
                                <fly-input v-model="searchData[item.dataIndex]"
                                           :placeholder="item.placeholder?item.placeholder : `请输入${item.label}`"
                                           @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                            <!--下拉选择-->
                            <template v-if="item.type === 'list'">
                                <fly-select v-model="searchData[item.dataIndex]"
                                            :placeholder="item.placeholder?item.placeholder : `请选择${item.label}`"
                                            @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                        </span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="search-button-wrapper">
            <div class="search-button">
                <span class="search-trigger" @click="searchTrigger">{{triggerText.text}}<i :class="triggerText.icon"></i></span>
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
            defaultData: {
                type: Object
            }
        },
        components: {FlyInput, FlySelect, FlyButton},
        data() {
            return {
                searchData: {}, // 表单数据
                resetSearchData: {}, // 记录原始数据
                triggerStatus: 'close', // 展开折叠状态 open close
            };
        },
        computed: {
            triggerText: {
                get: function () {
                    if (this.triggerStatus === 'open') {
                        return {
                            text: '收起',
                            icon: 'fa fa-angle-up fa-lg'
                        }
                    } else {
                        return {
                            text: '展开',
                            icon: 'fa fa-angle-down fa-lg'
                        }
                    }
                },
                set: function (value) {
                    // this.value = value.join(',')
                }
            }
        },
        created() {
        },
        methods: {
            // 展开折叠
            searchTrigger() {
                if (this.triggerStatus === 'open') {
                    this.triggerStatus = 'close';
                } else {
                    this.triggerStatus = 'open';
                }
            },
            // 查询
            search() {
                this.$emit('search', this.searchData);
            },
            // 重置
            reset() {
                this.searchData = JSON.parse(JSON.stringify(this.defaultData));
            },
            // 设置
            searchSetting() {

            },
            // 单项变化事件
            searchItemChange(item, value) {
                this.$emit('itemChange', item, value);
            }
        },
        mounted() {
            this.searchData = JSON.parse(JSON.stringify(this.defaultData));
        },
        watch: {
            defaultData: {
                handler(val) {
                    if (val) {
                        this.searchData = JSON.parse(JSON.stringify(val));
                    }
                },
                deep: true
            }
        }
    };
</script>

<style scoped></style>
