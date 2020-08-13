<template>
  <div class="all">
    <!-- 首页 -->
    <div class="home">
      <!-- 背景 -->
      <div class="section-1 activebg"></div>
      <!-- 标题 -->
      <div class="content-1">
        <div class="title">
          <h1>前端路上的探索者</h1>
        </div>
        <div class="name">
          <h2>我是郭子林</h2>
        </div>
      </div>
      <!-- 打字机 -->
      <div class="typer">
        <div class="content">
          <p class="static">I'm&nbsp;&nbsp;</p>
          <!-- 动态变化的内容-->
          <p class="dynamic">
            <span class="cut">
              <span class="word" v-for="(item,index) in words" :key="index">{{item}}</span>
            </span>
            <!-- 模拟光标-->
            <span class="cursor"></span>
          </p>
        </div>
      </div>
    </div>
    <!-- 作品页 -->
    <div class="pj">
      <!-- 背景 -->
      <div class="section-2 activebg"></div>
      <!-- 作品卡片 -->
      <div class="pj-card" v-if="showpj" :class="[showpj?'animate__animated':'']">
        <!-- card 1 -->
        <div class="card" v-for="(item,index) in project" :key="index"
          :class="[item.classname,item.current?'current':'']">
          <h1 class="title" @click="iscurrent(index)">{{item.title}}</h1>
          <div class="content">
            <div class="pic pic1" @click="iscurrent(index)"><img :src="item.pic1" alt="">
            </div>
            <div class="pic pic2" @click="iscurrent(index)"><img :src="item.pic2" alt="">
            </div>
            <div class="detail">
              <p>{{item.content}}</p>
            </div>
            <a href="javascript:void(0);" class="more" @click="ripple(index,$event)" ref="ripple">READ MORE
            </a>
          </div>
        </div>

      </div>
    </div>
    <!-- 关于我 -->
    <div class="aboutme">
      <div class="section-3 activebg"></div>
    </div>
    <!-- 联系页 -->
    <!-- <div class="contact">
      <div class="section-4 activebg"></div>
    </div> -->
  </div>
</template>

<script>
// 导航组件导入
// import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Home',
  data () {
    return {
      //str初始化
      str: "JerryLin",
      //str分解后的存放单个字母的数组
      letters: [],
      //字母数组push，pop的载体(绑定在实例上显示)
      words: [],
      //表示当前是第几句话
      order: 1,
      // 页面滚动高度
      // scrollH: 0

      showpj: false,
      project: [{
        name: 'card1',
        classname: 'one',
        current: false,
        title: '静态页面',
        pic1: require('../assets/images/pj/bg.png'),
        pic2: require('../assets/images/pj/bg.png'),
        content: `自学期间仿写的静态网页，主要技术是HTML、CSS，也有用到JQuery和原生JS制作的特效，其中包含PC端页面、移动端页面。
        这类网页的编写让我熟练使用了前端的基础技术，我也在其中加入了一些自己的想法，和相应的优化，例如设置节流阀、兼容性判断等。`
      }, {
        name: 'card2',
        classname: 'two',
        current: false,
        title: '后端页面',
        pic1: require('../assets/images/pj/jk.png'),
        pic2: require('../assets/images/pj/jk.png'),
        content: `一些后台管理类网页，主要技术是Vue，也有用到Element-ui和Echarts制作的后台管理系统。
        有网络请求天气信息的网页和请求临时搭建的mockjs作为接口的网页等。`
      }, {
        name: 'card3',
        classname: 'three',
        current: false,
        title: 'H5小游戏',
        pic1: require('../assets/images/pj/pyg.png'),
        pic2: require('../assets/images/pj/pyg.png'),
        content: `空闲时间做的H5小游戏网页，面向对象编程，能锻炼编程能力和算法逻辑等。
        有2048、贪吃蛇等、`
      }]
    }
  },
  watch: {
    //监听order值的变化，改变str的内容
    order (old, newV) {
      if (this.order % 4 == 1) {
        this.str = "JerryLin"
      }
      else if (this.order % 4 == 2) {
        this.str = " looking for a job. "
      }
      else if (this.order % 4 == 3) {
        this.str = " a front-end programmer."
      }
      else {
        this.str = " coding the web..."
      }
    }
  },
  components: {
    // Navigation //导航组件
  },
  methods: {
    begin () {
      this.letters = this.str.split("");
      for (let i = 0; i < this.letters.length; i++) {
        // 每次打印一个字母(调用一次write方法)
        setTimeout(this.write(i), i * 100)
      }
    },
    // 打印方法(在words中添加)
    write (i) {
      return () => {
        let L = this.letters.length;
        this.words.push(this.letters[i]);
        // 如果输入完毕，在2s后开始删除
        if (i == L - 1) {
          setTimeout(() => {
            // 因为setTimeout方法指向window所以要用that转换出调用back的this
            this.back();
          }, 2000)
        }
      }
    },
    // 
    back () {
      let L = this.letters.length;
      for (let i = 0; i < L; i++) {
        setTimeout(this.wipe(i), i * 50);
      }
    },
    // 删除方法(在words中删除)
    wipe (i) {
      return () => {
        this.words.pop(this.letters[i]);
        // 如果删除完毕，300ms后循环开始
        if (this.words.length == 0) {
          this.order++;
          setTimeout(() => {
            this.begin();
          }, 300);
        }
      }
    },

    iscurrent (index) {
      // console.log(this.project[index].name);
      // console.log(this.project[index].current);

      // 第一个是不动的 所以点击第一个时另外两个全部current
      if (index == 0) {
        this.project.forEach((item, index) => {
          if (index > 0) {
            this.project[index].current = true
          }
        });
      } else if (index == 1) {
        this.project.forEach((item, index) => {
          if (index > 1) {
            this.project[index].current = true
          } else if (index <= 1) {
            this.project[index].current = false
          }
        });
      } else {
        this.project.forEach((item, index) => {
          this.project[index].current = false
        });
      }
    },

    // 滚动触发动画
    handleScroll () {
      // console.log(this);
      var that = this;
      // 页面滚动高度
      document.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset //页面滚动距离
        var sect2Top = document.querySelector(".pj").offsetTop //第二屏页面距离页面顶部距离
        // 第一屏移动到第二屏时
        // 我的项目出现
        if (scrollTop >= 2 * sect2Top / 3) {
          // console.log(that);
          that.showpj = true
        }
      })
    },

    // 按钮渐变
    ripple (index, e) {
      // 接收v-for的第index按钮和点击事件对象$event
      console.log(index);
      // console.log(this.$refs.ripple[index]);
      var a = this.$refs.ripple[index]; //获取第index个a
      console.log(a);
      console.log(e);
      var x = e.offsetX; //点击位置距离a左上角起点的水平距离
      var y = e.offsetY; //点击位置距离a左上角起点的垂直距离
      console.log(x, y);
      // 创建、添加span元素
      var span = document.createElement("span")
      span.className = "effect"
      a.appendChild(span)
      span.style = `left:${x}px;top:${y}px`
      setTimeout(() => {
        span.remove()
      }, 1000)
    }
  },
  mounted () {
    //页面初次加载后调用begin()开始动画 (分割字符串为单个字母)
    this.begin();
    // this.scroll();
    this.handleScroll();

  },

}
</script>

<style lang="scss" scoped>
@keyframes flash {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes moveup {
  0% {
    background-position: center 100%;
  }
  50% {
    background-position: center 0;
  }
  100% {
    background-position: center 100%;
  }
}

.all {
  .activebg {
    width: 100%;
    height: 100vh;
    position: relative;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  // 首页
  .home {
    .section-1 {
      background-image: url("../assets/images/bg/1.jpg");
      background-position: center 0;
      position: relative;
    }
    .content-1 {
      overflow: hidden;
      position: absolute;
      padding: 1%;
      width: 60%;
      border-radius: 10px;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.6);
      top: 40%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      transition: all 0.4s ease-out;
      &:hover {
        box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);
      }
      .title,
      .name {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      h1,
      h2 {
        background-color: transparent;
        background-repeat: repeat-y;
        padding: 1%;
        text-align: center;
        font-weight: bold;
        letter-spacing: 10px;
        transition: all 1s ease-out;
        animation: moveup linear 60s infinite;
        // text-shadow: 0 1px 0 black, 0 0 10px black;
        // -webkit-text-stroke: 1px #333;
      }
      h1 {
        font-size: 70px;
        background-image: url("../assets/images/bg/5.jpg");
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
      h2 {
        font-size: 54px;
        background-image: url("../assets/images/bg/6.jpg");
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
    // 打字机
    .typer {
      position: absolute;
      top: 60%;
      width: 100%;
      .content {
        font-weight: bold;
        font-size: 50px;
        display: flex;
        justify-content: center;
        letter-spacing: 2px;
        .static {
          margin-right: 16px;
          color: #fff;
        }
        .dynamic {
          position: relative;
          .cut {
            color: #e84d49;
          }
        }
        .cursor {
          position: absolute;
          height: 100%;
          width: 4px;
          top: 0;
          background-color: #e84d49;
          animation: flash 1.5s linear infinite;
        }
      }
    }
  }
  // 作品页
  .pj {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    .section-2 {
      height: 100vh;
      background-image: url("../assets/images/bg/2.jpg");
      background-position: 5% 100%;
    }
    .pj-card {
      position: absolute;
      height: 100%;
      width: 54vw;
      display: flex;
      top: 0;
      padding-top: 12%;
      margin-left: 5vw;
      overflow: hidden;
      animation: fadeInLeft;
      animation-duration: 2s;
      .card {
        transition: all 1s ease-out;
        width: 50vw;
        height: 60vh;
        position: absolute;
        display: flex;
        .title {
          height: 100%;
          width: 2vw;
          font-size: 1vw;
          line-height: 2vw;
          text-align: center;
          font-weight: normal;
          color: #fff;
          cursor: pointer;
          border: 2px solid #fff;
          // color: #333;
          background-color: #ff6467;
          transition: all 0.5s ease-out;
          &:hover {
            transition: all 0.5s ease-out;
            background-color: #e65151;
            text-shadow: 0 1px 0 #fff, 0 0 5px #000;
          }
        }
        .content {
          width: 48vw;
          position: relative;
          opacity: 1;
          transition: all 1s ease-out;
          border: 2px solid #fff;
          border-left: none;
          background-color: #eee;
          .pic {
            position: absolute;
            width: 24vw;
            height: 14vw;
            border: 4px solid #fff;
            top: -6vh;
            transition: all 1s ease-out;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .detail {
            width: 43%;
            padding: 1vw;
            p {
              font-size: 1.6em;
              text-indent: 2em;
              line-height: 1.6em;
              color: #fff;
              text-shadow: 0 1px 0 black, 0 0 5px black;
              white-space: pre-wrap;
            }
          }
          .more {
            position: absolute;
            bottom: 6vh;
            right: 10vw;
            padding: 20px 36px;
            letter-spacing: 2px;
            font-size: 18px;
            background: linear-gradient(90deg, #0162c8, #55e7fc);
            background: linear-gradient(90deg, #755bea, #ff72c0);
            border-radius: 40px;
            color: #fff;
            overflow: hidden;
            // text-shadow: 0 1px 0 black, 0 0 5px black;
          }
        }
      }
      .current {
        transform: translateX(48vw);
        transition: all 1s ease-out;
        .content {
          transition: all 1s ease-out;
          opacity: 0;
          .pic1 {
            transition: all 1s ease-out;
            // transform: rotateZ(45deg);
          }
        }
      }
      .one {
        left: 0;
        .title {
          padding-top: 2vh;
          // background-color: #a0d6b4;
        }
        .content {
          // background-color: #91cdb4;
          .pic {
            right: 4vw;
          }
          .pic1 {
            transform: rotateZ(-20deg);
          }
          .pic2 {
            transform: rotateZ(10deg);
            right: 2vw;
            top: 10vh;
          }
        }
      }
      .two {
        left: 2vw;
        .title {
          padding-top: 8vh;
          // background-color: #81c5b8;
          border-left: none;
        }
        .content {
          // background-color: #72bcbd;
          .pic {
            // transform: rotateZ(6deg);
            right: 3vw;
          }
          .pic1 {
            transform: rotateZ(6deg);
          }
          .pic2 {
            transform: rotateZ(-10deg);
            top: 10vh;
          }
        }
      }
      .three {
        left: 4vw;
        .title {
          padding-top: 14vh;
          // background-color: #64b4bf;
          border-left: none;
        }
        .content {
          // background-color: #5497a0;
          .pic {
            // transform: rotateZ(-10deg);
            right: 2vw;
          }
          .pic1 {
            transform: rotateZ(-4deg);
          }
          .pic2 {
            transform: rotateZ(-12deg);
            top: 10vh;
          }
        }
      }
    }
  }

  // 关于我
  .aboutme {
    .section-3 {
      background-image: url("../assets/images/bg/3.jpg");
      background-position: center 0;
    }
  }

  // 联系我
  .contact {
    .section-4 {
      background-image: url("../assets/images/bg/4.jpg");
    }
  }
}
</style>
<style>
@keyframes ripple {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
.effect {
  position: absolute;
  background: #fff;
  transform: translate(-50%, -50%);
  /* 让其穿透至span */
  pointer-events: none;
  border-radius: 50%;
  animation: ripple 1s linear infinite;
  width: 0px;
  height: 0px;
}
</style>