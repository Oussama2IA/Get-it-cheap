import Adel from '../assets/adel.png';
import Oussama from '../assets/oussama.png';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@material-ui/icons';

function Contact() {
  return (
    <div className="contact-page">
      <section className="container d-flex flex-wrap justify-content-center align-items-start">
        <div className="card mx-3 my-3" style={{ width: '18rem' }}>
          <img src={Adel} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Adel DAHANI</h5>
            <p className="card-text">
              Artificial intelligence engineering (2IA) student at ENSIAS
            </p>
            <lu className="contact-info">
              <li>
                <a href="mailto:adel.dahani@um5r.ac.ma" target="blank">
                  <EmailIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/dahani9091/"
                  target="blank"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/dahani9091" target="blank">
                  <GitHubIcon />
                </a>
              </li>
            </lu>
          </div>
        </div>
        <div className="card mx-3 my-3" style={{ width: '18rem' }}>
          <img src={Oussama} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Oussama ALAMI</h5>
            <p className="card-text">
              Artificial intelligence engineering (2IA) student at ENSIAS
            </p>
            <lu className="contact-info">
              <li>
                <a href="mailto:oussama.alami@um5r.ac.ma" target="blank">
                  <EmailIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/oussama2ia/"
                  target="blank"
                >
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/oussama2ia" target="blank">
                  <GitHubIcon />
                </a>
              </li>
            </lu>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
