import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="layout-main">
                {children}
                <Footer />
            </main>
        </>
    );
}

export default Layout;