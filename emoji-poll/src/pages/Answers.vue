<template>
    
     
      <h1 class="text-2xl font-bold">Answer parser</h1>
      <p
   
    class="max-w-screen-sm"
  >
    Execute the tally of the answer. Just paste below all your fellows text answers.
  </p>

      <textarea
        class="textarea textarea-primary w-full"
        placeholder="Paste the answers."
        v-model="answer"
        @input="count"
      ></textarea>

      <div v-if="emoji != ''" class="form-control w-full ">
        <label class="label">
          <span class="label-text"
            >Please check below that all the poll's emoji had been parsed
            correctly and separated by a comma. Correct them if necessary.</span
          >
        </label>
        <input
          type="text"
          class="input input-bordered input-primary w-full"
          v-model="emoji"
          @input="talling()"
        />
      </div>

      <div class="card bg-base-200 text-primary-content">
        <div class="card-body" v-html="tally"></div>
      </div>

      <a role="button" class="btn btn-xs ptn-primary ml-0 self-start" href="/">
        👈 Go back to the generator</a
      >
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
        let b = '2xl'
      
        this.tally += `
        <div>
        <div class="avatar placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-20">
         <span class="text-2xl">${element[0]}</span>
        </div>
        </div> 
        <div class="badge badge-${b} badge-primary">${element[1]}</div>

        </div>
        
        
        `
        
        
        
        
      });
    },
  },
};
</script>
