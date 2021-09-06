export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function clamp(v:number, min:number, max:number) {
    return Math.max(Math.min(v, max), min)
}
