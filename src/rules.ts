import { Token, TokenType } from "./token";
import { header } from "./block_rules/headers";
import { horizontalRule } from "./block_rules/horizontal_rule";
import { unorderedList } from "./block_rules/unordered_list";

export interface BlockRule {
  exec: (input: string, tokens: Array<Token>) => Token
}

export const blockRules: Array<BlockRule> = [
  header,
  horizontalRule,
  unorderedList,
]