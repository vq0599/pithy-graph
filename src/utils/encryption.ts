const range = 'z!yxw$vuts*rqpo%nmlkj@ihgf^edcb~a'

export const encode = (code: number) => {
  return String(code).split('').map((v, i) => {
    const suffix = i % 2 ? i + 1 : (i * 1.5)
    const index = (+v + 1) * 2 + suffix
    return range.at(index)
  }).join('')
}

export const decode = (str: string) => {
  return Number(str.split('').map((v, i) => {
    const index = range.indexOf(v)
    const suffix = i % 2 ? i + 1 : (i * 1.5)
    return (index - suffix) / 2 - 1
  }).join(''))
}
