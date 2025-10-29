"use strict";
(() => {
  // src/pages/home.ts
  var HomePage = class {
    constructor() {
    }
    setup() {
    }
    exec() {
    }
  };

  // node_modules/@sygnal/sse/dist/script.js
  var ScriptElement = class extends HTMLScriptElement {
    constructor(src, config) {
      super();
      this.src = src;
      if (config) {
        if (config.type) {
          this.type = config.type;
        }
        if (config.id) {
          this.id = config.id;
        }
        if (config.async !== void 0) {
          this.async = config.async;
        }
        if (config.defer !== void 0) {
          this.defer = config.defer;
        }
        if (config.customAttributes) {
          for (const [key, value] of Object.entries(config.customAttributes)) {
            this.setAttribute(key, value);
          }
        }
      }
    }
    appendTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.appendChild(this);
    }
    prependTo(target = "body") {
      const parent = target === "head" ? document.head : document.body;
      parent.prepend(this);
    }
  };
  customElements.define("custom-script", ScriptElement, { extends: "script" });

  // node_modules/@sygnal/sse/dist/page.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var Page = class {
    static loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    }
    static loadEngineCSS(cssFileName) {
      let libPath = window.SSE.baseUrl;
      const cssURL = `${libPath}/css/${cssFileName}`;
      this.loadCSS(cssURL);
    }
    static loadStyle(css) {
      const style = document.createElement("style");
      style.innerText = css;
      document.head.appendChild(style);
    }
    static replaceScriptSource(element, newSrc) {
      element.src = newSrc;
    }
    static replaceCSSLink(element, newHref) {
      element.href = newHref;
    }
    static prependToTitle(text) {
      document.title = `${text}${document.title}`;
    }
    static getCurrentScriptUrl() {
      if (document.currentScript) {
        const currentScript = document.currentScript;
        return currentScript.src;
      }
      console.error("document.currentScript is not supported in this browser.");
      return null;
    }
    static getCurrentScriptBaseUrl() {
      const currentScript = document.currentScript;
      if (currentScript) {
        const scriptURL = new URL(currentScript.src);
        const origin = scriptURL.origin;
        const path = scriptURL.pathname.substring(0, scriptURL.pathname.lastIndexOf("/"));
        const baseURL = `${origin}${path}`;
        return baseURL;
      } else {
        console.error("Unable to determine the currently executing script.");
      }
      return void 0;
    }
    static findAncestorWithAttribute(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static getAncestorAttributeValue(element, attributeName) {
      let currentElement = element;
      while (currentElement) {
        if (currentElement.hasAttribute(attributeName)) {
          return currentElement.getAttribute(attributeName);
        }
        currentElement = currentElement.parentElement;
      }
      return null;
    }
    static hasAncestorWithAttribute(element, attributeName) {
      return this.findAncestorWithAttribute(element, attributeName) !== null;
    }
    static convertToPixels(value, contextElement = document.documentElement) {
      const match = value.match(/^(-?\d+\.?\d*)(rem|em|px|vh|vw|%)$/);
      if (!match)
        throw new Error("Invalid value format");
      const [, amountStr, unit] = match;
      const amount = parseFloat(amountStr);
      switch (unit) {
        case "px":
          return amount;
        case "rem":
          return amount * parseFloat(getComputedStyle(document.documentElement).fontSize);
        case "em":
          return amount * parseFloat(getComputedStyle(contextElement).fontSize);
        case "vh":
          return amount * window.innerHeight / 100;
        case "vw":
          return amount * window.innerWidth / 100;
        case "%":
          return amount * contextElement.clientWidth / 100;
        default:
          throw new Error("Unsupported unit");
      }
    }
    static getResponseHeader(headerName, url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        const headers = yield this.getResponseHeaders(url);
        if (!headers)
          return void 0;
        if (!headers.has(headerName))
          return void 0;
        return headers.get(headerName) || void 0;
      });
    }
    static getResponseHeaders(url = void 0) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          if (!url) {
            url = window.location.href;
          }
          const response = yield fetch(url, {
            method: "HEAD"
          });
          return response.headers;
        } catch (error) {
          console.error("Error checking reverse proxy header:", error);
        }
        return void 0;
      });
    }
  };
  Page.Head = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("head");
    }
  };
  Page.Body = class {
    static loadScript(src, config) {
      const script = new ScriptElement(src, config);
      script.appendTo("body");
    }
  };

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // node_modules/@sygnal/sse/dist/routeDispatcher.js
  var RouteDispatcher = class {
    constructor(SiteClass) {
      this._SiteClass = SiteClass;
    }
    matchRoute(path) {
      for (const route in this.routes) {
        if (route.endsWith("*")) {
          const baseRoute = route.slice(0, -1);
          if (path.startsWith(baseRoute)) {
            return this.routes[route];
          }
        } else if (route === path) {
          return this.routes[route];
        }
      }
      return null;
    }
    setupRoute() {
      const site = new this._SiteClass();
      site.setup();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.setup();
      } else {
      }
    }
    execRoute() {
      const site = new this._SiteClass();
      site.exec();
      const path = window.location.pathname;
      const HandlerClass = this.matchRoute(path);
      if (HandlerClass) {
        const handlerInstance = new HandlerClass();
        handlerInstance.exec();
      } else {
      }
    }
  };

  // src/site.ts
  var Site = class {
    constructor() {
    }
    setup() {
      Page.loadEngineCSS("site.css");
    }
    exec() {
    }
  };

  // src/components/mainPartnerCard.ts
  var mainPartnerCard = (partner) => {
    return `
    <div class="logo-card main-partner">
      ${partner.link ? `<a href="${partner.link}" class="main-partner__link" aria-labelledby="logo-card-${partner.name}" target="_blank"></a>` : ""}
      
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="${partner.name}" loading="lazy">
        <h3 class="partner-subheader" id="logo-card-${partner.name}">${partner.subheading}</h3>
        
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
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce87c0161b80af81d17e_logos-partners-05-avathon.png", tags: ["AI"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_393e48a33fb6baffff8f806792e4170a_instant%20connect%201.png", tags: ["Interoperability"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_63442d7b9464cdf5cc89dca78c1a661c_Tiami_logo-4-1-1.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_ac43998f8b3bae23263204dd6e3fd06a_R2_footer-logo-1024x848.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581fae03ef4d3d23824e_rallytac.png", tags: ["Interoperability"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["Cloud"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd1c_Amazon_Web_Services_Logo.svg.png", tags: ["Cloud"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d9d9b89e5bcf69b428_Oracle_Logo.svg.png", tags: ["Cloud"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["Cloud"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581e7f68e8762cf3973f_JFL.png", tags: ["Cyber"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["AI"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581d0ba8faf6c97774cd_placeholder.png", tags: ["C-(s)UAS"] },
    { logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/6902581f5e1fb4680e8b03cd_dedrone.png", tags: ["C-(s)UAS"] }
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
                { name: "Boeing", logoUrl: "https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png", subheading: "Simplifying connectivity in secure operations.", description: "Boeing partners with SEMPRE to keep the world\u2019s most critical operations running. Together, we secure the digital backbone that powers everything from advanced manufacturing to defense missions, delivering efficiency through simplicity.", link: "" },
                { name: "T-Mobile", logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/672e663a927272a6b6d5fe31_T-Mobile_New_Logo_Primary_RGB_M-on-W.jpg", subheading: "Securely extending the nation\u2019s largest 5G network.", description: "T-Mobile partners with SEMPRE to shield the nation\u2019s largest 5G network with a layer of protection. Built for those who can\u2019t afford downtime or compromise, we bring defense-grade connectivity and confidence through security." },
                { name: "Northrop", logoUrl: "https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d9ed107ef4cfc5ee00_Northrop_Grumman_logo_blue-on-clear_2020.svg.png", subheading: "Supporting the most demanding missions with trusted resilience.", description: "Northrop Grumman partners with SEMPRE to connect and protect customers with the most demanding mission requirements. Together, we keep critical teams ready in every environment, earning trust through resilience." }
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

  // src/routes.ts
  var routeDispatcher = () => {
    var routeDispatcher2 = new RouteDispatcher(Site);
    routeDispatcher2.routes = {
      "/": HomePage,
      "/partner/*": IndividualPartner,
      "/partner": PartnerPage
    };
    return routeDispatcher2;
  };
})();
/*! js-cookie v3.0.5 | MIT */
//# sourceMappingURL=routes.js.map
