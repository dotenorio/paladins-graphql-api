import axios from "axios";
import buildUrl from "../lib/build_url";

const getChampionRanks = async (parent, { sessionId = null, player }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getchampionranks',
    sessionId,
    player,
    xSessionId
  }))

  return data
}

export default getChampionRanks