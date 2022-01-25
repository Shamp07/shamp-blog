import { marked } from 'marked';

const htmlEscapeToText = (text: string) => text.replace(/&#[0-9]*;|&amp;/g, (escapeCode) => {
  if (escapeCode.match(/amp/)) return '&';
  return String.fromCharCode(Number(escapeCode.match(/[0-9]+/)));
});

const SPACING_CHARACTER = ' ';

export const renderPlain = () => {
  const render = new marked.Renderer();

  render.paragraph = (text) => `${htmlEscapeToText(text)}\r\n`;

  render.heading = (text) => `${text}${SPACING_CHARACTER}`;
  render.strong = (text) => text;
  render.em = (text) => text;
  render.del = (text) => text;

  render.hr = () => '';
  render.blockquote = (text) => text;

  render.list = (text) => text;
  render.listitem = (text) => text;
  render.checkbox = () => '';

  render.table = () => '';
  render.tablerow = () => '';
  render.tablecell = () => '';
  render.image = () => '';
  render.link = (href, title, text) => text;

  render.codespan = (text) => text;
  render.code = () => '';

  return render;
};

// TODO: 수많은 토큰 중에 image 토큰을 수월하게 찾아내는 방법이 있다면 개선대상에 포함됩니다. 타입가드의 정리가 필요해보입니다.
export const getImagePath = (text: string) => {
  const paragraph = marked.lexer(text).find((token) => {
    if (token.type !== 'paragraph') return false;

    return token.tokens.findIndex((innerToken) => innerToken.type === 'image') > -1;
  });

  if (paragraph?.type !== 'paragraph') return undefined;

  const idx = paragraph.tokens.findIndex((token) => token.type === 'image');
  const image = paragraph.tokens[idx];

  if (image.type !== 'image') return undefined;

  return image.href;
};
