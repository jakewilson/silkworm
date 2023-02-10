import { BlockRule } from "../rules";
import { horizontalRuleToken, Token } from "../token";

export const horizontalRule: BlockRule = {
  exec: (line): Token | null => {
    if (/^\s*---\s*$/.exec(line)) {
      return horizontalRuleToken()
    }

    return null
  }
}