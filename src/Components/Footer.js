import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-4" id="github">
            <a href="https://github.com/ScottHardy4555" className='text-light'>
              <i class="bi bi-github"></i>
              <span>Check out my Github!</span>
            </a>
          </div>
          <div className="col-md-4" id="copyright">
            <p>&copy;Scott Hardy, 2022</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
