<template>
  <div class="flex flex-col h-screen justify-between">
  
  <div
    class="container mx-auto px-4 py-4 sm:px-6 xl:px-12 max-w-3xl items-center justify-center space-y-6 text-center"
  >
    <p class="text-primary text-xs" v-if="!($i18n.locale == 'it' || $i18n.locale == 'en') && hideWipBanner">
      This page has been translated with an automatic translator, please forgive any inaccuracies. If you want contributing in the translation see the <a  class="link" href="https://github.com/jacksalici/emojipoll">Github page</a>.
      <button  class="btn btn-xs btn-ghost">Dismiss</button>
    </p>

    <div class="navbar bg-base-200 rounded-3xl">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
          >
           
            <li>
              <a href="/">{{ $t("menu.generator") }}</a>
            </li>
            <li>
              <a href="/calc">{{ $t("menu.calc") }}</a>
            </li>
            
           
            <li>
              <a href="/tool">{{ $t("menu.tool") }}</a>
            </li>
            
            <li tabindex="0">
              <span>{{ $t("menu.lang") }}</span>
              <ul class="bg-base-100 shadow-xl">
                <li>
                  <button class="btn btn-ghost btn-sm" @click="lang('en')">
                    🇺🇸
                  </button>
                </li>
                <li>
                  <button class="btn btn-ghost btn-sm" @click="lang('it')">
                    🇮🇹
                  </button>
                </li>
                <li>
                  <button class="btn btn-ghost btn-sm" @click="lang('fr')">
                    🇫🇷
                  </button>
                </li>
                <li>
                  <button class="btn btn-ghost btn-sm" @click="lang('es')">
                    🇪🇸
                  </button>
                </li>
                <li>
                  <button class="btn btn-ghost btn-sm" @click="lang('de')">
                    🇩🇪
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a href="/" class="btn btn-ghost normal-case text-xl font-bold"
          > <img src="logo.png" class="inline h-7 mx-1"/>EmojiPoll</a
        >
      </div>
      <div class="navbar-end"></div>
      <!--<div class="navbar-end">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content p-2 shadow-xl bg-base-100 rounded-box w-40"
          >
            <li><a>🗺💬</a></li>
            <li><a>🙋ℹ️</a></li>
          </ul>
        </div>
      </div>-->
    </div>

    <component :is="currentView" />

    
  </div>

  <footer class="footer footer-center p-10 bg-base-200 mt-20 mb-0">
  <div>
    <img src="logo2.png" class="h-14 p-2"/>
    <p>Created with ❤️‍🔥 on 🌍 by <a class="link" href="https://jacksalici.com">Jack Salici</a>. <br> </p>
    <p class="text-xs">The website is released under MIT Licence. Contibute or suggest improvements on <a  class="link" href="https://github.com/jacksalici/emojipoll">GitHub</a>!</p>
  </div> 
</footer> 

  </div>
</template>

<script>
import PollCore from "./components/Poll.vue";
import AppAnswers from "./pages/Answers.vue";
import NotFound from "./pages/NotFound.vue";
import AboutPage from "./pages/AboutPage.vue";
import ToolBox from "./pages/Tool.vue";

const routes = {
  "/": PollCore,
  "/calc": AppAnswers,
  "/about": AboutPage,
  "/tool": ToolBox,
};

export default {
  name: "App",
  components: {
    PollCore,
    AppAnswers,
  },
  data() {
    return {
      currentPath: window.location.pathname,
      hideWipBanner: false,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath || "/"] || NotFound;
    },
  },
  mounted() {
    if (sessionStorage.getItem("lang-wip")) {
      this.hideWipBanner = true;
    }
  },
  methods: {
    wipBanner() {
      sessionStorage.setItem("lang-wip", true);
      this.hideWipBanner = true;
    },
    lang(lang) {
      sessionStorage.setItem("lang", lang);
      this.$i18n.locale = lang;
    },
  },
};
</script>
