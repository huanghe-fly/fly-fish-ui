<!--
@author huangHe
-->
<template>
    <div>列表
        <div style="height: 500px">
            <fly-list-table :columns="tableColumns" :dataSource="data"></fly-list-table>
        </div>
    </div>
</template>

<script>
    import FlyListTable from "@/packages/extension/fly-list-table/fly-list-table"
    export default {
        name: 'listTableDemo',
        props: {},
        components: {FlyListTable},
        data() {
            return {
                tableColumns: [
                    {
                        title: '单据编号',
                        dataIndex: 'name',
                        width: 150,
                        fixed: 'left',
                        align: 'left',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '取得方式',
                        dataIndex: 'age',
                        width: 100,
                        fixed: 'left',
                        align: 'right',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '取得日期',
                        dataIndex: 'address',
                        width: 150,
                        align: 'left',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '合同编号',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '发票编号',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '采购组织形式',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '预算项目',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '供应商',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '到货日期',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '验收人',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '入库说明',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '入库数量',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '入库总金额',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '制单日期',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '制单人',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '审核日期',
                        dataIndex: 'address',
                        width: 150,
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    },
                    {
                        title: '审核人',
                        dataIndex: 'address',
                        width: 150,
                        fixed: 'right',
                        align: 'center',
                        display: '1',
                        searchChecked: '1',
                        searchable: '1',
                        type: 'text'
                    }
                ],
                data: []
            };
        },
        created() {
        },
        methods: {
            selectionChange(items) {
                console.log(items)
            },
        },
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
