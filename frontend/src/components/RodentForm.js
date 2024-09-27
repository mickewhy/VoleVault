import { useState } from 'react'
import OptionMenu from './OptionMenu'

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
    const [links, setLinks] = useState('')
    const [credit, setCredit] = useState('')
    const [copyrightInfo, setCopyrightInfo] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isApproved = false
        const rodent = { commonName, binomialName, suborder, family, sex, age, county, state, country, dateOfAcquisition, causeOfDeath, CBLength, ZBreadth, MLength, FILength, MMRLength, NLength, cleaningMethod, notes, credit, copyrightInfo, isApproved }

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
            setCounty('')
            setState('')
            setCountry('')
            setDateOfAcquisition(null)
            setCauseOfDeath('')
            setCBLength('')
            setZBreadth('')
            setMLength('')
            setFILength('')
            setMMRLength('')
            setNLength('')
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
            setCredit('None')
        }
        else {
            creditTextarea.style.backgroundColor = '#333'
            creditTextarea.style.color = '#fff'
            creditTextarea.placeholder = 'Give yourself submission credit here.\nYou may enter your full or abbreviated legal name, your facility, or an online pseudonym.\nIf you don’t want public credit, select ‘Private Collection’.'
            setCredit('')
        }
    }

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

    return (
        <form className='rodent' onSubmit={handleSubmit}>
            <div className='form-header'>
                <img src="https://media.discordapp.net/attachments/932866678126161960/1281807802473381929/Untitled646.png?ex=66e4f90a&is=66e3a78a&hm=3c94d00f0f0ea82a31dd5dfde41e92cba73c83a1b3bc5a2831ff034150c35d6f&" alt="logo" />
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
                    <h3>Required Dimensions<span>*</span></h3>
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
                    <h3>Optional Dimensions</h3>
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
                    <h3>Links<span>*</span></h3>
                    <input
                        type='file'
                        onChange={(e) => setLinks(e.target.value)}
                        value={links}
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
                        <label for="private-collection">Private Collection</label><br />
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
    )
}

export default RodentForm