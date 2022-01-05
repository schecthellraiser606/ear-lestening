import {memo, ReactNode, VFC} from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  children: ReactNode;
}

export const TopLayout: VFC<Props> = memo( (props)=> {
  const {children} = props;
  return(
    <SContainer>
      {children}
    </SContainer>
  );
});

const Animation = keyframes`
  0% {
    background-position: center;
  }
  50% {
    background-position: -2000px;
  }
  100% {
    background-position: center ;
  }
`

const SContainer = styled.div`
  background-image: 
    linear-gradient(to top, rgba(44, 251, 251, 0.4) 0%, 
    rgba(159, 250, 206, 0.3) 100%), 
    url("https://source.unsplash.com/bu-6kNWQj6U");
  background-size: contain;
  background-position: center;
	background-repeat: repeat-x;
  animation: ${Animation} 40s ease-in-out infinite;
`