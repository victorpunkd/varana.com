import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <span className="brandIcon">
        <a
          href="https://www.facebook.com/145east/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-facebook" />
        </a>
      </span>
      <span className="brandIcon">
        <a
          href="https://instagram.com/145east?igshid=qi8bey7ean4w"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-instagram" />
        </a>
      </span>
      <span className="brandIcon">
        <a
          href="https://www.youtube.com/channel/UCDlBlt1OypPgBrmCw9lC7Ng"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-youtube-play" />
        </a>
      </span>
      {/*<span className="brandIcon">
        <i className="fa fa-vimeo" />
      </span>*/}
    </div>
  );
}

export default Footer;
