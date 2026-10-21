
import type { card1Props } from "../CardGrid/Card.types"

const Card1 = (props: card1Props) => {

  return (
    <div className={`items-center justify-start flex border border-grey border-[#d8e1ec] bg-[#f8f9fc] rounded-2xl pt-5 pb-5 shadow-md`}>
      <div className="w-1/4 h-full flex items-center justify-center p-2 ">
        <div className={`${props.iconBackground} items-center flex  justify-center w-[50px] h-[50px] rounded-xl bg-blue-300 `}>
          {props.icon}
        </div>

      </div>

      <div className=" h-full">
        <div className="flex flex-col items-start justify-between gap-1">
          <h1 style={{ fontSize: props.titleFontSize, color: props.titleColor }} className="font-extrabold text-wrap" >{props.title}</h1>

          <p className={` ${props.valueFontSize} font-extrabold text-[#172a58]  text-[18px] text-wrap flex items-center`} > {props.valueIcon} <span>{props.value}</span></p>

          <div className="info flex ">
            <p style={{ fontSize: props.subTitleFontSize }} className="flex items-center text-wrap" >{props.subTitleIcon} {props.subtitle.join(' | ')}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card1
