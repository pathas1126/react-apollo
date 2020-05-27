import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovsdsdsdie($id: Int!) {
    movie(id: $id) {
      id
      title_long
      medium_cover_image
      description_full
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  background: linear-gradient(150deg, #ee5253, #f368e0);
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h4`
  font-size: 45px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background: transparent;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  return (
    <Container>
      <Column>
        <Title>Name</Title>
        <Subtitle>English - 4.5</Subtitle>
        <Description>Lorem Ipsum blblalbalblalabla</Description>
      </Column>
      {!loading && <Poster></Poster>}
    </Container>
  );
};
