import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import( /* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Profile = () => import( /* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import( /* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Icons = () => import( /* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import( /* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import( /* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import( /* webpackChunkName: "common" */ "@/pages/TableList.vue");
const LoginPage = () => import("@/pages/LoginPage.vue");


const routes = [{
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "login",
        name: "login",
        component: LoginPage
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
        beforeEnter(to, from, next){
          if(JSON.parse(localStorage.getItem("current_user")) !== null){
            next();
          }else next('login')
        }
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
