// Countdown to the 5PM same-day cutoff
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setHours(17, 0, 0, 0);
  const diff = cutoff - now;

  if (diff <= 0) {
    countdownEl.textContent = 'Order now for next-day delivery';
    return;
  }

  const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  countdownEl.textContent = `${h}:${m}:${s} left`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Mobile menu
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// Gift finder + search filter
const cards = document.querySelectorAll('.card');
const occasionSelect = document.getElementById('occasionSelect');
const budgetSelect = document.getElementById('budgetSelect');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

function applyFilters() {
  const occasion = occasionSelect.value;
  const [min, max] = budgetSelect.value.split('-').map(Number);
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const price = Number(card.dataset.price);
    const matchOccasion = occasion === 'all' || card.dataset.occasion === occasion;
    const matchBudget = price >= min && price < max;
    const matchSearch = card.dataset.name.toLowerCase().includes(query);
    const show = matchOccasion && matchBudget && matchSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  noResults.hidden = visible !== 0;
}

document.getElementById('findBtn').addEventListener('click', () => {
  applyFilters();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});
searchInput.addEventListener('input', applyFilters);

// Simple cart counter (display only for now)
let cartCount = 0;
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    btn.textContent = 'Added ✓';
    setTimeout(() => (btn.textContent = 'Add to cart'), 1200);
  });
});