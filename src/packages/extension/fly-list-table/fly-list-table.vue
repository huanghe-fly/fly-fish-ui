<!--
@author huangHe
-->
<template>
    <div class="fly-table-list">
        <fly-table :dataSource="dataSource" :rowHeight="32" @selectionChange="selectionChange">
            <fly-table-column fixed type="selection" header-align="center" align="center" width="50"></fly-table-column>
            <fly-table-column fixed type="index" header-align="center" align="center" width="50">
                <template slot="header" slot-scope="scope">
                    <i class="fa fa-bars" @click="columnsSetting"></i>
                </template>
            </fly-table-column>
            <fly-table-column v-for="column in tableColumns" :key="column.key"
                              :title="column.title" :data-index="column.dataIndex" :width="column.width"
                              :fixed="column.fixed" :header-align="column.align"
                              :align="column.align">
                <template slot-scope="scope">
                    {{scope.row[column.dataIndex]}}
                </template>
            </fly-table-column>
        </fly-table>
        <fly-dialog v-model="settingDialogVisible" title="调栏" :width="720" :height="500" @handleOk="handleOk">
            <div class="fly-set-col">
                <div class="set-col-item set-col-left">
                    <span class="title">可选查列：</span>
                    <span class="search">
                        <fly-input placeholder="请输入关键字搜索" search/>
                    </span>
                    <div class="set-col-item-content">
                        <ul>
                            <li v-for="(item, index) of cloneItems" :key="index">
                                <fly-checkbox v-model="item.display" :label="item.title" @click="chooseItem(item)"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="set-col-item set-col-right">
                    <span class="title">已选列：</span>
                    <div class="set-col-item-content">
                        <draggable element="ul" v-model="selectedItem" v-bind:options="dragOptions">
                            <li class="selectedItem" v-for="(item, i) in selectedItem"
                                :key="i"
                                :title="item.title">
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
    import FlyTable from "@/packages/base/fly-table/fly-table";
    import FlyTableColumn from "@/packages/base/fly-table-column/fly-table-column";
    import FlyDialog from '@/packages/base/fly-dialog/fly-dialog';
    import FlyInput from '@/packages/base/fly-input/fly-input';
    import FlyCheckbox from '@/packages/base/fly-checkbox/fly-checkbox';
    import draggable from 'vuedraggable';
    export default {
        name: 'fly-list-table',
        props: {
            columns: { // 列，数据源
                type: Array
            },
            dataSource: {
                type: Array
            }
        },
        components: {FlyTable, FlyTableColumn, FlyDialog, FlyInput, FlyCheckbox, draggable},
        data() {
            return {
                tableColumns: null, // 复制的columns 用于显示表格
                settingDialogVisible: false,
                cloneItems: null, // 克隆的查询条件
                selectedItem: null, // 选中的查询条件
                dragOptions: { // 拖拽组件参数
                    animation: 120,
                    scroll: true,
                    group: 'sortlist'
                }
            };
        },
        created() {
        },
        methods: {
            selectionChange(items) {
                console.log(items)
            },
            // 调栏
            columnsSetting() {
                this.cloneItems = JSON.parse(JSON.stringify(this.columns));
                this.selectedItem = JSON.parse(JSON.stringify(this.columns.filter(i => i.display === '1')));
                this.settingDialogVisible = true;
            },
            // 选择查询条件
            chooseItem(item) {
                const findIndex = this.selectedItem.findIndex(i => JSON.stringify(i) === JSON.stringify(item));
                if (item.display === '1') {
                    this.selectedItem.push(item);
                } else {
                    this.selectedItem.splice(findIndex, 1)
                }
            },
            // 删除选中的条件
            deleteItem(item, index) {
                const findIndex = this.cloneItems.findIndex(i => JSON.stringify(i) === JSON.stringify(item));
                this.selectedItem.splice(index, 1);
                this.cloneItems[findIndex].display = '0';
            },
            // 设置按钮确定
            handleOk() {
                const newItem = JSON.parse(JSON.stringify(this.cloneItems));
                this.settingDialogVisible = false;
                this.tableColumns = JSON.parse(JSON.stringify(this.selectedItem));
                // 点击确定后返回selectedItem：选中的列；newItem最新的列
                this.$emit('handleOk', this.selectedItem, newItem);
                console.log(this.tableColumns)
            }
        },
        mounted() {
            this.tableColumns = JSON.parse(JSON.stringify(this.columns));
        },
        watch: {
            columns: {
                handler(val) {
                    this.tableColumns = JSON.parse(JSON.stringify(val));
                },
                deep: true
            }
        }
    };
</script>

<style scoped></style>
