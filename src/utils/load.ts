import {Result, staticUrl} from '@innexgo/frontend-common';

export const LoadErrorCodes = [
  "NETWORK",
] as const;

// Creates a union type
export type LoadErrorCode = typeof LoadErrorCodes[number];


// this function may throw
export async function fetchText(url:string): Promise<string> {
  let data = await fetch(`${staticUrl()}/${url}`);
  return await data.text()
}

async function fetchTextOrNetworkError(url: string): Promise<Result<string, LoadErrorCode>> {
  try {
    return { Ok: await fetchText(url) };
  } catch (_) {
    return { Err: "NETWORK" };
  }
}
