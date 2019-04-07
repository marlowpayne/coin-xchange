import React from "react";
import { Transition } from "react-transition-group";

const DURATION = 300;

const defaultStyle = {
  transition: `opacity ${DURATION}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 1 }
};

export const Pulse = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={DURATION}>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);
