import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const TOGGLE_LIKE_MOVIE = gql`
  mutation ToggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 380px;
  width: 100%;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default ({ id, bg, isLiked }) => {
  const [toggleLikeMovie] = useMutation(TOGGLE_LIKE_MOVIE, {
    variables: { id: parseInt(id), isLiked },
  });

  return (
    <Container>
      <Link
        to={{
          pathname: `/${id}`,
          state: {
            isLiked,
          },
        }}
      >
        <Poster bg={bg} />
      </Link>
      <span
        style={{ color: "red", cursor: "pointer" }}
        onClick={toggleLikeMovie}
      >
        {isLiked ? "♥" : "♡"}
      </span>
    </Container>
  );
};
