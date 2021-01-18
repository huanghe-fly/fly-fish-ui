<!--
@author huangHe
-->
<template>
    <div class="fly-picker" :style="{'width': width + 'px'}">
        <div class="fly-picker-wapper fly-input">
            <input class="" v-model="currentDay"/>
            <i class="fly-input-icon iconfont icon-calendar"></i>
        </div>
        <div class="fly-picker-panel">
            <div class="fly-picker-panel-header">
                <span class="fly-picker-left-but">
                    <button class="fly-button fly-button-icon" @click="prevYear"><i class="fa fa-angle-double-left"></i></button>
                    <button class="fly-button fly-button-icon" @click="prevMonth"><i class="fa fa-angle-left"></i></button>
                </span>
                <span>
                    <button class="fly-button fly-button-text">{{getDayData.year}}年</button>
                    <button class="fly-button fly-button-text">{{getDayData.month}}月</button>
                </span>
                <span class="fly-picker-right-but">
                    <button class="fly-button fly-button-icon" @click="nextMonth"><i class="fa fa-angle-right"></i></button>
                    <button class="fly-button fly-button-icon" @click="nextYear"><i class="fa fa-angle-double-right"></i></button>
                </span>
            </div>
            <div class="fly-picker-panel-body">
                <table cellspacing="0" cellpadding="0" border="0">
                    <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="days in getDayData.days">
                        <td v-for="day in days" :class="day.className">
                            <span @click="choiceDay(day)">{{day.date}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table cellspacing="0" cellpadding="0" border="0">
                    <!--<tr v-for="days in temporaryYear">
                        <td v-for="day in days" :class="day.className">
                            <span @click="choiceDay(day)">{{day.date}}</span>
                        </td>
                    </tr>-->
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fly-picker",
        props: {
            width: [Number, String],
        },
        model: {},
        data() {
            return {
                currentYear: null,
                currentMonth: null,
                currentDay: null,
                temporaryYear: null,
                temporaryMonth: null

            }
        },
        computed: {
            // 获取年数组
            getYearData() {
                let years = [];
                let today = new Date();
                let year = this.temporaryYear;
                if (!year) {
                    year = today.getFullYear();
                    this.temporaryYear = year;
                }
                console.log(this.temporaryYear)
            },
            // 获取月数组
            getMonthData() {

            },
            // 根据年，月获取日数组
            getDayData() {
                let days = [];
                let today = new Date();
                let year = this.currentYear;
                let month = this.currentMonth;
                let day = this.currentDay;
                if (!year || !month || !day) {
                    year = today.getFullYear();
                    this.currentYear = year;
                    month = today.getMonth() + 1;
                    this.currentMonth = month;
                    day = today.getDate();
                    this.currentDay = day
                }
                //获取该月第一天的Date对象
                let firstDateObj = new Date(year, month - 1, 1);
                //获取该月第一天对应的星期几
                let firstDateWeekDay = firstDateObj.getDay();
                //获取该月最后一天的Date对象
                let lastDateObj = new Date(year, month, 0);
                //获取该月最后一天的日期
                let lastDate = lastDateObj.getDate();
                //获取上一个月最后一天的Date对象
                let lastDateOfPrevMonthObj = new Date(year, month - 1, 0);
                //获取上一个月最后一天的日期
                let lastDateOfPrevMonth = lastDateOfPrevMonthObj.getDate();
                //上月
                for (let i = 0; i < firstDateWeekDay; i++) {
                    const className = "fly-available fly-disabled";
                    const date = lastDateOfPrevMonth - firstDateWeekDay + i + 1;
                    let thisMonth = month - 1;
                    let thisYear = year;
                    if (thisMonth === 0) {
                        thisMonth = 12;
                        thisYear = year - 1
                    }
                    days.push({
                        "date": date,
                        "showDate": date,
                        "thisMonth": thisMonth,
                        "thisYear": thisYear,
                        "className": className
                    });
                }
                //本月
                for (let i = 0; i < lastDate; i++) {
                    let className = "fly-available";
                    const date = i + 1;
                    const thisMonth = month;
                    const thisYear = year
                    if (date === day) {
                        className = "fly-available fly-current";
                    }
                    if (today.getDate() === date && today.getFullYear() === year && today.getMonth() + 1 === month) {
                        days.push({
                            "date": date,
                            "showDate": "今天",
                            "thisMonth": thisMonth,
                            "thisYear": thisYear,
                            "className": className
                        });
                    } else {
                        days.push({
                            "date": date,
                            "showDate": date,
                            "thisMonth": thisMonth,
                            "thisYear": thisYear,
                            "className": className
                        });
                    }

                }
                let nextMonthLength = days.length;
                //下月
                for (let i = 0; i < 7 * 6 - nextMonthLength; i++) {
                    const className = 'fly-available fly-disabled';
                    const date = i + 1;
                    let thisMonth = month + 1;
                    let thisYear = year;
                    if (thisMonth === 13) {
                        thisMonth = 1;
                        thisYear = year + 1
                    }
                    days.push({
                        "date": date,
                        "showDate": date,
                        "thisMonth": thisMonth,
                        "thisYear": thisYear,
                        "className": className
                    });
                }
                return {
                    "year": firstDateObj.getFullYear(),
                    "month": firstDateObj.getMonth() + 1,
                    "days": this.arrTrans(7, days)
                }
            }
        },
        methods: {
            // 一维数组转换为二维数组
            arrTrans(num, arr) {
                const iconsArr = []; // 声明数组
                arr.forEach((item, index) => {
                    const page = Math.floor(index / num); // 计算该元素为第几个素组内
                    if (!iconsArr[page]) { // 判断是否存在
                        iconsArr[page] = [];
                    }
                    iconsArr[page].push(item);
                });
                return iconsArr;
            },
            // 上一年
            prevYear() {
                this.currentYear = this.currentYear - 1
            },
            // 下一年
            nextYear() {
                this.currentYear = this.currentYear + 1
            },
            // 上一个月
            prevMonth() {
                this.currentMonth = this.currentMonth - 1;
                if(this.currentMonth<1) {
                    this.currentMonth = 12;
                    this.prevYear()
                }
            },
            // 下一个月
            nextMonth() {
                this.currentMonth = this.currentMonth + 1;
                if(this.currentMonth > 12) {
                    this.currentMonth = 1;
                    this.nextYear()
                }
            },
            // 年份选择
            choiceYear(year) {
                this.currentYear = year
            },
            // 月份选择
            choiceMonth(month) {
                this.currentMonth = month
            },
            // 日期选择
            choiceDay(day) {
                this.currentYear = day.thisYear;
                this.currentMonth = day.thisMonth;
                this.currentDay = day.date
            }
        },
        mounted() {
            this.getYearData;
        }
    }
</script>
<style scoped>
</style>
