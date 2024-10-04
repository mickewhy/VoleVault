import { useNavigate } from "react-router-dom"

export const suborderCommonNames = {
    "Anomaluromorpha": "Anomalures and Springhares",
    "Castorimorpha": "Beavers, Pocket Gophers, and Allies",
    "Hystricomorpha": "Ctenohystricans",
    "Myomorpha": "Mice, Rats, and Hamsters",
    "Sciuromorpha": "Squirrels, Dormice, and Mountain Beavers",
}

const Collections = () => {
    const navigate = useNavigate()

    return (
        <div className="collections-image-grid">
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/anomaluromorpha')}>
                <img src="/Anomaluromorpha.png" alt="Anomaluromorpha" className="image" />
                <p className="collections-image-overlay">{suborderCommonNames["Anomaluromorpha"]}</p>
                <p><b>Anomaluromorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/castorimorpha')}>
                <img src="/Castorimorpha.png" alt="Castorimorpha" className="image" />
                <p className="collections-image-overlay">{suborderCommonNames["Castorimorpha"]}</p>
                <p><b>Castorimorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/hystricomorpha')}>
                <img src="/Hystricomorpha.png" alt="Hystricomorpha" className="image" />
                <p className="collections-image-overlay">{suborderCommonNames["Hystricomorpha"]}</p>
                <p><b>Hystricomorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/myomorpha')}>
                <img src="/Myomorpha.png" alt="Myomorpha" className="image" />
                <p className="collections-image-overlay">{suborderCommonNames["Myomorpha"]}</p>
                <p><b>Myomorpha</b></p>
            </div>
            <div className="collections-image-wrapper"
                onClick={() => navigate('/collections/sciuromorpha')}>
                <img src="/Sciuromorpha.png" alt="Sciuromorpha" className="image" />
                <p className="collections-image-overlay">{suborderCommonNames["Sciuromorpha"]}</p>
                <p><b>Sciuromorpha</b></p>
            </div>
        </div>
    )
}

export default Collections