import React from "react";
import styled from "styled-components";
import StyledLink from "../UI/Link/Link";

const NavbarWrapper = styled.div`
  align-self: center;
  justify-self: end;
  grid-column: 2/-1;
  grid-row: 1/2;

  a {
    color: var(--color-white);
  }

  @media only screen and (max-width: 425px) {
    justify-self: center;
  }
`;
const Navbar = () => {
  return (
    <NavbarWrapper>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/signup">Sign Up</StyledLink>
    </NavbarWrapper>
  );
};

export default Navbar;
