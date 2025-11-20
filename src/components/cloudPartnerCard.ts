export const cloudPartnerCard = (partner: { logoUrl: string }) => {
  return `
    <div class="logo-card cloud-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Cloud Integration Logo" loading="lazy">
      </div>
    </div>
  `;
};
