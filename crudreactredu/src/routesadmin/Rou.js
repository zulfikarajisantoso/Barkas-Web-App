import Add from "../admin/Add";
import Addcat from "../admin/category/Addcat";
import Editcat from "../admin/category/Editcat";
import Viewcat from "../admin/category/Viewcat";
import Edit from "../admin/Edit";
import View from "../admin/View";
import Addiklan from "../Iklan/Addiklan";
import Viewiklan from "../Iklan/Viewiklan";

const Rou = [
  { path: "/admin", exact: true, name: "Admin", component: View },
  { path: "/admin/add", exact: true, name: "addprod", component: Add },
  { path: "/admin/edit/:id", exact: true, name: "editprod", component: Edit },
  {
    path: "/admin/add-category",
    exact: true,
    name: "addcate",
    component: Addcat,
  },
  {
    path: "/admin/edit-category/:id",
    exact: true,
    name: "Editcategory",
    component: Editcat,
  },
  {
    path: "/admin/view-category",
    exact: true,
    name: "viewcat",
    component: Viewcat,
  },
  {
    path: "/admin/add-iklan",
    exact: true,
    name: "addiklan",
    component: Addiklan,
  },
  {
    path: "/admin/view-iklan",
    exact: true,
    name: "viewiklan",
    component: Viewiklan,
  },
];
export default Rou;
