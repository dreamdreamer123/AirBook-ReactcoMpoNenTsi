<SelectSearch multi search options={originOptions} onKeyDown={(e) => handleOriginSubmit(e)}/>
const getOriginSuggestions = () => {
  const listItems = originSuggestions.map((el) => ({
    name: el.name,
    value: el.id,
  }));
  setOriginOptions([...listItems]);
  console.log(originOptions);
};

const getDestSuggestions = () => {
  const listItems = destSuggestions.map((el) => ({
    name: el.name,
    value: el.id,
  }));
  setDestOptions([...listItems]);
};