import styled from 'styled-components'

export const Modal=styled.div`
 position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

background: rgba(0, 0, 0, .4);
display: flex;
justify-content: center;
align-items: center;
  
`
export const Content = styled.div`
max-width: 30rem;
background: #fff;
padding: 1em;
border-radius: 10px;
`
