import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer(
	(req: http.IncomingMessage, res: http.ServerResponse) => {
		const url = req.url || "/";
		const filePath = path.join(__dirname, url);

		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.statusCode = 404;
				res.setHeader("Content-Type", "text/plain");
				return res.end("Not Found");
			}

			const text = data.toString();

			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");

			res.write(`
      <html>
      <head><title>Text</title></head>
      <body><p>${text}</p></body>
      </html>
    `);
			res.end();
		});
	}
);

const port = 3000;
server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
