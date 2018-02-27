<template>


</template>

<script>
    export default {
        name: 'checkCourse_tableDiv',
        data () {
            return {
                checked: 0,
            }
        },
        props:['queryCourse'],
//        父组件传递查找结果课表
        watch: {
            queryCourse: function () {
                this.items = this.queryCourse;
                try{
                    for (var i = 0; i < this.items.length; i++) {
                        for ( var key in this.items[i]){
                            if(this.items[i][key].indexOf("br") > 0){
                                console.log(this.items[i][key]);
                                var first = this.items[i][key].split("<br>");
                                this.items[i][key] = first[0];
                                for (var j = 0; j < first.length - 1; j++) {
                                    this.items[i][key] += "<br>"+first[j+1];
                                }
                            }
                        }
                    }
                }catch (e){
                    this.items = JSON.parse(JSON.stringify(this.queryCourse));
                }
//                该异常捕获尝试根据后端返回数据中的<br>进行换行显示，可能由于编码或者其它原因，v-html不能完成保证自动解析<br>等html标签
            }//查找课表内容替换
        },
    }
</script>

<style scoped>
    @media screen and (max-width:1025px) {
        #headTdTime:after{
            width: 0.1rem;
            height: 6.7rem;
            transform: rotate(-43deg);
            -ms-transform: rotate(-43deg);/* IE 9 */
            -webkit-transform: rotate(-43deg);/* Safari and Chrome */
            -o-transform: rotate(-43deg);/* Opera */
            -moz-transform: rotate(-43deg);/* Firefox */
        }
    }
    @media screen and (min-width:1025px) and (max-width:1173px) {
        #headTdTime:after{
            width: 0.1rem;
        }
        #headTdClass:before{
            width: 0.1rem;
        }
    }
</style>
