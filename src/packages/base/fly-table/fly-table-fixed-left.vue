<!--
@author huangHe
-->
<template>
    <div class="fly-table-fixed-left-main">
        <div class="fly-table-fixed-header">
            <table>
                <thead>
                <tr>
                    <template v-for="(column, index) in columns">
                        <template v-if="column.type === 'selection'">
                            <th :width="column.width" :align="column.align">
                                <span :class="['fly-checkbox', headerCheckboxClass]" @click="selectAll"></span>
                            </th>
                        </template>
                        <template v-else-if="column.type === 'index'">
                            <th :width="column.width" :align="column.align">
                                <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                              :columns="column"></table-header>
                                <span v-if="!column.headerSlots">#</span>
                            </th>
                        </template>
                        <template v-else>
                            <th :width="column.width" :align="column.headerAlign" :class="[sort ? 'table-sort-wrapper': '', `th_${index}`]">
                                <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                              :columns="column"></table-header>
                                <span v-if="!column.headerSlots">{{column.title}}</span>
                                <span v-if="sort" class="table-sort">
                                    <i class="table-sort-up fa fa-sort-up"
                                       :class="actionSortIcon === `${index}-1`? 'actionSort':''"
                                       @click="tableSort(column, 'up', `${index}-1`)"></i>
                                    <i class="table-sort-down fa fa-sort-up fa-rotate-180"
                                       :class="actionSortIcon === `${index}-2`? 'actionSort':''"
                                       @click="tableSort(column, 'down', `${index}-2`)"></i>
                                </span>
                                <!--<sub class="split" @mousedown="splitDown($event,index,column)"></sub>-->
                            </th>
                        </template>
                    </template>
                </tr>
                </thead>
            </table>
        </div>
        <div class="fly-table-fixed-body">
            <div class="" :style="{'height': `${tableHeight}px`, 'paddingTop': `${tablePaddingTop}px`, 'min-width': '100%'}">
                <table v-if="readerData.length > 0">
                    <tbody>
                    <tr v-for="(item, index) in readerData"
                        :class="[hoverIndex === index ? 'hover-row' : '', getSelectedStatus(item) ? 'selected-row' : '']"
                        @mousemove="mousemove(index)"
                        @mouseleave="mouseleave(index)"
                        @click="clickRow(item)">
                        <template v-for="(column, i) in columns">
                            <template v-if="column.type === 'selection'">
                                <td :width="column.width" :align="column.align" :style="{'height': `${rowHeight}px`}">
                                    <span class="fly-checkbox" :class="getSelectedStatus(item) ? 'is-checked' : ''" @click="selectRow(item)"></span>
                                </td>
                            </template>
                            <template v-else-if="column.type === 'index'">
                                <td :width="column.width" :align="column.align">
                                    <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                                :row="item"></table-body>
                                    <span v-if="!column.bodySlots">{{item._index}}</span>
                                </td>
                            </template>
                            <template v-else>
                                <td :width="column.width" :align="column.align" :class="`td_${i}`">
                                    <span class="tdWrapper" :style="{'height': `${rowHeight}px`}">
                                        <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                                    :row="item"></table-body>
                                        <span v-if="!column.bodySlots">{{item[column.dataIndex]}}</span>
                                    </span>
                                </td>
                            </template>
                        </template>
                    </tr>
                    </tbody>
                </table>
                <!--<div class="fly-table-empty-block" :style="{width: fixedLeftWidth + 'px'}" v-if="readerData.length === 0"></div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    // 定义table-header组件,接收显示 slots name是header
    Vue.component("table-header", {
        props: ['scopedSlots', 'columns'],
        render: function (createElement) {
            return createElement("span", this.scopedSlots.header({
                row: this.columns
            }));
        }
    });
    // 定义table-body组件，接收显示 默认的slots
    Vue.component("table-body", {
        props: ['scopedSlots', 'row'],
        render: function (createElement) {
            const rowData = JSON.parse(JSON.stringify(this.row));
            const rowIndex = this.row._index - 1;
            delete rowData._index;
            return createElement("span", this.scopedSlots.default({
                row: rowData,
                index: rowIndex
            }));
        }
    });
    export default {
        name: 'fly-table-fixed-left',
        props: {
            columns: {
                type: Array
            },
            dataSource: {
                type: Array
            },
            readerData: {
                type: Array
            },
            // 行高
            rowHeight: {
                type: Number,
                default: 32
            },
            hoverIndex: {
                type: Number
            },
            // 是否是多选
            multiple: {
                type: Boolean,
                default: true
            },
            // 是否显示排序
            sort: {
                type: Boolean,
                default: true
            },
            // 选中数据
            selectedRows: {
                type: Array
            },
            // 表格滚动时垂直偏移量
            tablePaddingTop: {
                type: Number,
                default: 0
            }
        },
        components: {},
        data() {
            return {
                // hoverIndex: null, // 鼠标移入下标
                actionSortIcon: '', // 排序按钮激活坐标x-y x:下标 y: 1-up 2-down
            };
        },
        computed: {
            // table的实际高度
            tableHeight: function () {
                if (this.dataSource.length > 0) {
                    return this.dataSource.length * this.rowHeight;
                } else {
                    return 'auto';
                }
            },
            // 表头复选框样式
            headerCheckboxClass: function () {
                if (this.selectedRows && this.selectedRows.length !== 0) {
                    if (this.selectedRows.length === this.dataSource.length) {
                        return 'is-checked'
                    } else {
                        return 'is-checked is-indeterminate'
                    }
                } else {
                    return ''
                }
            }
        },
        created() {
        },
        methods: {
            // 鼠标移入
            mousemove(index) {
                // this.hoverIndex = index;
                this.$emit('fixedMousemove', index);
            },
            // 鼠标移出
            mouseleave(index) {
                // this.hoverIndex = null;
                this.$emit('fixedMouseleave', index);
            },
            // 全选
            selectAll() {
                this.$emit('selectAll');
            },
            // 点击复选框选中数据
            selectRow(item) {
                this.$emit('selectRow', item);
            },
            // 点击行选中数据
            clickRow(item) {
                this.$emit('clickRow', item);
            },
            // 判断选中的状态(行内)
            getSelectedStatus(item) {
                const _item = JSON.parse(JSON.stringify(item));
                delete _item._index;
                let rowIndex = -1;
                if (this.selectedRows) {
                    rowIndex = this.selectedRows.findIndex(i => JSON.stringify(i) === JSON.stringify(_item))
                }
                if (rowIndex > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            // 表格排序
            tableSort(column, status, actionSortIcon) {
                this.$emit('tableSort', column, status, actionSortIcon);
            },
            // 拖拽
            splitDown(e, index, column) {
                this.$emit('splitDown', e, index, column);
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
