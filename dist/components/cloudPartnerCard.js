"use strict";
(() => {
  // src/components/cloudPartnerCard.ts
  var cloudPartnerCard = (partner) => {
    return `
    <div class="logo-card cloud-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Application Partner Logo" loading="lazy">
      </div>
    </div>
  `;
  };
})();
//# sourceMappingURL=cloudPartnerCard.js.map
