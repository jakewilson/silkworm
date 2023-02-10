import { BlockRule } from "../rules";
import { listItemToken, Token, TokenType, orderedListToken } from "../token";

export const orderedList: BlockRule = {
  exec: (line, tokens): Token | null => {
    const matches = /^(\s*)(\d+)\.\s+(.*)\s*$/.exec(line)
    if (!matches || matches.length < 4) {
      return null
    }

    const item = listItemToken({
      content: matches[3],
    })

    let token = tokens.pop()
    // if the last token isn't an ol, create the ol before adding
    // the li
   if (!token || token.type !== TokenType.OrderedList) {
      if (token) {
        // push back whatever we just popped
        tokens.push(token)
      }

      token = orderedListToken({
        children: [],
      })
    }

    token.children.push(item)
    return token
  }
}