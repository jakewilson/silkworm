import { BlockRule } from "../rules";
import { blankToken, Token, TokenType } from "../token";

export const horizontalRule: BlockRule = {
  exec: (line): Token | null => {
    if (/^\s*---\s*$/.exec(line)) {
      const token = blankToken(TokenType.HorizontalRule)
      token.tag = 'hr'
      token.block = true
      return token
    }

    return null
  }
}