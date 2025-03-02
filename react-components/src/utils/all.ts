
export function cloneDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cloneDeep);
  }
  if (typeof obj === 'object') {
    const clone = { ...obj };
    for (const key in clone) {
      clone[key] = cloneDeep(clone[key]);
    }
    return clone;
  }
  return obj;
}
