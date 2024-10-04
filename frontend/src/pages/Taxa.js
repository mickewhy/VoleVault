import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { commonNames as AnomaluromorphaNames } from './Anomaluromorpha.js'
import { commonNames as CastorimorphaNames } from './Castorimorpha.js'
import { commonNames as HystricomorphaNames } from './Hystricomorpha.js'
import { commonNames as MyomorphaNames } from './Myomorpha.js'
import { commonNames as SciuromorphaNames } from './Sciuromorpha.js'

export let familyCommonNames = {}
for (let list of [AnomaluromorphaNames, CastorimorphaNames, HystricomorphaNames, MyomorphaNames, SciuromorphaNames])
    for (let x in list)
        familyCommonNames[x] = list[x]

const Taxa = () => {
    const navigate = useNavigate()
    const [allRodents, setAllRodents] = useState(null)

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
                                <img src={"/" + suborder + ".png"} alt={suborder} />
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
                                    <h3 onClick={() => navigate(`/collections/${suborder}?search=${family}`)}>{family}<span>({familyCommonNames[family]})</span></h3>
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