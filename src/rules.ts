import { Block, Token } from "./token";
import { Lexer } from "./lexer";

import { blockquoteRule } from "./block_rules/blockquote";
import { codeblockRule } from "./block_rules/code_block";
import { headerRule } from "./block_rules/headers";
import { horizontalLineRule } from "./block_rules/horizontal_line";
import { imageRule } from "./block_rules/image";
import { orderedListRule } from "./block_rules/ordered_list";
import { unorderedListRule } from "./block_rules/unordered_list";

export interface BlockRule {
  exec: (
    line: string,
    tokens: Array<Block>,
    lexer: Lexer,
  ) => Block
}

export interface InlineRule {
  exec: (
    line: string,
    tokens: Array<Token>,
    lexer: Lexer,
  ) => Token
}

export const blockRules: Array<BlockRule> = [
  blockquoteRule,
  codeblockRule,
  headerRule,
  horizontalLineRule,
  imageRule,
  orderedListRule,
  unorderedListRule,
]