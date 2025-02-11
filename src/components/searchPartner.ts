export const partnerSearch = () => {
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
  
  const searchComponent = document.querySelector('[sse-component="partner-search"]');
  if (searchComponent) {
    searchComponent.innerHTML = partnerSearch();
  }
  