<template>
  <div class="chat">
    <chat-title />
    <chat-messages />

    <input :disabled="!chat.isOpen" placeholder='Write a message...' v-model="message">
    <button :disabled="!chat.isOpen || !message" @click="sendMessage">send</button>
    <input
        :disabled="!chat.isOpen"
        @change="sendImage"
        type='file'
        accept='image/*'
    >
  </div>
</template>

<script>
import ChatTitle from './chat-title.vue';
import ChatMessages from './chat-messages.vue';
import chat from '../chat';

export default {
  components: {
    ChatTitle,
    ChatMessages,
  },
  data() {
    return {
      chat,
      message: '',
    }
  },
  methods: {
    sendMessage() {
      this.chat.send({
        message: this.message,
        type: 'client',
      });

      this.message = 'e';
    },

    sendImage(event) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = () => {
        this.chat.send({
          message: reader.result,
          type: 'image'
        });
      }
    }
  }
}
</script>
