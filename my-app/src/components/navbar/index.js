import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './navbarElements';


// Source: https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />       

                <NavMenu>
                    <NavLink to='/sake' activeStyles>
                        Sake
                    </NavLink>
                    <NavLink to='/company' activeStyles>
                        Companies
                    </NavLink>
                    <NavLink to='/review' activeStyles>
                        Reviews
                    </NavLink>
                    <NavLink to='/reviewer' activeStyles>
                        Reviewers
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;