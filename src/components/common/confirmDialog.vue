<template>
  <el-dialog
    :title="title"
    width="400px"
    :visible.sync="dialogTableVisible"
    :before-close="handleClose"
  >
    <el-form :model="form" class="lock-form">
      <el-form-item :label="`${title}结果`">
        <el-radio-group v-model="form.status">
          <el-radio
            :label="item.value"
            v-for="(item, index) in labelList"
            :key="index"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="`${title}说明`">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 2}" v-model="form.reason"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['dialogTableVisible', 'dialogType'],
  data () {
    return {
      form: {

      }
    }
  },
  computed: {
    title () {
      return this.dialogType == 'check' ? '审核' : '锁定'
    },
    labelList () {
      let arr = []
      if (this.dialogType == 'check') {
        arr = [{
          label: '通过', value: 2
        }, {
          label: '不通过', value: 3
        }]
      }
      else {
        arr = [{
          label: '锁定', value: 0
        }, {
          label: '已锁定', value: 3
        }]
      }
      return arr
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    submit () {
      console.log(this.form)
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style lang="scss">
 .lock-form {
   .el-radio-group {
     width: 100%;
   }
 }
</style>

