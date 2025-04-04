import Footer from "../Footer";
import Header from "../Header";
import SideMenu from "../SideMenu";

import './styles.css';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <SideMenu />
            <main className="layout-main">
                {children}
                <Footer />
            </main>
        </>
    );
}

export default Layout;