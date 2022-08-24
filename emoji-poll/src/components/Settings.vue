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
      list: "👉🕹",
      s : {n: 5,
      skintones: false,
      v: false,
      noduplicates: true,
      allstatus: false,
      random: true,
      genders: false,
      maxversion: 14,
      nerdness: 0,
      search: "",
      offset: 0,
      groups: [true, true, true, true, true, true, true, false, false],},
      groupsOptions: [
        "Smileys & Emotion",
        "People & Body",
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
    saveSettings(){

        window.localStorage.setItem()
    },
    resetSettings(){
      this.s['n']= 5,
      this.s['skintones']= false,
      this.s['v']= false,
      this.s['noduplicates']= true,
      this.s['allstatus']= false,
      this.s['random']= true,
      this.s['genders']= false,
      this.s['maxversion']= 14,
      this.s['nerdness']= 0,
      this.s['search']= "",
      this.s['offset']= 0,
      this.s['groups']= [true, true, true, true, true, true, true, false, false],
      this.setEmoji()
    },
    setEmoji() {
      this.list = this.getEmoji();
      this.$emit("update:modelValue", this.list);
    },
    getEmoji() {
      console.log(this.s['groups']);
      let gs = "";
      if (this.s['nerdness'] == 2) {
        this.s['v'] = true;
      } else {
        this.s['v'] = false;
      }

      this.groupsOptions.forEach((element, index) => {
        if (this.s['groups'].at(index))
          gs +=
            String(element.toLowerCase())
              .replace("-", " ")
              .replace("and", "&") + ",";
      });
      let l;

      if (this.s['random']) {
        l = this.emoji.random({
          n: this.s['n'],
          skintones: this.s['skintones'],
          genders: this.s['genders'],
          group: gs,
          v: this.s['v'],
          allstatus: this.s['allstatus'],
          noduplicates: this.s['noduplicates'],
          maxversion: this.s['maxversion'],
          search: this.s['search']
        })
      } else {
        l = this.emoji.list({
          n: this.s['n'],
          skintones: this.s['skintones'],
          genders: this.s['genders'],
          group: gs,
          v: this.s['v'],
          allstatus: this.s['allstatus'],
          noduplicates: this.s['noduplicates'],
          maxversion: this.s['maxversion'],
          offset: this.s['offset'],
          search: this.s['search']

        });
      }

      console.log(l);

      if (this.s['nerdness'] == 0) {
        let sa = "";
        l.forEach((element) => {
          sa += element;
        });
        return sa;
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
      <button class="btn btn-primary my-5" v-on:click="setEmoji()">
        Regenerate
      </button>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Randomness </span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="s['random']"
            v-on:change="setEmoji()"
          />
        </label>
      </div>

      <p class="text-lg">Number of emoji</p>
      <div class="flex">
        <input
          type="range"
          min="1"
          max="20"
          class="range range-primary my-auto mr-2"
          v-model="s['n']"
          v-on:change="setEmoji()"
        />
        <input
          type="text"
          class="input input-bordered w-1/4 p-2 max-w-xs"
          v-model="s['n']"
          @input="setEmoji()"
        />
      </div>

      <p v-if="s['random'] == false" class="text-lg">Offset</p>
      <div class="flex" v-if="s['random'] == false">
        <input
          type="range"
          min="1"
          max="5000"
          class="range range-primary my-auto mr-2"
          v-model="s['offset']"
          v-on:change="setEmoji()"
        />
        <input
          type="text"
          class="input input-ghost p-0 w-1/4 max-w-xs"
          v-model="s['offset']"
          @input="setEmoji()"
        />
      </div>

      <p class="text-lg">Other settings</p>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Skintones </span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="s['skintones']"
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
            v-model="s['noduplicates']"
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
            v-model="s['allstatus']"
            v-on:change="setEmoji()"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Max Emoji Version </span>
          <input
          type="text"
          class="input input-bordered input-xs w-1/5 max-w-xs"
          v-model="s['maxversion']"
          @input="setEmoji()"
        />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Search filter </span>
          <input
          type="text"
          class="input input-bordered input-sm w-1/3 max-w-xs"
          v-model="s['search']"
          @input="setEmoji()"
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
            v-model="s['groups'][ind]"
            v-on:change="setEmoji()"
            class="checkbox my-0"
          />
        </label>
      </div>

      <p class="text-sm">
        <a
          class="link"
          @click="
            s['groups'].fill(false);
            setEmoji();
          "
          >None</a
        >
        |
        <a
          class="link"
          @click="
            s['groups'].fill(true);
            setEmoji();
          "
          >All</a
        >
      </p>

      <p class="text-lg">Nerdness</p>

      <input
        type="range"
        min="0"
        max="2"
        v-model="s['nerdness']"
        class="range range-primary"
        step="1"
        v-on:change="setEmoji()"
      />
      <div class="w-full flex justify-between text-xs px-2 mt-0">
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>

    <button class="btn btn-primary my-5" v-on:click="resetSettings()">Reset Settings</button>

    </div>
  </div>
</template>
