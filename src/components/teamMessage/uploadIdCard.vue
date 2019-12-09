<template>
  <div>
    <div class="uploader-card">
      <el-upload
        class="idCard-uploader-card idCard-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else src="../../assets/img/team/card.png" alt="" class="card-uploader-icon">
      </el-upload>
      <p class="idcard-text">点击上传带头像一面</p>
    </div>
    <div class="uploader-card">
     <el-upload
        class="idCard-uploader-card idCard-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img v-else src="../../assets/img/team/card1.png" alt="" class="card-uploader-icon">
      </el-upload>
      <p class="idcard-text">点击上传带国徽的一面</p>
      <ul class="idcard-tip">
        <li>1.上传文件要求为扫描件或清晰照片；</li>
        <li>2.照片要求格式为jpg、jpeg或png。</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(){}
  }
}
</script>

<style lang="scss">
   .card-uploader-icon {
      width: 162px;
      height: 128px;
    }
    .idcard-tip {
      position: absolute;
      right: -100px;
      top: 30px;
      font-size: 14px;
      color: #999;
    }
</style>

