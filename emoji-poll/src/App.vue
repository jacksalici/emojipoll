<template>
  <div class="container mx-auto px-4 py-14 sm:px-6 xl:px-12">
    <div
      class="flex flex-col items-center justify-center space-y-6 text-center"
    >
      <h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">EmojiPoll📮🏄</h1>
      <p class="max-w-screen-sm text-lg text-gray-600 sm:text-2xl">
        Create a poll using random emoji. Just fill the entries,
        copy the poll text and paste it on your favorite reaction-featured
        instant-messaging app.
      </p>
      <PollCore />
    </div>
  </div>

  
</template>

<script>
import PollCore from "./components/Poll.vue";

export default {
  name: "App",
  components: {
    PollCore,
  },
  data() {
    return { emoji: this.getEmoji() };
  },
  methods: {
    getEmoji() {
      fetch(
        "https://emoji.deta.dev/random?n=3&skintones=False&nogroup=Symbols,Flags&maxversion=14"
      )
        .then((response) => response.json())
        .then((data) => {
          this.emoji = data[0] + data[1] + data[2];
        });
    },
  },
};
</script>
