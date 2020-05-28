import React from "react";
import { useParams, Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

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
  min-height: 100vh;
  width: 100%;
  color: white;
  background: linear-gradient(150deg, #ee5253, #f368e0);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.div`
  width: 100%;
  min-height: 50rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  width: 400px;
  height: 550px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const SuggestionsWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuggestionsTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
`;

const Suggestions = styled.div`
  margin: 2rem auto;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  console.log(data);
  return (
    <Container>
      <Article>
        <Column>
          <Title>{loading ? "Loading...." : data.movie.title_long}</Title>
          <Subtitle>
            {data?.movie?.language} - 🌟{data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_full}</Description>
        </Column>
        {!loading && <Poster bg={data?.movie?.medium_cover_image}></Poster>}
      </Article>
      <SuggestionsWrapper>
        {!loading && (
          <>
            <SuggestionsTitle>Suggestions</SuggestionsTitle>
            <Suggestions>
              {data?.suggestions?.map((suggestion) => (
                <Movie
                  key={suggestion.id}
                  id={suggestion.id}
                  bg={suggestion.medium_cover_image}
                />
              ))}
            </Suggestions>
          </>
        )}
      </SuggestionsWrapper>
    </Container>
  );
};
