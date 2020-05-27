import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title_long
      medium_cover_image
      language
      rating
      description_full
    }
    suggestions(id: $id) {
      id
      medium_cover_image
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
  width: 40%;
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
  font-size: 20px;
`;

const Poster = styled.div`
  width: 30%;
  height: 70%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading...." : data.movie.title_long}</Title>
        <Subtitle>
          {data?.movie?.language} - 🌟{data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_full}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
