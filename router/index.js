import { createRouter, createWebHistory } from "vue-router";
import ShootingTrends from "../src/views/ShootingTrends.vue";
import ShootingScenes from "../src/views/ShootingScenes.vue";
import ShootingVics from "../src/views/ShootingVics.vue";
import ShootingPerps from "../src/views/ShootingPerps.vue";
import NotFound from "../src/views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "ShootingTrends",
        component: ShootingTrends
    },
    {
        path: "/scenes",
        name: "ShootingScenes",
        component: ShootingScenes
    },
    {
        path: "/vics",
        name: "ShootingVics",
        component: ShootingVics
    },
    {
        path: "/perps",
        name: "ShootingPerps",
        component: ShootingPerps
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;