"use strict";
(() => {
  // src/components/searchPartner.ts
  var partnerSearch = () => {
    return `
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Search Partners..." 
          id="partner-search" 
        />
      </div>
    `;
  };
  var searchComponent = document.querySelector('[sse-component="partner-search"]');
  if (searchComponent) {
    searchComponent.innerHTML = partnerSearch();
  }
})();
//# sourceMappingURL=searchPartner.js.map
