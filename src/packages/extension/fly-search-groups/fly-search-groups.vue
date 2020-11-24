<!--
@author huangHe
-->
<template>
    <div class="fly-search-groups">
        <div class="search-groups-wrapper" :class="triggerStatus">
            <ul ref="searchItemsWrapper">
                <template v-for="(item, index) of searchItems">
                    <li :key="index" v-if="item.checked">
                        <label class="search-item-label">{{item.title}}：</label>
                        <span class="search-item-value">
                            <!--普通文本-->
                            <template v-if="item.type === 'text'">
                                <fly-input v-model="searchData[item.dataIndex]"
                                           :placeholder="item.placeholder?item.placeholder : `请输入${item.title}`"
                                           @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                            <!--下拉选择-->
                            <template v-if="item.type === 'list'">
                                <fly-select v-model="searchData[item.dataIndex]"
                                            :placeholder="item.placeholder?item.placeholder : `请选择${item.title}`"
                                            @change="searchItemChange(item, searchData[item.dataIndex])"/>
                            </template>
                        </span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="search-button-wrapper">
            <div class="search-button">
                <span class="search-trigger" v-if="showTriggerButton" @click="searchTrigger">{{triggerText.text}}<i :class="triggerText.icon"></i></span>
                <fly-button class="search" @click="search" label="查询" primary/>
                <fly-button class="reset" @click="reset" label="重置"/>
                <span class="search-setting" @click="searchSetting"><i class="fa fa-cog"></i></span>
            </div>
        </div>
        <fly-dialog v-model="settingDialogVisible" title="查询条件" :width="720" :height="500" @handleOk="handleOk">
            <div class="fly-set-col">
                <div class="set-col-item set-col-left">
                    <span class="title">可选查询条件：</span>
                    <span class="search">
                        <fly-input placeholder="请输入关键字搜索" search/>
                    </span>
                    <div class="set-col-item-content">
                        <ul>
                            <li v-for="(item, index) of cloneItems" :key="index">
                                <fly-checkbox v-model="item.checked" :label="item.title" @click="chooseItem(item)"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="set-col-item set-col-right">
                    <span class="title">已选查询条件：</span>
                    <div class="set-col-item-content">
                        <draggable element="ul" v-model="selectedItem" v-bind:options="dragOptions">
                            <li class="selectedItem" v-for="(item, i) in selectedItem"
                                :key="i"
                                :title="item.label">
                                <span>{{ item.title }}</span>
                                <span class="set-col-right-buttons">
                                    <i class="fa fa-trash-o" @click="deleteItem(item, i)"></i>
                                    <i class="fa fa-arrows"></i>
                                </span>
                            </li>
                        </draggable>
                    </div>
                </div>
            </div>
        </fly-dialog>
    </div>
</template>

<script>
    import FlyInput from '@/packages/base/fly-input/fly-input'
    import FlySelect from '@/packages/base/fly-select/fly-select'
    import FlyButton from '@/packages/base/fly-button/fly-button'
    import FlyDialog from '@/packages/base/fly-dialog/fly-dialog'
    import FlyCheckbox from '@/packages/base/fly-checkbox/fly-checkbox'
    import draggable from 'vuedraggable'
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
        model: {
            prop: 'searchItems',
            event: 'change'
        },
        components: {FlyInput, FlySelect, FlyButton, FlyDialog, FlyCheckbox, draggable},
        data() {
            return {
                cloneItems: [], // 克隆的查询条件
                searchData: {}, // 表单数据
                resetSearchData: {}, // 记录原始数据
                triggerStatus: 'close', // 展开折叠状态 open close
                settingDialogVisible: false,
                selectedItem: [], // 选中的查询条件
                dragOptions: { // 拖拽组件参数
                    animation: 120,
                    scroll: true,
                    group: 'sortlist'
                },
                showTriggerButton: true // 是否显示展开按钮
            };
        },
        computed: {
            triggerText: function () {
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
                this.cloneItems = JSON.parse(JSON.stringify(this.searchItems));
                this.selectedItem = JSON.parse(JSON.stringify(this.searchItems.filter(i => i.checked)));
                this.settingDialogVisible = true;
            },
            // 单项变化事件
            searchItemChange(item, value) {
                this.$emit('itemChange', item, value);
            },
            // 选择查询条件
            chooseItem(item) {
                const newItem =  JSON.parse(JSON.stringify(item));
                if (newItem.checked) {
                    this.selectedItem.push(newItem);
                } else {
                    newItem.checked = !newItem.checked;
                    const findIndex = this.selectedItem.findIndex(i => JSON.stringify(i) === JSON.stringify(newItem));
                    this.selectedItem.splice(findIndex, 1)
                }
            },
            // 删除选中的条件
            deleteItem(item, index) {
                const findIndex = this.cloneItems.findIndex(i => JSON.stringify(i) === JSON.stringify(item));
                this.selectedItem.splice(index, 1);
                this.cloneItems[findIndex].checked = false;
            },
            // 设置按钮确定
            handleOk() {
                const newItem = JSON.parse(JSON.stringify(this.cloneItems));
                this.settingDialogVisible = false;
                // this.$emit('change', newItem);
                // 点击确定后返回selectedItem：选中的查询条件；newItem最新的查询条件
                this.$emit('handleOk', this.selectedItem, newItem);
                this.getShowTriggerStatus();
            },
            // 判断是否显示展开按钮
            getShowTriggerStatus() {
                this.$nextTick(() => {
                    const wrapperWidth = this.$refs.searchItemsWrapper.clientWidth;
                    const items = [...this.$refs.searchItemsWrapper.querySelectorAll('li')];
                    let itemWidth = 0;
                    if (items.length > 0) {
                        itemWidth = items[0].clientWidth;
                        if (items.length * itemWidth < wrapperWidth) {
                            this.showTriggerButton = false;
                        } else {
                            this.showTriggerButton = true;
                        }
                    } else {
                        this.showTriggerButton = false;
                    }
                })
            }
        },
        mounted() {
            this.searchData = JSON.parse(JSON.stringify(this.defaultData));
            const vm = this;
            vm.getShowTriggerStatus();
            window.addEventListener('resize',function(){
                vm.getShowTriggerStatus();
            })
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
