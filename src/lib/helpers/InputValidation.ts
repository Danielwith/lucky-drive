/**
 * Devuelve true si la tecla pulsada es un dígito (0–9)
 * o una tecla de control/navegación (Backspace, Tab, flechas, Delete).
 */
export function isNumericOrControlKey(key: string): boolean {
  const controlKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
  return /\d/.test(key) || controlKeys.includes(key);
}
