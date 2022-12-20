import { StyledNavLink } from 'components/Navigation/Navigation.styled';

export const AuthNav = () => {
  return (
    <div>
      <StyledNavLink to="/register">Register</StyledNavLink>
      <StyledNavLink to="/login">Log In</StyledNavLink>
    </div>
  );
};
