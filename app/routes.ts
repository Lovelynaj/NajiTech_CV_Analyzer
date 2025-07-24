import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [

    //Home page
    index("routes/home.tsx"),

    //Authentication page
    route('/auth', 'routes/auth.tsx'),

    //upload page
    route('/upload', 'routes/upload.tsx'),

    //resume page. The /:id is added to be a unique resume page
    //is a dynamic segment of the route
    //hence the id can take resume/1, resume/2, resume/3 etc. so you can have dynamic pages with different id number.
    //it url will look like localhost:5173/resume/1 will take ypu to this resume page.
    route('/resume/:id', 'routes/resume.tsx'),

] satisfies RouteConfig;

