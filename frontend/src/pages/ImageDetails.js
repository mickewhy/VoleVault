import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ImageDetails = () => {
    const location = useLocation();
    const rodent = location.state;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (rodent) {
            // Initialize currentImageIndex based on the URL query parameter (if any)
            const queryParams = new URLSearchParams(window.location.search);
            const initialIndex = queryParams.get('imageIndex');
            if (initialIndex !== null) {
                setCurrentImageIndex(parseInt(initialIndex));
            }
        }
    }, [rodent]);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rodent.links.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + rodent.links.length) % rodent.links.length);
    };

    return (
        <div className="image-details">
            <h2>{rodent?.commonName}</h2>
            <div className="image-container">
                <img
                    src={rodent?.links[currentImageIndex]}
                    alt={rodent?.family}
                    onMouseEnter={() => console.log("Hover")} // Replace with actual hover logic
                    onMouseLeave={() => console.log("Leave Hover")} // Replace with actual leave logic
                />
                <button className="prev-button" onClick={handlePrevImage}>
                    <i className="fas fa-chevron-left"></i> {/* Replace with left arrow icon */}
                </button>
                <button className="next-button" onClick={handleNextImage}>
                    <i className="fas fa-chevron-right"></i> {/* Replace with right arrow icon */}
                </button>
            </div>
            <div className="rodent-info">
                <p>Binomial Name: {rodent?.binomialName}</p>
                <p>Dimensions: {rodent?.dimensions}</p>
            </div>
        </div>
    );
};

export default ImageDetails;