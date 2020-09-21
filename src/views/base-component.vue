<template>
    <div class="layout baseComponent">
        <div class="left-menu">
            <div class="title">基础组件</div>
            <ul class="menu">
                <li v-for="(item, index) in menu" @click="clickMenu(index)">{{item.label}}</li>
            </ul>
        </div>
        <div class="right-main">
            <div v-if="showIndex === 0">
                <div style="width: 200px">
                    <fly-input v-model="testInput"/>
                </div>
                <fly-input v-model="testInput" style="width: 200px"/>
                <fly-input v-model="testInput" width="200" placeholder="请输入"/>
                <fly-input v-model="testInput" width="200" search/>
            </div>
            <div v-if="showIndex === 1">
                <fly-select placeholder="请选择" width="200" :options="options" v-model="flySelectValue"></fly-select>
            </div>
            <div v-if="showIndex === 2">
                <fly-button label="按钮1"/>
                <fly-button label="按钮2" primary/>
                <fly-button label="按钮3" primary disabled/>
            </div>
            <div v-if="showIndex === 3" class="table" style="height: 300px">
                <fly-table :data="data">
                    <fly-table-column v-for="column in tableColumns" :key="column.key"
                                      :title="column.title" :data-index="column.dataIndex" :width="column.width"
                                      :fixed="column.fixed" :header-align="column.align"
                                      :align="column.align"></fly-table-column>
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
            <div v-if="showIndex === 4">
                <fly-pagination></fly-pagination>
            </div>
            <div v-if="showIndex === 5">
                <fly-picker width="200"></fly-picker>
            </div>
            <div v-if="showIndex === 6"></div>
            <div v-if="showIndex === 7"></div>
        </div>
    </div>
</template>

<script>
    import FlyTable from "../packages/base/fly-table/fly-table";
    import FlyTableColumn from "../packages/base/fly-table-column/fly-table-column";
    import FlySelect from '../packages/base/fly-select/fly-select'
    import FlyPagination from '../packages/base/fly-pagination/fly-pagination'
    import FlyButton from '../packages/base/fly-button/fly-button'
    import FlyInput from '../packages/base/fly-input/fly-input'
    import FlyPicker from '../packages/base/fly-picker/fly-picker'

    const tableColumns = [
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
    ];
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i,
            name: '20180229001111',
            age: '新购',
            serialNumber: i + 1,
            address: `London Park no. ${i}`,
        });
    }
    export default {
        name: "base-component",
        components: {
            FlyTableColumn,
            FlyTable,
            FlySelect,
            FlyPagination,
            FlyButton,
            FlyInput,
            FlyPicker
        },
        props: {},
        model: {},
        data() {
            return {
                menu: [],
                showIndex: 0,
                tableColumns,
                data,
                options: [
                    {label: '1', value: 1},
                    {label: '2', value: 2},
                    {label: '3', value: 3},
                ],
                flySelectValue: 2,
                testValue: '123',
                testInput: ''
            }
        },
        methods: {
            clickMenu(index) {
                this.showIndex = index;
            }
        },
        mounted() {
            this.menu = [
                {label: '输入框'},
                {label: '选择框'},
                {label: '按钮'},
                {label: '表格'},
                {label: '分页'},
                {label: '日期选择'},
            ]
        }
    }
</script>
<style scoped lang="less" src="../styles/layout.less">
</style>
