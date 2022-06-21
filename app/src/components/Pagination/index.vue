<template>
  <div class="pagination">
    <!-- 第一部分 -->
    <button :disabled="pageNo==1" @click="$emit('getpageNo',pageNo-1)">上一页</button>
    <button v-if="starNumAndEndNum.start > 1" @click="$emit('getpageNo',1)" :class="{active:pageNo==1}">
      1
    </button>
    <button v-if="starNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in starNumAndEndNum.end"
      :key="index"
      v-if="page >= starNumAndEndNum.start"
       @click="$emit('getpageNo', page)"
       :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>
    <!--第三部分  -->
    <button v-if="starNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="starNumAndEndNum.end < totalPage" @click="$emit('getpageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getpageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //  计算出总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的起始页码以及结束页码
    starNumAndEndNum() {
      const { continues, totalPage, pageNo } = this;
      let start = 0,
        end = 0;
      // 不正常现象，连续的页码数大于总页码数
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象 ,连续的页码数小于总页码数（连续页码为5，但是总页码一定是大于5的）
        start = pageNo - parseInt(continues / 2);
        // 结束的数字
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // end纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>
