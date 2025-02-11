import { IModule } from "@sygnal/sse";
import { individualPartnerPage } from "../components/individualPartnerPage";
import { partnersData, PartnerData } from "../data/partnerData";




export class IndividualPartner implements IModule {

  constructor() {
  }

  setup() {
    
  }

  exec() {

    const path = window.location.pathname;
    const segments = path.split("/");
    const partnerName = segments.pop() || segments.pop(); // Handles trailing slash

    // 2. Find the corresponding partner object from partnersData
    const validPartnerName = partnerName as string;
    const formattedPartnerName = validPartnerName.toLowerCase();

    // console.log(formattedPartnerName)
    // Now you can use validPartnerName safely
    const partner = partnersData[formattedPartnerName];
    // console.log(partner);

    // CALL THE INDIVIDUALPARTNER.TS COMPONENT HERE TO GENERATE HTML
    const partnerHTML = individualPartnerPage(formattedPartnerName, partnersData);
    // console.log(partnerHTML)
    const partnerNameLowerCase =  partner.name.toLowerCase();

    // Redirect to partner/learn page with partnerName as a URL parameter
    window.location.replace(`https://mats-dapper-site-d83a81.webflow.io/partner/learn?partner=${partnerNameLowerCase}`);

  }
}
