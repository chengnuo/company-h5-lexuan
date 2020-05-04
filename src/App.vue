<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
  // import { listAd } from '@/api/test'
  export default {
    name: 'actLogin',
    data(){
      return{

      }
    },
    mounted(){
      // listAd({
      //   page: 1
      // }).then(response => {
      //   console.log(response)
      // }).catch(() => {
        
      // })
    }
  }
</script>
<style>
*{
  margin: 0;
  padding:0;
  font-family:"PingFang SC","Arial","Hiragino Sans GB","Microsoft Yahei";
  -webkit-tap-highlight-color:rgba(255,255,255,0)
}
i,em{
  font-style: normal;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
html,body{
  min-height: 100%;
  background: #f5f5f5;
}
img{
  display: block;
  pointer-events: none;
  content: normal !important;
}
input,textarea{
  background: transparent;
  border: none;
  resize:none
}
.clearfix:after{
  content:"";
  display:block;
  clear:both;
}
.line-clamp{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.line-clamp-1{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
