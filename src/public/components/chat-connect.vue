<template>
  <div class="connect">
    <transition name="logo" appear>
      <app-logo width="320px" />
    </transition>

    <transition name="connect">
     <div v-if="loaded" class="connect__wrapper">
       <div class="connect__title">
         <p>Type your nickname</p>
         <p class="connect__generated" v-if="generated">
           or proceed with generated one.
           Extrawest 2021
         </p>
       </div>

        <div class="connect__form">
          <input
              class="connect__input"
              ref="input"
              placeholder='nickname *'
              :disabled="chat.isOpen"
              v-model="chat.clientName"
              spellcheck="false"
              maxlength="64"
          >

          <button
              :disabled="!chat.clientName || chat.isOpen"
              class="connect__button"
              @click="handleConnect"
          >
            chat
          </button>
        </div>
     </div>
    </transition>
  </div>
</template>

<script>
import AppLogo from './chat-logo.vue';
import chat from '../chat';

export default {
  components: {
    AppLogo,
  },
  data() {
    return {
      loaded: false,
      generated: false,
      chat,
    }
  },
  async mounted() {
    this.generated = await chat.getRandomName();
    this.loaded = true;

    setTimeout(() => this.$refs.input.focus(), 1000);
  },
  methods: {
    handleConnect() {
      try {
        this.chat.open();
      } catch ({ name, message}) {
        this.$notify({
          group: 'error',
          title: name,
          text: message,
        });
      }
    }
  }
}
</script>
