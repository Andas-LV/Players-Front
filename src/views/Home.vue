<template>
  <v-container fluid class="main">
    <v-row>
      <v-col cols="12">
        <Header />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="player in playersStore.players"
        :key="player.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
      <PlayerCard
        :playerId="player.id!"
        :playerFullName="player.full_name"
        :age="player.age"
        :overAllRating="player.overall_rating"
        :price="player.value_euro"
        :avatar_url="player.avatar_url"
        :favourite="player.favourite"
      />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import Header from '../components/Header.vue';
import PlayerCard from '../components/PlayerCard.vue';
import { usePlayersStore } from '../store/PlayersStore';
import { useUserStore } from '../store/UserStore';

const playersStore = usePlayersStore();
const userStore = useUserStore()

onMounted(() => {
  playersStore.getAllPlayers();
  userStore.getUserMe()
});
</script>

<style lang="scss" scoped>
.main {
  background-image: url('/night-football.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100dvh;
  padding: 0;
  color: white;
}
</style>