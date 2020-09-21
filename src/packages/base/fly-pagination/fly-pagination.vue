<!--
@author huangHe
-->
<template>
    <div class="fly-pagination">
        <div class="fly-pagination-total">共{{total}}条</div>
        <div class="fly-pagination-sizes fly-select">
            <input readonly="readonly"
                   @focus="focus()" @blur="blur()" v-model="pageSizeString"/>
            <i class="fly-select-icon fa fa-angle-down" :class="isShowOptions ? 'angle-up' : ''"
               tabindex="0" @focus="focus()" @blur="blur()"></i>
            <div v-if="isShowOptions" class="fly-options">
                <label class="fly-option" v-for="option in pageSizes" @click="clickOption(option)">{{getPageSizeString(option)}}</label>
            </div>
        </div>
        <button class="fly-button fly-btn-prev" @click="prevPage()"><i class="fa fa-angle-left"></i></button>
        <div class="fly-page" @click="onPageClick($event)">
            <a class="fly-page-number" :class="{ active: currentPage === 1 }"
               v-if="pageCount > 0">1</a>
            <a class="fly-page-number more quickprev fa"
               :class="[quickprevIconClass]"
               v-if="showPrevMore"
               @mouseenter="onMouseEnter('left')"
               @mouseleave="quickprevIconClass = 'icon-more'">
                <span v-if="quickprevIconClass=='icon-more'">···</span>
            </a>
            <a class="fly-page-number" v-for="page in getPages"
               :class="{ active: currentPage === page }">{{page}}</a>
            <a class="fly-page-number more quicknext fa"
               :class="[quicknextIconClass]"
               v-if="showNextMore"
               @mouseenter="onMouseEnter('right')"
               @mouseleave="quicknextIconClass = 'icon-more'">
                <span v-if="quicknextIconClass == 'icon-more'">···</span>
            </a>
            <a class="fly-page-number" :class="{ active: currentPage === pageCount }"
               v-if="pageCount > 1">{{pageCount}}</a>
        </div>
        <button class="fly-button fly-btn-next" @click="nextPage()"><i class="fa fa-angle-right"></i></button>
        <div class="fly-pagination-jump"></div>
    </div>
</template>

<script>
    export default {
        name: "fly-pagination",
        props: {
            pageSizes: {
                type: Array, default: function () {
                    return [10, 20, 30, 40]
                }
            },
            pageIndex: {
                type: Number, default: 0
            },
            pageSize: {
                type: Number, default: 10
            },
            total: {
                type: Number, default: 0
            }
        },
        model: {},
        data() {
            return {
                isShowOptions: false, // 是否显示下拉选项
                pageSizeString: '', // 每页显示多少条，String
                currentPage: 1, // 当前页码
                pageCount: 100, // 一共多少页
                maxPageCount: 7, // 最多显示多少页码，不包含more
                showPrevMore: false,
                showNextMore: false,
                quickprevIconClass: 'icon-more',
                quicknextIconClass: 'icon-more',
            }
        },
        computed: {
            getPages() {
                const maxPageCount = this.maxPageCount; // 最多显示页码数量
                const halfPagerCount = (maxPageCount - 1) / 2;// 中间页码
                const currentPage = this.currentPage; // 当前页码
                const pageCount = this.pageCount; // 页码总数
                let showPrevMore = false;
                let showNextMore = false;

                if (pageCount > maxPageCount) {
                    if (currentPage > maxPageCount - halfPagerCount) {
                        showPrevMore = true;
                    }
                    if (currentPage < pageCount - halfPagerCount) {
                        showNextMore = true;
                    }
                }
                const array = [];
                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (maxPageCount - 2);
                    for (let i = startPage; i < pageCount; i++) {
                        array.push(i);
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 2; i < maxPageCount; i++) {
                        array.push(i);
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(maxPageCount / 2) - 1;
                    for (let i = currentPage - offset ; i <= currentPage + offset; i++) {
                        array.push(i);
                    }
                } else {
                    for (let i = 2; i < pageCount; i++) {
                        array.push(i);
                    }
                }
                this.showPrevMore = showPrevMore;
                this.showNextMore = showNextMore;
                return array;
            },
        },
        methods: {
            getPageSizeString(pageSize) {
                return pageSize + '条/页';
            },
            focus() {
                this.isShowOptions = true;
            },
            blur() {
                setTimeout(() => {
                    this.isShowOptions = false;
                }, 200)
            },
            clickOption(option) {
                this.pageSizeString = this.getPageSizeString(option);
                this.$emit('handleSizeChange', option)
            },
            prevPage(){
              this.currentPage = this.currentPage - 1;
              if(this.currentPage < 1) {
                  this.currentPage = 1;
              }
            },
            nextPage() {
                this.currentPage = this.currentPage + 1;
                if(this.currentPage > this.pageCount) {
                    this.currentPage = this.pageCount;
                }
            },
            onPageClick(event) {
                const target = event.target;
                let newPage = Number(event.target.textContent);
                const pageCount = this.pageCount;
                const currentPage = this.currentPage;
                const pagerCountOffset = this.maxPageCount - 2;

                if (target.className.indexOf('more') !== -1) {
                    if (target.className.indexOf('quickprev') !== -1) {
                        newPage = currentPage - pagerCountOffset;
                    } else if (target.className.indexOf('quicknext') !== -1) {
                        newPage = currentPage + pagerCountOffset;
                    }
                }
                if (!isNaN(newPage)) {
                    if (newPage < 1) {
                        newPage = 1;
                    }

                    if (newPage > pageCount) {
                        newPage = pageCount;
                    }
                    if (newPage !== currentPage) {
                        this.currentPage = newPage;
                    }
                }
            },
            onMouseEnter(direction) {
                if (this.disabled) return;
                if (direction === 'left') {
                    this.quickprevIconClass = 'fa-angle-double-left';
                } else {
                    this.quicknextIconClass = 'fa-angle-double-right';
                }
            },

        },
        mounted() {
            this.pageSizeString = this.getPageSizeString(this.pageSize)
        }
    }
</script>

<style scoped>

</style>
