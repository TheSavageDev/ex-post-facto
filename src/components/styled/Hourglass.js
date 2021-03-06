import React from 'react'
import styled from 'styled-components'

const Animation = styled.div`
  display: inline-block;
  position: relative;
  width: 0;
  height: 0;
  top: 30%;
  left: 50%;

  &.-isLoading {
    background: var(--db-bs);
  }

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid var(--yellow-hex);
    border-color: var(--yellow-hex) var(--black-hex) var(--yellow-hex) var(--black-hex);
    animation: lds-hourglass 1.2s infinite;
  }

  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`

const Hourglass = () => <Animation></Animation>

export default Hourglass
