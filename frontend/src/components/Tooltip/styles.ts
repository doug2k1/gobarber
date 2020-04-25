import styled from 'styled-components'
import { secondaryColor, bgColor } from '../../styles/vars'

export const Container = styled.div`
  position: relative;

  span {
    color: ${bgColor};
    background: ${secondaryColor};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: 0.4s;
    width: 160px;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translate(-50%, 10px);
    visibility: hidden;

    &::before {
      content: '';
      border-style: solid;
      border-color: ${secondaryColor} transparent transparent;
      border-width: 6px;
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translate(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
`
