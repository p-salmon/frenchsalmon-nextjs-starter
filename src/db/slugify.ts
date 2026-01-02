/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars except hyphens
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim hyphens from start
    .replace(/-+$/, ""); // Trim hyphens from end
  return `${slug}-${Math.random().toString(36).substring(2, 15)}`;
}
