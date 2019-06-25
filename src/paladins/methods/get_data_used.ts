import axios from "axios";
import buildUrl from "../lib/build_url";

const getDataUsed = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getdataused',
    sessionId,
    xSessionId
  }))

  return data[0]
}

export default getDataUsed