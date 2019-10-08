<template>
  <div>
  <div class="nav-bar">
    <el-select v-model="value" placeholder="请选择" @change="handleCheckedCitiesChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
  <el-table
    :data="getData"
    class="table-demo"
  >
    <el-table-column
      prop="gender"
      label="日期"
    >
    </el-table-column>
    <el-table-column
      prop="nat"
      label="姓名"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="地址"
    >
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'


  export default {

    data () {
      console.log(this.$store,555)
      return {
        options:[{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],
        value: ''
      }
    },

    computed: {
      // getData(state){
      //   return state.tableData
      // },
      ...mapGetters(['getData'])
    },

    mounted () {
      this.$store.dispatch('getData')

    },

    methods:{
      handleCheckedCitiesChange (value) {
        console.log(value)
        this.$store.dispatch('getData',value)
      }
    }
  }
</script>

<style>
  .table-demo {
    width: 800px;
  }
</style>
