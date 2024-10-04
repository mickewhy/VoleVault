import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [rodents, setRodents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRodents = async () => {
            const response = await fetch("/collections/rodents")
            const json = await response.json()
            if (response.ok)
                setRodents(json)
        }
        fetchRodents()
    }, [])

    var binomialNames = new Set()
    rodents.forEach(rodent => {
        binomialNames.add(rodent.binomialName)
    })

    return (
        <div className="home">
            <div className="home-header">
                <img src='/TwoSkulls.png' alt='TwoSkulls' />
                <div className="home-header-partial">
                    <h1>Welcome to VoleVault!</h1>
                    <ul>
                        <button id='style2' onClick={() => { navigate('/collections') }}>View Collections</button>
                    </ul>
                </div>
            </div>
            <div className="home-recents-count">
                <div className="home-recents">
                    <h2>Recent Submissions</h2>
                    <div className="home-recents-images">
                        {rodents.slice(0, 5).map((rodent) => (
                            <div className="image-grid">
                                <div className="image-wrapper"
                                    onClick={() => {
                                        navigate(`/collections/${rodent.suborder.toLowerCase()}/${rodent._id}`, { state: rodent })
                                    }}>{rodent.links &&
                                        <img
                                            src={rodent.links[0]}
                                            alt={rodent.family}
                                        />}
                                    <p className="image-overlay"><i>{rodent.binomialName}</i> <span>({rodent.commonName})</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="home-count">
                    <div>
                        <b>{rodents.length}</b>
                        <h2>Rodents Submitted</h2>
                    </div>
                    <div>
                        <b>{binomialNames.size}</b>
                        <h2>Unique Species</h2>
                    </div>
                    <button id='style2' onClick={() => { navigate('/taxa') }}>View Taxa</button>
                </div>
            </div>
            <div className="home-submissions">
                <h2>Submission rules</h2>
                <p>Information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements, information on submission rules and requirements.</p>
                <button id='style2' onClick={() => { navigate('/submissions') }}>Submissions Form</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Home