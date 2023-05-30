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
      this.add(value)
    })
  }

  update() {
    this.clearUsers()

    if (this.entries.length < 1) {
      const row = this.createUser({}, true)
      this.tbody.style.height = '624px'
      this.tbody.append(row)
    } else {
      this.entries.forEach(user => {
        const userRow = this.createUser(user)

        userRow
          .querySelector('[data-remove-user]')
          .addEventListener('click', () => {
            const isOk = confirm(
              'Tem certeza que deseja remover esse usuário ?'
            )

            if (isOk) {
              this.delete(user)
            }
          })
        this.tbody.style.height = 'auto'

        this.tbody.append(userRow)
      })
    }
  }

  createUser({ login, name, repos, followers }, empty = false) {
    const newRow = document.createElement('tr')
    let rowContent = ``

    if (!empty) {
      rowContent = `              
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
    } else {
      newRow.classList.add('empty-row')
      rowContent = `         
    <td>
      <div>
        <img
          src="assets/Estrela.svg"
          alt="Estre com um roste de confusão"
        />
        <h2>Nenhum favorito ainda</h2>
      </div>
    </td>
    `
    }

    newRow.innerHTML = rowContent

    return newRow
  }

  clearUsers() {
    this.tbody.querySelectorAll('tr').forEach(tr => {
      tr.remove()
    })
  }
}
