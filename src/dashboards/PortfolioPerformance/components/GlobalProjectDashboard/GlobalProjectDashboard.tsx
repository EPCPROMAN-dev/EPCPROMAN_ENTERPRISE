import { useEffect, useRef } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import { projectLocations } from "./projectLocations";

import "./GlobalProjectDashboard.css";

const COLORS = {
    low: "#20A464",
    medium: "#F3A51D",
    high: "#EF6B39",
    critical: "#DB3545",
    selected: "#3867F5",
};

function getProjectColor(count: number): string {
    if (count <= 5) {
        return COLORS.low;
    }

    if (count <= 20) {
        return COLORS.medium;
    }

    if (count <= 50) {
        return COLORS.high;
    }

    return COLORS.critical;
}

function getMarkerSize(count: number): number {
    if (count <= 5) {
        return 20;
    }

    if (count <= 20) {
        return 27;
    }

    if (count <= 50) {
        return 35;
    }

    return 43;
}

function GlobalProjectDashboard() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<am4maps.MapChart | null>(null);
    const imageSeriesRef = useRef<am4maps.MapImageSeries | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        const map = am4core.create(
            mapContainerRef.current,
            am4maps.MapChart
        );

        mapRef.current = map;

        map.geodata = am4geodata_worldLow;
        map.projection = new am4maps.projections.Miller();

        map.homeZoomLevel = 1.1;
        map.homeGeoPoint = {
            latitude: 20,
            longitude: 10,
        };

        map.maxZoomLevel = 8;
        map.panBehavior = "move";

        const zoomControl = new am4maps.ZoomControl();

        zoomControl.align = "right";
        zoomControl.valign = "middle";
        zoomControl.marginRight = 15;
        zoomControl.marginTop = 60;

        map.zoomControl = zoomControl;

        const polygonSeries = map.series.push(
            new am4maps.MapPolygonSeries()
        );

        polygonSeries.useGeodata = true;

        const polygonTemplate =
            polygonSeries.mapPolygons.template;

        polygonTemplate.fill = am4core.color("#E6EBF1");
        polygonTemplate.stroke = am4core.color("#FFFFFF");
        polygonTemplate.strokeWidth = 0.7;
        polygonTemplate.nonScalingStroke = true;

        polygonTemplate.events.on("over", (event) => {
            event.target.fill = am4core.color("#D8E1EC");
        });

        polygonTemplate.events.on("out", (event) => {
            event.target.fill = am4core.color("#E6EBF1");
        });

        const imageSeries = map.series.push(
            new am4maps.MapImageSeries()
        );

        imageSeriesRef.current = imageSeries;

        projectLocations.forEach((location) => {
            const image: any = imageSeries.mapImages.create();

            image.latitude = location.latitude;
            image.longitude = location.longitude;
            image.name = location.name;

            const circle = image.createChild(am4core.Circle);

            circle.radius =
                getMarkerSize(location.ongoing) / 2;

            circle.fill = am4core.color(
                getProjectColor(location.ongoing)
            );

            circle.fillOpacity = 0.95;
            circle.stroke = am4core.color("#FFFFFF");
            circle.strokeWidth = 3;
            circle.nonScalingStroke = true;

            const label = image.createChild(am4core.Label);

            label.text = String(location.ongoing);
            label.horizontalCenter = "middle";
            label.verticalCenter = "middle";
            label.fontSize = 10;
            label.fontWeight = "700";
            label.fill = am4core.color("#FFFFFF");
            label.nonScaling = true;

            image.tooltipText =
                "[bold]{name}[/]\n" +
                `${location.country}\n\n` +
                `Ongoing Projects: ${location.ongoing}\n` +
                `Completed Projects: ${location.completed}`;

            image.events.on("over", () => {
                circle.scale = 1.15;
            });

            image.events.on("out", () => {
                circle.scale = 1;
            });

            image.events.on("hit", () => {
                map.zoomToMapObject(
                    image,
                    4,
                    true
                );

                imageSeries.mapImages.each((otherImage) => {
                    const otherCircle =
                        otherImage.children.getIndex(0);

                    if (!otherCircle) {
                        return;
                    }

                    if (otherImage === image) {
                        otherCircle.stroke =
                            am4core.color(COLORS.selected);

                        otherCircle.strokeWidth = 5;
                        otherCircle.scale = 1.12;
                    } else {
                        otherCircle.stroke =
                            am4core.color("#FFFFFF");

                        otherCircle.strokeWidth = 3;
                        otherCircle.scale = 1;
                    }
                });
            });
        });

        return () => {
            map.dispose();

            mapRef.current = null;
            imageSeriesRef.current = null;
        };
    }, []);

    function handleCloseDetails() {
        if (mapRef.current) {
            mapRef.current.goHome();
        }

        const imageSeries = imageSeriesRef.current;

        if (!imageSeries) {
            return;
        }

        imageSeries.mapImages.each((image) => {
            const circle = image.children.getIndex(0);

            if (!circle) {
                return;
            }

            circle.stroke = am4core.color("#FFFFFF");
            circle.strokeWidth = 3;
            circle.scale = 1;
        });
    }

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                handleCloseDetails();
            }
        }

        document.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, []);

    return (
        <div className="global-project-dashboard">
            <main className="gpd-main">
                <section className="gpd-map-container">
                    <div
                        ref={mapContainerRef}
                        className="gpd-map"
                    />

                    <div className="gpd-legend">
                        <div className="gpd-legend-title">
                            Ongoing Projects
                        </div>

                        <div className="gpd-legend-items">
                            <div className="gpd-legend-item">
                                <span className="gpd-legend-dot gpd-green" />
                                <span>1 - 5</span>
                            </div>

                            <div className="gpd-legend-item">
                                <span className="gpd-legend-dot gpd-yellow" />
                                <span>6 - 20</span>
                            </div>

                            <div className="gpd-legend-item">
                                <span className="gpd-legend-dot gpd-orange" />
                                <span>21 - 50</span>
                            </div>

                            <div className="gpd-legend-item">
                                <span className="gpd-legend-dot gpd-red" />
                                <span>51+</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default GlobalProjectDashboard;