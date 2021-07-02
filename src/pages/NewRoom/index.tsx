import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/auth";

import { database } from "../../services/firebase";

import { Container, LeftBox, RightBox } from "./styles";

export const NewRoom: React.FC = () => {
  const { user } = useAuth();

  const history = useHistory();
  const toast = useToast();

  const newRoomRef = useRef<HTMLInputElement>(null);

  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Ops, ocorreu um imprevisto!",
        description: "Você precisa esta logado para criar uma nova sala.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });

      history.push("/");
    }
  }, [user, toast, history]);

  async function handleCreateRoom(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    try {
      setIsCreatingRoom(true);

      const newRoom = newRoomRef.current?.value;

      if (newRoom?.trim() === "") return;

      const roomRef = database.ref("rooms");

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user!.id,
      });

      history.push(`/rooms/${firebaseRoom.key}`);
    } catch (error) {
      toast({
        title: "Ops, ocorreu um erro!",
        description: "Não foi possível criar uma sala.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    } finally {
      setIsCreatingRoom(false);
    }
  }

  return (
    <Container>
      <LeftBox>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Toda pergunta tem uma resposta.</strong>

        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </LeftBox>

      <RightBox>
        <div>
          <img src={logoImg} alt="Letmeask" />

          <h2>Criar nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              ref={newRoomRef}
              placeholder="Digite o nome da sala"
            />

            <Button type="submit" isLoading={isCreatingRoom}>
              Criar sala
            </Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </RightBox>
    </Container>
  );
};
