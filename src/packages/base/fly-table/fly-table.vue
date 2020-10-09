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
                <table :width="totalWidth">
                    <thead>
                    <tr>
                        <th v-for="(column) in tableColumns" :width="column.width" :align="column.headerAlign"
                            :class="column.fixed ? `table-fixed-${column.fixed}` : ''">
                            <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                          :columns="column"></table-header>
                            <span v-if="!column.headerSlots">{{column.title}}</span>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="fly-table-body">
                <div :style="{'height': `${tableHeight}px`, 'paddingTop': `${tablePaddingTop}px`}">
                    <table :width="totalWidth">
                        <tbody>
                        <tr v-for="item in readerData">
                            <td v-for="(column, index) in tableColumns" :width="column.width" :align="column.align">
                                <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                            :columns="item"></table-body>
                                <span v-if="!column.bodySlots">{{item[column.dataIndex]}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="fly-table-fixed-left" :style="{'width': fixedLeftWidth + 'px'}">
            <div class="fly-table-fixed-header">
                <table :width="fixedLeftWidth">
                    <thead>
                    <tr>
                        <th v-for="(column) in fixedLeftColumns" :width="column.width" :align="column.headerAlign">
                            <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                          :columns="column"></table-header>
                            <span v-if="!column.headerSlots">{{column.title}}</span>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="fly-table-fixed-body">
                <div class="" :style="{'height': `${tableHeight}px`, 'paddingTop': `${tablePaddingTop}px`}">
                    <table :width="fixedLeftWidth">
                        <tbody>
                        <tr v-for="item in readerData">
                            <td v-for="column in fixedLeftColumns" :width="column.width" :align="column.align">
                                <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                            :columns="item"></table-body>
                                <span v-if="!column.bodySlots">{{item[column.dataIndex]}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="fly-table-fixed-right" :style="{'width': fixedRightWidth + 'px'}">
            <div class="fly-table-fixed-header">
                <table :width="fixedRightWidth">
                    <thead>
                    <tr>
                        <th v-for="(column) in fixedRightColumns" :width="column.width" :align="column.headerAlign">
                            <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                          :columns="column"></table-header>
                            <span v-if="!column.headerSlots">{{column.title}}</span>
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="fly-table-fixed-body">
                <div class="" :style="{'height': `${tableHeight}px`, 'paddingTop': `${tablePaddingTop}px`}">
                    <table :width="fixedRightWidth">
                        <tbody>
                        <tr v-for="item in readerData">
                            <td v-for="column in fixedRightColumns" :width="column.width" :align="column.align">
                                <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                            :columns="item"></table-body>
                                <span v-if="!column.bodySlots">{{item[column.dataIndex]}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import FlyTableColumn from "../fly-table-column/fly-table-column";

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
        props: ['scopedSlots', 'columns'],
        render: function (createElement) {
            return createElement("span", this.scopedSlots.default({
                row: this.columns
            }));
        }
    });
    export default {
        name: "fly-table",
        components: {FlyTableColumn},
        props: {
            columns: {
                type: Array
            },
            data: {
                type: Array
            }
        },
        data() {
            return {
                tableId: this.util.uuid(),
                tableDom: null,
                tableHeaderDom: null,
                tableBodyDom: null,
                tableColumns: [], // table的columns
                tableData: [], // table的数据
                readerData: [], // table需要渲染的数据
                totalWidth: 0, // 所有columns的总宽度
                scrollWidth: 0, // body滚动条的宽度
                fixedLeftColumns: [], // 左侧fixed数据
                fixedLeftWidth: 0, // 左侧fixed宽度
                fixedRightColumns: [], // 右侧fixed数据
                fixedRightWidth: 0, // 右侧fixed宽度
                tablePaddingTop: 0
            }
        },
        computed: {
            // table的实际高度
            tableHeight: function () {
                return this.data.length * 32 - 1;
            }
        },
        methods: {
            // 初始化table
            initTable() {
                if (this.columns) {
                    this.tableColumns = this.columns;
                } else {
                    this.tableColumns = this.$store.state.columns;
                    this.$store.dispatch('clearColumns');
                }
                this.totalWidth = 0;
                this.fixedLeftColumns = [];
                this.fixedLeftWidth = 0;
                this.fixedRightColumns = [];
                this.fixedRightWidth = 0;
                this.tableColumns.forEach((item, index) => {
                    this.totalWidth = this.totalWidth + parseFloat(item.width);
                    if (item.fixed && item.fixed === 'left') {
                        this.fixedLeftColumns.push(item);
                        this.fixedLeftWidth = this.fixedLeftWidth + parseFloat(item.width) + 2;
                    }
                    if (item.fixed && item.fixed === 'right') {
                        this.fixedRightColumns.push(item);
                        this.fixedRightWidth = this.fixedRightWidth + parseFloat(item.width) + 2;
                    }
                });
                this.tableDom = document.getElementById(this.tableId);
                this.tableHeaderDom = this.tableDom.querySelector(".fly-table-header");
                this.tableBodyDom = this.tableDom.querySelector(".fly-table-body");
                this.$nextTick(()=> {
                    const fixedLeft = [...this.tableHeaderDom.querySelectorAll(".table-fixed-left")];
                    this.fixedLeftWidth = 0;
                    fixedLeft.forEach(item => {
                        this.fixedLeftWidth = this.fixedLeftWidth + item.scrollWidth;
                    });
                    this.fixedLeftWidth = this.fixedLeftWidth + 2;
                    const fixedRight = [...this.tableHeaderDom.querySelectorAll(".table-fixed-right")];
                    this.fixedRightWidth = 0;
                    fixedRight.forEach(item => {
                        this.fixedRightWidth = this.fixedRightWidth + item.scrollWidth;
                    });
                    this.fixedRightWidth = this.fixedRightWidth + 2;
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
                    tableFixedLeftBody[0].scrollTop = tableBody.scrollTop;
                    tableFixedLeftBody[1].scrollTop = tableBody.scrollTop;
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
                if (scrollXWidth) {
                    tableFixedLeft.style.maxHeight = 'calc(100% - ' + scrollXWidth + 'px)';
                    tableFixedRight.style.maxHeight = 'calc(100% - ' + scrollXWidth + 'px)';

                }
                if (scrollYWidth) {
                    scrollMask.style.width = scrollYWidth + 'px';
                    tableFixedRight.style.right = scrollYWidth + 'px';
                    tableHeader.style.width = 'calc(100% - ' + scrollYWidth + 'px)';

                }
            },
            // 获取table表格当前需要渲染的数据，设置table的偏移量
            getTableReaderData() {
                let startIndex = Math.floor(this.tableBodyDom.scrollTop / 32);
                const pageNum = Math.ceil(this.tableBodyDom.clientHeight / 32);
                const allData = JSON.parse(JSON.stringify(this.data));
                this.tablePaddingTop = startIndex * 32;
                this.readerData = allData.slice(startIndex, startIndex + pageNum);
            }
        },
        mounted() {
            this.initTable();
            this.getTableReaderData();
            this.listenerScroll();
            this.$nextTick(() => {
                this.setTable();
            })
        }
    }

</script>

<style scoped>

</style>
