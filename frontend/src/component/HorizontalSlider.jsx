import React, { useRef, useEffect } from "react";

const HorizontalSlider = ({ children, style = {} }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleWheel = (e) => {
            // Проверяем, находится ли курсор над слайдером
            if (slider.matches(":hover")) {
                e.preventDefault();
                slider.scrollLeft += e.deltaY;
            }
        };

        slider.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            slider.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div
            ref={sliderRef}
            style={{
                display: "flex",
                overflowX: "auto",
                padding: "12px",
                backgroundColor: "#f0f0f0",
                gap: "10px",
                scrollBehavior: "smooth",
                // Скрываем scrollbar,
                ...style,
            }}
        >
            {React.Children.map(children, (child) => (
                <div style={{ flexShrink: 0 }}>{child}</div>
            ))}
        </div>
    );
};

export default HorizontalSlider;
