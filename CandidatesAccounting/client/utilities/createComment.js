export default function CreateComment(author, date, text) {
  return {
    author: author ? author : '',
    date: date ? date : '',
    text: text ? text : ''
  }
}