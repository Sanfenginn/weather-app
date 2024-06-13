function useGetDescription(value, type) {
  const descriptions = {
    visibility: [
      { range: [0, 1], descriptionKey: "drive-carefully" },
      { range: [1, 5], descriptionKey: "caution-in-traffic" },
      { range: [5, 10], descriptionKey: "normal-visibility" },
      { range: [10, 20], descriptionKey: "good-visibility" },
      { range: [20, Infinity], descriptionKey: "excellent-visibility" },
    ],
    uv: [
      { range: [0, 2], descriptionKey: "no-protection-needed" },
      { range: [3, 5], descriptionKey: "hat-and-sunglasses" },
      { range: [6, 7], descriptionKey: "apply-sunscreen" },
      { range: [8, 10], descriptionKey: "avoid-prolonged-sun" },
      { range: [11, Infinity], descriptionKey: "avoid-going-out" },
    ],
    pressure: [
      { range: [-Infinity, 1000], descriptionKey: "possible-storm" },
      { range: [1000, 1015], descriptionKey: "stable-weather" },
      { range: [1015, 1030], descriptionKey: "clear-weather" },
      { range: [1030, Infinity], descriptionKey: "dry-and-cool" },
    ],
  };

  // Find the matching description or return 'unknown-type' if not found
  const descriptionEntry = descriptions[type]?.find(
    (desc) => value >= desc.range[0] && value <= desc.range[1]
  );

  const descriptionKey = descriptionEntry
    ? descriptionEntry.descriptionKey
    : "";

  return descriptionKey;
}

export default useGetDescription;
