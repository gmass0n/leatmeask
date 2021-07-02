import { Tooltip } from "@chakra-ui/react";
import React from "react";

import copyImg from "../../assets/images/copy.svg";

import { Container } from "./styles";

interface RoomCodeProps {
  code: string;
}

export const RoomCode: React.FC<RoomCodeProps> = ({ code }) => {
  function handleCopyRoomCodeToClipboard(): void {
    navigator.clipboard.writeText(code);
  }

  return (
    <Tooltip hasArrow label="Copiar código da sala">
      <Container type="button" onClick={handleCopyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>

        <span>Sala #{code}</span>
      </Container>
    </Tooltip>
  );
};
