<script>

export default {
  name: "SettingComponent",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  mounted() {
    this.emoji = require("emoji-random-list");
    this.setEmoji();
  },
  data() {
    return {
      emoji: "",
      n: 5,
      list: "👉🕹",
      skintones: false,
      v: false,
      noduplicates: true,
      allstatus: false,
      random: true,
      genders: false,
      maxversion: 14,
      nerdness: 0,
      search: "",
      offset: "",
      groups: [true, true, true, true, true, true, true, true, false, false],
      groupsOptions: [
        "Smileys & Emotion",
        "People & Body",
        "Component",
        "Animals & Nature",
        "Food & Drink",
        "Travel & Places",
        "Activities",
        "Objects",
        "Symbols",
        "Flags",
      ],
    };
  },
  methods: {
    setEmoji() {
      this.list = this.getEmoji();
      this.$emit("update:modelValue", this.list);
    },
    getEmoji() {
      let gs = "";
      if(this.nerdness==2){
        this.v=true
      } else {
        this.v=false
      }


      this.groupsOptions.forEach((element, index) => {
        if (this.groups.at(index))
          gs +=
            String(element.toLowerCase())
              .replace("-", " ")
              .replace("and", "&") + ",";
      });
      let l = this.emoji.random({
        n: this.n,
        skintones: this.skintones,
        genders: this.genders,
        group: gs,
        v: this.v,
        allstatus: this.allstatus,
        noduplicates: this.noduplicates,
        maxversion: this.maxversion,
      });
      
      console.log(l);

      if (this.nerdness == 0){
        let s = ""
        l.forEach(element => {
            s+=element
        })
        return s;
      }
      return l;
    },
  },
};
</script>

<template>
<div class="card bg-base-200">
    <div class="card-body text-center">

  <p class="card-title font-bold m-auto">Settings</p>
  <button class="btn btn-primary my-5" v-on:click="setEmoji()">Regenerate</button>

  <p class="text-lg">Number of emoji</p>
  <div class="flex">
    <input
      type="range"
      min="1"
      max="20"
      class="range range-primary my-auto mr-5"
      v-model="n"
      v-on:change="setEmoji()"
    />
    <input
      type="text"
      class="input input-bordered w-1/5 max-w-xs"
      v-model="n"
      v-on:change="setEmoji()"
    />
  </div>

  <p class="text-lg">Other settings</p>

  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Skintones </span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        v-model="skintones"
        v-on:change="setEmoji()"
      />
    </label>
  </div>

  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">No Duplicates </span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        v-model="noduplicates"
        v-on:change="setEmoji()"
      />
    </label>
  </div>

  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Randomness </span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        v-model="random"
        v-on:change="setEmoji()"
      />
    </label>
  </div>

  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">All Status </span>
      <input
        type="checkbox"
        class="toggle toggle-primary"
        v-model="allstatus"
        v-on:change="setEmoji()"
      />
    </label>
  </div>



  <p class="text-lg">Allowed groups of emoji</p>

  <div
    v-for="(opt, ind) in groupsOptions"
    v-bind:key="ind"
    class="mx-0 space-y-0"
  >
    <label class="label cursor-pointer my-0 py-1">
      <span class="label-text">{{ opt }}</span>
      <input
        type="checkbox"
        v-model="groups[ind]"
        v-on:change="setEmoji()"
        class="checkbox my-0"
      />
    </label>
  </div>


      <p class="text-lg">Nerdness</p>

  <input type="range" min="0" max="2" v-model="nerdness" class="range range-primary" step="1"  v-on:change="setEmoji()"/>
<div class="w-full flex justify-between text-xs px-2 mt-0">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  
</div>
</div>
</div>
</template>

