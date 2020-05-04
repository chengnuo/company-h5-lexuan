<template>
  <div class="aliyunPlayer">
    <div class="aliyunPlayerDialog"></div>

    <div id="J_prismPlayer" class="prism-player" style="display:none;"></div>
    <div class="text">
      {{text}}
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import commonJs from '@/util/common'

window.PLAYER = null

function jPrismPlayerStyle() {
  $('.playerDiv_none').css({
    height: playerHeight,
    display: 'block'
  })

  $('.prism-controlbar-bg').css({
    'height': $('.prism-controlbar').height() + 'px'
  })

  $('.prism-play-btn').css({
    'float': 'left',
    'margin-left': $('.prism-controlbar').height() / 2 - ($('.prism-play-btn').height() / 2) + 'px',
    'margin-right': '10px',
    'margin-top': $('.prism-controlbar').height() / 2 - ($('.prism-play-btn').height() / 2) + 'px'
  })

  $('.new-prism-play-btn').css({
    'width': '35px',
    'height': '35px',
    'position': 'absolute',
    'left': '12px',
    'margin-right': '10px',
    'top': '15px'
  })

  $('.prism-play-btn.playing').css({
    'float': 'left',
    'margin-left': '12px',
    'margin-right': '10px',
    'margin-top': '15px'
  })

  $('.prism-time-display').css({
    'float': 'left',
    'margin-left': '0',
    'margin-top': $('.prism-controlbar').height() / 2 - ($('.prism-time-display').height() / 2) + 'px'
  })

  $('.prism-fullscreen-btn').css({
    'float': 'right',
    'margin-left': '5px',
    'margin-right': '5px',
    'margin-top': $('.prism-controlbar').height() / 2 - ($('.prism-fullscreen-btn').height() / 2) + 'px'
  })

  // 播放按钮居中
  $('.prism-big-play-btn').css({
    left: '50%',
    top: '50%',
    bottom: 'auto',
    'margin-left': '-' + ($('.prism-big-play-btn').width() / 2) + 'px',
    'margin-top': '-' + ($('.prism-big-play-btn').width() / 2) + 'px'
  })

  if (window.location.href.indexOf('/dynamic/') != -1)$('.aliyunPlayer .prism-player .prism-time-display').addClass('_none')
  // 时间容器变长
  var playerHeight = $(window).width() * 0.5625
  // var prismTimeWidth = $(window).width() - ($('.prism-play-btn').width() + 12 + 10) - ($('.prism-fullscreen-btn').width() + 11 + 11);
  // $('.prism-time-display').css({
  //   width: prismTimeWidth
  // });
  $('.playerDiv_none').css({
    height: playerHeight
  })

  // var prismControlbarWidth = $('.prism-time-display').width() - (30 + 7 + 30 + 7 + 2);
  // $('.prism-progress').css({
  //   width: prismControlbarWidth
  // });

  // $('.prism-player .prism-progress').css({
  //   left: ($('.prism-play-btn').width() + 12 + 10 + 39 - 4),
  //   top: $(".prism-controlbar").height() / 2 - ($(".prism-progress").height() / 2) - 5 + 'px'
  // });

  $('.time-bound').html('')
  $('.time-bound').css({
    display: 'none'
  })
} 

export default {
  name: 'aliyunPlayer',
  data() {
    return {
      isShow: false,
      isPlay: false
      // _firstFullscreen:true
    }
  },
  props: {
    text: {
      type: String,
      default: '拼命加载中...'
    },
    sourceUrl: {
      type: String,
      required: true
    },
    coverUrl: {
      type: String,
      required: true
    },
    playerSize: {
      type: Array,
      required: true
    }
  },
  computed: {
  },
  mounted() {
    var _this = this
    var playerHeight = null
    // 视频播放器
    if (this.playerSize[0] > this.playerSize[1]) {
      playerHeight = $(window).width() * (this.playerSize[1] / this.playerSize[0])
    } else {
      playerHeight = $(window).width()
    }

    $('.aliyunPlayer').css({
      height: playerHeight + 'px'
    })

    // 弹出层设置宽高
    $('.aliyunPlayer .aliyunPlayerDialog').css({
      height: playerHeight - 3 + 'px'
    })

    $('.aliyunPlayer .text').css({
      'line-height': playerHeight + 'px'
    })

    setTimeout(() => {
      this.$nextTick(() => {
        // debugger
        var __cover = this.coverUrl
        var __source = this.sourceUrl
        window.PLAYER = new prismplayer({
          id: 'J_prismPlayer',
          source: __source,
          autoplay: false,
          width: '100%',
          playsinline: true,
          showBuffer: true,
          height: playerHeight + 'px',
          // x5_type:"h5",
          // x5_video_position:"top",
          // controlBarVisibility:"always",
          cover: __cover
        })
        // js设置视频区域的样式
        jPrismPlayerStyle()
        this.isShow = true

        // $(".info").css({
        //   "margin-top": playerHeight + "px"
        //   // "height":$(window).height() + "px"
        // })

        // $(".aliyunPlayer").css({
        //   height: playerHeight + "px"
        // })
        // 显示视频区域
        $('#J_prismPlayer').show()

        // 监听播放器的pause事件
        PLAYER.on('pause', () => {
          this.isPlay = false
        })

        // 监听播放器的pause事件
        PLAYER.on('play', () => {
          this.isPlay = true
        })
      })
    }, 100)

    $('.aliyunPlayer .aliyunPlayerDialog').click(() => {
      if (this.isPlay) {
        PLAYER.pause()
      } else {
        PLAYER.play()
      }
    })
    commonJs.appReturnCallback();
    window['appReturnCallback'] = ()=>{
      this.closeAudio(PLAYER)
    }
  },   
  methods: {
    closeAudio(PLAYER){
      if(window.PLAYER){
        $('#J_prismPlayer').empty();
        window.PLAYER.dispose();
      }
    }
  },
  beforeDestroy() {
    if(PLAYER){
      $('#J_prismPlayer').empty();
      window.PLAYER.dispose();
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.aliyunPlayer {
  width: 100%;
  height: 200px;
  background: #22253E;
  overflow: hidden;
  position: relative;
}

/*
  .aliyunPlayer .info{
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
  }
  .aliyunPlayer .info .title{
    width: 100%;
    display: block;
    overflow: hidden;
    color: #C7D0FF;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }*/

.aliyunPlayer .text {
  width: 100%;
  font-size: 16px;
  color: #C7D0FF;
  text-align: center;
}

.aliyunPlayer #J_prismPlayer {
  /*position: fixed;*/
  width: 100%;
  height: 200px;
  /*top: 0;*/
  /*left: 0;*/
  z-index: 10;
  overflow: hidden;
}

.aliyunPlayer .prism-player .prism-big-play-btn {
  width: 55px;
  height: 55px;
  background: url('../assets/img/aliyun/play_01@2x.png') 0px 0px no-repeat;
  background-size: 100%;
}

.aliyunPlayer .prism-player .prism-play-btn {
  width: 20px;
  height: 20px;
  background: url('../assets/img/aliyun/bf-sp@2x.png') left top no-repeat;
  background-size: 100%;
  cursor: pointer;
}

.aliyunPlayer .prism-player .new-prism-play-btn {
  width: 20px;
  height: 20px;
}

.aliyunPlayer .prism-player .prism-live-display {
  width: 56px;
  height: 19px;
  background: url('../assets/img/aliyun/bofang_icon@2x.png') -186px -2px no-repeat;
}

.aliyunPlayer .prism-player .prism-play-btn.playing {
  width: 20px;
  height: 20px;
  background: url('../assets/img/aliyun/zt-sp@2x.png') left top no-repeat;
  background-size: 100%;
}

.aliyunPlayer .prism-player .prism-fullscreen-btn {
  width: 18px;
  height: 18px;
  background: url('../assets/img/aliyun/qp-sp@2x.png') left top no-repeat;
  background-size: 100%;
  display: none;
}

.aliyunPlayer .prism-player .prism-fullscreen-btn.fullscreen {
  width: 30px;
  height: 30px;
  background: url('../assets/img/aliyun/bofang_icon@2x.png') -161px -183px no-repeat;
  display: none;
}

.aliyunPlayer .prism-player .prism-volume {
  width: 33px;
  height: 30px;
  background: url('../assets/img/aliyun/bofang_icon@2x.png') -199px -119px no-repeat;
  display: none;
}

.aliyunPlayer .prism-player .prism-volume.mute {
  width: 33px;
  height: 30px;
  background: url('../assets/img/aliyun/bofang_icon@2x.png') -164px -151px no-repeat
}

.aliyunPlayer .prism-player {
  background-color: #000;
  position: relative
}

.aliyunPlayer .prism-player .prism-cover {
  width: 100%;
  height: 100%;
  background-color: #000;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0
}

.aliyunPlayer .prism-player .prism-controlbar {
  width: 100%;
  height: 2px;
  position: relative;
  z-index: 2;
  background: url('../assets/img/aliyun/yy-sp@2x.png') left top repeat-x;
  background-size: 4px;
  display: block !important;
}

.aliyunPlayer .prism-player .prism-controlbar .prism-controlbar-bg {
  width: 100%;
  height: 50px;
  position: absolute;
  opacity: 0.7;
  background: linear-gradient(-180deg, rgba(82, 90, 133, 0.00) 0%, #262A45 98%);
  bottom: 0;
  left: 0;
  z-index: -1;
  display:none;
}

.aliyunPlayer .prism-player .prism-time-display {
  height:17px;
  font-size:12px;
  font-weight:400;
  line-height:17px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  display: block !important;
}

.aliyunPlayer .prism-player .prism-time-display .current-time {
  color: #fff
}

.aliyunPlayer .prism-player .prism-progress {
  cursor: pointer;
  width: 100%;
  height: 2px;
  background:rgba(204,204,204,1);
  position: relative;
  opacity:1;
  border-radius: 3px;
  margin: 0;
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-loaded {
  position: absolute;
  top: 0;
  left: 1px;
  width: 0;
  height: 100%;
  height: 2px;
  background:rgba(204,204,204,1);
  border-radius: 3px;
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-played {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  height: 2px;
  background:rgba(214,45,45,1);
}

.aliyunPlayer .prism-player .prism-progress .prism-progress-cursor {
  display: none;
  position: absolute;
  width: 6px;
  height: 6px;
  top: -4px;
  left: 0;
  margin-left: -6px;
 background:rgba(204,204,204,1);
  border: 3px solid #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 0 3px #000;
  box-shadow: 0 0 5px #000;
  overflow: hidden;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

 :-webkit-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-moz-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-ms-full-screen {
  width: 100%!important;
  height: 100%!important
}

 :-ms-fullscreen {
  width: 100%!important;
  height: 100%!important
}

 :fullscreen {
  width: 100%!important;
  height: 100%!important;
}

body.prism-full-window {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: auto
}

.prism-fullscreen {
  position: fixed;
  overflow: hidden;
  z-index: 99999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%!important;
  height: 100%!important
}

.aliyunPlayer .now_active {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -25px;
  top: -25px;
}
.prism-play-btn{
  display: none;
}
.aliyunPlayer .prism-player .prism-cover{
  background-size:contain;
}
/*自定义*/

.aliyunPlayer .prism-time-display .duration {
  color: #fff;
}
.aliyunPlayer .prism-player ._none{
  display: none !important;
}
.aliyunPlayer .current-time {
  float: left;
  font-size: 12px;
  display: none !important;
}

.aliyunPlayer .duration {
  float: right;
  font-size: 12px;
  display: none;
}

.aliyunPlayer .time-bound {
  display: none;
}

.aliyunPlayer .aliyunPlayerDialog{
  background: #c00;
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0;
}
</style>
