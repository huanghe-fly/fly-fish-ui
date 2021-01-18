<!--
@author huangHe
-->
<template>
    <div class="fly-table" :id="tableId">
        <div style="display: none">
            <slot name="header"></slot>
            <slot></slot>
        </div>
        <div class="scrollMask"></div>
        <div class="fly-table-content">
            <div class="fly-table-header">
                <table :width="formatColumns.totalWidth">
                    <thead>
                    <tr>
                        <template v-for="(column, index) in formatColumns.columns">
                            <template v-if="column.type === 'selection'">
                                <th :width="column.width" :align="column.headerAlign" class="table-fixed-left">
                                    <span :class="['fly-checkbox', headerCheckboxClass]" @click="selectAll"></span>
                                </th>
                            </template>
                            <template v-else-if="column.type === 'index'">
                                <th :width="column.width" :align="column.headerAlign" class="table-fixed-left">
                                    <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                                  :columns="column"></table-header>
                                    <span v-if="!column.headerSlots">#</span>
                                </th>
                            </template>
                            <template v-else>
                                <th :width="column.width" :align="column.headerAlign"
                                    :class="[column.fixed ? `table-fixed-${column.fixed}` : '', sort ? 'table-sort-wrapper': '', `th_${index}`]">
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
                                    <!--<sub class="split" @mousedown="splitDown($event, index, column)"></sub>-->
                                </th>
                            </template>
                        </template>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="fly-table-body">
                <div :style="{'height': `${tableHeight}px`, 'width': `${formatColumns.totalWidth}px`, 'paddingTop': `${tablePaddingTop}px`, 'min-width': '100%'}">
                    <table v-if="dataSource.length > 0" :width="formatColumns.totalWidth">
                        <tbody>
                        <tr v-for="(item, index) in readerData"
                            :class="[hoverIndex === index ? 'hover-row' : '', getSelectedStatus(item) ? 'selected-row' : '']"
                            @mousemove="mousemove(index)"
                            @mouseleave="mouseleave(index)">
                            <template v-for="(column, i) in formatColumns.columns">
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
                    <div class="fly-table-empty-block" :style="{width: formatColumns.totalWidth+'px'}" v-if="dataSource.length === 0"></div>
                </div>
            </div>
            <div class="fly-table-empty-no-date" v-if="dataSource.length === 0">暂无数据</div>
        </div>
        <div v-if="formatColumns.leftColumns.findIndex(i => i.fixed === 'left') > -1"
             :class="['fly-table-fixed-left', scrollLeftOrRight === 'left'? '':'scrolling-left']"
             :style="{'width': fixedLeftWidth + 'px'}">
            <fly-table-fixed-left
                :columns="formatColumns.leftColumns"
                :dataSource="dataSource"
                :readerData="readerData"
                :rowHeight="rowHeight"
                :hoverIndex="hoverIndex"
                :tablePaddingTop="tablePaddingTop"
                :selectedRows="selectedRows"
                @fixedMousemove="mousemove"
                @fixedMouseleave="mouseleave"
                @selectAll="selectAll"
                @selectRow="selectRow"
                @clickRow="clickRow"
                @splitDown="splitDown"
            />
        </div>
        <div v-if="formatColumns.rightColumns.findIndex(i => i.fixed === 'right') > -1"
             :class="['fly-table-fixed-right', scrollLeftOrRight === 'right'? '':'scrolling-right']"
             :style="{'width': fixedRightWidth + 'px'}">
            <fly-table-fixed-right
                    :columns="formatColumns.rightColumns"
                    :dataSource="dataSource"
                    :readerData="readerData"
                    :rowHeight="rowHeight"
                    :hoverIndex="hoverIndex"
                    :tablePaddingTop="tablePaddingTop"
                    :selectedRows="selectedRows"
                    @fixedMousemove="mousemove"
                    @fixedMouseleave="mouseleave"
                    @clickRow="clickRow"
                    @splitDown="splitDown"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import FlyTableColumn from "../fly-table-column/fly-table-column";
    import FlyTableFixedLeft from "./fly-table-fixed-left"
    import FlyTableFixedRight from "./fly-table-fixed-right"

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
        name: "fly-table",
        components: {FlyTableColumn, FlyTableFixedLeft, FlyTableFixedRight},
        props: {
            columns: {
                type: Array
            },
            dataSource: {
                type: Array
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
            // 行高
            rowHeight: {
                type: Number,
                default: 32
            }
        },
        data() {
            return {
                tableId: this.util.uuid(),
                tableDom: null,
                tableHeaderDom: null,
                tableBodyDom: null,
                tableColumns: [], // table的columns 默认多选框和序号左侧固定
                tableData: [], // table的数据
                readerData: [], // table需要渲染的数据
                scrollWidth: 0, // body滚动条的宽度
                fixedLeftWidth: 0, // 左侧fixed宽度
                fixedRightWidth: 0, // 右侧fixed宽度
                tablePaddingTop: 0,
                scrollLeftOrRight: 'left', // 横向滚动条是否滚动到最左或最右
                hoverIndex: null, // 鼠标移入下标
                selectedIndex: [], // 鼠标点击行下标
                selectedRows: [], // 选中的数据
                oldDataSource: [], // 保存排序之前的数据
                actionSortIcon: '', // 排序按钮激活坐标x-y x:下标 y: 1-up 2-down
                sortStatus: 'up' // 排序状态 up:升序 down:降序
            }
        },
        computed: {
            formatColumns: function () {
                let totalWidth = 0;
                const leftColumns = [];
                let leftWidth = 0;
                const rightColumns = [];
                let rightWidth = 0;
                const contentColumns = [];
                this.tableColumns.forEach((item, index) => {
                    totalWidth = totalWidth + parseFloat(item.width);
                    if (item.fixed && item.fixed === 'left') {
                        leftColumns.push(item);
                        leftWidth = leftWidth + parseFloat(item.width);
                    } else if (item.fixed && item.fixed === 'right') {
                        rightColumns.push(item);
                        rightWidth = rightWidth + parseFloat(item.width) + 1;
                    } else {
                        contentColumns.push(item)
                    }
                });
                return {
                    columns: [...leftColumns, ...contentColumns, ...rightColumns],
                    totalWidth: totalWidth,
                    leftColumns: leftColumns,
                    leftWidth: leftWidth,
                    rightColumns: rightColumns,
                    rightWidth: rightWidth
                }
            },
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
                if (this.selectedRows.length !== 0) {
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
        methods: {
            // 初始化table
            initTable() {
                if (this.columns) {
                    this.tableColumns = this.columns;
                }
                // 根据columns 计算的宽度
                this.fixedLeftWidth = this.formatColumns.leftWidth;
                this.fixedRightWidth = this.formatColumns.rightWidth;
                this.tableDom = document.getElementById(this.tableId);
                this.tableHeaderDom = this.tableDom.querySelector(".fly-table-header");
                this.tableBodyDom = this.tableDom.querySelector(".fly-table-body");
                // 根据实际宽度计算固定列的宽度
                this.$nextTick(()=> {
                    const fixedLeft = [...this.tableHeaderDom.querySelectorAll(".table-fixed-left")];
                    this.fixedLeftWidth = 0;
                    fixedLeft.forEach(item => {
                        this.fixedLeftWidth = this.fixedLeftWidth + item.offsetWidth;
                    });
                    const fixedRight = [...this.tableHeaderDom.querySelectorAll(".table-fixed-right")];
                    this.fixedRightWidth = 0;
                    fixedRight.forEach(item => {
                        this.fixedRightWidth = this.fixedRightWidth + item.offsetWidth;
                    });
                    // 表格初始化完成后再加入滚动监听事件
                    this.listenerScroll();
                })
            },
            // 监听滚动条，实现同步滚动, 计算滚动条宽度
            listenerScroll() {
                const tableDom = document.getElementById(this.tableId);
                const tableHeader = tableDom.querySelector(".fly-table-header");
                const tableBody = tableDom.querySelector(".fly-table-body");
                const tableFixedLeftBody = tableDom.querySelectorAll(".fly-table-fixed-body");
                this.scrollWidth = tableBody.offsetWidth - tableBody.scrollWidth;
                tableBody.addEventListener("scroll", (e) => {
                    tableHeader.scrollLeft = tableBody.scrollLeft;
                    if (tableFixedLeftBody.length === 1) {
                        tableFixedLeftBody[0].scrollTop = tableBody.scrollTop;
                    }
                    if (tableFixedLeftBody.length === 2) {
                        tableFixedLeftBody[0].scrollTop = tableBody.scrollTop;
                        tableFixedLeftBody[1].scrollTop = tableBody.scrollTop;
                    }
                    if (tableBody.scrollLeft === 0) {
                        this.scrollLeftOrRight = 'left';
                    } else if (tableBody.scrollLeft + tableBody.clientWidth === tableBody.scrollWidth) {
                        this.scrollLeftOrRight = 'right';
                    } else {
                        this.scrollLeftOrRight = 'center';
                    }
                    this.getTableReaderData();
                });
            },
            // 根据是否有滚动条优化宽高
            setTable() {
                const tableDom = document.getElementById(this.tableId);
                const tableHeader = tableDom.querySelector(".fly-table-header");
                const tableBody = tableDom.querySelector(".fly-table-body");
                const scrollXWidth = tableBody.offsetHeight - tableBody.clientHeight;
                const scrollYWidth = tableBody.offsetWidth - (tableBody.clientWidth + 2);
                const tableFixedLeft = tableDom.querySelector(".fly-table-fixed-left");
                const tableFixedRight = tableDom.querySelector(".fly-table-fixed-right");
                const scrollMask = tableDom.querySelector(".scrollMask");
                if (scrollXWidth && tableFixedLeft) {
                    tableFixedLeft.style.maxHeight = 'calc(100% - ' + scrollXWidth + 'px)';
                }
                if (scrollXWidth && tableFixedRight) {
                    tableFixedRight.style.maxHeight = 'calc(100% - ' + scrollXWidth + 'px)';
                }
                if (scrollYWidth && tableFixedRight) {
                    scrollMask.style.width = scrollYWidth + 'px';
                    tableFixedRight.style.right = scrollYWidth + 'px';
                    tableHeader.style.width = 'calc(100% - ' + scrollYWidth + 'px)';
                }
            },
            // 获取table表格当前需要渲染的数据，设置table的偏移量
            getTableReaderData() {
                // 获取最大高度可以放多少行
                let startIndex = Math.floor(this.tableBodyDom.scrollTop / this.rowHeight);
                const pageNum = Math.ceil(this.tableDom.clientHeight / this.rowHeight);
                let allData = JSON.parse(JSON.stringify(this.dataSource));
                this.tablePaddingTop = startIndex * this.rowHeight;
                this.readerData = allData.slice(startIndex, startIndex + pageNum);
                this.readerData = this.readerData.map((item, index) => {
                    item._index = startIndex + index + 1;
                    return item;
                })
            },
            // 鼠标移入
            mousemove(index) {
                this.hoverIndex = index;
            },
            // 鼠标移出
            mouseleave(index) {
                this.hoverIndex = null;
            },
            // 全选
            selectAll() {
                if (this.selectedRows.length !== this.dataSource.length) {
                    this.selectedRows = JSON.parse(JSON.stringify(this.dataSource));
                } else {
                    this.selectedRows = [];
                }
                this.$emit('selectionChange', this.selectedRows);
            },
            // 点击复选框选中数据
            selectRow(item) {
                const _item = JSON.parse(JSON.stringify(item));
                delete _item._index;
                let rowIndex = this.selectedRows.findIndex(i => JSON.stringify(i) === JSON.stringify(_item));
                if (this.multiple) {
                    if (rowIndex > -1) {
                        this.selectedRows.splice(rowIndex, 1);
                    } else {
                        this.selectedRows.push(_item);
                    }
                } else {
                    this.selectedRows = [_item];
                }
                this.$emit('selectionChange', this.selectedRows);
            },
            // 点击行选中数据
            clickRow(item) {
                /*const _item = JSON.parse(JSON.stringify(item));
                delete _item._index;
                let rowIndex = this.selectedRows.findIndex(i => JSON.stringify(i) === JSON.stringify(_item));
                if (this.multiple) {
                    if (rowIndex > -1) {
                        this.selectedRows.splice(rowIndex, 1);
                    } else {
                        this.selectedRows.push(_item);
                    }
                } else {
                    this.selectedRows = [_item];
                }
                this.$emit('selectionChange', this.selectedRows);*/
                this.$emit('clickRow', item);
            },
            // 判断选中的状态(行内)
            getSelectedStatus(item) {
                const _item = JSON.parse(JSON.stringify(item));
                delete _item._index;
                let rowIndex = this.selectedRows.findIndex(i => JSON.stringify(i) === JSON.stringify(_item));
                if (rowIndex > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            // 表格排序
            tableSort(column, status, actionSortIcon) {
                const regNumber = /^[0-9]+$/;
                if (this.actionSortIcon !== actionSortIcon) {
                    this.actionSortIcon = actionSortIcon;
                } else {
                    this.actionSortIcon = null;
                }
                if (this.sortStatus !== status) {
                    this.sortStatus = status;
                    this.dataSource.sort((a, b) => {
                        if (status === 'up') {
                            if (regNumber.test(a[column.dataIndex]) && regNumber.test(b[column.dataIndex])) {
                                return a[column.dataIndex] - b[column.dataIndex]
                            } else {
                                return a[column.dataIndex].localeCompare(b[column.dataIndex], 'zh-CN')
                            }
                        } else if (status === 'down') {
                            if (regNumber.test(a[column.dataIndex]) && regNumber.test(b[column.dataIndex])) {
                                return b[column.dataIndex] - a[column.dataIndex]
                            } else {
                                return b[column.dataIndex].localeCompare(a[column.dataIndex], 'zh-CN')
                            }
                        }
                    });
                } else {
                    this.sortStatus = null;
                    this.dataSource = JSON.parse(JSON.stringify(this.oldDataSource));
                }
                this.getTableReaderData();
            },
            // 拖拽
            splitDown(e, index, column) {
                /*const vm = this;
                let divx = e.clientX;
                let thName = '.th_' + index;
                let tdName = '.td_' + index;
                const thDom = document.querySelectorAll(thName);
                const tdDom = document.querySelectorAll(tdName);
                const tabDom = document.getElementById(this.tableId);
                let width = thDom[0].clientWidth; //当前td的宽度
                let tabW = tabDom.querySelector(".fly-table-body table").clientWidth; //表格的宽度
                let fixedTabW = 0; //左侧固定表格的宽度
                if (column.fixed) {
                    fixedTabW = tabDom.querySelector(".fly-table-fixed-left").clientWidth
                }
                let moveW = 0; // 鼠标移动宽度
                console.log(column)
                document.onmousemove = function (e) { // 鼠标移动
                    moveW = e.clientX - divx;
                    document.body.style.cursor = 'col-resize'; // 鼠标样式
                    vm.$set(column, 'width', width + moveW)
                    /!*thDom.forEach((item, index) => {
                        item.style.width = width + moveW + 'px';
                        tdDom[index].style.width = width + moveW + 'px';
                        tdDom[index + tdDom.length / 2].style.width = width + moveW + 'px';
                    });
                    tabDom.querySelector(".fly-table-header table").style.width = tabW + moveW + 'px';
                    tabDom.querySelector(".fly-table-body table").style.width = tabW + moveW + 'px';
                    if (fixedTabW > 0) {
                        tabDom.querySelector(".fly-table-fixed-left").style.width = fixedTabW + moveW + 'px';
                    }*!/
                };
                document.onmouseup = function (e) { // 鼠标松开
                    document.body.style.cursor = 'default'; // 鼠标样式
                    document.onmousemove = null;
                    document.onmouseup = null;
                }*/
            }
        },
        mounted() {
            this.initTable();
            this.getTableReaderData();
            this.$nextTick(() => {
                this.setTable();
            })
        },
        watch: {
            columns: {
                handler(newV) {
                    if (newV) {
                        this.initTable();
                        this.$nextTick(() => {
                            this.setTable();
                        })
                    }
                },
                deep: true
            },
            tableColumns: {
                handler(newV) {
                    this.initTable();
                    this.$nextTick(() => {
                        this.setTable();
                    })
                },
                deep: true
            },
            dataSource: {
                handler(newV) {
                    if (this.oldDataSource.length < 1) {
                        this.oldDataSource = JSON.parse(JSON.stringify(newV));
                    }
                    this.getTableReaderData();
                    this.$nextTick(() => {
                        this.setTable();
                    });
                },
                deep: true
            }
        }
    }

</script>

<style scoped>

</style>
