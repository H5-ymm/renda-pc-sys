<template>
  <div class="markdowns">
    <breadcrumb :breadcrumbs="breadcrumb" class="box-title"></breadcrumb>
    <!-- 新建文章页面 -->
    <el-row class="conts">
      <el-col
        class="write-btns"
        :xs="{span: 8, offset: 8}"
        :sm="{span: 6, offset: 12}"
        :md="{span: 4, offset: 16}"
        :lg="{span: 3, offset: 18}"
        :xl="{span: 2, offset: 20}"
        justify="end"
      >
        <div class="grid-content bg-purple-dark">
          <el-button type="info" @click="submitForm('ruleForm','2')">保存草稿</el-button>
        </div>
      </el-col>
      <el-col
        class="write-btns"
        :xs="{span: 8}"
        :sm="{span: 6}"
        :md="{span: 4}"
        :lg="{span: 3}"
        :xl="{span: 2}"
        justify="end"
      >
        <div class="grid-content bg-purple-dark">
          <el-button type="success" @click="submitForm('ruleForm','1')">发布文章</el-button>
        </div>
      </el-col>
    </el-row>
    <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rulesform">
      <el-form-item label="文章标题:" prop="name">
        <el-input v-model="form.name" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章描述:" prop="introduction">
        <el-input
          type="textarea"
          v-model="form.introduction"
          placeholder="请简要描述文章内容"
          maxlength="150"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类:" prop="classed">
        <el-select v-model="form.classed" placeholder="请选择文章分类">
          <el-option
            v-for="(item,index) in clsList"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="贴个标签:" prop="checkedA">
        <el-select
          v-model="form.checkedA"
          multiple
          :size="modes"
          allow-create
          class="selectCls"
          :multiple-limit="multipleLimit"
          default-first-option
          placeholder="贴个标签"
        >
          <el-option
            v-for="item in tablesList"
            :key="item.value"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-button @click="mackdownSubmit">默认按钮</el-button> -->
      <el-form-item label="文章内容:" prop="tx">
        <div class="write-texts">
          <!-- <mark-down @on-save='mackdownSubmit' value='' /> -->
          <!-- <img src="../assets/img/emjo.png" alt @click="showEmoji=!showEmoji" class="img" /> -->
          <!-- <div v-show="showEmoji">
            <VEmojiPicker :pack="pack.data" @select="selectEmoji" class="emoji-item" />
          </div>
          <mavon-editor
            ref="md"
            :subfield="subfield"
            @imgAdd="$imgAdd"
            :toolbars="toolbars"
            v-model="form.tx"
            @save="saveStr"
          />-->
          <div id="editor" class="editor"></div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';
import Breadcrumb from './breadcrumb/Breadcrumb'
import E from 'wangeditor'
// import MarkDown from 'vue-meditor'
export default {
  components: {
    Breadcrumb,
    VEmojiPicker
  },
  data () {
    return {
      breadcrumb: ['文章管理', '添加文章(MarkDown编辑器)'],
      autoSaves: true,
      form: {  //表单数据
        name: '',  //文章名称
        introduction: '',  //文章简介
        classed: '',  //文章分类
        checkedA: [],  //文章标签
        tx: '',   //文章内容
        bst: 2 //1为富文本编辑器，2为markDown        
      },
      rulesform: { //校验规则
        name: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入文章简介', trigger: 'blur' },
          { min: 10, max: 150, message: '长度在 10 到 150 个字符', trigger: 'blur' }
        ],
        classed: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        checkedA: [
          { type: 'array', required: true, message: '请至少选择一个文章标签', trigger: 'change' }
        ],
        tx: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      // clsList:[], //分类列表
      // tablesList:[], //标签列表
      modes: 'mini',
      multipleLimit: 5,  //标签最多选择个数
      value: '',
      subfield: false,
      pack: packData,
      emoji: '',
      showEmoji: false,
      menus: [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        // 'foreColor',  // 文字颜色
        // 'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'undo',  // 撤销
        'redo'  // 重复
      ]
    }
  },
  watch: {
    showEmoji (val) {
      console.log(val)
      if (val) {
        console.log(document.getElementById('InputSearch'))
        document.getElementById('InputSearch').style.display = "none"
      }
    }
  },
  mounted () {
    var editor = new E('#editor')
    console.log(packData.data)
    let arr = packData.data.map(item => { return item.emoji })
    console.log(arr)
    editor.customConfig.menus = this.menus
    editor.customConfig.emotions = [{
      // tab 的标题
      title: '默认',
      // type -> 'emoji' / 'image'
      type: 'image',
      // content -> 数组
      content: [
        {
          alt: '[坏笑]',
          src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/50/pcmoren_huaixiao_org.png'
        },
        {
          alt: '[舔屏]',
          src: 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png'
        }
      ]
    },
    {
      // tab 的标题
      title: 'emoji',
      type: 'emoji',
      content: arr
    }]
    editor.create()
  },
  methods: {
    selectEmoji (info) {
      console.log(info)
      this.emoji = info.emoji
      this.showEmoji = false
      this.forms.tx = info.emoji
      this.$refs.md.d_value = info.emoji
    },
    subfieldtoggle () {
      console.log(1)
    },
    submitForm (formName, tp) {  //提交表单
      if (this.$store.state.user.desc > 1) {
        this.$alert('此账号为测试账号,无法进行此操作', '温馨提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$message({
              type: 'info',
              message: '取消操作'
            });
          }
        });
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // 存储文章
          this.$http({
            method: 'POST',
            url: 'addwrite',
            data: {
              forms: this.form,
              types: tp
            }
          }).then((res) => {
            //console.log(res.data)
            if (res.data.code == 0) {
              this.$notify({
                title: '成功',
                message: '文章发布成功',
                type: 'success'
              });
              this.form.name = ''
              this.form.introduction = ''
              this.form.classed = ''
              this.form.checkedA = []
              this.form.tx = ''
            } else {
              this.$notify.error({
                title: '错误',
                message: '未知错误'
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    saveShareContent: function (content, fileName) {
      let downLink = document.createElement('a')
      downLink.download = fileName
      //字符内容转换为blod地址
      let blob = new Blob([content])
      downLink.href = URL.createObjectURL(blob)
      // 链接插入到页面
      document.body.appendChild(downLink)
      downLink.click()
      // 移除下载链接
      document.body.removeChild(downLink)
    },
    saveStr: function (value) {
      if (!value) {
        return;
      }
      this.saveShareContent(value, 'nodebook.md')
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      this.$http({
        url: 'srcImgsMarkDown',
        method: 'POST',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        console.log(url.data.url)
        this.$refs.md.$img2Url(pos, url.data.url);
      })
    }
  },
  created () {

  },
  computed: {
    clsList: function () {
      return this.$store.state.clsList
    },
    tablesList: function () {
      return this.$store.state.tablesList
    }
  }
}
</script>

<style scoped>
.markdowns{
    /* overflow-y:scroll; */
}
.write-table{
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 10px 10px;
}
.write-table-list{
  padding: 0px 20px;
  font-size: 12px;
  border: 1px solid #DCDFE6;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 15px;
  display: inline-block;
  margin-bottom: 10px;
  background: #DCDFE6;
  line-height: 25px;
}
.write-texts{
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 10px 10px;
  position: relative;
}
.write-texts .img {
  position: absolute;
  right: 32%;
  top: 22px;
  z-index: 3222;
}
.write-texts .emoji-item {
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 3422;
  height: 256px;
}
.write-btns{
  margin-bottom: 5px;
}
.checkli{
  border-radius: 10px;
  margin-bottom: 10px;
}

.selectCls{
  width: 100%;
}


.box-title{
  overflow-y: hidden;
}
</style>
