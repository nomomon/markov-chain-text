function InputArea({ inputText, setInputText }) {
    function handleChange(event) {
        const newValue = event.target.innerText;
        setInputText(newValue);

        if (newValue === "") {
            // add className to target empty
            event.target.classList.add("empty");
        }
        else if (event.target.classList.contains("empty")) {
            // remove className from target
            event.target.classList.remove("empty");
        }
    }

    return (
        <div>
            <div
                className="input-area empty"
                contentEditable
                onInput={handleChange}
            >
            </div>
        </div>
    )
}

export default InputArea;