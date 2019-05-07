<template>
  <div>
    <el-container>
      <el-aside width="160px">
        <div class="friendListDiv f-18" style="background: #11cd6e;">会话</div>
        <div class="friendListDiv bg-white" :class="{chatting: item.userId === chatUserId}" v-for="(item,index) in usersList" :key="index" @click="msgListByTwoId(item.userId)">
          <el-badge>{{item.username}}</el-badge>
        </div>
        <div style="background-color: #20a0ff;height: 1px;width: 160px;"/>
      </el-aside>
      <el-main style="padding-top: 0px;padding-bottom: 0px">
        <div class="chatDiv bg-white" ref="chatDiv" id="chatDiv">
          <p v-show="chatUserId" class="m-10 a-c">与
            <el-tag type="primary" size="small">{{chatUserName}}
            </el-tag>
            聊天中
          </p>
          <div v-for="(msg, index) in msgList" :key="index">
            <!-- 发送来的消息 -->
            <div v-if="currentUserId !== msg.sendUserId&&msg.content !== ''" class="receive-message p-v-5">
              <bs-icon name="people" class="userfaceImg"/>
              <div class="receive-font">
                {{msg.content}}
              </div>
            </div>
            <!-- 发出去的消息-->
            <div v-else-if="msg.content !== ''" class="send-message p-v-5">
              <div class="send-font">
                {{msg.content}}
              </div>
              <bs-icon name="people" class="userfaceImg"/>
            </div>
          </div>
        </div>
        <div @keyup.enter="sendMsg" class="a-l m-t-15 w-p-600">
          <el-input v-model="content" placeholder="请输入内容" size="small" style="width: 580px;"></el-input>
          <el-button size="small" :disabled="!chatUserId" type="primary" @click="sendMsg()">发送</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default{
  data () {
    return {
      currentUserId: Number(localStorage.getItem('userId')),
      usersList: [],
      msgList: [],
      content: '',
      chatUserId: null,
      chatUserName: ''
    }
  },
  computed: {
    userId () {
      return this.$route.query.userId
    }
  },
  created () {
    this.chatUserId = parseInt(this.userId)
    this.msgListByTwoId(this.chatUserId)
    this.selectUsersByUserId()
  },
  methods: {
    // 查询聊天用户
    async selectUsersByUserId () {
      let params = {
        userId: this.currentUserId
      }
      const { data } = await this.$store.dispatch('selectUsersByUserId', params)
      if (data.code === 200) {
        this.usersList = data.data
      }
    },
    // 根据发送人id和接收人id查询消息列表
    async msgListByTwoId (id) {
      this.chatUserId = id
      let params = {
        sendUserId: this.currentUserId,
        receiveUserId: id
      }
      const { data } = await this.$store.dispatch('msgListByTwoId', params)
      if (data.code === 200 && data.data !== null) {
        this.msgList = data.data
        this.chatUserName = data.data[0].sendUserId === this.currentUserId ? data.data[0].receiveUserName : data.data[0].sendUserName
      }
    },
    // 发送消息
    async sendMsg () {
      let params = {
        sendUserId: this.currentUserId,
        receiveUserId: this.chatUserId,
        content: this.content
      }
      const { data } = await this.$store.dispatch('seedMsg', params)
      if (data.code === 200) {
        this.msgListByTwoId(this.chatUserId)
        this.content = ''
      }
    }
  }
}
</script>

<style lang="scss">
    .chatting {
      background: #9eea6a !important;
    }
   .send-font {
     word-break: break-all;
     display: inline-flex;
     border-style: solid;
     border-width: 1px;
     border-color: #20a0ff;
     border-radius: 5px;
     padding: 5px 8px 5px 8px
   }
  .receive-font {
    word-break: break-all;
    display: inline-flex;
    border-style: solid;
    border-width: 1px;
    border-color: #20a0ff;
    border-radius: 5px;
    padding: 5px 8px 5px 8px;
    margin-right: 3px;
    background-color: #9eea6a
  }
  .receive-message {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  }
  .send-message {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  }
  .userfaceImg {
    width: 37px;
    height: 37px;
    border-radius: 30px;
    margin-right: 10px;
  }

  .friendListDiv {
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
    box-sizing: border-box;
    align-items: center;
    width: 160px;
    height: 40px;
    border-color: #20a0ff;
    border-left-style: solid;
    border-top-style: solid;
    border-right-style: solid;
    border-width: 1px;
    cursor: pointer
  }

  .chatDiv {
    border-color: #20a0ff;
    border-style: solid;
    border-radius: 5px;
    border-width: 1px;
    box-sizing: border-box;
    width: 680px;
    height: 450px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  .currentChatFriend {
    background-color: #dcdfe6;
  }
</style>
