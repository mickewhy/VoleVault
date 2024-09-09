import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const commonNames = {
    'Aplodontiidae': 'Mountain Beavers',
    'Gliridae': 'Dormice',
    'Sciuridae': 'Squirrels',
}

const Sciuromorpha = () => {
    const [sciuromorpha, setSciuromorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [filteredSciuromorpha, setFilteredSciuromorpha] = useState([])

    useEffect(() => {
        const fetchSciuromorpha = async () => {
            const response = await fetch('/collections/sciuromorpha')
            const json = await response.json()
            if (response.ok) {
                setSciuromorpha(json)
            }
        }

        fetchSciuromorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, sciuromorph) => {
                const family = sciuromorph.family
                if (!groupedImages[family]) {
                    groupedImages[family] = []
                }
                groupedImages[family].push(sciuromorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3><i>{family}</i><span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/sciuromorpha/${rodent._id}`, { state: rodent })
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
            setFilteredSciuromorpha([])
            window.history.replaceState(null,'VoleVault','/collections/sciuromorpha')
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
        window.history.replaceState(null,'VoleVault',`/collections/sciuromorpha?search=${searchTerm}`)
    }, [searchTerm])

    return (
        <div className="collections">
            <div className="Sciuromorpha">
                <div className="page-title">
                    <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279357557637120/Sciuromorpha.png?ex=66dc0d1b&is=66dabb9b&hm=4951d9104607e10d2ce8ab966429ef7d5e3ca65343fbe35cd4e850a5380979c6&" alt="Sciuromorpha" />
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
                                (groupByFamily(filteredSciuromorpha)) : (<p>No results found.</p>)
                        ) : (groupByFamily(sciuromorpha))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sciuromorpha