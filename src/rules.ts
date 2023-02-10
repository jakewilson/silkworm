import { Token } from "./token";
import { Lexer } from "./lexer";

import { blockquote } from "./block_rules/blockquote";
import { codeblock } from "./block_rules/code_block";
import { header } from "./block_rules/headers";
import { horizontalRule } from "./block_rules/horizontal_rule";
import { image } from "./block_rules/image";
import { unorderedList } from "./block_rules/unordered_list";

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
  image,
  unorderedList,
]