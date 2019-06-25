import axios from "axios";
import buildUrl from "../lib/build_url";

const getChampions = async (parent, { sessionId = null, language = 1 }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getchampions',
    sessionId,
    language,
    xSessionId
  }))

  return data
}

export default getChampions