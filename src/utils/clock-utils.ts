export const draw = (ctx: CanvasRenderingContext2D, radius: number, draw24hour: boolean, time?: Date, missingNumbers?: number[]) => {
    drawClock(ctx, radius, draw24hour, missingNumbers);
    if (time) {
        drawTime(ctx, radius, time, true);
    }
}

export const tick = (ctx: CanvasRenderingContext2D, radius: number, draw24hour: boolean) => {
    const time = new Date();
    draw(ctx, radius, draw24hour, time);
}

const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.beginPath();
    ctx.arc(0,0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

const drawNumbers = (
    ctx: CanvasRenderingContext2D, 
    radius: number, 
    draw24hour: boolean, 
    missingNumbers?: number[]
) => {
    const fontBig = radius * 0.15 + "px Arial";
    const fontSmall = radius * 0.075 + "px Arial";
    let ang: any;
    let num: number;

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.78);
        ctx.rotate(-ang);
        ctx.font = fontBig;
        ctx.fillStyle = "black";
        if (!missingNumbers?.find(item => item === num)){
            ctx.fillText(num.toString(), 0, 0);
        }
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.78);
        ctx.rotate(-ang);

        // Draw inner numerals for 24 hour time format
        if (draw24hour) {
            ctx.rotate(ang);
            ctx.translate(0, -radius * 0.60);
            ctx.rotate(-ang);
            ctx.font = fontSmall;
            ctx.fillStyle = "red";
            ctx.fillText((num + 12).toString(), 0, 0);
            ctx.rotate(ang);
            ctx.translate(0, radius * 0.60);
            ctx.rotate(-ang);
        }
    }

    // Write author text
    ctx.font = fontSmall;
    ctx.fillStyle = "#3D3B3D";
    ctx.translate(0, radius * 0.30);
    ctx.translate(0, -radius * 0.30);
}

const drawTicks = (ctx: CanvasRenderingContext2D, radius: number) => {
    let numTicks, tickAng, tickX, tickY;

    for (numTicks = 0; numTicks < 60; numTicks++) {

        tickAng = (numTicks * Math.PI / 30);
        tickX = radius * Math.sin(tickAng);
        tickY = -radius * Math.cos(tickAng);

        ctx.beginPath();
        ctx.lineWidth = radius * 0.010;
        ctx.moveTo(tickX, tickY);
        if (numTicks % 5 === 0) {
            ctx.lineTo(tickX * 0.88, tickY * 0.88);
        } else {
            ctx.lineTo(tickX * 0.92, tickY * 0.92);
        }
        ctx.stroke();
    }
}

const drawTime = (ctx: CanvasRenderingContext2D, radius: number, time: Date, drawSeconds: boolean) => {
    const now = time;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // hour
    hour %= 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.05);
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.05);
    if (drawSeconds) {
        // second
        second = (second * Math.PI / 30);
        drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");
    }
}

const drawHand = (ctx: CanvasRenderingContext2D, position: number, length: number, width:number, color?:string) => {
    color = color || "black";
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-position);
}

const drawClock = (ctx: CanvasRenderingContext2D, radius: number, draw24hour: boolean, missingNumbers?: number[]) => {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius, draw24hour, missingNumbers);
    drawTicks(ctx, radius);
}