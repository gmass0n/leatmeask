import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { Tooltip, Spinner } from "@chakra-ui/react";

import logoImg from "../../assets/images/logo.svg";
import powerImg from "../../assets/images/power.svg";
import deleteImg from "../../assets/images/delete.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { QuestionButton } from "../../components/Question/styles";

import { useAuth } from "../../hooks/auth";
import { useRoom } from "../../hooks/room";

import { Container, Header, Content } from "./styles";
import { database } from "../../services/firebase";

interface ParamsProps {
  id: string;
}

export const AdminRoom: FC = () => {
  const params = useParams<ParamsProps>();

  const { user } = useAuth();
  const { isLoading, questions, title } = useRoom(params.id);

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

            <Button isOutlined>
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
    </Container>
  );
};
