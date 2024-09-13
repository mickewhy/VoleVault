import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const ImageDetails = () => {
  const location = useLocation()
  const rodent = location.state

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [translateX, setTranslateX] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rodent.links.length)
    const activeImage = document.querySelector('.slideshow-image.active')
    setTranslateX(translateX - activeImage.offsetWidth)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + rodent.links.length) % rodent.links.length)
    const activeImage = document.querySelector('.slideshow-image.active')
    const imageIndex = Array.from(document.querySelectorAll('.slideshow-image')).indexOf(activeImage)
    const images = Array.from(document.querySelectorAll('.slideshow-image'))
    const prevIndex = (imageIndex - 1 + images.length) % images.length
    const prevImage = images[prevIndex]
    setTranslateX(translateX + prevImage.offsetWidth)
  }

  return (
    <div className="image-details">
      <div className="image-container" style={{ transform: `translateX(${translateX}px)` }}>
        {rodent?.links.map((link, index) => (
          <img
            key={index}
            src={link}
            alt={`${index + 1}`}
            className={index === currentImageIndex ? "slideshow-image active" : "slideshow-image inactive"}
          />
        ))}
      </div>
      <button className="prev" disabled={currentImageIndex === 0} onClick={handlePrevImage}>
        ←
      </button>
      <button className="next" disabled={currentImageIndex === rodent.links.length - 1} onClick={handleNextImage}>
        →
      </button>
    </div>
  )
}

export default ImageDetails