/*
 * SITE
 * Main entry point
 * 
 * https://engine.sygnal.com/
 * 
 * ENGINE MODE
 * ?engine.mode=dev
 * ?engine.mode=prod
 * 
 */

import { HomePage } from "./pages/home";
import { RouteDispatcher } from "@sygnal/sse";
import { Site } from "./site";
import { PartnerPage } from "./pages/partner";
import { IndividualPartner } from "./pages/individualPartner";

export const routeDispatcher = (): RouteDispatcher => {
    
    var routeDispatcher = new RouteDispatcher(Site);
    routeDispatcher.routes = {

        // Site pages
        '/': HomePage,
        '/partner/*': IndividualPartner,  // Dynamic route for individual partner
        '/partner': PartnerPage,

        // TEST Pages
    };

    return routeDispatcher;
}
