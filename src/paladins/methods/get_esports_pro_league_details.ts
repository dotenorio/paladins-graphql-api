import axios from "axios";
import buildUrl from "../lib/build_url";

const getEsportsProLeagueDetails = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getesportsproleaguedetails',
    sessionId,
    xSessionId
  }))

  return data
}

export default getEsportsProLeagueDetails