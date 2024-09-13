import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const commonNames = {
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
    const [hystricomorpha, setHystricomorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [filteredHystricomorpha, setFilteredHystricomorpha] = useState([])

    useEffect(() => {
        const fetchHystricomorpha = async () => {
            const response = await fetch('/collections/hystricomorpha')
            const json = await response.json()
            if (response.ok) {
                setHystricomorpha(json)
            }
        }

        fetchHystricomorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, hystricomorph) => {
                const family = hystricomorph.family
                if (!groupedImages[family]) {
                    groupedImages[family] = []
                }
                groupedImages[family].push(hystricomorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/hystricomorpha/${rodent._id}`, { state: rodent })
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
            setFilteredHystricomorpha([])
            window.history.replaceState(null,'VoleVault','/collections/hystricomorpha')
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
        window.history.replaceState(null,'VoleVault',`/collections/hystricomorpha?search=${searchTerm}`)
    }, [searchTerm])

    return (
        <div className="collections">
            <div className="Hystricomorpha">
                <div className="page-title">
                    <img src="https://cdn.discordapp.com/attachments/1222273673604628641/1222279422602776596/Hystricomorpha.png?ex=66dc0d2b&is=66dabbab&hm=fda1137df82174d74eed32ed12aa4a2195723a08ce514e5504616d5531de4e57&" alt="Hystricomorpha" />
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
                                (groupByFamily(filteredHystricomorpha)) : (<p>No results found.</p>)
                        ) : (groupByFamily(hystricomorpha))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Hystricomorpha