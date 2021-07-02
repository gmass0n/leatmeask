import { FC, FormEvent, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip, useToast, Spinner } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { useAuth } from "../../hooks/auth";

import { database } from "../../services/firebase";

import { Container, Header, Content } from "./styles";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/room";

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
                  />
                ))}
              </ul>
            </>
          )}
        </Content>
      </main>
    </Container>
  );
};
