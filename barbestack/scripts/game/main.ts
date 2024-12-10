import Ball from './ball';

// 型定義
type P5 = typeof import('p5');

class Main {
    private p5: InstanceType<P5>;
    private ball: Ball;

    constructor(p5: InstanceType<P5>) {
        this.p5 = p5;
        this.ball = new Ball(400, 300, 50);
    }

    setup() {
        this.p5.createCanvas(800, 600);
    }

    draw() {
        this.p5.background(0);
        this.ball.draw(this.p5);
    }
}

export default Main;