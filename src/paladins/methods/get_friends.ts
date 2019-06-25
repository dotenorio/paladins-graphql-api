import axios from "axios";
import buildUrl from "../lib/build_url";

const getFriends = async (parent, { sessionId = null, player }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'getfriends',
    sessionId,
    player,
    xSessionId
  }))

  return data
}

export default getFriends