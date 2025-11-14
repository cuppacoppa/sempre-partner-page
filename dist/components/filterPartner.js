"use strict";
(() => {
  // src/components/applicationPartnerCard.ts
  var applicationPartnerCard = (partner) => {
    return `
    <div class="logo-card application-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Application Partner Logo" loading="lazy">
      </div>
    </div>
  `;
  };

  // src/pages/partner.ts
  var partnersApp = [
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce87c0161b80af81d17e_logos-partners-05-avathon.png", tags: ["AI"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_393e48a33fb6baffff8f806792e4170a_instant%20connect%201.png", tags: ["Interoperability"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_63442d7b9464cdf5cc89dca78c1a661c_Tiami_logo-4-1-1.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_ac43998f8b3bae23263204dd6e3fd06a_R2_footer-logo-1024x848.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581fae03ef4d3d23824e_rallytac.png", tags: ["Interoperability"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581e7f68e8762cf3973f_JFL.png", tags: ["Cyber"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["AI"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581f5e1fb4680e8b03cd_dedrone.png", tags: ["C-(s)UAS"] }
  ];
  var filterPartnersByTag = (selectedTag) => {
    const appPartnerSection = document.querySelector(".application-partner-card-list");
    if (!appPartnerSection)
      return;
    appPartnerSection.innerHTML = "";
    const filteredPartners = selectedTag ? partnersApp.filter((partner) => partner.tags.includes(selectedTag)) : partnersApp;
    filteredPartners.forEach((partner) => {
      appPartnerSection.innerHTML += applicationPartnerCard(partner);
    });
  };
  window.filterPartnersByTag = filterPartnersByTag;

  // src/components/filterPartner.ts
  var partnerFilter = () => {
    const uniqueTags = /* @__PURE__ */ new Set();
    partnersApp.forEach((partner) => {
      partner.tags.forEach((tag) => uniqueTags.add(tag));
    });
    const tagOptions = Array.from(uniqueTags).map((tag) => `<option value="${tag}">${tag}</option>`).join("");
    return `
      <div class="filter-container">
        <button class="filter-button">Filter</button>
        <div class="filter-dropdown">
          <label for="partner-type">Filter by Tag</label>
          <select id="partner-type">
            <option value="">All Partners</option>
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
      const button = filterComponent.querySelector(".filter-button");
      const dropdown = filterComponent.querySelector(".filter-dropdown");
      const select = filterComponent.querySelector("#partner-type");
      button.addEventListener("click", () => {
        dropdown.classList.toggle("open");
      });
      select.addEventListener("change", () => {
        const selectedTag = select.value;
        if (typeof window.filterPartnersByTag === "function") {
          window.filterPartnersByTag(selectedTag);
        } else {
          console.error("filterPartnersByTag is not defined");
        }
      });
    }
  });
})();
//# sourceMappingURL=filterPartner.js.map
