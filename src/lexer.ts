import { blockRules } from "./rules";
import { Block, paragraph, Token, BlockType } from "./token";

export function lex(input: string): Array<Token> {
  const lexer = new Lexer(input)
  const blocks = lexer.lexBlocks()

  return blocks
}

export class Lexer {
  private input: string
  private lines: string[]
  private index: number

  constructor(input: string) {
    this.input = input
    this.lines = this.input.split('\n')
    this.index = 0
  }

  lex(): Array<Block> {
    const blocks = this.lexBlocks()
    this.lexInline(blocks)
    return blocks
  }

  lexInline(blocks: Array<Block>) {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i]
    }
  }

  lexBlocks(): Array<Block> {
    const tokens: Array<Block> = []

    let startParagraph = false
    while (!this.atEnd()) {
      const line = this.advanceLine()
      const hardbreak = line.trim() === ''

      // stop at the first successful rule
      const ruleFound = blockRules.some(rule => {
        const token = rule.exec(line, tokens, this)
        if (token) {
          tokens.push(token)
          return true
        }

        return false
      })

      if (!ruleFound && !hardbreak) {
        // start a new paragraph if the last line was a hardbreak
        if (startParagraph) {
          tokens.push(this.newParagraph(line))
        } else {
          // start a new paragraph or continue the last one
          const token = tokens.pop()
          if (token) {
            tokens.push(token)
            if (token.type === BlockType.Paragraph) {
              // TODO may want to remove this \n
              // and just use a space
              token.content += `\n${line}`
            } else {
              tokens.push(this.newParagraph(line))
            }
          } else { // start new paragraph
            tokens.push(this.newParagraph(line))
          }
        }
      }

      startParagraph = hardbreak
    }

    return tokens
  }

  private newParagraph(content: string): Block {
    return paragraph({ content })
  }

  atEnd(): boolean {
    return this.index >= this.lines.length
  }

  advanceLine(): string {
    return this.lines[this.index++]
  }
}