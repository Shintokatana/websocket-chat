<template>
  <div class="chat">
    <chat-title />
    <chat-messages />
    <chat-actions />
  </div>
</template>

<script>
import ChatTitle from './chat-title.vue';
import ChatMessages from './chat-messages.vue';
import ChatActions from './chat-actions.vue';
import chat from '../chat';

export default {
  components: {
    ChatTitle,
    ChatMessages,
    ChatActions,
  },
  data() {
    return {
      chat,
      message: '',
    }
  },
}
</script>
