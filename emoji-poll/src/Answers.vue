<template>
  <div class="container mx-auto px-4 py-14 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center ">
    
      <div class="alert alert-warning">
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
      <h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">EmojiPoll📮🏄</h1>
      <textarea
        class="textarea textarea-primary w-full"
        placeholder="Paste the answers."
        v-model="answer"
        @input="count"
      ></textarea>

      <div v-if="emoji != ''" class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text"
            >Please check below that all the poll's emoji had been parsed
            correctly and separated by a comma. Correct them if necessary.</span
          >
        </label>
        <input
          type="text"
          class="input input-bordered input-primary w-full max-w-xs"
          v-model="emoji"
          @input="talling()"
        />
      </div>

      <div class="card bg-primary text-primary-content">
        <div class="card-body" v-html="tally"></div>
      </div>

      <a role="button" class="btn btn-xs ptn-primary ml-0 self-start" href="/">
        👈 Go back to the generator</a
      >
  </div>
</template>

<script>
export default {
  name: "AppAnswers",
  components: {},
  data() {
    return {
      emoji: "",
      answer: "",
      tally: "",
    };
  },
  methods: {
    count() {
      this.emoji = "";
      const regex =
        "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])";
      const match = [...this.answer.matchAll(regex)];
      match.forEach((element) => {
        if (element[0] != "[" && !new RegExp(element, "g").test(this.emoji)) {
          this.emoji += element[0] + ",";
        }
      });
      this.talling();
    },
    talling() {
      let dictE = {};
      this.tally = "";
      this.emoji.split(",").forEach((element) => {
        if (element != "") {
          dictE[element] = (
            this.answer.match(new RegExp(element, "g")) || []
          ).length;
        }
      });

      let items = Object.keys(dictE).map(function (key) {
        return [key, dictE[key]];
      });
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      console.log(items)
      items.forEach((element) => {
        let d = 14
        let b = 'xl'
        let f = 3
      
        this.tally += `
        <div>
        <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-${d}">
         <span class="text-${f}">${element[0]}</span>
        </div>
        </div> 
        <div class="badge badge-${b} badge-accent">${element[1]}</div>

        </div>
        
        
        `
        
        
        
        
      });
    },
  },
};
</script>
