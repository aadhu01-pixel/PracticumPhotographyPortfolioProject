export function SelectToggle({ selected, onChange }) {
    return (
        <button
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(!selected)}
            className={`rounded-[3px] border px-[1.2rem] py-[0.6rem] text-[0.8rem] font-semibold uppercase tracking-[0.1em] transition-colors ${selected
                ? "border-accent bg-accent text-button-text hover:border-accent-dark hover:bg-accent-dark"
                : "border-accent text-accent hover:border-accent-dark hover:text-accent-dark"
                }`}
        >
            {selected ? "Selected" : "Select Session"}
        </button>
    );
}
