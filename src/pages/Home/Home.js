import { HomeInfo, Greeting, GreetingInfo } from 'pages/Home/Home.styled';
import { useAuth } from 'hooks/useAuth';

export default function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <HomeInfo>
      <Greeting>Online Phonebook</Greeting>
      {isLoggedIn ? (
        <GreetingInfo>See your contats` info on eponymous page</GreetingInfo>
      ) : (
        <GreetingInfo>Please log in or arrange registration</GreetingInfo>
      )}
    </HomeInfo>
  );
}
