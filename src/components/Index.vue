<template>
  <div class="">
    <transport></transport>
    <div class="surface">
      <div class="surface-dragable">
        <synth @update="updateSynth($event)" @mounted="updateSynth($event)"></synth>
        <qwerty :synth="synth"></qwerty>
        <sequencer :synth="synth"></sequencer>
      </div>
    </div>
  </div>
</template>

<script>
// import Keyboard from './Keyboard/Keyboard'
import Synth from './Synth'
import Qwerty from './Qwerty'
import Transport from './Transport'
import Sequencer from './Sequencer/Sequencer'

export default {
  data: function () {
    return {
      synth: {
        type: Object
      }
    }
  },
  components: {
    // 'keyboard': Keyboard,
    'synth': Synth,
    'qwerty': Qwerty,
    'transport': Transport,
    'sequencer': Sequencer
  },
  methods: {
    updateSynth: function (payload) {
      this.synth = payload
    }
  }
}
</script>

<style>
  .surface {
    top: 146px;
    height: calc(100vh - 146px);
    position: relative;
    overflow: auto;
    cursor: move;
  }
  .surface-dragable {
    width: 100%;
      height: 100%;
  }
</style>
