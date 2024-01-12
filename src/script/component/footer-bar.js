class FooterBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
          @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          :host {
            display: block;
            width: 100%;
            color: white;
          }

          p {
            font-weight: 400;
            font-size: 1rem;
            color: #898989;
            line-height: 25px;
          }

          h5 {
            font-weight: 500;
            font-size: 0.9rem;
            color: #fff;
            line-height: 19px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 20px;
          }

          ul li {
            list-style: none;
            margin-bottom: 16px;
          }

          ul li a {
            text-decoration: none;
            list-style: none;
            font-size: 1rem;
            color: #898989;
          }

          .row {
            margin-top: 2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .logo-ft {
            font-family: "Lalezar", sans-serif;
            font-size: 35px;
            color: #c86cc0;
          }

          .w-social {
            display: flex;
            margin-bottom: 1rem;
            justify-content: space-between;
            text-decoration: none;
          }

          .w-social a {
            color: #c86cc0;
            font-size: 1.2rem;
          }

          .heart {
            color: red;
          }
          @media only screen and (max-width: 600px) {
            .row {
              flex-direction: column;
            }

            .logo-sec {
              display: flex;
              justify-content: space-between;
              padding-bottom: 2rem;
              margin-bottom: 2rem;
              border-bottom: 0.5px solid grey;
            }

          }
        </style>
        
        <div class="row">
          <div class="logo-sec">
            <div class="logo-ft">biuskup</div>
            <p>
              &copy; 2023 Biuskup. <br />
              All rights reserved.
            </p>
          </div>

          <div class="legal-links">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Mearch store</a>
              </li>
              <li>
                <a href="#">Term of Service</a>
              </li>
            </ul>
          </div>
          <div class="legal-links">
            <h5>Explore</h5>
            <ul>
              <li>
                <a href="#">Templates</a>
              </li>
              <li>
                <a href="#">Apps</a>
              </li>
              <li>
                <a href="#">Payments</a>
              </li>
            </ul>
          </div>

          <div class="legal-links">
            <h5>Follow us on:</h5>
            <div class="w-social">
              <div>
                <a href=""><i class="fa-brands fa-youtube"></i></a>
              </div>
              <div>
                <a href=""><i class="fa-brands fa-facebook"></i></a>
              </div>
              <div>
                <a href=""><i class="fa-brands fa-instagram"></i></a>
              </div>
              <div>
                <a href=""><i class="fa-brands fa-twitter"></i></a>
              </div>
            </div>
            <span>Made with <span class="heart">♥</span> by Baunchu</span>
          </div>
        </div>
      `;
  }
}

customElements.define("footer-bar", FooterBar);
