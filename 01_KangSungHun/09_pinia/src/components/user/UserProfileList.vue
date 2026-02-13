<script setup>
import UserProfileItem from "@/components/user/UserProfileItem.vue";

defineProps({
  users: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="user-profile-list">
    <UserProfileItem
        v-for="user in users"
        :key="user.username"
        :user="user"
    />
  </div>
</template>

<style scoped>
.user-profile-list {
  display: grid;
  gap: 1rem;
}
</style>