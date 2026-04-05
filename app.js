const heatmap = document.getElementById("heatmap");
const feed = document.getElementById("feed");
const metrics = document.getElementById("metrics");

const cells = [
  { label: "Conviction", value: 91, tone: "var(--good)" },
  { label: "Fear", value: 23, tone: "var(--warn)" },
  { label: "Chase", value: 84, tone: "var(--hot)" },
  { label: "Absorb", value: 68, tone: "var(--good)" },
  { label: "Exit", value: 36, tone: "var(--warn)" },
  { label: "Panic", value: 18, tone: "var(--hot)" },
  { label: "Rotate", value: 57, tone: "#7cd4ff" },
  { label: "Stack", value: 79, tone: "var(--good)" },
  { label: "Fade", value: 42, tone: "var(--warn)" },
  { label: "Sweep", value: 88, tone: "var(--hot)" },
  { label: "Rebuy", value: 64, tone: "#7cd4ff" },
  { label: "Snipe", value: 95, tone: "var(--good)" },
];

const tape = [
  ["0x9f4a", "Bought 18.2M $REEF after 3 red candles", "copy-trade: hot"],
  ["0xa813", "Whale trimmed 11% into strength", "fear spike"],
  ["0x71cc", "Fresh multi-wallet accumulation detected", "confidence up"],
  ["0x20be", "Liquidity sweep absorbed in 6 min", "buyers defending"],
];

const state = [
  ["Net flow", "+$8.7M", "Whales still bidding"],
  ["Risk appetite", "High", "Picks up when leverage cools"],
  ["Copy ratio", "3.4x", "Retail follows the big wallets"],
];

const intensity = (n) => `color-mix(in srgb, ${n} 78%, #0a1016)`;

heatmap.innerHTML = cells
  .map(
    (cell) => `
      <div class="cell" style="background:${intensity(cell.tone)}">
        <strong>${cell.value}</strong>
        <span>${cell.label}</span>
      </div>
    `
  )
  .join("");

feed.innerHTML = tape
  .map(
    ([wallet, note, tag]) => `
      <article class="feed-item">
        <div class="topline">
          <strong>${wallet}</strong>
          <span>${tag}</span>
        </div>
        <div>${note}</div>
      </article>
    `
  )
  .join("");

metrics.innerHTML = state
  .map(
    ([label, value, note]) => `
      <article class="metric">
        <div class="topline">
          <strong>${label}</strong>
          <span>${note}</span>
        </div>
        <div class="value">${value}</div>
      </article>
    `
  )
  .join("");
