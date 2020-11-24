<!--
@author huangHe
-->
<!--<template>
    <div>{{title}}-&#45;&#45;</div>
</template>-->
<script>
    export default {
        name: "fly-table-column",
        render: function (createElement) {
            return createElement("span", this.title);
        },
        props: {
            dataIndex: {
                type: String
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String]
            },
            fixed: {
                type: [Boolean, String]
            },
            headerAlign: {
                type: String, default: 'center'
            },
            align: {
                type: String, default: 'center'
            },
            type: {
                type: String, default: 'normal'
            }
        },
        data() {
            return {
                column: {}
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
            const column = {
                dataIndex: this.dataIndex,
                title: this.title,
                width: this.width,
                fixed: this.fixed === true ? 'left':this.fixed,
                headerAlign: this.headerAlign,
                align: this.align,
                type: this.type,
                headerSlots: null,
                bodySlots: null
            };
            // 默认多选框和序号左侧固定
            if (this.type === 'selection' || this.type === 'index') {
                column.fixed = 'left';
            }
            if(this.$scopedSlots.default) {
                column.bodySlots = this.$scopedSlots
            }
            if (this.$scopedSlots.header) {
                column.headerSlots = this.$scopedSlots
            }
            this.column = column;
            this.$parent.tableColumns.push(column);
        },
        beforeDestroy() {
            const index = this.$parent.tableColumns.indexOf(this.column);
            if (index > 1) {
                this.$parent.tableColumns.splice(index, 1);
            }
        }
    }
</script>
