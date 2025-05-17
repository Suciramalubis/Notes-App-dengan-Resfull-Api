class LoadingProcess extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const color = this.getAttribute("color") || "#333";
        const size = this.getAttribute("size") || "28px";
        const text = this.getAttribute("text") || "Loading...";

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    text-align: center;
                    font-family: sans-serif;
                    color: #666;
                }
                .spinner {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid ${color};
                    width: ${size};
                    height: ${size};
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 10px auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
                .label {
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
            </style>
            <div class="container">
                <div class="spinner"></div>
                <div class="label">${text}</div>
            </div>
        `;
    }
}

customElements.define('loading-process', LoadingProcess);
