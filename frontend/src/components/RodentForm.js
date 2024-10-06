import { useState } from 'react'
import OptionMenu from './OptionMenu'
import { handleZoom, handlePopUp } from '../pages/ImageDetails'
import { useAuthContext } from '../hooks/useAuthContext'

export const copyrightOptions = [
    {
        label: 'No Copyright',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png',
        displayText: 'CC0',
    },
    {
        label: 'Attribution',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png',
        displayText: 'CC-BY',
    },
    {
        label: 'Attribution-NonCommercial',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.png',
        displayText: 'CC-BY-NC',
    },
    {
        label: 'Attribution-NonCommercial-ShareAlike',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png',
        displayText: 'CC-BY-NC-SA',
    },
    {
        label: 'Attribution-NonCommercial-NoDerivs',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png',
        displayText: 'CC-BY-NC-ND',
    },
    {
        label: 'Attribution-NoDerivs',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png',
        displayText: 'CC-BY-ND',
    },
    {
        label: 'Attribution-ShareAlike',
        image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png',
        displayText: 'CC-BY-SA',
    },
]

const suborderOptions = [
    {
        label: 'Anomaluromorpha',
    },
    {
        label: 'Castorimorpha',
    },
    {
        label: 'Hystricomorpha',
    },
    {
        label: 'Myomorpha',
    },
    {
        label: 'Sciuromorpha',
    },
]

const sexOptions = [
    {
        label: 'Male',
    },
    {
        label: 'Female',
    },
    {
        label: 'Unspecified',
    },
]

const ageOptions = [
    {
        label: 'Juvenile',
    },
    {
        label: 'Subadult',
    },
    {
        label: 'Adult',
    },
    {
        label: 'Geriatric Adult',
    },
    {
        label: 'Unspecified',
    },
]

const causeOfDeathOptions = [
    {
        label: 'Vehicular Collision',
    },
    {
        label: 'Trapped',
    },
    {
        label: 'Hunted',
    },
    {
        label: 'Non-Human Predation',
    },
    {
        label: 'Poisoned',
    },
    {
        label: 'Infection',
    },
    {
        label: 'Starvation',
    },
    {
        label: 'Drowning',
    },
    {
        label: 'Unknown',
    },
    {
        label: 'Other',
    },
]

const cleaningMethodOptions = [
    {
        label: 'Maceration',
    },
    {
        label: 'Beetle-Cleaned',
    },
    {
        label: 'Maggot-Cleaned',
    },
    {
        label: 'Nature-Cleaned',
    },
    {
        label: 'Oxidation',
    },
    {
        label: 'Burial',
    },
    {
        label: 'Simmered / Boiled',
    },
    {
        label: 'Unknown',
    },
    {
        label: 'Other',
    },
]

const RodentForm = () => {
    const [commonName, setCommonName] = useState('')
    const [binomialName, setBinomialName] = useState('')
    const [suborder, setSuborder] = useState('')
    const [family, setFamily] = useState('')
    const [sex, setSex] = useState('')
    const [age, setAge] = useState('')
    const [county, setCounty] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [dateOfAcquisition, setDateOfAcquisition] = useState('')
    const [causeOfDeath, setCauseOfDeath] = useState('')
    const [CBLength, setCBLength] = useState('')
    const [ZBreadth, setZBreadth] = useState('')
    const [MLength, setMLength] = useState('')
    const [FILength, setFILength] = useState('')
    const [MMRLength, setMMRLength] = useState('')
    const [NLength, setNLength] = useState('')
    const [cleaningMethod, setCleaningMethod] = useState('')
    const [notes, setNotes] = useState('')
    const [images, setImages] = useState([])
    const [credit, setCredit] = useState('')
    const [copyrightInfo, setCopyrightInfo] = useState('')
    const [error, setError] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = user.username
        const isApproved = false

        console.log('images', images)
        const rodent = { commonName, binomialName, suborder, family, sex, age, county, state, country, dateOfAcquisition, causeOfDeath, CBLength, ZBreadth, MLength, FILength, MMRLength, NLength, cleaningMethod, notes, credit, copyrightInfo, isApproved, username }

        const formData = new FormData()
        formData.append("rodent", rodent)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }
        const response = await fetch('/submissions', {
            method: 'POST',
            body: formData,
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setError('')
            // setCommonName('')
            // setBinomialName('')
            // setSuborder('')
            // setFamily('')
            // setSex('')
            // setAge('')
            // setCounty('')
            // setState('')
            // setCountry('')
            // setDateOfAcquisition(new Date())
            // setCauseOfDeath('')
            // setCBLength('')
            // setZBreadth('')
            // setMLength('')
            // setFILength('')
            // setMMRLength('')
            // setNLength('')
            // setCleaningMethod('')
            // setNotes('')
            // setImages([])
            // setCredit('')
            // setCopyrightInfo('')
        }
    }

    const handleCredit = () => {
        const creditTextarea = document.getElementById('paragraph-credit')
        const checkboxInput = document.querySelector('input[type="checkbox"]')

        creditTextarea.disabled = checkboxInput.checked

        if (checkboxInput.checked) {
            creditTextarea.style.backgroundColor = '#111'
            creditTextarea.style.color = '#444'
            creditTextarea.placeholder = '--Private Collection--'
            setCredit('None')
        }
        else {
            creditTextarea.style.backgroundColor = '#333'
            creditTextarea.style.color = '#fff'
            creditTextarea.placeholder = 'Give yourself submission credit here.\nYou may enter your full or abbreviated legal name, your facility, or an online pseudonym.\nIf you don’t want public credit, select ‘Private Collection’.'
            setCredit('')
        }
    }

    return (
        <>
            <div id="light" className="popup-content">
                <img
                    className="popup-image"
                    src={'/Measurements.png'}
                    alt={'Dimensions Info.'}
                    onClick={handleZoom}
                />
                <button title="Close (Esc)" className="popup-close">
                    <svg fill="white" x="0px" y="0px" width="20" height="20" viewBox="0 0 512 512">
                        <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
                    </svg>
                </button>
            </div>
            <div id="fade" className="popup-overlay"></div>

            <form className='rodent' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='form-header'>
                    <img src="/Logo.png" alt="logo" />
                    <h1>Rodent Form</h1><p>Submit your own rodents!</p>
                </div>
                <hr className="rounded" />
                <div className='form-container'>
                    <div className="form-stacked">
                        <div>
                            <h3>Common Name<span>*</span></h3>
                            <input
                                type='text'
                                onChange={(e) => setCommonName(e.target.value)}
                                value={commonName}
                                placeholder='Creeping Vole'
                                required
                            />
                        </div>

                        <div>
                            <h3>Binomial Name<span>*</span></h3>
                            <input
                                type='text'
                                onChange={(e) => setBinomialName(e.target.value)}
                                value={binomialName}
                                placeholder='Microtus oregoni'
                                required
                            />
                        </div>
                    </div>

                    <div className="form-stacked">
                        <div>
                            <h3>Suborder<span>*</span></h3>
                            <OptionMenu
                                options={suborderOptions}
                                onSelect={(option) => { setSuborder(option) }}
                                value={suborder}
                                placeholder='Myomorpha'
                                required
                            />
                        </div>

                        <div>
                            <h3>Family<span>*</span></h3>
                            <input
                                type='text'
                                onChange={(e) => setFamily(e.target.value)}
                                value={family}
                                placeholder='Cricetidae'
                                required
                            />
                        </div>
                    </div>

                    <div className="form-stacked">
                        <div>
                            <h3>Sex</h3>
                            <OptionMenu
                                options={sexOptions}
                                onSelect={(option) => { setSex(option) }}
                                value={sex}
                                placeholder='Male, Female, etc.'
                            />
                        </div>

                        <div>
                            <h3>Age Class</h3>
                            <OptionMenu
                                options={ageOptions}
                                onSelect={(option) => { setAge(option) }}
                                value={age}
                                placeholder='General age range'
                            />
                        </div>
                    </div>

                    <div>
                        <h3>Origin</h3>
                        <div className="form-stacked">
                            <div>
                                <p>County</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setCounty(e.target.value)}
                                    value={county}
                                    placeholder='If unknown or inapplicable, leave blank'
                                />
                            </div>
                            <div>
                                <p>State / Province</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    placeholder='If unknown or inapplicable, leave blank'
                                />
                            </div>
                            <div>
                                <p>Country</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={country}
                                    placeholder='Required field'
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Date of Acquisition<span>*</span></h3>
                        <input
                            type='date'
                            onChange={(e) => setDateOfAcquisition(e.target.value)}
                            value={dateOfAcquisition}
                            required
                        />
                    </div>

                    <div>
                        <h3>Cause of Death</h3>
                        <OptionMenu
                            options={causeOfDeathOptions}
                            onSelect={(option) => { setCauseOfDeath(option) }}
                            value={causeOfDeath}
                            placeholder='How the rodent died, if known'
                        />
                    </div>

                    <div>
                        <div className='form-info-title'>
                            <div onClick={handlePopUp}><h3 href='./' data-tippy={"More info."} data-tippy-animate="fade" data-tippy-size="large" data-tippy-pos="up">ⓘ</h3></div>
                            <h3>Required Dimensions<span>*</span></h3>
                        </div>
                        <div className="form-stacked">
                            <div>
                                <p>Condylobasal Length</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setCBLength(e.target.value)}
                                    value={CBLength}
                                    placeholder='Greatest length of the skull in mms'
                                />
                            </div>
                            <div>
                                <p>Zygomatic Breadth</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setZBreadth(e.target.value)}
                                    value={ZBreadth}
                                    placeholder='Greatest length of the mandible in mms, not including the incisors'
                                />
                            </div>
                            <div>
                                <p>Mandible Length</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setMLength(e.target.value)}
                                    value={MLength}
                                    placeholder='Greatest width of the skull in mms'
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='form-info-title'>
                            <div onClick={handlePopUp}><h3 href='./' data-tippy={"More info."} data-tippy-animate="fade" data-tippy-size="large" data-tippy-pos="up">ⓘ</h3></div>
                            <h3>Optional Dimensions</h3>
                        </div>
                        <div className="form-stacked">
                            <div>
                                <p>Foramen Incisivum Length</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setFILength(e.target.value)}
                                    value={FILength}
                                    placeholder='Length of the incisive foramina in mms'
                                />
                            </div>
                            <div>
                                <p>Maxillary Molar Row Length</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setMMRLength(e.target.value)}
                                    value={MMRLength}
                                    placeholder='Length of the upper molar row in mms'
                                />
                            </div>
                            <div>
                                <p>Nasal Length</p>
                                <textarea
                                    type='text'
                                    onChange={(e) => setNLength(e.target.value)}
                                    value={NLength}
                                    placeholder='Length of the nasal bones in mms'
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Cleaning Method</h3>
                        <OptionMenu
                            options={cleaningMethodOptions}
                            onSelect={(option) => { setCleaningMethod(option) }}
                            value={cleaningMethod}
                            placeholder='How the skull was cleaned'
                        />
                    </div>

                    <div>
                        <h3>Notes</h3>
                        <textarea
                            id="paragraph"
                            type='text'
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            placeholder='Add other details about the individual rodent / skull here.&#13;&#10;Ex: Is any damage to the skull present? Are there notable pathologies? If predated, what species culled it? What type of habitat was it found in?&#13;&#10;Please keep this section professional and as concise as possible.'
                        />
                    </div>

                    <div>
                        <h3>Images<span>*</span></h3>
                        <input
                            name='images'
                            type='file'
                            // accept="image/*"
                            onChange={(e) => setImages(e.target.files)}
                            // value={images}
                            alt='image'
                            multiple
                            required
                        />
                    </div>

                    <div>
                        <h3>Credit<span>*</span></h3>
                        <textarea
                            id="paragraph-credit"
                            type='text'
                            onChange={(e) => setCredit(e.target.value)}
                            value={credit}
                            placeholder='Give yourself submission credit here.&#13;&#10;You may enter your full or abbreviated legal name, your facility, or an online pseudonym.&#13;&#10;If you don’t want public credit, select ‘Private Collection’.'
                            required
                        />
                        <div className='form-checkbox' >
                            <input type="checkbox" id="private-collection" value="Private Collection" onChange={handleCredit} />
                            <label htmlFor="private-collection">Private Collection</label><br />
                        </div>
                    </div>

                    <div>
                        <h3>Copyright Information</h3>
                        <OptionMenu
                            options={copyrightOptions}
                            onSelect={(option) => { setCopyrightInfo(option) }}
                            value={copyrightInfo}
                            placeholder='No Copyright (CC0)'
                        />
                    </div>
                    <button>Add Rodent</button>
                </div>

                {error && <div className='error'>{error}</div>}
            </form>
        </>
    )
}

export default RodentForm