import { Token } from "./token";
import { header } from "./block_rules/headers";
import { horizontalRule } from "./block_rules/horizontal_rule";
import { unorderedList } from "./block_rules/unordered_list";
import { blockquote } from "./block_rules/blockquote";
import { Lexer } from "./lexer";
import { codeblock } from "./block_rules/code_block";

export interface BlockRule {
  exec: (
    line: string,
    tokens: Array<Token>,
    lexer: Lexer,
  ) => Token
}

export const blockRules: Array<BlockRule> = [
  blockquote,
  codeblock,
  header,
  horizontalRule,
  unorderedList,
]