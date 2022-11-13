// index.d.ts
/// <reference types="node" />

// fs filepath: PathLike | number;
// type PathLike = string | Buffer | URL;
type Filepath = string | Buffer;

type Format = "hex" | "binary";

// blockhash ImageData
type Data = {
  width: number;
  height: number;
  data: Uint8Array | Uint8ClampedArray | number[];
};

declare module "imghash" {
  export function hash(
    filepath: Filepath,
    bits?: number,
    format?: Format
  ): Promise<string>;
  export function hashRaw(data: Data, bits: number): string;
  export function hexToBinary(s: string): string;
  export function binaryToHex(s: string): string;
}
