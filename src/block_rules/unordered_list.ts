import { BlockRule } from "../rules";
import { blankToken, Token, TokenType } from "../token";

export const unorderedList: BlockRule = {
  exec: (line, tokens): Token | null => {
    const matches = /^(\s*)\*\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 3) {
      return null
    }

    const item = blankToken(TokenType.ListItem)
    item.content = matches[2]
    item.block = true
    item.tag = 'li'

    let token = tokens.pop()
    // if the last token isn't a ul, create the ul before adding
    // the li
   if (!token || token.type !== TokenType.UnorderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = blankToken(TokenType.UnorderedList)
      token.tag = 'ul'
      token.block = true
      token.children = []
    }

    token.children.push(item)
    return token
  }
}