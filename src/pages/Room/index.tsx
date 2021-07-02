import { useParams } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";

import { Container, Header, Content } from "./styles";

interface ParamsProps {
  id: string;
}

export const Room: React.FC = () => {
  const params = useParams<ParamsProps>();

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
          <h1>Sala React</h1>

          <span>4 perguntas</span>
        </header>

        <form>
          <textarea placeholder="O que você quer perguntar?" />

          <footer>
            <span>
              Para enviar uma pergunta,{" "}
              <button type="button">faça seu login</button>
            </span>

            <Button type="submit">Enviar pergunta</Button>
          </footer>
        </form>
      </Content>
    </Container>
  );
};
