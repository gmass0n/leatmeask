import { FC, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Tooltip,
  Spinner,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
} from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";
import powerImg from "../../assets/images/power.svg";
import deleteImg from "../../assets/images/delete.svg";
import closeImg from "../../assets/images/close.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { QuestionButton } from "../../components/Question/styles";

import { useRoom } from "../../hooks/room";

import { database } from "../../services/firebase";

import { Container, Header, Content, CloseRoomModalContent } from "./styles";

interface ParamsProps {
  id: string;
}

export const AdminRoom: FC = () => {
  const params = useParams<ParamsProps>();
  const history = useHistory();
  const toast = useToast();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const { isLoading, questions, title } = useRoom(params.id);

  const [isClosingRoom, setIsClosingRoom] = useState(false);
  const [isCloseRoomModalOpen, setIsCloseRoomModalOpen] = useState(false);

  async function handleCloseRoom(): Promise<void> {
    try {
      setIsClosingRoom(true);

      await database.ref(`rooms/${params.id}`).update({
        closedAt: new Date(),
      });

      history.push("/");
    } catch (error) {
      toast({
        title: "Ops, ocorreu um erro!",
        description: "Não foi possível encerrar essa sala.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });

      setIsClosingRoom(false);
    }
  }

  function handleOpenCloseRoomModal(): void {
    setIsCloseRoomModalOpen(true);
  }

  function handleCloseCloseRoomModal(): void {
    setIsCloseRoomModalOpen(false);
  }

  async function handleDeleteQuestion(questionId: string): Promise<void> {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
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

          <div>
            <RoomCode code={params.id} />

            <Button isOutlined onClick={handleOpenCloseRoomModal}>
              <img src={powerImg} alt="Sign out" />
              <span>Encerrar sala</span>
            </Button>
          </div>
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

              <ul>
                {questions.map((question) => (
                  <Question
                    key={question.id}
                    author={question.author}
                    content={question.content}
                  >
                    <Tooltip hasArrow label="Remover">
                      <QuestionButton
                        onClick={() => handleDeleteQuestion(question.id)}
                        aria-label="Remover pergunta"
                      >
                        <img src={deleteImg} alt="Remover pergunta" />
                      </QuestionButton>
                    </Tooltip>
                  </Question>
                ))}
              </ul>
            </>
          )}
        </Content>
      </main>

      <AlertDialog
        isOpen={isCloseRoomModalOpen}
        onClose={handleCloseCloseRoomModal}
        leastDestructiveRef={cancelRef}
        size="xl"
        motionPreset="slideInBottom"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <CloseRoomModalContent>
              <img src={closeImg} alt="Remove question" />

              <h1>Encerrar sala</h1>

              <p>Tem certeza que você deseja encerrar esta sala?</p>

              <div>
                <Button ref={cancelRef} onClick={handleCloseCloseRoomModal}>
                  Cancelar
                </Button>

                <Button
                  variant="danger"
                  onClick={handleCloseRoom}
                  isLoading={isClosingRoom}
                >
                  Sim, encerrar
                </Button>
              </div>
            </CloseRoomModalContent>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};
