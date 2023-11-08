function toIdDateString(): string {
  return new Date().toISOString().slice(0, 19).replace(/[:]/g, "");
}

export { toIdDateString };
