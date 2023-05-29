import { Favorites } from './Favorites.js'

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('.table tbody')
    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('[data-favorite-button]')
    addButton.addEventListener('click', () => {
      const { value } = this.root.querySelector('#username')
      console.log(value)
      this.add(value)
    })
  }

  update() {
    this.clearUsers()

    this.entries.forEach(user => {
      const userRow = this.createUser(user)

      userRow
        .querySelector('[data-remove-user]')
        .addEventListener('click', () => {
          const isOk = confirm('Tem certeza que deseja remover esse usuário ?')

          if (isOk) {
            this.delete(user)
          }
        })

      this.tbody.append(userRow)
    })
  }

  createUser({ login, name, repos, followers }) {
    const newRow = document.createElement('tr')

    const rowContent = `              
    <td>
      <div class="github-user">
        <img
          class="github-user__image"
          src="https://github.com/${login}.png"
          alt="ícone do Github do ${name}"
        />
        <a class="github-user__content" href="https://github.com/${login}" >
          <h3 class="github-user__name">${name}</h3>
          <span class="github-user__user">&#47;${login}</span>
        </a>
      </div>
  </td>
  <td>${repos}</td>
  <td>${followers}</td>
  <td>
    <button data-remove-user class="remove-user">Remover</button>
  </td>`

    newRow.innerHTML = rowContent

    return newRow
  }

  clearUsers() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
