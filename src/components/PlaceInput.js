function PlaceInput(props) {
  return (
    <>
      <input
        type="text"
        onChange={props.onchange}
        onKeyDown={props.onenter}
        placeholder={props.placeholder}
        value={props.value}
        style={{
          height: '42px',
          border: 'none',
          borderRadius: '6px',
          paddingLeft: '20px',
          marginRight: '20px',
          fontSize: '14pt',
        }}
      />
    </>
  );
}

export default PlaceInput;
