export const applicationPartnerCard = (partner: { logoUrl: string }) => {
  return `
    <div class="logo-card application-partner">
      <div class="logo-card__content">
        <img src="${partner.logoUrl}" alt="Application Partner Logo" loading="lazy">
      </div>
    </div>
  `;
};
