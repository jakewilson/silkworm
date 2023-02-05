import { Token, TokenType } from "./token";
import { header } from "./block_rules/headers";

export interface BlockRule {
  exec: (input: string) => Token<TokenType>
}

export const blockRules: Array<BlockRule> = [
  header,
]