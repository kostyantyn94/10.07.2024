import { exec } from "child_process";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
	return res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

const server = http.createServer(app);

const io = new SocketIOServer(server);

io.on("connection", (socket: Socket) => {
	console.log("a user connected:", socket.id);

	socket.on("runCommand", (command: string) => {
		if (command.startsWith("ls")) {
			exec(command, (error, stdout, stderr) => {
				if (error) {
					socket.emit("commandOutput", {
						status: "error",
						message: `Ошибка: ${error.message}`,
					});
					return;
				}

				if (stderr) {
					socket.emit("commandOutput", {
						status: "error",
						message: `Ошибка: ${stderr}`,
					});
					return;
				}

				socket.emit("commandOutput", stdout);
			});
		} else {
			socket.emit("commandOutput", {
				status: "error",
				message: "Only ls command is allowed",
			});
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
