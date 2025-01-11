import { createBrowserRouter } from "react-router-dom";
import COMMUNITY_ROUTES from "./Community";
import MAIN_ROUTES from "./MainRoutes";
import MYPAGE_ROUTES from "./MyPageRoutes";
import ONBOARGING_ROUTES from "./OnboardingRoutes";

//children은 Outlet에서 사용하는 방식 (레이아웃 지정해야할 때)
const router = createBrowserRouter([
  { path: "/", element: <>just home</> },
  ...ONBOARGING_ROUTES,
  ...MAIN_ROUTES,
  ...COMMUNITY_ROUTES,
  ...MYPAGE_ROUTES,
]);

export default router;
