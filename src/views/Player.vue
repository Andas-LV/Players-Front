<template>
  <div class="player-container">
    <v-row>
      <v-col cols="12">
        <v-card v-if="player" color="#262626">
          <div class="header">
            <button @click="goback" class="btn" title="Назад">
              <span v-html="arrowLeft"></span>
            </button>

            <div class="playerTitle">
              <v-card-title>{{ player.full_name }}</v-card-title>
              <v-card-subtitle>{{ player.nationality }} - {{ player.age }} years</v-card-subtitle>
            </div>

            <button @click="toggleModal" class="btn" title="Сравнить">
              <span v-html="people"></span>
            </button>
          </div>

          <v-card-text v-if="userStore.isAuthenticated">
            <v-row>
              <v-col cols="4" v-for="playerField in playerFields" :key="playerField.field">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ playerField.title }}</v-list-item-title>
                    <v-list-item-subtitle v-if="playerField.needtoFormat">
                      {{ formatCurrency(Number(player[playerField.field as keyof Player])) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-else>
                      {{ player[playerField.field as keyof Player] }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
          <h2 v-else class="mt-4">
              You are not Authenticated
          </h2>
        </v-card>
      </v-col>
    </v-row>
  </div>

  <CompareModal
    :show-modal="modal"
    @close="toggleModal"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { usePlayersStore } from '../store/PlayersStore';
  import { useUserStore } from '../store/UserStore';
  import { useRouter, useRoute } from 'vue-router';
  import { playerFields } from '../utils/playerFields';
  import type { Player } from '../types/Players'
  import { formatCurrency } from '../utils/formatCurrency'
  import { arrowLeft, people } from '../assets/svg'
  import CompareModal from '../components/modal/CompareModal.vue';

  const route = useRoute()
  const router = useRouter()

  const userStore = useUserStore()
  const playersStore = usePlayersStore();

  const player = computed(() => playersStore.player);
  const modal = ref(false)
  
  const goback = () => {
    router.push('/')
  }

  const toggleModal = () => {
    modal.value = !modal.value
  }

  onMounted(() => {
    userStore.getUserMe()
    playersStore.getPlayerById(Number(route.params.id));
  });
</script>

<style lang="scss" scoped>
  .player-container{
    background-color: #212121;
    min-width: 100dvw;
    min-height: 100dvh;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:rgb(66, 187, 147);
    color: black;
    padding: 20px 30px;

    .playerTitle{
      color: white;
    }

    .btn {
      border-radius: 5px;
      padding: 6px 8px 4px;
      transition: .3s ease-in-out;

      &:hover{
        background-color: rgb(42, 112, 89);
        color: white;
      }
    }
  }
</style>