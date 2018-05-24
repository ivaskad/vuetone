<template lang="html">
  <div class="component welcome" v-draggable.window>
    <div class="component-header-controll-area">
      <div class="component-header-controll circle"></div>
    </div>
    <h2 class="drag-anchor">Welcome</h2>
    <div class="section">
      <div class="component-block">
        <h3>Go to Vuetone</h3>
        <div class="component-block-content">
          <a href="/vuetone" @click.prevent="startAudioContext">Start audio context and continue to Vuetone</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'

export default {
  methods: {
    startAudioContext: function () {
      if (Tone.context.state !== 'running') {
        console.log('resuming startAudioContext...')
        Tone.context.resume()
      }
      this.$router.push({path: 'vuetone'})
    }
  },
  beforeRouteUpdate: function (to, from, next) {
    next()
  }
}
</script>

<style lang="css">
.component.welcome {
  left: calc(50% - 340px / 2);
  top: calc(50% - 104px / 2);
}
</style>
