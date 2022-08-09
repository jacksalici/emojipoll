<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'ToolBox',
    components: { VueMultiselect },

  data() {
    return {
      
      emoji: '🤠',
      groups: [],
      groupsOptions: ["ciao", "mamma"]
    }
  },
  methods: {
    
  }
}

</script>

<template>


  <div class="container mx-auto px-4 py-14 sm:px-6 xl:px-12">
    <div
      class="flex flex-col items-center justify-center space-y-6 text-center"
    >
      <h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">
        Emoji ToolBox📮🧸
      </h1>
      <p class="max-w-screen-sm text-lg text-gray-600 sm:text-2xl">
        Have fun playing with the
        <a
          href="https://github.com/jacksalici/emoji-list-api"
          class="link link-primary"
          >emoji-list-api</a
        >
        toolbox!
      </p>

      <div class="mockup-code">
        <pre><code>{{emoji}}</code></pre>
      </div>


      <VueMultiselect v-model="groups" :options="groupsOptions"></VueMultiselect>

    
 
  <p>Checked names: <pre>{{ groups }}</pre></p>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

