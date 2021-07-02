import { FC, FormEvent, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip, useToast, Spinner } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { QuestionButton } from "../../components/Question/styles";

import { useAuth } from "../../hooks/auth";
import { useRoom } from "../../hooks/room";

import { database } from "../../services/firebase";

import { Container, Header, Content } from "./styles";

interface ParamsProps {
  id: string;
}

export const Room: FC = () => {
  const params = useParams<ParamsProps>();

  const { user } = useAuth();
  const { isLoading, questions, title } = useRoom(params.id);

  const toast = useToast();

  const newQuestionRef = useRef<HTMLTextAreaElement>(null);

  const [isSendingNewQuestion, setIsSendingNewQuestion] = useState(false);

  async function handleSendNewQuestion(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      event.preventDefault();

      setIsSendingNewQuestion(true);

      const newQuestion = newQuestionRef.current?.value;

      if (!newQuestionRef.current || newQuestion?.trim() === "") return;

      if (!user) {
        toast({
          title: "Ops, ocorreu um imprevisto!",
          description: "Você precisa esta logado para criar uma nova pergunta.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      }

      const question = {
        content: newQuestion,
        author: {
          name: user!.name,
          avatar: user!.avatar,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${params.id}/questions`).push(question);

      newQuestionRef.current.value = "";
    } catch (error) {
      toast({
        title: "Ops, ocorreu um erro!",
        description: "Não foi possível criar uma nova pergunta.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsSendingNewQuestion(false);
    }
  }

  async function handleLikeUnlikeQuestion(
    questionId: string,
    likeId?: string
  ): Promise<void> {
    if (likeId) {
      await database
        .ref(`/rooms/${params.id}/questions/${questionId}/likes/${likeId}`)
        .remove();

      return;
    }

    await database
      .ref(`/rooms/${params.id}/questions/${questionId}/likes`)
      .push({
        authorId: user!.id,
      });
  }

  return (
    <Container>
      <Header>
        <div>
          <Tooltip hasArrow label="Volta para o início">
            <Link to="/">
              <img src={logoImg} alt="Letmeask" />
            </Link>
          </Tooltip>

          <RoomCode code={params.id} />
        </div>
      </Header>

      <main>
        <Content>
          {isLoading ? (
            <div className="loading-wrapper">
              <Spinner size="lg" thickness="3px" color="primary" />
            </div>
          ) : (
            <>
              <header>
                <div>
                  <h1>Sala {title}</h1>
                </div>

                {questions.length > 0 && (
                  <span>
                    {questions.length}{" "}
                    {questions.length === 1 ? "pergunta" : "perguntas"}
                  </span>
                )}
              </header>

              <form onSubmit={handleSendNewQuestion}>
                <textarea
                  placeholder="O que você quer perguntar?"
                  ref={newQuestionRef}
                />

                <footer>
                  {user ? (
                    <div>
                      <img src={user.avatar} alt={user.name} />

                      <span>{user.name}</span>
                    </div>
                  ) : (
                    <span>
                      Para enviar uma pergunta,{" "}
                      <button type="button">faça seu login</button>
                    </span>
                  )}

                  <Button
                    type="submit"
                    disabled={!user}
                    isLoading={isSendingNewQuestion}
                  >
                    Enviar pergunta
                  </Button>
                </footer>
              </form>

              <ul>
                {questions.map((question) => (
                  <Question
                    key={question.id}
                    author={question.author}
                    content={question.content}
                  >
                    <QuestionButton
                      variant="like"
                      aria-label="Marcar como gostei"
                      onClick={() =>
                        handleLikeUnlikeQuestion(question.id, question.likeId)
                      }
                      isActive={!!question.likeId}
                    >
                      <span>{question.likesCount}</span>

                      <Tooltip
                        hasArrow
                        label={question.likeId ? "Descurtir" : "Curtir"}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                            stroke="#737380"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Tooltip>
                    </QuestionButton>
                  </Question>
                ))}
              </ul>
            </>
          )}
        </Content>
      </main>
    </Container>
  );
};
