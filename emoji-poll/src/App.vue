<template>
  <div class="container mx-auto px-4 py-4 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center">
    
     
      <h1 class="text-4xl font-bold sm:text-5xl lg:text-6xl">EmojiPoll📮🏄</h1>

      <PollCore />
  </div>
</template>

<script>
import PollCore from "./components/Poll.vue";

export default {
  name: "App",
  components: {
    PollCore,
  },
};
</script>
