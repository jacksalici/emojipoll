<script>
export default {
  name: "SettingComponent",
  props: {
    modelValue: { default: "" },
    settingHidedList: { default: [] },
    np: { default: 10, type: Number },
  },
  emits: ["update:modelValue"],
  mounted() {
    this.emoji = require("emoji-random-list");
    this.s["n"] = this.np;
    

    if (window.localStorage.getItem("saved-settings"))
      this.recoverDisabled = false;
  },
  data() {
    return {
      emoji: "",
      list: "👉🕹",
      recoverDisabled: true,
      s: {
        n: 5,
        skintones: false,
        v: false,
        noduplicates: true,
        allstatus: false,
        random: false,
        genders: false,
        maxversion: 14,
        nerdness: 1,
        search: "",
        offset: 0,
        groups: [true, true, true, true, true, true, true, false, false],
      },
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
    groups2String(){
      var gs = ""
      this.groupsOptions.forEach((element, index) => {
        if (this.s["groups"].at(index))
          gs +=
            String(element.toLowerCase())
              .replace(/-/gm, " ")
              .replace(/and/gm, "&") + ",";
      });
      return gs
    },
    getEmojiLen(){
      

      return this.emoji.calc({
        skintones: this.s['skintones'],
        noduplicates: this.s['noduplicates'],
        allstatus: this.s['allstatus'],
        genders: this.s['genders'],
        group: this.groups2String(),
        maxversion: this.s['maxversion'],
        search: this.s['search']
      })
    },
    recoverSettings() {
      let t = window.localStorage.getItem("saved-settings");
      console.log(t);
      if (t) this.s = JSON.parse(t);
    },
    saveSettings() {
      window.localStorage.setItem("saved-settings", JSON.stringify(this.s));
      this.recoverDisabled = false;
    },
    resetSettings() {
      
        (this.s["skintones"] = false),
        (this.s["v"] = false),
        (this.s["noduplicates"] = true),
        (this.s["allstatus"] = false),
        (this.s["random"] = false),
        (this.s["genders"] = false),
        (this.s["maxversion"] = 14),
        (this.s["nerdness"] = 1),
        (this.s["search"] = ""),
        (this.s["offset"] = 0),
        (this.s["groups"] = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
        ]),
        this.setEmoji();
    },
    setEmoji(off = this.s['offset']) {
      this.list = this.getEmoji(0, off);
      this.$emit("update:modelValue", this.list);
    },
    getEmoji(myN = 0, myOffset = 0) {
      this.s["n"] = this.np
      if (this.s["n"] > 3000) {
        this.s["n"] = 3000;
      }

      console.log(this.s);
      if (this.s["nerdness"] == 2) {
        this.s["v"] = true;
      } else {
        this.s["v"] = false;
      }

     
      let l;

      if (!myN)
        myN = this.s["n"]
      
      if (!myOffset)
        myOffset = this.s['myOffset']

      if (this.s["random"]) {
        l = this.emoji.random({
          n: myN,
          skintones: this.s["skintones"],
          genders: this.s["genders"],
          group: this.groups2String(),
          v: this.s["v"],
          allstatus: this.s["allstatus"],
          noduplicates: this.s["noduplicates"],
          maxversion: this.s["maxversion"],
          search: this.s["search"],
        });
      } else {
        l = this.emoji.list({
          n: myN,
          skintones: this.s["skintones"],
          genders: this.s["genders"],
          group: this.groups2String(),
          v: this.s["v"],
          allstatus: this.s["allstatus"],
          noduplicates: this.s["noduplicates"],
          maxversion: this.s["maxversion"],
          offset: myOffset,
          search: this.s["search"],
        });
      }

      console.log(l);

      if (this.s["nerdness"] == 0) {
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
  

      <!--REGENERATE-->
      <button class="btn btn-primary mt-5" v-if="!settingHidedList.includes('regenerate')" v-on:click="setEmoji()">
        Regenerate
      </button>

      <!--RADOMNESS-->
      <div v-if="!settingHidedList.includes('random')" class="form-control">
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

      <!--EMOJI NUMBER-->

      <p class="text-lg" v-if="!settingHidedList.includes('n')">
        Number of emoji
      </p>
      <div v-if="!settingHidedList.includes('n')">
        <div
          class="tooltip tooltip-open tooltip-left tooltip-primary"
          :data-tip="s['n']"
        >
          
          <button
            @click="
              s['n']--;
              setEmoji();
            "
            class="btn btn-sm ml-1 btn-ghost"
          >
            -
          </button>

          <button
            @click="
              s['n']++;
              setEmoji();
            "
            class="btn btn-sm btn-ghost"
          >
            +
          </button>
        </div>
      </div>

      <!--OFFSET-->
      <p
        v-if="s['random'] == false && !settingHidedList.includes('offset')"
        class="text-lg"
      >
        Offset
      </p>
      <div v-if="s['random'] == false && !settingHidedList.includes('offset')">
        <div
          class="tooltip tooltip-open tooltip-left tooltip-primary"
          :data-tip="s['offset']"
        >
           <button
            @click="
              s['offset']--;
              setEmoji();
            "
            class="btn btn-sm ml-1 btn-ghost"
          >
            -
          </button>
          
          <button
            @click="
              s['offset']++;
              setEmoji();
            "
            class="btn btn-sm btn-ghost"
          >
            +
          </button>
         
        </div>
      </div>

      <p class="text-lg">Other settings</p>

      <!--SKINTONES-->

      <div class="form-control" v-if="!settingHidedList.includes('skintones')">
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

      <!--NO DUPLICATES-->

      <div
        class="form-control"
        v-if="!settingHidedList.includes('noduplicates')"
      >
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

      <!--GENDERS-->

      <div class="form-control" v-if="!settingHidedList.includes('genders')">
        <label class="label cursor-pointer">
          <span class="label-text">Genders </span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="s['genders']"
            v-on:change="setEmoji()"
          />
        </label>
      </div>

      <!--ALLSTATUS-->

      <div class="form-control" v-if="!settingHidedList.includes('allstatus')">
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

      <!--MAX VERSION-->

      <div class="form-control" v-if="!settingHidedList.includes('maxversion')">
        <label class="label cursor-pointer">
          <span class="label-text">Max Emoji Version </span>
          <input
            type="range"
            min="0"
            max="15"
            class="range range-primary range-xs my-auto mr-2 w-1/2 max-w-xs"
            v-model="s['maxversion']"
            @input="setEmoji()"
          />
        </label>
      </div>

      <!--SEARCH-->

      <!--<div class="form-control" v-if="!settingHidedList.includes('search')">
        <label class="label cursor-pointer">
          <span class="label-text">Search filter </span>
          <input
            type="text"
            class="input input-bordered input-sm w-1/3 max-w-xs"
            v-model="s['search']"
            @input="setEmoji()"
          />
        </label>
      </div>-->

      <!--GROUPS-->
      <div v-if="!settingHidedList.includes('groups')">
        <p class="text-lg mb-4">Allowed groups of emoji</p>

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
      </div>

      <p v-if="!settingHidedList.includes('groups')" class="text-sm">
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

      <!--NERDNESS-->

      <p class="text-lg" v-if="!settingHidedList.includes('nerdness')">
        Nerdness
      </p>

      <input
        type="range"
        min="0"
        max="2"
        v-if="!settingHidedList.includes('nerdness')"
        v-model="s['nerdness']"
        class="range range-primary"
        step="1"
        v-on:change="setEmoji()"
      />
      <div
        v-if="!settingHidedList.includes('nerdness')"
        class="w-full flex justify-between text-xs px-2 mt-0"
      >
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>

      <!--BUTTONS-->
      <div class="flex mt-2 m-auto">
      <button
        v-if="!settingHidedList.includes('buttons')"
        class="btn btn-primary m-1 ml-auto btn-xs"
        v-on:click="resetSettings()"
      >
        Reset
      </button>

      <button
        v-if="!settingHidedList.includes('buttons')"
        class="btn btn-primary btn-xs m-1"
        v-on:click="saveSettings()"
      >
        Backup
      </button>
      <button
        v-if="!settingHidedList.includes('buttons')"
        class="btn btn-primary btn-xs m-1 mr-auto"
        :class="{ disabled: !recoverDisabled }"
        v-on:click="recoverSettings()"
      >
        Load
      </button>
      </div>
    
    
</template>
