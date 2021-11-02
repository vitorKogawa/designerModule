import { AnalyticsScreen } from "../../Screens/AnalyticsScreen"
import { ExploreScreen } from "../../Screens/ExploreScreen"
import { HomeScreen } from "../../Screens/HomeScreen"
import { LibraryScreen } from "../../Screens/LibraryScreen"
import { ListScreen } from "../../Screens/ListsScreen"
import { ProfileScreen } from "../../Screens/ProfileScreen"
import { QuizzesScreen } from "../../Screens/QuizzesScreen"
import { IDashboardRoutes } from "./interfaces/IRoutes"

const DASHBOARD_ROUTES: IDashboardRoutes[] = [
    {
        pathRoute: '/home',
        componentRoute: HomeScreen
    },
    {
        pathRoute: '/analytics',
        componentRoute: AnalyticsScreen
    },
    {
        pathRoute: '/explore',
        componentRoute: ExploreScreen
    },
    {
        pathRoute: '/library',
        componentRoute: LibraryScreen
    },
    {
        pathRoute: '/lists',
        componentRoute: ListScreen
    },
    {
        pathRoute: '/quizzes',
        componentRoute: QuizzesScreen
    },
    {
        pathRoute: '/profile',
        componentRoute: ProfileScreen
    }
]

export { DASHBOARD_ROUTES }