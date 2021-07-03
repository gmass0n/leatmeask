import { FC, useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tooltip, Spinner, useToast } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";
import powerImg from "../../assets/images/power.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import closeImg from "../../assets/images/close.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { QuestionButton } from "../../components/Question/styles";
import {
  ConfirmModal,
  ConfirmModalHandles,
} from "../../components/ConfirmModal";

import { useRoom } from "../../hooks/room";
import { useAuth } from "../../hooks/auth";

import { database } from "../../services/firebase";

import { Container, Header, Content } from "./styles";
interface ParamsProps {
  id: string;
}

export const AdminRoom: FC = () => {
  const { user } = useAuth();

  const params = useParams<ParamsProps>();
  const history = useHistory();
  const toast = useToast();

  const closeRoomModalRef = useRef<ConfirmModalHandles>(null);
  const deleteQuestionModalRef = useRef<ConfirmModalHandles>(null);

  const { isLoading, questions, title, authorId } = useRoom(params.id);

  const [isClosingRoom, setIsClosingRoom] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState("");

  useEffect(() => {
    if (!isLoading && user!.id !== authorId) {
      toast({
        title: "Ops, ocorreu um imprevisto!",
        description: "Você não tem acesso à essa página.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });

      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, authorId, user?.id]);

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

  function handleOpenDeleteQuestionModal(questionId: string): void {
    setCurrentQuestionId(questionId);
    deleteQuestionModalRef.current?.open();
  }

  async function handleCheckQuestionAsAnswered(
    questionId: string
  ): Promise<void> {
    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function toggleIsHighlightedQuestion(
    questionId: string,
    isHighlighted: boolean
  ): Promise<void> {
    if (isHighlighted) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
        isHighlighted: false,
      });

      return;
    }

    await database.ref(`rooms/${params.id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(): Promise<void> {
    try {
      setIsDeletingQuestion(true);

      await database
        .ref(`rooms/${params.id}/questions/${currentQuestionId}`)
        .remove();

      setCurrentQuestionId("");
      deleteQuestionModalRef.current?.close();
    } catch (error) {
      toast({
        title: "Ops, ocorreu um erro!",
        description: "Não foi possível remover essa pergunta.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsDeletingQuestion(false);
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

            <Button isOutlined onClick={closeRoomModalRef.current?.open}>
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
                    isHighlighted={question.isHighlighted}
                    isAnswered={question.isAnswered}
                  >
                    {!question.isAnswered && (
                      <>
                        <Tooltip hasArrow label="Marcar como respondida">
                          <QuestionButton
                            onClick={() =>
                              handleCheckQuestionAsAnswered(question.id)
                            }
                            aria-label="Marcar pergunta como respondida"
                          >
                            <img
                              src={checkImg}
                              alt="Marcar pergunta como respondida"
                            />
                          </QuestionButton>
                        </Tooltip>

                        <Tooltip
                          hasArrow
                          label={
                            question.isHighlighted
                              ? "Remover destaque"
                              : "Destacar"
                          }
                        >
                          <QuestionButton
                            onClick={() =>
                              toggleIsHighlightedQuestion(
                                question.id,
                                question.isHighlighted
                              )
                            }
                            isActive={question.isHighlighted}
                            aria-label="Dar destaque à pergunta"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z"
                                stroke="#737380"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </QuestionButton>
                        </Tooltip>
                      </>
                    )}

                    <Tooltip hasArrow label="Remover">
                      <QuestionButton
                        onClick={() =>
                          handleOpenDeleteQuestionModal(question.id)
                        }
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

      <ConfirmModal
        ref={closeRoomModalRef}
        isConfirming={isClosingRoom}
        icon={closeImg}
        onConfirm={handleCloseRoom}
        title="Encerrar sala"
        description="Tem certeza que você deseja encerrar esta sala?"
        confirmText="Sim, encerrar"
      />

      <ConfirmModal
        ref={deleteQuestionModalRef}
        isConfirming={isDeletingQuestion}
        icon={closeImg}
        onConfirm={handleDeleteQuestion}
        title="Remover pergunta"
        description="Tem certeza que você deseja remover essa pergunta?"
        confirmText="Sim, remover"
      />
    </Container>
  );
};
