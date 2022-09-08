import { load } from '../src'
import './style.css'

window.onload = async () => {
  const bot = await load()
  console.log(bot)
  const res = bot.detect()
  console.log(res)
}
