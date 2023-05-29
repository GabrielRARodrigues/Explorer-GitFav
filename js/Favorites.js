import { GithubUser } from './GithubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.entries = JSON.parse(localStorage.getItem('@githubFavorites:')) || []
  }

  async add(username) {
    const user = await GithubUser.search(username)

    console.log(user)

    this.entries = [...this.entries, user]
    this.update()
    this.save()
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
