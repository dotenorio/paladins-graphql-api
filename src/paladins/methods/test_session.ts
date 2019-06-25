import axios from "axios";
import buildUrl from "../lib/build_url";

const testSession = async (parent, { sessionId = null }, { xSessionId = null }) => {
  const { data } = await axios.get(buildUrl({
    method: 'testsession',
    sessionId,
    xSessionId
  }))

  return data
}

export default testSession