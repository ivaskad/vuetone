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
      loopEnd: '2m'
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
        self.synth.triggerAttackRelease('C5', '1n', '+0m')
        // not working properly yet
        self.synth.triggerAttackRelease('D5', '1n', '+2n')
        // self.synth.triggerAttackRelease('E5', '1n', '+3n')
        // self.synth.triggerAttackRelease('F5', '1n', '+4n')
        // self.synth.triggerAttackRelease('G5', '1n', '+6n')
        // self.synth.triggerAttackRelease('A5', '1n', '+6n')
        // self.synth.triggerAttackRelease('B5', '1n', '+7n')
        // self.synth.triggerAttackRelease('C6', '1n', '+8n')
        console.log('triggering sequence', self.synth)
      }, '2m')
      loop.start(this.loopStart)
      loop.stop(this.loopEnd)

      this.loop = Object.assign({}, this.loop, loop)
      // console.log(this.loop)
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
