<!--
@author huangHe
-->
<template>
    <div class="fly-list-module">
        <div>
            <div></div>
            <div>
                <div></div>
                <div>
                    <fly-search-groups v-model="tableColumns"></fly-search-groups>
                </div>
                <div style="height: 500px">
                    <fly-list-table :columns="tableColumns" :dataSource="data"></fly-list-table>
                </div>
                <div><fly-pagination></fly-pagination></div>
            </div>
        </div>
    </div>
</template>

<script>
    import FlySearchGroups from "@/packages/extension/fly-search-groups/fly-search-groups";
    import FlyListTable from "@/packages/extension/fly-list-table/fly-list-table";
    import FlyPagination from "@/packages/base/fly-pagination/fly-pagination";
    export default {
        name: 'fly-list-module',
        props: {},
        components: {FlyListTable, FlySearchGroups, FlyPagination},
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
                        searchType: 'input',
                        checked: true
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
                        searchType: 'select',
                        checked: true
                    },
                    {
                        title: '取得日期',
                        dataIndex: 'address',
                        key: '2',
                        width: 150,
                        align: 'left',
                        display: true,
                        search: true,
                        searchType: 'time',
                        checked: true
                    },
                    {
                        title: '合同编号',
                        dataIndex: 'address',
                        key: '3',
                        width: 150,
                        align: 'center',
                        display: true,
                        search: false,
                        searchType: 'input',
                        checked: true
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
