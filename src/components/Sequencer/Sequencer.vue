<template lang="html">
  <div class="component pattern" v-draggable.window>
    <div class="component-header-controll-area">
      <div class="component-header-controll circle"></div>
    </div>
    <h2 class="drag-anchor">Sequencer</h2>
    <div class="section">
      <div class="component-block">
        <h3>Loop start/end</h3>
        <div class="component-block-content">
          <input type="text" v-model="loopStart">
          <input type="text" v-model="loopEnd">
        </div>
      </div>
    </div>
    <div class="section">
      <div class="component-block">
        <h3>Loop</h3>
        <div class="component-block-content">
          {{ customLoop }}
          <div class="loopGrid">
            <div class="timeStart"></div>

            <div class="notes">
              <div class="note" v-for="note in customLoop" :key="note.note" :style="noteStyle(note)">
                {{note.note}}
              </div>
            </div>
          </div>
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
      loopEnd: '2m',
      customLoop: [
        {
          note: 'C4',
          duration: '1n',
          release: '+1n'
        },
        {
          note: 'D4',
          duration: '1n',
          release: '+2n'
        },
        {
          note: 'E4',
          duration: '1n',
          release: '+3n'
        },
        {
          note: 'C5',
          duration: '1n',
          release: '+4n'
        },
      ]
    }
  },
  computed: {
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
    noteStyle: function (note) {
      return {
        width: this.timeToWidth(note.duration),
        marginLeft: this.timeToWidth(note.release),
        marginTop: this.noteToOffsetTop(note.note)
      }
    },
    timeToWidth (time) {
      return new Tone.Time(time).toSeconds() * 100 + 'px'
    },
    noteToOffsetTop(note) {
      const regex = /(\w#?)([0-9])/
      const notes = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
      ]
      let found = note.match(regex)

      console.log(found)

      // return ''
      return notes.indexOf(found[1]) + (12 * found[2]) + 'px'
    },
    triggerAttackRelease: function (note, timeStart, timeEnd) {
      // this.synth.triggerAttack(note, timeStart)
      // this.synth.triggerRelease(timeEnd)
      this.synth.triggerAttackRelease(note, timeStart, timeEnd)
      // Tone.Time.
    },
    createLoop: function () {
      let self = this
      var loop = new Tone.Loop(function (time) {
        for (const note of self.customLoop) {
          console.log('triggering sequence', note.note, self.synth)
          self.triggerAttackRelease(note.note, note.duration, note.release)
        }
        // self.triggerAttackRelease('G5', '4n', '+20n')
        // self.triggerAttackRelease('F5', '1m', '+3m')
        // self.triggerAttackRelease('E5', '1m', '+2m')
        // self.triggerAttackRelease('D5', '1m', '+1m')
        // self.triggerAttackRelease('C5', '1m', '+0m')
      }, this.loopEnd)

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
  .note {
    border: 1px solid black;
    box-sizing: border-box;
    height: 8px;
    min-width: 8px;
    background-color: #444;
    font-size: 0.5em;
    /* position: relative; */
  }
</style>
