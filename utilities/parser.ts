export const HYPHEN_CHARACTER = '-';

const titleURLParser = (title: string) => (
  title
    .replaceAll(/[\s{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g, HYPHEN_CHARACTER)
    .replaceAll(/-+/g, HYPHEN_CHARACTER)
    .replaceAll(/^-|-$/g, '')
);

export default titleURLParser;
