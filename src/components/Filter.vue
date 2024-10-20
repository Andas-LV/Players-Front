<script lang="ts" setup>
import { ref } from 'vue'
import { usePlayersStore } from '../store/PlayersStore'

const playersStore = usePlayersStore()

const sortByRating = async() => {
  await playersStore.getPlayerByRating()
}

const getFavoritePlayers = async() => {
  await playersStore.getFavoritePlayers()
}

const getPlayerByWage = async() => {
  await playersStore.getPlayerByWage()
}

const getPlayerByPrice = async() => {
  await playersStore.getPlayerByPrice()
}

</script>

<template>
  <div class="dropdown">
    <button class="dropbtn">All ▼</button>
    <div class="dropdown-content">
      <button>All</button>
      <button @click="sortByRating">By rating</button>
      <button @click="getPlayerByPrice">By price</button>
      <button @click="getPlayerByWage">By wage</button>
      <button @click="getFavoritePlayers">My favourites</button>
    </div>
  </div>
</template>

<style lang="scss" scoped >
.dropdown {
    position: relative;
    display: inline-block;
}
.dropbtn {
    background-color: hwb(232 34% 24%);
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    min-width: 160px;
    text-align: center;
    border-radius: 10px;
    transition: .3s ease-in-out;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    text-align: center;
    border-radius: 10px;
    transition: .3s ease-in-out;
}
.dropdown-content button {
  width: 100%;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: center;
}
.dropdown-content button:hover {
  background-color: #e2e2e2;
  border-radius: 10px;
}

.dropdown:hover .dropdown-content {
    display: block;
}
.dropdown:hover .dropbtn {
    background-color: #3647b6;
}
</style>