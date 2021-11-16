export function kebabCase(str: string): string {
  const reg = /([^-])([A-Z])/g

  return str.replace(reg, '$1-$2').replace(reg, '$1-$2').toLowerCase()
}
