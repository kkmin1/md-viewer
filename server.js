const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const host = '127.0.0.1';
const port = Number.parseInt(process.env.PORT || '8080', 10);
const rootDir = path.resolve(__dirname, '..');

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8'
};

function send(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
    res.writeHead(statusCode, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store'
    });
    res.end(body);
}

function safePathFromUrl(urlPath) {
    const pathname = decodeURIComponent(new URL(urlPath, `http://${host}:${port}`).pathname);
    const normalized = path.normalize(path.join(rootDir, pathname));
    if (!normalized.startsWith(rootDir)) return null;
    return normalized;
}

const server = http.createServer((req, res) => {
    const targetPath = safePathFromUrl(req.url || '/');
    if (!targetPath) {
        send(res, 403, 'Forbidden');
        return;
    }

    let filePath = targetPath;
    try {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) filePath = path.join(filePath, 'index.html');
    } catch {
        send(res, 404, 'Not Found');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            send(res, 500, error.message);
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        send(res, 200, data, mimeTypes[ext] || 'application/octet-stream');
    });
});

server.listen(port, host, () => {
    const viewerUrl = `http://${host}:${port}/md-viewer/index.html`;
    const exampleUrl = `${viewerUrl}?file=/converter/glm.md`;
    console.log(`Serving ${rootDir}`);
    console.log(`Viewer:  ${viewerUrl}`);
    console.log(`Example: ${exampleUrl}`);
});
