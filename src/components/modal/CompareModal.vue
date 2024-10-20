<template>
    <div v-if="showModal" class="modal-container" @click.self="closeModal">
      <div class="modal-content">
        <SearchForModal/>
        <div class="players-container">
          <PlayerCardForModal
            v-for="player in playersStore.players"
            @click="selectPlayerForComparison(player.id!)"
            :key="player.id"
            :playerId="player.id!"
            :playerFullName="player.full_name"
            :age="player.age"
            :overAllRating="player.overall_rating"
            :value="player.value_euro"
            :favourite="player.favourite"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SearchForModal from './UI/SearchForModal.vue';
  import PlayerCardForModal from './UI/PlayerCardForModal.vue'
  import { usePlayersStore } from '../../store/PlayersStore';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router'

  const playersStore = usePlayersStore();
  const router = useRouter()

  defineProps<{
    showModal: boolean
  }>();
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };

  const selectPlayerForComparison = (id: number) => {
    playersStore.setComparePlayer(id);
    router.push('/compare');
  };
  
  </script>
  
  <style lang="scss" scoped>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    z-index: 1000;
  
    .modal-content {
      background: white;
      width: 700px;
      height: 500px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      
    }
  
    .players-container {
      flex-grow: 1;
      overflow-y: auto;
      padding: 20px;
    }
  }
  </style>