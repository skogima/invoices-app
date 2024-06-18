export function generateUUID() {
  return window.crypto.randomUUID();
}

export function generateHexId() {
  return Math.random().toString(32).substring(2, 8).toUpperCase();
}
