function Input({ name, label, error, ...props }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-bold text-gray-500 mb-2" htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className={`
        p-3 border border-gray-700 rounded-xl focus:outline focus:outline-1 focus:outline-gray-700
        ${error && "border-red-300 focus:outline-red-300"}
        `}
        id={name}
        name={name}
        {...props}
      />
      <span className="text-sm text-red-300 font-bold">{error}</span>
    </div>
  );
}

export default Input;
