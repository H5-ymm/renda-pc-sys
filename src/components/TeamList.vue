<template>
  <div class="tables-box">
   <div class="table-list company-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部团队" name="all">
        <teamTable :tableType="activeName"></teamTable>
      </el-tab-pane>
      <el-tab-pane label="成员账户" name="personal">
        <teamTable :tableType="activeName"></teamTable>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>
<script>
// import { getTeamList, checkTeamSave } from '../api/team'
import teamTable from './teamMessage/teamTable'
export default {
  components: {
    teamTable
  },
  data () {
    return {
      activeName: 'all',
    }
  },
  created () {
  },
  methods: {
    handleClick(tab, event){
      console.log(tab, event);
    },
  }
}
</script>

<style lang="scss">
@import '../assets/css/table-list';
</style>
