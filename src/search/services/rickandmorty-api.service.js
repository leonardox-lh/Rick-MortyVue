import axios from "axios";

const https = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 3000,
});

export class RickAndMortyApiService {
    getCharacter(params={}) {
        return https.get('character', { params });
    }

    getCharacterById(id) {
        return https.get(`character/${id}`);
    }
}