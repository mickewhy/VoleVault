import { useState } from "react"
import { useLocation } from "react-router-dom"
import { copyrightOptions } from "../components/RodentForm"
import { suborderCommonNames } from "./Collections"
import { familyCommonNames } from "./Taxa"

export const handleZoom = () => {
  const activeImage = document.querySelector('.popup-image')
  if (activeImage) {
    activeImage.classList.toggle('zoom')

    if (activeImage.classList.contains('zoom'))
      activeImage.addEventListener('mousemove', handleMouseMove)
    else {
      activeImage.removeEventListener('mousemove', handleMouseMove)
      activeImage.style.transform = 'none'
    }
  }
}

export const handlePopUp = () => {
  document.getElementById('light').style.display = 'flex'
  document.getElementById('fade').style.display = 'flex'
  document.querySelector('.popup-content').addEventListener('click', (event) => {
    if (event.target.className !== 'popup-image' && event.target.className !== 'popup-image zoom')
      closePopUp()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape')
      closePopUp()
  })
}

const closePopUp = () => {
  document.getElementById('light').style.display = 'none'
  document.getElementById('fade').style.display = 'none'
}

const handleMouseMove = (e) => {
  const activeImage = e.target
  const rect = activeImage.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const scale = 3
  const increment = 0.2
  const transform = `scale(${scale}) translate(${-1 * increment * (x - rect.width / 2)}px, ${-1 * increment * (y - rect.height / 2)}px)`
  activeImage.style.transform = transform
}

const ImageDetails = () => {
  const location = useLocation()
  const rodent = location.state
  const rodentCopyrightData = copyrightOptions.find(option => option.label === rodent.copyrightInfo)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    if (currentImageIndex === rodent.imageLinks.length - 1)
      setCurrentImageIndex(0)
    else
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rodent.imageLinks.length)
  }

  const handlePrevImage = () => {
    if (currentImageIndex === 0)
      setCurrentImageIndex(rodent.imageLinks.length - 1)
    else
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + rodent.imageLinks.length) % rodent.imageLinks.length)
  }

  return (
    <div className="slideshow">
      <div className="slideshow-details">
        <div className="slideshow-main">
          <div id="light" className="popup-content">
            <img
              className="popup-image"
              src={rodent.imageLinks[currentImageIndex]}
              alt={`${currentImageIndex + 1}`}
              onClick={handleZoom}
            />
            <button title="Close (Esc)" className="popup-close">
              <svg fill="white" x="0px" y="0px" width="20" height="20" viewBox="0 0 512 512">
                <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
              </svg>
            </button>
          </div>
          <div id="fade" className="popup-overlay"></div>
          <button type="button" onClick={handlePrevImage} className="slideshow-button" title="Previous Photo">
            <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
              <path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z">
              </path>
            </svg>
          </button>
          <div className="slideshow-container">
            <img
              className="slideshow-image"
              src={rodent.imageLinks[currentImageIndex]}
              alt={`${currentImageIndex + 1}`}
              onClick={handlePopUp}
            />
            <button onClick={() => {
              window.location.href = `https://creativecommons.org/share-your-work/cclicenses/`
            }} data-tippy={rodent.copyrightInfo ? "© " + rodent.user + ', ' + rodent.copyrightInfo + ' (' + rodentCopyrightData.displayText + ')' : "Copyright information not specified."} data-tippy-animate="fade" data-tippy-size="large" data-tippy-pos="up" className="copyright-button">©</button>
          </div>
          <button type="button" onClick={handleNextImage} className="slideshow-button" title="Next Photo">
            <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512">
              <path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z">
              </path>
            </svg>
          </button>
        </div>
        <div className="slideshow-thumbnails">
          {rodent.imageLinks.map((link, index) => (
            <div className="slideshow-thumbnail-wrapper" onClick={() => setCurrentImageIndex(index)}>
              <img className={index === currentImageIndex ? "active" : "inactive"} src={rodent.imageLinks[index]} alt={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="slideshow-information">
        <b className="slideshow-user">Submitted by: <span>{rodent.username}</span></b>
        <div className="slideshow-taxa">
          <b><em>↳</em> Suborder {rodent.suborder} <span>({suborderCommonNames[rodent.suborder]})</span></b>
          <b><em>↳</em> Family {rodent.family} <span>({familyCommonNames[rodent.family]})</span></b>
        </div>
        <hr className="rounded" />
        <h1>{rodent.binomialName}</h1>
        <h2>{rodent.commonName}</h2>
        <hr className="rounded" />
        <div className="slideshow-stacked">
          <>
            <b><span>Submitted:</span><br></br>{new Date(rodent.createdAt).toLocaleString('default', { month: 'short' }) + ' ' + new Date(rodent.createdAt).getDate() + ', ' + new Date(rodent.createdAt).getFullYear()}</b></>
          <>
            <b><span>Acquired:</span><br></br>{new Date(rodent.dateOfAcquisition).toLocaleString('default', { month: 'short' }) + ' ' + new Date(rodent.dateOfAcquisition).getDate() + ', ' + new Date(rodent.dateOfAcquisition).getFullYear()}</b></>
        </div>
        <div className="slideshow-information-section">
          <b><span>Sex:</span> {rodent.sex ? rodent.sex : 'Unknown'}</b>
          <b><span>Age:</span> {rodent.age ? rodent.age : 'Unknown'}</b>
          <b><span>Origin:</span> {rodent.origin[0] || rodent.origin[1] || rodent.origin[2] ? (rodent.origin[0] ? rodent.origin[0] + ' ' : '') + (rodent.origin[1] ? rodent.origin[1] + ' ' : '') + (rodent.origin[2] ? rodent.origin[2] : '') : 'Unknown'}</b>
          <b><span>Cause of Death:</span> {rodent.causeOfDeath ? rodent.causeOfDeath : 'Unknown'}</b>
          <b><span>Required Dimensions:</span> {rodent.dimensions[0][0] + 'mm'} {rodent.dimensions[0][1] + 'mm'} {rodent.dimensions[0][2] + 'mm'}</b>
          {(rodent.dimensions[1][0] || rodent.dimensions[1][1] || rodent.dimensions[1][2]) &&
            <b><span>Optional Dimensions:</span> {rodent.dimensions[1][0] + 'mm'} {rodent.dimensions[1][1] + 'mm'} {rodent.dimensions[1][2] + 'mm'}</b>}
          <b><span>Cleaning Method:</span> {rodent.cleaningMethod ? rodent.cleaningMethod : 'Unknown'}</b>
          <b><span>Notes:</span> {rodent.notes ? rodent.notes : 'N/A'}</b>
          <b><span>Credit:</span> {rodent.credit}</b>
        </div>
        <div className="slideshow-copyright">
          {rodent.copyrightInfo && (
            <>
              <img style={{ maxWidth: '90px', height: 'auto' }} src={rodentCopyrightData.image} alt={rodentCopyrightData.label} />
              <b>{"© " + rodent.user + ', ' + rodent.copyrightInfo}<span>{' (' + rodentCopyrightData.displayText + ')'}</span></b>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageDetails