import { Card, Text, Grid, Divider, Link, Loading, Select, useToasts, useClipboard } from "@geist-ui/react";
import { Copy, Download, ExternalLink } from "@geist-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import config from "../config.json";
import { humanFileSize } from "../utils/humanize";
import Cookies from "js-cookie";
import Error from "./Error";

function File() {
    const { fileId } = useParams();
    const [, setToast] = useToasts();
    const { copy } = useClipboard();
    const [server, setServer] = useState(config.servers[Cookies.get("_SELECTED_SERVER") || 0]);

    const { data, error } = useSWR(fileId && config.apiURL+"file/" + fileId, fetcher);

    const onServerChange = (val) => {
        Cookies.set("_SELECTED_SERVER", config.servers.indexOf(val), { expires: 365 });
        setServer(val);
    };
    const getDownloadURL = (data) => {
        return server + "/download?id=" + data.id + "&mac=" + data.token.base64Mac + "&expiry=" + data.token.expiry;
    };

    function copyText(text) {
        copy(text);
        setToast({ text: "Copied to Clipboard" });
    }

    if (error) {
            return <Error status={error.code} message={error.message}></Error>
    }

    return (
        <div style={{ display: "flex", alignItems: "center", height: "93%", backgroundColor: "#3b83f60e" }}>
            <Grid.Container justify="center">
                <Grid sm={8}>
                    <Card shadow width={"100%"}>
                        <div style={{ padding: "12px", textAlign: "center" }}>
                            {!data ? (
                                <>
                                    <Text h2>{config.cardHeading}</Text>
                                    <Loading>Loading...</Loading>
                                </>
                            ) : (
                                <>
                                    <Text h3 style={{ wordBreak: "break-all" }}>
                                        {data.name}
                                    </Text>
                                    <Text span style={{ opacity: 0.7 }}>
                                        {data.mimeType}
                                        <br />
                                        {data.modifiedTime}
                                    </Text>
                                    <Text h4>{humanFileSize(data.size)}</Text>
                                    <Divider mb={2} h={5}>
                                        Options
                                    </Divider>
                                    <Grid.Container gap={2} justify="center">
                                        <Grid>
                                            <Link href={getDownloadURL(data)}>
                                                <Download size={36}></Download>
                                            </Link>
                                        </Grid>
                                        <Grid>
                                            <Copy size={36} onClick={() => copyText(getDownloadURL(data))}></Copy>
                                        </Grid>
                                        <Grid>
                                            <ExternalLink size={36}></ExternalLink>
                                        </Grid>
                                    </Grid.Container>
                                    <Select type="secondary" initialValue={server} onChange={onServerChange}>
                                        {config.servers.map((val, index) => (
                                            <Select.Option value={val}>Server {index + 1}</Select.Option>
                                        ))}
                                    </Select>
                                </>
                            )}
                        </div>
                    </Card>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default File;
