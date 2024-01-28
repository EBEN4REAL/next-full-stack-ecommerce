export function prettyDate(dateStr: string) {
  return (new Date(dateStr)).toLocaleString('sv-SE');
}