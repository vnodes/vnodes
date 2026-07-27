export function brandEmail(email: string, brand: string) {
  return email.replace('@', `+${brand}@`);
}
