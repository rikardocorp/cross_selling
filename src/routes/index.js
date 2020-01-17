// import { route as routesPrincipal } from '../views/Principal/route'
// import { route as routesVertical } from '../views/Vertical/route'
// import { route as routesCatalog } from '../views/Catalog/route'
import { route as routesCatalogue, _base as base_catalogue } from '../views/NewCatalog/route'
import { route as routesIntelligence } from '../views/MVP/route'


console.log('ROUTES:::', base_catalogue)

const appRoutes = [
    // routesPages,
    // routesVertical,
    // routesPrincipal,
    routesIntelligence,
    routesCatalogue,
    { redirect: true, path: "", to: base_catalogue.path },

]

export default appRoutes