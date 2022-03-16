export const HYPHEN_CHARACTER = '-';

const titleURLParser = (title: string) => (
  title
    .replace(/[\s{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g, HYPHEN_CHARACTER)
    .replace(/-+/g, HYPHEN_CHARACTER)
    .replace(/^-|-$/g, '')
);

export default titleURLParser;
