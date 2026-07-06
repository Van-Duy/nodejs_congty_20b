const createPackage = require("redis")

let redisReady = false
let redisClient = null

const connectRedis = async () => {
    if (redisReady) return redisClient


     redisClient = await createPackage.createClient({
        url: "redis://127.0.0.1:6379",
    })

    redisClient
    .on("error", (err) => {
        redisReady = false
        console.log("Redis Client Error", err)
    })
    .connect();

    redisReady = true
    return redisClient
}

const getCache = async (key) => {
    try {
        let client = await connectRedis()
        if (!client) return null

        let data = await client.get(key);
        return data ? JSON.parse(data) : null
    } catch (error) {
        console.log(error)
    }
}

const setCache = async(key , value , ttl = 60 * 60 * 24) => {
    try {
        let client = await connectRedis()
        if (!client) return null
        
        await client.set(key, JSON.stringify(value) , {
            EX : ttl
        })

    } catch (error) {
        console.log(error)
    }
}
 

module.exports = {
    connectRedis,
    setCache,
    getCache
}



