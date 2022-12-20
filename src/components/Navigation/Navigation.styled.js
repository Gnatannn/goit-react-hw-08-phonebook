import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Nav = styled.nav`
  margin-right: auto;
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 30px;
  font-weight: 700;
  color: green;
  margin-left: 20px;
  margin-right: 20px;

  &.active {
    color: #035162;
  }

  :hover:not(.active),
  :focus-visible:not(.active) {
    color: #1461c0;
  }
`;
