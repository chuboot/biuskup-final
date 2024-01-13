class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
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

          .brand-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Lalezar", sans-serif;
            font-size: 35px;
          }

          .brand-logo a {
            color: #fff;
            text-decoration: none;
            padding: 1rem 0;
          }

          .brand-logo a:hover {
            text-shadow: 2px 2px 8px darkorchid;
          }

          @media only screen and (max-width: 600px) {
            .brand-logo {
              font-size: 1.7rem;
            }

            .brand-logo a {
              padding: 0.7rem 0;
            }
            
          }
        </style>
        
        <div class="brand-logo"><a href="/">biuskup</a></div>
      `;
  }
}

customElements.define('app-bar', AppBar);
