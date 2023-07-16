require("dotenv").config();
var argv = require("minimist")(process.argv.slice(2));

const HOST = argv.host || process.env.HOST;
const PORT = argv.port || process.env.PORT;
if (!HOST || !PORT) {
    throw Error(`Setup 'host' and 'port' settings.`);
}

const compression = require("compression");
const express = require("express");
const app = express();
const GoogleDrive = require("./lib/gdrive");
const gdrive = new GoogleDrive(process.env.GDRIVE_CLIENT_ID, process.env.GDRIVE_CLIENT_SECRET, process.env.GDRIVE_REFRESH_TOKEN);
const GDToT = require("./lib/gdtot");

app.use(compression());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    console.log(`${req.method} ${req.path}`);
    next();
});

app.get("/api/file/:id", async (req, res) => {
    try {
        const folderId = req.params.id;
        const files = await gdrive.getFileById(folderId);
        res.send(files);
    } catch (e) {
        const code = e.error.code;
        res.status(parseInt(code, 10)).send({
            message: e.error.message,
            code: e.error.code,
        });
    }
});

app.get("/api/gdtot/*", async (req, res) => {
    const gdtotUrl = req.params[0];
    try {
        let link = await GDToT(gdtotUrl);
        res.send({
            code: 200,
            link: link,
        });
    } catch (e) {
        res.status(400).send({
            code: 400,
            message: e.message,
        });
    }
});

app.use("/static", express.static("web/build/static"));

app.get("/favicon.ico", (req, res) => res.sendFile("web/build/favicon.ico", { root: __dirname }));

app.get("/", (req, res) => {
    res.sendFile("web/build/index.html", { root: __dirname });
});
  
app.all("*", (req, res) => res.sendFile("web/build/index.html", { root: __dirname }));

app.listen(PORT, HOST, () =>
          console.log(`> Listining on http://${HOST}:${PORT}`)
      );