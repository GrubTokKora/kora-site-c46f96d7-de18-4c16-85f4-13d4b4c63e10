const nav = document.querySelector(".nav");
const toggleBtn = document.querySelector(".menu-toggle");

if (toggleBtn && nav) {
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => io.observe(item));
}

function renderServices() {
  const wrapper = document.getElementById("service-grid");
  const services = window.siteData?.services || [];
  if (!wrapper || !services.length) return;

  wrapper.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <h3>${service}</h3>
          <p>Available through independent professionals at New York: Hartsdale.</p>
          <span class="tag">Hartsdale</span>
        </article>
      `
    )
    .join("");
}

function renderDirectory(filtered = "") {
  const wrapper = document.getElementById("directory-grid");
  const list = window.siteData?.professionals || [];
  if (!wrapper || !list.length) return;

  const normalized = filtered.trim().toLowerCase();
  const data = normalized
    ? list.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) ||
          item.specialty.toLowerCase().includes(normalized)
      )
    : list;

  wrapper.innerHTML = data
    .map((person) => {
      const profile = person.profileUrl
        ? `<a class="btn btn-primary" href="${person.profileUrl}">Full profile</a>`
        : "";
      const telDigits = (person.phone || "9143061199").replace(/\D/g, "");
      const book = `<a class="btn btn-secondary" href="tel:${telDigits}">${person.phone ? "Call" : "Call location"}</a>`;
      return `
        <article class="directory-card">
          <h3>${person.name}</h3>
          <p class="suite">${person.suite || "Suite details available on request"}</p>
          <p>Specialty: ${person.specialty}</p>
          <div class="directory-actions">${profile}${book}</div>
        </article>
      `;
    })
    .join("");
}

function renderGallery() {
  const wrapper = document.getElementById("gallery-grid");
  const images = window.siteData?.gallery || [];
  if (!wrapper || !images.length) return;

  wrapper.innerHTML = images
    .map(
      (src, index) => `
        <article class="gallery-card">
          <img src="${src}" alt="Salon interior ${index + 1}" loading="lazy" />
        </article>
      `
    )
    .join("");
}

renderServices();
renderDirectory();
renderGallery();

const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    renderDirectory(event.target.value);
  });
}

const form = document.querySelector(".interest-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const btn = form.querySelector("button");
    if (btn) {
      btn.textContent = "Inquiry Sent";
      btn.disabled = true;
    }
  });
}
