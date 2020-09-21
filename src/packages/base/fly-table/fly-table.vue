<!--
@author huangHe
-->
<template>
    <div class="fly-table" :id="tableId">
        <div style="display: none">
            <slot name="header"></slot>
            <slot></slot>
        </div>
        <div class="fly-table-header">
            <table cellspacing="0" cellpadding="0" border="0" :width="totalWidth">
                <thead>
                <tr>
                    <th v-for="(column) in tableColumns" :width="column.width" :align="column.headerAlign">
                        <table-header v-if="column.headerSlots" :scopedSlots="column.headerSlots"
                                      :columns="column"></table-header>
                        <span v-if="!column.headerSlots">{{column.title}}</span>
                    </th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="scrollMask"></div>
        <div class="fly-table-body">
            <table cellspacing="0" cellpadding="0" border="0" :width="totalWidth">
                <tbody>
                <tr v-for="item in data">
                    <td v-for="(column, index) in tableColumns" :width="column.width" :align="column.align">
                        <table-body v-if="column.bodySlots" :scopedSlots="column.bodySlots"
                                    :columns="item"></table-body>
                        <span v-if="!column.bodySlots">{{item[column.dataIndex]}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="fly-table-fixed-left" :style="{'width': fixedLeftWidth + 'px'}">
            <div class="fly-table-fixed-header">
                <table cellspacing="0" cellpadding="0" border="0" :width="fixedLeftWidth">
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
                <table cellspacing="0" cellpadding="0" border="0" :width="fixedLeftWidth">
                    <tbody>
                        <tr v-for="item in data">
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
        <div class="fly-table-fixed-right"
             :style="{'width': fixedRightWidth + 'px'}">
            <div class="fly-table-fixed-header">
                <table cellspacing="0" cellpadding="0" border="0" :width="fixedRightWidth">
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
                <table cellspacing="0" cellpadding="0" border="0" :width="fixedRightWidth">
                    <tbody>
                    <tr v-for="item in data">
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
                tableColumns: [], // table的columns
                tableData: [], // table的数据
                totalWidth: 0, // 所有columns的总宽度
                scrollWidth: 0, // body滚动条的宽度
                fixedLeftColumns: [], // 左侧fixed数据
                fixedLeftWidth: 0, // 左侧fixed宽度
                fixedRightColumns: [], // 右侧fixed数据
                fixedRightWidth: 0, // 右侧fixed宽度
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
                        this.fixedLeftWidth = this.fixedLeftWidth + parseFloat(item.width);
                    }
                    if (item.fixed && item.fixed === 'right') {
                        this.fixedRightColumns.push(item);
                        this.fixedRightWidth = this.fixedRightWidth + parseFloat(item.width);
                    }
                });
            },
            // 监听滚动条，实现同步滚动, 计算滚动条宽度
            listenerScroll() {
                const tableDom = document.getElementById(this.tableId);
                const tableHeader = tableDom.querySelector(".fly-table-header");
                const tableBody = tableDom.querySelector(".fly-table-body");
                const tableFixedLeftBody = tableDom.querySelectorAll(".fly-table-fixed-body");
                this.scrollWidth = tableBody.offsetWidth - tableBody.scrollWidth;
                tableBody.addEventListener("scroll", function () {
                    tableHeader.scrollLeft = tableBody.scrollLeft;
                    tableFixedLeftBody[0].scrollTop = tableBody.scrollTop;
                    tableFixedLeftBody[1].scrollTop = tableBody.scrollTop;
                });
            },
            // 根据是否有滚动条优化宽高
            setTable() {
                const tableDom = document.getElementById(this.tableId);
                const tableHeader = tableDom.querySelector(".fly-table-header");
                const tableBody = tableDom.querySelector(".fly-table-body");
                const scrollXWidth = tableBody.offsetHeight - tableBody.clientHeight;
                const scrollYWidth = tableBody.offsetWidth - tableBody.clientWidth;
                const tableFixedLeft = tableDom.querySelector(".fly-table-fixed-left");
                const tableFixedRight = tableDom.querySelector(".fly-table-fixed-right");
                const scrollMask = tableDom.querySelector(".scrollMask");

                if (scrollXWidth) {
                    tableFixedLeft.style.height = 'calc(100% - ' + scrollXWidth + 'px)';
                    tableFixedRight.style.height = 'calc(100% - ' + scrollXWidth + 'px)';
                    scrollMask.style.width = scrollYWidth + 'px';
                }
                if (scrollYWidth) {
                    tableFixedRight.style.right = scrollYWidth + 'px';
                    tableHeader.style.width = 'calc(100% - ' + scrollYWidth + 'px)';

                }
            }
        },
        mounted() {
            this.initTable();
            this.listenerScroll();
            this.$nextTick(() => {
                this.setTable();
            })
        }
    }

</script>

<style scoped>

</style>
