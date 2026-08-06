// Minimal ambient types for `qrcode` (the package ships no .d.ts and we don't
// want the extra @types dev-dependency). Only the surface we actually use.
declare module 'qrcode' {
  interface QRRenderOptions {
    type?: 'svg' | 'png' | 'utf8'
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
    margin?: number
    width?: number
    scale?: number
    color?: { dark?: string; light?: string }
  }
  export function toString(text: string, options?: QRRenderOptions): Promise<string>
  export function toBuffer(text: string, options?: QRRenderOptions): Promise<Buffer>
  export function toDataURL(text: string, options?: QRRenderOptions): Promise<string>
}
