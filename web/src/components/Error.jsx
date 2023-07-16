import { Card, Text, Grid, Button } from "@geist-ui/react";
import { Link } from "react-router-dom";

function Error(props) {
    return (
        <div style={{ display: "flex", alignItems: "center", height: "93%", backgroundColor: "#3b83f60e" }}>
            <Grid.Container justify="center">
                <Grid sm={8}>
                    <Card shadow width={"100%"}>
                        <div style={{ padding: "12px", textAlign: "center" }}>
                            <Text h1>{props.status}</Text>
                            <Text h3>{props.message}</Text>
                            <Link to="/">
                                <Button type="secondary">Go Home</Button>
                            </Link>
                        </div>
                    </Card>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default Error;
