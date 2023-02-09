import { BlockRule } from "../rules";
import { blankToken, blockToken, Token, TokenType } from "../token";

export const unorderedList: BlockRule = {
  exec: (line, tokens): Token | null => {
    const matches = /^(\s*)\*\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 3) {
      return null
    }

    const item = blockToken({
      type: TokenType.ListItem,
      content: matches[2],
      tag: 'li',
    })

    let token = tokens.pop()
    // if the last token isn't a ul, create the ul before adding
    // the li
   if (!token || token.type !== TokenType.UnorderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = blockToken({
        type: TokenType.UnorderedList,
        tag: 'ul',
        children: [],
      })
    }

    token.children.push(item)
    return token
  }
}