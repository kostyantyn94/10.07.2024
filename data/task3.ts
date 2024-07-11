const drawArea = document.getElementById("drawArea") as HTMLCanvasElement;
const context = drawArea.getContext("2d") as CanvasRenderingContext2D;
const clearCanvasButton = document.getElementById(
	"clearCanvas"
) as HTMLButtonElement;
let drawing: boolean = false;

function saveImageToStorage(): void {
	localStorage.setItem("savedDrawing", drawArea.toDataURL());
}

function loadImageFromStorage(): void {
	const savedImage = localStorage.getItem("savedDrawing");
	if (savedImage) {
		const image = new Image();
		image.src = savedImage;
		image.onload = () => {
			context.drawImage(image, 0, 0);
		};
	}
}

drawArea.addEventListener("mousedown", () => {
	drawing = true;
	context.beginPath();
});

drawArea.addEventListener("mousemove", (event: MouseEvent) => {
	if (drawing) {
		const rect = drawArea.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		context.lineTo(x, y);
		context.stroke();
	}
});

drawArea.addEventListener("mouseup", () => {
	drawing = false;
	saveImageToStorage();
});

clearCanvasButton.addEventListener("click", () => {
	context.clearRect(0, 0, drawArea.width, drawArea.height);
	localStorage.removeItem("savedDrawing");
});

loadImageFromStorage();
