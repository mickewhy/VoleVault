import { useEffect, useState } from "react"
import RodentForm from "../components/RodentForm"

const Submissions = () => {
    const [submissions, setSubmissions] = useState(null)
    useEffect(() => {
        const fetchSubmissions = async () => {
            const response = await fetch('/submissions')
            const json = await response.json()
            if (response.ok) {
                setSubmissions(json)
            }
        }

        fetchSubmissions()
    }, [])
    return (
        <div className="submissions">
            <div className="Submissions">
                {submissions && submissions.map((castorimorph) => (
                    // <RodentDetails key={castorimorph._id} rodent={castorimorph}
                    // />
                    <div></div>
                ))}
            </div>
            <RodentForm />
        </div>
    )
}

export default Submissions