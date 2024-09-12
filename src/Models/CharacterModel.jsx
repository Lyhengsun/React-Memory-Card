export default class CharacterModel {
  constructor(id, name, spriteUrl) {
    this.id = id;
    this.name = name;
    this.spriteUrl = spriteUrl;
    this.selected = false;
  }
}
