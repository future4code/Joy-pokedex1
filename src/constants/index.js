import axios from "axios";
export const url='https://pokeapi.co/api/v2/pokemon'

export const httpClient = axios.create({ baseURL: url });