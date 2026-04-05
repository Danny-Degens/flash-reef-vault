// DOM Elements
const heatmap = document.getElementById("heatmap");
const feed = document.getElementById("feed");
const metrics = document.getElementById("metrics");
const patternList = document.getElementById("pattern-list");
const toggleHeatmapBtn = document.getElementById("toggle-heatmap");
const refreshDataBtn = document.getElementById("refresh-data");
const heatmapFilter = document.getElementById("heatmap-filter");
const tapeFilter = document.getElementById("tape-filter");
const heatmapCount = document.getElementById("heatmap-count");
const tapeCount = document.getElementById("tape-count");

// Sample data for whale signals
const whaleSignals = [
  { id: 1, label: "Conviction", value: 91, tone: "var(--good)", type: "confidence", timestamp: "2 min ago" },
  { id: 2, label: "Fear", value: 23, tone: "var(--warn)", type: "fear", timestamp: "5 min ago" },
  { id: 3, label: "Chase", value: 84, tone: "var(--hot)", type: "copy", timestamp: "8 min ago" },
  { id: 4, label: "Absorb", value: 68, tone: "var(--good)", type: "confidence", timestamp: "12 min ago" },
  { id: 5, label: "Exit", value: 36, tone: "var(--warn)", type: "fear", timestamp: "15 min ago" },
  { id: 6, label: "Panic", value: 18, tone: "var(--hot)", type: "fear", timestamp: "18 min ago" },
  { id: 7, label: "Rotate", value: 57, tone: "#7cd4ff", type: "copy", timestamp: "22 min ago" },
  { id: 8, label: "Stack", value: 79, tone: "var(--good)", type: "confidence", timestamp: "25 min ago" },
  { id: 9, label: "Fade", value: 42, tone: "var(--warn)", type: "fear", timestamp: "30 min ago" },
  { id: 10, label: "Sweep", value: 88, tone: "var(--hot)", type: "copy", timestamp: "35 min ago" },
  { id: 11, label: "Rebuy", value: 64, tone: "#7cd4ff", type: "copy", timestamp: "40 min ago" },
  { id: 12, label: "Snipe", value: 95, tone: "var(--good)", type: "confidence", timestamp: "45 min ago" },
];

// Whale tape data
const whaleTape = [
  { id: 1, wallet: "0x9f4a", action: "Bought", amount: "18.2M $REEF", note: "after 3 red candles", tag: "copy-trade: hot", type: "buy" },
  { id: 2, wallet: "0xa813", action: "Whale trimmed", amount: "11% into strength", note: "fear spike", type: "sell" },
  { id: 3, wallet: "0x71cc", action: "Fresh multi-wallet", amount: "accumulation detected", note: "confidence up", type: "buy" },
  { id: 4, wallet: "0x20be", action: "Liquidity sweep", amount: "absorbed in 6 min", note: "buyers defending", type: "buy" },
  { id: 5, wallet: "0x5d7a", action: "Dumped", amount: "5.3M $REEF", note: "fear of loss", type: "sell" },
  { id: 6, wallet: "0x129f", action: "Accumulated", amount: "2.1M $REEF", note: "copy trade signal", type: "buy" },
  { id: 7, wallet: "0x8a3b", action: "Whale moved", amount: "3.7M $REEF", note: "confidence building", type: "buy" },
  { id: 8, wallet: "0x4c1e", action: "Reduced position", amount: "1.9M $REEF", note: "market correction", type: "sell" },
];

// Market mood data
const marketMood = [
  ["Net flow", "+$8.7M", "Whales still bidding"],
  ["Risk appetite", "High", "Picks up when leverage cools"],
  ["Copy ratio", "3.4x", "Retail follows the big wallets"],
  ["Whale concentration", "42%", "Top 10 wallets hold 42% of supply"],
  ["Market volatility", "Medium", "Stable after recent pump"],
  ["Sentiment score", "72%", "Positive bias"],
];

// Pattern data
const patterns = [
  { id: 1, title: "Whale Accumulation Pattern", description: "Multiple wallets accumulating in same time frame", score: 85 },
  { id: 2, title: "Fear Spike Response", description: "Whale sell-off following market panic", score: 72 },
  { id: 3, title: "Copy Trade Surge", description: "Retail following whale movements with high volume", score: 91 },
  { id: 4, title: "Liquidity Sweep", description: "Large whale movements absorbing liquidity quickly", score: 68 },
];

// Initialize the dashboard
function initDashboard() {
  renderHeatmap();
  renderFeed();
  renderMetrics();
  renderPatterns();
  setupEventListeners();
  updateDashboard();
}

// Render heatmap with filtering
function renderHeatmap() {
  const filteredSignals = filterSignals(heatmapFilter.value);
  heatmapCount.textContent = `${filteredSignals.length} signals`;
  
  heatmap.innerHTML = filteredSignals
    .map(
      (cell) => `
        <div class="cell" style="background:${intensity(cell.tone)}" data-id="${cell.id}">
          <strong>${cell.value}</strong>
          <span>${cell.label}</span>
          <small>${cell.timestamp}</small>
        </div>
      `
    )
    .join("");
}

// Render whale feed with filtering
function renderFeed() {
  const filteredTape = filterTape(tapeFilter.value);
  tapeCount.textContent = `${filteredTape.length} events`;
  
  feed.innerHTML = filteredTape
    .map(
      ({ wallet, action, amount, note, tag, type }) => `
        <article class="feed-item">
          <div class="topline">
            <strong>${wallet}</strong>
            <span class="tag ${type}">${tag}</span>
          </div>
          <div><strong>${action}</strong> ${amount}</div>
          <div class="note">${note}</div>
        </article>
      `
    )
    .join("");
}

// Render market metrics
function renderMetrics() {
  metrics.innerHTML = marketMood
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
}

// Render patterns
function renderPatterns() {
  patternList.innerHTML = patterns
    .map(
      ({ id, title, description, score }) => `
        <div class="pattern-item">
          <h4>${title}</h4>
          <p>${description}</p>
          <div class="score">Score: ${score}/100</div>
        </div>
      `
    )
    .join("");
}

// Filter signals based on selection
function filterSignals(filterType) {
  if (filterType === 'all') return whaleSignals;
  return whaleSignals.filter(signal => signal.type === filterType);
}

// Filter tape based on selection
function filterTape(filterType) {
  if (filterType === 'all') return whaleTape;
  return whaleTape.filter(event => event.type === filterType);
}

// Intensity function for cell backgrounds
function intensity(n) {
  return `color-mix(in srgb, ${n} 78%, #0a1016)`;
}

// Setup event listeners
function setupEventListeners() {
  // Toggle heatmap visibility
  toggleHeatmapBtn.addEventListener('click', function() {
    const heatmapPanel = document.querySelector('.heatmap-panel');
    heatmapPanel.classList.toggle('hidden');
    this.textContent = heatmapPanel.classList.contains('hidden') ? 'Show Heatmap' : 'Hide Heatmap';
  });

  // Refresh data
  refreshDataBtn.addEventListener('click', function() {
    this.textContent = 'Refreshing...';
    this.disabled = true;
    
    // Simulate data refresh
    setTimeout(() => {
      updateDashboard();
      this.textContent = 'Refresh Data';
      this.disabled = false;
    }, 800);
  });

  // Filter heatmap
  heatmapFilter.addEventListener('change', function() {
    renderHeatmap();
  });

  // Filter tape
  tapeFilter.addEventListener('change', function() {
    renderFeed();
  });

  // Add click handlers to heatmap cells
  heatmap.addEventListener('click', function(e) {
    const cell = e.target.closest('.cell');
    if (cell) {
      const id = cell.dataset.id;
      const signal = whaleSignals.find(s => s.id == id);
      if (signal) {
        alert(`Signal: ${signal.label}\nValue: ${signal.value}\nType: ${signal.type}`);
      }
    }
  });
}

// Update dashboard with new values
function updateDashboard() {
  // Update live bias values
  const biasValue = document.getElementById('bias-value');
  const fearValue = document.getElementById('fear-value');
  const copyValue = document.getElementById('copy-value');
  const moodValue = document.getElementById('mood-value');
  const activityValue = document.getElementById('activity-value');
  
  // Generate random values for demonstration
  const newBias = Math.floor(Math.random() * 30) + 60; // 60-90
  const newFear = 100 - newBias;
  const copySignal = ['Strong', 'Moderate', 'Weak'][Math.floor(Math.random() * 3)];
  const mood = ['Bullish', 'Neutral', 'Bearish'][Math.floor(Math.random() * 3)];
  const activity = ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)];
  
  biasValue.textContent = newBias;
  fearValue.textContent = `${newFear}%`;
  copyValue.textContent = copySignal;
  moodValue.textContent = mood;
  activityValue.textContent = activity;
  
  // Update meter bars
  document.getElementById('confidence-meter').style.width = `${newBias}%`;
  document.getElementById('fear-meter').style.width = `${newFear}%`;
  const copyMeterWidth = copySignal === 'Strong' ? '85%' : copySignal === 'Moderate' ? '50%' : '20%';
  document.getElementById('copy-meter').style.width = copyMeterWidth;
  
  // Update heatmap with new values
  renderHeatmap();
  renderFeed();
}

// Initialize the dashboard when page loads
document.addEventListener('DOMContentLoaded', initDashboard);

// Simulate real-time updates
setInterval(updateDashboard, 30000);