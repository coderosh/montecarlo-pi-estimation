class Canvas {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor(selector: string) {
    this.canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    this.ctx = this.canvas.getContext("2d")!;

    this.reset();
  }

  reset() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.ctx.fillStyle = "#264653";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  circle(x: number, y: number, radius: number, color: string, width: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  rect(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    width: number
  ) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.strokeRect(x, y, w, h);
  }

  dot(x: number, y: number, radius: number, color: string) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Canvas;
