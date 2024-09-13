import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ImageDetails = () => {
  const location = useLocation()
  const rodent = location.state

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    if (currentImageIndex === rodent.links.length - 1)
      setCurrentImageIndex(0)
    else
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rodent.links.length)
  }

  const handlePrevImage = () => {
    if (currentImageIndex === 0)
      setCurrentImageIndex(rodent.links.length - 1)
    else
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + rodent.links.length) % rodent.links.length)
  }

  const handleZoom = () => {
    const activeImage = document.querySelector('.slideshow-image');
    if (activeImage) {
      activeImage.classList.toggle('zoom');

      if (activeImage.classList.contains('zoom')) {
        activeImage.addEventListener('mousemove', handleMouseMove);
      } else {
        activeImage.removeEventListener('mousemove', handleMouseMove);
        activeImage.style.transform = 'none';
      }
    }
  };

  const handleMouseMove = (e) => {
    const activeImage = e.target;
    const rect = activeImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scale = 3; // Adjust the scale as needed
    const increment = 0.2; // Adjust the increment value as needed
    const transform = `scale(${scale}) translate(${-1*increment * (x - rect.width / 2)}px, ${-1*increment * (y - rect.height / 2)}px)`;
    activeImage.style.transform = transform;
  };

  return (
    <div className="slideshow-image-details">
      <div className="slideshow-main">
        <button type="button" onClick={handlePrevImage} class="slideshow-button" title="Previous Photo">
          <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
            <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z">
            </path>
          </svg>
        </button>
        <img
          className="slideshow-image"
          src={rodent.links[currentImageIndex]}
          alt={`${currentImageIndex + 1}`}
          onClick={handleZoom}
        />
        <button type="button" onClick={handleNextImage} class="slideshow-button" title="Next Photo">
          <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
            <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z">
            </path>
          </svg>
        </button>
      </div>
      <div className="slideshow-thumbnails">
        {rodent?.links.map((link, index) => (
          <div className="slideshow-thumbnail-wrapper" onClick={() => setCurrentImageIndex(index)}>
            <img className={index === currentImageIndex ? "active" : "inactive"} src={rodent.links[index]} alt={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageDetails