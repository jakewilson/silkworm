import { blockRules } from "./rules";
import { Token } from "./token";

export function lex(input: string): Array<Token> {
  const lexer = new Lexer(input)
  return lexer.lexBlocks()
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

  lexBlocks(): Array<Token> {
    const tokens: Array<Token> = []

    while (!this.atEnd()) {
      const line = this.advanceLine()

      blockRules.some(rule => {
        const token = rule.exec(line, tokens, this)
        if (token) {
          tokens.push(token)
          return true
        }

        return false
      })
    }

    return tokens
  }

  atEnd(): boolean {
    return this.index >= this.lines.length
  }

  advanceLine(): string {
    return this.lines[this.index++]
  }
}