import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const commonNames = {
    'Anomaluridae': 'Anomalures',
    'Pedetidae': 'Springhares',
    'Zenkerellidae': 'Flightless Anomalures',
}

const Anomaluromorpha = () => {
    const [anomaluromorpha, setAnomaluromorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [filteredAnomaluromorpha, setFilteredAnomaluromorpha] = useState([])

    useEffect(() => {
        const fetchAnomaluromorpha = async () => {
            const response = await fetch('/collections/anomaluromorpha')
            const json = await response.json()
            if (response.ok) {
                setAnomaluromorpha(json)
            }
        }

        fetchAnomaluromorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, anomaluromorph) => {
                const family = anomaluromorph.family
                if (!groupedImages[family]) {
                    groupedImages[family] = []
                }
                groupedImages[family].push(anomaluromorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/anomaluromorpha/${rodent._id}`, { state: rodent })
                            }}>
                            <img
                                src={rodent.links[0]}
                                alt={rodent.family}
                                //   onMouseEnter={() => console.log("Hover")}
                                //   onMouseLeave={() => console.log("Leave Hover")}
                                className="image"
                            />
                            <p className="image-overlay"><i>{rodent.binomialName}</i> <span>({rodent.commonName})</span></p>
                        </div>
                    ))}
                </div>
            </div>
        ))

    useEffect(() => {
        if (!searchTerm) {
            setFilteredAnomaluromorpha([])
            window.history.replaceState(null,'VoleVault','/collections/anomaluromorpha')
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
        window.history.replaceState(null,'VoleVault',`/collections/anomaluromorpha?search=${searchTerm}`)
    }, [searchTerm])

    return (
        <div className="collections">
            <div className="Anomaluromorpha">
                <div className="page-title">
                    <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279476151582780/Castorimorpha.png?ex=66dc0d37&is=66dabbb7&hm=fb16efc46e334c745d9fbf9c3d40599d435b17f7f1ff40b00e5068b2ffb46fe8&" alt="Anomaluromorpha" />
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
                                        <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279476151582780/Castorimorpha.png?ex=66dc0d37&is=66dabbb7&hm=fb16efc46e334c745d9fbf9c3d40599d435b17f7f1ff40b00e5068b2ffb46fe8&" alt="Anomaluromorpha" />
                                        <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                    </div>
                                )
                        ) : (groupByFamily(anomaluromorpha))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Anomaluromorpha