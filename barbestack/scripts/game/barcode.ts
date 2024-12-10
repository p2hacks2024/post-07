export const detectQRCode = async (canvas: HTMLCanvasElement): Promise<string[]> => {
  if (!canvas) {
    throw new Error("Canvas element is required for QR code detection.");
  }

  if (!('BarcodeDetector' in window)) {
    throw new Error("This browser does not support Barcode Detection API.");
  }

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error("Unable to get canvas context.");
  }

  // ここでは型定義を簡略化し、ネイティブの BarcodeDetector をそのまま使用
  const detector = new (window as any).BarcodeDetector({ formats: ['qr_code'] });

  try {
    const barcodes = await detector.detect(canvas);
    if (barcodes.length > 0) {
      return barcodes.map((barcode: any) => barcode.rawValue || "");
    } else {
      return [];
    }
  } catch (error) {
    const errorMessage = (error as Error).message || "QR code detection failed.";
    console.error("Error detecting QR codes:", errorMessage);
    throw new Error(errorMessage);
  }
};
