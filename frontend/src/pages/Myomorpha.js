import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const commonNames = {
    'Dipodidae': 'Jerboas',
    'Sminthidae': 'Birch Mice',
    'Zapodidae': 'Jumping Mice',
    'Calomyscidae': 'Brush-tailed Mice',
    'Cricetidae': 'Hamsters, Voles, Lemmings, and Allies',
    'Muridae': 'Old World Mice and Rats',
    'Nesomyidae': 'Nesomyids',
    'Platacanthomyidae': 'Spiny and Pygmy Dormice',
    'Spalacidae': 'Spalacids',
}

const Myomorpha = () => {
    const [myomorpha, setMyomorpha] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const [filteredMyomorpha, setFilteredMyomorpha] = useState([])

    useEffect(() => {
        const fetchMyomorpha = async () => {
            const response = await fetch('/collections/myomorpha')
            const json = await response.json()
            if (response.ok) {
                setMyomorpha(json)
            }
        }

        fetchMyomorpha()
    }, [])

    const groupByFamily = (data) =>
        Object.entries(
            data.reduce((groupedImages, myomorph) => {
                const family = myomorph.family
                if (!groupedImages[family]) {
                    groupedImages[family] = []
                }
                groupedImages[family].push(myomorph)
                return groupedImages
            }, {})
        ).map(([family, links]) => (
            <div key={family} className="rodent-container">
                <h3>{family}<span>({commonNames[family]})</span></h3>
                <div className="image-grid">
                    {links.map(rodent => (
                        <div key={rodent._id} className="image-wrapper"
                            onClick={() => {
                                navigate(`/collections/myomorpha/${rodent._id}`, { state: rodent })
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
        if (!searchTerm) {
            setFilteredMyomorpha([])
            window.history.replaceState(null, 'VoleVault', '/collections/myomorpha')
            return
        }
        const searchTermLowerCase = searchTerm.toLowerCase()
        const filteredMyomorpha = myomorpha.filter((rodent) => {
            return (
                rodent.commonName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.binomialName.toLowerCase().includes(searchTermLowerCase) ||
                rodent.family.toLowerCase().includes(searchTermLowerCase)
            )
        })
        setFilteredMyomorpha(filteredMyomorpha)
        window.history.replaceState(null, 'VoleVault', `/collections/myomorpha?search=${searchTerm}`)
    }, [searchTerm])

    return (
        <div>
                <div className="page-title">
                    <img src="https://cdn.discordapp.com/attachments/932866678126161960/1244917657212555335/Myomorpha.png?ex=66dc02ea&is=66dab16a&hm=c9105221aac770488e054a4ef8a17c7718113a6f51e5bfe5aab7778eef1ea723&" alt="Myomorpha" />
                    <h1>Myomorpha</h1>
                    <form>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search Myomorpha..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                            />
                        </div>
                    </form>
                </div>
                {myomorpha && (
                    <div>
                        {searchTerm && new URLSearchParams(window.location.search).get('search') ? (
                            filteredMyomorpha.length > 0 ?
                                (groupByFamily(filteredMyomorpha)) : (
                                    <div className="no-results">
                                        <img src="https://cdn.discordapp.com/attachments/932866678126161960/1244917657212555335/Myomorpha.png?ex=66dc02ea&is=66dab16a&hm=c9105221aac770488e054a4ef8a17c7718113a6f51e5bfe5aab7778eef1ea723&" alt="Myomorpha" />
                                        <p>This rodent hasn't been submitted yet! <a href="../submissions">Submit rodents</a></p>
                                    </div>
                                )
                        ) : (groupByFamily(myomorpha))}
                    </div>
                )}
        </div>
    )
}

export default Myomorpha