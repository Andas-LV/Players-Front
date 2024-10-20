<template>
  <div class="player-card">
    <div class="player-info">
      <h3 class="player-name">{{ playerFullName }}</h3>
      <div class="player-rating">
        <span class="rating-value">{{ overAllRating }} / 100</span>
      </div>
      <div class="player-details">
        <span>Age: {{ age }}</span>
        <span v-if="value">Value: {{ formatCurrency(value) }}</span>
        <span v-else>Value: no information</span>
      </div>
    </div>

      <div class="player-actions">
          <button v-if="!favourite" @click="favouritePLayer(playerId)">
              <span v-html="emptyStar"></span>
          </button>
          <button v-else @click="deleteFavouritePLayer(playerId)">
              <span v-html="filledStar"></span>
          </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { formatCurrency } from '../../../utils/formatCurrency'
  import { usePlayersStore } from '../../../store/PlayersStore';
  import { emptyStar, filledStar } from '../../../assets/svg'
  
  const router = useRouter()
  const playersStore = usePlayersStore()
  
  defineProps<{
    playerId: number,
    playerFullName: string,
    age: number,
    overAllRating: number,
    value: number | null,
    favourite: boolean,
  }>()
  
  const favouritePLayer = async(playerId: number) => {
    await playersStore.createFavoritePlayer(playerId)
  }
  
  const deleteFavouritePLayer = async(playerId: number) => {
    await playersStore.deleteFavoritePlayer(playerId)
  }
  </script>
  
  <style lang="scss" scoped>
  .player-card {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  
    &:hover {
      background-color: #e0e0e0;
      transform: translateY(-2px);
    }
  
    .player-info {
      flex-grow: 1;
    }
  
    .player-name {
      font-size: 1.2em;
      margin-bottom: 8px;
    }
  
    .player-rating {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
  
      .rating-value {
        font-weight: bold;
        margin-right: 8px;
      }
    }
  
    .player-details {
      display: flex;
      flex-direction: column;
      font-size: 0.9em;
      color: #666;
    }
  
    .player-actions {
      display: flex;
      align-items: center;
    }
  }
  </style>