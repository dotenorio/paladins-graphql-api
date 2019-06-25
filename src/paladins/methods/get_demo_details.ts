import axios from "axios";
import buildUrl from "../lib/build_url";
import queues from "../resources/queues";

const getDemoDetails = async (parent, { sessionId = null, matchId }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getdemodetails',
    sessionId,
    matchId,
    xSessionId
  }))

  if (data.length && data[0]) {
    data[0].Queue_Label = queues[data[0].Queue]
  }

  return data[0]
}

export default getDemoDetails