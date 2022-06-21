<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 鼠标移入事件 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return{
        currentIndex:0
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex]||{}
      }
    },
    mounted(){
      // 将父组件给的数据进行打印
      // console.log(this.skuImageList,'1111');
      // 全局事件总线，获取兄弟组件传递过来的索引值
      this.$bus.$on("getIndex",(index)=>{
        // 当兄弟把索引值给我之后修改当前响应式数组
        this.currentIndex=index
      })
    },
    methods: {
      handler(event){
        let mask=this.$refs.mask
        let big=this.$refs.big
        let left=event.offsetX-mask.offsetWidth/2
        let top=event.offsetY-mask.offsetHeight/2
         // 鼠标移动的约束范围
        if(left<=0) left=0
        if(top<0) top=0
        if(left>=mask.offsetWidth) left=mask.offsetWidth
        if(top>=mask.offsetHeight) top=mask.offsetHeight
        // 修改元素的left|top的属性值
        mask.style.left=left+'px'
        mask.style.top=top+'px'
        // 大图片的大小是这个的两倍，所以说样式变化的方向与其相反是其的两倍
       big.style.left=(-2*left)+'px'
        big.style.top=(-2*top)+'px'
       
       
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>