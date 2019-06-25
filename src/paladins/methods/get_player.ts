import axios from "axios";
import buildUrl from "../lib/build_url";
import tiers from "../resources/tiers";

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

export default getPlayer