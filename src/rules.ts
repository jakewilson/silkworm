import { Token } from "./token";
import { header } from "./block_rules/headers";
import { horizontalRule } from "./block_rules/horizontal_rule";
import { unorderedList } from "./block_rules/unordered_list";
import { blockquote } from "./block_rules/blockquote";

export interface BlockRule {
  exec: (input: string, tokens: Array<Token>) => Token
}

export const blockRules: Array<BlockRule> = [
  blockquote,
  header,
  horizontalRule,
  unorderedList,
]