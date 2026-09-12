type FormatCountOptions = {
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
};

export const formatCount = (
  totalSeconds: number,
  options: FormatCountOptions = {},
) => {
  const { hours = true, minutes = true, seconds = true } = options;

  const safeSeconds = Math.max(0, Math.floor(totalSeconds));

  const h = Math.floor(safeSeconds / 3600);
  const m = Math.floor((safeSeconds % 3600) / 60);
  const s = safeSeconds % 60;

  const parts: string[] = [];

  if (hours) {
    parts.push(String(h).padStart(2, "0"));
  }

  if (minutes) {
    parts.push(String(m).padStart(2, "0"));
  }

  if (seconds) {
    parts.push(String(s).padStart(2, "0"));
  }

  return parts.join(":");
};
