import { useParams } from "react-router-dom";
import { appsData } from "../../data/appsData";
import { useEffect } from "react";

export default function FunctionalArea() {
    const { appCode, areaCode } = useParams();

    const app = appsData
        .flatMap((section) => section.apps)
        .find((item) => item.code === appCode);

    const area = app?.functionalAreas.find(
        (item) => item.code === areaCode
    );

    useEffect(() => {
        if (area?.url) {
            window.location.href = area.url;
        }
    }, [area]);

    return null;
}