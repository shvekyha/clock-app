import {MutableRefObject, useEffect, useRef, useState} from "react";
import { draw, tick } from "../utils/clock-utils";
import {ClockMode, TimeFormat} from "../utils/types";
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

    useEffect(() => {
        const radius = size / 2
        const drawingContext : CanvasRenderingContext2D = clockCanvas.current.getContext('2d');
        const draw24hour = timeFormat === TimeFormat.Mode24Hour;
        drawingContext.translate(radius, radius);
        setRadius(radius * 0.9);
        setDraw24hour(draw24hour);
        setDrawingContext(drawingContext);

    },[size, timeFormat]);

    useEffect( ()=> {
        if (drawingContext) {
            if (clockMode === ClockMode.Live) {
                const timerId = setInterval(() => tick(drawingContext, radius, draw24hour), 1000);
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
    }, [drawingContext, radius, draw24hour, clockMode]);

    return (
        <div className="analog-clock" style={{ width: `${size}px` }}>
            <canvas width={size} height={size} ref={clockCanvas}/>
        </div>
    );
}