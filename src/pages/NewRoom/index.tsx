import { Link, useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/auth";

import { Container, LeftBox, RightBox } from "./styles";
import { useEffect } from "react";

export const NewRoom: React.FC = () => {
  const history = useHistory();
  const toast = useToast();

  const { user } = useAuth();

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

          <form>
            <input type="text" placeholder="Digite o nome da sala" />

            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </RightBox>
    </Container>
  );
};
