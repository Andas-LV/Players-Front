import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Player } from '../types/Players'
import { playersService } from '../services/players.service'

export const usePlayersStore = defineStore('playersStore', () => {
    const player = ref<Player | null>(null)
    const players = ref<Player[] | null>(null)
    const comparePlayer = ref<Player | null>(null);
    const favouritePlayers = ref<Player[] | null>(null)

    const getAllPlayers = async () => {
      try {
        players.value = await playersService.getAllPlayers()
      } catch (error) {
        console.log(error)
      }
    }

    const uploadPlayerAvatar = async(id: number, avatarFile: File) => {
      try {
        await playersService.uploadPlayerAvatar(id, avatarFile)
      } catch(e) {
        console.error(e)
      }
    }

    const getPlayerById = async (id: number) => {
      try {
          player.value = await playersService.getPlayerById(id)
      } catch (error) {
        console.log(error)
      }
    }

    const getPlayerByName = async (name: string) => {
      try {
          players.value = await playersService.getPlayerByName(name)
      } catch (error) {
        console.log(error)
      }
    }

    const getPlayerByPrice = async () => {
      try {
        players.value = await playersService.getPlayerByPrice()
      } catch (error) {
        console.log(error)
      }
    }

    const getPlayerByRating = async () => {
      try {
        players.value = await playersService.getPlayerByRating()
      } catch (error) {
        console.log(error)
      }
    }

    const getPlayerByWage = async () => {
      try {
        players.value = await playersService.getPlayerByWage()
      } catch (error) {
        console.log(error)
      }
    }

    // FAVORITE PLAYERS
    
    const createFavoritePlayer = async (id: number) => {
      try {
        favouritePlayers.value = await playersService.createFavoritePlayer(id);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteFavoritePlayer = async (id: number) => {
      try {
        favouritePlayers.value = await playersService.deleteFavoritePlayer(id);
      } catch (error) {
        console.log(error);
      }
    };

    const getFavoritePlayers = async () => {
      try {
        players.value = await playersService.getFavoritePlayers()
      } catch (error) {
        console.log(error)
      }
    }  

    // COMPARE

    const setComparePlayer = async (id: number) => {
      comparePlayer.value = await playersService.getPlayerById(id)
    };
    
    return {
      player,
      players,
      comparePlayer,
      getAllPlayers,
      uploadPlayerAvatar,
      getPlayerById,
      getPlayerByName,
      getPlayerByPrice,
      getPlayerByRating,
      getPlayerByWage,
      createFavoritePlayer,
      deleteFavoritePlayer,
      getFavoritePlayers,
      setComparePlayer,
    }
})