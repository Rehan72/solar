
import Dashboard from "../pages/superAdmin/Dashboard";
import CreatePlant from "../pages/plants/CreatePlant";
import PlantList from "../pages/plants/PlantList";
import RegionAdminList from "../pages/regionAdmin/RegionAdminList";
import CreateRegionAdmin from "../pages/regionAdmin/CreateRegionAdmin";
import CreatePlantAdmin from "../pages/plants/plantAdmin/CreatePlantAdmin";
import PlantAdminList from "../pages/plants/plantAdmin/PlantAdminList";
import CreateInstallationTeam from "../pages/installationTeam/CreateInstallationTeam";
import InstallationTeamDetail from "../pages/installationTeam/InstallationTeamDetail";
import SurveyTeamList from "../pages/surveyTeam/SurveyTeamList";
import CreateSurveyTeam from "../pages/surveyTeam/CreateSurveyTeam";
import SurveyTeamDetail from "../pages/surveyTeam/SurveyTeamDetail";
import InstallationWorkflow from "../pages/workflow/InstallationWorkflow";
import InstallationTeamList from "../pages/installationTeam/InstallationTeamList";
import HandoffReview from "../pages/workflow/HandoffReview";
import CommissioningHandoff from "../pages/workflow/CommissioningHandoff";


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
   {
     element: InstallationTeamList,
     path: `installation-teams`,
     exact: true
   },
   {
     element: CreateInstallationTeam,
     path: `installation-teams/create`,
     exact: true
   },
   {
     element: InstallationTeamDetail,
     path: `installation-teams/:id`,
     exact: true
   },
   {
     element: SurveyTeamList,
     path: `survey-teams`,
     exact: true
   },
   {
     element: CreateSurveyTeam,
     path: `survey-teams/create`,
     exact: true
   },
   {
     element: SurveyTeamDetail,
     path: `survey-teams/:id`,
     exact: true
   },
   {
     element: InstallationWorkflow,
     path: `installation-workflow`, // For demo purposes, normally linked to plant ID
     exact: true
   },
   {
     element: HandoffReview,
     path: `handoff/review`,
     exact: true
   },
   {
     element: CommissioningHandoff,
     path: `commissioning/handoff`,
     exact: true
   },


   

]