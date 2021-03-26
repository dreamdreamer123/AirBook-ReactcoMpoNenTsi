function Suggestions(props) {
  const listItems = props.getItems();
  return (
    <select style={{
      width: '50vw'
    }} size='3' onChange={(e) => props.updateSel(e)}>{listItems}</select>
  )
}

export default Suggestions;