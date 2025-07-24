import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [

    //Home page
    index("routes/home.tsx"),

    //Authentication page
    route('/auth', 'routes/auth.tsx'),

    //upload page
    route('/upload', 'routes/upload.tsx'),

] satisfies RouteConfig;

