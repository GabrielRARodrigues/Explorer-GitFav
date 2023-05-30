import { GithubUser } from './GithubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.entries = JSON.parse(localStorage.getItem('@githubFavorites:')) || []
  }
  async add(username) {
    try {
      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entries = [...this.entries, user]
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }

  save() {
    localStorage.setItem('@githubFavorites:', JSON.stringify(this.entries))
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      entry => entry.login !== user.login
    )

    this.entries = filteredEntries
    this.update()
    this.save()
  }
  update() {}
}
