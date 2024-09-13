export default class CharacterModel {
  constructor(id, name, spriteUrl, selected = false) {
    this.id = id;
    this.name = name;
    this.spriteUrl = spriteUrl;
    this.selected = selected;
  }
}
