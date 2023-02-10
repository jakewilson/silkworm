import { BlockRule } from "../rules"
import { Block, codeblock } from "../token"

export const codeblockRule: BlockRule = {
  exec: (line, _, lexer): Block | null => {
    const codeblockRE = /^\s*```\s*$/

    let matches = codeblockRE.exec(line)
    if (!matches) {
      return null
    }

    let content = ''
    // keep going until we find the closing block
    while (!lexer.atEnd()) {
      line = lexer.advanceLine()
      if (codeblockRE.exec(line)) {
        break
      } else {
        content += line + '\n'
      }
    }

    // if we reached the end of the file without
    // seeing the end of the code block, we treat
    // it as a code block anyway

    // remove trailing \n
    content = content.trimEnd()

    return codeblock({
      content,
    })
  },
}