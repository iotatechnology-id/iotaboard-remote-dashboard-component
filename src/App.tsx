import React from "react";
import { Title } from "./components/Title";

// TODO: define remote component type definition
export interface AppProps {
  name: string
}

export const App: React.FC<AppProps> = ({ name = "World" }) => {
  return <Title>Hello {name}!</Title>;
};
