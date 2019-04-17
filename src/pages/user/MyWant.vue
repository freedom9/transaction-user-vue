<template>
  <div class="mywant p-20">
    <ul>
      <li>
        <div class="list-header"><span>时间：2019-04-16 12:20:55</span></div>
        <div class="list-main p-10">
          <img class="f-l" src="../../assets/images/logo.png" alt="">
          <div class="good-info f-l m-l-20">大学生就业指导</div>
          <div class="operation f-r a-c">
            <div class="m-b-10"><el-button size="mini">查看详情</el-button></div>
            <div><el-button size="mini">移除想要</el-button></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.mywant {
  ul li {
    background-color: #fff;
    border: #e5e5e5 solid 1px;
    margin-bottom: 20px;
    overflow: hidden;
    .list-main {
      overflow: hidden;
      img {
        width: 100px;
        height: 100px;
        border: #e5e5e5 solid 1px;
      }
      .operation {
        width: 150px;
        border-left: #e5e5e5 solid 1px;
        height: 70px;
        padding: 15px 0;
      }
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: #e5e5e5 solid 1px;
    }
  }
}
</style>
