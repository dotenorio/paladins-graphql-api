import config from "../../config"
import md5 from "md5";
import moment from "moment";

const getTimestamp = () => {
  return moment.utc().format('YYYYMMDDHHmmss')
}

const generateSignature = (method: string) => {
  const timestamp = getTimestamp()

  return md5([
    config.PALADINS_DEV_ID,
    method,
    config.PALADINS_AUTH_KEY,
    timestamp
  ].join(''))
}

const buildUrl = ({
  method,
  sessionId = null,
  player = null,
  xSessionId = null,
  matchId = null,
  language = null
}) => {
  const signature = generateSignature(method)
  const timestamp = getTimestamp()

  sessionId = sessionId || xSessionId
  sessionId = sessionId || '--'

  let extraParameter = null

  if (player) {
    extraParameter = player
  } else if (matchId) {
    extraParameter = matchId
  } else if (language) {
    extraParameter = language
  }

  let url = [
    config.PALADINS_API_URL,
    `${method}Json`,
    config.PALADINS_DEV_ID,
    signature,
    sessionId,
    timestamp,
    extraParameter
  ].join('/')
   .replace('--/', '')
   .replace(/\/$/, '')

  // console.log(url)
  return url
}

export default buildUrl