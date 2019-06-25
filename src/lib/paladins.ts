import config from "../config"
import axios from "axios";
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
  playerName = null
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
  } else if (matchId) {
    extraParameter = playerName
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

const tiers = {
  0: 'Unranked',
  1: 'Bronze V',
  2: 'Bronze IV',
  3: 'Bronze III',
  4: 'Bronze II',
  5: 'Bronze I',
  6: 'Silver V',
  7: 'Silver IV',
  8: 'Silver III',
  9: 'Silver II',
  10: 'Silver I',
  11: 'Gold V',
  12: 'Gold IV',
  13: 'Gold III',
  14: 'Gold II',
  15: 'Gold I',
  16: 'Platinum V',
  17: 'Platinum IV',
  18: 'Platinum III',
  19: 'Platinum II',
  20: 'Platinum I',
  21: 'Diamond V',
  22: 'Diamond IV',
  23: 'Diamond III',
  24: 'Diamond II',
  25: 'Diamond I',
  26: 'Masters I',
  27: 'Grandmaster'
}

const ping = async () => {
  const { data } = await axios.get([
    config.PALADINS_API_URL,
    'pingJson'
  ].join('/'))

  const test = /Ping successful/.test(data)
  return data
}

const createSession = async () => {
  const {
    data: {
      ret_msg,
      session_id
    }
  } = await axios.get(buildUrl({
    method: 'createsession'
  }))

  return session_id || ret_msg
}

const testSession = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'testsession',
    sessionId,
    xSessionId
  }))

  const test = /Invalid session id/.test(data)
  return data
}

const getHirezServerStatus = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'gethirezserverstatus',
    sessionId,
    xSessionId
  }))

  return data
}

const getDataUsed = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getdataused',
    sessionId,
    xSessionId
  }))

  return data[0]
}

const getDemoDetails = async (parent, { sessionId = null, matchId }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getdemodetails',
    sessionId,
    matchId,
    xSessionId
  }))

  return data[0]
}

const getEsportsProLeagueDetails = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getesportsproleaguedetails',
    sessionId,
    xSessionId
  }))

  return data
}

const getFriends = async (parent, { sessionId = null, playerName }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getfriends',
    sessionId,
    playerName,
    xSessionId
  }))

  return data
}

const getPlayer = async (parent, { sessionId = null, player }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getplayer',
    sessionId,
    player,
    xSessionId
  }))

  if (data.length && !data[0].ret_msg) {
    data[0].RankedConquest.Tier_Label = tiers[data[0].RankedConquest.Tier]
    data[0].RankedController.Tier_Label = tiers[data[0].RankedController.Tier]
    data[0].RankedKBM.Tier_Label = tiers[data[0].RankedKBM.Tier]

    data[0].Tier_Conquest_Label = tiers[data[0].Tier_Conquest]
    data[0].Tier_RankedController_Label = tiers[data[0].Tier_RankedController]
    data[0].Tier_RankedKBM_Label = tiers[data[0].Tier_RankedKBM]
  }

  return data[0]
}

export {
  ping,
  createSession,
  testSession,
  getHirezServerStatus,
  getDataUsed,
  getDemoDetails,
  getEsportsProLeagueDetails,
  getFriends,
  getPlayer
}
