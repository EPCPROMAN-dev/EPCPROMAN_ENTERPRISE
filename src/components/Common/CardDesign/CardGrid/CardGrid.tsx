
import Card1 from "../CardDesign1/Card1";
import Card2 from "../CardDesign2/Card2";

import type { cardGridProps } from "./Card.types";

const CardGrid = (props: cardGridProps) => {
  if (props.cardDesign === "cardDesign1") {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {props.data.map((item, index) => (
          <Card1
            key={index}
            {...item}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {props.data.map((item, index) => (
        <Card2
          key={index}
          {...item}
        />
      ))}
    </div>
  );
};

export default CardGrid;
