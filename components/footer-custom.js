class FooterCustom extends HTMLElement {
    constructor () {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                footer {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    padding: 30px 15px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    text-align: center;
                    font-family: 'Arial', sans-serif;
                }

                .footer-section h4 {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: #f1c40f;
                }

                .footer-section ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-section ul li {
                    margin: 8px 0;
                }

                .footer-section ul li a {
                    color: #bdc3c7;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-section ul li a:hover {
                    color: #ffffff;
                }

                .social-icons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 10px;
                }

                .social-icons a {
                    color: #ecf0f1;
                    font-size: 20px;
                    transition: color 0.3s ease;
                }

                .social-icons a:hover {
                    color: #f1c40f;
                }

                .footer-bottom {
                    grid-column: 1 / -1;
                    margin-top: 30px;
                    font-size: 14px;
                    color: #95a5a6;
                }
            </style>

            <footer>
                <div class="footer-bottom">
                    &copy; 2025 Suci Notes APP. All rights reserved.
                </div>
            </footer>
            `
    }
}

customElements.define('footer-custom', FooterCustom);