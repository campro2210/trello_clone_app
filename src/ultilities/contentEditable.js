
// save data after press keydown
const saveContentAfterPressEnter = (e) => {
  if (e.key ==='Enter') {
    e.preventDefault()
    e.target.blur()
  }
}


// select all text when click input
const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
  // document.execCommand('selectAll', false, null)   tuong tu ben tren
}

export { saveContentAfterPressEnter, selectAllInlineText }