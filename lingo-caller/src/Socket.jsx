import { io } from "socket.io-client"

const URL = 'http://localhost:4096'

export const socket = io(URL)