import React, {useState} from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {

    return (
        <Router>
            <Switch>
                <div
                    style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {isLoggedIn && <Navigation userObj={userObj}/>}
                    {isLoggedIn ? (
                            <>
                                <Route exact path="/">
                                    <Home userObj={userObj} />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile refreshUser={refreshUser} userObj={userObj}/>
                                </Route>
                                <Redirect from="*" to="/"/>
                            </>
                        )
                        :
                        <>
                            <Route exact path="/">
                                <Auth/>
                            </Route>
                            <Redirect from="*" to="/"/>
                        </>
                    }
                </div>
            </Switch>
        </Router>
    )
}

export default AppRouter;