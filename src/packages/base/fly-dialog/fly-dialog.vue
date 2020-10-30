<!--
@author huangHe
-->
<template>
    <div class="fly-dialog" v-if="visible"
         :id="mouseStatus === 'down'? 'moveDialog' : ''"
         :style="dialogStyle">
        <!--<div class="fly-dialog-mask"></div> -->
        <div class="fly-dialog-header"
             @mousedown="mousedown($event)"
             @mouseup="mouseup($event)">
            <div class="fly-dialog-title">
                {{title}}
            </div>
            <span class="fly-dialog-close"><i class="fa fa-close" @click="close"></i></span>
        </div>
        <div class="fly-dialog-content">
            <slot></slot>
        </div>
        <div class="fly-dialog-footer">
            <template v-if="this.$scopedSlots.footer">
                <slot name="footer"></slot>
            </template>
            <template v-else>
                <button class="fly-button fly-button-default" @click="handleClose">取消</button>
                <button class="fly-button fly-button-primary" @click="handleOk">确定</button>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fly-dialog',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 500
            },
            height: {
                type: Number
            },
            top: {
                type: Number,
                default: 180
            },
            title: {
                type: String
            },
        },
        model: {
            prop: 'visible',
            event: 'change'
        },
        components: {},
        data() {
            return {
                mouseStatus: 'up' // 鼠标事件
            };
        },
        computed: {
            dialogStyle: function () {
                const winWidth = document.body.clientWidth;
                const style = {
                    width: `${this.width}px`,
                    height: this.height ? `${this.height}px` : 'auto',
                    top: `${this.top}px`,
                    left: `${(winWidth - this.width) / 2}px`
                };
                return style;
            }
        },
        created() {
        },
        methods: {
            // 取消
            handleClose() {
                this.$emit('change', false);
                this.$emit('handleClose', false);
            },
            // 确定
            handleOk() {
                this.$emit('handleOk', false);
            },
            // 右上角关闭按钮
            close() {
                this.$emit('change', false);
                this.$emit('handleClose', false);
            },
            // 鼠标按下事件
            mousedown(ev) {
                this.mouseStatus = 'down';
                this.$nextTick(() => {
                    const oDiv = document.getElementById('moveDialog');
                    const oEvent = ev;
                    const disX = oEvent.clientX - oDiv.offsetLeft;
                    const disY = oEvent.clientY - oDiv.offsetTop;
                    document.onmousemove = function (ev) {
                        const oEvent = ev;
                        const l = oEvent.clientX - disX;
                        const t = oEvent.clientY - disY;
                        if (l <= 0) {
                            oDiv.style.left = 0;
                        } else if (oEvent.clientX >= document.body.clientWidth) {
                            oDiv.style.left = oEvent.clientX - oDiv.offsetWidth + 'px'
                        } else {
                            oDiv.style.left = l + 'px';
                        }
                        if (t <= 0) {
                            oDiv.style.top = 0
                        } else if (oEvent.clientY >= document.body.clientHeight) {
                            oDiv.style.top = oEvent.clientY - oDiv.offsetHeight + 'px'
                        } else {
                            oDiv.style.top = t + 'px';
                        }
                    };
                })
            },
            // 鼠标松起事件
            mouseup() {
                this.mouseStatus = 'up';
                document.onmousemove = null;
            }
        },
        mounted() {
        },
        watch: {}
    };
</script>

<style scoped></style>
