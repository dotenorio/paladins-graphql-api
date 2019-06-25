import axios from "axios";
import buildUrl from "../lib/build_url";

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

export default createSession