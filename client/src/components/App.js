import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from "./HomePage";
import ReadBlogPage from "./read_blog_page_components/ReadBlogPage";
import WriteBlogPage from "./write_blog_components/WriteBlogPage";

function App() {
    return <Router>
        <Switch>
            <Route path="/read_blog/:blogId"><ReadBlogPage /></Route>
            <Route path="/write_blog"><WriteBlogPage /></Route>
            <Route exact path="/"><HomePage /></Route>
        </Switch>
    </Router>;
}

export default App;