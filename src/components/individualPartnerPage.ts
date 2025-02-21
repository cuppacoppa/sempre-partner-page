import { partnersData, PartnerData } from "../data/partnerData";

// Ensure the function is properly exported
export const individualPartnerPage = (partnerName: string, partnersData: { [key: string]: PartnerData }) => {
  const partner = partnersData[partnerName];
  
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

// Event listener for dynamically updating the case study tabs and content
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const partnerName = urlParams.get('partner');
  
  if (partnerName) {
    const formattedPartnerName = partnerName.toLowerCase();
    const partner = partnersData[formattedPartnerName];

    const components = document.querySelectorAll<HTMLElement>('[sse-component]');
    components.forEach(element => {
      const componentValue = element.getAttribute('sse-component');

      if (componentValue) {
        switch (componentValue) {
          case 'partner-page':
            const partnerPageSection = element;
            partnerPageSection.innerHTML += individualPartnerPage(formattedPartnerName, partnersData);
        }
      }
    })

    const caseStudyTabsContainer = document.querySelector('.case-study-tabs');
    const caseStudyContentContainer = document.querySelector('.case-study-content');

    partner.caseStudyNumber && partner.caseStudyTabNames.forEach((tabName, index) => {
      const tabButton = document.createElement('button');
      tabButton.classList.add('tab-button');
      tabButton.dataset.tab = String(index + 1);
      tabButton.innerHTML = tabName;
      caseStudyTabsContainer?.appendChild(tabButton);

      tabButton.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach((btn) => btn.classList.remove('active'));
        tabButton.classList.add('active');
        
        updateTabContent(index);
      });

      if (index === 0) {
        tabButton.classList.add('active');
        updateTabContent(index);
      }
      
    });

    function updateTabContent(tabIndex: number) {
      const content = [
        {
          subheading: partner.caseStudySubHeading1,
          problem: partner.caseStudyProblem1,
          solution: partner.caseStudySolution1,
          collaboration: partner.caseStudyCollaboration1,
        },
        {
          subheading: partner.caseStudySubHeading2,
          problem: partner.caseStudyProblem2,
          solution: partner.caseStudySolution2,
          collaboration: partner.caseStudyCollaboration2,
        },
        {
          subheading: partner.caseStudySubHeading3,
          problem: partner.caseStudyProblem3,
          solution: partner.caseStudySolution3,
          collaboration: partner.caseStudyCollaboration3,
        },
      ];
    
      const currentContent = content[tabIndex];
      
      // Fade out the content
      caseStudyContentContainer!.classList.add('hidden');
      
      // Wait for the transition to end, then update the content
      setTimeout(() => {
        caseStudyContentContainer!.innerHTML = `
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
    
        // Fade back in after the content is updated
        caseStudyContentContainer!.classList.remove('hidden');
      }, 300); // Match the duration of the fade-out transition
    }
    
    
    updateTabContent(0); // Set default content for the first tab
  }
});

export default individualPartnerPage;
