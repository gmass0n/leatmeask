import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tooltip, useToast, Spinner } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { useAuth } from "../../hooks/auth";

import { database } from "../../services/firebase";

import { Container, Header, Content } from "./styles";

interface QuestionAuthor {
  name: string;
  avatar: string;
}

interface Question {
  id: string;
  author: QuestionAuthor;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

type FirebaseQuestions = Record<string, Omit<Question, "id">>;

interface FirebaseRoom {
  questions: FirebaseQuestions;
  authorId: string;
  title: string;
}

interface ParamsProps {
  id: string;
}

export const Room: FC = () => {
  const { user } = useAuth();

  const params = useParams<ParamsProps>();
  const history = useHistory();
  const toast = useToast();

  const newQuestionRef = useRef<HTMLTextAreaElement>(null);

  const [isSendingNewQuestion, setIsSendingNewQuestion] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [roomQuestions, setRoomQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`);

    roomRef.on("value", (snapshot) => {
      const firebaseRoom = snapshot.val() as FirebaseRoom | null;

      if (!firebaseRoom || !firebaseRoom.authorId) {
        toast({
          title: "Ops, ocorreu um imprevisto!",
          description: "A sala que você está tentando acessar não existe.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });

        history.push("/");
        return;
      }

      const firebaseQuestions = firebaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          } as Question;
        }
      );

      setIsLoadingRoom(false);
      setRoomTitle(firebaseRoom.title);
      setRoomQuestions(parsedQuestions);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

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
          {isLoadingRoom ? (
            <div className="loading-wrapper">
              <Spinner size="lg" thickness="3px" color="primary" />
            </div>
          ) : (
            <>
              <header>
                <div>
                  <h1>Sala {roomTitle}</h1>
                </div>

                {roomQuestions.length > 0 && (
                  <span>
                    {roomQuestions.length}{" "}
                    {roomQuestions.length === 1 ? "pergunta" : "perguntas"}
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
            </>
          )}
        </Content>
      </main>
    </Container>
  );
};
