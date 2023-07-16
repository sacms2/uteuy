const fetch = require("node-fetch");
const signRequest = require("./signRequest");

class GoogleDrive {
    constructor(client_id, client_secret, refresh_token) {
        this.config = {
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: refresh_token,
        };
        this.accessToken();
    }

    async fetchAccessToken() {
        const url = "https://www.googleapis.com/oauth2/v4/token";
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const post_data = {
            client_id: this.config.client_id,
            client_secret: this.config.client_secret,
            refresh_token: this.config.refresh_token,
            grant_type: "refresh_token",
        };

        let requestOption = {
            method: "POST",
            headers: headers,
            body: this.enQuery(post_data),
        };

        const response = await fetch(url, requestOption);
        return await response.json();
    }

    async accessToken() {
        if (this.config.expires == undefined || this.config.expires < Date.now()) {
            const obj = await this.fetchAccessToken();
            if (obj.access_token != undefined) {
                this.config.accessToken = obj.access_token;
                this.config.expires = Date.now() + 3500 * 1000;
            }
        }
        return this.config.accessToken;
    }

    async requestOption(headers = {}, method = "GET") {
        const accessToken = await this.accessToken();
        headers["authorization"] = "Bearer " + accessToken;
        return { method: method, headers: headers };
    }

    async getFileById(id) {
        if (id.length != 33 && id.length != 19) {
            throw {
                error: {
                    code: "400",
                    message: "Invalid Google Drive file/folder ID",
                },
            };
        }
        let url = `https://www.googleapis.com/drive/v3/files/${id}?fields=parents,id,name,mimeType,modifiedTime,createdTime,fileExtension,size&supportsAllDrives=true`;
        let requestOption = await this.requestOption();
        let res = await fetch(url, requestOption);
        if (res.status === 200) {
            return await this.parseFile(await res.json());
        } else {
            throw await res.json();
        }
    }

    async parseFile(file) {
        file.token = await signRequest(file.id);
        return file;
    }

    enQuery(data) {
        const ret = [];
        for (let d in data) {
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        }
        return ret.join("&");
    }
}

module.exports = GoogleDrive;
