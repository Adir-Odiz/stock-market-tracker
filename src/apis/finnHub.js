import axios from "axios"

const TOKEN = "cc8rq6aad3id4lq9sngg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})