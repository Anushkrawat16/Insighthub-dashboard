export const cn = (...classes) =>
  classes
    .flatMap((cls) => {
      if (!cls) return [];
      if (typeof cls === "string") return cls;
      return Object.entries(cls);
    })
    .map((entry) => {
      if (typeof entry === "string") return entry;
      const [key, value] = entry;
      return value ? key : "";
    })
    .filter(Boolean)
    .join(" ");

