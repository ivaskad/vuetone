<template lang="html">
  <div class="component panel transport" >
    <div class="component-header-controll-area">
      <div class="component-header-controll circle" :class="{filled: playing}"></div>
    </div>
    <h2 class="drag-anchor">Transport</h2>
    <div class="section">
      <div class="component-block">
        <h3>Playback Controll</h3>
        <div class="component-block-content">
          <button type="button" name="button" @click="togglePlay">
            <span v-if="!playing">Play</span>
            <span v-else>Stop</span>
          </button>
        </div>
      </div>
      <div class="component-block">
        <div class="component-block-content">
          <h3>Time</h3>
          <div class="component-block-content">
            {{transportTime}}
          </div>
          <h3>Loop</h3>
          <div class="component-block-content">
            <input type="text" v-model="loopEnd">
            <button type="button" @click="loop = !loop">
              <span v-if="!loop">Zapnout loop</span>
              <span v-else>Vypnout loop</span>
            </button>
          </div>
        </div>
      </div>
      <div class="component-block">
        <h3>BPM</h3>
        <div class="component-block-content">
          <input type="number" v-model="bpm">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'

export default {
  data: function () {
    return {
      time: 0.0,
      bpm: {
        type: Number,
        default: 120
      },
      transport: {},
      playing: false,
      loop: false,
      loopEnd: '2m'
      // bpm: 120 ,
      // swing: 0 ,
      // swingSubdivision: 8n ,
      // timeSignature: 4 ,
      // loopStart: 0 ,
      // loopEnd: 4m ,
      // PPQ: 192
    }
  },
  methods: {
    play: function () {
      this.transport.start('+0.1')
      this.playing = true
    },
    stop: function () {
      this.transport.stop()
      this.playing = false
    },
    togglePlay: function () {
      if (this.playing === false) {
        this.play()
      } else {
        this.stop()
      }
    }
  },
  mounted: function () {
    // function updateTime(){
    // requestAnimationFrame(updateTime)
    // the time elapsed in seconds
    this.transport = Tone.Transport
    this.bpm = Number.parseInt(this.bpmValue)
    this.transport.loopEnd = this.loopEnd
    this.transport.loop = this.loop
    // the AudioContext time
    // document.querySelector('#time').textContent = Tone.now().toFixed(2)
    // }
    // updateTime()
  },
  computed: {
    transportTime: function () {
      // console.log(this.transport)
      if (this.transport !== undefined && this.transport.seconds !== undefined) {
        return this.transport.seconds.toFixed(2)
      }
    },
    bpmValue: function () {
      if (this.transport !== undefined && this.transport.bpm !== undefined) {
        return Number.parseInt(this.transport.bpm.value.toFixed(0))
      }
    }
  },
  watch: {
    bpm: function (val) {
    // if (this.bpm !== undefined) {
      this.transport.bpm.value = Number.parseInt(this.bpm).toFixed(0)
    // }
    },
    loop: function (val) {
      this.transport.loop = Number.parseInt(this.loop).toFixed(0)
    },
    loopEnd: function (val) {
      this.transport.loopEnd = Number.parseInt(this.loopEnd).toFixed(0)
    }
  }
}
</script>

<style lang="css">
  .component.panel {
    border-bottom: 1px solid red;
    width: calc(100% - 2 * 15px);
    padding: 15px 15px;
    background-color: #333;
    color: #eee;
    border-radius: 0px;
  }
  .filled {
    background-color: lime;
  }
</style>
