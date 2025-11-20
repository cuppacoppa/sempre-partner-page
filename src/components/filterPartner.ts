import { partnersApp } from "../pages/partner"; // Ensure partnersApp is accessible

export const partnerFilter = () => {
    const uniqueTags = new Set<string>();

    // Extract unique tags from partnersApp
    partnersApp.forEach(partner => {
        partner.tags.forEach(tag => uniqueTags.add(tag));
    });

    // Generate options dynamically
    const tagOptions = Array.from(uniqueTags)
        .map(tag => `<option value="${tag}">${tag}</option>`)
        .join("");

    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Filter by Tag</label>
          <select id="partner-type">
            <option value="">All Applications</option>
            ${tagOptions} 
          </select>
        </div>
      </div>
    `;
};

window.addEventListener("load", () => {
  const filterComponent = document.querySelector('[sse-component="partner-filter"]');
  if (filterComponent) {
      filterComponent.innerHTML = partnerFilter();

      const button = filterComponent.querySelector(".filter-button") as HTMLButtonElement;
      const dropdown = filterComponent.querySelector(".filter-dropdown") as HTMLDivElement;
      const select = filterComponent.querySelector("#partner-type") as HTMLSelectElement;

      button.addEventListener("click", () => {
          dropdown.classList.toggle("open");
      });

      select.addEventListener("change", () => {
          const selectedTag = select.value;
          if (typeof (window as any).filterPartnersByTag === "function") {
              (window as any).filterPartnersByTag(selectedTag);
          } else {
              console.error("filterPartnersByTag is not defined");
          }
      });
  }
});

