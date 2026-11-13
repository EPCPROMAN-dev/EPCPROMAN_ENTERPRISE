import type { ReactNode } from "react";

export type card1Props = {
  title: string,
  value: string,
  valueIcon?: ReactNode,
  subtitle: string[],
  icon?: ReactNode,
  iconBackground: string,
  titleColor: string,
  valueFontSize: string,
  titleFontSize: string,
  subTitleFontSize: string,
  subTitleIcon?: ReactNode,
}

export type card2Props = {
  title: string,
  value: string,
  valueIcon?: ReactNode | null,
  subtitle?: string[] | null,
  icon?: ReactNode | null,
  iconBackground: string,  
  subCard? : subCard[] | null,
  bTColor :string,
  // iconBgRounded : boolean,
}


export type subCard = {
  label :string,
  value : string,
}

export type cardGridProps = {
      cardDesign: "cardDesign1";
      data: card1Props[];
    }
  | {
      cardDesign: "cardDesign2";
      data: card2Props[];
    };




