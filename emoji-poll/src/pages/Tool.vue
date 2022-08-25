<script>
import SettingsComponent from './../components/Settings.vue'

export default {
  name: 'ToolBox',
    components: { SettingsComponent },
  
  data() {
    return {
      list: ""
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

  
  <div class="mockup-code bg-base-200 text-primary-content text-left">
  <pre class="select-all"><code>{{list}}</code></pre>
</div>
<div class="card bg-base-200">
    <div class="card-body text-center">
      <p class="card-title font-bold m-auto">Settings</p>
      <SettingsComponent v-model="list"/>
    </div>
  </div>
   
</template>


