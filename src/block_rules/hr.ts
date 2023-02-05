import { BlockRule } from "../rules";
import { blankToken, Token, TokenType } from "../token";

export const hr: BlockRule = {
  exec: (input: string): Token<TokenType.Hr> | null => {
    if (/^\s*---\s*$/.exec(input)) {
      const token = blankToken<TokenType.Hr>(TokenType.Hr)
      token.tag = 'hr'
      token.block = true
      return token
    }

    return null
  }
}