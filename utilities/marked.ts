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

export const getImagePath = (text: string) => {
  const paragraph = marked.lexer(text).find(getImageToken);
  if (!paragraph) return undefined;

  const image = getImageToken(paragraph);

  return image && image.type === 'image' ? image.href : undefined;
};

const getImageToken = (token: marked.Token) => {
  if (token.type !== 'paragraph') return false;

  return token.tokens.find(({ type }) => type === 'image');
};
