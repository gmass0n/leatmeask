import avatarImg from "../../assets/images/avatar.svg";

import { Container } from "./styles";

interface QuestionAuthor {
  name: string;
  avatar: string;
}

interface QuestionProps {
  content: string;
  author: QuestionAuthor;
  isHighlighted?: boolean;
  isAnswered?: boolean;
}

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false,
}) => {
  return (
    <Container isHighlighted={isHighlighted} isAnswered={isAnswered}>
      <p>{content}</p>

      <footer>
        <div>
          <img src={avatarImg} alt={author.name} />

          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </Container>
  );
};
