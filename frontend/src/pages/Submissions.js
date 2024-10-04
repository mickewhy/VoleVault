import { useEffect, useState } from "react"
import RodentForm from "../components/RodentForm"
import { useAuthContext } from '../hooks/useAuthContext'

const Submissions = () => {
    const { user } = useAuthContext()
    const [submissions, setSubmissions] = useState(null)
    useEffect(() => {
        const fetchSubmissions = async () => {
            const response = await fetch('/submissions')
            const json = await response.json()
            if (response.ok) {
                setSubmissions(json)
                console.log(json)
            }
        }
        fetchSubmissions()
    }, [])

    return (
        <div>
            {user && (
                <>
                    <div>
                        {submissions && submissions.map((castorimorph) => (
                            // <RodentDetails key={castorimorph._id} rodent={castorimorph}
                            // />
                            <div></div>
                        ))}
                    </div>
                    <RodentForm />
                </>
            )}
            {!user &&
                <div className="no-page">
                    <div className="no-page-container">
                        <h1 id="left">4</h1>
                        <img src="/Logo.png" alt="err401" />
                        <h1 id="right">1</h1>
                    </div>
                    <h2>Please <a href="/login">log in</a> to continue!</h2>
                </div>
            }
        </div>
    )
}

export default Submissions