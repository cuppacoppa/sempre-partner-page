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
    { logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa34cea35c6f2a2eda70bb_Oracle_Logo.svg.png", tags: ["Cloud"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88da5ae37db0d0e5b30b_SparkCognition_Logo.jpg", tags: ["Force Protection"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_instant%20connect%201.png", tags: ["Bridging"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/672e773f1a215de4e3b140a8_Corero_Network_Security_Logo.jpg", tags: ["Security"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d99407a3a9399e97ce_BoonLogic_Main-Logo.png", tags: ["Artificial Intelligence"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_Tiami_logo-4-1-1.png", tags: ["C-UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_R2_footer-logo-1024x848.png", tags: ["C-UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8e7151d4b8cd03b29_element.png", tags: ["Productivity"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd1c_Amazon_Web_Services_Logo.svg.png", tags: ["Cloud"] }
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
