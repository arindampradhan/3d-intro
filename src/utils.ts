// add typescript support

export function timeout(delay: number): Promise<void> {
  return new Promise( res => setTimeout(res, delay) );
}
