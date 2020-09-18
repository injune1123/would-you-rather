export function formatQuestion (question, author ) {
  const {id, optionOne, optionTwo, timestamp} = question
  const {name, avatarURL} = author
  return {
    name,
    id,
    timestamp,
    text: `${optionOne.text}, or ${optionTwo.text}?`,
    avatar: avatarURL
  }
}

export function formatDate (timestamp ) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0,5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}
