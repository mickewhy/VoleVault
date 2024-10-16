import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const commonNames = {
    'Anomaluridae': 'Anomalures',
    'Pedetidae': 'Springhares',
    'Zenkerellidae': 'Flightless Anomalures',
}

const Anomaluromorpha = () => {
    const navigate = useNavigate()
    const [anomaluromorpha, setAnomaluromorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search'))
    const [filteredAnomaluromorpha, setFilteredAnomaluromorpha] = useState([])

    useEffect(() => {
        const fetchAnomaluromorpha = async () => {
            const response = await fetch('https://volevault-backend-648df3ef860e.herokuapp.com/collections/anomaluromorpha')
            const json = await response.json()
            if (response.ok)
                setAnomaluromorpha(json)
        }
        fetchAnomaluromorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, anomaluromorph) => {
                const family = anomaluromorph.family
                if (!groupedImages[family])
                    groupedImages[family] = []
                groupedImages[family].push(anomaluromorph)
                return groupedImages
            }, {})
        ).map(([family, imageLinks]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {imageLinks.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/anomaluromorpha/${rodent._id}`, { state: rodent })
                            }}>
                            <img
                                src={rodent.imageLinks[0]}
                                alt={rodent.family}
                            />
                            <p className="image-overlay"><i>{rodent.binomialName}</i> <span>({rodent.commonName})</span></p>
                        </div>
                    ))}
                </div>
            </div>
        ))

    useEffect(() => {
        if (!anomaluromorpha) return
        if (!searchTerm) {
            setFilteredAnomaluromorpha([])
            window.history.replaceState(null, 'VoleVault', '/collections/anomaluromorpha')
            return
        }
        const searchTermLowerCase = searchTerm.toLowerCase()
        const filteredAnomaluromorpha = anomaluromorpha.filter((rodent) => {
            return (
                rodent.commonName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.binomialName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.family.toLowerCase().includes(searchTermLowerCase)
            )
        })
        setFilteredAnomaluromorpha(filteredAnomaluromorpha)
        window.history.replaceState(null, 'VoleVault', `/collections/anomaluromorpha?search=${searchTerm}`)
    }, [searchTerm, anomaluromorpha])

    return (
        <div>
            <div className="page-title">
                <img src="/Anomaluromorpha.png" alt="Anomaluromorpha" />
                <h1>Anomaluromorpha</h1>
                <form>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Anomaluromorpha..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                    </div>
                </form>
            </div>
            {anomaluromorpha && (
                <div>
                    {searchTerm && new URLSearchParams(window.location.search).get('search') ? (
                        filteredAnomaluromorpha.length > 0 ?
                            (groupByFamily(filteredAnomaluromorpha)) : (
                                <div className="no-results">
                                    <img src="/Anomaluromorpha.png" alt="Anomaluromorpha" />
                                    <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                </div>
                            )
                    ) : (groupByFamily(anomaluromorpha))}
                </div>
            )}
        </div>
    )
}

export default Anomaluromorpha