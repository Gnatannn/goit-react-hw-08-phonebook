import { useAuth } from 'hooks/useAuth';
import { Nav, StyledNavLink } from 'components/Navigation/Navigation.styled';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Nav>
      <StyledNavLink to="/">Home</StyledNavLink>
      {isLoggedIn && <StyledNavLink to="/contacts">Contacts</StyledNavLink>}
    </Nav>
  );
};
