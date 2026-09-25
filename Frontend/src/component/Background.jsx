import background1 from "../assets/background1.jpeg";
import background2 from "../assets/background2.jpeg";
import background3 from "../assets/background3.jpeg";
import background4 from "../assets/background4.jpeg";

function Background({ heroCount }) {

    const backgrounds = [
        background2,
        background1,
        background3,
        background4
    ];

    return (
        <img
            src={backgrounds[heroCount]}
            alt="Cartly collection"
            className="w-full h-full object-cover object-center"
        />
    );
}

export default Background;