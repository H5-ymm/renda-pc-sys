<template>
  <el-dialog
    title="请选择城市"
    :visible="dialogVisible"
    width="60%"
    :before-close="handleClose"
    class="dialog-city"
  >
    <div class="x-flex-start city-content">
      <ul class="cityList">
        <li
          v-for="(item,index) in provinceList"
          class="provice-hover"
          @click="handle(item,index)"
          :class="{'provice-active': index==activeIndex}"
          :key="index"
        >{{item.name}}</li>
      </ul>
      <div class="x-flex-start list city-box">
        <span
          v-for="(item,index) in cityList"
          @click="getCityCode(item)"
          :key="index"
          class="item"
        >{{item.name}}</span>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getProvincesList, getCitysList, getAreasList } from '../api/login'
import { cityList } from '../base/base'
export default {
  props: ['dialogVisible'],
  data () {
    return {
      provinceList: [],
      cityList,
      activeIndex: 0,
      code: '',
      codeList: []
    };
  },
  created () {
    this.getRegion()
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    handle (item, index) {
      this.code = item.code
      this.codeList.push(this.code)
      this.activeIndex = index
      this.getCityList(item.code)
    },
    getCityCode (item) {
      this.codeList.push(item.code)
      this.$emit('getCityCode', item)
      this.codeList = []
    },
    getProlist (list) {
      return list.map(item => {
        let obj =
        {
          code: item.provinceid,
          name: item.province,
          children: []
        }
        return obj
      })
    },
    getRegion () {
      getProvincesList().then(res => {
        let arr = this.getProlist(res.data)
        this.provinceList = arr
      })
    },
    getCityList (code) {
      this.cityList = []
      getCitysList({ code }).then(res => {
        this.cityList = res.data
      })
    },
  }
};
</script>
<style>
  .dialog-city {
    overflow: hidden;
  }
  .v-note-wrapper .v-note-op .v-left-item .op-icon-divider {
    border-right: none;
  }
  .v-note-wrapper .v-note-op {
    height: 30px;
  }
  .dialog-city .el-dialog__body {
    padding: 0;
  }
  .cityList {
    width: 130px;
    height: 380px;
    overflow-y: auto;
    background: #f9fafb;
    margin: 10px 0;
  }
  .cityList li {
    padding:10px 20px;
  }
  .x-flex-start{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .city-content {
    height:400px;
  }
  .city-box {
    flex-wrap: wrap;
  }
  .provice-hover:hover{
    color: #1890FF;
    background: #fff;
  }
  .provice-active {
    color: #1890FF;
    position: relative;
  }
  .provice-active::before{
    content:'';
    width: 3px;
    height: 38px;
    background: #1890FF;
    position: absolute;
    left: 0;
    top:0;
  }
  .city-box span {
    display: inline-block;
    width: 25%;
    height: 40px;
  }
  .list {
    width: 70%;
    margin:20px auto;
    padding-left:20px;
  }
  .item:hover{
    color: #1890FF;
  }
</style>