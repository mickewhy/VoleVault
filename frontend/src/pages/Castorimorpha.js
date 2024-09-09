import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const commonNames = {
    'Castoridae': 'Beavers',
    'Geomyidae': 'Pocket Gophers',
    'Heteromyidae': 'Kangaroo Rats and Pocket Mice',
}

const Castorimorpha = () => {
    const [castorimorpha, setCastorimorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [filteredCastorimorpha, setFilteredCastorimorpha] = useState([])

    useEffect(() => {
        const fetchCastorimorpha = async () => {
            const response = await fetch('/collections/castorimorpha')
            const json = await response.json()
            if (response.ok) {
                setCastorimorpha(json)
            }
        }

        fetchCastorimorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, castorimorph) => {
                const family = castorimorph.family
                if (!groupedImages[family]) {
                    groupedImages[family] = []
                }
                groupedImages[family].push(castorimorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/castorimorpha/${rodent._id}`, { state: rodent })
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
            setFilteredCastorimorpha([])
            window.history.replaceState(null,'VoleVault','/collections/castorimorpha')
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
        window.history.replaceState(null,'VoleVault',`/collections/castorimorpha?search=${searchTerm}`)
    }, [searchTerm])

    return (
        <div className="collections">
            <div className="Castorimorpha">
                <div className="page-title">
                    <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279476151582780/Castorimorpha.png?ex=66dc0d37&is=66dabbb7&hm=fb16efc46e334c745d9fbf9c3d40599d435b17f7f1ff40b00e5068b2ffb46fe8&" alt="Castorimorpha" />
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
                                (groupByFamily(filteredCastorimorpha)) : (<p>No results found.</p>)
                        ) : (groupByFamily(castorimorpha))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Castorimorpha