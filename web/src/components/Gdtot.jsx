import { Card, Text, Grid, Loading } from "@geist-ui/react";
import { useSearchParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import config from "../config.json"
import { useNavigate } from "react-router-dom";
import Error from "./Error";


function Gdtot() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const link = searchParams.get('link')

    const { data, error } = useSWR(link && config.apiURL+"gdtot/"+searchParams.get("link"), fetcher);

    if (data) {
        if (data.code !== 200) {
            return <Error status={data.code} message={data.message}></Error>

        }
        navigate("/file/"+data.link)
    }

    return (
        <div style={{ display: "flex", alignItems: "center", height: "93%", backgroundColor: "#3b83f60e" }}>
            <Grid.Container justify="center">
                <Grid sm={8}>
                    <Card shadow width={"100%"}>
                <div style={{ padding: "12px", textAlign: "center" }}>
                    <Text h2>{config.cardHeading}</Text>
                    {(!data && !error)  ? <Loading>Loading...</Loading>: data.link}
                </div>
                </Card>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default Gdtot;
