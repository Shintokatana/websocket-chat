<template>
  <div class="actions">
    <input
        class="actions__input"
        placeholder='Write a message...'
        spellcheck="false"
        @keypress.enter="sendMessage"
        v-model="message">

    <send-button
        ref="send"
        :disabled="!message"
        @click="sendMessage"
    />

    <file-input @change="sendImage" />
  </div>
</template>

<script>
import chat from '../chat';
import SendButton from './send-button.vue';
import FileInput from './file-input.vue';

export default {
  components: {
    SendButton,
    FileInput,
  },
  data() {
    return {
      chat,
      message: '',
    }
  },
  methods: {
    sendMessage() {
      if (this.message) {
        this.send({
          message: this.message,
          type: 'client',
        });
      }
    },

    sendImage(payload) {
      this.send(payload);
    },

    send(payload) {
      this.chat.send(payload);
      this.$refs.send.key = Math.random();
      this.message = '';
    }
  }
}
</script>
