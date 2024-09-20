import { useState } from 'react'
import OptionMenu from './OptionMenu'

const RodentForm = () => {
    const [commonName, setCommonName] = useState('')
    const [binomialName, setBinomialName] = useState('')
    const [suborder, setSuborder] = useState('')
    const [family, setFamily] = useState('')
    const [sex, setSex] = useState('')
    const [age, setAge] = useState('')
    const [origin, setOrigin] = useState('')
    const [dateOfAcquisition, setDateOfAcquisition] = useState('')
    const [causeOfDeath, setCauseOfDeath] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [cleaningMethod, setCleaningMethod] = useState('')
    const [notes, setNotes] = useState('')
    const [links, setLinks] = useState('')
    const [credit, setCredit] = useState('')
    const [copyrightInfo, setCopyrightInfo] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const rodent = { commonName, binomialName, suborder, family, sex, age, origin, dateOfAcquisition, causeOfDeath, dimensions, cleaningMethod, notes, links, credit, copyrightInfo }

        const response = await fetch('/submissions', {
            method: 'POST',
            body: JSON.stringify(rodent),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setCommonName('')
            setBinomialName('')
            setSuborder('')
            setFamily('')
            setSex('')
            setAge('')
            setOrigin('')
            setDateOfAcquisition(null)
            setCauseOfDeath('')
            setDimensions('')
            setCleaningMethod('')
            setNotes('')
            setLinks(null)
            setCredit('')
            setCopyrightInfo('')

            console.log('Rodent added:', json)
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
        }
        else {
            creditTextarea.style.backgroundColor = '#333'
            creditTextarea.style.color = '#fff'
            creditTextarea.placeholder='Give yourself submission credit here.\nYou may enter your full or abbreviated legal name, your facility, or an online pseudonym.\nIf you don’t want public credit, select ‘Private Collection’.'
        }
    }

    const copyrightOptions = [
        {
            label: 'No Copyright',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/cc-zero.png',
            displayText: 'CC0',
        },
        {
            label: 'Attribution',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png',
            displayText: 'BY',
        },
        {
            label: 'Attribution-NonCommercial',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.png',
            displayText: 'BY-NC',
        },
        {
            label: 'Attribution-NonCommercial-ShareAlike',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png',
            displayText: 'BY-NC-SA',
        },
        {
            label: 'Attribution-NonCommercial-NoDerivs',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.png',
            displayText: 'BY-NC-ND',
        },
        {
            label: 'Attribution-NoDerivs',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png',
            displayText: 'BY-ND',
        },
        {
            label: 'Attribution-ShareAlike',
            image: 'https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png',
            displayText: 'BY-SA',
        },
    ]

    const [selectedCopyright, setSelectedCopyright] = useState('')

    const handleCopyrightSelect = (option) => {
        setSelectedCopyright(option)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new rodent</h2>
            <div className='form-container'>
                <div className="form-stacked">
                    <div>
                        <h3>Common Name:</h3>
                        <input
                            type='text'
                            onChange={(e) => setCommonName(e.target.value)}
                            value={commonName}
                            placeholder='Creeping Vole'
                        />
                    </div>

                    <div>
                        <h3>Binomial Name:</h3>
                        <input
                            type='text'
                            onChange={(e) => setBinomialName(e.target.value)}
                            value={binomialName}
                            placeholder='Microtus oregoni'
                        />
                    </div>
                </div>

                <div className="form-stacked">
                    <div>
                        <h3>Suborder:</h3>
                        <input
                            type='text'
                            onChange={(e) => setSuborder(e.target.value)}
                            value={suborder}
                            list='suborders'
                            placeholder='Myomorpha'
                        />
                        <datalist id='suborders'>
                            <option value='Anomaluromorpha' />
                            <option value='Castorimorpha' />
                            <option value='Hystricomorpha' />
                            <option value='Myomorpha' />
                            <option value='Sciuromorpha' />
                        </datalist>
                    </div>

                    <div>
                        <h3>Family:</h3>
                        <input
                            type='text'
                            onChange={(e) => setFamily(e.target.value)}
                            value={family}
                            placeholder='Cricetidae'
                        />
                    </div>
                </div>

                <div className="form-stacked">
                    <div>
                        <h3>Sex:</h3>
                        <input
                            type='text'
                            onChange={(e) => setSex(e.target.value)}
                            value={sex}
                            list='sexes'
                            placeholder='Male, Female, etc.'
                        />
                        <datalist id='sexes'>
                            <option value='Male' />
                            <option value='Female' />
                            <option value='Unspecified' />
                        </datalist>
                    </div>

                    <div>
                        <h3>Age Class:</h3>
                        <input
                            type='text'
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            list='ages'
                            placeholder='General age range'
                        />
                        <datalist id='ages'>
                            <option value='Juvenile' />
                            <option value='Subadult' />
                            <option value='Adult' />
                            <option value='Geriatric Adult' />
                            <option value='Unspecified' />
                        </datalist>
                    </div>
                </div>

                <div>
                    <h3>Origin:</h3>
                    <div className="form-stacked">
                        <div>
                            <p>County</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={origin}
                                placeholder='If unknown or inapplicable, leave blank'
                            />
                        </div>
                        <div>
                            <p>State / Province</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={origin}
                                placeholder='If unknown or inapplicable, leave blank'
                            />
                        </div>
                        <div>
                            <p>Country</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={origin}
                                placeholder='Required field'
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Date of Acquisition:</h3>
                    <input
                        type='date'
                        onChange={(e) => setDateOfAcquisition(e.target.value)}
                        value={dateOfAcquisition}
                    />
                </div>

                <div>
                    <h3>Cause of Death:</h3>
                    <input
                        type='text'
                        onChange={(e) => setCauseOfDeath(e.target.value)}
                        value={causeOfDeath}
                        list='causes'
                        placeholder='How the rodent died, if known'
                    />
                    <datalist id='causes'>
                        <option value='Vehicular Collision' />
                        <option value='Trapped' />
                        <option value='Hunted' />
                        <option value='Non-Human Predation' />
                        <option value='Poisoned' />
                        <option value='Infection' />
                        <option value='Starvation' />
                        <option value='Drowning' />
                        <option value='Unknown' />
                        <option value='Other' />
                    </datalist>
                </div>

                <div>
                    <h3>Required Dimensions:</h3>
                    <div className="form-stacked">
                        <div>
                            <p>Condylobasal Length</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Greatest length of the skull in mms'
                            />
                        </div>
                        <div>
                            <p>Zygomatic Breadth</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Greatest length of the mandible in mms, not including the incisors'
                            />
                        </div>
                        <div>
                            <p>Mandible Length</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Greatest width of the skull in mms'
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Optional Dimensions:</h3>
                    <div className="form-stacked">
                        <div>
                            <p>Foramen Incisivum Length</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Length of the incisive foramina in mms'
                            />
                        </div>
                        <div>
                            <p>Maxillary Molar Row Length</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Length of the upper molar row in mms'
                            />
                        </div>
                        <div>
                            <p>Nasal Length</p>
                            <textarea
                                type='text'
                                onChange={(e) => setDimensions(e.target.value)}
                                value={dimensions}
                                placeholder='Length of the nasal bones in mms'
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Cleaning Method:</h3>
                    <input
                        type='text'
                        onChange={(e) => setCleaningMethod(e.target.value)}
                        value={cleaningMethod}
                        list='methods'
                        placeholder='How the skull was cleaned'
                    />
                    <datalist id='methods'>
                        <option value='Maceration' />
                        <option value='Beetle-Cleaned' />
                        <option value='Maggot-Cleaned' />
                        <option value='Nature-Cleaned' />
                        <option value='Oxidation' />
                        <option value='Burial' />
                        <option value='Simmered / Boiled' />
                        <option value='Unknown' />
                        <option value='Other' />
                    </datalist>
                </div>

                <div>
                    <h3>Notes:</h3>
                    <textarea
                        id="paragraph"
                        type='text'
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        placeholder='Add other details about the individual rodent / skull here.&#13;&#10;Ex: Is any damage to the skull present? Are there notable pathologies? If predated, what species culled it? What type of habitat was it found in?&#13;&#10;Please keep this section professional and as concise as possible.'
                    />
                </div>

                <div>
                    <h3>Links:</h3>
                    <input
                        type='file'
                        onChange={(e) => setLinks(e.target.value)}
                        value={links}
                        alt='image'
                        multiple
                    />
                </div>

                <div>
                    <h3>Credit:</h3>
                    <textarea
                        id="paragraph-credit"
                        type='text'
                        onChange={(e) => setCredit(e.target.value)}
                        value={credit}
                        placeholder='Give yourself submission credit here.&#13;&#10;You may enter your full or abbreviated legal name, your facility, or an online pseudonym.&#13;&#10;If you don’t want public credit, select ‘Private Collection’.'
                    />
                    <div className='form-checkbox' >
                        <input type="checkbox" id="private-collection" value="Private Collection" onChange={handleCredit} />
                        <label for="private-collection">Private Collection</label><br />
                    </div>
                </div>

                <div>
                    <h3>Copyright Information:</h3>
                    <div className='copyright-container'>
                        <OptionMenu
                            options={copyrightOptions}
                            onSelect={handleCopyrightSelect}
                            value={selectedCopyright}
                        />
                    </div>
                </div>
            </div>

            <button>Add Rodent</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default RodentForm