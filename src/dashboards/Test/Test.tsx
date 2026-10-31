import { GoProject } from "react-icons/go";
import { RiBarChartBoxAiLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";

// import Card from "../../components/Common/CardDesign/CardDesign1/Card";
// import CardGrid from "../../components/Common/CardDesign/CardGrid/CardGrid";
import CardGrid from "../../components/Common/CardDesign/CardGrid/CardGrid"
import { useMemo, useState } from "react";


 const user1 = {

        name: "Pankaj"
    }

function Test() {


    const stats = [
        {
            title: "TOTAL PROJECTS",
            value: "31",
            valueIcon: null,
            subtitle: ["16 Ongoing" ,"10 Upcoming " ,  "4 Completed"],
            icon: <GoProject size={30} color="white" />,            
            iconBackground: "bg-[linear-gradient(135deg,#245bd0,#0c2b76)]",
            titleColor: "#1d449c",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
            subTitleIcon : null
        },
        {
            title: "APPROVED COST",
            value: ` 87,992 Cr`,
            valueIcon: <FaRupeeSign  />,
            subtitle: ["Ongoing: ₹46,636 Cr "," Upcoming: ₹29,037 Cr"],
            icon: <RiBarChartBoxAiLine size={30} color="white" />,
            iconBackground: "bg-[linear-gradient(135deg,#1c8d6e,#07553f)]",
            titleColor: "#276c55",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
            subTitleIcon : <IoTriangle size={9} color="#28754c" />

        },
        {
            title: "TOTAL MRs RAISED",
            value: "620",
            valueIcon: <FaRupeeSign />,
            subtitle: ["12.5% vs Apr 2024"],
            icon: <RiBarChartBoxAiLine size={30} color="white" />,
            iconBackground: "bg-[linear-gradient(135deg,#ec4899,#9d174d)]",
            titleColor: "#9d174d",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
            subTitleIcon : <IoTriangle size={9} color="#28754c" />

        },
        {
            title: "TOTAL PROJECTS",
            value: "31",
            valueIcon: <FaRupeeSign />,
            subtitle: ["16 Ongoing ","10 Upcoming"," 4 Completed"],
            icon: <GoProject size={30} color="white" />,
            iconBackground: "bg-[linear-gradient(135deg,#ef4444,#991b1b)]",
            titleColor: "#d3211b",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
             subTitleIcon : <IoTriangle size={9} color="#28754c" />
        },
        
        {
            title: "TOTAL PROJECTS",
            value: "31",
            valueIcon: <FaRupeeSign />,
            subtitle: ["16 Ongoing"," 10 Upcoming "," 4 Completed"],
            icon: <GoProject size={30} color="white" />,
            iconBackground: "bg-[linear-gradient(135deg,#8b5cf6,#5b21b6)]",
            titleColor: "#5b21b6",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
             subTitleIcon : <IoTriangle size={9} color="#28754c" />

        },
        {
            title: "TOTAL MRs RAISED",
            value: "620",
            valueIcon: <FaRupeeSign />,
            subtitle: ["12.5% vs Apr 2024"],
            icon: <RiBarChartBoxAiLine size={30} color="white" />,
            iconBackground: "bg-[linear-gradient(135deg,#f97316,#c2410c)]",
            titleColor: "#c75b15",
            valueFontSize: "text-lg sm:text-xl md:text-2xl",
            titleFontSize: "10px",
            subTitleFontSize: "9px",
             subTitleIcon : <IoTriangle size={9} color="#28754c" />

        },
    ];

    const card2Data = [       
        {
            title: "Cost",
            value: "3,49,986 Cr",
            valueIcon: <FaRupeeSign size={16} />,            
            subtitle: null,
            icon: <GoProject color="#119b91" />,            
            iconBackground: "#e9f7f5",        
            // subCard : [{label : "Ongoing" , value:"30"}, {label : "Upcoming" , value:"30"}, {label : "Completeds" , value:"30"}],
            subCard : [{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},],
            bTColor:"#119b91" ,
            // iconBgRounded : true 
        },
        {
            title: "Cost",           
            value: "",            
            valueIcon: null,
            subtitle: null,
            icon: <LiaRupeeSignSolid color="#df7a00" />,            
            iconBackground: "#fff1df",        
            // subCard : [{label : "Ongoing" , value:"30"}, {label : "Upcoming" , value:"30"}, {label : "Completeds" , value:"30"}],
            subCard : [{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},],
            bTColor:"#df7a00" ,
            // iconBgRounded : true 
        },
        {
            title: "Cost",
            value: "3,49,986 Cr",            
            valueIcon: <FaRupeeSign size={16} />,
            subtitle: null,
            icon: <GoProject color="#119b91" />,            
            iconBackground: "#e9f7f5",        
            // subCard : [{label : "Ongoing" , value:"30"}, {label : "Upcoming" , value:"30"}, {label : "Completeds" , value:"30"}],
            subCard : [{label : "Ongoing" , value:"30"},],
            bTColor:"#119b91" ,            
        },
        {
            title: "Cost",
            value: "3,49,986 Cr",            
            valueIcon: <FaRupeeSign size={16} />,
            subtitle: null,
            icon: <GoProject color="#119b91" />,            
            iconBackground: "#e9f7f5",        
            // subCard : [{label : "Ongoing" , value:"30"}, {label : "Upcoming" , value:"30"}, {label : "Completeds" , value:"30"}],
            subCard : [{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},{label : "Ongoing" , value:"30"},],
            bTColor:"#119b91" ,            
        },
        {
            title: "Cost",
            value: "3,49,986 Cr",
            valueIcon: <FaRupeeSign size={16} />,
            subtitle: ["hello"],
            icon: <GoProject color="#df7a00" />,            
            iconBackground: "#fff1df",        
            subCard : null,
            bTColor:"#df7a00"  ,
        },
         {
            title: "Contract Value",
            value: "120.00 Cr",
            valueIcon: <FaRupeeSign  />,
            subtitle: ["Commercial baseline"],
            icon: <GoProject color="#1769c2" />,            
            iconBackground: "#eaf2fc",   
            subCard : null,      
            bTColor:"#1769c2"  ,
            // iconBgRounded : false 
        },
    ]



    const [count, setCount] = useState<number>(0)
    


   


    const search = useMemo(()=>{


        console.log("useMemo Hit!!!!!!!!!!!!!!!!")

        return `UseMemo Hit ${count}`



    },[user1])

     


    return (
        <div className="p-6 space-y-2">
            <h1 className="text-2xl font-bold">
                TEST BACKGROUND
            </h1>

            <button onClick={()=> {setCount(count + 1)}}>+</button>

            <h1>{search} {count}</h1>


            <CardGrid data={stats} cardDesign="cardDesign1" />

            <CardGrid data={card2Data} cardDesign="cardDesign2" />
        </div>
    );
}

export default Test;