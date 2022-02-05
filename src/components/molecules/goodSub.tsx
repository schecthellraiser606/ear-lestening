import {memo, VFC} from "react";
import styled from "styled-components";

type Prop ={
  good: number;
}

export const GoodSubComponent: VFC<Prop>= memo( (prop)=> {
  const {good} = prop

  const LikeButton = styled.div`
    background-color: #FF3333;
    color: white;
    padding: 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;`

  return(
   <LikeButton>♥ {good}</LikeButton>
  );
});