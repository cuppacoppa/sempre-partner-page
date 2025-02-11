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
    { logoUrl: 'https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa34cea35c6f2a2eda70bb_Oracle_Logo.svg.png', tags: ['Cloud'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88da5ae37db0d0e5b30b_SparkCognition_Logo.jpg', tags: ['Force Protection'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d95d4e17f85b833e51_instant%20connect%201.png', tags: ['Bridging'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/672e773f1a215de4e3b140a8_Corero_Network_Security_Logo.jpg', tags: ['Security'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d99407a3a9399e97ce_BoonLogic_Main-Logo.png', tags: ['Artificial Intelligence'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd0f_Tiami_logo-4-1-1.png', tags: ['C-UAS'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8f852614075082571_R2_footer-logo-1024x848.png', tags: ['C-UAS'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d8e7151d4b8cd03b29_element.png', tags: ['Productivity'] },
    { logoUrl: 'https://cdn.prod.website-files.com/660bffb9ffdd26c353bd02d3/67ab88d87da80c137d3dbd1c_Amazon_Web_Services_Logo.svg.png', tags: ['Cloud'] },
    
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
                            { name: 'Boeing', logoUrl: 'https://cdn.prod.website-files.com/679e860587d809fd4d2d7b55/67aa3479c6a80a7987c26917_Boeing_full_logo.svg.png', link: 'https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=boeing' },
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
