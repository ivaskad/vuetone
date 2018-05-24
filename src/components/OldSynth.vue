<template>
  <div class="component">
    <h2>Synth 1.0 - {{note}}</h2>
    <a href="#" @click="play">play</a>
  </div>
</template>

<script>
import Tone from 'tone'
// import Keyboard from './Keyboard/Keyboard'

export default {
  components: {
    // 'keyboard': Keyboard
  },
  data () {
    return {
      note: 'C4'
    }
  },
  mounted: function () {
  },
  methods: {
    play: function () {
      // create a synth and connect it to the master output (your speakers)
      var synth = new Tone.Synth().toMaster()
      // play a middle 'C' for the duration of an 8th note

      synth.triggerAttackRelease(this.note, '8n')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
