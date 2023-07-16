import { Card, Text, Grid, Spacer, Input, Button } from "@geist-ui/react";
import { ChevronRight } from "@geist-ui/icons";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Gdtot() {
    const navigate = useNavigate();
    let input;
    const onInputChange = (event) => {
        input = event.target.value;
        console.log(event.target.value);
    };

    const onFormSubmit = async (event) => {
        event.preventDefault();
        navigate("/gdtot?link=" + input);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", height: "93%", backgroundColor: "#3b83f60e" }}>
            <Grid.Container justify="center">
                <Grid sm={8}>
                    <Card shadow width={"100%"}>
                        <form style={{ padding: "12px", textAlign: "center" }} onSubmit={onFormSubmit}>
                            <Text h2>{config.cardHeading}</Text>
                            <Input type="success" inputMode="url" width="100%" onChange={onInputChange} required>
                                <Text h4>Scrape new link</Text>
                            </Input>
                            <Spacer></Spacer>
                            <Button htmlType="submit" width="100%" iconRight={<ChevronRight />} type="success">
                                Submit
                            </Button>
                        </form>
                    </Card>
                </Grid>
            </Grid.Container>
        </div>
    );
}

export default Gdtot;
