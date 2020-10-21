<!--
@author huangHe
-->
<script>
    export default {
        name: "fly-table-column",
        render: function (createElement) {
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
                rowData: {}
            }
        },
        computed: {

        },
        mounted() {
            const columns = {
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
            if(this.$scopedSlots.default) {
                columns.bodySlots = this.$scopedSlots
            }
            if (this.$scopedSlots.header) {
                columns.headerSlots = this.$scopedSlots
            }
            this.rowData = columns;
            this.$store.dispatch('addColumns', columns);
        }
    }
</script>
