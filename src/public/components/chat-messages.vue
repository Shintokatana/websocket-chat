<template>
  <perfect-scrollbar class="messages" ref="scroll">
    <div
        v-for="(message, index) in chat.messages"
        :key="index"
        class="messages__item"
    >
      <div
          :style="`color: ${message.color};`"
          class="messages__client">
        {{ message.clientName }}
      </div>

      <div
          class="messages__text"
          v-if="message.type === 'client'"
          v-html="message.message">
      </div>

      <img
          class="messages__image"
          v-if="message.type === 'image'"
          :src="message.message"
          alt=""
          @load="scrollDown"
      />
    </div>
  </perfect-scrollbar>
</template>

<script>
import chat from '../chat';

export default {
  data() {
    return {
      chat: chat
    }
  },
  watch: {
    'chat.messages.length'() {
      this.scrollDown();
    }
  },
  methods: {
    scrollDown() {
      this.$nextTick(() => {
        const wrapper = this.$refs.scroll.$el;

        wrapper.scrollTo({
          top: wrapper.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  }
}
</script>
