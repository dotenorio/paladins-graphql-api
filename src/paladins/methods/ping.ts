import config from "../../config"
import axios from "axios";

const ping = async () => {
  const { data } = await axios.get([
    config.PALADINS_API_URL,
    'pingJson'
  ].join('/'))

  return data
}

export default ping