import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink).attrs(() => ({
  className: ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "",
}))``;

export default StyledNavLink;
