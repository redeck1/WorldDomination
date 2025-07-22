export default function withLoader(Element) {
    return (props) => {
        if (props.loading) {
            return (
                <button {...props} disabled>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Загрузка...
                </button>
            );
        }
        return <Element {...props} />;
    };
}
