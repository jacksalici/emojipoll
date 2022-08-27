<script>
/*
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(255, 255, 255, 0); display: block;" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" fill="none" stroke="#1d0e0b" stroke-width="9" r="40" stroke-dasharray="188.49555921538757 64.83185307179586">
  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
</circle>
</svg>
*/
import draggable from "vuedraggable";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import SettingsComponent from "./../components/Settings.vue";

export default {
  name: "PollCore",
  components: {
    draggable,
    Datepicker,
    SettingsComponent,
  },
  mounted() {
    this.off = Math.floor(Math.random() * this.$refs.settings.getEmojiLen());
    this.$refs.settings.s["offset"]=this.off
  },
  data() {
    return {
      emojilist: [],
      list: [],
      title: "",
      task: "",
      count: 0,
      prettyString: "",
      tipIsOpen: false,
      disabled: false,
      mode: 0,
      datelist: [],
      datelistLocale: [],
      emoji: "",
      off: "",
      timelist: ""
    };
  },

  methods: {
    handleDates() {
      if (!this.datelist) {
        this.list = [];
        return;
      }
      console.log(this.datelist);
      const names = [];
      const options = { weekday: "short", day: "numeric" };
      const dateTimeFormat = new Intl.DateTimeFormat(
        this.$i18n.locale,
        options
      );

      this.datelistLocale = this.datelist.map((x) => {
        return dateTimeFormat.format(x);
      });
      this.list.forEach((le) => {
        const name = le["name"];
        if (!this.datelistLocale.includes(name)) {
          this.delEntry(le);
        } else {
          names.push(name);
        }
      });

      this.datelistLocale.forEach((d) => {
        if (!names.includes(d)) {
          this.addEntry(d);
        }
      });

      if(this.timelist != "")
        this.changeTime()
    },
    togglePollType(str) {
      if (str == "date") {
        this.mode = 1;
      } else if (str == "text") {
        this.mode = 2;
      }
    },
    changeTime() {
     var times = this.timelist.split(',')
     this.list = []

     this.datelistLocale.forEach((date)=>{
      times.forEach((time) => {
        this.addEntry(date + "&emsp;" + time.trim())
      })
     })

      this.pPrint()
     
    },
    pPrint() {
      this.prettyString = "";
      if (this.title != "") {
        this.prettyString += "*" + this.title.trim().toUpperCase() + "*\n\n";
      }
      this.prettyString += this.$t("core.text.content");
      this.list.forEach((element) => {
        this.prettyString += element.emoji + "    *" + element.name.trim().replace("&emsp;", "\t") + "*\n";
      });
      this.prettyString += `\n_${this.$t("core.text.footer")}_`;
      this.tipIsOpen = false;
      console.log(this.prettyString)
    },
    copy() {
      navigator.clipboard.writeText(this.prettyString);
      this.tipIsOpen = true;
    },
    addEntry(e) {
      const dict = {
        name: e,
        emoji: this.getEmoji(this.list.length + 1 ),
      };

      this.list.push(dict);

      this.count++;

      this.task = "";
      this.pPrint();
    },
    delEntry(i) {
      while (this.datelistLocale.includes(this.list.at(i)["name"])) {
        this.datelistLocale.splice(
          this.datelistLocale.indexOf(this.list.at(i)["name"]),
          1
        );
        this.datelist.splice(
          this.datelistLocale.indexOf(this.list.at(i)["name"]),
          1
        );
      }

      this.list.splice(i, 1);
      this.count--;
      this.pPrint();
    },
    setEmoji({ i, e }= {}) {
      console.log(this.list.at(i));
      if (e == undefined) this.list.at(i)["emoji"] = this.getEmoji(i);
      else {
        this.list.at(i)["emoji"] = e;
      }
      this.pPrint();
    },
    getEmoji(i = 0) {
      return this.$refs.settings.getEmoji(1, (this.off+i));
    },

    
    applyEmoji(){
      // eslint-disable-next-line
      this.emojilist.forEach((element, index) => {
        console.log(element + index);
        this.setEmoji({ i: index, e: element });
      });
      this.pPrint()
    },
    
    
    regenerateAll() {
      this.off = Math.floor(Math.random() * this.$refs.settings.getEmojiLen());
      this.$refs.settings.s["offset"] = this.off
      this.$refs.settings.setEmoji();

      this.applyEmoji()
    },

    format(date) {
      return `${this.$t("core.input.format", { num: date.length })}`;
    },

    setSingleEmoji(index){
      var z = index

      if (!this.$refs.settings.s["random"]){
        z = index + this.list.length + 1 + Math.random()*10
      }
      this.setEmoji({ i: index, e: this.getEmoji(z) })
      this.pPrint()
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "active",
      };
    },
  },
};
</script>

<template>
  <!--SUBHEADER-->
  <div v-if="this.list.length == 0" class="space-y-4">
  <p  class="max-w-screen-sm text-center m-auto">
    <a class="link link-primary" href="/calc">{{ $t("core.calculate") }}</a>
  </p>

  <h1 class="text-2xl font-bold text-center m-auto">{{ $t("title.generator") }}</h1>

  <p class="max-w-screen-sm text-center m-auto">
    {{ $t("content.generator") }}
  </p>
  </div>

  <div class="md-5 overflow-x-auto">
    <!--TABLE - ENTRY LIST -->
          <Transition name="bounce">

    <table v-if="this.list.length > 0" class="table w-full table-fixed">
      <thead>
        <tr>
          <th colspan="4" class="text-center">{{ $t("core.table.header") }}</th>
        </tr>
      </thead>
      <draggable
        class="list-group"
        :list="list"
        tag="tbody"
        :component-data="{ name: 'flip-list', type: 'transition-group' }"
        v-bind="dragOptions"
        item-key="name"
        handle=".handle"
        @change="this.pPrint()"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <template #item="{ element, index }">
          <tr class="list-group-item">
            <td class="handle p-2">
              <button class="btn btn-ghost px-1">🔃</button>
            </td>
            <td class="text-xl p-2" v-html="element.emoji"></td>

            <td class="p-2 w-2/5 truncate" v-html="element.name">
            </td>

            <td class="p-2">
              <button
                class="btn btn-ghost px-1"
                @click="setSingleEmoji(index)"
              >
                ♻️
              </button>
              <!--<button class="btn btn-ghost" @click="getEmoji(index)">✏️</button>-->
              <button class="btn btn-ghost px-1" @click="delEntry(index)">
                ❌
              </button>
            </td>
          </tr>
        </template>
      </draggable>
    </table>
          </Transition>

    <!--INPUT TAB-->
    <div v-if="mode == 0">
      <button @click="togglePollType('date')" class="btn btn-primary m-2">
        {{ $t("core.mode.date") }}
      </button>
      <button @click="togglePollType('text')" class="btn btn-primary m-2">
        {{ $t("core.mode.option") }}
      </button>
    </div>

    <div v-if="this.list.length == 0 && mode != 0" class="tabs tabs-boxed">
      <a
        class="tab ml-auto"
        :class="{ 'tab-active': mode == 1 }"
        @click="togglePollType('date')"
        >{{ $t("core.mode.date") }}</a
      >
      <a
        class="tab mr-auto"
        :class="{ 'tab-active': mode == 2 }"
        @click="togglePollType('text')"
        >{{ $t("core.mode.option") }}</a
      >
    </div>

    <!--INPUT CARDS -->

    <Datepicker
      v-model="datelist"
      :format="format"
      multiDates
      :modelValue="date"
      :locale="$i18n.locale"
      autoApply
      :closeOnAutoApply="false"
      :enableTimePicker="false"
      :clearable="false"
      hideInputIcon
      v-if="mode == 1"
      menuClassName="bg-base-100 rounded-2xl shadow-2xl"
      :monthChangeOnScroll="false"
    >
      <template #dp-input="{ value }">
        <div class="form-control my-3">
          <div class="input-group">
            <input
              type="text"
              :value="value"
              :placeholder="$t('core.input.date')"
              class="input input-bordered input-primary focus:border-primary focus:ring-0 w-full"
            />
            <button class="btn btn-primary" v-on:click="handleDates">
              {{ $t("core.input.add") }}
            </button>
          </div>
        </div>
      </template>
    </Datepicker>

    <form @submit.prevent="addEntry(task)" v-if="mode == 2">
      <div class="form-control my-3">
        <div class="input-group">
          <input
            type="text"
            class="input input-bordered input-primary focus:border-primary focus:ring-0 w-full"
            :placeholder="$t('core.input.option')"
            v-model="task"
          />
          <button class="btn btn-primary">{{ $t("core.input.add") }}</button>
        </div>
      </div>
    </form>
    <!--RESULT CARD -->

    <div v-if="this.list.length > 0" class="form-control w-full">
      <label class="label">
        <span class="label-text w-full">{{ $t("core.input.title") }}</span>
      </label>
      <input
        type="text"
        v-model="title"
        class="input input-bordered input-ghost w-full"
        v-on:change="pPrint()"
      />
    </div>

    <div v-if="this.list.length > 0 && this.mode == 1" class="form-control w-full">
      <label class="label">
        <span class="label-text w-full">{{ $t("core.input.time") }}</span>
      </label>
      <input
        type="text"
        v-model="timelist"
        class="input input-bordered input-ghost w-full"
        v-on:change="changeTime()"
      />
    </div>

    
        <Transition name="bounce">

    <div class="my-5"  v-if="this.list.length > 0">
      <button
        class="btn btn-primary btn-outline m-1"
        @click="regenerateAll()"
      >
        {{ $t("settings.regenerate") }}
      </button>

      <label
       
        for="my-modal-6"
        class="btn modal-button btn-primary btn-outline m-1"
        >{{ $t("settings.settings") }}</label
      >
    </div>
        </Transition>

    <Transition name="bounce">
    <div v-if="this.list.length > 0" class="card bg-base-200 mt-5">
      <div class="card-body">
        <h2 class="card-title">{{ $t("core.card.title") }}</h2>
        <p class="text-left" v-html="$t('core.card.content')"></p>

        <!--<div class="collapse collapse-plus max-w-sm">
          <input type="checkbox" class="peer" />
          <div
            class="mx-0 text-left collapse-title text-primary-content text-neutral peer-checked:bg-accent peer-checked:text-secondary-content"
          >
            Poll Text:
          </div>
          <div
            class="mx-0 text-left font-mono text-xs collapse-content text-neutral text-base text-primary-content peer-checked:bg-accent peer-checked:text-secondary-content"
          >
            <p
              class="text-xs"
              v-for="line in this.prettyString.split('\n')"
              :key="line"
            >
              {{ line }}<br />
            </p>
          </div>
        </div>-->

        <div class="card-actions justify-end">
          <a
            role="button"
            :href="
              'https://api.whatsapp.com/send/?text=' +
              this.prettyString.replace(/\t/g, '%20%20%20').replace(/\x20/g, '%20').replace(/\n/g, '%0A')
            "
            class="btn btn-primary btn-sm"
            :class="{ 'btn-disabled': disabled }"
          >
            {{ $t("core.card.share-whatsapp") }}
          </a>

          <div
            class="tooltip-primary"
            data-tip="copied"
            :class="{ 'tooltip-open': tipIsOpen, tooltip: tipIsOpen }"
          >
            <button
              @click="copy()"
              class="btn btn-primary btn-sm"
              :class="{ 'btn-disabled': disabled }"
            >
              {{ $t("core.card.copy-text") }}
            </button>
          </div>
        </div>

        <!--<a
          role="button"
          href="
            /ans
            "
          class="btn btn-xs btn-outline btn-primary mx-auto mr-0"
        >
          Parse the answers ⚗️
        </a>-->
      </div>
    </div>
    </Transition>
  </div>

  <!--MODAL SETTING-->
  <input type="checkbox" id="my-modal-6" class="modal-toggle" />
  <label class="modal modal-middle my-modal" for="my-modal-6">
    <label class="modal-box w-4/5" for="">
      <label
        for="my-modal-6"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >

      <SettingsComponent
        ref="settings"
        v-model="emojilist"
        @update:modelValue="applyEmoji()"
        :np="list.length"
        settingHidedList="['n', 'nerdness', 'regenerate', 'allstatus', 'maxversion']"
      />

      <label
        for="my-modal-6"
        class="btn btn-sm"
        >{{$t("close")}}</label
      >
    </label>
  </label>
</template>

<style>
.my-modal {
  background-color: #ffffff00 !important;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
