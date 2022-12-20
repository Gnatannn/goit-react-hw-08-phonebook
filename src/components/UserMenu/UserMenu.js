import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

import {
  Greeting,
  RegisterInfo,
  LogButton,
  UserName,
} from 'components/UserMenu/UserMenu.styled';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <RegisterInfo>
      <Greeting>
        Welcome, &nbsp; <UserName>{user.name}</UserName>
      </Greeting>
      <LogButton type="button" onClick={() => dispatch(logOut())}>
        Logout
      </LogButton>
    </RegisterInfo>
  );
};
