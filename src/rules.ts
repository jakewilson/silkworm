import { Token, TokenType } from "./token";
import { header } from "./block_rules/headers";
import { hr } from "./block_rules/hr";

export interface BlockRule {
  exec: (input: string) => Token<TokenType>
}

export const blockRules: Array<BlockRule> = [
  header,
  hr,
]