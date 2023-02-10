import { BlockRule } from "../rules";
import { horizontalLine, Block } from "../token";

export const horizontalLineRule: BlockRule = {
  exec: (line): Block | null => {
    if (/^\s*---\s*$/.exec(line)) {
      return horizontalLine()
    }

    return null
  }
}