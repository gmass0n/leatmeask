import { Container } from "./styles";

interface QuestionAuthor {
  name: string;
  avatar: string;
}

interface QuestionProps {
  content: string;
  author: QuestionAuthor;
}

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
}) => {
  return (
    <Container>
      <p>{content}</p>

      <footer>
        <div>
          <img src={author.avatar} alt={author.name} />

          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </Container>
  );
};
