//import { notesData } from "../data/sample-notes.js";
const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class FormInput extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        #noteForm {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 50%;
          margin: auto;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

       input[type="text"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 15px;
      }

      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 15px;
        height: 150px; 
        resize: vertical;
      }

      button[type="submit"] {
        background-color:rgb(89, 236, 94);
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        width: 100%;
        box-sizing: border-box;
        transition: background-color 0.3s ease;
      }

      button[type="submit"]:hover {
        background-color: #45a049;
      }

      button[type="submit"]:disabled {
        background-color: #ddd;
        cursor: not-allowed;
      }


        button[type="submit"]:hover {
          background-color: #45a049; 
        }

        .edit-btn {
            background-color: rgb(77, 88, 185);
            color: white;
        }

        .edit-btn:hover {
            background-color:rgb(40, 4, 97);
        }

        .delete-btn {
            background-color:rgb(255, 17, 0);
            color: white;
        }

        .delete-btn:hover {
            background-color:rgb(116, 1, 1);
        }

        #addNoteBtn {
            margin-top:-10px:
            margin-bottom:5px;
        }

        button[type="submit"]:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 12px;
          display: none;
        }

      </style>

      <button id="addNoteBtn">Tambah Catatan</button>

      <div id="overlay" class="overlay" style="display: none;"></div>

      <form id="noteForm" class="hidden">
        <label for="title">Judul:</label>
        <input type="text" id="title" name="title" required minlength="3" pattern="^[^<>]*$" placeholder="Masukkan judul">
        <span id="titleError" class="error"></span>
        <br><br>

        <label for="content">Isi:</label>
        <textarea id="content" name="content" required minlength="5" placeholder="Masukkan isi catatan"></textarea>
        <span id="contentError" class="error"></span>
        <br><br>

        <button type="submit" id="submitBtn">Kirim</button>
      </form>
      
      <div id="notesList"></div>
    `;

    this.addNoteBtn = this.querySelector("#addNoteBtn");
    this.noteForm = this.querySelector("#noteForm");
    this.overlay = this.querySelector("#overlay");
    this.notesListElement = this.querySelector("#notesList");

    this.noteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (this.isEditing) {
          this.updateNote();
        } else {
          this.addNewNote();
        }
    });

    this.addNoteBtn.addEventListener("click", () => {
      this.clearForm();
      this.showForm();
    });

    this.overlay.addEventListener("click", () => {
      this.hideForm();
    });

    

    this.displayNotes();
  }

//   buat element untuk ditampilkan ke halaman web

  createNoteItemElement({ id, title, body, createdAt }) {
    // buat pembungkusnya
    const container = document.createElement("div");
    container.classList.add("note-item");
    container.setAttribute("data-noteid", id);

    // buat judul
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    // buat isi content
    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;

    // tanggal dibuat
    const dateElement = document.createElement("small");
    dateElement.textContent = `Dibuat Pada : ${new Date(
      createdAt
    ).toLocaleString()}`;

    // container buat bungkus button
    const buttonContainer = document.createElement("div");

    // button edit
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.setAttribute("data-id", id);
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => this.editNote(id));

    // button delete
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.setAttribute("data-id", id);
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => this.deleteNote(id));

    // masukkan ke dalam container
    buttonContainer.append(editButton, deleteButton);
    container.append(titleElement, bodyElement, dateElement, buttonContainer);

    return container;
  }

  // Menambahkan catatan baru ke notesData
 async addNewNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && content) {
      const newNote = {
        title: title,
        body: content,
      };

      this.notesListElement.innerHTML = '<loading-process></loading-process>';

      try {
        await fetch (`${BASE_URL}/notes`,{
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(newNote),
        });

        this.displayNotes();
        this.hideForm();
      } catch (error) {
        alert('Gagal Nambah Catatan.');
        console.log(error);
      }

    } else {
      alert('Judul dan Isi Catatan tidak boleh kosong');
    }
  }



  // Menampilkan semua catatan
  async displayNotes() {
    this.notesListElement.innerHTML = "<loading-process></loading-process>";
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const result = await response.json();
      const notes = result.data;

      this.notesListElement.innerHTML = "";

      notes.forEach((note) => {
        const noteElement = this.createNoteItemElement(note);
        this.notesListElement.appendChild(noteElement);
      });

      this.cachedNotes = notes;

    } catch (error) {
      console.log("Gagal fetch notes: ", error);
      this.notesListElement.innerHTML = "<p>Gagal ambil data.</p>";
    }
  }

    // Mengedit catatan yang sudah ada
  updateNote() {
    alert("API nya ga support");
    this.hideForm();
  }

  

  editNote(id) {

    if (!this.cachedNotes) {
      alert('Data Belum Dimuat....');
      return;
    }

    const note = this.cachedNotes.find((note) => note.id === id);
    if (note) {
      this.showForm();
      this.isEditing = true;
      this.currentNoteId = id;

      document.getElementById("title").value = note.title;
      document.getElementById("content").value = note.body;

      const submitButton = this.querySelector("#submitBtn");
      submitButton.textContent = "Edit";
    }
  }

  // Fungsi untuk menghapus catatan
  async deleteNote(id) {
    // cek dulu mau dihapus datanya apa engga
    const isConfirmed = confirm('Yakin Mau Hapus Data Ini?!!');
    if (!isConfirmed) return;

    // loading
    this.notesListElement.innerHTML = "<loading-process></loading-process>"

    try {
      await fetch (`${BASE_URL}/notes/${id}`,{
        method: "DELETE",
      }); 

      this.displayNotes();
      alert('Catatan Berhasil Dihapus');
    } catch(error) {
      alert('Gagal Hapus Catatan');
      console.log(error);
    }
  }



  hideForm() {
    this.noteForm.classList.add("hidden");
    this.overlay.style.display = "none";
  }

  showForm() {
    this.noteForm.classList.remove("hidden");
    this.overlay.style.display = "block";
  }

  clearForm() {
    this.isEditing = false;
    this.currentNoteId = null;
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    const submitButton = this.querySelector("#submitBtn");
    submitButton.textContent = "Kirim";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formInputElement = document.querySelector("form-input");
  formInputElement.displayNotes();
});

customElements.define("form-input", FormInput);
