import { Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import Explosion from "../../assets/explosion2.gif";
import * as S from "./styles";

const BattleLoader = ({ open, pokemon1, pokemon2, onClose }) => {
  const [battling, setBattling] = useState(false);
  useEffect(() => {
    if (open) {
      setBattling(true);
      const timeOutId = setTimeout(() => {
        setBattling(false);
      }, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [open]);
  if (!open) return null;
  const explosions=[ <Image src={Explosion} w={"20em"} />, <Image src={Explosion} w={"20em"} />, <Image src={Explosion} w={"20em"} />, <Image src={Explosion} w={"20em"} />]
  return (
    <S.Modal onClick={(e) => (e.target === e.currentTarget ? onClose() : null)}>
      {battling && explosions}
      {!battling && (
        <S.Content>
          {pokemon1.totalStats > pokemon2.totalStats && (
            <div>
              <Text align={"center"} fontFamily={"Flexo-Demi"} fontSize="2xl">
                O vencedor é...
              </Text>
              <Image src={pokemon1.image} />
              <Text align={"center"} fontFamily={"Flexo-Demi"} fontSize="4xl">
                {pokemon1.name.toUpperCase()}
              </Text>
            </div>
          )}
          {pokemon1.totalStats < pokemon2.totalStats && (
            <div>
              <Text align={"center"} fontFamily={"Flexo-Demi"} fontSize="2xl">
                O vencedor é...
              </Text>
              <Image src={pokemon2.image} />
              <Text align={"center"} fontFamily={"Flexo-Demi"} fontSize="4xl">
                {pokemon2.name.toUpperCase()}
              </Text>
            </div>
          )}
          {pokemon1.totalStats === pokemon2.totalStats && (
            <Text align={"center"} fontFamily={"Flexo-Demi"} fontSize="4xl">
              EMPATE
            </Text>
          )}
        </S.Content>
      )}
    </S.Modal>
  );
};

export default BattleLoader;
