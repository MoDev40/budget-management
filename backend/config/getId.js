import { cryptoRandomStringAsync } from "crypto-random-string";

export async function randomId(){
    return await cryptoRandomStringAsync({length:26,type:"alphanumeric"})
}