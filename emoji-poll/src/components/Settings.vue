<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'SettingComponent',
    components: { VueMultiselect },

  data() {
    return {
      n:5,
      emoji: "👉🕹",
      skintones: false,
      v: false,
      noduplicates: true,
      allstatus: false,
      random: true,
      groups: ['Smileys & Emotion', 'People & Body', 'Component', 'Animals & Nature', 'Food & Drink', 'Travel & Places', 'Activities', 'Objects'],
      groupsOptions: ['Smileys & Emotion', 'People & Body', 'Component', 'Animals & Nature', 'Food & Drink', 'Travel & Places', 'Activities', 'Objects', 'Symbols', 'Flags']
    }
  },
  methods: {
    getEmoji() {
     let g = ""
     this.groups.forEach(element => {
      g+=element.replace(/\x20+/g, '-').replace(/&/g, 'and')+','
     });
     fetch(

        
        "https://emoji.deta.dev/random?n="+this.n+"&skintones=False&group="+g+"&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          this.emoji=data
        });
    },
  }
}

</script>

<template>


  
    
      <div class="mockup-code">
        <pre>{{emoji}}</pre>
      </div>

      <!--<button class="btn btn-primary" v-on:click="getEmoji()">GENERATE EMOJI</button>-->
      
      <input type="range" min="1" max="100" class="range range-primary" v-model="n" v-on:change="getEmoji()"/>
      {{n}}

      <VueMultiselect v-model="groups" :options="groupsOptions" @select="getEmoji()"
      :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
    :preserve-search="true"
    placeholder="Pick some"
    :preselect-first="true"
      
      ></VueMultiselect>

      <div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Skintones </span>
    <input type="checkbox" class="toggle toggle-primary" v-model="skintones" v-on:change="getEmoji()"/>
  </label>
</div>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">No Duplicates </span>
    <input type="checkbox" class="toggle toggle-primary" v-model="noduplicates" v-on:change="getEmoji()"/>
  </label>
</div>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Randomness </span>
    <input type="checkbox" class="toggle toggle-primary" v-model="random" v-on:change="getEmoji()"/>
  </label>
</div>
    
    <div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">All Status </span>
    <input type="checkbox" class="toggle toggle-primary" v-model="allstatus" v-on:change="getEmoji()"/>
  </label>
</div>

<div class="form-control">
  <label class="label cursor-pointer">
    <span class="label-text">Verbose </span>
    <input type="checkbox" class="toggle toggle-primary" v-model="v" v-on:change="getEmoji()"/>
  </label>
</div>
 
  
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

