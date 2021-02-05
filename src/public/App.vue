<template>
  <main>
    <app-connect v-if="!chat.isOpen" />

    <transition name="chat" appear>
      <app-chat v-if="chat.isOpen" />
    </transition>

    <notifications group="error" />
  </main>
</template>

<script>
import AppConnect from './components/chat-connect.vue';
import AppChat from './components/app-chat.vue';
import chat from './chat';

export default {
  components: {
    AppConnect,
    AppChat,
  },
  data() {
    return {
      chat,
    }
  },
}
</script>
