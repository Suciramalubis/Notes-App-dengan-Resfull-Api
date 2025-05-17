class NavbarCustom extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 30px;
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    font-family: 'Segoe UI', sans-serif;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    flex-wrap: wrap;
                }

                .logo {
                    font-size: 22px;
                    font-weight: bold;
                    color: #f1c40f;
                }

                .nav-links {
                    display: flex;
                    gap: 20px;
                }

                .nav-links a {
                    text-decoration: none;
                    color: #ecf0f1;
                    font-size: 16px;
                    transition: color 0.3s ease;
                }

                .nav-links a:hover {
                    color: #f1c40f;
                }

                .menu-toggle {
                    display: none;
                    font-size: 24px;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        margin-top: 10px;
                    }

                    nav.active .nav-links {
                        display: flex;
                    }

                    .menu-toggle {
                        display: block;
                    }
                }
            </style>

            <nav>
                <div class="logo">📝 Suci Notes App</div>
                <div class="menu-toggle">&#9776;</div>
                <div class="nav-links">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </nav>

            <script>
                const toggle = this.querySelector('.menu-toggle');
                const nav = this.querySelector('nav');
                toggle.addEventListener('click', () => {
                    nav.classList.toggle('active');
                });
            </script>
        `;
    }
}

customElements.define('navbar-custom', NavbarCustom);
