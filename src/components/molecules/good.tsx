import {memo, VFC} from "react";
import styled from "styled-components";

type Prop ={
  good: number;
  onClick?: ()=>void ;
  status: boolean;
  disable: boolean;
}

export const GoodComponent: VFC<Prop>= memo( (prop)=> {
  const {good, onClick, status = false, disable = true} = prop

  const LikeButton = styled.button`
    background-color: ${status? `#FF99CC`: `#FF3333`};
    color: white;
    padding: 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;`

  return(
   <LikeButton onClick={onClick} disabled={disable}>♥ {good}</LikeButton>
  );
});