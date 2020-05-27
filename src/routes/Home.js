import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(150deg, #ee5253, #f368e0);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
`;

const SubTitle = styled.h2`
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
`;

const Loading = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.6);
`;

const GET_MOVIES = gql`
  query {
    movies(sort: "rating") {
      id
      medium_cover_image
    }
  }
`;

const Movies = styled.div`
  width: 70%;
  position: relative;
  top: -50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>React-Apollo 2020</Title>
        <SubTitle>I Love GraphQL</SubTitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((movie) => (
          <Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image} />
        ))}
      </Movies>
    </Container>
  );
};
