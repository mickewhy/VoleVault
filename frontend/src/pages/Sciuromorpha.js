import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const commonNames = {
    'Aplodontiidae': 'Mountain Beavers',
    'Gliridae': 'Dormice',
    'Sciuridae': 'Squirrels',
}

const Sciuromorpha = () => {
    const navigate = useNavigate()
    const [sciuromorpha, setSciuromorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search'))
    const [filteredSciuromorpha, setFilteredSciuromorpha] = useState([])

    useEffect(() => {
        const fetchSciuromorpha = async () => {
            const response = await fetch('/collections/sciuromorpha')
            const json = await response.json()
            if (response.ok)
                setSciuromorpha(json)
        }
        fetchSciuromorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, sciuromorph) => {
                const family = sciuromorph.family
                if (!groupedImages[family])
                    groupedImages[family] = []
                groupedImages[family].push(sciuromorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/sciuromorpha/${rodent._id}`, { state: rodent })
                            }}>
                            <img
                                src={rodent.links[0]}
                                alt={rodent.family}
                            />
                            <p className="image-overlay"><i>{rodent.binomialName}</i> <span>({rodent.commonName})</span></p>
                        </div>
                    ))}
                </div>
            </div>
        ))

    useEffect(() => {
        if (!sciuromorpha) return
        if (!searchTerm) {
            setFilteredSciuromorpha([])
            window.history.replaceState(null, 'VoleVault', '/collections/sciuromorpha')
            return
        }
        const searchTermLowerCase = searchTerm.toLowerCase()
        const filteredSciuromorpha = sciuromorpha.filter((rodent) => {
            return (
                rodent.commonName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.binomialName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.family.toLowerCase().includes(searchTermLowerCase)
            )
        })
        setFilteredSciuromorpha(filteredSciuromorpha)
        window.history.replaceState(null, 'VoleVault', `/collections/sciuromorpha?search=${searchTerm}`)
    }, [searchTerm, sciuromorpha])

    return (
        <div>
            <div className="page-title">
                <img src="/Sciuromorpha.png" alt="Sciuromorpha" />
                <h1>Sciuromorpha</h1>
                <form>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Sciuromorpha..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                    </div>
                </form>
            </div>
            {sciuromorpha && (
                <div>
                    {searchTerm && new URLSearchParams(window.location.search).get('search') ? (
                        filteredSciuromorpha.length > 0 ?
                            (groupByFamily(filteredSciuromorpha)) : (
                                <div className="no-results">
                                    <img src="/Sciuromorpha.png" alt="Sciuromorpha" />
                                    <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                </div>
                            )
                    ) : (groupByFamily(sciuromorpha))}
                </div>
            )}
        </div>
    )
}

export default Sciuromorpha