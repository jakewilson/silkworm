import { lex } from "../src/lexer"
import { blockquoteToken, codeblockToken, headerToken, horizontalRuleToken, imageToken, listItemToken, paragraphToken, Token, unorderedListToken } from "../src/token"

test('header 1', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Hello',
    tag: 'h1',
  })]

  expect(lex('# Hello')).toStrictEqual(expected)
})

test('header 2', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Hello',
    tag: 'h2',
  })]

  expect(lex('## Hello')).toStrictEqual(expected)
})

test('header 3', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Hello there mate ##',
    tag: 'h3',
  })]
  expect(lex('### Hello there mate ##')).toStrictEqual(expected)
})

test('header 4', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Hello there mate ##',
    tag: 'h4',
  })]

  expect(lex('#### Hello there mate ##')).toStrictEqual(expected)
})

test('header 5', () => {
  const expected: Array<Token> = [headerToken({
    content: 'yo',
    tag: 'h5',
  })]
  expect(lex('#####             yo')).toStrictEqual(expected)
})

test('header 6', () => {
  const expected: Array<Token> = [headerToken({
    content: 'yo   ',
    tag: 'h6',
  })]
  expect(lex('######          yo   ')).toStrictEqual(expected)
})

test('not a header', () => {
  const expected: Array<Token> = [paragraphToken({
    content: '####hi',
  })]
  expect(lex('####hi')).toStrictEqual(expected)
})


test('multiple headers', () => {
  const expected: Array<Token> = [headerToken({
    content: 'header 1',
    tag: 'h1',
  }), headerToken({
    content: 'header 2',
    tag: 'h2',
  }), headerToken({
    content: 'header 3',
    tag: 'h3',
  })]
  expect(lex('# header 1\n##    header 2\n### header 3')).toStrictEqual(expected)
})

test('hr', () => {
  const expected: Array<Token> = [horizontalRuleToken()]
  expect(lex('---')).toStrictEqual(expected)
})

test('header 1 and hr', () => {
  const expected: Array<Token> = [headerToken({
    content: 'hi',
    tag: 'h1',
  }),
  horizontalRuleToken()
]
  expect(lex('# hi\n---')).toStrictEqual(expected)
})

test('header 1 and hr and header 2', () => {
  const expected: Array<Token> = [headerToken({
    content: 'hi',
    tag: 'h1',
  }),
  horizontalRuleToken(),
  headerToken({
    content: 'nice',
    tag: 'h2',
  })]
  expect(lex('# hi\n---\n## nice')).toStrictEqual(expected)
})

test('ul', () => {
  const expected: Array<Token> = [unorderedListToken({
    children: [listItemToken({
      content: 'hello',
    })],
  })]

  expect(lex('* hello')).toStrictEqual(expected)
})

test('ul2', () => {
  const expected: Array<Token> = [unorderedListToken({
    children: [listItemToken({
      content: 'hello',
    }), listItemToken({
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
    })],
  })]

  expect(lex('* hello\n* hello *again*')).toStrictEqual(expected)
})

test('ul4', () => {
  const expected: Array<Token> = [unorderedListToken({
    children: [listItemToken({
      content: 'hello',
    }), listItemToken({
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
    }), listItemToken({
      content: 'yoooo',
    }), listItemToken({
      content: 'what   up',
    })],
  })]

  expect(lex('* hello\n* hello *again*\n*     yoooo\n* what   up')).toStrictEqual(expected)
})

test('not a ul', () => {
  const expected: Array<Token> = [paragraphToken({
    content: '*hello',
  })]
  expect(lex('*hello')).toStrictEqual(expected)
})

test('single-line blockquote', () => {
  const expected: Array<Token> = [blockquoteToken({
    content: 'hello',
  })]

  expect(lex('> hello')).toStrictEqual(expected)
})

test('multi-line blockquote', () => {
  const expected: Array<Token> = [blockquoteToken({
    content: 'hello\nthere\nwhat up?',
  })]

  expect(lex('> hello\n> there\n> what up?')).toStrictEqual(expected)
})

test('nested blockquote', () => {
  const expected: Array<Token> = [blockquoteToken({
    content: 'hello',
  })]

  expect(lex('> hello')).toStrictEqual(expected)

})

test('header than blockquote', () => {
  const expected: Array<Token> = [headerToken({
    content: 'header 5',
    tag: 'h5',
  }), blockquoteToken({
    content: 'hello',
  })]
  expect(lex('##### header 5\n> hello')).toStrictEqual(expected)
})

test('codeblock', () => {
  const expected: Array<Token> = [codeblockToken({
    content: 'console.log(\'hello\')',
  })]
  expect(lex("```\nconsole.log('hello')\n```")).toStrictEqual(expected)
})

test('empty codeblock', () => {
  const expected: Array<Token> = [codeblockToken({
    content: '',
  })]
  expect(lex("```\n```")).toStrictEqual(expected)
})

test('codeblock2', () => {
  const expected: Array<Token> = [paragraphToken({
    content: "```console.log('two lines');\nx += 6;",
  }), codeblockToken({
    content: "",
  })]
  // the three backticks aren't on their own line,
  // so they are not parsed as the beginning of a codeblock
  // hence the next line `x += 6` is not a part of that codeblock
  // so the final ``` is the beginning of a codeblock that has nothing in it
  expect(lex("```console.log('two lines');\nx += 6;\n```")).toStrictEqual(expected)
})

test('blockquote, codeblock, header', () => {
  const expected: Array<Token> = [blockquoteToken({
    content: "this is a quote",
  }), codeblockToken({
    content: "const x = square(4);",
  }), headerToken({
    content: "header!",
    children: null,
    tag: 'h1',
  })]
  expect(lex("> this is a quote\n```\nconst x = square(4);\n```\n# header!"))
    .toStrictEqual(expected)
})

test('paragraph', () => {
  const expected: Array<Token> = [paragraphToken({
    content: "first par",
  })]
  expect(lex("first par")).toStrictEqual(expected)
})

test('paragraph2', () => {
  const expected: Array<Token> = [paragraphToken({
    content: "first line\nsecond line\nthird line",
  })]
  expect(lex(`first line
second line
third line`)).toStrictEqual(expected)
})

test('lots of stuff', () => {
  const expected: Array<Token> = [headerToken({
    content: "Introduction",
    children: null,
    tag: 'h1',
  }), paragraphToken({
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
  }), unorderedListToken({
    children: [listItemToken({
      content: "first item",
    }), listItemToken({
      content: "second item",
    })],
  }), paragraphToken({
    content: "    Paragraph again",
  }), paragraphToken({
    content: "    A different paragraph",
  })]
  expect(lex(`# Introduction
    Indent! Dinosaurs have traditionally been considered a separate group from birds, which
evolved from dinosaurs...
* first item
* second item
    Paragraph again
    
    A different paragraph`)).toStrictEqual(expected)
})

test('lots of stuff2', () => {
  const expected: Array<Token> = [headerToken({
    content: "Introduction",
    children: null,
    tag: 'h1',
  }), paragraphToken({
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
  }), unorderedListToken({
    children: [listItemToken({
      content: "first item",
    }), listItemToken({
      content: "second item",
    })],
  }), paragraphToken({
    content: "    Paragraph again",
  }), paragraphToken({
    content: "    A different paragraph",
  })]
  // same thing as above except a hardbreak after the header
  expect(lex(`# Introduction

    Indent! Dinosaurs have traditionally been considered a separate group from birds, which
evolved from dinosaurs...
* first item
* second item
    Paragraph again
    
    A different paragraph`)).toStrictEqual(expected)
})

test('image', () => {
  const expected: Array<Token> = [imageToken({
    attrs: {
      alt: 'Picture of a dog',
      url: 'https://www.example.com/dog',
    },
  })]
  expect(lex('![Picture of a dog](https://www.example.com/dog)')).toStrictEqual(expected)
})

test('image2', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Dogs Are Great',
    tag: 'h1',
  }), imageToken({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), unorderedListToken({
    children: [listItemToken({
      content: "they're cute"
    }), listItemToken({
      content: "they're fun"
    }), listItemToken({
      content: "they're loving"
    })],
  }), paragraphToken({
    content: 'I love dogs!',
  })]
  expect(lex(`# Dogs Are Great
![Cute doggo](example.com/cute)
* they're cute
* they're fun
* they're loving

I love dogs!
`)).toStrictEqual(expected)
})

test('image3', () => {
  const expected: Array<Token> = [headerToken({
    content: 'Dogs Are Great',
    tag: 'h1',
  }), imageToken({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), unorderedListToken({
    children: [
      listItemToken({ content: "they're cute" }),
      listItemToken({ content: "they're fun" }),
      listItemToken({ content: "they're loving" }),
    ],
  }), paragraphToken({
    content: 'I love dogs!',
  })]
  expect(lex(`# Dogs Are Great

![Cute doggo](example.com/cute)

* they're cute
* they're fun
* they're loving

I love dogs!
`)).toStrictEqual(expected)
})

test('image4', () => {
  const expected: Array<Token> = [paragraphToken({
    content: 'paragraph 1',
  }), imageToken({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), paragraphToken({
    content: 'paragraph 2\nstill paragraph 2',
  })]
  expect(lex(`paragraph 1
![Cute doggo](example.com/cute)
paragraph 2
still paragraph 2
`)).toStrictEqual(expected)
})