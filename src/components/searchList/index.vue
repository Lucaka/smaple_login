<template>
  <div class="container">
    <div class="border-bottom" style="padding: 10px 0 10px 0" v-for="criteria in SearchCriteria" :key="criteria">
      <div class="form-group row">
        <div class="title">品名:</div>
        <input v-model="criteria.Text">
      </div>
      <div class="form-group row">
        <div class="title">狀態:</div>
        <div v-for="item in criteria.Item" :key="item.Text">
          <input type="checkbox">{{ item.Text }}
        </div>
      </div>
      <div class="form-group row">
        <div class="title">測試Select:</div>
        <select>
          <option value="volvo">正常</option>
          <option value="volvo">鎖定</option>
        </select>
      </div>
      <div class="form-group row">
        <div class="title">測試Radio:</div>
        <div v-for="item in criteria.Item" :key="item.Text">
          <input type="radio" name="radio" value="鎖定">{{ item.Text }}
        </div> 
      </div>
      <button>搜尋</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    created () {
      this.getRequest('http://www.udp3c.com.tw:9999/UDPWebAPI/api/Service/GetSearchCriteria').then(res => {
        console.log(res.data.result)
        this.SearchCriteria = res.data.result
      })
    },
    data () {
      return {
        SearchCriteria : []
      }
    }
  }
</script>

<style scoped>
  .title {
    width: 100px;
  }

  .row {
    align-items: center;
  }
</style>