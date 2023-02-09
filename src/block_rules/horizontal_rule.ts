import { BlockRule } from "../rules";
import { blockToken, Token, TokenType } from "../token";

export const horizontalRule: BlockRule = {
  exec: (line): Token | null => {
    if (/^\s*---\s*$/.exec(line)) {
      return blockToken({
        type: TokenType.HorizontalRule,
        tag: 'hr',
      })
    }

    return null
  }
}