import QRCode from 'qrcode'

// Brand navy, matching the original hand-generated poster QR.
const DARK = '#0b1f3a'
const LIGHT = '#ffffff'

/**
 * QR as an inline SVG string — server-rendered, so posters need no extra
 * request and work offline once the page is loaded.
 *
 * Error correction 'M' keeps the code scannable from a projector or a
 * slightly creased printout without inflating the module count.
 */
export function qrSvg(text: string, width = 320): Promise<string> {
  return QRCode.toString(text, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    width,
    color: { dark: DARK, light: LIGHT },
  })
}

/** QR as a PNG buffer — for downloading and dropping into slides. */
export function qrPng(text: string, width = 1024): Promise<Buffer> {
  return QRCode.toBuffer(text, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 2,
    width,
    color: { dark: DARK, light: LIGHT },
  })
}
