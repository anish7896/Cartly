import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div className="min-h-screen bg-[#0b1120] text-white">

            <Nav />

            <div className="flex">
                <Sidebar />

                <main className="flex-1">
                    {/* Dashboard content */}
                </main>
            </div>

        </div>
    );
}

export default Home;