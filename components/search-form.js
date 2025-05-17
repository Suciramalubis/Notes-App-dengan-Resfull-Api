const notesListElement = document.querySelector("#notesList");

function createNoteItemElement({ id, title, body, createdAt }) {
  const container = document.createElement("div");
  container.classList.add("note-item");
  container.setAttribute("data-noteid", id);

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const bodyElement = document.createElement("p");
  bodyElement.innerText = body;

  const dateElement = document.createElement("small");
  dateElement.textContent = `Created At: ${new Date(createdAt).toLocaleString()}`;

  const buttonContainer = document.createElement("div");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.setAttribute("data-id", id);
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.setAttribute("data-id", id);
  deleteButton.textContent = "Delete";

  buttonContainer.append(editButton, deleteButton);
  container.append(titleElement, bodyElement, dateElement, buttonContainer);

  return container;
}

class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .search-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px;
          max-width: 500px;
          margin: 0 auto;
        }

        .search-wrapper input {
          flex-grow: 1;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-wrapper input:focus {
          border-color: #007BFF;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .search-wrapper button {
          background-color: #007BFF;
          border: none;
          padding: 12px 16px;
          color: white;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .search-wrapper button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 600px) {
          .search-wrapper {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .search-wrapper button {
            width: 100%;
          }
        }
      </style>

      <form id="searchBook" class="search-wrapper">
        <input
          id="searchBookTitle"
          type="text"
          placeholder="Cari catatan berdasarkan judul..."
        />
        <button id="searchSubmit" type="submit">Cari</button>
      </form>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector("#searchBook");
    const input = this.shadowRoot.querySelector("#searchBookTitle");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.triggerSearch(input.value);
    });

    input.addEventListener("input", () => {
      this.triggerSearch(input.value);
    });
  }

  triggerSearch(query) {
    const cleanQuery = query.trim().toLowerCase();
    this.dispatchEvent(new CustomEvent("search", { detail: cleanQuery }));
  }
}

function displayNotes(notes) {
  notesListElement.innerHTML = "";
  notes.forEach((note) => {
    const element = createNoteItemElement(note);
    notesListElement.appendChild(element);
  });
}

const searchFormElement = document.querySelector("search-form");

searchFormElement.addEventListener("search", async (event) => {
  const query = event.detail;
  const apiUrl = `https://your-api-url.com/notes?title=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error("Gagal mengambil data dari API", error);
  }
});

customElements.define("search-form", SearchForm);
