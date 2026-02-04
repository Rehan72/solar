
import Dashboard from "../pages/superAdmin/Dashboard";
import CreatePlant from "../pages/plants/CreatePlant";
import PlantList from "../pages/plants/PlantList";


export const routeParams = "management";




export default [
   {
     element: Dashboard,
     path: `dashboard`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: PlantList,
     path: `plants`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: CreatePlant,
     path: `plants/create`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   


   

]