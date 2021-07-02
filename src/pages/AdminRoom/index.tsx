import { FC, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tooltip, Spinner, useToast } from "@chakra-ui/react";

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

import { Container, Header, Content } from "./styles";
import {
  ConfirmModal,
  ConfirmModalHandles,
} from "../../components/ConfirmModal";

interface ParamsProps {
  id: string;
}

export const AdminRoom: FC = () => {
  const params = useParams<ParamsProps>();
  const history = useHistory();
  const toast = useToast();

  const closeRoomModalRef = useRef<ConfirmModalHandles>(null);
  const deleteQuestionModalRef = useRef<ConfirmModalHandles>(null);

  const { isLoading, questions, title } = useRoom(params.id);

  const [isClosingRoom, setIsClosingRoom] = useState(false);
  const [isDeletingQuestion, setIsDeletingQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState("");

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
                  >
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
