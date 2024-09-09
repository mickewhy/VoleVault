import { useNavigate } from "react-router-dom"

const Collections = () => {
    const navigate = useNavigate()

    return (
        <div className="collections-image-grid">
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/anomaluromorpha')}>
                <img src="https://cdn.discordapp.com/attachments/932866678126161960/1244917657212555335/Myomorpha.png?ex=66dc02ea&is=66dab16a&hm=c9105221aac770488e054a4ef8a17c7718113a6f51e5bfe5aab7778eef1ea723&" alt="Anomaluromorpha" className="image" />
                <p className="collections-image-overlay">Anomalures and Springhares</p>
                <p><b>Anomaluromorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/castorimorpha')}>
                <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279476151582780/Castorimorpha.png?ex=66dc0d37&is=66dabbb7&hm=fb16efc46e334c745d9fbf9c3d40599d435b17f7f1ff40b00e5068b2ffb46fe8&" alt="Castorimorpha" className="image" />
                <p className="collections-image-overlay">Beavers, Pocket Gophers, and Allies</p>
                <p><b>Castorimorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/hystricomorpha')}>
                <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279422602776596/Hystricomorpha.png?ex=66dc0d2b&is=66dabbab&hm=fda1137df82174d74eed32ed12aa4a2195723a08ce514e5504616d5531de4e57&" alt="Hystricomorpha" className="image" />
                <p className="collections-image-overlay">Ctenohystricans</p>
                <p><b>Hystricomorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/myomorpha')}>
                <img src="https://cdn.discordapp.com/attachments/932866678126161960/1244917657212555335/Myomorpha.png?ex=66dc02ea&is=66dab16a&hm=c9105221aac770488e054a4ef8a17c7718113a6f51e5bfe5aab7778eef1ea723&" alt="Myomorpha" className="image" />
                <p className="collections-image-overlay">Mice, Rats, and Hamsters</p>
                <p><b>Myomorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/sciuromorpha')}>
                <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279357557637120/Sciuromorpha.png?ex=66dc0d1b&is=66dabb9b&hm=4951d9104607e10d2ce8ab966429ef7d5e3ca65343fbe35cd4e850a5380979c6&" alt="Sciuromorpha" className="image" />
                <p className="collections-image-overlay">Squirrels, Dormice, and Mountain Beavers</p>
                <p><b>Sciuromorpha</b></p>
            </div>
        </div>
    );
};

export default Collections;