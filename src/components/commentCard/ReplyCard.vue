<template>
  <div v-if="showComment">
    <div class="edit-card-item x-flex-start" v-for="(item,index) in commentList" :key="index">
      <div class="edit-card-comment-col1">
        <img src="../../assets/img/img1.png" alt class="head-img" v-if="item.head_img" />
        <span v-if="!item.head_img" class="head-img">{{item.username}}</span>
      </div>
      <div class="edit-card-comment-col2">
        <p>
          <span class="user-name">{{item.username}}</span>
          <span>：{{item.content}}</span>
        </p>
        <div class="bg-purple text-light reply-btn">
          <span>{{$moment(item.addTime).format('YYYY-MM-DD')}}</span>
          <!-- <p> -->
          <!-- <span v-if="uid==item.user_id" @click="deleteComment(item.id)">删除</span> -->
          <span @click="handleComment(index,item,1)">{{uid==item.user_id?'删除':'评论'}}</span>
          <!-- </p> -->
        </div>
        <commentInput
          :isShow="currentIndex == index&&showFirstComment"
          @submitComment="submitComment"
          :createdName="item.username"
          @cancleComment="cancleComment(1)"
        ></commentInput>

        <section class="edit-card-comment-section" v-for="(val,ind) in item.replyList" :key="ind">
          <div class="x-flex-start">
            <div class="edit-card-comment-col2">
              <p>
                <span class="user-name">{{val.r_name}}</span>
                <span class="reply">回复</span>
                <span class="user-name">{{val.username}}</span>
                <span>：{{val.content}}</span>
              </p>
              <p class="bg-purple text-light">
                <span>2019-12-01</span>
                <span
                  class="reply-active"
                  @click="handleComment(index,item,2,ind,val)"
                >{{val.user_id==uid?'删除':'回复'}}</span>
              </p>
            </div>
          </div>
          <commentInput
            :isShow="currentIndex==index&&currentChildIndex==ind"
            @submitComment="submitComment"
            :createdName="val.username"
            :reName="val.r_name"
            @cancleComment="cancleComment(2)"
          ></commentInput>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import commentInput from './commentInput'
export default {
  props: ['commentList', 'username', 'showComment'],
  name: 'reply',
  components: {
    commentInput
  },
  data () {
    return {
      uid: localStorage.getItem('uid'),
      currentIndex: -1,
      currentChildIndex: -1,
      type: 0,
      id: '',
      showFirstComment: false
    }
  },
  watch: {
    showComment (val) {
      if (!val) {
        this.cancleComment(1)
      }
    }
  },
  methods: {
    handleComment (index, item, type, ind, val) {
      this.type = type
      if (type == 2) {
        //  相等删除操作
        this.id = val.id
        if (this.uid == val.user_id) {
          this.$emit('delelteReply', val.id)
        }
        else {
          this.currentChildIndex = ind
          this.showFirstComment = false
          this.$emit('cancelComment')
        }
      } else {
        this.id = item.id
        if (this.uid == item.user_id) {
          this.$emit('deleteComment', item.id)
          this.showFirstComment = false
        }
        else {
          this.currentChildIndex = ind
          this.currentIndex = index
          this.showFirstComment = true
          this.$emit('cancelComment')
        }
      }
    },
    deleteComment (id) {
      this.id = id
      this.$emit('deleteComment', id)
    },
    submitComment (val) {
      let params = {
        uid: localStorage.getItem('uid'),
        type: 2,
        content: val,
        p_id: 1,
        discuss_id: this.id,
        comment_id: 1
      }
      this.$emit('submit', params)
    },
    cancleComment (index) {
      this.currentChildIndex = -1
      if (index == 1) {
        this.currentIndex = -1
        this.showFirstComment = false
      }
    }
  }
}
</script>
<style lang="scss">
 .edit-card-comment-col1 {
    margin: 0 10px;
    .head-img {
      width:50px;
      height:50px;
      border-radius:50%;
      display: inline-block;
    }
    >span {
      background: #1890FF;
      color: #fff;
      text-align: center;
      line-height: 50px;
      overflow: hidden;
      font-size: 12px;
    }
  }
  .edit-card-comment-col2 {
    font-size:14px;
    padding-top: 5px;
    width: 100%;
  }
  .edit-card-comment-section {
    width:100%;
    background:#F4F4F4;
    border-radius:5px;
    padding: 5px 15px 5px 10px;
  }
  // .reply-btn > p{
  //   margin-right: -15px;
  //   span {
  //     margin-left: 5px;
  //   }
  // }
  .text-light.reply-btn {
    margin: 5px -10px 10px 0;
  }
  .reply-active {
    color: #333;
  }
  .user-name {
    color: #1890FF;
  }
  .reply {
    margin: 0 4px;
    color: #333;
    font-weight:400;
  }

</style>
