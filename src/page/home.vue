<!--  -->
<template>
  <div>
      <h2>{{message}}</h2>
      <van-button type="primary" @click="changeNum">主要按钮</van-button>

      <!-- <van-cell-group> -->
        <input placeholder="请输入用户名" @focus="changeA" id="input" autofocus/>
      <!-- </van-cell-group> -->
      <van-button type="primary" @click="changeA">跳转</van-button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { setInterval } from 'timers';
export default {
  data () {
    return {
      value:""
    };
  },

  components: {},

  mounted() {
      //逻辑
    this.$store.dispatch('dashbord/change',2525)
  },

  methods: {
    changeNum () {
      this.$store.dispatch('dashbord/change',2222)
    },
    changeA () {
      setInterval(()=>{
        this.$toast('提示文案');
         document.getElementById("input").focus()
        // window.location.href = "https://bozmall.docdom.com/productClass?token=%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE1NzgxMDU0MTY5ODAiLCJleHAiOjE1NzgxMTI2MTYsImFjY291bnQiOiIxODgzMzg3MjkzNiJ9.9TJ6fzhUYAi60afG4tieStEeOeb22R12V8cyniUpm48"
        window.location.href = "http://192.168.200.54:7000/productClass?token=%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE1NzgxMzUwMDA4NzUiLCJleHAiOjE1NzgxNDIyMDAsImFjY291bnQiOiIxNzMxOTE4OTc2MSJ9.60HaE3gMmLgtA1ZdUB6YAOFwXN9bEB9QTbODpv2Uwqg"
        // window.open("http://192.168.200.54:7000/productClass?token=%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE1NzgxMDU0MTY5ODAiLCJleHAiOjE1NzgxMTI2MTYsImFjY291bnQiOiIxODgzMzg3MjkzNiJ9.9TJ6fzhUYAi60afG4tieStEeOeb22R12V8cyniUpm48")
      },5000)
    },

  },
  computed: {
    ...mapState({
      message:state => state.dashbord.message,
      total:state => state.dashbord.total,

    })
  },
  watch:{
    message (newM,oldM) {
      console.log(newM,oldM)
    }
  }
}

</script>
<style lang='less' scoped>
</style>