import { useState } from 'react'

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
    const [summary, setSummary] = useState('')
    const [credit, setCredit] = useState('')
    const [creditLink, setCreditLink] = useState('')
    const [contactInfo, setContactInfo] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const rodent = { commonName, binomialName, suborder, family, sex, age, origin, dateOfAcquisition, causeOfDeath, dimensions, cleaningMethod, notes, links, summary, credit, creditLink, contactInfo }

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
            setSummary('')
            setCredit('')
            setCreditLink('')
            setContactInfo('')

            console.log('Rodent added:', json)
        }

    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new rodent</h3>

            <label>Common Name:</label>
            <input
                type='text'
                onChange={(e) => setCommonName(e.target.value)}
                value={commonName}
                // placeholder='Example'
            />

            <label>Binomial Name:</label>
            <input
                type='text'
                onChange={(e) => setBinomialName(e.target.value)}
                value={binomialName}
            />

            <label>Suborder:</label>
            <input
                type='text'
                onChange={(e) => setSuborder(e.target.value)}
                value={suborder}
                list='suborders'
            />
            <datalist id='suborders'>
                <option value='Anomaluromorpha'/>
                <option value='Castorimorpha'/>
                <option value='Hystricomorpha'/>
                <option value='Myomorpha'/>
                <option value='Sciuromorpha'/>
            </datalist>

            <label>Family:</label>
            <input
                type='text'
                onChange={(e) => setFamily(e.target.value)}
                value={family}
            />

            <label>Sex:</label>
            <input
                type='text'
                onChange={(e) => setSex(e.target.value)}
                value={sex}
                list='sexes'
            />
            <datalist id='sexes'>
                <option value='Male'/>
                <option value='Female'/>
            </datalist>

            <label>Age:</label>
            <input
                type='text'
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />

            <label>Origin:</label>
            <input
                type='text'
                onChange={(e) => setOrigin(e.target.value)}
                value={origin}
            />

            <label>Date of Acquisition:</label>
            <input
                type='date'
                onChange={(e) => setDateOfAcquisition(e.target.value)}
                value={dateOfAcquisition}
            />

            <label>Cause of Death:</label>
            <input
                type='text'
                onChange={(e) => setCauseOfDeath(e.target.value)}
                value={causeOfDeath}
            />

            <label>Dimensions:</label>
            <input
                type='text'
                onChange={(e) => setDimensions(e.target.value)}
                value={dimensions}
            />

            <label>Cleaning Method:</label>
            <input
                type='text'
                onChange={(e) => setCleaningMethod(e.target.value)}
                value={cleaningMethod}
            />

            <label>Notes:</label>
            <input
                type='text'
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
            />

            <label>Links:</label>
            <input
                type='image'
                onChange={(e) => setLinks(e.target.value)}
                value={links}
                alt='image'
            />

            <label>Summary:</label>
            <input
                type='text'
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
            />

            <label>Credit:</label>
            <input
                type='text'
                onChange={(e) => setCredit(e.target.value)}
                value={credit}
            />

            <label>Credit Link:</label>
            <input
                type='text'
                onChange={(e) => setCreditLink(e.target.value)}
                value={creditLink}
            />

            <label>Contact Information:</label>
            <input
                type='text'
                onChange={(e) => setContactInfo(e.target.value)}
                value={contactInfo}
            />

            <button>Add Rodent</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default RodentForm