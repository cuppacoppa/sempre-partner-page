"use strict";
(() => {
  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="logo-card main-partner">
      ${partner.link ? `<a href="${partner.link}" class="main-partner__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>` : ""}
      
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 id="logo-card-${partner.name}">${partner.name}</h3>
        
        ${partner.description ? `<p class="partner-summary">${partner.description}</p>` : ""}

        ${partner.link ? `<div class="main-partner__icon">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.67678 0L6.54547 1.13131L12.5253 7.11111L0.404053 7.11111V8.72727H12.5253L6.54547 14.8687L7.67678 16L15.596 7.91919L7.67678 0Z" fill="currentColor"></path>
              </svg>
            </div>` : ""}
      </div>
    </div>
  `;
  };

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

  // src/pages/partner.ts
  var partnersApp = [
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce87c0161b80af81d17e_logos-partners-05-avathon.png", tags: ["Force Protection"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_393e48a33fb6baffff8f806792e4170a_instant%20connect%201.png", tags: ["Bridging"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_63442d7b9464cdf5cc89dca78c1a661c_Tiami_logo-4-1-1.png", tags: ["C-UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_ac43998f8b3bae23263204dd6e3fd06a_R2_footer-logo-1024x848.png", tags: ["C-UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ceb9c0d357ff16f1a758_logos-partners-06-radisys.png", tags: ["ORAN"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce60a578ebc36da2e29e_logos-partners-04-proxim.png", tags: ["Aircraft Inspection"] }
  ];
  var PartnerPage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      console.log("partner page loaded");
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "main-partner-card-list":
              const mainPartnerSection = element;
              const partnersMain = [
                { name: "Boeing", logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", link: "https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=boeing" },
                { name: "T-Mobile", logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/672e663a927272a6b6d5fe31_T-Mobile_New_Logo_Primary_RGB_M-on-W.jpg" },
                { name: "Northrop", logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d9ed107ef4cfc5ee00_Northrop_Grumman_logo_blue-on-clear_2020.svg.png" }
              ];
              mainPartnerSection.classList.add("partner-card-list");
              partnersMain.forEach((partner) => {
                mainPartnerSection.innerHTML += mainPartnerCard(partner);
              });
              break;
            case "application-partner-card-list":
              renderApplicationPartners(element);
              break;
            case "partner-filter":
              element.classList.add("partner-filter-container");
              element.innerHTML = partnerFilter();
              break;
            default:
              console.log("Unknown component:", componentValue);
              break;
          }
        }
      });
    }
  };
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
  var renderApplicationPartners = (container) => {
    container.classList.add("application-partner-card-list");
    partnersApp.forEach((partner) => {
      container.innerHTML += applicationPartnerCard(partner);
    });
  };
})();
//# sourceMappingURL=partner.js.map
