export default function caesarCypher(message: string, shift: number): string {
  let result = "";
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (char === " ") {
      result += char;
    } else if (char.toUpperCase() === char) {
      const ch = String.fromCharCode(
        ((char.charCodeAt(0) + shift - 65) % 26) + 65
      );
      result += ch;
    } else {
      const ch = String.fromCharCode(
        ((char.charCodeAt(0) + shift - 97) % 26) + 97
      );
      result += ch;
    }
  }
  return result;
}
