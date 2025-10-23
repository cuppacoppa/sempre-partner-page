import { IModule } from "@sygnal/sse";
import { mainPartnerCard } from "../components/mainPartnerCard";
import { applicationPartnerCard } from "../components/applicationPartnerCard";
import { partnerFilter } from "../components/filterPartner";
// import { partnerSearch } from "../components/searchPartner";

interface Partner {
    logoUrl: string;
    tags: string[]; // Explicitly define tags as a string array
}

export const partnersApp: Partner[] = [
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce87c0161b80af81d17e_logos-partners-05-avathon.png', tags: ['Force Protection'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_393e48a33fb6baffff8f806792e4170a_instant%20connect%201.png', tags: ['Bridging'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_63442d7b9464cdf5cc89dca78c1a661c_Tiami_logo-4-1-1.png', tags: ['C-UAS'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_ac43998f8b3bae23263204dd6e3fd06a_R2_footer-logo-1024x848.png', tags: ['C-UAS'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ceb9c0d357ff16f1a758_logos-partners-06-radisys.png', tags: ['ORAN'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67c9ce60a578ebc36da2e29e_logos-partners-04-proxim.png', tags: ['Aircraft Inspection'] },
    
];


export class PartnerPage implements IModule {
    constructor() { }

    setup() { }

    exec() {
        console.log('partner page loaded');

        // Components
        const components = document.querySelectorAll<HTMLElement>('[sse-component]');
        components.forEach(element => {
            const componentValue = element.getAttribute('sse-component');

            if (componentValue) {
                switch (componentValue) {
                    case 'main-partner-card-list':
                        const mainPartnerSection = element;
                        const partnersMain = [
                            { name: 'Boeing', logoUrl: 'https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png', subheading: 'Simplifying connectivity in secure operations.', description:'Boeing partners with SEMPRE to keep the world’s most critical operations running. Together, we secure the digital backbone that powers everything from advanced manufacturing to defense missions, delivering efficiency through simplicity.', link: 'https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=boeing' },
                            { name: 'T-Mobile', logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/672e663a927272a6b6d5fe31_T-Mobile_New_Logo_Primary_RGB_M-on-W.jpg' },
                            { name: 'Northrop', logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d9ed107ef4cfc5ee00_Northrop_Grumman_logo_blue-on-clear_2020.svg.png' },
                        ];
                        mainPartnerSection.classList.add("partner-card-list");
                        partnersMain.forEach(partner => {
                            mainPartnerSection.innerHTML += mainPartnerCard(partner);
                        });
                        break;

                    case 'application-partner-card-list':
                        renderApplicationPartners(element);
                        break;

                    case 'partner-filter':
                        element.classList.add("partner-filter-container");
                        element.innerHTML = partnerFilter();
                        break;

                    // case 'partner-search':
                    //     element.classList.add("partner-search-container");
                    //     element.innerHTML = partnerSearch();
                    //     break;

                    default:
                        console.log('Unknown component:', componentValue);
                        break;
                }
            }
        });
    }
}

// Renders filtered partners based on the selected tag
const filterPartnersByTag = (selectedTag: string) => {
    const appPartnerSection = document.querySelector(".application-partner-card-list");
    if (!appPartnerSection) return;

    appPartnerSection.innerHTML = ""; // Clear existing partners

    const filteredPartners = selectedTag
        ? partnersApp.filter(partner => partner.tags.includes(selectedTag))
        : partnersApp;

    filteredPartners.forEach(partner => {
        appPartnerSection.innerHTML += applicationPartnerCard(partner);
    });
};

// Attach function to global scope
(window as any).filterPartnersByTag = filterPartnersByTag;


// Renders all application partners initially
const renderApplicationPartners = (container: HTMLElement) => {
    container.classList.add("application-partner-card-list");
    partnersApp.forEach(partner => {
        container.innerHTML += applicationPartnerCard(partner);
    });
};
