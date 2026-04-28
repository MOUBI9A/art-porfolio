/**
 * Generates a URL-safe slug from a string.
 * e.g. "My Film Project 2024" → "my-film-project-2024"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Makes a slug unique by appending a timestamp if needed.
 */
export function makeUniqueSlug(slugBase: string): string {
  return `${slugBase}-${Date.now().toString(36)}`;
}
