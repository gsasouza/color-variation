export const calculateColorVariation = (color, amt) => {
  let usePound = false

  if (color[0] === '#') {
    color = color.slice(1)
    usePound = true
  }

  const num = parseInt(color, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export const calculateFontColor = hex => {
  const formatHex = hex => (hex.charAt(0) === '#' ? hex.substring(1, 7) : hex)

  const hexToRed = hex => parseInt(formatHex(hex).substring(0, 2), 16)
  const hexToGreen = hex => parseInt(formatHex(hex).substring(2, 4), 16)
  const hexToBlue = hex => parseInt(formatHex(hex).substring(4, 6), 16)

  const threshold = 180 /* about half of 256. Lower threshold equals more dark text on dark background  */

  const red = hexToRed(hex)
  const green = hexToGreen(hex)
  const blue = hexToBlue(hex)

  const brightness = (red * 299 + green * 587 + blue * 114) / 1000

  return brightness > threshold ? '#000' : '#fff'
}
