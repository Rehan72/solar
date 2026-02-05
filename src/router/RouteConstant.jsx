
import Dashboard from "../pages/superAdmin/Dashboard";
import CreatePlant from "../pages/plants/CreatePlant";
import PlantList from "../pages/plants/PlantList";
import RegionAdminList from "../pages/regionAdmin/RegionAdminList";
import CreateRegionAdmin from "../pages/regionAdmin/CreateRegionAdmin";
import CreatePlantAdmin from "../pages/plants/plantAdmin/CreatePlantAdmin";
import PlantAdminList from "../pages/plants/plantAdmin/PlantAdminList";


export const routeParams = "management";




export default [
   {
     element: Dashboard,
     path: `dashboard`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: RegionAdminList,
     path: `region-admin`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: CreateRegionAdmin,
     path: `region-admin/create`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: PlantList,
     path: `grid-plant`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: CreatePlant,
     path: `grid-plant/create`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: PlantAdminList,
     path: `plant-admin`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: CreatePlantAdmin,
     path: `plant-admin/create`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },


   

]