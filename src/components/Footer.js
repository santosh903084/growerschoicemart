
import "../styles/layouts/footer.css"

export const Footer = ()=>{
    return( 
    <footer className="flex-column-center pd-sm">
        <p className="mg-bottom-xsm">Made by Students of Vel Tech University</p>
        <div className="footer-links mg-bottom-xsm">
        <a className="mg-xsm fs-sm-plus" href=""  target="_blank" rel="noreferrer"
            ><i className="fab fa-github"></i
        ></a>
        <a
            className="mg-xsm fs-sm-plus"
            href="https://www.linkedin.com/in/velagala-karthikeya-santosh-reddy-b3533627b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank" rel="noreferrer"
            ><i className="fab fa-linkedin-in"></i
        ></a>
        <a className="mg-xsm fs-sm-plus" href="https://x.com/satya_likhith?t=B_oxQOdiXKRI5EMbGK5aYQ&s=08"  target="_blank" rel="noreferrer"
            ><i className="fab fa-twitter"></i
        ></a>
        </div>
        <p className="copyright mg-bottom-xsm">Growers Choice Mart</p>
  </footer>
  );
}
