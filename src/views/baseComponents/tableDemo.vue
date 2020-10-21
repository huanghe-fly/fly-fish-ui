<!--
@author huangHe
-->
<template>
    <div style="height: 500px">
        <fly-table v-bind:dataSource="data" :rowHeight="43">
            <fly-table-column fixed type="selection" header-align="center" align="center" width="50"> </fly-table-column>
            <fly-table-column fixed type="index" header-align="center" align="center" width="50"> </fly-table-column>
            <fly-table-column v-for="column in tableColumns" :key="column.key"
                              :title="column.title" :data-index="column.dataIndex" :width="column.width"
                              :fixed="column.fixed" :header-align="column.align"
                              :align="column.align">
                <template slot-scope="scope">
                    <fly-input v-model="scope.row[column.dataIndex]"></fly-input>
                </template>
            </fly-table-column>
            <!--<fly-table-column title="单据编号" dataIndex="name" width="150">
                <template slot="header" slot-scope="scope">
                    改变header{{scope.row.title}}
                </template>
                <template slot-scope="scope">
                    我的测试{{scope.row.name}}
                </template>
            </fly-table-column>
            <fly-table-column title="取得方式" dataIndex="age" width="150">
                <template slot-scope="scope">
                    我的测试{{scope.row.age}}
                </template>
            </fly-table-column>
            <fly-table-column title="取得日期" dataIndex="address" width="150"></fly-table-column>
            <fly-table-column title="合同编号" dataIndex="address" width="150"></fly-table-column>-->
        </fly-table>
    </div>
</template>

<script>
    import FlyTable from "@/packages/base/fly-table/fly-table";
    import FlyTableColumn from "@/packages/base/fly-table-column/fly-table-column";
    import FlyInput from "@/packages/base/fly-input/fly-input"
    export default {
        name: 'tableDemo',
        props: {},
        components: {FlyTable, FlyTableColumn, FlyInput},
        data() {
            return {
                tableColumns: [
                    {
                        title: '单据编号',
                        dataIndex: 'name',
                        key: '0',
                        width: 150,
                        fixed: 'left',
                        align: 'left',
                        display: true,
                        search: true,
                        searchType: 'input'
                    },
                    {
                        title: '取得方式',
                        dataIndex: 'age',
                        key: '1',
                        width: 100,
                        fixed: 'left',
                        align: 'right',
                        display: true,
                        search: true,
                        searchType: 'select'
                    },
                    {
                        title: '取得日期',
                        dataIndex: 'address',
                        key: '2',
                        width: 150,
                        align: 'left',
                        display: true,
                        search: true,
                        searchType: 'time'
                    },
                    {
                        title: '合同编号',
                        dataIndex: 'address',
                        key: '3',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '发票编号',
                        dataIndex: 'address',
                        key: '4',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '采购组织形式',
                        dataIndex: 'address',
                        key: '5',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '预算项目',
                        dataIndex: 'address',
                        key: '6',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '供应商',
                        dataIndex: 'address',
                        key: '7',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '到货日期',
                        dataIndex: 'address',
                        key: '8',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'time'
                    },
                    {
                        title: '验收人',
                        dataIndex: 'address',
                        key: '9',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '入库说明',
                        dataIndex: 'address',
                        key: '10',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'textarea'
                    },
                    {
                        title: '入库数量',
                        dataIndex: 'address',
                        key: '11',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '入库总金额',
                        dataIndex: 'address',
                        key: '12',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '制单日期',
                        dataIndex: 'address',
                        key: '13',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'time'
                    },
                    {
                        title: '制单人',
                        dataIndex: 'address',
                        key: '14',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    },
                    {
                        title: '审核日期',
                        dataIndex: 'address',
                        key: '15',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'time'
                    },
                    {
                        title: '审核人',
                        dataIndex: 'address',
                        key: '16',
                        width: 150,
                        fixed: 'right',
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input'
                    }
                ],
                data: []
            };
        },
        created() {
        },
        methods: {},
        mounted() {
            this.data = [];
            for (let i = 0; i < 50; i++) {
                this.data.push({
                    key: i,
                    name: '20180229001111',
                    age: '新购',
                    serialNumber: i + 1,
                    address: `London Park no. ${i}`,
                });
            }
        },
        watch: {}
    };
</script>

<style scoped></style>
