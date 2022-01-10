import { AnalyticsScreen } from "../../Screens/AnalyticsScreen"
import { ExploreScreen } from "../../Screens/ExploreScreen"
import { HomeScreen } from "../../Screens/HomeScreen"
import { BuildingGame } from "../../Screens/HomeScreen/pages/BuildingGame"
import { LibraryScreen } from "../../Screens/LibraryScreen"
import { ListScreen } from "../../Screens/ListsScreen"
import { ProfileScreen } from "../../Screens/ProfileScreen"
import { QuizzesScreen } from "../../Screens/QuizzesScreen"
import { IDashboardRoutes } from "./interfaces/IRoutes"

const DASHBOARD_ROUTES: IDashboardRoutes[] = [
    {
        pathRoute: '/home-teste',
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
    },
    {
        pathRoute: '/build-game',
        componentRoute: BuildingGame
    }
]

export { DASHBOARD_ROUTES }