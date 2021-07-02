import React from "react";

import { Container } from "./styles";

interface QuestionAuthor {
  name: string;
  avatar: string;
}

interface QuestionProps {
  content: string;
  author: QuestionAuthor;
}

export const Question: React.FC<QuestionProps> = ({ content, author }) => {
  return (
    <Container>
      <p>{content}</p>

      <footer>
        <div>
          <img src={author.avatar} alt={author.name} />

          <span>{author.name}</span>
        </div>

        <ul></ul>
      </footer>
    </Container>
  );
};
