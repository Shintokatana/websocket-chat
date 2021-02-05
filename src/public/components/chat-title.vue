<template>
  <div class="chat-title">
    <span class="chat-title__user">{{ chat.clientName }}</span>
    <span v-if="chat.otherUsersCount">
      and {{chat.otherUsersCount}} other
      user{{chat.otherUsersCount > 1 ? 's' : ''}}
    </span>
    in the room
  </div>
</template>

<script>
import chat from '../chat';

export default {
  data() {
    return {
      chat
    }
  }
}
</script>
