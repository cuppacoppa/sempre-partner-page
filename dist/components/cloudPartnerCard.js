"use strict";
(() => {
  // src/components/cloudPartnerCard.ts
  var cloudPartnerCard = (partner) => {
    return `
    <div class="logo-card application-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Cloud Integration Logo" loading="lazy">
      </div>
    </div>
  `;
  };
})();
//# sourceMappingURL=cloudPartnerCard.js.map
