export enum TokenType {
  Header,
  Header1,
  Text,
}

export type Token<T extends TokenType> = {
  type: T
  block: boolean
  children: Array<Token<TokenType>> | null
  content: string | null
  tag: string
}

export function blankToken<T extends TokenType>(t: T): Token<T> {
  return {
    block: false,
    type: t,
    content: null,
    children: null,
    tag: null,
  }
}