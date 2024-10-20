<script setup lang="ts">
import { useRouter } from 'vue-router';
import { emptyStar, filledStar } from '../assets/svg';
import { formatCurrency } from '../utils/formatCurrency';
import { usePlayersStore } from '../store/PlayersStore';
import PlayerProfile from './PlayerProfile.vue';

defineProps<{
  playerId: number;
  playerFullName: string;
  age: number;
  overAllRating: number;
  price: number | null;
  avatar_url: string | null;
  favourite: boolean;
}>();

const router = useRouter();
const playersStore = usePlayersStore();

const toggleFavourite = async (playerId: number, favourite: boolean) => {
  if (favourite) {
    await playersStore.deleteFavoritePlayer(playerId);
  } else {
    await playersStore.createFavoritePlayer(playerId);
  }
};

const goToPlayerCard = (playerId: number) => {
  router.push(`/player/${playerId}`);
};
</script>

<template>
  <v-card class="player-card" max-width="300" elevation="5" shaped>
    <v-row>
      <v-col cols="4">
        <PlayerProfile :playerId="playerId" :avatar_url="avatar_url" />
      </v-col>

      <v-col cols="8" class="top-info">
        <div class="player-name">{{ playerFullName }}</div>
        <v-row align="center" class="rating-row">
          <v-rating
            :value="overAllRating / 20"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          />
          <div class="rating-text">{{ overAllRating }} / 100</div>
        </v-row>
      </v-col>
    </v-row>

    <v-card-text class="bottom-info">
      <div class="text-subtitle-1">Age: {{ age }}</div>
      <div class="text-subtitle-1">
        Value: {{ price ? formatCurrency(price) : 'No information' }}
      </div>
    </v-card-text>

    <v-card-actions class="actions">
      <v-btn color="warning" @click="goToPlayerCard(playerId)">View Details</v-btn>

      <v-btn @click="toggleFavourite(playerId, favourite)">
        <span v-html="favourite ? filledStar : emptyStar"></span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.player-card {
  padding: 10px;
  background-color: #181818;
  color: white;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
}

.top-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.player-name {
  font-size: 18px;
  font-weight: bold;
  
}

.rating-row {
  display: flex;
  align-items: center;
  margin-top: 5px;

  .rating-text {
    margin-left: 10px;
  }
}

.bottom-info {
  margin-top: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
</style>
