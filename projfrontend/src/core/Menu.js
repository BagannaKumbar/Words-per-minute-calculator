import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";
const currentTab =(history, path)=>{
    if(history.location.pathname===path){
        return {color:"#2ecc72"};
    }else{
        return {color:"#FFFFFF"}
    }
}
function Menu({history}) {
    return ( 
    <div className="sticky-top">
        <ul className="nav nav-tabs bg-dark ">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/"> Home</Link>
            </li>
            
           {!isAuthenticated() && (
             <Fragment>
             <li className="nav-item">
                 <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup"> SignUp</Link>
             </li>
             <li className="nav-item">
                 <Link  style={currentTab(history, "/signin")} className="nav-link" to="/signin"> SignIn</Link>
             </li>
             </Fragment>
           )}
           {isAuthenticated() && (
             <li className="nav-item">
             <span className="nav-link text-warning" onClick={
                ()=>{
                    signout(()=>{
                        history.push("/")
                    })
                }
             }>
              SignOut 
             </span>
            </li>
           )}

        </ul>
    </div> );
}

export default withRouter(Menu);// its goen pickup all the routes using Link from Routes.js 