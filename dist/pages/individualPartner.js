"use strict";
(() => {
  // src/data/partnerData.ts
  var partnersData = {
    "boeing": {
      name: "Boeing",
      logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",
      Header: "Page Header",
      subHeader: "Page Sub Header",
      description: "The red glow of tail lights indicating another long drive home from work after an even longer 24-hour shift at the hospital. The shift hadnt been horrible but the constant stream of patients entering the ER meant there was no downtime. She had some of the \u201Cregulars\u201D in tonight with new ailments they were sure were going to kill them. It\u2019s amazing what a couple of Tylenol and a physical exam from the doctor did to eliminate their pain, nausea, headache, or whatever other mild symptoms they had. Sometimes she wondered if all they really needed was some interaction with others and a bit of the individual attention they received from the nurses. ",
      largeMedia: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",
      caseStudyNumber: 3,
      caseStudyTabNames: ["tab 1", "tab 2", "tab 3"],
      caseStudyMedia: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png",
      caseStudySubHeading1: "How We Helped Partner A 111111111",
      caseStudyProblem1: "Partner A faced a challenge with scaling 1111111.",
      caseStudySolution1: "We provided an innovative solution to optimize their operations 11111111.",
      caseStudyCollaboration1: "Our team worked closely with Partner A to ensure seamless integration 111111111.",
      caseStudySubHeading2: "How We Helped Partner A 2222222",
      caseStudyProblem2: "Partner A faced a challenge with scaling 2222222.",
      caseStudySolution2: "We provided an innovative solution to optimize their operations 2222222.",
      caseStudyCollaboration2: "Our team worked closely with Partner A to ensure seamless integration 222222.",
      caseStudySubHeading3: "How We Helped Partner A 33333333",
      caseStudyProblem3: "Partner A faced a challenge with scaling 333333.",
      caseStudySolution3: "We provided an innovative solution to optimize their operations 333333.",
      caseStudyCollaboration3: "Our team worked closely with Partner A to ensure seamless integration 333333."
    }
  };

  // src/components/individualPartnerPage.ts
  var individualPartnerPage = (partnerName, partnersData2) => {
    const partner = partnersData2[partnerName];
    if (!partner) {
      return `<p>Partner not found.</p>`;
    }
    return `
    <div class="partner-container">
      <!-- Partnership Subheading and Logo -->
      <div class="partner-header">
        <div class="partner-text">
          <p class="partner-subheading">${partner.subHeader}</p>
          <h1 class="partner-header">${partner.Header}</h1>
        </div>
        <div class="partner-logo">
          <img src="${partner.logoUrl}" alt="${partner.name} Logo">
        </div>
      </div>

      <!-- Main Content Section (Description) -->
      <div class="partner-main-content">
        <p class="partner-description">${partner.description}</p>
      </div>
    </div>
    
    <!-- Full-Screen Media Section -->
    <div class="partner-fullscreen-media">
      <img src="${partner.largeMedia}" alt="${partner.name} Feature Image">
    </div>

    <!-- Case Study Section -->
    <div class="partner-case-study">
      <!-- Tab Section (Navigation for the case study) -->
      <div class="case-study-tabs">
        <!-- Tabs will be dynamically inserted here -->
      </div>

      <!-- Case Study Content -->
      <div class="case-study-content">
        <div class="case-study-left">
          <!-- Media (Image) Section -->
          <img src="${partner.caseStudyMedia}" alt="Case Study Media" class="case-study-media">
        </div>
        <div class="case-study-right">
        </div>
      </div>
    </div>
  `;
  };
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const partnerName = urlParams.get("partner");
    if (partnerName) {
      let updateTabContent2 = function(tabIndex) {
        const content = [
          {
            subheading: partner.caseStudySubHeading1,
            problem: partner.caseStudyProblem1,
            solution: partner.caseStudySolution1,
            collaboration: partner.caseStudyCollaboration1
          },
          {
            subheading: partner.caseStudySubHeading2,
            problem: partner.caseStudyProblem2,
            solution: partner.caseStudySolution2,
            collaboration: partner.caseStudyCollaboration2
          },
          {
            subheading: partner.caseStudySubHeading3,
            problem: partner.caseStudyProblem3,
            solution: partner.caseStudySolution3,
            collaboration: partner.caseStudyCollaboration3
          }
        ];
        const currentContent = content[tabIndex];
        caseStudyContentContainer.classList.add("hidden");
        setTimeout(() => {
          caseStudyContentContainer.innerHTML = `
          <div class="case-study-left">
            <img src="${partner.caseStudyMedia}" alt="Case Study Media" class="case-study-media">
          </div>
          <div class="case-study-right">
            <h3 class="case-study-subheading">${currentContent.subheading}</h3>
    
            <div class="case-study-section">
              <p class="case-study-title">Problem</p>
              <p class="case-study-text">${currentContent.problem}</p>
            </div>
    
            <div class="case-study-section">
              <p class="case-study-title">Solution</p>
              <p class="case-study-text">${currentContent.solution}</p>
            </div>
    
            <div class="case-study-section">
              <p class="case-study-title">Collaboration</p>
              <p class="case-study-text">${currentContent.collaboration}</p>
            </div>
          </div>
        `;
          caseStudyContentContainer.classList.remove("hidden");
        }, 300);
      };
      var updateTabContent = updateTabContent2;
      const formattedPartnerName = partnerName.toLowerCase();
      const partner = partnersData[formattedPartnerName];
      const components = document.querySelectorAll("[sse-component]");
      components.forEach((element) => {
        const componentValue = element.getAttribute("sse-component");
        if (componentValue) {
          switch (componentValue) {
            case "partner-page":
              const partnerPageSection = element;
              partnerPageSection.innerHTML += individualPartnerPage(formattedPartnerName, partnersData);
          }
        }
      });
      const caseStudyTabsContainer = document.querySelector(".case-study-tabs");
      const caseStudyContentContainer = document.querySelector(".case-study-content");
      partner.caseStudyNumber && partner.caseStudyTabNames.forEach((tabName, index) => {
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.dataset.tab = String(index + 1);
        tabButton.innerHTML = tabName;
        caseStudyTabsContainer == null ? void 0 : caseStudyTabsContainer.appendChild(tabButton);
        tabButton.addEventListener("click", () => {
          document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"));
          tabButton.classList.add("active");
          updateTabContent2(index);
        });
        if (index === 0) {
          tabButton.classList.add("active");
          updateTabContent2(index);
        }
      });
      updateTabContent2(0);
    }
  });

  // src/pages/individualPartner.ts
  var IndividualPartner = class {
    constructor() {
    }
    setup() {
    }
    exec() {
      const path = window.location.pathname;
      const segments = path.split("/");
      const partnerName = segments.pop() || segments.pop();
      const validPartnerName = partnerName;
      const formattedPartnerName = validPartnerName.toLowerCase();
      const partner = partnersData[formattedPartnerName];
      const partnerHTML = individualPartnerPage(formattedPartnerName, partnersData);
      const partnerNameLowerCase = partner.name.toLowerCase();
      window.location.replace(`https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=${partnerNameLowerCase}`);
    }
  };
})();
//# sourceMappingURL=individualPartner.js.map
