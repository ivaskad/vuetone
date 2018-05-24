<template lang="html">
  <div class="component pattern" v-draggable.window>
    <div class="component-header-controll-area">
      <div class="component-header-controll circle"></div>
    </div>
    <h2 class="drag-anchor">Sequencer</h2>
    <div class="section">
      <div class="component-block">
        <h3>Loop</h3>
        <div class="component-block-content">
          <input type="text" v-model="loopStart">
          <input type="text" v-model="loopEnd">
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
      loop: {},
      loopStart: 0,
      loopEnd: '8n'
    }
  },
  props: {
    synth: {
      type: Object
    }
  },
  mounted: function () {
    if (this.synth !== undefined) {
      this.createLoop()
    }
  },
  watch: {
    synth: function () {}
    // loopStart: function (val) {
    //   this.loop.start(val)
    //   // this.setLoopEnd(this.loopStart)
    // },
    // loopEnd: function (val) {
    //   this.loop.stop(val)
    //   // this.setLoopStart(this.loopEnd)
    // }
  },
  methods: {
    createLoop: function () {
      let self = this
      var loop = new Tone.Loop(function (time) {
        self.synth.triggerAttackRelease('C5', '1m', '+0m')
        self.synth.triggerAttackRelease('D5', '1m', '+1m')
        self.synth.triggerAttackRelease('E5', '1m', '+2m')
        self.synth.triggerAttackRelease('F5', '1m', '+3m')
        self.synth.triggerAttackRelease('G5', '1m', '+4m')
        self.synth.triggerAttackRelease('A5', '1m', '+5m')
        self.synth.triggerAttackRelease('B5', '1m', '+6m')
        self.synth.triggerAttackRelease('C6', '1m', '+7m')
        console.log('triggering sequence', self.synth)
      }, '1m')
      loop.start(this.loopStart)
      loop.stop(this.loopEnd)

      this.loop = Object.assign({}, this.loop, loop)
      console.log(this.loop)
    }
    // setLoopStart: function (loopStart) {
    // },
    // setLoopEnd: function (loopEnd) {
    // }
  }
}
</script>

<style lang="css">
</style>
