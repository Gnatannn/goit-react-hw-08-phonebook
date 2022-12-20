import { ThreeDots } from 'react-loader-spinner';
import { Wrapper } from 'components/Spinner/Spinner.styled';

export const Spinner = () => {
  return (
    <Wrapper>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Wrapper>
  );
};
