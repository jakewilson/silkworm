import { lex } from "../src/lexer"
import {
  blockquoteToken as blockquote,
  codeblockToken as code,
  headerToken as h,
  horizontalRuleToken as hr,
  imageToken as img,
  listItemToken as li,
  orderedListToken as ol,
  paragraphToken as p,
  unorderedListToken as ul,
  Token,
} from "../src/token"

test('header 1', () => {
  const expected: Array<Token> = [h({
    content: 'Hello',
    tag: 'h1',
  })]

  expect(lex('# Hello')).toStrictEqual(expected)
})

test('header 2', () => {
  const expected: Array<Token> = [h({
    content: 'Hello',
    tag: 'h2',
  })]

  expect(lex('## Hello')).toStrictEqual(expected)
})

test('header 3', () => {
  const expected: Array<Token> = [h({
    content: 'Hello there mate ##',
    tag: 'h3',
  })]
  expect(lex('### Hello there mate ##')).toStrictEqual(expected)
})

test('header 4', () => {
  const expected: Array<Token> = [h({
    content: 'Hello there mate ##',
    tag: 'h4',
  })]

  expect(lex('#### Hello there mate ##')).toStrictEqual(expected)
})

test('header 5', () => {
  const expected: Array<Token> = [h({
    content: 'yo',
    tag: 'h5',
  })]
  expect(lex('#####             yo')).toStrictEqual(expected)
})

test('header 6', () => {
  const expected: Array<Token> = [h({
    content: 'yo   ',
    tag: 'h6',
  })]
  expect(lex('######          yo   ')).toStrictEqual(expected)
})

test('not a header', () => {
  const expected: Array<Token> = [p({
    content: '####hi',
  })]
  expect(lex('####hi')).toStrictEqual(expected)
})


test('multiple headers', () => {
  const expected: Array<Token> = [h({
    content: 'header 1',
    tag: 'h1',
  }), h({
    content: 'header 2',
    tag: 'h2',
  }), h({
    content: 'header 3',
    tag: 'h3',
  })]
  expect(lex('# header 1\n##    header 2\n### header 3')).toStrictEqual(expected)
})

test('hr', () => {
  const expected: Array<Token> = [hr()]
  expect(lex('---')).toStrictEqual(expected)
})

test('header 1 and hr', () => {
  const expected: Array<Token> = [h({
    content: 'hi',
    tag: 'h1',
  }),
  hr()
]
  expect(lex('# hi\n---')).toStrictEqual(expected)
})

test('header 1 and hr and header 2', () => {
  const expected: Array<Token> = [h({
    content: 'hi',
    tag: 'h1',
  }),
  hr(),
  h({
    content: 'nice',
    tag: 'h2',
  })]
  expect(lex('# hi\n---\n## nice')).toStrictEqual(expected)
})

test('ul', () => {
  const expected: Array<Token> = [ul({
    children: [li({
      content: 'hello',
    })],
  })]

  expect(lex('* hello')).toStrictEqual(expected)
})

test('ul2', () => {
  const expected: Array<Token> = [ul({
    children: [li({
      content: 'hello',
    }), li({
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
    })],
  })]

  expect(lex('* hello\n* hello *again*')).toStrictEqual(expected)
})

test('ul4', () => {
  const expected: Array<Token> = [ul({
    children: [li({
      content: 'hello',
    }), li({
      // TODO this should break later when I add emphasis
      content: 'hello *again*',
    }), li({
      content: 'yoooo',
    }), li({
      content: 'what   up',
    })],
  })]

  expect(lex('* hello\n* hello *again*\n*     yoooo\n* what   up')).toStrictEqual(expected)
})

test('not a ul', () => {
  const expected: Array<Token> = [p({
    content: '*hello',
  })]
  expect(lex('*hello')).toStrictEqual(expected)
})

test('single-line blockquote', () => {
  const expected: Array<Token> = [blockquote({
    content: 'hello',
  })]

  expect(lex('> hello')).toStrictEqual(expected)
})

test('multi-line blockquote', () => {
  const expected: Array<Token> = [blockquote({
    content: 'hello\nthere\nwhat up?',
  })]

  expect(lex('> hello\n> there\n> what up?')).toStrictEqual(expected)
})

test('nested blockquote', () => {
  const expected: Array<Token> = [blockquote({
    content: 'hello',
  })]

  expect(lex('> hello')).toStrictEqual(expected)

})

test('header than blockquote', () => {
  const expected: Array<Token> = [h({
    content: 'header 5',
    tag: 'h5',
  }), blockquote({
    content: 'hello',
  })]
  expect(lex('##### header 5\n> hello')).toStrictEqual(expected)
})

test('codeblock', () => {
  const expected: Array<Token> = [code({
    content: 'console.log(\'hello\')',
  })]
  expect(lex("```\nconsole.log('hello')\n```")).toStrictEqual(expected)
})

test('empty codeblock', () => {
  const expected: Array<Token> = [code({
    content: '',
  })]
  expect(lex("```\n```")).toStrictEqual(expected)
})

test('codeblock2', () => {
  const expected: Array<Token> = [p({
    content: "```console.log('two lines');\nx += 6;",
  }), code({
    content: "",
  })]
  // the three backticks aren't on their own line,
  // so they are not parsed as the beginning of a codeblock
  // hence the next line `x += 6` is not a part of that codeblock
  // so the final ``` is the beginning of a codeblock that has nothing in it
  expect(lex("```console.log('two lines');\nx += 6;\n```")).toStrictEqual(expected)
})

test('blockquote, codeblock, header', () => {
  const expected: Array<Token> = [blockquote({
    content: "this is a quote",
  }), code({
    content: "const x = square(4);",
  }), h({
    content: "header!",
    children: null,
    tag: 'h1',
  })]
  expect(lex("> this is a quote\n```\nconst x = square(4);\n```\n# header!"))
    .toStrictEqual(expected)
})

test('paragraph', () => {
  const expected: Array<Token> = [p({
    content: "first par",
  })]
  expect(lex("first par")).toStrictEqual(expected)
})

test('paragraph2', () => {
  const expected: Array<Token> = [p({
    content: "first line\nsecond line\nthird line",
  })]
  expect(lex(`first line
second line
third line`)).toStrictEqual(expected)
})

test('lots of stuff', () => {
  const expected: Array<Token> = [h({
    content: "Introduction",
    children: null,
    tag: 'h1',
  }), p({
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
  }), ul({
    children: [li({
      content: "first item",
    }), li({
      content: "second item",
    })],
  }), p({
    content: "    Paragraph again",
  }), p({
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
  const expected: Array<Token> = [h({
    content: "Introduction",
    children: null,
    tag: 'h1',
  }), p({
    content: "    Indent! Dinosaurs have traditionally been considered a separate group from birds, which\nevolved from dinosaurs...",
  }), ul({
    children: [li({
      content: "first item",
    }), li({
      content: "second item",
    })],
  }), p({
    content: "    Paragraph again",
  }), p({
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
  const expected: Array<Token> = [img({
    attrs: {
      alt: 'Picture of a dog',
      url: 'https://www.example.com/dog',
    },
  })]
  expect(lex('![Picture of a dog](https://www.example.com/dog)')).toStrictEqual(expected)
})

test('image2', () => {
  const expected: Array<Token> = [h({
    content: 'Dogs Are Great',
    tag: 'h1',
  }), img({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), ul({
    children: [li({
      content: "they're cute"
    }), li({
      content: "they're fun"
    }), li({
      content: "they're loving"
    })],
  }), p({
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
  const expected: Array<Token> = [h({
    content: 'Dogs Are Great',
    tag: 'h1',
  }), img({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), ul({
    children: [
      li({ content: "they're cute" }),
      li({ content: "they're fun" }),
      li({ content: "they're loving" }),
    ],
  }), p({
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
  const expected: Array<Token> = [p({
    content: 'paragraph 1',
  }), img({
    attrs: {
      alt: 'Cute doggo',
      url: 'example.com/cute',
    },
  }), p({
    content: 'paragraph 2\nstill paragraph 2',
  })]
  expect(lex(`paragraph 1
![Cute doggo](example.com/cute)
paragraph 2
still paragraph 2
`)).toStrictEqual(expected)
})

test('ol 1', () => {
  const expected: Array<Token> = [ol({
    children: [
      li({ content: "first" }),
      li({ content: "second" }),
      li({ content: "third" }),
    ]
  })]

  expect(lex('1. first\n2. second\n3. third')).toStrictEqual(expected)
})

test('ol ul', () => {
  const expected: Array<Token> = [ol({
    children: [
      li({ content: "first" }),
      li({ content: "second" }),
      li({ content: "third" }),
    ]
  }), ul({
    children: [
      li({ content: "fourth" }),
      li({ content: "fifth" }),
      li({ content: "sixth" }),
    ]
  })]

  expect(lex('1. first\n2. second\n3. third\n* fourth\n* fifth\n* sixth')).toStrictEqual(expected)
})

test('ol ul ol ul', () => {
  const expected: Array<Token> = [ol({
    children: [
      li({ content: "first" }),
    ]
  }), ul({
    children: [
      li({ content: "second" }),
    ]
  }), ol({
    children: [
      li({ content: "third" }),
    ]
  }), ul({
    children: [
      li({ content: "fourth" }),
    ]
  })]
  expect(lex('1. first\n* second\n2. third\n* fourth')).toStrictEqual(expected)
})

test('lots of blocks', () => {
  const expected: Array<Token> = [ol({
    children: [
      li({ content: "first" }),
      li({ content: "second" }),
    ]
  }),
    img({ attrs: { alt: 'hi', url: 'nice.com' } }),
    img({ attrs: { alt: 'another alt but longer', url: 'http://url.com' } }),
    p({ content: 'dinosaur' }),
    ul({
    children: [
      li({ content: "fourth" }),
      li({ content: "fifth" }),
    ]
  }),
  // TODO this should fail when bold is added
  p({ content: "so anyway I **started** blastin'" })
  ]
  // the value of the numbers don't matter in an ordered list
  // only that there is a digit there
  expect(lex(`1. first
22. second
![hi](nice.com)
![another alt but longer](http://url.com)

dinosaur

* fourth
* fifth

so anyway I **started** blastin'
`)).toStrictEqual(expected)
})