import { FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { useAuth } from "../../hooks/auth";

import { Container, Header, Content } from "./styles";
import { database } from "../../services/firebase";

interface ParamsProps {
  id: string;
}

export const Room: React.FC = () => {
  const { user } = useAuth();

  const params = useParams<ParamsProps>();
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
          <img src={logoImg} alt="Letmeask" />

          <RoomCode code={params.id} />
        </div>
      </Header>

      <Content>
        <header>
          <div>
            <h1>Sala React</h1>
          </div>

          <span>4 perguntas</span>
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
      </Content>
    </Container>
  );
};
