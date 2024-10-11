import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const commonNames = {
    'Ctenodactylidae': 'Gundis',
    'Diatomyidae': 'Khanyou',
    'Caviidae': 'Cavies',
    'Cuniculidae': 'Pacas',
    'Dasyproctidae': 'Agoutis and Acouchis',
    'Chinchillidae': 'Chinchillas and Viscachas',
    'Erethizontidae': 'New World Porcupines',
    'Abrocomidae': 'Chinchilla Rats',
    'Ctenomyidae': 'Tuco-Tucos',
    'Echimyidae': 'Spiny Rats and Hutias',
    'Octodontidae': 'Octodonts and Degus',
    'Dinomyidae': 'Pacaranas',
    'Bathyergidae': 'African Molerats',
    'Heterocephalidae': 'Naked Molerats',
    'Hystricidae': 'Old World Porcupines',
    'Petromuridae': 'Dassie Rats',
    'Thryonomyidae': 'Cane Rats',
}

const Hystricomorpha = () => {
    const navigate = useNavigate()
    const [hystricomorpha, setHystricomorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(window.location.search).get('search'))
    const [filteredHystricomorpha, setFilteredHystricomorpha] = useState([])

    useEffect(() => {
        const fetchHystricomorpha = async () => {
            const url = process.env.REACT_APP_BACKEND_URL + '/collections/hystricomorpha'
            const response = await fetch(url)
            const json = await response.json()
            if (response.ok)
                setHystricomorpha(json)
        }
        fetchHystricomorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, hystricomorph) => {
                const family = hystricomorph.family
                if (!groupedImages[family])
                    groupedImages[family] = []
                groupedImages[family].push(hystricomorph)
                return groupedImages
            }, {})
        ).map(([family, imageLinks]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {imageLinks.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/hystricomorpha/${rodent._id}`, { state: rodent })
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
        if (!hystricomorpha) return
        if (!searchTerm) {
            setFilteredHystricomorpha([])
            window.history.replaceState(null, 'VoleVault', '/collections/hystricomorpha')
            return
        }
        const searchTermLowerCase = searchTerm.toLowerCase()
        const filteredHystricomorpha = hystricomorpha.filter((rodent) => {
            return (
                rodent.commonName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.binomialName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.family.toLowerCase().includes(searchTermLowerCase)
            )
        })
        setFilteredHystricomorpha(filteredHystricomorpha)
        window.history.replaceState(null, 'VoleVault', `/collections/hystricomorpha?search=${searchTerm}`)
    }, [searchTerm, hystricomorpha])

    return (
        <div>
            <div className="page-title">
                <img src="/Hystricomorpha.png" alt="Hystricomorpha" />
                <h1>Hystricomorpha</h1>
                <form>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search Hystricomorpha..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value) }}
                        />
                    </div>
                </form>
            </div>
            {hystricomorpha && (
                <div>
                    {searchTerm && new URLSearchParams(window.location.search).get('search') ? (
                        filteredHystricomorpha.length > 0 ?
                            (groupByFamily(filteredHystricomorpha)) : (
                                <div className="no-results">
                                    <img src="/Hystricomorpha.png" alt="Hystricomorpha" />
                                    <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                </div>
                            )
                    ) : (groupByFamily(hystricomorpha))}
                </div>
            )}
        </div>
    )
}

export default Hystricomorpha