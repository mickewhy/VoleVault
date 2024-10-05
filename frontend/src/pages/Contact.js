import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Contact = () => {
    return (
        <div className="contact">
            <div>
                <h1>Contact us</h1>
                <p>How can we help?</p>
                <div className='contact-mail'>
                    <MailOutlineIcon />
                    <a href="mailto:contact@volevault.com">contact@volevault.com</a>
                </div>
            </div>
            <img src='/ThreeSkulls.png' alt='ThreeSkulls' />
        </div>
    )
}

export default Contact
