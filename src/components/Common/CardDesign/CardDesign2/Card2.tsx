import type { card2Props } from '../CardGrid/Card.types'

const Card2 = (props: card2Props) => {
  const isFourCards = props.subCard?.length === 4;

  const cols : Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  }

  return (
    <div
      style={{ borderTopColor: props.bTColor }}
      className="border border-[#d8e1ec] border-t-4 bg-[#f8f9fc] rounded-xl shadow-md py-2  flex flex-col justify-between h-[10vw] max-h-80 min-h-32"
    >
      {/* Header */}
      <div className={` ${isFourCards ? 'px-2' : 'px-3'}   w-full flex items-start justify-between`}>
        <h1 className="text-[#5c6f87] font-extrabold text-[11px]">
          {props.title}
        </h1>

        <div
          style={{ backgroundColor: props.iconBackground }}
          className={`flex items-center justify-center w-[23px] h-[23px] rounded-full z-10 text-[10px]`}
        >

          {props.icon}
        </div>
      </div>

      <div className="px-3">
        {/* Show main value only when there are no sub cards */}
        {!isFourCards && props.value && (
          <p className="font-extrabold text-[#102b52] text-[18px] flex items-center">
            {props.valueIcon}
            <span>{props.value}</span>
          </p>
        )}

        {props.subtitle ? (
          <p className="flex items-center text-[10px] text-[#6a7b91] mt-1">
            {props.subtitle}
          </p>
        ) : props.subCard?.length ? (
          <div
            className={`grid w-full ${isFourCards
              ? "grid-cols-2 gap-1 mt-1 "
              : `${cols[props.subCard?.length]}  gap-1 mt-3 `
              }`}
          >
            {props.subCard.map((item, index) => (
              <div
                key={index}
                className="bg-[#f6f8fb] border border-[#e9eef4] px-2 py-1 rounded-md"
              >
                <p className="text-[8px] text-[#6a7b91] leading-tight">
                  {item.label}
                </p>

                <p className="text-[13px] text-[#102b52] font-extrabold leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

      </div>
    </div>
  )
}

export default Card2
