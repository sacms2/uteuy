import "./App.css";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Gdtot from "./components/Gdtot";
import File from "./components/File";
import Footer from "./components/Footer";

function App() {
    const [themeType, setThemeType] = useState(Cookies.get("__GIEST_THEME") || "light");

    const switchThemes = () => {
        setThemeType((last) => {
            let theme = last === "dark" ? "light" : "dark";
            Cookies.set("__GIEST_THEME", theme, { expires: 365 });
            return theme;
        });
    };

    return (
        <Router>
            <GeistProvider themeType={themeType}>
                <CssBaseline />
                <Navbar onSwitchTheme={switchThemes} themeType={themeType}></Navbar>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/gdtot" element={<Gdtot />}></Route>
                    <Route path="/file/:fileId" element={<File />}></Route>
                </Routes>
                <Footer></Footer>
            </GeistProvider>
        </Router>
    );
}

export default App;
