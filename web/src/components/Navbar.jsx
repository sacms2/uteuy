import config from "../config.json";
import { Text, Button, Link, Drawer } from "@geist-ui/react";
import { Sun, Moon } from "@geist-ui/icons";
import { useState } from "react";

function Navbar(props) {
    const [visible, setVisible] = useState(false);

    document.title = config.navHeading;

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/">
                <Text h2 ml={1} my={0} py={0}>
                    {config.navHeading}
                </Text>
            </Link>
            <Text span mr={1}>
                <Text small mr={1} onClick={() => setVisible("dmca")}>
                    DMCA
                </Text>
                <Text small mr={1} onClick={() => setVisible("about")}>
                    About Us
                </Text>
                <Button onClick={props.onSwitchTheme} iconRight={props.themeType === "dark" ? <Moon /> : <Sun />} auto scale={2 / 3} px={0.6} />
            </Text>
            <Drawer visible={visible ? true : false} onClose={() => setVisible(false)} height="70%" placement="bottom">
                {visible && (
                    <>
                        <Drawer.Title>{config.page[visible].title}</Drawer.Title>
                        <Drawer.Content>
                            <Text blockquote style={{ textAlign: "center" }}>
                                {config.page[visible].text}
                            </Text>
                        </Drawer.Content>
                    </>
                )}
            </Drawer>
        </div>
    );
}

export default Navbar;
