<!--
@author huangHe
-->
<template>
    <div class="fly-table-list">
        <fly-table :dataSource="dataSource" :rowHeight="32" @selectionChange="selectionChange">
            <fly-table-column fixed type="selection" header-align="center" align="center" width="50"></fly-table-column>
            <fly-table-column fixed type="index" header-align="center" align="center" width="50">
                <template slot="header" slot-scope="scope">
                    <i class="fa fa-bars"></i>
                </template>
            </fly-table-column>
            <fly-table-column v-for="column in columns" :key="column.key"
                              :title="column.title" :data-index="column.dataIndex" :width="column.width"
                              :fixed="column.fixed" :header-align="column.align"
                              :align="column.align">
                <template slot-scope="scope">
                    {{dataSource[scope.index][column.dataIndex]}}
                </template>
            </fly-table-column>
        </fly-table>
    </div>
</template>

<script>
    import FlyTable from "@/packages/base/fly-table/fly-table";
    import FlyTableColumn from "@/packages/base/fly-table-column/fly-table-column";
    export default {
        name: 'fly-list-table',
        props: {
            columns: {
                type: Array
            },
            dataSource: {
                type: Array
            }
        },
        components: {FlyTable, FlyTableColumn},
        data() {
            return {};
        },
        created() {
        },
        methods: {
            selectionChange(items) {
                console.log(items)
            },
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
