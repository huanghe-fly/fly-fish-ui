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
            <template v-for="column in showColumns">
                <fly-table-column  :key="column.key"
                                   :title="column.title" :data-index="column.dataIndex" :width="column.width"
                                   :fixed="column.fixed" :header-align="column.align"
                                   :align="column.align">
                    <template slot-scope="scope">
                        {{scope.row[column.dataIndex]}}
                    </template>
                </fly-table-column>
            </template>
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
                            <li v-for="(item, index) of searchColumns" :key="index">
                                <fly-checkbox v-model="item.display" :label="item.title" @click="chooseItem(item)"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="set-col-item set-col-right">
                    <span class="title">已选列：</span>
                    <div class="set-col-item-content">
                        <draggable v-model="selectedColumns" element="ul" v-bind="dragOptions">
                            <li class="selectedItem" v-for="(item, i) in selectedColumns"
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
                cloneColumns: [], // 复制的columns, 便于本地修改
                showColumns: [], // 表格显示的column
                settingDialogVisible: false,
                searchColumns: [], // 所有的查询条件
                selectedColumns: [], // 选中的查询条件
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
                this.searchColumns = JSON.parse(JSON.stringify(this.cloneColumns));
                this.selectedColumns = JSON.parse(JSON.stringify(this.cloneColumns.filter(i => i.display === '1')));
                this.settingDialogVisible = true;
            },
            // 选择查询条件
            chooseItem(item) {
                const newItem =  JSON.parse(JSON.stringify(item));
                if (newItem.display === '1') {
                    this.selectedColumns.push(newItem);
                } else {
                    // 还原数据为了找到选中里的值
                    newItem.display = '1';
                    const findIndex = this.selectedColumns.findIndex(i => JSON.stringify(i) === JSON.stringify(newItem));
                    this.selectedColumns.splice(findIndex, 1);
                }
            },
            // 删除选中的条件
            deleteItem(item, index) {
                const findIndex = this.cloneColumns.findIndex(i => JSON.stringify(i) === JSON.stringify(item));
                this.selectedColumns.splice(index, 1);
                this.cloneColumns[findIndex].display = '0';
            },
            // 设置按钮确定
            handleOk() {
                const newItems = JSON.parse(JSON.stringify(this.searchColumns));
                const newSelected = JSON.parse(JSON.stringify(this.selectedColumns));
                this.settingDialogVisible = false;
                this.showColumns = newSelected;
                // 同步克隆的查询条件
                this.cloneColumns = newItems;
                // 点击确定后返回selectedItem：选中的列；newItem最新的列
                this.$emit('handleOk', newSelected, newItems);
            }
        },
        mounted() {
            this.cloneColumns = JSON.parse(JSON.stringify(this.columns));
            this.showColumns = JSON.parse(JSON.stringify(this.columns.filter(i => i.display === '1')));
        },
        watch: {
            columns: {
                handler(val) {
                    this.cloneColumns = JSON.parse(JSON.stringify(val));
                    this.showColumns = JSON.parse(JSON.stringify(val.filter(i => i.display === '1')));
                },
                deep: true
            }
        }
    };
</script>

<style scoped></style>
