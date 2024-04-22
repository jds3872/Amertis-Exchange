import { StaticImageData } from "next/image";

export interface IToken {
  ca: string;
  name: string;
  ticker: string;
  icon: StaticImageData;
  decimals: number;
}

export interface ITokenList {
  [chainId: number]: IToken[];
}
