function TextButton({ text, func }) {
    return (
        <button className="textButton" onClick={func}>
            {text}
        </button>
    );
}

export default TextButton;