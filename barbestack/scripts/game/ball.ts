// 型定義
type P5 = typeof import('p5');

class Ball {
    private posX: number;
    private posY: number;
    private radius: number;

    constructor(posX: number, posY: number, radius: number) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
    }

    draw(p5: InstanceType<P5>) {
        p5.fill(255);
        p5.circle(this.posX, this.posY, this.radius);
    }
}

export default Ball;