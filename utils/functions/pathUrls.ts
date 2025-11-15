import LoginPage from "../../pages/loginPage";

export const pathUrls = {
    reqresApi: {
        users: {
            userEndpoint: () => new URL("/api/users", process.env.API_BASE_URL),
            deleteUserEndpoint: (userId: string) => new URL(`/api/users/${userId}`, process.env.API_BASE_URL),
        }
    },
    sauceDemo: {
        inventory: () => new URL("/inventory.html", process.env.UI_BASE_URL),
        LoginPage: () => new URL("/login", process.env.UI_BASE_URL),
        homePage: () => new URL("/", process.env.UI_BASE_URL),
    }
}
