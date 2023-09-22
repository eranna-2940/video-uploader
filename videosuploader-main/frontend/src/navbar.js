import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {

    return (
        <>
            <nav>
                <div>
                    <h2 className="knl">
                        <span>ViDEoUpLodER</span>
                    </h2>
                </div>

                <div id="navlinks">
                    <NavLink className="anchor" to="/">
                        Login
                    </NavLink>

                    <NavLink className="anchor" to="/signup">
                        Signup
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
