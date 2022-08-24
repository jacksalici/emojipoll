<script>
import SettingsComponent from './../components/Settings.vue'

export default {
  name: 'ToolBox',
    components: { SettingsComponent },

  data() {
    return {
      
    }
  },
  methods: {
    
  }
}

</script>

<template>
  <h1 class="text-2xl font-bold">Emoji ToolBox📮🧸</h1>
  <p class="max-w-screen-sm">
   Have fun playing with the
        <a
          href="https://github.com/jacksalici/emoji-helper"
          class="link link-primary"
          >emoji-list-api</a
        >
  </p>

  <SettingsComponent/>

  
</template>


