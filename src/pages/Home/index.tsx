import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/auth";

import { Container, LeftBox, RightBox, Separator } from "./styles";

export const Home: React.FC = () => {
  const toast = useToast();
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth();

  const [isSigningWithGoogle, setIsSigningWithGoogle] = useState(false);

  async function handleCreateRoom(): Promise<void> {
    if (!user) {
      try {
        setIsSigningWithGoogle(true);

        await signInWithGoogle();
      } catch (error) {
        toast({
          title: "Ops, ocorreu um erro!",
          description: "Não foi possível entrar com sua conta do Google.",
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      } finally {
        setIsSigningWithGoogle(false);
      }
    }

    history.push("/rooms/new");
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

          <Button
            variant="danger"
            onClick={handleCreateRoom}
            isLoading={isSigningWithGoogle}
          >
            {!user ? (
              <>
                <img src={googleIconImg} alt="Logo do Google" />
                Crie sua sala com o Google
              </>
            ) : (
              "Criar minha sala"
            )}
          </Button>

          <Separator>ou entre em uma sala</Separator>

          <form>
            <input type="text" placeholder="Digite o código da sala" />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </RightBox>
    </Container>
  );
};
