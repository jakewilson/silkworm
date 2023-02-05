import { BlockRule } from "../rules";
import { blankToken, Token, TokenType } from "../token";

export const horizontalRule: BlockRule = {
  exec: (input: string): Token | null => {
    if (/^\s*---\s*$/.exec(input)) {
      const token = blankToken(TokenType.HorizontalRule)
      token.tag = 'hr'
      token.block = true
      return token
    }

    return null
  }
}