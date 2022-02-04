import React from "react"
import { Image } from "@chakra-ui/react"
import footerImage from "../../assets/footer.jpg"

const Footer = () => {
  return (
    <Image
      alt="Gramado e logo labedex"
      src={footerImage}
      w={"100%"}
      h={"100%"}
      objectFit="cover"
    />
  )
}

export default Footer
