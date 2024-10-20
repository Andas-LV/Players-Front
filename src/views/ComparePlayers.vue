<template>
    <div class="compare-container" v-if="player && comparePlayer">
      <v-row>
        <v-col cols="12">
          <v-card color="#262626">
            <div class="header">
              <button @click="goback" class="btn" title="Назад">
                <span v-html="arrowLeft"></span>
              </button>
  
              <div class="playerTitle">
                <v-card-title>Сравнение игроков</v-card-title>
              </div>
            </div>
  
            <v-card-text>
              <v-row>
                <!-- Левая колонка для заголовков полей -->
                <v-col cols="4">
                  <v-list-item v-for="playerField in playerCompareFields" :key="playerField.field">
                    <v-list-item-content>
                      <v-list-item-title>{{ playerField.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
  
                <!-- Колонка для первого игрока -->
                <v-col cols="3">
                  <v-list-item v-for="playerField in playerCompareFields" :key="playerField.field">
                    <v-list-item-content>
                      <v-list-item-subtitle v-if="playerField.field === 'name'">
                        <span>
                         {{ player[playerField.field as keyof Player] }}
                        </span>
                     </v-list-item-subtitle>

                      <v-list-item-subtitle v-else
                        :class="getBackgroundClass(playerField.field as keyof Player, true)">
                        <span v-if="playerField.needtoFormat">
                          {{ formatCurrency(Number(player[playerField.field as keyof Player])) }}
                        </span>
                        <span v-else>
                          {{ player[playerField.field as keyof Player] }}
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
  
                <!-- Колонка для знаков сравнения -->
                <v-col cols="2" class="comparison-signs">
                  <v-list-item v-for="playerField in playerCompareFields" :key="playerField.field">
                    <v-list-item-content v-if="playerField.field !== 'name'">
                      <v-list-item-subtitle>
                        <span :class="compareClasses(playerField.field as keyof Player)">
                          {{ getComparisonSign(playerField.field as keyof Player) }}
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
  
                <!-- Колонка для второго игрока -->
                <v-col cols="3">
                  <v-list-item v-for="playerField in playerCompareFields" :key="playerField.field">
                    <v-list-item-content>
                    <v-list-item-subtitle v-if="playerField.field === 'name'">
                        <span>
                         {{ comparePlayer[playerField.field as keyof Player] }}
                        </span>
                     </v-list-item-subtitle>

                      <v-list-item-subtitle v-else
                        :class="getBackgroundClass(playerField.field as keyof Player, false)">
                        <span v-if="playerField.needtoFormat">
                          {{ formatCurrency(Number(comparePlayer[playerField.field as keyof Player])) }}
                        </span>
                        <span v-else>
                          {{ comparePlayer[playerField.field as keyof Player] }}
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  
  
  <script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePlayersStore } from '../store/PlayersStore';
import { arrowLeft } from '../assets/svg';
import { useRouter, useRoute } from 'vue-router';
import { playerCompareFields } from '../utils/playerFields';
import { formatCurrency } from '../utils/formatCurrency';
import type { Player } from '../types/Players';

const route = useRoute();
const router = useRouter();

const playersStore = usePlayersStore();
const player = computed(() => playersStore.player);
const comparePlayer = computed(() => playersStore.comparePlayer);

const goback = () => {
  router.go(-1);
};

const getComparisonSign = (field: keyof Player) => {
  const playerValue = player.value?.[field] as number;
  const compareValue = comparePlayer.value?.[field] as number;

  if (playerValue > compareValue) {
    return '>';
  } else if (playerValue < compareValue) {
    return '<';
  } else {
    return '=';
  }
};

const compareClasses = (field: keyof Player) => {
  const playerValue = player.value?.[field] as number;
  const compareValue = comparePlayer.value?.[field] as number;

  if (playerValue > compareValue) {
    return 'greater';
  } else if (playerValue < compareValue) {
    return 'lesser';
  } else {
    return 'equal';
  }
};

const getBackgroundClass = (field: keyof Player, isPlayer: boolean) => {
  const playerValue = player.value?.[field] as number;
  const compareValue = comparePlayer.value?.[field] as number;

  if (playerValue > compareValue) {
    return isPlayer ? 'bg-green' : 'bg-red';
  } else if (playerValue < compareValue) {
    return isPlayer ? 'bg-red' : 'bg-green';
  } else {
    return 'bg-yellow';
  }
};

onMounted(() => {
  // Получение данных о пользователях
});
</script>

  
<style lang="scss" scoped>
.compare-container {
  background-color: #212121;
  min-width: 100dvw;
  min-height: 100dvh;
}

.header {
  position: relative;
  display: flex;
  justify-content: center;
  background-color: rgb(66, 187, 147);
  color: black;
  padding: 20px 30px;

  .playerTitle {
    color: white;
  }

  .btn {
    position: absolute;
    top: 30px;
    left: 30px;
  }
}

v-list-item-subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.greater {
  color: green;
}

.lesser {
  color: red;
}

.equal {
  color: yellow;
}

/* Новые классы для фона */
.bg-green {
  background-color: green;
  color: white;
}

.bg-red {
  background-color: red;
  color: white;
}

.bg-yellow {
  background-color: yellow;
  color: black;
}

.comparison-signs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>
