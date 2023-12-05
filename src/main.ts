import "./style.css";

import Canvas from "./canvas";
import { random } from "./utils";
import {
  piValue,
  totalValue,
  insideValue,
  colors,
  stopBtn,
  restartBtn,
} from "./constants";

class MonteCarloPI {
  public inside!: number;
  public total!: number;
  public radius!: number;
  public rect!: { x: number; y: number };
  public center!: { x: number; y: number };

  constructor(public cv: Canvas) {
    this.setup();
  }

  setup() {
    piValue.innerHTML = "";
    totalValue.innerHTML = "";
    insideValue.innerHTML = "";

    this.inside = 0;
    this.total = 0;

    this.cv.reset();

    const width = this.cv.canvas.width;
    const height = this.cv.canvas.height;

    this.radius = Math.min(width, height) / 4;

    this.center = { x: width / 2, y: height / 2 + 50 };

    this.rect = {
      x: this.center.x - this.radius,
      y: this.center.y - this.radius,
    };

    const len = this.radius * 2;
    this.cv.rect(this.rect.x, this.rect.y, len, len, colors.rect, 3);
    this.cv.circle(this.center.x, this.center.y, this.radius, colors.circle, 3);
  }

  drawPin(radius: number) {
    const len = this.radius * 2;

    const x = random(this.rect.x, this.rect.x + len);
    const y = random(this.rect.y, this.rect.y + len);

    const isInside = this.isInsideCircle(x, y);

    if (isInside) this.inside++;
    this.total++;

    const color = isInside ? colors.circle : colors.rect;

    this.cv.dot(x, y, radius, color);
  }

  isInsideCircle(x: number, y: number) {
    return (
      (x - this.radius - this.rect.x) ** 2 +
        (y - this.radius - this.rect.y) ** 2 <=
      this.radius ** 2
    );
  }

  run(radius: number) {
    let handle: number;

    handle = setInterval(() => {
      this.drawPin(radius);
      this.calculate();
    }, 0);

    return () => clearInterval(handle);
  }

  calculate() {
    const val =
      this.total === 0 ? "" : (4 * (this.inside / this.total)).toFixed(8);
    piValue.innerHTML = val;

    totalValue.innerHTML = this.total.toString();
    insideValue.innerHTML = this.inside.toString();
  }
}

function main() {
  const dotRadius = 2;

  const monteCarloPi = new MonteCarloPI(new Canvas("canvas"));

  monteCarloPi.setup();

  let stop: Function | null = null;

  stopBtn.addEventListener("click", () => {
    if (stop) {
      stop();
      stopBtn.innerHTML = "Play";
      stop = null;
    } else {
      stop = monteCarloPi.run(dotRadius);
      stopBtn.innerHTML = "Stop";
    }
  });

  restartBtn.addEventListener("click", () => {
    stop?.();
    monteCarloPi.setup();
    stop = monteCarloPi.run(dotRadius);
  });
}

main();
