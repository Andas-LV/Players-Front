<script setup lang="ts">
import { computed } from 'vue';
import { usePlayersStore } from '../store/PlayersStore';

// Props
const props = defineProps<{
  playerId: number;
  avatar_url: string | null;
}>();

const playersStore = usePlayersStore();

// Avatar logic
const avatar = computed(() => props.avatar_url || '/player.jpg');

const uploadAvatar = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      await playersStore.uploadPlayerAvatar(props.playerId, file);
    }
  };
  input.click();
};

const deleteAvatar = async () => {}
  
</script>

<template>
  <v-menu location="end" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <label class="player-profile-wrapper" v-bind="props">
        <img :src="avatar" alt="Player Avatar" class="player-profile" />
      </label>
    </template>

    <v-list>
      <v-list-item @click="uploadAvatar" value="upload-avatar">
        <v-icon>mdi-upload</v-icon>
        <v-list-item-title>Upload Photo</v-list-item-title>
      </v-list-item>

      <v-list-item @click="deleteAvatar" value="delete-avatar">
        <v-icon>mdi-delete</v-icon>
        <v-list-item-title>Delete Photo</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss">
.player-profile-wrapper {
  display: flex;
  align-items: center;
}

.player-profile {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
</style>
