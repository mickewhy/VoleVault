import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const commonNames = {
    'Castoridae': 'Beavers',
    'Geomyidae': 'Pocket Gophers',
    'Heteromyidae': 'Kangaroo Rats and Pocket Mice',
}

const Castorimorpha = () => {
    const navigate = useNavigate()
    const [castorimorpha, setCastorimorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search'))
    const [filteredCastorimorpha, setFilteredCastorimorpha] = useState([])

    useEffect(() => {
        const fetchCastorimorpha = async () => {
            const response = await fetch(`https://volevault-backend-648df3ef860e.herokuapp.com/test`)
            const json = await response.json()
            if (response.ok)
                setCastorimorpha(json)
        }
        fetchCastorimorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, castorimorph) => {
                const family = castorimorph.family
                if (!groupedImages[family])
                    groupedImages[family] = []
                groupedImages[family].push(castorimorph)
                return groupedImages
            }, {})
        ).map(([family, imageLinks]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {imageLinks.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/castorimorpha/${rodent._id}`, { state: rodent })
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
        if (!castorimorpha) return
        if (!searchTerm) {
            setFilteredCastorimorpha([])
            window.history.replaceState(null, 'VoleVault', '/collections/castorimorpha')
            return
        }
        const searchTermLowerCase = searchTerm.toLowerCase()
        const filteredCastorimorpha = castorimorpha.filter((rodent) => {
            return (
                rodent.commonName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.binomialName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.family.toLowerCase().includes(searchTermLowerCase)
            )
        })
        setFilteredCastorimorpha(filteredCastorimorpha)
        window.history.replaceState(null, 'VoleVault', `/collections/castorimorpha?search=${searchTerm}`)
    }, [searchTerm, castorimorpha])

    return (
        <div>
            <div className="page-title">
                <img src="/Castorimorpha.png" alt="Castorimorpha" />
                <h1>Castorimorpha</h1>
                <form>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Castorimorpha..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                    </div>
                </form>
            </div>
            {castorimorpha && (
                <div>
                    {searchTerm && new URLSearchParams(window.location.search).get('search') ? (
                        filteredCastorimorpha.length > 0 ?
                            (groupByFamily(filteredCastorimorpha)) : (
                                <div className="no-results">
                                    <img src="/Castorimorpha.png" alt="Castorimorpha" />
                                    <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                </div>
                            )
                    ) : (groupByFamily(castorimorpha))}
                </div>
            )}
        </div>
    )
}

export default Castorimorpha