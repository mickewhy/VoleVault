import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { commonNames as AnomaluromorphaNames } from './Anomaluromorpha.js'
import { commonNames as CastorimorphaNames } from './Castorimorpha.js'
import { commonNames as HystricomorphaNames } from './Hystricomorpha.js'
import { commonNames as MyomorphaNames } from './Myomorpha.js'
import { commonNames as SciuromorphaNames } from './Sciuromorpha.js'

const Taxa = () => {
    const navigate = useNavigate()
    const [allRodents, setAllRodents] = useState(null)

    let familyNames = {}
    for (let list of [AnomaluromorphaNames, CastorimorphaNames, HystricomorphaNames, MyomorphaNames, SciuromorphaNames])
        for (let x in list)
            familyNames[x] = list[x]

    useEffect(() => {
        const fetchRodents = async () => {
            const response = await fetch("/collections/rodents")
            const json = await response.json()
            if (response.ok)
                setAllRodents(json)
        }
        fetchRodents()
    }, [])

    return (
        <div className="taxa">
            {allRodents && (
                <div className="rodent-container">
                    {Object.entries(
                        allRodents.reduce((groupedRodents, rodent) => {
                            const suborder = rodent.suborder
                            if (!groupedRodents[suborder])
                                groupedRodents[suborder] = []
                            groupedRodents[suborder].push(rodent)
                            return groupedRodents
                        }, {})
                    ).map(([suborder, rodentsBySuborder]) => (
                        <div key={suborder}>
                            <div className="page-title" onClick={() => navigate(`/collections/${suborder}`)}>
                                <img src={
                                    suborder === "Anomaluromorpha" ? "https://cdn.discordapp.com/attachments/1222273673604628641/1285126081556385846/Anomaluromorpha.png?ex=66e9226e&is=66e7d0ee&hm=9798b9ec91620739252072063687a3fccb433c3d0f5a5761f328520386da6e6b&" :
                                        suborder === "Castorimorpha" ? "https://cdn.discordapp.com/attachments/1222273673604628641/1222279476151582780/Castorimorpha.png?ex=66dc0d37&is=66dabbb7&hm=fb16efc46e334c745d9fbf9c3d40599d435b17f7f1ff40b00e5068b2ffb46fe8&" :
                                            suborder === "Hystricomorpha" ? "https://cdn.discordapp.com/attachments/1222273673604628641/1222279422602776596/Hystricomorpha.png?ex=66dc0d2b&is=66dabbab&hm=fda1137df82174d74eed32ed12aa4a2195723a08ce514e5504616d5531de4e57&" :
                                                suborder === "Myomorpha" ? "https://cdn.discordapp.com/attachments/932866678126161960/1244917657212555335/Myomorpha.png?ex=66dc02ea&is=66dab16a&hm=c9105221aac770488e054a4ef8a17c7718113a6f51e5bfe5aab7778eef1ea723&" :
                                                    "https://cdn.discordapp.com/attachments/1222273673604628641/1222279357557637120/Sciuromorpha.png?ex=66dc0d1b&is=66dabb9b&hm=4951d9104607e10d2ce8ab966429ef7d5e3ca65343fbe35cd4e850a5380979c6&"
                                } alt="Castorimorpha" />
                                <h1>{suborder}</h1>
                            </div>
                            {Object.entries(
                                rodentsBySuborder.reduce((groupedByFamily, rodent) => {
                                    const family = rodent.family
                                    if (!groupedByFamily[family])
                                        groupedByFamily[family] = []
                                    groupedByFamily[family].push(rodent)
                                    return groupedByFamily
                                }, {})
                            ).map(([family, rodentsByFamily]) => (
                                <div key={family} className="taxa-list">
                                    <h3 onClick={() => navigate(`/collections/${suborder}?search=${family}`)}>{family}<span>({familyNames[family]})</span></h3>
                                    <ul>
                                        {rodentsByFamily.map((rodent) => (
                                            <li key={rodent._id} onClick={() => navigate(`/collections/${suborder}?search=${rodent.binomialName}`)}>{rodent.binomialName}<span>({rodent.commonName})</span></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Taxa