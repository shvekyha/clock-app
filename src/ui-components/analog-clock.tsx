import {MutableRefObject, useEffect, useRef, useState} from "react";
import {ClockMode, draw, TimeFormat} from "../clock-utils";
import './analog-clock.css';

export interface AnalogClockProps {
    size: number,
    timeFormat?: TimeFormat,
    clockMode?: ClockMode
}

export const AnalogClock = (props: AnalogClockProps) => {

    const [ radius, setRadius] = useState(0);
    const [ drawingContext, setDrawingContext] = useState<CanvasRenderingContext2D>();
    const [ draw24hour, setDraw24hour] = useState(false);

    const clockCanvas : MutableRefObject<any> = useRef();

    const { size, timeFormat = TimeFormat.Mode24Hour, clockMode = ClockMode.Live } = props;

    const tick = (ctx: CanvasRenderingContext2D) => {
        const time = new Date();
        draw(ctx, radius, draw24hour, time);
    }

    useEffect( ()=> {
        if (drawingContext) {
            if (clockMode === ClockMode.Live) {
                const timerId = setInterval(() => tick(drawingContext), 1000);
                return () => {
                    clearInterval(timerId);
                }
            } else if (clockMode === ClockMode.Static){
                const time = new Date("2021/01/01 10:10:30");
                draw(drawingContext, radius, draw24hour, time);
            } else {
                draw(drawingContext, radius, draw24hour);
            }
        }
    }, [drawingContext, radius, draw24hour, clockMode, tick]);

    useEffect(() => {
        const radius = size / 2
        const drawingContext : CanvasRenderingContext2D = clockCanvas.current.getContext('2d');
        const draw24hour = timeFormat === TimeFormat.Mode24Hour;
        drawingContext.translate(radius, radius);
        setRadius(radius * 0.9);
        setDraw24hour(draw24hour);
        setDrawingContext(drawingContext);

    },[size, timeFormat]);

    return (
        <div className="analog-clock" style={{ width: `${size}px` }}>
            <canvas width={size} height={size} ref={clockCanvas}/>
        </div>
    );
}