import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function WHAMS() {

    const inputBox = useRef<HTMLInputElement | null>(null);


    const [count, setCount] = useState<number>(0)

    const count1 = useRef(0)

    function inc(){

        count1.current++
        console.log(count1)
    }

    console.log(count1)

useEffect(() => {
    //console.log("🟢 WHAMS EFFECT", window.location.pathname);
    console.log(count);

    inputBox.current?.focus();

    return () => {
        console.log("🔴 WHAMS CLEANUP");
    };
});




    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                WHAMS
            </h1>

            <p className="mt-2 text-gray-600">
                Welcome to WHAMS
            </p>

            <Link to="/dashboard/1">Path Change</Link>

            <hr />

            <button className="bg-amber-200 text-amber-950 border-2 p-2" onClick={()=>{setCount(x => x+1)}}>Increement</button>
              <button className="bg-amber-200 text-amber-950 border-2 p-2" onClick={inc}>Increement</button>

            <h1>Count {count}</h1>
             <h1>Count {count1.current}</h1>

            <input ref={inputBox} type="text"/>
        </div>
    );
}

export default WHAMS;