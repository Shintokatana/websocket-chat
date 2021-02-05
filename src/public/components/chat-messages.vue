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
      this.$nextTick(() => {
        const el = this.$refs.scroll.$el;

        el.scrollTo({
          top: el.scrollHeight,
          behavior: 'smooth'
        });
      })
    }
  }
}
</script>
