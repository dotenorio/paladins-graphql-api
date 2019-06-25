import axios from "axios";
import buildUrl from "../lib/build_url";

const getHirezServerStatus = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'gethirezserverstatus',
    sessionId,
    xSessionId
  }))

  return data
}

export default getHirezServerStatus