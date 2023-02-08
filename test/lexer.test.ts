import { lex } from "../src/lexer"
import { Token, TokenType } from "../src/token"

test('header 1', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h1',
  }]

  expect(lex('# Hello')).toStrictEqual(expected)
})

test('header 2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello',
    children: null,
    tag: 'h2',
  }]

  expect(lex('## Hello')).toStrictEqual(expected)
})

test('header 3', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h3',
  }]

  expect(lex('### Hello there mate ##')).toStrictEqual(expected)
})

test('header 4', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'Hello there mate ##',
    children: null,
    tag: 'h4',
  }]

  expect(lex('#### Hello there mate ##')).toStrictEqual(expected)
})

test('header 5', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo',
    children: null,
    tag: 'h5',
  }]

  expect(lex('#####             yo')).toStrictEqual(expected)
})

test('header 6', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'yo   ',
    children: null,
    tag: 'h6',
  }]

  expect(lex('######          yo   ')).toStrictEqual(expected)
})

test('not a header', () => {
  const expected: Array<Token> = [{
    type: TokenType.Paragraph,
    block: true,
    content: '####hi',
    children: null,
    tag: 'p',
  }]

  expect(lex('####hi')).toStrictEqual(expected)
})


test('multiple headers', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'header 1',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'header 2',
    children: null,
    tag: 'h2',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'header 3',
    children: null,
    tag: 'h3',
  }]

  expect(lex('# header 1\n##    header 2\n### header 3')).toStrictEqual(expected)
})

test('hr', () => {
  const expected: Array<Token> = [{
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }]

  expect(lex('---')).toStrictEqual(expected)
})

test('header 1 and hr', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'hi',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }]

  expect(lex('# hi\n---')).toStrictEqual(expected)
})

test('header 1 and hr and header 2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'hi',
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.HorizontalRule,
    block: true,
    content: null,
    children: null,
    tag: 'hr',
  }, {
    type: TokenType.Header,
    block: true,
    content: 'nice',
    children: null,
    tag: 'h2',
  }]

  expect(lex('# hi\n---\n## nice')).toStrictEqual(expected)
})

test('ul', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello')).toStrictEqual(expected)
})

test('ul2', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello\n* hello *again*')).toStrictEqual(expected)
})

test('ul4', () => {
  const expected: Array<Token> = [{
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: 'hello',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      content: 'yoooo',
      children: null,
      tag: 'li'
    }, {
      type: TokenType.ListItem,
      block: true,
      content: 'what   up',
      children: null,
      tag: 'li'
    }],
    tag: 'ul',
  }]

  expect(lex('* hello\n* hello *again*\n*     yoooo\n* what   up')).toStrictEqual(expected)
})

test('not a ul', () => {
  const expected: Array<Token> = [{
    type: TokenType.Paragraph,
    block: true,
    content: '*hello',
    children: null,
    tag: 'p',
  }]
  expect(lex('*hello')).toStrictEqual(expected)
})

test('single-line blockquote', () => {
  const expected: Array<Token> = [{
    type: TokenType.Blockquote,
    block: true,
    content: 'hello',
    children: null,
    tag: 'blockquote',
  }]

  expect(lex('> hello')).toStrictEqual(expected)
})

test('multi-line blockquote', () => {
  const expected: Array<Token> = [{
    type: TokenType.Blockquote,
    block: true,
    content: 'hello\nthere\nwhat up?',
    children: null,
    tag: 'blockquote',
  }]

  expect(lex('> hello\n> there\n> what up?')).toStrictEqual(expected)
})

test('nested blockquote', () => {
  const expected: Array<Token> = [{
    type: TokenType.Blockquote,
    block: true,
    content: 'hello',
    children: null,
    tag: 'blockquote',
  }]

  expect(lex('> hello')).toStrictEqual(expected)

})

test('header than blockquote', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: 'header 5',
    children: null,
    tag: 'h5',
  }, {
    type: TokenType.Blockquote,
    block: true,
    content: 'hello',
    children: null,
    tag: 'blockquote',
  }]
  expect(lex('##### header 5\n> hello')).toStrictEqual(expected)
})

test('codeblock', () => {
  const expected: Array<Token> = [{
    type: TokenType.Codeblock,
    block: true,
    content: 'console.log(\'hello\')',
    children: null,
    tag: 'code',
  }]
  expect(lex("```\nconsole.log('hello')\n```")).toStrictEqual(expected)
})

test('empty codeblock', () => {
  const expected: Array<Token> = [{
    type: TokenType.Codeblock,
    block: true,
    content: '',
    children: null,
    tag: 'code',
  }]
  expect(lex("```\n```")).toStrictEqual(expected)
})

test('codeblock2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Paragraph,
    block: true,
    content: "```console.log('two lines');\nx += 6;",
    children: null,
    tag: 'p',
  }, {
    type: TokenType.Codeblock,
    block: true,
    content: "",
    children: null,
    tag: 'code',
  }]
  // the three backticks aren't on their own line,
  // so they are not parsed as the beginning of a codeblock
  // hence the next line `x += 6` is not a part of that codeblock
  // so the final ``` is the beginning of a codeblock that has nothing in it
  expect(lex("```console.log('two lines');\nx += 6;\n```")).toStrictEqual(expected)
})

test('blockquote, codeblock, header', () => {
  const expected: Array<Token> = [{
    type: TokenType.Blockquote,
    block: true,
    content: "this is a quote",
    children: null,
    tag: 'blockquote',
  }, {
    type: TokenType.Codeblock,
    block: true,
    content: "const x = square(4);",
    children: null,
    tag: 'code',
  }, {
    type: TokenType.Header,
    block: true,
    content: "header!",
    children: null,
    tag: 'h1',
  }]
  expect(lex("> this is a quote\n```\nconst x = square(4);\n```\n# header!"))
    .toStrictEqual(expected)
})

test('paragraph', () => {
  const expected: Array<Token> = [{
    type: TokenType.Paragraph,
    block: true,
    content: "first par",
    children: null,
    tag: 'p',
  }]
  expect(lex("first par")).toStrictEqual(expected)
})

test('paragraph2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Paragraph,
    block: true,
    content: "first line\nsecond line\nthird line",
    children: null,
    tag: 'p',
  }]
  expect(lex(`first line
second line
third line`)).toStrictEqual(expected)
})

test('lots of stuff', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: "Introduction",
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
    children: null,
    tag: 'p',
  }, {
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: "first item",
      children: null,
      tag: 'li',
    }, {
      type: TokenType.ListItem,
      block: true,
      content: "second item",
      children: null,
      tag: 'li',
    }],
    tag: 'ul',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    Paragraph again",
    children: null,
    tag: 'p',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    A different paragraph",
    children: null,
    tag: 'p',
  }]
  expect(lex(`# Introduction
    Indent! Dinosaurs have traditionally been considered a separate group from birds, which
evolved from dinosaurs...
* first item
* second item
    Paragraph again
    
    A different paragraph`)).toStrictEqual(expected)
})

test('lots of stuff2', () => {
  const expected: Array<Token> = [{
    type: TokenType.Header,
    block: true,
    content: "Introduction",
    children: null,
    tag: 'h1',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
    children: null,
    tag: 'p',
  }, {
    type: TokenType.UnorderedList,
    block: true,
    content: null,
    children: [{
      type: TokenType.ListItem,
      block: true,
      content: "first item",
      children: null,
      tag: 'li',
    }, {
      type: TokenType.ListItem,
      block: true,
      content: "second item",
      children: null,
      tag: 'li',
    }],
    tag: 'ul',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    Paragraph again",
    children: null,
    tag: 'p',
  }, {
    type: TokenType.Paragraph,
    block: true,
    content: "    A different paragraph",
    children: null,
    tag: 'p',
  }]
  // same thing as above except a hardbreak after the header
  expect(lex(`# Introduction

    Indent! Dinosaurs have traditionally been considered a separate group from birds, which
evolved from dinosaurs...
* first item
* second item
    Paragraph again
    
    A different paragraph`)).toStrictEqual(expected)
})