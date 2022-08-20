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

export default {
  name: "PollCore",
  components: {
    draggable,
    Datepicker,
    
},
  mounted() {},
  data() {
    return {
      list: [],
      title: "",
      task: "",
      count: 0,
      prettyString: "",
      tipIsOpen: false,
      disabled: true,
      dates: true,
      datelist: "",
    };
  },

  methods: {
    handleDates() {
      const names = [];
      this.list.forEach((le) => {
        const name = le["name"];

        if (!this.datelist.includes(name)) {
          this.delEntry(le);
        } else {
          names.push(name);
        }
      });

      this.datelist.forEach((d) => {
        if (!names.includes(d)) {
          this.addEntry(d);
        }
      });
    },
    togglePollType(str) {
      if (str == "date") {
        this.dates = true;
      } else if (str == "text") {
        this.dates = false;
      }
    },
    pPrint() {
      this.prettyString = "";
      if (this.title != "") {
        this.prettyString += "*" + this.title.toUpperCase() + "*\n";
      }
      this.prettyString +=
        "Answer to this message with the emoji that matches your choice:\n";

      this.list.forEach((element) => {
        this.prettyString += element.emoji + "    *" + element.name + "*\n";
      });
      this.prettyString +=
        "\n_Check the result pasting all the answers on emojipoll.jacksalici.com/ans_";
      this.tipIsOpen = false;
    },
    copy() {
      navigator.clipboard.writeText(this.prettyString);
      this.tipIsOpen = true;
    },
    addEntry(e) {
      const dict = {
        name: e,
        emoji: `...`,
      };
      this.getEmoji(this.count);
      this.list.push(dict);
      this.count++;

      this.task = "";
      this.pPrint();
    },
    delEntry(i) {
      while (this.datelist.includes(this.list.at(i)["name"])) {
        this.datelist.splice(this.datelist.indexOf(this.list.at(i)["name"]), 1);
      }

      this.list.splice(i, 1);
      this.count--;
      this.pPrint();
    },

    getEmoji(i) {
      this.disabled = true;
      if (this.list.at(i) != undefined) {
        this.list.at(i)["emoji"] = `...`;
      }
      fetch(
        "https://emoji.deta.dev/random?n=1&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          this.list.at(i)["emoji"] = data[0];
          this.disabled = false;
          this.pPrint();
        });
    },

    format(date) {
      return `${date.length} selected. Click to add new dates.`;
    },
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

  

  <h1
    v-if="this.list.length == 0"
    class="text-4xl font-bold sm:text-5xl lg:text-6xl"
  >
    EmojiPoll📮🏄
  </h1>

  <div v-if="this.list.length == 0" class="alert alert-warning">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>The app is still work in progress, problems can occour.</span>
        </div>
      </div>

  <p
    v-if="this.list.length == 0"
    class="max-w-screen-sm text-gray-600 sm:text-2xl"
  >
    Create a poll using random emoji: just insert the entries and share the
    generated text. Then paste your fellows' answers
    <a class="link" href="/ans">here</a>.
  </p>

  <div class="md-5 overflow-x-auto">
    <!--TABLE - ENTRY LIST -->
    <table v-if="this.list.length > 0" class="table w-full table-fixed">
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

            <td class="p-2 w-2/5 truncate">
              {{ element.name }}
            </td>

            <td class="p-2">
              <button class="btn btn-ghost px-1" @click="getEmoji(index)">
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

    <!--INPUT TAB-->
    <div v-if="this.list.length == 0" class="tabs tabs-boxed">
      <a
        class="tab ml-auto"
        :class="{ 'tab-active': dates }"
        @click="togglePollType('date')"
        >Dates survey</a
      >
      <a
        class="tab mr-auto"
        :class="{ 'tab-active': !dates }"
        @click="togglePollType('text')"
        >Content survey</a
      >
    </div>

    <!--INPUT CARDS-->
    
          <Datepicker
            v-model="datelist"
            :modelValue="string"
            modelType="EEE d/M"
            :format="format"
            multiDates
            autoApply
            :closeOnAutoApply="false"
            :enableTimePicker="false"
            :clearable="false"
            hideInputIcon
            v-if="dates"
            menuClassName="bg-base-200 rounded"
            :monthChangeOnScroll="false"
          >
          <template #dp-input="{ value }">
          <div class="form-control m-3">
              <div class="input-group">


          <input type="text" :value="value"             placeholder="Add a new date ✏️🦄"

                    class=" input input-bordered input-primary focus:border-primary focus:ring-0 w-5/6"
/>    <button class="btn btn-primary" v-on:click="handleDates">ADD</button>
</div></div>
        </template>
          </Datepicker>

        
      <form @submit.prevent="addEntry(task)">
        <input
          type="text"
          class="m-3 input input-bordered input-primary focus:border-primary focus:ring-0 w-5/6"
          placeholder="Add a new entry ✏️🦄"
          v-model="task"
          v-if="!dates"
        />
      </form>
    <!--RESULT CARD -->
    <div v-if="this.prettyString.length > 0" class="card bg-accent mt-5">
      <div class="card-body">
        <input
          type="text"
          placeholder="Insert the poll's title (optional)"
          v-model="title"
          class="input input-bordered input-ghost"
          v-on:change="pPrint()"
        />
        <div class="collapse collapse-plus max-w-sm">
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
        </div>

        <div class="card-actions justify-end">
          <a
            role="button"
            :href="
              'https://api.whatsapp.com/send/?text=' +
              this.prettyString.replace(/\x20+/g, '%20').replace(/\n/g, '%0A')
            "
            class="btn btn-primary btn-sm"
            :class="{ 'btn-disabled': disabled }"
          >
            Share on WhatsApp
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
              📑 Copy Text
            </button>
          </div>
        </div>

        <a
          role="button"
          href="
            /ans
            "
          class="btn btn-xs btn-outline btn-primary mx-auto mr-0"
        >
          Parse the answers ⚗️
        </a>
      </div>
    </div>
  </div>
</template>

<style>
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
</style>
