// 型定義
type P5 = typeof import('p5');

class CameraHandler {
    private video: ReturnType<InstanceType<P5>["createCapture"]> | null = null;

    constructor(private p: InstanceType<P5>) {
        const constraints = {
            video: {
                facingMode: { ideal: "environment" },
            },
        };

        this.video = this.p.createCapture(constraints, () => {
            console.log("Camera initialized successfully!");
        });

        this.video.size(this.p.width, this.p.height);
        this.video.hide();
    }

    public display(): void {
        if (this.video && this.video.elt instanceof HTMLVideoElement) {
            this.p.image(this.video, 0, 0, this.p.width, this.p.height);
        }
    }
}


export default CameraHandler;
