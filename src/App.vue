<template>
  <div id="app" class="noselect" :class="{'cursor-hide': !cursorShow }">
    <div class="wrapper" :class="{'cursor-hide': !cursorShow }">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { EventBus } from './EventBus.js'

export default {
  name: 'App',
  data: function () {
    return {
      mousedown: false,
      mousemove: false,
      cursorShow: true,
      keyCode: undefined
    }
  },
  mounted: function () {
    let self = this

    // Mouse listeners
    window.addEventListener('mousedown', function (event) { self.MOUSE_DOWN_EVENT(event) })
    window.addEventListener('mouseup', function (event) { self.MOUSE_UP_EVENT(event) })
    window.addEventListener('mousemove', function (event) { self.MOUSE_MOVE_EVENT(event) })

    // Keyboard listeners
    window.addEventListener('keydown', function (event) { self.KEYDOWN_EVENT(event) })
    window.addEventListener('keyup', function (event) { self.KEYUP_EVENT(event) })

    EventBus.$on('cursor-hide', function () {
      self.cursorShow = false
    })

    EventBus.$on('cursor-show', function () {
      self.cursorShow = true
    })
  },
  methods: {
    MOUSE_DOWN_EVENT: function (event) {
      this.mousedown = true
      EventBus.$emit('mousedown', event)
    },
    MOUSE_UP_EVENT: function (event) {
      this.mousedown = true
      EventBus.$emit('mouseup', event)
    },
    MOUSE_MOVE_EVENT: function (event) {
      if (this.mousedown === true) {
        EventBus.$emit('mousemove', event)
      }
    },
    KEYDOWN_EVENT: function (eveent) {
      if (this.keyCode === undefined) {
        this.keyCode = event.keyCode
        EventBus.$emit('keydown', event)
      }
    },
    KEYUP_EVENT: function (eveent) {
      EventBus.$emit('keyup', event)
      this.keyCode = undefined
    }
  }
}
</script>

<style>
#app, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;

  /* width: 100%;
  height: 100%; */
  position: absolute;
  top: 0;
  left: 0;

  /* padding: 15px; */
  width: calc(100% - 2 * 0px);
  height: calc(100% - 2 * 0px);
}

#app.cursor-hide {
  cursor: none !important;
  background-color: #eee;
}

#app .wrapper.cursor-hide {
  pointer-events: none;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 48px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.component {
  color: #fff;
  background-color: #888;
  text-align: left;
  padding: 15px;

  position: absolute;
  min-width: 200px;

  border-radius: 10px;
  box-shadow: 10px 10px 21px #aaaaaaaa;

  -webkit-user-drag: none;
}

.component .section {
  padding-bottom: 5px;
}

.component-block {
  display: inline-block;
  overflow: hidden;

  margin-left: 5px;
  padding-left: 5px;
  border-left: 1px solid #9d9d9d;
  vertical-align: top
}
.component-block:first-child {
  margin-left: 0px;
  padding-left: 0px;
  border-left: none;
}

.component-block-content {
  min-height: 22px;
}
/* compoent header */

.component h2 {
  color: #ddf;
  background-color: #3a446b;

  font-size: 0.8em;
  font-weight: 800;

  padding: 5px 15px;
  margin: -15px -15px 10px -15px;

  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  cursor: move;
}

.component h2:hover {
  background-color: #515a7c;
}

.component h3 {
  margin: 0px 0px 5px;
  font-size: 0.7em;
  background-color: #555;
  padding: 1px 3px;
  border-top-right-radius: 3px;
}

.component-header-controll-area {
  position: absolute;
  right: 0px;
  top: 8px;
}
.component-header-controll {
  float: right;
  display: block;
  margin: 0 10px 0 0;
  font-size: 0.8em;
}
.component-header-controll.circle {
  width: 10px;
  height: 10px;
  border: 1px solid #ffffff55;
  border-radius: 50%;
}

input:not([type]),
input[type="email" i],
input[type="number" i],
input[type="password" i],
input[type="tel" i],
input[type="url" i],
input[type="text" i] {
    background-color: #aaaaaaaa;
    border: 1px solid #666;
    color: #3a446b;
    padding: 0px 0px 0px 3px;
    width: 4em;
}

input:not([type]):hover,
input[type="email" i]:hover,
input[type="number" i]:hover,
input[type="password" i]:hover,
input[type="tel" i]:hover,
input[type="url" i]:hover,
input[type="text" i] :hover{
    background-color: #aaaaaa;
    border: 1px solid #3a446baa;
}

.controls .control {
    display: inline-block;
    padding:  2px;
    border: 1px solid #555555;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: #eeeeee33;
}

.control label {
    display:  block;
    text-align: center;
    font-size: 0.7em;
    text-transform: uppercase;
    margin: 3px 0;
}

.control-wheel-wrapper {
    background-color: transparent !important;
    background-image: url('./assets/knob_bg.png');
    background-size: contain;
}

.control-wheel {
    background-color: transparent !important;
    background-image: url('./assets/knob.png');
    background-size: contain;
}

</style>
