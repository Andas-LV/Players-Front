import axios from 'axios'
import { type Player } from '../types/Players'

class PlayersService {
  baseUrl: string
  token = localStorage.getItem('token')

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getAllPlayers(): Promise<Player[]> {
    const { data } = await axios.get(`${this.baseUrl}/players/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data.results
  }

  async uploadPlayerAvatar(id: number, avatarFile: File) {
    const formData = new FormData();
    formData.append('avatar_url', avatarFile);
  
    const { data } = await axios.put(`${this.baseUrl}/players/${id}/update-avatar/`, formData, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  }

  async getPlayerById(id: number): Promise<Player> {
    const { data } = await axios.get(`${this.baseUrl}/players/${id}/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async getPlayerByName(name: string): Promise<Player[]> {
    const { data } = await axios.get(`${this.baseUrl}/players/${name}/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async getPlayerByPrice(): Promise<Player[]> {
    const { data } = await axios.get(`${this.baseUrl}/players/byPrice/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data.results
  }

  async getPlayerByRating(): Promise<Player[]> {
    const { data } = await axios.get(`${this.baseUrl}/players/byRating/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data.results
  }

  async getPlayerByWage(): Promise<Player[]> {
    const { data } = await axios.get(`${this.baseUrl}/players/byWage/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data.results
  }

  async createFavoritePlayer(id: number) {
    const { data } = await axios.post(`${this.baseUrl}/players/${id}/favorite/`, {}, {
      headers: {
        Authorization: 'Bearer ' + this.token,
      }
    })
    return data
  }

  async deleteFavoritePlayer(id: number) {
    const { data } = await axios.delete(`${this.baseUrl}/players/${id}/favorite/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async getFavoritePlayers() {
    const { data } = await axios.get(`${this.baseUrl}/players/favorites/`, {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    })
    return data
  }
}

export const playersService = new PlayersService(import.meta.env.VITE_BACKEND_URL)
